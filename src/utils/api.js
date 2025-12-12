import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

console.log('🔥 API Base URL:', `${API_URL}/api`);

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('📤 API Request:', config.method?.toUpperCase(), config.url);
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.config.url, response.data);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error.response?.status, error.response?.data || error.message);
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
  getAllTuitions: (params) => {
    console.log('🔍 Fetching tuitions with params:', params);
    return api.get('/tuitions', { params });
  },
  getLatestTuitions: () => {
    console.log('🔍 Fetching latest tuitions');
    return api.get('/tuitions/latest');
  },
  getFilterOptions: () => {
    console.log('🔍 Fetching filter options');
    return api.get('/tuitions/filter-options');
  },
  getTuitionById: (id) => api.get(`/tuitions/${id}`),
  createTuition: (data) => api.post('/tuitions', data),
  updateTuition: (id, data) => api.put(`/tuitions/${id}`, data),
  deleteTuition: (id) => api.delete(`/tuitions/${id}`),
  getMyTuitions: () => api.get('/tuitions/my/tuitions'),
};

// User/Tutor APIs
export const userAPI = {
  getAllTutors: (params) => {
    console.log('🔍 Fetching tutors with params:', params);
    return api.get('/users/tutors', { params });
  },
  getLatestTutors: () => {
    console.log('🔍 Fetching latest tutors');
    return api.get('/users/tutors/latest');
  },
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

// ✅ NEW - Review APIs
export const reviewAPI = {
  createReview: (data) => {
    console.log('📝 Creating review:', data);
    return api.post('/reviews', data);
  },
  getTutorReviews: (tutorId, params = {}) => {
    console.log('🔍 Fetching reviews for tutor:', tutorId);
    return api.get(`/reviews/tutor/${tutorId}`, { params });
  },
  getMyReviews: () => {
    console.log('🔍 Fetching my reviews');
    return api.get('/reviews/my-reviews');
  },
  updateReview: (reviewId, data) => {
    console.log('✏️ Updating review:', reviewId, data);
    return api.put(`/reviews/${reviewId}`, data);
  },
  deleteReview: (reviewId) => {
    console.log('🗑️ Deleting review:', reviewId);
    return api.delete(`/reviews/${reviewId}`);
  },
  canReviewTutor: (tutorId) => {
    console.log('🔍 Checking if can review tutor:', tutorId);
    return api.get(`/reviews/can-review/${tutorId}`);
  }
};

export default api;