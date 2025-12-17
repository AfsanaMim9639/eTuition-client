import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 30000,
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
    // ✅ Handle timeout - Silent fail, let components handle it
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      console.warn('⏱️ Request timeout');
      return Promise.reject(error);
    }
    
    // ✅ Handle network errors - Silent fail, let components handle it
    if (error.message === 'Network Error' || !error.response) {
      console.warn('🌐 Network error');
      return Promise.reject(error);
    }
    
    // ✅ Handle 401 - ONLY logout for real auth errors (KEEP TOAST)
    if (error.response?.status === 401) {
      const errorMessage = error.response?.data?.message || '';
      
      // STRICT: Only these exact messages cause logout
      const mustLogout = 
        errorMessage.includes('Token has expired') ||
        errorMessage.includes('Invalid token') ||
        errorMessage.includes('No token provided') ||
        errorMessage.includes('jwt expired') ||
        errorMessage.includes('jwt malformed');
      
      if (mustLogout) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        toast.error('Session expired. Please login again.');
        
        setTimeout(() => {
          window.location.href = '/login';
        }, 1000);
      }
    }
    
    // ✅ Handle 403 - Account deactivated (KEEP TOAST)
    if (error.response?.status === 403) {
      const errorMessage = error.response?.data?.message || '';
      
      if (errorMessage.includes('deactivated') || 
          errorMessage.includes('blocked') ||
          errorMessage.includes('suspended')) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        toast.error('Account has been deactivated.');
        
        setTimeout(() => {
          window.location.href = '/login';
        }, 1000);
      }
    }
    
    // ✅ Handle 500 - Silent fail, let components handle it
    if (error.response?.status === 500) {
      console.error('🔥 Server error:', error.response?.data?.message);
      // No toast - let components show error UI
    }
    
    // ✅ Handle 503 - Silent fail, let components handle it
    if (error.response?.status === 503) {
      console.warn('⚠️ Service unavailable');
      // No toast - let components show error UI
    }
    
    return Promise.reject(error);
  }
);

// Helper functions
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  return !!(token && user);
};

export const getCurrentUser = () => {
  try {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/login';
};

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
  getFilterOptions: () => api.get('/tuitions/filter-options'),
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
  // Apply for tuition (with form data)
  applyForTuition: (data) => api.post('/applications/apply', data),
  
  // Check if already applied to a tuition
  checkIfApplied: (tuitionId) => api.get(`/applications/check/${tuitionId}`),
  
  // Get my applications (Tutor view)
  getMyApplications: () => api.get('/applications/my-applications'),
  
  // Get applications for a specific tuition (Student view)
  getTuitionApplications: (tuitionId) => api.get(`/applications/tuition/${tuitionId}`),
  
  // Update application status (Accept/Reject)
  updateApplicationStatus: (applicationId, data) => 
    api.patch(`/applications/${applicationId}/status`, data),
  
  //Update application
  updateApplication: (applicationId, data) => 
    api.patch(`/applications/${applicationId}`, data),
  // Withdraw application (Tutor)
  withdrawApplication: (applicationId) => 
    api.patch(`/applications/${applicationId}/withdraw`),
};


// Payment APIs
export const paymentAPI = {
  // Create payment intent (Stripe)
  createPaymentIntent: (data) => api.post('/payments/create-intent', data),
  
  // Confirm payment after Stripe success
  confirmPayment: (data) => api.post('/payments/confirm', data),
  
  // Get my payments history - ✅ FIXED PATH
  getMyPayments: () => api.get('/payments/my/payments'),
  
  // Update payment status (Admin)
  updatePaymentStatus: (id, status) => api.put(`/payments/${id}/status`, { status }),
};

// Schedule APIs
export const scheduleAPI = {
  getUpcomingClasses: (limit = 10) => api.get('/schedules/upcoming', { params: { limit } }),
  getTodayClasses: () => api.get('/schedules/today'),
  getClassStatistics: () => api.get('/schedules/stats'),
  getAllSchedules: (params) => api.get('/schedules', { params }),
  getScheduleById: (id) => api.get(`/schedules/${id}`),
  createSchedule: (data) => api.post('/schedules', data),
  updateSchedule: (id, data) => api.put(`/schedules/${id}`, data),
  deleteSchedule: (id) => api.delete(`/schedules/${id}`),
  cancelSchedule: (id, reason) => api.patch(`/schedules/${id}/cancel`, { reason }),
  startClass: (id) => api.patch(`/schedules/${id}/start`),
  completeClass: (id) => api.patch(`/schedules/${id}/complete`),
  markAttendance: (id, data) => api.patch(`/schedules/${id}/attendance`, data),
  getMySchedules: () => api.get('/schedules/my/schedules'),
};

// Admin APIs
export const adminAPI = {
  getDashboardStats: () => api.get('/admin/stats'),
  getAllUsers: (params) => api.get('/admin/users', { params }),
  getAllTuitions: (params) => api.get('/admin/tuitions', { params }),
  getPendingTuitions: () => api.get('/tuitions/admin/pending'),
  getAllTuitionsAdmin: (params) => api.get('/tuitions/admin/all', { params }),
  approveTuition: (id) => api.patch(`/tuitions/admin/${id}/approve`),
  rejectTuition: (id, reason) => api.patch(`/tuitions/admin/${id}/reject`, { reason }),
  updateTuitionStatus: (id, status) => api.put(`/admin/tuitions/${id}/status`, { status }),
  updateUserStatus: (id, status) => api.put(`/admin/users/${id}/status`, { status }),
};

// Review APIs
export const reviewAPI = {
  createReview: (data) => api.post('/reviews', data),
  getTutorReviews: (tutorId, params = {}) => api.get(`/reviews/tutor/${tutorId}`, { params }),
  getMyReviews: () => api.get('/reviews/my-reviews'),
  updateReview: (reviewId, data) => api.put(`/reviews/${reviewId}`, data),
  deleteReview: (reviewId) => api.delete(`/reviews/${reviewId}`),
  canReviewTutor: (tutorId) => api.get(`/reviews/can-review/${tutorId}`),
};

export default api;