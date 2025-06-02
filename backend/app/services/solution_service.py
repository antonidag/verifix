from typing import Dict, Any
import asyncio
import json
from llm_model import generate_response

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

async def process_solution_report(report: str) -> Dict[str, Any]:
    """Process a solution report and extract relevant data."""
    prompts_list = [
        ("description", f"Based on the following report, write a description of the solution: {report}. Only return the description, no other text."),
        ("solution_steps", f"""Extract solution steps from the report below. Return a raw JSON array.
Format the output as a minified JSON array of strings without any spaces, like this:
["Step 1","Step 2","Step 3"]
Do not include any markdown formatting, backticks, newlines, or other text - ONLY the raw JSON array.
If no steps are found, return only: []

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

Report: {report}"""),
        ("links", f"""Extract relevant documentation links from the following report. Return a raw JSON array.
Format the output as a minified JSON array of objects with 'title' and 'url' properties, like this:
[{{"title":"User Manual","url":"https://..."}},{{"title":"Technical Guide","url":"https://..."}}]
Do not include any markdown formatting, backticks, or other text - ONLY the raw JSON array.
If no links are found, return only: []

Report: {report}""")
    ]

    # Create list of coroutines for parallel execution
    coroutines = [generate_response(prompt) for _, prompt in prompts_list]

    # Run all extractive queries in parallel
    results = await asyncio.gather(*coroutines)

    # Map results back using the keys from prompts_list
    extracted_data = {key: result for (key, _), result in zip(prompts_list, results)}

    # Handle solution steps parsing with fallback
    try:
        solution_steps = json.loads(extracted_data['solution_steps'])
        if not isinstance(solution_steps, list):
            solution_steps = ["Could not parse solution steps - invalid format"]
    except json.JSONDecodeError:
        solution_steps = ["Could not parse solution steps"]

    # Handle links parsing with fallback
    try:
        links = json.loads(extracted_data['links']) if extracted_data['links'].strip() else []
        if not isinstance(links, list):
            links = []
    except json.JSONDecodeError:
        links = []

    return {
        'description': extracted_data['description'],
        'solution_steps': solution_steps,
        'manufacturer': extracted_data['manufacturer'],
        'machine_name': extracted_data['machine_name'],
        'model_number': extracted_data['model_number'],
        'error_code': extracted_data['error_code'],
        'component': extracted_data['component'],
        'resolution_type': extracted_data['resolution_type'],
        'downtime_impact': extracted_data['downtime_impact'],
        'links': links
    }
