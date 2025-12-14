import api from './api';

const BASE_URL = '/schedules';

// ==================== CREATE SCHEDULE ====================
export const createSchedule = async (scheduleData) => {
  try {
    const response = await api.post(BASE_URL, scheduleData);
    return response.data;
  } catch (error) {
    console.error('Error creating schedule:', error);
    // Don't throw 401/403 errors to prevent logout
    if (error.response?.status === 401 || error.response?.status === 403) {
      throw error;
    }
    // For other errors, return empty response
    return { data: null, status: 'error', message: error.message };
  }
};

// ==================== GET ALL SCHEDULES ====================
export const getSchedules = async (params = {}) => {
  try {
    const response = await api.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching schedules:', error);
    // Return empty array instead of throwing
    return { data: [], status: 'error' };
  }
};

// ==================== GET UPCOMING CLASSES ====================
export const getUpcomingClasses = async (limit = 10) => {
  try {
    const response = await api.get(`${BASE_URL}/upcoming`, {
      params: { limit }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching upcoming classes:', error);
    return { data: [], status: 'error' };
  }
};

// ==================== GET TODAY'S CLASSES ====================
export const getTodayClasses = async () => {
  try {
    const response = await api.get(`${BASE_URL}/today`);
    return response.data;
  } catch (error) {
    console.error('Error fetching today\'s classes:', error);
    return { data: [], status: 'error' };
  }
};

// ==================== GET SINGLE SCHEDULE ====================
export const getScheduleById = async (id) => {
  try {
    const response = await api.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching schedule:', error);
    throw error;
  }
};

// ==================== UPDATE SCHEDULE ====================
export const updateSchedule = async (id, updates) => {
  try {
    const response = await api.put(`${BASE_URL}/${id}`, updates);
    return response.data;
  } catch (error) {
    console.error('Error updating schedule:', error);
    throw error;
  }
};

// ==================== CANCEL SCHEDULE ====================
export const cancelSchedule = async (id, reason) => {
  try {
    const response = await api.patch(`${BASE_URL}/${id}/cancel`, { reason });
    return response.data;
  } catch (error) {
    console.error('Error cancelling schedule:', error);
    throw error;
  }
};

// ==================== MARK ATTENDANCE ====================
export const markAttendance = async (id, role, isPresent) => {
  try {
    const response = await api.patch(`${BASE_URL}/${id}/attendance`, {
      role,
      isPresent
    });
    return response.data;
  } catch (error) {
    console.error('Error marking attendance:', error);
    throw error;
  }
};

// ==================== COMPLETE CLASS ====================
export const completeClass = async (id) => {
  try {
    const response = await api.patch(`${BASE_URL}/${id}/complete`);
    return response.data;
  } catch (error) {
    console.error('Error completing class:', error);
    throw error;
  }
};

// ==================== START CLASS ====================
export const startClass = async (id) => {
  try {
    const response = await api.patch(`${BASE_URL}/${id}/start`);
    return response.data;
  } catch (error) {
    console.error('Error starting class:', error);
    throw error;
  }
};

// ==================== GET CLASS STATISTICS ====================
// 🔧 FIXED: Changed endpoint from /stats to /statistics
export const getClassStatistics = async () => {
  try {
    const response = await api.get(`${BASE_URL}/stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching class statistics:', error);
    // Return default stats instead of throwing
    return { 
      data: {
        today: 0,
        upcoming: 0,
        total: 0,
        byStatus: []
      },
      status: 'error'
    };
  }
};

// ==================== DELETE SCHEDULE ====================
export const deleteSchedule = async (id) => {
  try {
    const response = await api.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting schedule:', error);
    throw error;
  }
};

// ==================== HELPER FUNCTIONS ====================

export const formatDateForAPI = (date) => {
  return new Date(date).toISOString();
};

export const getWeekRange = (date = new Date()) => {
  const start = new Date(date);
  start.setDate(start.getDate() - start.getDay());
  start.setHours(0, 0, 0, 0);
  
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  
  return { startDate: start, endDate: end };
};

export const getMonthRange = (date = new Date()) => {
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  end.setHours(23, 59, 59, 999);
  
  return { startDate: start, endDate: end };
};

export const isUpcoming = (startTime) => {
  return new Date(startTime) > new Date();
};

export const isToday = (date) => {
  const today = new Date();
  const classDate = new Date(date);
  return classDate.toDateString() === today.toDateString();
};

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

export const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  
  return `${mins}m`;
};