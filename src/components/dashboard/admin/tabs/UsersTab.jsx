// src/components/dashboard/admin/tabs/UsersTab.jsx
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
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
    isViewModalOpen,
    setIsViewModalOpen,
    isEditModalOpen,
    setIsEditModalOpen
  } = usersHook;

  useEffect(() => {
    loadUsers(1);
  }, [filters]);

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
              onDelete={deleteUser}
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