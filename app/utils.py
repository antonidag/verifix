from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")

def embed_text(text):
    return model.encode(text).tolist()


from datetime import datetime

def solution_to_dict(obj):
    result = {}
    for column in obj.__table__.columns:
        value = getattr(obj, column.name)
        # Convert datetime objects to ISO format strings
        if isinstance(value, datetime):
            value = value.isoformat()
        result[column.name] = value
    return result