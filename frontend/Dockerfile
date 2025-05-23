FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

COPY . .

# Expose server port
EXPOSE 8080

# Start dev server
CMD ["npm", "run", "dev"]
