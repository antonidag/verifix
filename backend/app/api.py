from fastapi import APIRouter, HTTPException, BackgroundTasks
from typing import Dict, Any, Optional, Tuple
from db import SessionLocal, Question, Solution
from llm_model import generate_response
from vector_db_client import search_similar, add_to_qdrant
from utils import embed_text, solution_to_dict
from models import EnhancedQuestionInput, QuestionInput, SolutionRequest
from gpt_researcher import GPTResearcher
from sqlalchemy.exc import SQLAlchemyError

router = APIRouter()


def create_context_question(data: EnhancedQuestionInput) -> str:
    """Create a contextualized question from the input data."""
    context_fields = [
        data.manufacturer,
        data.machine_type,
        data.machine_name,
        data.component,
        data.error_code
    ]
    
    context_str = " ".join(field for field in context_fields if field)
    return f"{context_str}: {data.question}" if context_str else data.question


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
    response_model=Dict[str, Any],
    summary="Ask a question with manufacturing context",
    description="Submit a question with optional manufacturing context to find matching solutions")
def ask_question(data: EnhancedQuestionInput):
    
    # Clean and prepare the question
    preped_question = prepare_question(data.question)
    # Create contextualized question
    full_question = create_context_question(preped_question)
    
    

    # Search for existing solution
    result = find_existing_solution(full_question)

    if result:
        return {"match": result}
    else:
        return {"message": "No verified solution found. Please document your fix."}


@router.post("/solution",
    response_model=Dict[str, Any],
    summary="Add a new solution",
    description="Add a new solution with its associated question")
def add_solution(data: SolutionRequest):

        # Clean and prepare the question
    preped_question = prepare_question(data.question)
    # Create contextualized question
    full_question = create_context_question(preped_question)
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
            solution_id, question = create_solution_and_question(db, data, full_question)
            
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


@router.get("/solution/{solution_id}",
    response_model=Dict[str, Any],
    summary="Get solution by ID",
    description="Retrieve a specific solution by its ID")
def get_solution(solution_id: int):
    try:
        with SessionLocal() as db:
            solution = db.query(Solution).filter(Solution.id == solution_id).first()
            if not solution:
                raise HTTPException(status_code=404, detail="Solution not found")
            
            return solution_to_dict(solution)
    except SQLAlchemyError as e:
        raise HTTPException(
            status_code=500,
            detail=f"Database error while retrieving solution: {str(e)}"
        )


@router.post("/investigate",
    response_model=Dict[str, Any],
    summary="Start an investigation",
    description="Initiate a background research task for a given question")
async def get_report(data: QuestionInput, background_tasks: BackgroundTasks):
    report_type = "research_report"
    researcher = GPTResearcher(data.question, report_type)

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
                                  data.question, researcher, solution_id)

            return {
                "message": f"Working on report for query: {data.question}. It will be saved once ready.",
                "solution_id": solution_id
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
                db.commit()
                db.refresh(solution)

                # Store question
                question_record = Question(
                    text=question,
                    solution_id=solution_id,
                    verified=False
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