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
        ("solution_steps", f"""Extract solution steps from the report below. Format each step as a clear, complete sentence.
Return a properly formatted JSON array of strings, with normal spacing and punctuation.
Example of good formatting:
["1. Step 1.",
 "2. Step 2.",
 "3. Step 3."]
Do not include any markdown formatting.
Return only the JSON array, no other text or formatting. If no steps are found, return: []

Report: {report}"""),
        ("manufacturer", f"""Extract the manufacturer name from this report.
Return ONLY the manufacturer name with no additional text or formatting.
Example good responses: "Siemens" or "N/A"
Do not include quotes, explanations, or any other text.

Report: {report}"""),
        ("machine_name", f"""Extract the machine name from this report.
Return ONLY the machine name with no additional text or formatting.
Example good responses: "CNC Mill 2000" or "N/A"
Do not include quotes, explanations, or any other text.

Report: {report}"""),
        ("model_number", f"""Extract the model number from this report.
Return ONLY the model number with no additional text or formatting.
Example good responses: "XJ-2500" or "N/A"
Do not include quotes, explanations, or any other text.

Report: {report}"""),
        ("error_code", f"""Extract the error code from this report.
Return ONLY the error code with no additional text or formatting.
Example good responses: "E101" or "N/A"
Do not include quotes, explanations, or any other text.

Report: {report}"""),
        ("component", f"""Extract the affected component from this report.
Return ONLY the component name with no additional text or formatting.
Example good responses: "Hydraulic Pump" or "N/A"
Do not include quotes, explanations, or any other text.

Report: {report}"""),
        ("resolution_type", f"""Extract the resolution type from this report.
Return ONLY the resolution type with no additional text or formatting.
Example good responses: "Hardware Fix" or "Software Update" or "N/A"
Do not include quotes, explanations, or any other text.

Report: {report}"""),
        ("downtime_impact", f"""Extract the downtime impact level from this report.
Return ONLY one of these values: High, Medium, Low, N/A
Do not include quotes, explanations, or any other text.

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
        print("Error parsing solution steps:", extracted_data['solution_steps'])
        solution_steps = ["Could not parse solution steps"]

    # Handle links parsing with fallback
    try:
        links = json.loads(extracted_data['links']) if extracted_data['links'].strip() else []
        if not isinstance(links, list):
            links = []
    except json.JSONDecodeError:
        print("Error parsing links:", extracted_data['links'])
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
