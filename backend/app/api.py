from fastapi import APIRouter, HTTPException, BackgroundTasks
from sse_starlette.sse import EventSourceResponse
from typing import List
import json
import asyncio
from llm_model import generate_response
from gpt_researcher import GPTResearcher
from services.question_service import prepare_question, find_existing_solution
from services.research_service import (process_research_report)
from models import (
    AskResponseModel, AskRequestModel, SolutionResponseModel,
    SolutionModel, QuestionModel, ChatResponseModel, InventoryBase
)
from db import solutions, questions, inventory

router = APIRouter()

@router.post("/ask",
             response_model=AskResponseModel,
             summary="Ask a question with manufacturing context",
             description="Submit a question with optional manufacturing context to find matching solutions",
             operation_id="ask")
async def ask_question(request: AskRequestModel):
    image_analysis = None

    if request.image_data:
        image_analysis = await generate_response(
            "Analyze this image and describe what you see, focusing on any visible technical issues, machine parts, or error displays.",
            image_data=request.image_data
        )

    # Prepare the question by combining text and image analysis if available
    question_text = request.question.strip()
    if image_analysis:
        full_question = await prepare_question(
            f"Question: {question_text}\nImage Analysis: {image_analysis}"
        )
    else:
        full_question = await prepare_question(question_text)

    matches = find_existing_solution(full_question)

    if matches:
        return {"matches": matches}

    raise HTTPException(
        status_code=204,
        detail="No verified solutions found. Please document your fix."
    )

@router.get("/solutions/recent",
            response_model=List[SolutionModel],
            summary="Get recent solutions",
            description="Retrieve the 5 most recent solutions from the database",
            operation_id="listRecentSolutions")
def get_recent_solutions():
    return solutions.list_recent()

@router.get("/solutions/{solution_id}",
            response_model=SolutionModel,
            summary="Get solution by ID",
            description="Retrieve a specific solution by its ID",
            operation_id="getSolution")
async def get_solution(solution_id: str):
    solution = solutions.get(solution_id)
    if not solution:
        raise HTTPException(status_code=404, detail=f"Solution id: {solution_id} not found")
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
    image_analysis = None

    if data.image_data:
        image_analysis = await generate_response(
            "Analyze this image and describe what you see, focusing on any visible technical issues, machine parts, or error displays.",
            image_data=data.image_data
        )

    # Prepare the question by combining text and image analysis if available
    question_text = data.question.strip()
    if image_analysis:
        full_question = await prepare_question(
            f"Question: {question_text}\nImage Analysis: {image_analysis}"
        )
    else:
        full_question = await prepare_question(question_text)

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

        solution_id = solutions.create(solution_data)

        background_tasks.add_task(
            process_research_report,
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
            description="Retrieve inventory data associated with a solution",
            operation_id="getSolutionInventory")
async def get_solution_inventory(solution_id: str):
    """Get inventory information for a solution."""
    solution = solutions.get(solution_id)
    if not solution:
        raise HTTPException(status_code=404, detail=f"Solution id: {solution_id} inventory not found")

    if not solution.get('inventory_id'):
        return None

    inventory_item = inventory.get(solution['inventory_id'])
    return inventory_item

@router.get("/solutions/{solution_id}/status")
async def solution_status(solution_id: str):
    """Get solution status via Server-Sent Events."""
    async def event_generator():
        while True:
            solution = solutions.get(solution_id)
            if solution and solution.get('description'):
                # Fetch inventory data if available
                inventory_data = None
                if solution.get('inventory_id'):
                    inventory_data = inventory.get(solution['inventory_id'])

                # Solution is ready
                yield {
                    "event": "solution_ready",
                    "data": json.dumps({
                        "id": solution_id,
                        "status": "ready",
                        "solution": solution,
                        "inventory": inventory_data
                    })
                }
                break
            else:
                # Solution still processing
                yield {
                    "event": "processing",
                    "data": json.dumps({
                        "id": solution_id,
                        "status": "processing"
                    })
                }
            await asyncio.sleep(2)  # Check every 2 seconds

    return EventSourceResponse(event_generator())
