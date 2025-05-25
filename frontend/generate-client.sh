#!/bin/bash

# Ensure we're in the frontend directory
cd "$(dirname "$0")"

# Install openapi-typescript-codegen if not already installed
npm install openapi-typescript-codegen --save-dev

# Make sure the FastAPI server is running before generating
echo "Ensuring FastAPI server is accessible..."
if ! curl -s http://localhost:8000/openapi.json > /dev/null; then
    echo "Error: Cannot reach FastAPI server at http://localhost:8000"
    echo "Please make sure your FastAPI server is running first"
    exit 1
fi

# Create the output directory if it doesn't exist
mkdir -p src/api-client

# Generate the client
echo "Generating API client..."
npx openapi-typescript-codegen --input http://localhost:8000/openapi.json \
    --output src/api-client \
    --client fetch \
    --name VefiApi 