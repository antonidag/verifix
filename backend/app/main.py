from fastapi import FastAPI, HTTPException, BackgroundTasks
from pydantic import BaseModel
from llm_model import generate_response
from db import SessionLocal, init_db, Question, Solution
from vector_db_client import search_similar, add_to_qdrant
from utils import embed_text, solution_to_dict
from typing import Optional
from gpt_researcher import GPTResearcher


class QuestionInput(BaseModel):
    question: str

class EnhancedQuestionInput(BaseModel):
    question: str
    machine_name: Optional[str] = None
    machine_type: Optional[str] = None
    manufacturer: Optional[str] = None
    model_number: Optional[str] = None
    component: Optional[str] = None
    error_code: Optional[str] = None

class AskInput(BaseModel):
    question: str
    
class SolutionInput(BaseModel):
    text: str
    document_link: str
    verified: bool
    # Manufacturing context fields
    error_code: str           # Machine/system error code
    machine_name: str  # Name/tag of machine (e.g., "Press #3")
    machine_type: str        # "Press", "Conveyor", "Robot Arm"
    manufacturer: str      # e.g., "Siemens", "ABB", "KUKA"
    model_number: str         # Specific model
    component: str            # "Motor", "PLC", "Sensor"
    resolution_type: str   # "Preventive", "Corrective", "Calibration", "Software Fix"
    downtime_impact: str  # "High", "Medium", "Low" – helps prioritize
    safety_related: bool  # Flag if the issue has safety implications
    plant_name: str           # e.g., "Plant A", "Line 2"
    department: str          # e.g., "Welding", "Assembly", "Packaging"
    # Flexible filter e.g. ["overheat", "sensor fault"]
    tags: str

    class Config:
        orm_mode = True


app = FastAPI()
init_db()


@app.post("/ask")
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


class SolutionRequest(BaseModel):
    solution: SolutionInput
    question: str


@app.post("/solution")
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


@app.get("/solution/{solution_id}")
def get_solution(solution_id: int):
    db = SessionLocal()
    solution = db.query(Solution).filter(Solution.id == solution_id).first()
    solution_dict = solution_to_dict(solution)
    db.close()

    if not solution:
        raise HTTPException(status_code=404, detail="Solution not found")

    return solution_dict


@app.post("/investigate")
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
