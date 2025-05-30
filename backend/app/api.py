from fastapi import APIRouter, HTTPException, BackgroundTasks
from typing import Dict, Any, Optional, List, Union
from llm_model import generate_response
from utils import embed_text
from models import AskResponseModel, AskRequestModel, SolutionRequest, SolutionModel, QuestionModel, SolutionResponseModel, SolutionPartModel, ChatResponseModel
from gpt_researcher import GPTResearcher
import json

from db import solutions, questions

router = APIRouter()


def create_context_question(data: Union[SolutionRequest, AskRequestModel], preped_question: str, parts_solution: Optional[dict] = None) -> str:
    """Create a contextualized question from the input data."""
    solution: Optional[Union[SolutionModel, SolutionPartModel]] = getattr(
        data, 'solution', None)

    # If we have parts_solution from image analysis, create or update solution
    if parts_solution:
        if not solution:
            solution = SolutionPartModel(
                manufacturer=parts_solution.get('manufacturer') if parts_solution.get(
                    'manufacturer') != 'N/A' else None,
                machine_type=parts_solution.get('machine_type') if parts_solution.get(
                    'machine_type') != 'N/A' else None,
                machine_name=parts_solution.get('machine_name') if parts_solution.get(
                    'machine_name') != 'N/A' else None,
                component=parts_solution.get('component') if parts_solution.get(
                    'component') != 'N/A' else None,
                error_code=parts_solution.get('error_code') if parts_solution.get(
                    'error_code') != 'N/A' else None
            )
        else:
            # Update existing solution with parts_solution if fields are empty
            if not solution.manufacturer and parts_solution.get('manufacturer') != 'N/A':
                solution.manufacturer = parts_solution['manufacturer']
            if not solution.machine_type and parts_solution.get('machine_type') != 'N/A':
                solution.machine_type = parts_solution['machine_type']
            if not solution.machine_name and parts_solution.get('machine_name') != 'N/A':
                solution.machine_name = parts_solution['machine_name']
            if not solution.component and parts_solution.get('component') != 'N/A':
                solution.component = parts_solution['component']
            if not solution.error_code and parts_solution.get('error_code') != 'N/A':
                solution.error_code = parts_solution['error_code']

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
    """Search for an existing solution using vector similarity."""
    embedding = embed_text(question)
    return questions.find_similar(embedding)


def generate_confidence_score(solution_dict: Dict[str, Any]) -> str:
    """Generate a confidence score for a solution using LLM."""
    confidence_prompt = f"""
    Based on the following solution, rate its confidence level from 0-100.
    Consider:
    1. Completeness of the solution
    2. Clarity of steps
    3. Technical accuracy
    4. Verification status
    5. Supporting documentation

    Return only the numeric score (0-100), no other text.

    Solution Title: {solution_dict.get('title', '')}
    Description: {solution_dict.get('description', '')}
    Steps: {solution_dict.get('solution_steps', [])}
    Documentation: {solution_dict.get('document_link', '')}
    Manufacturer: {solution_dict.get('manufacturer', '')}
    Machine Type: {solution_dict.get('machine_type', '')}
    Machine Name: {solution_dict.get('machine_name', '')}
    Component: {solution_dict.get('component', '')}
    Error Code: {solution_dict.get('error_code', '')}
    Resolution Type: {solution_dict.get('resolution_type', '')}
    Downtime Impact: {solution_dict.get('downtime_impact', '')}
    Verified: {solution_dict.get('verified', False)}
    """

    confidence_score = generate_response(confidence_prompt).strip()
    try:
        confidence_score = int(confidence_score)
        # Ensure score is between 0-100
        confidence_score = min(max(confidence_score, 0), 100)
        return str(confidence_score)
    except ValueError:
        return "0"  # Default if LLM doesn't return a valid number


def create_solution_and_question(solution_data: SolutionRequest, full_question: str) -> tuple[str, str]:
    """Create a new solution and associated question in Firestore."""
    try:
        # Create solution
        solution_dict = solution_data.solution.model_dump()
        solution_dict['title'] = full_question
        solution_dict['confidence'] = generate_confidence_score(solution_dict)
        solution_id = solutions.create(solution_dict)

        # Create question with embedding
        embedding = embed_text(full_question)
        question_dict = {
            'text': full_question,
            'solution_id': solution_id,
            'embedding': embedding
        }
        questions.create(question_dict)

        return solution_id, full_question
    except Exception as e:
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
    partsSolution = None
    image_analysis = None

    if request.image_data:
        print("Image data found")
        image_analysis = generate_response(
            "Analyze this image and describe what you see, focusing on any visible technical issues, machine parts, or error displays.",
            image_data=request.image_data
        )
        manufacturing_context = generate_response(
            "Based on the following image analysis, write the manufacturing context of the machine: " + image_analysis + """
            The output must be a raw, minified JSON object of strings like, if property can't be determined, return N/A:
            {
                "manufacturer": "Siemens",
                "machine_type": "CNC",
                "machine_name": "N/A",
                "component": "Motor",
                "error_code": "E101"
            }
            Do not include any other text, formatting, only the JSON object.
            """
        )
        try:
            partsSolution = json.loads(manufacturing_context)
        except json.JSONDecodeError:
            partsSolution = None

    # Prepare the question by combining text and image analysis if available
    question_text = request.question.strip()
    if image_analysis:
        preped_question = prepare_question(
            f"Question: {question_text}\nImage Analysis: {image_analysis}"
        )
    else:
        preped_question = prepare_question(question_text)

    full_question = create_context_question(
        request, preped_question, partsSolution)
    matches = find_existing_solution(full_question)

    if matches:
        return {"matches": matches}

    raise HTTPException(
        status_code=204,
        detail="No verified solutions found. Please document your fix."
    )


@router.post("/solutions",
             response_model=SolutionResponseModel,
             summary="Add a new solution",
             description="Add a new solution with its associated question",
             operation_id="createSolution")
async def add_solution(data: SolutionRequest):
    preped_question = prepare_question(data.question)
    full_question = create_context_question(data, preped_question)

    try:
        # Create solution and question
        solution_id, question = create_solution_and_question(
            data, full_question)

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
async def get_solution(solution_id: str):
    solution = solutions.get(solution_id)
    if not solution:
        raise HTTPException(status_code=404, detail="Solution not found")
    return solution


@router.get("/solutions",
            response_model=List[SolutionModel],
            summary="Get all solutions",
            description="Retrieve all solutions from the database",
            operation_id="listSolutions")
def get_all_solutions():
    return solutions.list_all()


@router.get("/questions",
            response_model=List[QuestionModel],
            summary="Get all questions",
            description="Retrieve all questions from the database",
            operation_id="listQuestions")
def get_all_questions():
    return questions.list_all()


@router.post("/investigate",
             response_model=SolutionResponseModel,
             summary="Start an investigation",
             description="Initiate a background research task for a given question",
             operation_id="investigate")
async def get_report(data: AskRequestModel, background_tasks: BackgroundTasks):
    partsSolution = None
    image_analysis = None

    if data.image_data:
        print("Image data found in investigation")
        image_analysis = generate_response(
            "Analyze this image and describe what you see, focusing on any visible technical issues, machine parts, or error displays.",
            image_data=data.image_data
        )
        manufacturing_context = generate_response(
            "Based on the following image analysis, write the manufacturing context of the machine: " + image_analysis + """
            The output must be a raw, minified JSON object of strings like, if property can't be determined, return N/A:
            {
                "manufacturer": "Siemens",
                "machine_type": "CNC",
                "machine_name": "N/A",
                "component": "Motor",
                "error_code": "E101"
            }
            Do not include any other text, formatting, only the JSON object.
            """
        )
        try:
            partsSolution = json.loads(manufacturing_context)
        except json.JSONDecodeError:
            partsSolution = None

    # Prepare the question by combining text and image analysis if available
    question_text = data.question.strip()
    if image_analysis:
        preped_question = prepare_question(
            f"Question: {question_text}\nImage Analysis: {image_analysis}"
        )
    else:
        preped_question = prepare_question(question_text)

    full_question = create_context_question(
        data, preped_question, partsSolution)

    report_type = "research_report"
    researcher = GPTResearcher(full_question, report_type)

    if not researcher:
        raise HTTPException(
            status_code=500,
            detail="Failed to initialize researcher"
        )

    try:
        solution_data = {
            'text': '',  # Will be updated by background task
            'verified': False,
            'title': full_question,
            'confidence': "0"  # Initialize with 0 confidence
        }

        # Add manufacturing context if available
        if partsSolution:
            solution_data.update({
                'manufacturer': partsSolution.get('manufacturer'),
                'machine_type': partsSolution.get('machine_type'),
                'machine_name': partsSolution.get('machine_name'),
                'component': partsSolution.get('component'),
                'error_code': partsSolution.get('error_code')
            })

        solution_id = solutions.create(solution_data)

        background_tasks.add_task(
            process_and_save_report,
            full_question,
            researcher,
            solution_id
        )

        return {
            "message": "Investigation started",
            "solution": {"id": solution_id}
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error starting investigation: {str(e)}"
        )


async def process_and_save_report(question: str, researcher: GPTResearcher, solution_id: str):
    try:
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

        try:
            solution_steps = json.loads(solution_steps_raw)
        except json.JSONDecodeError:
            solution_steps = ["Could not parse solution steps"]

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

        # Prepare solution data
        solution_data = {
            'text': report,
            'description': description,
            'solution_steps': solution_steps,
            'verified': False,
            'manufacturer': manufacturer,
            'machine_name': machine_name,
            'model_number': model_number,
            'error_code': error_code,
            'component': component,
            'resolution_type': resolution_type,
            'downtime_impact': downtime_impact,
        }

        # Generate and add confidence score
        solution_data['confidence'] = generate_confidence_score(solution_data)

        # Update the solution with all the research results
        solutions.update(solution_id, solution_data)

        # Add question to the database
        embedding = embed_text(question)
        question_dict = {
            'text': question,
            'solution_id': solution_id,
            'embedding': embedding
        }
        questions.create(question_dict)

    except Exception as e:
        print(f"Error in process_and_save_report: {str(e)}")
        solutions.update(solution_id, {
            'text': f"Error generating report: {str(e)}",
            'error': True
        })


@router.post("/chat",
             response_model=ChatResponseModel,
             summary="Chat with the solution",
             description="Chat with the solution",
             operation_id="chat")
async def chat(data: AskRequestModel):
    solution_list = solutions.list_all()
    response = generate_response(f"""
    You are a helpful assistant that can answer questions about the solutions in the database.
    The solutions are stored in the database and are indexed for vector similarity.
    The solutions are: {solution_list}
    The question is: {data.question}
    The response should be in the same language as the question.
    The response should be helpful and informative.
    """)
    return {"message": response}
