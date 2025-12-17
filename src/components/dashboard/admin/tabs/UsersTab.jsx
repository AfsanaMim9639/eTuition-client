// src/components/dashboard/admin/tabs/UsersTab.jsx
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import UserFilters from '../filters/UserFilters';
import UsersTable from '../tables/UsersTable';
import LoadingSpinner from '../ui/LoadingSpinner';
import Pagination from '../ui/Pagination';
import UserViewModal from '../modals/UserViewModal';
import UserEditModal from '../modals/UserEditModal';

const UsersTab = ({ usersHook }) => {
  const {
    users,
    loading,
    currentPage,
    totalPages,
    filters,
    setFilters,
    loadUsers,
    updateRole,
    updateStatus,
    deleteUser,
    // ⭐ New props for view & edit
    viewUser,
    editUser,
    saveUserInfo,
    selectedUser,
    setSelectedUser, // ⭐ Added this
    isViewModalOpen,
    setIsViewModalOpen,
    isEditModalOpen,
    setIsEditModalOpen
  } = usersHook;

  useEffect(() => {
    loadUsers(1);
  }, [filters]);

  // ⭐ Handle delete with toast confirmation
  const handleDeleteWithConfirmation = (userId) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900 dark:text-white">Delete User?</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              This action cannot be undone. Are you sure?
            </p>
          </div>
        </div>
        
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              deleteUser(userId);
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    ), {
      duration: Infinity,
      style: {
        background: 'rgba(18, 18, 18, 0.95)',
        border: '2px solid rgba(255, 16, 240, 0.3)',
        borderRadius: '12px',
        padding: '16px',
        maxWidth: '400px',
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">User Management</h2>
        <div className="text-sm text-gray-400">
          Total Users: {users?.length || 0}
        </div>
      </div>

      {/* Filters */}
      <UserFilters 
        filters={filters} 
        setFilters={setFilters}
        onSearch={() => loadUsers(1)}
      />

      {/* Content */}
      <div className="space-y-4">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <UsersTable
              users={users}
              onUpdateRole={updateRole}
              onUpdateStatus={updateStatus}
              onDelete={handleDeleteWithConfirmation}
              onView={viewUser}
              onEdit={editUser}
            />

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={loadUsers}
              />
            )}
          </>
        )}
      </div>

      {/* View User Modal */}
      <UserViewModal
        user={selectedUser}
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedUser(null);
        }}
      />

      {/* Edit User Modal */}
      <UserEditModal
        user={selectedUser}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedUser(null);
        }}
        onSave={saveUserInfo}
      />
    </motion.div>
  );
};

export default UsersTab;