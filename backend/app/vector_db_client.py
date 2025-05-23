from qdrant_client import QdrantClient
from qdrant_client.models import PointStruct
import uuid
client = QdrantClient(path="./qdrant_data")  # Use `localhost` or docker for persistent

COLLECTION = "questions"
DIM = 384  # Same as your embedding dimension
THRESHOLD=0.8

# Initialize only once, not on every request
if not client.collection_exists(COLLECTION):
    client.recreate_collection(collection_name=COLLECTION, vectors_config={"size": DIM, "distance": "Cosine"})

def add_to_qdrant(text, embedding, solution_id):
    point_id = uuid.uuid4().int >> 64
    print(f"Adding point with id {point_id}")
    client.upsert(
        collection_name=COLLECTION,
        points=[PointStruct(id=point_id, vector=embedding, payload={"text": text, "solution_id": solution_id})]
    )

def search_similar(embedding):

    # Else fallback to vector search
    points = client.scroll(collection_name=COLLECTION, with_vectors=False)
    print(f"Points in collection: {points}")
    hits = client.search(collection_name=COLLECTION, query_vector=embedding, limit=1)
    print(hits)
    if hits and hits[0].score >= THRESHOLD:
        return {**hits[0].payload, "score": hits[0].score}

    return None