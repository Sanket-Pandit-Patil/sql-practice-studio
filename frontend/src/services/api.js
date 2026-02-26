import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
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

export const getHint = async (assignmentId, query, errorMessage) => {
    const response = await api.post('/execute/hint', { assignmentId, query, errorMessage });
    return response.data;
};

export default api;
