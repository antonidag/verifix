import vertexai
from vertexai.language_models import TextEmbeddingModel
from datetime import datetime


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


def solution_to_dict(obj):
    result = {}
    for column in obj.__table__.columns:
        value = getattr(obj, column.name)
        # Convert datetime objects to ISO format strings
        if isinstance(value, datetime):
            value = value.isoformat()
        result[column.name] = value
    return result
