import vertexai
from vertexai.language_models import TextEmbeddingModel
from datetime import datetime
import json
from typing import Dict, Any, List


def initialize_vertex_ai():
    vertexai.init()
    return TextEmbeddingModel.from_pretrained("text-embedding-005")


# Initialize the model
model = initialize_vertex_ai()


def embed_text(text):
    embeddings = model.get_embeddings([text])
    if embeddings and len(embeddings) > 0:
        return embeddings[0].values
    return []


def parse_json_field(data: Dict[str, Any], field: str) -> List[Any]:
    if field in data and isinstance(data[field], str):
        try:
            return json.loads(data[field])
        except json.JSONDecodeError:
            return []
    return data.get(field, [])


def serialize_datetime(data: Dict[str, Any]) -> Dict[str, Any]:
    result = data.copy()
    for key, value in result.items():
        if hasattr(value, 'isoformat'):  # Check if it's any datetime-like object
            result[key] = value.isoformat()
    return result


def solution_to_dict(obj):
    result = {}
    for column in obj.__table__.columns:
        value = getattr(obj, column.name)
        # Convert datetime objects to ISO format strings
        if isinstance(value, datetime):
            value = value.isoformat()
        result[column.name] = value
    return result
