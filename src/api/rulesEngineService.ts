import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_RULES_ENGINE_SERVICE_HOST;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const fetchResources = () => {
  return api.get('/resources');
};

export const fetchResourceById = (id: string) => {
  return api.get(`/resources/${id}`);
};
