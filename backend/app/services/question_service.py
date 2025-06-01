from typing import Dict, Optional
from llm_model import generate_response
from utils import embed_text
from db import questions

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
