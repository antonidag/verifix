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


Speech to text -> använda ai för att rätta till det.


Struktera frågan -> LLM 