import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  googleLogin: (token) => api.post('/auth/google', { token }),
};

// Tuition APIs
export const tuitionAPI = {
  getAllTuitions: (params) => api.get('/tuitions', { params }),
  getLatestTuitions: () => api.get('/tuitions/latest'),
  getTuitionById: (id) => api.get(`/tuitions/${id}`),
  createTuition: (data) => api.post('/tuitions', data),
  updateTuition: (id, data) => api.put(`/tuitions/${id}`, data),
  deleteTuition: (id) => api.delete(`/tuitions/${id}`),
  getMyTuitions: () => api.get('/tuitions/my/tuitions'),
};

// User/Tutor APIs
export const userAPI = {
  getAllTutors: (params) => api.get('/users/tutors', { params }),
  getLatestTutors: () => api.get('/users/tutors/latest'),
  getUserProfile: (userId) => api.get(`/users/${userId}`),
  updateProfile: (data) => api.put('/users/profile', data),
};

// Application APIs
export const applicationAPI = {
  applyForTuition: (tuitionId) => api.post(`/applications/${tuitionId}`),
  getMyApplications: () => api.get('/applications/my/applications'),
  getTuitionApplications: (tuitionId) => api.get(`/applications/tuition/${tuitionId}`),
  updateApplicationStatus: (id, status) => api.put(`/applications/${id}/status`, { status }),
};

// Payment APIs
export const paymentAPI = {
  createPayment: (data) => api.post('/payments', data),
  getMyPayments: () => api.get('/payments/my/payments'),
  updatePaymentStatus: (id, status) => api.put(`/payments/${id}/status`, { status }),
};

// Admin APIs
export const adminAPI = {
  getDashboardStats: () => api.get('/admin/stats'),
  getAllUsers: (params) => api.get('/admin/users', { params }),
  getAllTuitions: (params) => api.get('/admin/tuitions', { params }),
  updateTuitionStatus: (id, status) => api.put(`/admin/tuitions/${id}/status`, { status }),
  updateUserStatus: (id, status) => api.put(`/admin/users/${id}/status`, { status }),
};

export default api;