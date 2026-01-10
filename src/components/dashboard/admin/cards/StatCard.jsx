// src/components/dashboard/admin/cards/StatCard.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../../contexts/ThemeContext';

const StatCard = ({ title, value, icon: Icon, color, subtext, index = 0 }) => {
  const { isDark } = useTheme();

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: `0 0 40px ${color}33`
      }}
      className="p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl backdrop-blur-lg"
      style={{
        background: isDark 
          ? 'linear-gradient(135deg, rgba(18, 18, 18, 0.95), rgba(26, 26, 26, 0.95))'
          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(249, 250, 251, 0.95))',
        border: `2px solid ${color}33`,
        boxShadow: `0 0 20px ${color}11`
      }}
    >
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <Icon 
          className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" 
          style={{ color }} 
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
      
      <h3 
        className="text-xs sm:text-sm mb-1.5 sm:mb-2"
        style={{ color: isDark ? '#9ca3af' : '#6b7280' }}
      >
        {title}
      </h3>
      
      <p 
        className="text-2xl sm:text-3xl md:text-3xl font-bold mb-1" 
        style={{ color }}
      >
        {value}
      </p>
      
      <p 
        className="text-xs sm:text-xs"
        style={{ color: isDark ? '#6b7280' : '#9ca3af' }}
      >
        {subtext}
      </p>
    </motion.div>
  );
};

export default StatCard;