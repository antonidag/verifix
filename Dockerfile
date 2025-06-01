#    ___ _    ___ ___ _  _ _____
#   / __| |  |_ _| __| \| |_   _|
#  | (__| |__ | || _|| .` | | |
#   \___|____|___|___|_|\_| |_|

# Build React frontend
FROM node:20-alpine AS build-frontend

WORKDIR /frontend

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ .

ENV VITE_BASE_URL=/static/
RUN npm run build

#   ___ ___ _____   _____ ___
#  / __| __| _ \ \ / / __| _ \
#  \__ \ _||   /\ V /| _||   /
#  |___/___|_|_\ \_/ |___|_|_\

# Build Python FastAPI backend
FROM python:3.11-slim
WORKDIR /backend

# Install Python dependencies
COPY backend/requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source code
COPY backend/app/ ./app

# Copy built frontend into backend's static directory
COPY --from=build-frontend /frontend/dist ./app/static

# Set environment variables
ENV FAST_LLM=google_vertexai:gemini-2.5-flash-preview-05-20 \
    SMART_LLM=google_vertexai:gemini-2.5-pro-preview-05-06 \
    STRATEGIC_LLM=google_vertexai:gemini-2.5-pro-preview-05-06 \
    EMBEDDING=google_vertexai:text-embedding-004 \
    PORT=8080

# Expose port
EXPOSE 8080

WORKDIR /backend/app

# Start FastAPI with Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
