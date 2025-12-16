// utils/notificationService.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with auth header
const api = axios.create({
  baseURL: API_URL
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('🔑 Request with token:', config.url);
    } else {
      console.warn('⚠️ No token found for request:', config.url);
    }
    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    console.log('✅ Response success:', response.config.url);
    return response;
  },
  (error) => {
    const { config, response } = error;
    
    console.error('❌ API Error:', {
      url: config?.url,
      method: config?.method,
      status: response?.status,
      message: response?.data?.message || error.message
    });

    // Handle 401 - Token expired or invalid
    if (response?.status === 401) {
      console.warn('🚪 Authentication failed - clearing session');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Don't redirect here - let components handle it
      // Just return a meaningful error
      return Promise.reject({
        success: false,
        message: 'Authentication failed. Please login again.',
        status: 401
      });
    }

    // Handle 403 - Forbidden
    if (response?.status === 403) {
      return Promise.reject({
        success: false,
        message: 'Access denied. You do not have permission.',
        status: 403
      });
    }

    return Promise.reject(error);
  }
);

/**
 * Get all notifications for current user
 * @param {Object} params - Query parameters (page, limit, unreadOnly)
 */
export const getNotifications = async (params = {}) => {
  try {
    // Check if token exists
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('⚠️ No token - skipping notification fetch');
      return {
        success: false,
        count: 0,
        total: 0,
        unreadCount: 0,
        page: 1,
        pages: 0,
        data: [],
        message: 'Not authenticated'
      };
    }

    console.log('📬 Fetching notifications with params:', params);
    const response = await api.get('/notifications', { params });
    console.log('✅ Notifications fetched:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching notifications:', error.response?.data || error.message);
    
    // Return empty data structure instead of throwing
    return {
      success: false,
      count: 0,
      total: 0,
      unreadCount: 0,
      page: 1,
      pages: 0,
      data: [],
      message: error.message || 'Failed to fetch notifications'
    };
  }
};

/**
 * Get unread notification count
 */
export const getUnreadCount = async () => {
  try {
    // Check if token exists
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('⚠️ No token - skipping unread count fetch');
      return { 
        success: false, 
        count: 0,
        message: 'Not authenticated'
      };
    }

    const response = await api.get('/notifications/unread-count');
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching unread count:', error.response?.data || error.message);
    // Return 0 instead of throwing
    return { 
      success: false, 
      count: 0,
      message: error.message || 'Failed to fetch unread count'
    };
  }
};

/**
 * Mark notification as read
 * @param {String} id - Notification ID
 */
export const markAsRead = async (id) => {
  try {
    const response = await api.patch(`/notifications/${id}/read`);
    return response.data;
  } catch (error) {
    console.error('❌ Error marking as read:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Mark all notifications as read
 */
export const markAllAsRead = async () => {
  try {
    const response = await api.patch('/notifications/mark-all-read');
    return response.data;
  } catch (error) {
    console.error('❌ Error marking all as read:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Delete notification
 * @param {String} id - Notification ID
 */
export const deleteNotification = async (id) => {
  try {
    const response = await api.delete(`/notifications/${id}`);
    return response.data;
  } catch (error) {
    console.error('❌ Error deleting notification:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Delete all read notifications
 */
export const deleteAllRead = async () => {
  try {
    const response = await api.delete('/notifications/clear-read');
    return response.data;
  } catch (error) {
    console.error('❌ Error deleting read notifications:', error.response?.data || error.message);
    throw error;
  }
};

export default {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  deleteAllRead
};