// src/pages/dashboard/admin/AdminDashboardHome.jsx
import React from 'react';
import { motion } from 'framer-motion';
import DashboardTab from '../../../components/dashboard/admin/tabs/DashboardTab';
import { useAdminStats } from '../../../components/dashboard/admin/hooks/useAdminStats';
import { useTheme } from '../../../contexts/ThemeContext';

const AdminDashboardHome = () => {
  const { isDark } = useTheme();
  const statsHook = useAdminStats();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={isDark ? '' : 'text-gray-900'}
    >
      <DashboardTab stats={statsHook.stats} isDark={isDark} />
    </motion.div>
  );
};

export default AdminDashboardHome;