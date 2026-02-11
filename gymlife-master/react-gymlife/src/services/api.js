import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api';

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

// Handle 401 responses (token expired / invalid)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('gymUser');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ── Auth API ──
export const authAPI = {
  // Generic
  login: (credentials) => api.post('/auth/login', credentials),
  register: (data) => api.post('/auth/register', data),

  // Role-specific login
  loginAdmin: (credentials) => api.post('/auth/login/admin', credentials),
  loginTrainer: (credentials) => api.post('/auth/login/trainer', credentials),
  loginClient: (credentials) => api.post('/auth/login/client', credentials),

  // Role-specific register
  registerAdmin: (data) => api.post('/auth/register/admin', data),
  registerClient: (data) => api.post('/auth/register/client', data),
  registerTrainer: (data) => api.post('/auth/register/trainer', data),
};

// ── Members API ──
export const membersAPI = {
  getAll: () => api.get('/manage/members'),
  getById: (id) => api.get(`/manage/members/${id}`),
  remove: (id) => api.delete(`/manage/members/${id}`),
};

// ── Exercises API ──
export const exercisesAPI = {
  getAll: () => api.get('/manage/exercises'),
  getById: (id) => api.get(`/manage/exercises/${id}`),
  create: (data) => api.post('/manage/exercises', data),
  update: (id, data) => api.put(`/manage/exercises/${id}`, data),
  remove: (id) => api.delete(`/manage/exercises/${id}`),
};

// ── Schedule API ──
export const scheduleAPI = {
  getByMember: (memberId) => api.get(`/manage/schedules/member/${memberId}`),
  create: (data) => api.post('/manage/schedules', data),
  update: (id, data) => api.put(`/manage/schedules/${id}`, data),
  remove: (id) => api.delete(`/manage/schedules/${id}`),
};

// ── Nutrition API ──
export const nutritionAPI = {
  getByMember: (memberId) => api.get(`/manage/nutrition/member/${memberId}`),
  create: (data) => api.post('/manage/nutrition', data),
  update: (id, data) => api.put(`/manage/nutrition/${id}`, data),
  remove: (id) => api.delete(`/manage/nutrition/${id}`),
};

// ── Payments API ──
export const paymentsAPI = {
  getByMember: (memberId) => api.get(`/manage/payments/member/${memberId}`),
  create: (data) => api.post('/manage/payments', data),
  update: (id, data) => api.put(`/manage/payments/${id}`, data),
  remove: (id) => api.delete(`/manage/payments/${id}`),
};

// ── Attendance API ──
export const attendanceAPI = {
  getByMember: (memberId) => api.get(`/manage/attendance/member/${memberId}`),
  create: (data) => api.post('/manage/attendance', data),
  remove: (id) => api.delete(`/manage/attendance/${id}`),
};

// ── Progress API (Client) ──
export const progressAPI = {
  getMyData: () => api.get('/client/my-data'),
  add: (data) => api.post('/client/progress', data),
  update: (id, data) => api.put(`/client/progress/${id}`, data),
  remove: (id) => api.delete(`/client/progress/${id}`),
  updateProfile: (data) => api.put('/client/profile', data),
};

// ── Notifications API ──
export const notificationsAPI = {
  getMy: () => api.get('/client/notifications'),
  markSeen: (id) => api.put(`/client/notifications/${id}/seen`),
};

// ── Trainers API ──
export const trainersAPI = {
  getAll: () => api.get('/manage/trainers'),
  getById: (id) => api.get(`/manage/trainers/${id}`),
  update: (id, data) => api.put(`/manage/trainers/${id}`, data),
  remove: (id) => api.delete(`/manage/trainers/${id}`),
};

export default api;