// src/components/dashboard/admin/utils/adminConstants.js

export const COLORS = {
  primary: '#FF10F0',
  secondary: '#00F0FF',
  accent: '#39FF14',
  background: {
    dark: '#0a0f0d',
    card: 'linear-gradient(135deg, rgba(18, 18, 18, 0.95), rgba(26, 26, 26, 0.95))'
  }
};

export const USER_ROLES = {
  STUDENT: 'student',
  TUTOR: 'tutor',
  ADMIN: 'admin'
};

export const USER_STATUSES = {
  ACTIVE: 'active',
  SUSPENDED: 'suspended',
  BLOCKED: 'blocked'
};

export const TUITION_STATUSES = {
  PENDING: 'pending',
  APPROVED: 'approved',
  ONGOING: 'ongoing',
  COMPLETED: 'completed',
  REJECTED: 'rejected'
};

export const PAYMENT_STATUSES = {
  COMPLETED: 'completed',
  PENDING: 'pending'
};

export const TABS = [
  { id: 'dashboard', label: 'Dashboard', color: COLORS.primary },
  { id: 'users', label: 'User Management', color: COLORS.secondary },
  { id: 'tuitions', label: 'Tuition Management', color: COLORS.accent },
  { id: 'reports', label: 'Reports & Analytics', color: COLORS.primary }
];

export const API_BASE_URL = 'http://localhost:5000/api';

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20
};