// src/components/dashboard/admin/hooks/useAdminUsers.js

import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  fetchUsers, 
  updateUserRole, 
  updateUserStatus, 
  deleteUser,
  getUserById,
  updateUserInfo
} from '../utils/adminApi';
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

  // ⭐ NEW: View & Edit Modal States
  const [selectedUser, setSelectedUser] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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
      toast.error('Failed to load users. Showing demo data.');
      setUsers(generateMockUsers());
      setTotalPages(5);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRole = async (userId, newRole) => {
    const loadingToast = toast.loading('Updating user role...');
    
    try {
      const data = await updateUserRole(userId, newRole);
      
      if (data.success) {
        toast.success('User role updated successfully!', { id: loadingToast });
        await loadUsers(currentPage);
      } else {
        throw new Error(data.message || 'Failed to update role');
      }
    } catch (err) {
      console.error('Error updating user role:', err);
      toast.error(err.message || 'Failed to update user role', { id: loadingToast });
    }
  };

  const handleUpdateStatus = async (userId, newStatus) => {
    const loadingToast = toast.loading('Updating user status...');
    
    try {
      const data = await updateUserStatus(userId, newStatus);
      
      if (data.success) {
        toast.success('User status updated successfully!', { id: loadingToast });
        await loadUsers(currentPage);
      } else {
        throw new Error(data.message || 'Failed to update status');
      }
    } catch (err) {
      console.error('Error updating user status:', err);
      toast.error(err.message || 'Failed to update user status', { id: loadingToast });
    }
  };

  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm(
      '⚠️ Are you sure you want to delete this user?\n\nThis action cannot be undone.'
    );
    
    if (!confirmDelete) return;
    
    const loadingToast = toast.loading('Deleting user...');
    
    try {
      const data = await deleteUser(userId);
      
      if (data.success) {
        toast.success('User deleted successfully!', { id: loadingToast });
        await loadUsers(currentPage);
      } else {
        throw new Error(data.message || 'Failed to delete user');
      }
    } catch (err) {
      console.error('Error deleting user:', err);
      toast.error(err.message || 'Failed to delete user', { id: loadingToast });
    }
  };

  // ⭐ NEW: View User Function
  const handleViewUser = async (user) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  // ⭐ NEW: Edit User Function
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  // ⭐ NEW: Save User Info Function
  const handleSaveUserInfo = async (userId, userData) => {
    const loadingToast = toast.loading('Updating user information...');
    
    try {
      const data = await updateUserInfo(userId, userData);
      
      if (data.success) {
        toast.success('User information updated successfully!', { id: loadingToast });
        setIsEditModalOpen(false);
        setSelectedUser(null);
        await loadUsers(currentPage);
      } else {
        throw new Error(data.message || 'Failed to update user information');
      }
    } catch (err) {
      console.error('Error updating user information:', err);
      toast.error(err.message || 'Failed to update user information', { id: loadingToast });
      throw err;
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
    deleteUser: handleDeleteUser,
    // ⭐ NEW: View & Edit exports
    viewUser: handleViewUser,
    editUser: handleEditUser,
    saveUserInfo: handleSaveUserInfo,
    selectedUser,
    isViewModalOpen,
    setIsViewModalOpen,
    isEditModalOpen,
    setIsEditModalOpen
  };
};