from typing import Dict, Any
import json
from llm_model import generate_response
from db import inventory

async def extract_component_info(text: str) -> Dict[str, Any]:
    prompt = f"""You are an expert data extraction AI. Your task is to extract detailed component or machine information from the provided text and structure it as a valid JSON object.

Follow these instructions carefully:

1.  **Target Information Fields:**
    * `manufacturer`: (string) The name of the equipment manufacturer.
    * `model_name`: (string) The specific model name or model number of the equipment.
    * `component_type`: (string) The general type of component or machine (e.g., "PLC", "Robot", "Drive", "Sensor", "Motor").
    * `firmware_version`: (string) Any mentioned firmware, software, or controller version associated with the component.
    * `specifications`: (JSON object) A nested JSON object containing technical specifications as key-value pairs. For example: `{{"Voltage": "24VDC", "Speed": "3000 RPM", "Power Rating": "5kW"}}`. Only include specifications explicitly found in the text. If no specifications are found, omit the `specifications` key entirely.
    * `installation_date`: (string) The date the equipment was installed, formatted strictly as `YYYY-MM-DD`.
    * `last_service_date`: (string) The date the equipment was last serviced, formatted strictly as `YYYY-MM-DD`. (Note: I renamed `last_service` to `last_service_date` for clarity with date formatting).

2.  **Conditional Field Inclusion (CRITICAL):**
    * Only include a key in the JSON object if its corresponding information is explicitly found in the text.
    * If information for a field is NOT found, that key MUST be entirely OMITTED from the output JSON.
    * Do NOT include keys with `null` values, empty strings (`""`), or placeholder strings like "N/A", "Not mentioned", or "Unknown" for information that is not present.

3.  **Date Formatting:**
    * All dates (`installation_date`, `last_service_date`) MUST be formatted as `YYYY-MM-DD`. If a date is mentioned but not in this full format or is ambiguous, attempt to convert it if possible, otherwise omit the field.

4.  **Output Requirements (CRITICAL):**
    * Your entire response MUST be ONLY the valid JSON object.
    * Do NOT include any explanatory text, introductory phrases (e.g., "Here is the JSON object:"), concluding remarks, or any other characters before or after the JSON structure.
    * Do NOT wrap the JSON object in markdown code blocks (e.g., ```json ... ```).

Provided text:
{text}"""

    try:
        response = await generate_response(prompt)
        return json.loads(response)
    except (json.JSONDecodeError, Exception) as e:
        print(f"Error extracting component info: {e}")
        return {}

async def store_model_info(report: str) -> str:
    component_info = await extract_component_info(report)

    inventory_data = {
        'manufacturer': component_info.get('manufacturer', 'Unknown'),
        'model_name': component_info.get('model_name', 'Unknown'),
        'component_type': component_info.get('component_type', 'Unknown'),
        'firmware_version': component_info.get('firmware_version'),
        'specifications': component_info.get('specifications', {}),
        'metadata': {
            'installation_date': component_info.get('installation_date'),
            'last_service': component_info.get('last_service')
        }
    }
    return inventory.create(inventory_data)
