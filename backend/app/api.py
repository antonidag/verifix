from fastapi import APIRouter, HTTPException, BackgroundTasks
from typing import Dict, Any, Optional, List, Union
import asyncio
import json
from llm_model import generate_response
from utils import embed_text
from models import (
    AskResponseModel, AskRequestModel, SolutionRequest, SolutionModel,
    QuestionModel, SolutionResponseModel, SolutionPartModel, ChatResponseModel,
    InventoryBase)
from gpt_researcher import GPTResearcher
from db import solutions, questions, inventory

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


async def prepare_question(question: str) -> str:
    """Clean and prepare the question using LLM."""
    return await generate_response(f"""You are a helpful assistant that rewrites technician input into clear, professional, and concise problem descriptions suitable for logging into a maintenance or troubleshooting system.

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


async def generate_confidence_score(solution_dict: Dict[str, Any]) -> str:
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

    confidence_score = await generate_response(confidence_prompt)
    confidence_score = confidence_score.strip()
    try:
        confidence_score = int(confidence_score)
        # Ensure score is between 0-100
        confidence_score = min(max(confidence_score, 0), 100)
        return str(confidence_score)
    except ValueError:
        return "0"  # Default if LLM doesn't return a valid number


async def create_solution_and_question(solution_data: SolutionRequest, full_question: str) -> tuple[str, str]:
    """Create a new solution and associated question in Firestore."""
    try:
        # Create solution
        solution_dict = solution_data.solution.model_dump()
        solution_dict['title'] = full_question
        solution_dict['confidence'] = await generate_confidence_score(solution_dict)
        solution_id = solutions.create(solution_dict)

        # Create question with embedding in parallel with storing model info
        embedding = embed_text(full_question)
        question_dict = {
            'text': full_question,
            'solution_id': solution_id,
            'embedding': embedding
        }

        await asyncio.gather(
            questions.create(question_dict),
            store_model_info(solution_id, solution_dict)
        )

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
        image_analysis = await generate_response(
            "Analyze this image and describe what you see, focusing on any visible technical issues, machine parts, or error displays.",
            image_data=request.image_data
        )
        manufacturing_context = await generate_response(
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
        preped_question = await prepare_question(
            f"Question: {question_text}\nImage Analysis: {image_analysis}"
        )
    else:
        preped_question = await prepare_question(question_text)

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
    preped_question = await prepare_question(data.question)
    full_question = create_context_question(data, preped_question)

    try:
        # Create solution and question
        solution_id, question = await create_solution_and_question(
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
        image_analysis = await generate_response(
            "Analyze this image and describe what you see, focusing on any visible technical issues, machine parts, or error displays.",
            image_data=data.image_data
        )
        manufacturing_context = await generate_response(
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
        preped_question = await prepare_question(
            f"Question: {question_text}\nImage Analysis: {image_analysis}"
        )
    else:
        preped_question = await prepare_question(question_text)

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
        # Run research and report generation in parallel
        research_result, report = await asyncio.gather(
            researcher.conduct_research(),
            researcher.write_report()
        )

        # Batch together all the extractive queries
        prompts_list = [
            ("description", f"Based on the following report, write a description of the solution: {report}. Only return the description, no other text."),
            ("solution_steps", f"""Read the report below and return a list of steps to solve the problem.
The output must be a raw, minified JSON array of strings like: ["Step 1", "Step 2", "Step 3"].
Do not include any other text, formatting, or markdown—only the JSON array.

Report: {report}"""),
            ("manufacturer", f"""Based on the following report, write the manufacturer of the machine.
Only return the manufacturer name as a string (e.g., "Siemens").
If the manufacturer cannot be confidently determined, return "N/A".
Do not include any other text, explanation, or formatting.

Report: {report}"""),
            ("machine_name", f"""Extract the machine name from the following report.
Return only the machine name, and nothing else.
If it cannot be determined, return N/A.

Report: {report}"""),
            ("model_number", f"""Extract the model number of the machine from the following report.
Return only the model number, and nothing else.
If it cannot be determined, return N/A.

Report: {report}"""),
            ("error_code", f"""Based on the following report, write the error code of the machine.
Only return the error code as a string (e.g., "E101").
If you cannot confidently determine the error code from the report, return "N/A".
Do not include any other text, explanation, or formatting.

Report: {report}"""),
            ("component", f"""Extract the component of the machine from the following report.
Return only the component name, and nothing else.
If it cannot be determined, return N/A.

Report: {report}"""),
            ("resolution_type", f"""Extract the resolution type from the following report.
Return only the resolution type, and nothing else.
If it cannot be determined, return N/A.

Report: {report}"""),
            ("downtime_impact", f"""Extract the downtime impact of the machine from the following report.
Return only the downtime impact (e.g. High, Medium, Low), and nothing else.
If it cannot be determined, return N/A.

Report: {report}""")
        ]

        # Create list of coroutines for parallel execution
        coroutines = [generate_response(prompt) for _, prompt in prompts_list]

        # Run all extractive queries in parallel
        results = await asyncio.gather(*coroutines)

        # Map results back using the keys from prompts_list
        extracted_data = {key: result for (key, _), result in zip(prompts_list, results)}

        try:
            solution_steps = json.loads(extracted_data['solution_steps'])
        except json.JSONDecodeError:
            solution_steps = ["Could not parse solution steps"]

        # Prepare solution data
        solution_data = {
            'text': report,
            'description': extracted_data['description'],
            'solution_steps': solution_steps,
            'verified': False,
            'manufacturer': extracted_data['manufacturer'],
            'machine_name': extracted_data['machine_name'],
            'model_number': extracted_data['model_number'],
            'error_code': extracted_data['error_code'],
            'component': extracted_data['component'],
            'resolution_type': extracted_data['resolution_type'],
            'downtime_impact': extracted_data['downtime_impact'],
        }

        # Generate confidence score
        solution_data['confidence'] = await generate_confidence_score(solution_data)

        # Run database operations in parallel
        embedding = embed_text(question)
        solutions.update(solution_id, solution_data),
        questions.create({
            'text': question,
            'solution_id': solution_id,
            'embedding': embedding
        })

        # Store component/machine information
        await store_model_info(solution_id, solution_data)

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
    response = await generate_response(f"""
    You are a helpful assistant that can answer questions about the solutions in the database.
    The solutions are stored in the database and are indexed for vector similarity.
    The solutions are: {solution_list}
    The question is: {data.question}
    The response should be in the same language as the question.
    The response should be helpful and informative.
    """)
    return {"message": response}


async def store_model_info(solution_id: str, solution_data: Dict[str, Any]) -> str:
    """Store component/machine model information in the inventory collection.

    Args:
        solution_id: The ID of the solution this inventory is associated with
        solution_data: Dictionary containing the solution data with component info

    Returns:
        The ID of the created inventory record
    """
    component_info = await extract_component_info(solution_data.get('text', ''))

    inventory_data = {
        'solution_id': solution_id,
        'manufacturer': solution_data.get('manufacturer', component_info.get('manufacturer', 'Unknown')),
        'model_name': component_info.get('model_name', 'Unknown'),
        'component_type': solution_data.get('component', component_info.get('component_type', 'Unknown')),
        'firmware_version': component_info.get('firmware_version'),
        'specifications': component_info.get('specifications', {}),
        'metadata': {
            'machine_type': solution_data.get('machine_type'),
            'error_code': solution_data.get('error_code'),
            'installation_date': component_info.get('installation_date'),
            'last_service': component_info.get('last_service')
        }
    }
    return inventory.create(inventory_data)

async def extract_component_info(text: str) -> Dict[str, Any]:
    """Extract detailed component information from solution text using LLM.

    Args:
        text: The solution text to analyze

    Returns:
        Dictionary with extracted component information
    """
    prompt = f"""Extract detailed component/machine information from this text. Return a JSON object with these fields:
    - manufacturer: The equipment manufacturer
    - model_name: The specific model name/number
    - component_type: The type of component (PLC, Robot, Drive, etc.)
    - firmware_version: Any mentioned firmware/software version
    - specifications: Technical specifications as key-value pairs
    - installation_date: Installation date if mentioned
    - last_service: Last service date if mentioned

    Only include fields if they are mentioned in the text. Format dates as YYYY-MM-DD.
    Text: {text}

    Return only the JSON object, no other text."""

    try:
        response = await generate_response(prompt)
        return json.loads(response)
    except (json.JSONDecodeError, Exception) as e:
        print(f"Error extracting component info: {e}")
        return {}

@router.get("/solutions/{solution_id}/inventory",
            response_model=InventoryBase,
            summary="Get inventory information for a solution",
            description="Retrieve inventory data associated with a specific solution",
            operation_id="getSolutionInventory")
async def get_solution_inventory(solution_id: str):
    """Get inventory information for a solution."""
    inventory_data = inventory.get_by_solution_id(solution_id)
    if not inventory_data or len(inventory_data) == 0:
        raise HTTPException(status_code=404, detail="Inventory not found")
    return inventory_data
