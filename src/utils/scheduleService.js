import api from './api'; // Your axios instance

// Base URL
const BASE_URL = '/schedules';

// ==================== CREATE SCHEDULE ====================
export const createSchedule = async (scheduleData) => {
  const response = await api.post(BASE_URL, scheduleData);
  return response.data;
};

// ==================== GET ALL SCHEDULES ====================
export const getSchedules = async (params = {}) => {
  const response = await api.get(BASE_URL, { params });
  return response.data;
};

// ==================== GET UPCOMING CLASSES ====================
export const getUpcomingClasses = async (limit = 10) => {
  const response = await api.get(`${BASE_URL}/upcoming`, {
    params: { limit }
  });
  return response.data;
};

// ==================== GET TODAY'S CLASSES ====================
export const getTodayClasses = async () => {
  const response = await api.get(`${BASE_URL}/today`);
  return response.data;
};

// ==================== GET SINGLE SCHEDULE ====================
export const getScheduleById = async (id) => {
  const response = await api.get(`${BASE_URL}/${id}`);
  return response.data;
};

// ==================== UPDATE SCHEDULE ====================
export const updateSchedule = async (id, updates) => {
  const response = await api.put(`${BASE_URL}/${id}`, updates);
  return response.data;
};

// ==================== CANCEL SCHEDULE ====================
export const cancelSchedule = async (id, reason) => {
  const response = await api.patch(`${BASE_URL}/${id}/cancel`, { reason });
  return response.data;
};

// ==================== MARK ATTENDANCE ====================
export const markAttendance = async (id, role, isPresent) => {
  const response = await api.patch(`${BASE_URL}/${id}/attendance`, {
    role,
    isPresent
  });
  return response.data;
};

// ==================== COMPLETE CLASS ====================
export const completeClass = async (id) => {
  const response = await api.patch(`${BASE_URL}/${id}/complete`);
  return response.data;
};

// ==================== START CLASS ====================
export const startClass = async (id) => {
  const response = await api.patch(`${BASE_URL}/${id}/start`);
  return response.data;
};

// ==================== GET CLASS STATISTICS ====================
export const getClassStatistics = async () => {
  const response = await api.get(`${BASE_URL}/stats`);
  return response.data;
};

// ==================== DELETE SCHEDULE ====================
export const deleteSchedule = async (id) => {
  const response = await api.delete(`${BASE_URL}/${id}`);
  return response.data;
};

// ==================== HELPER FUNCTIONS ====================

// Format date for API
export const formatDateForAPI = (date) => {
  return new Date(date).toISOString();
};

// Get date range for week
export const getWeekRange = (date = new Date()) => {
  const start = new Date(date);
  start.setDate(start.getDate() - start.getDay()); // Sunday
  start.setHours(0, 0, 0, 0);
  
  const end = new Date(start);
  end.setDate(end.getDate() + 6); // Saturday
  end.setHours(23, 59, 59, 999);
  
  return { startDate: start, endDate: end };
};

// Get date range for month
export const getMonthRange = (date = new Date()) => {
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  end.setHours(23, 59, 59, 999);
  
  return { startDate: start, endDate: end };
};

// Check if class is upcoming
export const isUpcoming = (startTime) => {
  return new Date(startTime) > new Date();
};

// Check if class is today
export const isToday = (date) => {
  const today = new Date();
  const classDate = new Date(date);
  return classDate.toDateString() === today.toDateString();
};

// Get time until class
export const getTimeUntilClass = (startTime) => {
  const now = new Date();
  const start = new Date(startTime);
  const diff = start - now;
  
  if (diff < 0) return 'Started';
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours > 24) {
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''}`;
  }
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  
  return `${minutes}m`;
};

// Format duration
export const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  
  return `${mins}m`;
};