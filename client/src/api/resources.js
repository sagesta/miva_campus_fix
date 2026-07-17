import api from './client.js';

export const authApi = {
  login: (body) => api.post('/auth/login', body).then((r) => r.data.data),
  register: (body) => api.post('/auth/register', body).then((r) => r.data.data),
  me: () => api.get('/auth/me').then((r) => r.data.data),
};

export const categoriesApi = {
  list: () => api.get('/categories').then((r) => r.data.data),
};

export const usersApi = {
  officers: () => api.get('/users?role=OFFICER').then((r) => r.data.data),
};

export const requestsApi = {
  list: (params) => api.get('/requests', { params }).then((r) => r.data),
  get: (id) => api.get(`/requests/${id}`).then((r) => r.data.data),
  create: (body) => api.post('/requests', body).then((r) => r.data.data),
  cancel: (id) => api.post(`/requests/${id}/cancel`).then((r) => r.data.data),
  assign: (id, body) => api.post(`/requests/${id}/assign`, body).then((r) => r.data.data),
  updateStatus: (id, body) => api.post(`/requests/${id}/status`, body).then((r) => r.data.data),
};
