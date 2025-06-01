from typing import Dict, Any
import json
from llm_model import generate_response
from db import inventory

async def extract_component_info(text: str) -> Dict[str, Any]:
    """Extract detailed component information from solution text using LLM.

    Args:
        text: The solution text to analyze

    Returns:
        Dictionary with extracted component information
    """
    prompt = f"""Extract detailed component/machine information from this text. Return a JSON object with these fields:
    - manufacturer: The equipment manufacturer
    - model_name: The specific model name/number
    - component_type: The type of component (PLC, Robot, Drive, etc.)
    - firmware_version: Any mentioned firmware/software version
    - specifications: Technical specifications as key-value pairs
    - installation_date: Installation date if mentioned
    - last_service: Last service date if mentioned

    Only include fields if they are mentioned in the text. Format dates as YYYY-MM-DD.
    Text: {text}

    Return only the JSON object, no other text."""

    try:
        response = await generate_response(prompt)
        return json.loads(response)
    except (json.JSONDecodeError, Exception) as e:
        print(f"Error extracting component info: {e}")
        return {}

async def store_model_info(solution_id: str, solution_data: Dict[str, Any]) -> str:
    """Store component/machine model information in the inventory collection.

    Args:
        solution_id: The ID of the solution this inventory is associated with
        solution_data: Dictionary containing the solution data with component info

    Returns:
        The ID of the created inventory record
    """
    component_info = await extract_component_info(solution_data.get('text', ''))

    inventory_data = {
        'solution_id': solution_id,
        'manufacturer': solution_data.get('manufacturer', component_info.get('manufacturer', 'Unknown')),
        'model_name': component_info.get('model_name', 'Unknown'),
        'component_type': solution_data.get('component', component_info.get('component_type', 'Unknown')),
        'firmware_version': component_info.get('firmware_version'),
        'specifications': component_info.get('specifications', {}),
        'metadata': {
            'machine_type': solution_data.get('machine_type'),
            'error_code': solution_data.get('error_code'),
            'installation_date': component_info.get('installation_date'),
            'last_service': component_info.get('last_service')
        }
    }
    return inventory.create(inventory_data)
