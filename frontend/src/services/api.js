import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
});

// Add JWT to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const getAssignments = async () => {
    const response = await api.get('/assignments');
    return response.data;
};

export const getAssignmentById = async (id) => {
    const response = await api.get(`/assignments/${id}`);
    return response.data;
};

export const executeQuery = async (query, assignmentId) => {
    const response = await api.post('/execute', { query, assignmentId });
    return response.data;
};

export const getHint = async (assignmentId, query, error) => {
    const res = await api.post('/execute/hint', { assignmentId, query, error });
    return res.data;
};

// PROGRESS & ATTEMPTS
export const saveAttempt = async (assignmentId, query, isCorrect, error) => {
    const res = await api.post('/attempts', { assignmentId, query, isCorrect, error });
    return res.data;
};

export const getAttempts = async (assignmentId) => {
    const res = await api.get(`/attempts/${assignmentId}`);
    return res.data;
};

export const getProgressSummary = async () => {
    const res = await api.get('/attempts/progress/summary');
    return res.data;
};

export default api;
