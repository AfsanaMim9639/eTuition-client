// src/components/dashboard/admin/tables/TuitionsTable.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, CheckCircle, XCircle, X } from "lucide-react";
import toast from "react-hot-toast";

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.03 },
  }),
};

const TuitionsTable = ({ tuitions = [], onViewDetails, onUpdateStatus, onApprove, onReject }) => {
  console.log('🔍 Props:', { onApprove, onReject }); // ✅ এটা add করুন
  console.log('📊 Tuitions:', tuitions); // ✅ এটা add করুন
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
      pending: { bg: 'rgba(255, 165, 0, 0.2)', border: '#FFA500', text: '#FFA500' },
      approved: { bg: 'rgba(57, 255, 20, 0.2)', border: '#39FF14', text: '#39FF14' },
      rejected: { bg: 'rgba(255, 0, 0, 0.2)', border: '#FF0000', text: '#FF0000' }
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
      open: { bg: 'rgba(57, 255, 20, 0.2)', text: '#39FF14' },
      closed: { bg: 'rgba(255, 0, 0, 0.2)', text: '#FF0000' },
      ongoing: { bg: 'rgba(0, 240, 255, 0.2)', text: '#00F0FF' },
      completed: { bg: 'rgba(255, 16, 240, 0.2)', text: '#FF10F0' }
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
          backgroundColor: 'rgba(18, 18, 18, 0.5)',
          borderColor: 'rgba(255, 16, 240, 0.2)'
        }}
      >
        <table className="min-w-full text-left">
          
          {/* Table Header */}
          <thead>
            <tr 
              className="border-b"
              style={{ borderColor: 'rgba(255, 16, 240, 0.2)' }}
            >
              <th className="p-4 text-sm font-semibold text-gray-300">Title</th>
              <th className="p-4 text-sm font-semibold text-gray-300">Subject</th>
              <th className="p-4 text-sm font-semibold text-gray-300">Grade</th>
              <th className="p-4 text-sm font-semibold text-gray-300">Location</th>
              <th className="p-4 text-sm font-semibold text-gray-300">Salary</th>
              <th className="p-4 text-sm font-semibold text-gray-300">Type</th>
              <th className="p-4 text-sm font-semibold text-gray-300">Status</th>
              <th className="p-4 text-sm font-semibold text-gray-300">Approval</th>
              <th className="p-4 text-center text-sm font-semibold text-gray-300">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {tuitions.length === 0 ? (
              <tr>
                <td 
                  colSpan="9"
                  className="text-center text-gray-400 py-12"
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
                  className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors"
                >
                  <td className="p-4 text-gray-200">{t.title}</td>
                  <td className="p-4 text-gray-200">{t.subject}</td>
                  <td className="p-4 text-gray-200">{t.grade}</td>
                  <td className="p-4 text-gray-200">{t.location}</td>
                  <td className="p-4 text-gray-200">৳{t.salary}</td>
                  <td className="p-4 text-gray-200">{t.tutoring_type}</td>
                  <td className="p-4">{getStatusBadge(t.status)}</td>
                  <td className="p-4">{getApprovalStatusBadge(t.approvalStatus)}</td>

                  {/* Action Buttons */}
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      
                      {/* View Details Button - Always show */}
                      <motion.button
                        onClick={() => onViewDetails(t)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 rounded-lg hover:bg-blue-500/20 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" style={{ color: '#00F0FF' }} />
                      </motion.button>

                      {/* Approve Button - Show for pending, rejected, or undefined */}
                      {(!t.approvalStatus || t.approvalStatus === 'pending' || t.approvalStatus === 'rejected') && onApprove && (
                        <motion.button
                          onClick={() => onApprove(t._id)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 rounded-lg hover:bg-green-500/20 transition-colors"
                          title="Approve Tuition"
                        >
                          <CheckCircle className="w-4 h-4" style={{ color: '#39FF14' }} />
                        </motion.button>
                      )}

                      {/* Reject Button - Show for pending, approved, or undefined */}
                      {(!t.approvalStatus || t.approvalStatus === 'pending' || t.approvalStatus === 'approved') && onReject && (
                        <motion.button
                          onClick={() => handleRejectClick(t._id)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 rounded-lg hover:bg-red-500/20 transition-colors"
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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={handleRejectCancel}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-gray-900 to-black border-2 border-red-500/30 rounded-2xl p-6 max-w-md w-full shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <XCircle className="w-6 h-6 text-red-500" />
                  Reject Tuition
                </h3>
                <button
                  onClick={handleRejectCancel}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="space-y-4">
                <p className="text-gray-300 text-sm">
                  Please provide a reason for rejecting this tuition post:
                </p>

                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Enter rejection reason..."
                  className="w-full h-32 px-4 py-3 bg-black/50 border-2 border-red-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 resize-none"
                  autoFocus
                />

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleRejectCancel}
                    className="flex-1 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
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