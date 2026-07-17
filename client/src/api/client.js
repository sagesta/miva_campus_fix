import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
});

// Attach the JWT from localStorage to every request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('campusfix_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Normalise the { success, data, error } envelope into thrown errors / plain data.
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const apiError = error.response?.data?.error;
    const message = apiError?.message || error.message || 'Request failed';
    // Auto-logout on auth failure.
    if (error.response?.status === 401) {
      localStorage.removeItem('campusfix_token');
    }
    return Promise.reject(Object.assign(new Error(message), { details: apiError?.details }));
  }
);

export default api;
