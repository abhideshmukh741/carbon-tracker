import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_DJANGO_URL || 'http://localhost:8001/api',
});

// Request interceptor to add the auth token header to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const predict_api = axios.create({
    baseURL: import.meta.env.VITE_FASTAPI_URL || 'http://localhost:8000',
});

export default api;
