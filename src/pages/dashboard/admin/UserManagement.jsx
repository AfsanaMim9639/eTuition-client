// src/pages/dashboard/admin/UserManagement.jsx
import React from 'react';
import { motion } from 'framer-motion';
import UsersTab from '../../../components/dashboard/admin/tabs/UsersTab';
import { useAdminUsers } from '../../../components/dashboard/admin/hooks/useAdminUsers';

const UserManagement = () => {
  const usersHook = useAdminUsers();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <UsersTab usersHook={usersHook} />
    </motion.div>
  );
};

export default UserManagement;