import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
};

export const usersAPI = {
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`),
  update: (id, data) => api.put(`/users/${id}`, data),
  markAttendance: (id, date) => api.post(`/users/${id}/attendance`, { date }),
  addFitnessData: (id, data) => api.post(`/users/${id}/fitness`, data),
  deleteFitnessData: (id, fitnessId) => api.delete(`/users/${id}/fitness/${fitnessId}`),
};

export const exercisesAPI = {
  getAll: () => api.get('/exercises'),
  create: (data) => api.post('/exercises', data),
  assign: (data) => api.post('/exercises/assign', data),
  removeFromSchedule: (userId, exerciseId) => api.delete(`/exercises/assign/${userId}/${exerciseId}`),
};

export const statsAPI = {
  getStats: () => api.get('/stats'),
};

export default api;