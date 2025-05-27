from fastapi import APIRouter, HTTPException, BackgroundTasks
from typing import Dict, Any, Optional, Tuple, List, Union
from db import SessionLocal, Question, Solution
from llm_model import generate_response
from vector_db_client import search_similar, add_to_qdrant
from utils import embed_text
from models import AskResponseModel, AskRequestModel, SolutionRequest, SolutionModel, QuestionModel, SolutionResponseModel, SolutionPartModel, ChatResponseModel
from gpt_researcher import GPTResearcher
from sqlalchemy.exc import SQLAlchemyError
import json

router = APIRouter()


def create_context_question(data: Union[SolutionRequest, AskRequestModel], preped_question: str) -> str:
    """Create a contextualized question from the input data."""
    solution: Optional[Union[SolutionModel, SolutionPartModel]] = getattr(
        data, 'solution', None)
    if not solution:
        return preped_question

    context_fields = [
        solution.manufacturer,
        solution.machine_type,
        solution.machine_name,
        solution.component,
        solution.error_code
    ]

    context_str = " ".join(field for field in context_fields if field)
    return f"{context_str}: {preped_question}" if context_str else preped_question


def prepare_question(question: str) -> str:
    """Clean and prepare the question using LLM."""
    return generate_response(f"""You are a helpful assistant that rewrites technician input into clear, professional, and concise problem descriptions suitable for logging into a maintenance or troubleshooting system.

Correct any spelling or grammar issues, remove informal language or excessive punctuation, and rephrase the input into a neutral tone while preserving all technical context.

Only return the cleaned-up description. Do not explain your reasoning.

Input:
{question}

Output:
""")


def find_existing_solution(question: str) -> Optional[Dict]:
    """
    Search for an existing solution using vector similarity.

    Args:
        question: The question text to search for

    Returns:
        Optional[Dict]: Matching solution if found, None otherwise
    """
    embedding = embed_text(question)
    return search_similar(embedding)


def create_solution_and_question(
    db: SessionLocal,
    solution_data: SolutionRequest,
    full_question: str
) -> Tuple[int, str]:
    """Create a new solution and associated question in the database."""
    try:
        solution = Solution(**solution_data.solution.model_dump())
        solution.title = full_question
        db.add(solution)
        db.commit()
        db.refresh(solution)

        question = Question(
            text=full_question,
            solution_id=solution.id,
        )
        db.add(question)
        db.commit()

        return solution.id, full_question
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Database error while creating solution: {str(e)}"
        )


@router.post("/ask",
             response_model=AskResponseModel,
             summary="Ask a question with manufacturing context",
             description="Submit a question with optional manufacturing context to find matching solutions",
             operation_id="ask")
async def ask_question(request: AskRequestModel):

    # Clean and prepare the question
    preped_question = prepare_question(request.question)
    # Create contextualized question
    full_question = create_context_question(request, preped_question)

    # Search for existing solution
    result = find_existing_solution(full_question)

    if result:
        return {"match": result}

    raise HTTPException(
        status_code=404,
        detail="No verified solution found. Please document your fix."
    )


@router.post("/solutions",
             response_model=SolutionResponseModel,
             summary="Add a new solution",
             description="Add a new solution with its associated question",
             operation_id="createSolution")
async def add_solution(data: SolutionRequest):

    # Clean and prepare the question
    preped_question = prepare_question(data.question)
    # Create contextualized question
    full_question = create_context_question(data, preped_question)
    # Search for existing solution using vector similarity
    result = find_existing_solution(full_question)
    if result:
        raise HTTPException(
            status_code=400,
            detail={
                "message": "A similar question already has a solution.",
                "match": result
            })

    try:
        with SessionLocal() as db:
            # Create solution and question
            solution_id, question = create_solution_and_question(
                db, data, full_question)

            # Index the question for vector search
            embedding = embed_text(question)
            add_to_qdrant(question, embedding, solution_id)

        return {
            "message": "Solution added and indexed.",
            "solution": {
                "id": solution_id
            }
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error adding solution: {str(e)}"
        )


@router.get("/solutions/{solution_id}",
            response_model=SolutionModel,
            summary="Get solution by ID",
            description="Retrieve a specific solution by its ID",
            operation_id="getSolution")
async def get_solution(solution_id: int):
    try:
        with SessionLocal() as db:
            solution = db.query(Solution).filter(
                Solution.id == solution_id).first()
            if not solution:
                raise HTTPException(
                    status_code=404, detail="Solution not found")

            return solution
    except SQLAlchemyError as e:
        raise HTTPException(
            status_code=500,
            detail=f"Database error while retrieving solution: {str(e)}"
        )


@router.post("/investigate",
             response_model=SolutionResponseModel,
             summary="Start an investigation",
             description="Initiate a background research task for a given question",
             operation_id="investigate")
async def get_report(data: AskRequestModel, background_tasks: BackgroundTasks):

    # Clean and prepare the question
    preped_question = prepare_question(data.question)
    # Create contextualized question
    full_question = create_context_question(data, preped_question)

    report_type = "research_report"
    researcher = GPTResearcher(full_question, report_type)

    if not researcher:
        raise HTTPException(
            status_code=500, detail="Failed to initialize researcher")

    try:
        with SessionLocal() as db:
            solution = Solution(
                text="",  # Placeholder, will be updated later
                verified=False
            )
            db.add(solution)
            db.commit()
            db.refresh(solution)
            solution_id = solution.id

            # Schedule the rest of the work
            background_tasks.add_task(process_and_save_report,
                                      full_question, researcher, solution_id)

            return {
                "message": f"Working on report for query: {data.question}. It will be saved once ready.",
                "solution": {
                    "id": solution_id
                }
            }
    except SQLAlchemyError as e:
        raise HTTPException(
            status_code=500,
            detail=f"Database error while initializing investigation: {str(e)}"
        )


async def process_and_save_report(question: str, researcher: GPTResearcher, solution_id: int):
    try:
        # First get the research results
        research_result = await researcher.conduct_research()
        report = await researcher.write_report()

        description = generate_response(
            f"Based on the following report, write a description of the solution: {report}. Only return the description, no other text.")
        solution_steps_raw = generate_response(
            f"""Read the report below and return a list of steps to solve the problem.
The output must be a raw, minified JSON array of strings like: ["Step 1", "Step 2", "Step 3"].
Do not include any other text, formatting, or markdown—only the JSON array.

Report: {report}"""
        )

        # Parse to Python list
        try:
            solution_steps = json.loads(solution_steps_raw)
            print("Parsed steps:", solution_steps)
        except json.JSONDecodeError as e:
            print("Failed to parse JSON:", e)
            solution_steps = []
        tags = generate_response(
            f"""Extract up to 5 solution-focused tags from the following report. 
Return only a plain, comma-separated string with the tags. 
Do not include any explanation, markdown, or formatting. 

Report: {report}"""
        )
        title = generate_response(
            f"Based on the following report, write a title for the solution format based manufacturer machine_name model_number error_code: {question}: {report}. Only return the title, no other text.")
        confidence = generate_response(
            f"Based on the following report, write the confidence of the solution: {report}. Only return the confidence in a number between 0 and 100, no other text.")

        manufacturer = generate_response(
            f"""Based on the following report, write the manufacturer of the machine.
Only return the manufacturer name as a string (e.g., "Siemens").
If the manufacturer cannot be confidently determined, return "N/A".
Do not include any other text, explanation, or formatting.

Report: {report}"""
        )

        machine_name = generate_response(
            f"""Extract the machine name from the following report. 
Return only the machine name, and nothing else. 
If it cannot be determined, return N/A.

Report: {report}"""
        )

        model_number = generate_response(
            f"""Extract the model number of the machine from the following report. 
Return only the model number, and nothing else. 
If it cannot be determined, return N/A.

Report: {report}"""
        )

        error_code = generate_response(
            f"""Based on the following report, write the error code of the machine.
Only return the error code as a string (e.g., "E101").
If you cannot confidently determine the error code from the report, return "N/A".
Do not include any other text, explanation, or formatting.

Report: {report}"""
        )

        component = generate_response(
            f"""Extract the component of the machine from the following report.
Return only the component name, and nothing else.
If it cannot be determined, return N/A.

Report: {report}"""
        )

        resolution_type = generate_response(
            f"""Extract the resolution type from the following report.
Return only the resolution type, and nothing else.
If it cannot be determined, return N/A.

Report: {report}"""
        )

        downtime_impact = generate_response(
            f"""Extract the downtime impact of the machine from the following report.
Return only the downtime impact (e.g. High, Medium, Low), and nothing else.
If it cannot be determined, return N/A.

Report: {report}"""
        )

        # Then handle all database operations in a single transaction
        try:
            with SessionLocal() as db:
                # Update existing solution
                solution = db.query(Solution).get(solution_id)
                if not solution:
                    raise HTTPException(
                        status_code=404,
                        detail=f"Solution {solution_id} not found"
                    )

                solution.text = report
                solution.description = description
                solution.solution_steps = solution_steps
                solution.tags = tags
                solution.title = title
                solution.verified = False
                solution.manufacturer = manufacturer
                solution.machine_name = machine_name
                solution.model_number = model_number
                solution.error_code = error_code
                solution.component = component
                solution.resolution_type = resolution_type
                solution.downtime_impact = downtime_impact
                solution.confidence = confidence
                db.commit()
                db.refresh(solution)

                # Store question
                question_record = Question(
                    text=question,
                    solution_id=solution_id
                )
                db.add(question_record)
                db.commit()

                # Embed and add to vector DB
                embedding = embed_text(question)
                add_to_qdrant(question, embedding, solution_id)

        except SQLAlchemyError as e:
            # Log the error since this is a background task
            print(f"Database error in process_and_save_report: {str(e)}")
            raise  # Re-raise to be caught by outer try block

    except Exception as e:
        # Log any errors (including re-raised SQLAlchemyError)
        print(f"Error in process_and_save_report: {str(e)}")


@router.get("/questions",
            response_model=List[QuestionModel],
            summary="Get all questions",
            description="Retrieve all questions and their associated solutions from the database",
            operation_id="listQuestions")
def get_all_questions():
    try:
        with SessionLocal() as db:
            questions = (
                db.query(Question)
                .all()
            )
            return questions

    except SQLAlchemyError as e:
        raise HTTPException(
            status_code=500,
            detail=f"Database error while retrieving questions: {str(e)}"
        )


@router.get("/solutions",
            response_model=List[SolutionModel],
            summary="Get all solutions",
            description="Retrieve all solutions from the database",
            operation_id="listSolutions")
def get_all_solutions():
    try:
        with SessionLocal() as db:
            solutions = (
                db.query(Solution)
                .all()
            )
            return solutions

    except SQLAlchemyError as e:
        raise HTTPException(
            status_code=500,
            detail=f"Database error while retrieving solutions: {str(e)}"
        )


@router.post("/chat",
             response_model=ChatResponseModel,
             summary="Chat with the solution",
             description="Chat with the solution",
             operation_id="chat")
async def chat(data: AskRequestModel):
    response = generate_response(f"""
    You are a helpful assistant that can answer questions about the solutions in the database.
    The solutions are stored in the database and are indexed for vector similarity.
    The solutions are: {get_all_solutions()}
    The question is: {data.question}
    The response should be in the same language as the question.
    The response should be helpful and informative.
    """)
    return {"message": response}
