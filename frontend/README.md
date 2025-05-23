# Verifix

A React + Vite + Tailwind application that help technicians and site managers solve problems faster. It captures real-world problem descriptions from alarms, errors, and symptoms — then links them to verified solutions sourced from internal documentation or previously resolved cases.

## Tech Stack

- **React 18** - Frontend framework
- **Vite** - Development environment
- **Tailwind CSS** - Styling framework
- **ESLint** - Code linting

## Installation

Ensure you have **Node.js >=20.0.0** installed.

```sh
# Clone the repository
git clone https://github.com/antonidag/verifix.git
cd verifix/frontend

# Install dependencies
npm install
```

## Usage

Start the development server:

```sh
npm run dev
```

Run tests:

```sh
npm test
```

Build for production:

```sh
npm run build
```

Preview the production build:

```sh
npm run preview
```

Lint the code:

```sh
npm run lint
```

## Project Structure

```
├── src
│   ├── components       # Reusable UI components
│   ├── hooks            # Custom React hooks
│   ├── lib              # Helper functions for logic
│   ├── App.tsx          # Main application file
│   ├── main.tsx         # Entry point
│   ├── index.css        # Global styles
│
├── public               # Static assets
├── package.json         # Project metadata
├── vite.config.ts       # Vite configuration
└── README.md            # This file
```
