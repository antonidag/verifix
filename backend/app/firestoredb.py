from google.cloud import firestore
from datetime import datetime
import os
from typing import Optional, Dict, List, Any
import json

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
            return data
        return None

    def list_all(self) -> List[Dict[str, Any]]:
        """Get all solutions"""
        docs = self.collection.stream()
        solutions = []
        for doc in docs:
            # print
            print(f"Processing document: {doc.id}")
            data = doc.to_dict()
            data['id'] = doc.id
            # Convert stored JSON strings back to lists
            if 'solution_steps' in data and isinstance(data['solution_steps'], str):
                data['solution_steps'] = json.loads(data['solution_steps'])
            if 'tags' in data and isinstance(data['tags'], str):
                data['tags'] = json.loads(data['tags'])
            solutions.append(data)
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

    def create(self, question_data: Dict[str, Any]) -> str:
        """Create a new question document"""
        doc_ref = self.collection.document()
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
            return data
        return None

    def list_all(self) -> List[Dict[str, Any]]:
        """Get all questions"""
        docs = self.collection.stream()
        return [{**doc.to_dict(), 'id': doc.id} for doc in docs]

# Create instances for global use
solutions = FirestoreSolution()
questions = FirestoreQuestion()