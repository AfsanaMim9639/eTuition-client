// src/pages/dashboard/admin/ReportsAnalytics.jsx
import React from 'react';
import { motion } from 'framer-motion';
import ReportsTab from '../../../components/dashboard/admin/tabs/ReportsTab';
import { useAdminStats } from '../../../components/dashboard/admin/hooks/useAdminStats';
import { useAdminPayments } from '../../../components/dashboard/admin/hooks/useAdminPayments';

const ReportsAnalytics = () => {
  const statsHook = useAdminStats();
  const paymentsHook = useAdminPayments();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <ReportsTab stats={statsHook.stats} paymentsHook={paymentsHook} />
    </motion.div>
  );
};

export default ReportsAnalytics;