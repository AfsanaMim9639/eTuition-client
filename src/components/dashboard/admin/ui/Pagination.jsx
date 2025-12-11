// src/components/dashboard/admin/ui/Pagination.jsx

import React from 'react';
import { motion } from 'framer-motion';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  prevColor = '#FF10F0',
  nextColor = '#00F0FF'
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-lg"
        style={{
          background: `rgba(${parseInt(prevColor.slice(1, 3), 16)}, ${parseInt(prevColor.slice(3, 5), 16)}, ${parseInt(prevColor.slice(5, 7), 16)}, 0.2)`,
          border: `1px solid ${prevColor}`,
          color: prevColor,
          opacity: currentPage === 1 ? 0.5 : 1,
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
        }}
      >
        Previous
      </motion.button>
      
      <span className="px-4 py-2 text-white">
        Page {currentPage} of {totalPages}
      </span>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-lg"
        style={{
          background: `rgba(${parseInt(nextColor.slice(1, 3), 16)}, ${parseInt(nextColor.slice(3, 5), 16)}, ${parseInt(nextColor.slice(5, 7), 16)}, 0.2)`,
          border: `1px solid ${nextColor}`,
          color: nextColor,
          opacity: currentPage === totalPages ? 0.5 : 1,
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
        }}
      >
        Next
      </motion.button>
    </div>
  );
};

export default Pagination;