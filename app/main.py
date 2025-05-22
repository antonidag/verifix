from fastapi import FastAPI, HTTPException, BackgroundTasks
from pydantic import BaseModel
from db import SessionLocal, init_db, Question, Solution
from vector_db_client import search_similar, add_to_qdrant
from utils import embed_text
from typing import Optional
from gpt_researcher import GPTResearcher


class QuestionInput(BaseModel):
    text: str


class SolutionInput(BaseModel):
    text: str
    solution_text: str


class SolutionOut(BaseModel):
    id: int
    text: str
    document_link: Optional[str] = None  # Allow None here
    verified: bool

    class Config:
        orm_mode = True


app = FastAPI()
init_db()


@app.post("/ask")
def ask_question(q: QuestionInput):
    embedding = embed_text(q.text)
    result = search_similar(embedding, 0.8)

    if result:
        return {"match": result}
    else:
        return {"message": "No verified solution found. Please document your fix."}


@app.post("/solution")
def add_solution(data: SolutionInput):
    embedding = embed_text(data.text)

    db = SessionLocal()

    # Check duplication
    existing_question = db.query(Question).filter(
        Question.text == data.text).first()
    if existing_question:
        db.close()
        raise HTTPException(
            status_code=400, detail="This question already exists.")

    solution = Solution(text=data.solution_text, verified=True)
    db.add(solution)
    db.commit()
    db.refresh(solution)  # refresh to get ID etc

    question = Question(
        text=data.text,
        solution_id=solution.id,
        verified=True
    )
    db.add(question)
    db.commit()
    db.refresh(question)
    db.close()

    add_to_qdrant(data.text, embedding, solution.id)
    return {
        "message": "Solution added and indexed.",
        "solution": solution.id
    }


@app.get("/solution/{solution_id}", response_model=SolutionOut)
def get_solution(solution_id: int):
    db = SessionLocal()
    solution = db.query(Solution).filter(Solution.id == solution_id).first()
    db.close()

    if not solution:
        raise HTTPException(status_code=404, detail="Solution not found")

    return solution


@app.post("/investigate")
async def get_report(query: QuestionInput, background_tasks: BackgroundTasks):
    report_type = "research_report"
    researcher = GPTResearcher(query, report_type)

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
                              query, researcher, solution_id)

    return {
        "message": f"Working on report for query: {query}. It will be saved once ready.",
        "solution_id": solution_id
    }


async def process_and_save_report(query: QuestionInput, researcher: GPTResearcher, solution_id: int):
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
            question = Question(
                text=query,
                solution_id=solution_id,
                verified=False
            )
            db.add(question)
            db.commit()

            # Embed and add to vector DB
            embedding = embed_text(query)
            add_to_qdrant(query, embedding, solution_id)
    finally:
        db.close()
