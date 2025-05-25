import axios from 'axios';

// Create a configuration instance
const config = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
    },
});

export { config }; 