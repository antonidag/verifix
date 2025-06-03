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

async def process_solution_report(question: str, report: str) -> Dict[str, Any]:
    """Process a solution report and extract relevant data."""
    prompts_list = [
        ("description",
     f"""You are an expert technical writer.
Based on the provided report and the specific question asked, generate a concise and informative description.
The description MUST directly address the question: '{question}'
It MUST clearly summarize the solution relevant to this question, as detailed in the report: '{report}'.
The description must be self-contained.

Your entire response MUST consist SOLELY of this description text.
Ensure no preamble, titles, introductory/concluding remarks, or any other text whatsoever accompanies the description."""),

    ("solution_steps",
     f"""From the report provided below, extract the distinct solution steps that directly address the issue raised in the question: '{question}'.
Each step MUST be a complete sentence, clearly articulating an action or instruction.
Format the output as a valid JSON array of strings. Ensure standard JSON spacing and punctuation.

Example of the EXACT expected JSON output format:
["1. First, perform action A to resolve the specific issue.", "2. Next, meticulously verify that result B is achieved for that issue.", "3. Finally, complete action C as documented for the resolution."]

IMPORTANT INSTRUCTIONS FOR OUTPUT:
1. Your entire response MUST be the raw JSON array and nothing else.
2. Ensure no text, explanations, apologies, conversational filler, or any other characters precede or follow the JSON array.
3. The JSON array itself must be clean, without any markdown formatting (such as ```json ... ```).
4. If no distinct solution steps relevant to the question are found in the report, your entire response MUST be an empty JSON array: []

Report:
{report}"""),

    ("manufacturer",
     f"""Analyze the following report, focusing on the equipment or system pertinent to the question: '{question}'.
Identify the manufacturer's name for this primary equipment/system.
Your entire response MUST be ONLY the manufacturer's name as a plain string, or the string "N/A".
If no manufacturer name is explicitly mentioned or clearly identifiable for the relevant equipment, provide "N/A".

Examples of valid, complete, and EXACT output strings:
Siemens
N/A

CRITICAL OUTPUT REQUIREMENTS:
The output string must be solely the manufacturer's name (or "N/A").
It must not contain any quotation marks, descriptive text, labels, or any other formatting.

Report:
{report}"""),

    ("machine_name",
     f"""Analyze the following report, focusing on the specific machine or equipment discussed in relation to the question: '{question}'.
Identify the name of this machine/equipment.
Your entire response MUST be ONLY the machine name as a plain string, or the string "N/A".
If no machine name is explicitly mentioned or clearly identifiable for the relevant equipment, provide "N/A".

Examples of valid, complete, and EXACT output strings:
CNC Mill 2000
N/A

CRITICAL OUTPUT REQUIREMENTS:
The output string must be solely the machine name (or "N/A").
It must not contain any quotation marks, descriptive text, labels, or any other formatting.

Report:
{report}"""),

    ("model_number",
     f"""Analyze the following report, focusing on the specific equipment or system relevant to the question: '{question}'.
Identify the model number of this equipment/system.
Your entire response MUST be ONLY the model number as a plain string, or the string "N/A".
If no model number is explicitly mentioned or clearly identifiable for the relevant equipment, provide "N/A".

Examples of valid, complete, and EXACT output strings:
XJ-2500
N/A

CRITICAL OUTPUT REQUIREMENTS:
The output string must be solely the model number (or "N/A").
It must not contain any quotation marks, descriptive text, labels, or any other formatting.

Report:
{report}"""),

    ("error_code",
     f"""Analyze the following report to identify the error code(s) specifically related to the issue or component mentioned in the question: '{question}'.
If multiple distinct error codes relevant to the question are present, list them in a single string, separated by a single comma and a space (e.g., "E101, E102, F003").
Your entire response MUST be ONLY the relevant error code(s) as a plain string, or the string "N/A".
If no error code relevant to the question is explicitly mentioned or clearly identifiable, provide "N/A".

Examples of valid, complete, and EXACT output strings:
E101
E101, E102
N/A

CRITICAL OUTPUT REQUIREMENTS:
The output string must be solely the error code(s) (or "N/A").
It must not contain any quotation marks, descriptive text, labels, or any other formatting.

Report:
{report}"""),

    ("component",
     f"""Analyze the following report to identify the primary affected component that is the subject of, or directly related to, the question: '{question}'.
Your entire response MUST be ONLY the component name as a plain string, or the string "N/A".
If no specific component relevant to the question is explicitly mentioned or clearly identifiable as the primary one affected, provide "N/A".

Examples of valid, complete, and EXACT output strings:
Hydraulic Pump
N/A

CRITICAL OUTPUT REQUIREMENTS:
The output string must be solely the component name (or "N/A").
It must not contain any quotation marks, descriptive text, labels, or any other formatting.

Report:
{report}"""),

    ("resolution_type",
     f"""Analyze the resolution described in the following report, specifically for the issue raised in the question: '{question}'.
Classify the type of this specific resolution.
Consider common types like "Hardware Fix", "Software Update", "Configuration Change", "Replacement", "Adjustment", "Maintenance", "Consultation", "No Action Required", or a similar concise category if clearly indicated in the report for the relevant issue.
Your entire response MUST be ONLY the resolution type as a plain string, or the string "N/A".
If no specific resolution type for the issue in the question can be determined, or if the resolution is not described, provide "N/A".

Examples of valid, complete, and EXACT output strings:
Hardware Fix
Software Update
N/A

CRITICAL OUTPUT REQUIREMENTS:
The output string must be solely the resolution type (or "N/A").
It must not contain any quotation marks, descriptive text, labels, or any other formatting.

Report:
{report}"""),

    ("downtime_impact",
     f"""Analyze the following report to determine the downtime impact level associated with the issue or event described in the question: '{question}'.
Your entire response MUST be EXACTLY one of the following predefined plain string values: High, Medium, Low, or N/A.
Choose the most appropriate value based on the report's content related to the question. If the impact is not specified or cannot be determined for the issue in question, use "N/A".

CRITICAL OUTPUT REQUIREMENTS:
The output string must be solely the selected value.
It must not contain quotation marks, descriptive text, explanations, or any other formatting.

Report:
{report}"""),

    ("links",
     f"""From the report below, identify and extract documentation links that are relevant to answering or providing more information about the question: '{question}'.
Relevant links include URLs pointing to technical manuals, knowledge base articles, official support pages, or troubleshooting guides pertinent to the question's subject.
Format the output as a single, minified, valid JSON array of objects. Each object in the array MUST have a "title" property (string) and a "url" property (string).

Example of the EXACT expected JSON output format (assuming relevance to a question):
[{{"title":"Operator Manual PX200 - Section on Error Codes","url":"https://example.com/manual/px200#errors"}},{{"title":"KB Article - Troubleshooting","url":"https://support.example.com/kb/question_subject_fix"}}]

IMPORTANT INSTRUCTIONS FOR OUTPUT:
1. Your entire response MUST be the raw, minified JSON array and nothing else.
2. Ensure no text, explanations, apologies, conversational filler, or any other characters precede or follow the JSON array.
3. The JSON array itself must be clean, valid JSON, without any markdown formatting (such as ```json ... ```), backticks, or other non-JSON characters.
4. If no links relevant to the question are found in the report, your entire response MUST be an empty JSON array: []

Report:
{report}""")
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
