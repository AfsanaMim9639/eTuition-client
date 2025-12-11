// src/pages/dashboard/admin/TuitionManagement.jsx
import React from 'react';
import { motion } from 'framer-motion';
import TuitionsTab from '../../../components/dashboard/admin/tabs/TuitionsTab';
import { useAdminTuitions } from '../../../components/dashboard/admin/hooks/useAdminTuitions';

const TuitionManagement = () => {
  const tuitionsHook = useAdminTuitions();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <TuitionsTab tuitionsHook={tuitionsHook} />
    </motion.div>
  );
};

export default TuitionManagement;