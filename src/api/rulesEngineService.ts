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

export const updateRule = (id: string, data: { name: string; attack_type: string, action_type: string, is_active: boolean }) => {
  const token = localStorage.getItem('token');
  return api.put(`/rules/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

export const createResource = (data: any) => {
  const token = localStorage.getItem('token');
  return api.post('/resources', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createRule = (data: any) => {
  const token = localStorage.getItem('token');
  return api.post('/rules', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createIPList = (data: any) => {
  const token = localStorage.getItem('token');
  return api.post('/ip_lists', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateResource = (id: string, data: any) => {
  const token = localStorage.getItem('token');
  return api.put(`/resources/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

export const attachRuleToResource = (resourceId: string, ruleId: string) => {
  const token = localStorage.getItem('token');
  return api.post(`/resources/${resourceId}/attach_rule`, { rule_id: ruleId }, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

export const detachRuleFromResource = (resourceId: string, ruleId: string) => {
  const token = localStorage.getItem('token');
  return api.post(`/resources/${resourceId}/detach_rule`, { rule_id: ruleId }, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

export const attachIpListToResource = (resourceId: string, ipListIdruleId: string) => {
  const token = localStorage.getItem('token');
  return api.post(`/resources/${resourceId}/attach_ip_list`, { ip_list_id: ipListIdruleId }, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

export const detachIpListFromResource = (resourceId: string, ipListIdruleId: string) => {
  const token = localStorage.getItem('token');
  return api.post(`/resources/${resourceId}/detach_ip_list`, { ip_list_id: ipListIdruleId }, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};
