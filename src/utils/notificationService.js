import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with auth header
const api = axios.create({
  baseURL: API_URL
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Get all notifications for current user
 * @param {Object} params - Query parameters (page, limit, unreadOnly)
 */
export const getNotifications = async (params = {}) => {
  try {
    const response = await api.get('/notifications', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error.response?.data || error;
  }
};

/**
 * Get unread notification count
 */
export const getUnreadCount = async () => {
  try {
    const response = await api.get('/notifications/unread-count');
    return response.data;
  } catch (error) {
    console.error('Error fetching unread count:', error);
    throw error.response?.data || error;
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
    console.error('Error marking as read:', error);
    throw error.response?.data || error;
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
    console.error('Error marking all as read:', error);
    throw error.response?.data || error;
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
    console.error('Error deleting notification:', error);
    throw error.response?.data || error;
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
    console.error('Error deleting read notifications:', error);
    throw error.response?.data || error;
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