from typing import Dict, Any, Optional, Union
import json
from models import SolutionRequest, AskRequestModel, SolutionPartModel, SolutionModel
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

def find_existing_solution(question: str) -> Optional[Dict]:
    """Search for an existing solution using vector similarity."""
    embedding = embed_text(question)
    return questions.find_similar(embedding)
