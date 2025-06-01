from fastapi import APIRouter, HTTPException, BackgroundTasks
from typing import Dict, Any, Optional, List, Union
import asyncio
import json
from llm_model import generate_response
from utils import embed_text
from services.question_service import prepare_question, create_context_question, find_existing_solution
from services.solution_service import generate_confidence_score, process_solution_report
from services.inventory_service import store_model_info
from models import (
    AskResponseModel, AskRequestModel, SolutionRequest, SolutionModel,
    QuestionModel, SolutionResponseModel, SolutionPartModel, ChatResponseModel,
    InventoryBase)
from gpt_researcher import GPTResearcher
from db import solutions, questions, inventory

router = APIRouter()

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

        # Process report and extract data
        solution_data = await process_solution_report(report)
        solution_data['text'] = report
        solution_data['verified'] = False

        # Generate confidence score
        solution_data['confidence'] = await generate_confidence_score(solution_data)

        # Run database operations in parallel
        embedding = embed_text(question)
        await asyncio.gather(
            solutions.update(solution_id, solution_data),
            questions.create({
                'text': question,
                'solution_id': solution_id,
                'embedding': embedding
            }),
            store_model_info(solution_id, solution_data)
        )

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

@router.get("/solutions/{solution_id}/inventory",
            response_model=InventoryBase,
            summary="Get inventory information for a solution",
            description="Retrieve inventory data associated with a specific solution",
            operation_id="getSolutionInventory")
async def get_solution_inventory(solution_id: str):
    """Get inventory information for a solution."""
    inventory_data = inventory.get_by_solution_id(solution_id)
    if not inventory_data:
        raise HTTPException(status_code=404, detail="Inventory not found")
    return inventory_data
