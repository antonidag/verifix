#    ___ _    ___ ___ _  _ _____
#   / __| |  |_ _| __| \| |_   _|
#  | (__| |__ | || _|| .` | | |
#   \___|____|___|___|_|\_| |_|

# Build React frontend
FROM node:20-alpine as build-frontend

WORKDIR /frontend

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ .

RUN npm run build

#   ___ ___ _____   _____ ___
#  / __| __| _ \ \ / / __| _ \
#  \__ \ _||   /\ V /| _||   /
#  |___/___|_|_\ \_/ |___|_|_\

# Build Python FastAPI backend
FROM python:3.11-slim as production
WORKDIR /app

# Install Python dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source code
COPY backend/app ./app

# Copy built frontend into backend's static directory
COPY --from=build-frontend /frontend/dist ./app/static

# Expose port
EXPOSE 8000

# Start FastAPI with Uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
