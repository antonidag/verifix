from typing import Dict, Optional
from llm_model import generate_response
from utils import embed_text
from db import questions

async def prepare_question(question: str) -> str:
    """Clean and prepare the question using LLM."""
    return await generate_response(f"""You are a helpful assistant that rewrites technician input into a clear, professional, and concise technical issue title optimized for embedding and vector search.
Instructions:
- Correct any spelling or grammar issues.
- Remove informal language, emojis, and excessive punctuation.
- Preserve all important technical context.
- Rephrase into a short, neutral sentence or phrase (max 1-2 lines).
- Prioritize relevant keywords like manufacturer, component type, model, and error/condition.
- If details like manufacturer, model, or error code are available, incorporate them naturally into the sentence.

Only return the cleaned-up title. Do not explain your reasoning.

Input:
{question}

Output:
""")

def find_existing_solution(question: str) -> Optional[Dict]:
    """Search for an existing solution using vector similarity."""
    embedding = embed_text(question)
    return questions.find_similar(embedding)
