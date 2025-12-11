// src/components/dashboard/admin/utils/adminApi.js

import { API_BASE_URL } from './adminConstants';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

// Stats API
export const fetchStats = async () => {
  const response = await fetch(`${API_BASE_URL}/admin/stats`, {
    headers: getAuthHeaders()
  });
  return response.json();
};

// Users API
export const fetchUsers = async (params) => {
  const queryParams = new URLSearchParams(params);
  const response = await fetch(`${API_BASE_URL}/admin/users?${queryParams}`, {
    headers: getAuthHeaders()
  });
  return response.json();
};

export const updateUserRole = async (userId, role) => {
  const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/role`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify({ role })
  });
  return response.json();
};

export const updateUserStatus = async (userId, status) => {
  const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/status`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify({ status })
  });
  return response.json();
};

export const deleteUser = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  return response.json();
};

// Tuitions API
export const fetchTuitions = async (params) => {
  const queryParams = new URLSearchParams(params);
  const response = await fetch(`${API_BASE_URL}/admin/tuitions?${queryParams}`, {
    headers: getAuthHeaders()
  });
  return response.json();
};

export const updateTuitionStatus = async (tuitionId, status) => {
  const response = await fetch(`${API_BASE_URL}/admin/tuitions/${tuitionId}/status`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify({ status })
  });
  return response.json();
};

// Payments API
export const fetchPayments = async () => {
  const response = await fetch(`${API_BASE_URL}/admin/payments`, {
    headers: getAuthHeaders()
  });
  return response.json();
};