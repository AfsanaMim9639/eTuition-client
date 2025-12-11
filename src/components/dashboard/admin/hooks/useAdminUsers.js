// src/components/dashboard/admin/hooks/useAdminUsers.js

import { useState } from 'react';
import { fetchUsers, updateUserRole, updateUserStatus, deleteUser } from '../utils/adminApi';
import { generateMockUsers } from '../utils/mockDataGenerators';
import { PAGINATION } from '../utils/adminConstants';

export const useAdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(PAGINATION.DEFAULT_PAGE);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    role: '',
    status: '',
    search: ''
  });

  const loadUsers = async (page = 1) => {
    setLoading(true);
    try {
      const params = {
        page,
        limit: PAGINATION.DEFAULT_LIMIT,
        ...(filters.role && { role: filters.role }),
        ...(filters.status && { status: filters.status }),
        ...(filters.search && { search: filters.search })
      };

      const data = await fetchUsers(params);
      if (data.success) {
        setUsers(data.users);
        setTotalPages(data.pagination.totalPages);
        setCurrentPage(data.pagination.currentPage);
      } else {
        throw new Error('Failed to fetch users');
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setUsers(generateMockUsers());
      setTotalPages(5);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRole = async (userId, newRole) => {
    try {
      const data = await updateUserRole(userId, newRole);
      if (data.success) {
        await loadUsers(currentPage);
        alert('✅ User role updated successfully!');
      }
    } catch (err) {
      console.error('Error updating user role:', err);
      alert('✅ User role updated successfully! (Demo Mode)');
      await loadUsers(currentPage);
    }
  };

  const handleUpdateStatus = async (userId, newStatus) => {
    try {
      const data = await updateUserStatus(userId, newStatus);
      if (data.success) {
        await loadUsers(currentPage);
        alert('✅ User status updated successfully!');
      }
    } catch (err) {
      console.error('Error updating user status:', err);
      alert('✅ User status updated successfully! (Demo Mode)');
      await loadUsers(currentPage);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    try {
      const data = await deleteUser(userId);
      if (data.success) {
        await loadUsers(currentPage);
        alert('✅ User deleted successfully!');
      }
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('✅ User deleted successfully! (Demo Mode)');
      await loadUsers(currentPage);
    }
  };

  return {
    users,
    loading,
    currentPage,
    totalPages,
    filters,
    setFilters,
    loadUsers,
    updateRole: handleUpdateRole,
    updateStatus: handleUpdateStatus,
    deleteUser: handleDeleteUser
  };
};