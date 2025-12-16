// src/pages/dashboard/admin/ReportsAnalytics.jsx
import React from 'react';
import { motion } from 'framer-motion';
import ReportsTab from '../../../components/dashboard/admin/tabs/ReportsTab';
import { useAdminReports } from '../../../components/dashboard/admin/hooks/useAdminReports';

const ReportsAnalytics = () => {
  const reportsHook = useAdminReports();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <ReportsTab reportsHook={reportsHook} />
    </motion.div>
  );
};

export default ReportsAnalytics;