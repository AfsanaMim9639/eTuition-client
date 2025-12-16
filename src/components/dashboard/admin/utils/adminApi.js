// src/components/dashboard/admin/utils/adminApi.js

import { API_BASE_URL } from './adminConstants';

/**
 * Get authentication headers with token
 * CRITICAL: This must include the Bearer token for admin routes
 */
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    console.error('❌ No token found in localStorage');
    throw new Error('Authentication token not found. Please login again.');
  }
  
  console.log('🔑 Token found:', token.substring(0, 20) + '...');
  
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

/**
 * Helper function to handle API responses
 */
const handleResponse = async (response) => {
  // Parse response
  const data = await response.json();
  
  // Handle errors
  if (!response.ok) {
    console.error('❌ API Error:', {
      status: response.status,
      message: data.message,
      data
    });
    
    // Handle specific status codes
    if (response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      throw new Error('Authentication failed. Please login again.');
    } else if (response.status === 403) {
      // Forbidden - not admin
      throw new Error('Access denied. Admin privileges required.');
    }
    
    throw new Error(data.message || `HTTP error! status: ${response.status}`);
  }
  
  return data;
};

/**
 * Generic fetch wrapper with error handling
 */
const apiFetch = async (url, options = {}) => {
  try {
    console.log(`📡 API Request: ${options.method || 'GET'} ${url}`);
    
    const response = await fetch(url, {
      ...options,
      headers: getAuthHeaders()
    });
    
    const data = await handleResponse(response);
    console.log('✅ API Success:', data);
    
    return data;
  } catch (error) {
    console.error('❌ API Fetch Error:', error);
    throw error;
  }
};

// ============================================
// STATS API
// ============================================

export const fetchStats = async () => {
  try {
    return await apiFetch(`${API_BASE_URL}/admin/stats`);
  } catch (error) {
    console.error('Fetch stats error:', error);
    throw error;
  }
};

// ============================================
// USERS API
// ============================================

export const fetchUsers = async (params) => {
  try {
    const queryParams = new URLSearchParams(params);
    return await apiFetch(`${API_BASE_URL}/admin/users?${queryParams}`);
  } catch (error) {
    console.error('Fetch users error:', error);
    throw error;
  }
};

// ⭐ NEW: Get single user by ID
export const getUserById = async (userId) => {
  try {
    return await apiFetch(`${API_BASE_URL}/admin/users/${userId}`);
  } catch (error) {
    console.error('Get user by ID error:', error);
    throw error;
  }
};

export const updateUserRole = async (userId, role) => {
  try {
    return await apiFetch(`${API_BASE_URL}/admin/users/${userId}/role`, {
      method: 'PATCH',
      body: JSON.stringify({ role })
    });
  } catch (error) {
    console.error('Update user role error:', error);
    throw error;
  }
};

export const updateUserStatus = async (userId, status) => {
  try {
    return await apiFetch(`${API_BASE_URL}/admin/users/${userId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });
  } catch (error) {
    console.error('Update user status error:', error);
    throw error;
  }
};

// ⭐ NEW: Update user information
export const updateUserInfo = async (userId, userData) => {
  try {
    return await apiFetch(`${API_BASE_URL}/admin/users/${userId}/info`, {
      method: 'PATCH',
      body: JSON.stringify(userData)
    });
  } catch (error) {
    console.error('Update user info error:', error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    return await apiFetch(`${API_BASE_URL}/admin/users/${userId}`, {
      method: 'DELETE'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    throw error;
  }
};

// ============================================
// TUITIONS API
// ============================================

export const fetchTuitions = async (params) => {
  try {
    const queryParams = new URLSearchParams(params);
    return await apiFetch(`${API_BASE_URL}/admin/tuitions?${queryParams}`);
  } catch (error) {
    console.error('Fetch tuitions error:', error);
    throw error;
  }
};

// ⭐ NEW: Get single tuition by ID
export const getTuitionById = async (tuitionId) => {
  try {
    return await apiFetch(`${API_BASE_URL}/admin/tuitions/${tuitionId}`);
  } catch (error) {
    console.error('Get tuition by ID error:', error);
    throw error;
  }
};

export const updateTuitionStatus = async (tuitionId, status) => {
  try {
    return await apiFetch(`${API_BASE_URL}/admin/tuitions/${tuitionId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });
  } catch (error) {
    console.error('Update tuition status error:', error);
    throw error;
  }
};

// ⭐ NEW: Approve tuition
export const approveTuition = async (tuitionId) => {
  try {
    return await apiFetch(`${API_BASE_URL}/admin/tuitions/${tuitionId}/approve`, {
      method: 'PATCH'
    });
  } catch (error) {
    console.error('Approve tuition error:', error);
    throw error;
  }
};

// ⭐ NEW: Reject tuition
export const rejectTuition = async (tuitionId, rejectionReason = '') => {
  try {
    return await apiFetch(`${API_BASE_URL}/admin/tuitions/${tuitionId}/reject`, {
      method: 'PATCH',
      body: JSON.stringify({ rejectionReason })
    });
  } catch (error) {
    console.error('Reject tuition error:', error);
    throw error;
  }
};

// ============================================
// REPORTS API - ⭐ NEW SECTION
// ============================================

/**
 * Fetch financial reports
 * Returns comprehensive financial data including earnings, transactions, etc.
 */
export const fetchFinancialReports = async () => {
  try {
    return await apiFetch(`${API_BASE_URL}/admin/reports/financial`);
  } catch (error) {
    console.error('Fetch financial reports error:', error);
    throw error;
  }
};

// ============================================
// PAYMENTS API - ⭐ UPDATED
// ============================================

/**
 * Fetch payments with optional filters
 * @param {Object} params - Filter parameters (status, paymentMethod, startDate, endDate, page, limit)
 */
export const fetchPayments = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams(params);
    return await apiFetch(`${API_BASE_URL}/admin/payments?${queryParams}`);
  } catch (error) {
    console.error('Fetch payments error:', error);
    throw error;
  }
};