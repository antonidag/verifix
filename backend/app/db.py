from google.cloud import firestore
from datetime import datetime
import os
from typing import Optional, Dict, List, Any
import json
import numpy as np

db = None

def get_db():
    global db
    if db is None:
        project_id = os.getenv("GOOGLE_CLOUD_PROJECT")
        db = firestore.Client(project=project_id, database="verifixdb")
    return db

def init():
    """Initialize Firestore connection"""
    get_db()

class FirestoreSolution:
    def __init__(self):
        self.collection = get_db().collection('solutions')

    def _serialize_datetime(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Convert Firestore datetime objects to ISO format strings"""
        result = data.copy()
        for key, value in result.items():
            if hasattr(value, 'isoformat'):  # Check if it's any datetime-like object
                result[key] = value.isoformat()
        return result

    def create(self, solution_data: Dict[str, Any]) -> str:
        """Create a new solution document"""
        # Add timestamps
        solution_data['created_at'] = datetime.utcnow()
        solution_data['updated_at'] = datetime.utcnow()

        # Convert any None values to empty strings for Firestore
        for key, value in solution_data.items():
            if value is None:
                solution_data[key] = ""
            elif isinstance(value, list):
                solution_data[key] = json.dumps(value)

        # Add the document to Firestore
        doc_ref = self.collection.document()
        doc_ref.set(solution_data)
        return doc_ref.id

    def get(self, solution_id: str) -> Optional[Dict[str, Any]]:
        """Get a solution by ID"""
        doc_ref = self.collection.document(solution_id)
        doc = doc_ref.get()
        if doc.exists:
            data = doc.to_dict()
            data['id'] = doc.id
            # Convert stored JSON strings back to lists
            if 'solution_steps' in data and isinstance(data['solution_steps'], str):
                data['solution_steps'] = json.loads(data['solution_steps'])
            if 'tags' in data and isinstance(data['tags'], str):
                data['tags'] = json.loads(data['tags'])
            return self._serialize_datetime(data)
        return None

    def list_all(self) -> List[Dict[str, Any]]:
        """Get all solutions"""
        docs = self.collection.stream()
        solutions = []
        for doc in docs:
            print(f"Processing document: {doc.id}")
            data = doc.to_dict()
            data['id'] = doc.id
            # Convert stored JSON strings back to lists
            if 'solution_steps' in data and isinstance(data['solution_steps'], str):
                data['solution_steps'] = json.loads(data['solution_steps'])
            if 'tags' in data and isinstance(data['tags'], str):
                data['tags'] = json.loads(data['tags'])
            solutions.append(self._serialize_datetime(data))
        return solutions

    def update(self, solution_id: str, solution_data: Dict[str, Any]) -> bool:
        """Update a solution"""
        solution_data['updated_at'] = datetime.utcnow()

        # Convert lists to JSON strings for storage
        if 'solution_steps' in solution_data and isinstance(solution_data['solution_steps'], list):
            solution_data['solution_steps'] = json.dumps(solution_data['solution_steps'])
        if 'tags' in solution_data and isinstance(solution_data['tags'], list):
            solution_data['tags'] = json.dumps(solution_data['tags'])

        doc_ref = self.collection.document(solution_id)
        if doc_ref.get().exists:
            doc_ref.update(solution_data)
            return True
        return False

class FirestoreQuestion:
    def __init__(self):
        self.collection = get_db().collection('questions')
        self.THRESHOLD = 0.8  # Similarity threshold

    def _serialize_datetime(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Convert Firestore datetime objects to ISO format strings"""
        result = data.copy()
        for key, value in result.items():
            if hasattr(value, 'isoformat'):  # Check if it's any datetime-like object
                result[key] = value.isoformat()
        return result

    def create(self, question_data: Dict[str, Any]) -> str:
        """Create a new question document with embedding"""
        doc_ref = self.collection.document()
        # Convert embedding to list if it's a numpy array
        if 'embedding' in question_data and hasattr(question_data['embedding'], 'tolist'):
            question_data['embedding'] = question_data['embedding'].tolist()

        doc_ref.set({
            **question_data,
            'created_at': datetime.utcnow()
        })
        return doc_ref.id

    def get(self, question_id: str) -> Optional[Dict[str, Any]]:
        """Get a question by ID"""
        doc_ref = self.collection.document(question_id)
        doc = doc_ref.get()
        if doc.exists:
            data = doc.to_dict()
            data['id'] = doc.id
            return self._serialize_datetime(data)
        return None

    def list_all(self) -> List[Dict[str, Any]]:
        """Get all questions"""
        docs = self.collection.stream()
        return [self._serialize_datetime({**doc.to_dict(), 'id': doc.id}) for doc in docs]

    def find_similar(self, embedding, limit: int = 5, min_score: float = 0.5) -> List[Dict[str, Any]]:
        """Find most similar questions using cosine similarity.

        Args:
            embedding: The query embedding to compare against
            limit: Maximum number of results to return (default: 5)
            min_score: Minimum similarity score to include in results (default: 0.5)

        Returns:
            List of matches sorted by similarity score (highest first)
        """
        # Convert input embedding to numpy array if it isn't already
        query_embedding = np.array(embedding)

        # Store all matches above threshold
        matches = []

        # Stream all documents
        for doc in self.collection.stream():
            doc_data = doc.to_dict()
            if 'embedding' not in doc_data:
                continue

            # Convert document embedding to numpy array
            doc_embedding = np.array(doc_data['embedding'])

            # Calculate cosine similarity
            similarity = np.dot(query_embedding, doc_embedding) / (
                np.linalg.norm(query_embedding) * np.linalg.norm(doc_embedding)
            )

            if similarity >= min_score:
                match_data = {
                    **doc_data,
                    'id': doc.id,
                    'score': float(similarity)
                }
                # Ensure solution_id is a string
                if 'solution_id' in match_data:
                    match_data['solution_id'] = str(match_data['solution_id'])
                matches.append(self._serialize_datetime(match_data))

        # Sort matches by score in descending order
        matches.sort(key=lambda x: x['score'], reverse=True)

        # Return top N matches
        return matches[:limit]

class FirestoreInventory:
    def __init__(self):
        self.collection = get_db().collection('inventory')

    def _serialize_datetime(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Convert Firestore datetime objects to ISO format strings"""
        result = data.copy()
        for key, value in result.items():
            if hasattr(value, 'isoformat'):  # Check if it's any datetime-like object
                result[key] = value.isoformat()
        return result

    def create(self, inventory_data: Dict[str, Any]) -> str:
        """Create a new inventory document"""
        # Add timestamps
        inventory_data['created_at'] = datetime.utcnow()
        inventory_data['updated_at'] = datetime.utcnow()

        # Add the document to Firestore
        doc_ref = self.collection.document()
        doc_ref.set(inventory_data)
        return doc_ref.id

    def get(self, inventory_id: str) -> Optional[Dict[str, Any]]:
        """Get an inventory item by ID"""
        doc_ref = self.collection.document(inventory_id)
        doc = doc_ref.get()
        if doc.exists:
            data = doc.to_dict()
            data['id'] = doc.id
            return self._serialize_datetime(data)
        return None

    def list_all(self) -> List[Dict[str, Any]]:
        """Get all inventory items"""
        docs = self.collection.stream()
        return [self._serialize_datetime({**doc.to_dict(), 'id': doc.id}) for doc in docs]

    def get_by_solution_id(self, solution_id: str) -> List[Dict[str, Any]]:
        """Get all inventory items associated with a solution"""
        docs = self.collection.where('solution_id', '==', solution_id).stream()
        return [self._serialize_datetime({**doc.to_dict(), 'id': doc.id}) for doc in docs]

# Create instances for global use
solutions = FirestoreSolution()
questions = FirestoreQuestion()
inventory = FirestoreInventory()