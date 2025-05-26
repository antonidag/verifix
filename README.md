# 🔍 Verifix – AI-Powered Troubleshooting Assistant

Verifix is an AI-driven assistant built to help technicians and site managers solve problems faster. It captures real-world problem descriptions from alarms, errors, and symptoms — then links them to verified solutions sourced from internal documentation or previously resolved cases.

Made for the [Google AI Hackathon](https://cillers.com/hackathons/google-ai-hackathon-tekniska-museet-2025)

## ✨ Key Features

- 🔗 **Semantic Search**  
  Uses hybrid vector search to find the most relevant past solution to a given error or symptom.

- 💡 **LLM-Powered Report Generation**  
  When no solution is found, an LLM agent researches the issue and drafts a potential solution.

- ✅ **Verified & Documented Fixes**  
  Store and retrieve verified fixes with optional document links.

- 🧠 **Self-Learning Knowledge Base**  
  With each new problem and resolution, the system becomes smarter over time.

- ⚙️ **FastAPI Backend**  
  Built using Python, FastAPI, and Qdrant for high performance and flexibility.

---

## 📦 API Endpoints

### `POST /ask`  
Searches for a similar problem and returns the most relevant verified solution.

**Request Body:**
```json
{
  "question": "PLC error 4096 on line 3"
}
```

## Install
Install python3.11

```
cd app
python3.11 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Exit environment
```
deactivate
```

Run with:
```
uvicorn main:app --reload
```

Restart shell: 
```
exec zsh

```


Speech to text -> använda ai för att rätta till det.
Bild, fråga om muttern är ok? eller för sliten? 
Ser du några brand faror

Struktera frågan -> LLM 

# Manufacturing Solutions API

A FastAPI-based system for managing and retrieving manufacturing solutions and troubleshooting information. This system helps technicians find solutions to common manufacturing problems and document new solutions.

## Features

- Question-answer system with manufacturing context
- Solution management and retrieval
- Automated investigation of problems
- Vector-based similarity search for finding relevant solutions
- Comprehensive API documentation

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd verifix
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Make sure you have Ollama installed and running (required for LLM functionality):
```bash
# Install Ollama from https://ollama.ai/
```

## Usage

1. Start the FastAPI server:
```bash
uvicorn backend.app.main:app --reload
```

2. Access the API documentation:
   - Swagger UI: [http://localhost:8000/docs](http://localhost:8000/docs)
   - ReDoc: [http://localhost:8000/redoc](http://localhost:8000/redoc)

## API Documentation

The API documentation is automatically generated and can be accessed through two different interfaces:

### ReDoc
- Clean, three-panel documentation
- URL: [http://localhost:8000/redoc](http://localhost:8000/redoc)
- Features:
  - Search functionality
  - Right-hand schema definitions
  - Response examples

## Main Endpoints

- `POST /ask`: Submit a question with manufacturing context
- `POST /solution`: Add a new solution
- `GET /solution/{solution_id}`: Retrieve a specific solution
- `POST /investigate`: Start an automated investigation

## Environment Setup

Make sure you have the following prerequisites:
- Python 3.7+
- Ollama LLM service
- Qdrant vector database (for similarity search)

## License

Proprietary - All rights reserved 
