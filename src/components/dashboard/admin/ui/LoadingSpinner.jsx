// src/components/dashboard/admin/ui/LoadingSpinner.jsx

import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ color = '#FF10F0', size = 64 }) => {
  return (
    <div className="flex justify-center items-center py-20">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="rounded-full"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          border: `4px solid ${color}1A`,
          borderTop: `4px solid ${color}`
        }}
      />
    </div>
  );
};

export default LoadingSpinner;