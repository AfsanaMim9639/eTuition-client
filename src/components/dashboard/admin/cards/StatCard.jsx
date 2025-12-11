// src/components/dashboard/admin/cards/StatCard.jsx

import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, color, subtext, index = 0 }) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: `0 0 40px ${color}33`
      }}
      className="p-6 rounded-xl backdrop-blur-lg"
      style={{
        background: 'linear-gradient(135deg, rgba(18, 18, 18, 0.95), rgba(26, 26, 26, 0.95))',
        border: `2px solid ${color}33`,
        boxShadow: `0 0 20px ${color}11`
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <Icon className="w-10 h-10" style={{ color }} />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
      <h3 className="text-gray-400 text-sm mb-2">{title}</h3>
      <p className="text-3xl font-bold mb-1" style={{ color }}>
        {value}
      </p>
      <p className="text-xs text-gray-500">{subtext}</p>
    </motion.div>
  );
};

export default StatCard;