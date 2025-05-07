import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_AUTH_SERVICE_HOST;

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

export const registerUser = (data: { username: string; password: string }) => {
    return api.post('/register', data);
};

export const loginUser = (data: { username: string; password: string }) => {
    return api.post('/auth', data);
};

