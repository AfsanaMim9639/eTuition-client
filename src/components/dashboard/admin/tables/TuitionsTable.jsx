// src/components/dashboard/admin/tables/TuitionsTable.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, CheckCircle, XCircle, X } from "lucide-react";
import toast from "react-hot-toast";
import { useTheme } from '../../../../contexts/ThemeContext';

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.03 },
  }),
};

const TuitionsTable = ({ tuitions = [], onViewDetails, onUpdateStatus, onApprove, onReject }) => {
  const { isDark } = useTheme();
  console.log('🔍 Props:', { onApprove, onReject });
  console.log('📊 Tuitions:', tuitions);
  
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedTuitionId, setSelectedTuitionId] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const handleRejectClick = (tuitionId) => {
    setSelectedTuitionId(tuitionId);
    setRejectionReason('');
    setShowRejectModal(true);
  };

  const handleRejectSubmit = () => {
    if (!rejectionReason.trim()) {
      toast.error('Please enter a rejection reason');
      return;
    }
    
    onReject(selectedTuitionId, rejectionReason);
    setShowRejectModal(false);
    setRejectionReason('');
    setSelectedTuitionId(null);
  };

  const handleRejectCancel = () => {
    setShowRejectModal(false);
    setRejectionReason('');
    setSelectedTuitionId(null);
  };
  
  const getApprovalStatusBadge = (approvalStatus) => {
    const styles = {
      pending: { 
        bg: isDark ? 'rgba(255, 165, 0, 0.2)' : 'rgba(255, 165, 0, 0.15)', 
        border: '#FFA500', 
        text: '#FFA500' 
      },
      approved: { 
        bg: isDark ? 'rgba(57, 255, 20, 0.2)' : 'rgba(57, 255, 20, 0.15)', 
        border: '#39FF14', 
        text: '#39FF14' 
      },
      rejected: { 
        bg: isDark ? 'rgba(255, 0, 0, 0.2)' : 'rgba(255, 0, 0, 0.15)', 
        border: '#FF0000', 
        text: '#FF0000' 
      }
    };
    
    const style = styles[approvalStatus] || styles.pending;
    
    return (
      <span 
        className="px-3 py-1 rounded-full text-xs font-semibold"
        style={{
          backgroundColor: style.bg,
          border: `1px solid ${style.border}`,
          color: style.text
        }}
      >
        {approvalStatus?.charAt(0).toUpperCase() + approvalStatus?.slice(1) || 'Pending'}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const styles = {
      open: { 
        bg: isDark ? 'rgba(57, 255, 20, 0.2)' : 'rgba(57, 255, 20, 0.15)', 
        text: '#39FF14' 
      },
      closed: { 
        bg: isDark ? 'rgba(255, 0, 0, 0.2)' : 'rgba(255, 0, 0, 0.15)', 
        text: '#FF0000' 
      },
      ongoing: { 
        bg: isDark ? 'rgba(0, 240, 255, 0.2)' : 'rgba(0, 240, 255, 0.15)', 
        text: '#00F0FF' 
      },
      completed: { 
        bg: isDark ? 'rgba(255, 16, 240, 0.2)' : 'rgba(255, 16, 240, 0.15)', 
        text: '#FF10F0' 
      }
    };
    
    const style = styles[status] || styles.open;
    
    return (
      <span 
        className="px-3 py-1 rounded-full text-xs font-semibold"
        style={{
          backgroundColor: style.bg,
          color: style.text
        }}
      >
        {status}
      </span>
    );
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.4 }}
        className="w-full overflow-x-auto rounded-xl border"
        style={{
          backgroundColor: isDark ? 'rgba(18, 18, 18, 0.5)' : 'rgba(255, 255, 255, 0.8)',
          borderColor: isDark ? 'rgba(255, 16, 240, 0.2)' : 'rgba(255, 16, 240, 0.15)'
        }}
      >
        <table className="min-w-full text-left">
          
          {/* Table Header */}
          <thead>
            <tr 
              className="border-b"
              style={{ 
                borderColor: isDark 
                  ? 'rgba(255, 16, 240, 0.2)' 
                  : 'rgba(255, 16, 240, 0.15)' 
              }}
            >
              <th 
                className="p-4 text-sm font-semibold"
                style={{ color: isDark ? '#d1d5db' : '#4b5563' }}
              >
                Title
              </th>
              <th 
                className="p-4 text-sm font-semibold"
                style={{ color: isDark ? '#d1d5db' : '#4b5563' }}
              >
                Subject
              </th>
              <th 
                className="p-4 text-sm font-semibold"
                style={{ color: isDark ? '#d1d5db' : '#4b5563' }}
              >
                Grade
              </th>
              <th 
                className="p-4 text-sm font-semibold"
                style={{ color: isDark ? '#d1d5db' : '#4b5563' }}
              >
                Location
              </th>
              <th 
                className="p-4 text-sm font-semibold"
                style={{ color: isDark ? '#d1d5db' : '#4b5563' }}
              >
                Salary
              </th>
              <th 
                className="p-4 text-sm font-semibold"
                style={{ color: isDark ? '#d1d5db' : '#4b5563' }}
              >
                Type
              </th>
              <th 
                className="p-4 text-sm font-semibold"
                style={{ color: isDark ? '#d1d5db' : '#4b5563' }}
              >
                Status
              </th>
              <th 
                className="p-4 text-sm font-semibold"
                style={{ color: isDark ? '#d1d5db' : '#4b5563' }}
              >
                Approval
              </th>
              <th 
                className="p-4 text-center text-sm font-semibold"
                style={{ color: isDark ? '#d1d5db' : '#4b5563' }}
              >
                Actions
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {tuitions.length === 0 ? (
              <tr>
                <td 
                  colSpan="9"
                  className="text-center py-12"
                  style={{ color: isDark ? '#9ca3af' : '#6b7280' }}
                >
                  No tuitions found
                </td>
              </tr>
            ) : (
              tuitions.map((t, idx) => (
                <motion.tr 
                  key={t._id}
                  custom={idx}
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  className="transition-colors"
                  style={{
                    borderBottom: isDark ? '1px solid #1f2937' : '1px solid #e5e7eb'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = isDark 
                      ? 'rgba(17, 24, 39, 0.5)' 
                      : 'rgba(249, 250, 251, 0.8)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <td 
                    className="p-4"
                    style={{ color: isDark ? '#e5e7eb' : '#1f2937' }}
                  >
                    {t.title}
                  </td>
                  <td 
                    className="p-4"
                    style={{ color: isDark ? '#e5e7eb' : '#1f2937' }}
                  >
                    {t.subject}
                  </td>
                  <td 
                    className="p-4"
                    style={{ color: isDark ? '#e5e7eb' : '#1f2937' }}
                  >
                    {t.grade}
                  </td>
                  <td 
                    className="p-4"
                    style={{ color: isDark ? '#e5e7eb' : '#1f2937' }}
                  >
                    {t.location}
                  </td>
                  <td 
                    className="p-4"
                    style={{ color: isDark ? '#e5e7eb' : '#1f2937' }}
                  >
                    ৳{t.salary}
                  </td>
                  <td 
                    className="p-4"
                    style={{ color: isDark ? '#e5e7eb' : '#1f2937' }}
                  >
                    {t.tutoring_type}
                  </td>
                  <td className="p-4">{getStatusBadge(t.status)}</td>
                  <td className="p-4">{getApprovalStatusBadge(t.approvalStatus)}</td>

                  {/* Action Buttons */}
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      
                      {/* View Details Button */}
                      <motion.button
                        onClick={() => onViewDetails(t)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 rounded-lg transition-colors"
                        style={{ backgroundColor: 'transparent' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = isDark 
                            ? 'rgba(0, 240, 255, 0.2)' 
                            : 'rgba(0, 240, 255, 0.15)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" style={{ color: '#00F0FF' }} />
                      </motion.button>

                      {/* Approve Button */}
                      {(!t.approvalStatus || t.approvalStatus === 'pending' || t.approvalStatus === 'rejected') && onApprove && (
                        <motion.button
                          onClick={() => onApprove(t._id)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 rounded-lg transition-colors"
                          style={{ backgroundColor: 'transparent' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = isDark 
                              ? 'rgba(57, 255, 20, 0.2)' 
                              : 'rgba(57, 255, 20, 0.15)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }}
                          title="Approve Tuition"
                        >
                          <CheckCircle className="w-4 h-4" style={{ color: '#39FF14' }} />
                        </motion.button>
                      )}

                      {/* Reject Button */}
                      {(!t.approvalStatus || t.approvalStatus === 'pending' || t.approvalStatus === 'approved') && onReject && (
                        <motion.button
                          onClick={() => handleRejectClick(t._id)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 rounded-lg transition-colors"
                          style={{ backgroundColor: 'transparent' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = isDark 
                              ? 'rgba(255, 0, 0, 0.2)' 
                              : 'rgba(255, 0, 0, 0.15)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }}
                          title="Reject Tuition"
                        >
                          <XCircle className="w-4 h-4" style={{ color: '#FF0000' }} />
                        </motion.button>
                      )}

                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </motion.div>

      {/* Rejection Modal */}
      <AnimatePresence>
        {showRejectModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            style={{
              backgroundColor: isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.6)'
            }}
            onClick={handleRejectCancel}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="border-2 rounded-2xl p-6 max-w-md w-full shadow-2xl"
              style={{
                background: isDark 
                  ? 'linear-gradient(to bottom right, #1f2937, #000000)' 
                  : 'linear-gradient(to bottom right, #ffffff, #f3f4f6)',
                borderColor: 'rgba(239, 68, 68, 0.3)'
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 
                  className="text-xl font-bold flex items-center gap-2"
                  style={{ color: isDark ? '#ffffff' : '#111827' }}
                >
                  <XCircle className="w-6 h-6 text-red-500" />
                  Reject Tuition
                </h3>
                <button
                  onClick={handleRejectCancel}
                  className="transition-colors"
                  style={{ 
                    color: isDark ? '#9ca3af' : '#6b7280' 
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = isDark ? '#ffffff' : '#111827';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = isDark ? '#9ca3af' : '#6b7280';
                  }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="space-y-4">
                <p 
                  className="text-sm"
                  style={{ color: isDark ? '#d1d5db' : '#4b5563' }}
                >
                  Please provide a reason for rejecting this tuition post:
                </p>

                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Enter rejection reason..."
                  className="w-full h-32 px-4 py-3 border-2 rounded-lg resize-none focus:outline-none"
                  style={{
                    backgroundColor: isDark ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.9)',
                    borderColor: 'rgba(239, 68, 68, 0.3)',
                    color: isDark ? '#ffffff' : '#111827',
                    '--placeholder-color': isDark ? '#6b7280' : '#9ca3af'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#ef4444';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)';
                  }}
                  autoFocus
                />

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleRejectCancel}
                    className="flex-1 px-4 py-2.5 rounded-lg font-semibold transition-colors"
                    style={{
                      backgroundColor: isDark ? '#1f2937' : '#e5e7eb',
                      color: isDark ? '#ffffff' : '#111827'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = isDark ? '#374151' : '#d1d5db';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = isDark ? '#1f2937' : '#e5e7eb';
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRejectSubmit}
                    className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <XCircle className="w-4 h-4" />
                    Reject
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TuitionsTable;