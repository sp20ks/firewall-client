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

export const fetchRules = () => {
  return api.get('/rules');
};

export const fetchIPLists = () => {
  return api.get('/ip_lists');
};

export const updateIPList = (id: string, data: { ip: string; list_type: string }) => {
  const token = localStorage.getItem('token');
  return api.put(`/ip_lists/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};
