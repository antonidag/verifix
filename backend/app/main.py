from fastapi import FastAPI, HTTPException, BackgroundTasks
from pydantic import BaseModel, Field
from llm_model import generate_response
from db import SessionLocal, init_db, Question, Solution
from vector_db_client import search_similar, add_to_qdrant
from utils import embed_text, solution_to_dict
from typing import Optional, Union, Dict, Any
from gpt_researcher import GPTResearcher
from enum import Enum


class ResolutionType(str, Enum):
    PREVENTIVE = "Preventive"
    CORRECTIVE = "Corrective"
    CALIBRATION = "Calibration"
    SOFTWARE_FIX = "Software Fix"


class DowntimeImpact(str, Enum):
    HIGH = "High"
    MEDIUM = "Medium"
    LOW = "Low"


class QuestionInput(BaseModel):
    question: str = Field(..., description="The question to be asked")


class EnhancedQuestionInput(BaseModel):
    question: str = Field(..., description="The main question or issue to be resolved")
    machine_name: Optional[str] = Field(None, description="Name/tag of machine (e.g., 'Press #3')")
    machine_type: Optional[str] = Field(None, description="Type of machine (e.g., 'Press', 'Conveyor', 'Robot Arm')")
    manufacturer: Optional[str] = Field(None, description="Equipment manufacturer (e.g., 'Siemens', 'ABB', 'KUKA')")
    model_number: Optional[str] = Field(None, description="Specific model number of the equipment")
    component: Optional[str] = Field(None, description="Specific component involved (e.g., 'Motor', 'PLC', 'Sensor')")
    error_code: Optional[str] = Field(None, description="Machine/system error code")

    class Config:
        schema_extra = {
            "example": {
                "question": "Machine keeps stopping unexpectedly",
                "machine_name": "Press #3",
                "machine_type": "Hydraulic Press",
                "manufacturer": "Siemens",
                "component": "Pressure Sensor",
                "error_code": "E5023"
            }
        }


class AskInput(BaseModel):
    question: str
    
class SolutionInput(BaseModel):
    text: str = Field(..., description="The solution text")
    document_link: str = Field(..., description="Link to related documentation")
    verified: bool = Field(..., description="Whether the solution has been verified")
    # Manufacturing context fields
    error_code: str = Field(None, description="Machine/system error code")
    machine_name: str = Field(None, description="Name/tag of machine")
    machine_type: str = Field(None, description="Type of machine")
    manufacturer: str = Field(None, description="Equipment manufacturer")
    model_number: str = Field(None, description="Specific model number")
    component: str = Field(None, description="Component involved")
    resolution_type: ResolutionType = Field(None, description="Type of resolution")
    downtime_impact: DowntimeImpact = Field(None, description="Impact on machine downtime")
    safety_related: bool = Field(None, description="Whether the issue has safety implications")
    plant_name: str = Field(None, description="Name of the plant")
    department: str = Field(None, description="Department name")
    # Flexible filter e.g. ["overheat", "sensor fault"]
    tags: str = Field(None, description="Comma-separated tags for filtering")

    class Config:
        orm_mode = True
        schema_extra = {
            "example": {
                "text": "Replace the pressure sensor and recalibrate the system",
                "document_link": "https://docs.example.com/solutions/5023",
                "verified": True,
                "error_code": "E5023",
                "machine_name": "Press #3",
                "machine_type": "Hydraulic Press",
                "manufacturer": "Siemens",
                "component": "Pressure Sensor",
                "resolution_type": "Corrective",
                "downtime_impact": "High",
                "safety_related": True
            }
        }


class SolutionRequest(BaseModel):
    solution: SolutionInput
    question: str = Field(..., description="The original question this solution answers")


app = FastAPI(
    title="Manufacturing Solutions API",
    description="""
    API for managing and retrieving manufacturing solutions and troubleshooting information.
    This system helps technicians find solutions to common manufacturing problems and document new solutions.
    """,
    version="1.0.0",
    contact={
        "name": "Manufacturing Support Team",
        "email": "support@manufacturing.example.com",
    },
    license_info={
        "name": "Proprietary",
        "url": "https://example.com/license",
    },
)

init_db()


@app.post("/ask", 
    response_model=Union[Dict[str, Any], Dict[str, str]],
    summary="Ask a question with manufacturing context",
    description="Submit a question with optional manufacturing context to find matching solutions")
def ask_question(data: EnhancedQuestionInput):
    # Build context by joining available fields in specified order
    context_fields = [
        data.manufacturer,
        data.machine_type,
        data.machine_name,
        data.component,
        data.error_code
    ]
    
    # Filter out None values and join with spaces
    context_str = " ".join(field for field in context_fields if field)
    full_question = f"{context_str}: {data.question}" if context_str else data.question

    preped_question = generate_response(f"""You are a helpful assistant that rewrites technician input into clear, professional, and concise problem descriptions suitable for logging into a maintenance or troubleshooting system.

Correct any spelling or grammar issues, remove informal language or excessive punctuation, and rephrase the input into a neutral tone while preserving all technical context.

Only return the cleaned-up description. Do not explain your reasoning.

Input:
{full_question}

Output:
""")

    embedding = embed_text(preped_question)
    result = search_similar(embedding)

    if result:
        return {"match": result}
    else:
        return {"message": "No verified solution found. Please document your fix."}


@app.post("/solution",
    response_model=Dict[str, Any],
    summary="Add a new solution",
    description="Add a new solution with its associated question")
def add_solution(data: SolutionRequest):
    embedding = embed_text(data.question)
    result = search_similar(embedding)

    if result:
        raise HTTPException(
            status_code=400, detail={
                "message": "This question have a solution.",
                "match": result
            })
    with SessionLocal() as db:
        existing_question = db.query(Question).filter(
            Question.text == data.question).first()
        if existing_question:
            raise HTTPException(
                status_code=400, detail="This question have a solution.")

        solution = Solution(**data.solution.model_dump())
        db.add(solution)
        db.commit()
        db.refresh(solution)

        question = Question(
            text=data.question,
            solution_id=solution.id,
        )
        db.add(question)
        db.commit()
        db.refresh(question)

        solution_id = solution.id

    add_to_qdrant(data.question, embedding, solution_id)

    return {
        "message": "Solution added and indexed.",
        "solution": {
            "id": solution_id
        }
    }


@app.get("/solution/{solution_id}",
    response_model=Dict[str, Any],
    summary="Get solution by ID",
    description="Retrieve a specific solution by its ID")
def get_solution(solution_id: int):
    db = SessionLocal()
    solution = db.query(Solution).filter(Solution.id == solution_id).first()
    solution_dict = solution_to_dict(solution)
    db.close()

    if not solution:
        raise HTTPException(status_code=404, detail="Solution not found")

    return solution_dict


@app.post("/investigate",
    response_model=Dict[str, Any],
    summary="Start an investigation",
    description="Initiate a background research task for a given question")
async def get_report(data: QuestionInput, background_tasks: BackgroundTasks):
    report_type = "research_report"
    researcher = GPTResearcher(data.question, report_type)

    if not researcher:
        raise HTTPException(
            status_code=500, detail="Failed to initialize researcher")

    # Create and store the solution record initially
    db = SessionLocal()
    try:
        solution = Solution(
            text="",  # Placeholder, will be updated later
            verified=False
        )
        db.add(solution)
        db.commit()
        db.refresh(solution)
        solution_id = solution.id
    finally:
        db.close()

    # Schedule the rest of the work
    background_tasks.add_task(process_and_save_report,
                              data.question, researcher, solution_id)

    return {
        "message": f"Working on report for query: {data.question}. It will be saved once ready.",
        "solution_id": solution_id
    }


async def process_and_save_report(question, researcher: GPTResearcher, solution_id: int):
    research_result = await researcher.conduct_research()
    report = await researcher.write_report()

    db = SessionLocal()
    try:
        # Update existing solution
        solution = db.query(Solution).get(solution_id)
        if solution:
            solution.text = report
            db.commit()
            db.refresh(solution)

            # Store question
            db.add(Question(
                text=question,
                solution_id=solution_id,
                verified=False
            ))
            db.commit()

            # Embed and add to vector DB
            embedding = embed_text(question)
            add_to_qdrant(question, embedding, solution_id)
    finally:
        db.close()
