// src/components/dashboard/admin/modals/TuitionViewModal.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, DollarSign, Calendar, User, BookOpen, Clock } from 'lucide-react';

const TuitionViewModal = ({ tuition, isOpen, onClose }) => {
  if (!isOpen || !tuition) return null;

  const getApprovalBadge = (status) => {
    const styles = {
      pending: { bg: 'rgba(255, 165, 0, 0.2)', border: '#FFA500', text: '#FFA500' },
      approved: { bg: 'rgba(57, 255, 20, 0.2)', border: '#39FF14', text: '#39FF14' },
      rejected: { bg: 'rgba(255, 0, 0, 0.2)', border: '#FF0000', text: '#FF0000' }
    };
    
    const style = styles[status] || styles.pending;
    
    return (
      <span 
        className="px-4 py-2 rounded-full text-sm font-semibold border-2"
        style={{
          backgroundColor: style.bg,
          borderColor: style.border,
          color: style.text
        }}
      >
        {status?.charAt(0).toUpperCase() + status?.slice(1) || 'Pending'}
      </span>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-3xl rounded-2xl border-2 overflow-hidden max-h-[90vh] overflow-y-auto"
              style={{
                background: 'linear-gradient(135deg, rgba(18, 18, 18, 0.98), rgba(26, 26, 26, 0.98))',
                borderColor: 'rgba(255, 16, 240, 0.3)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 border-b" style={{ borderColor: 'rgba(255, 16, 240, 0.2)' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{tuition.title}</h2>
                    <div className="flex items-center gap-3">
                      {getApprovalBadge(tuition.approvalStatus)}
                      <span 
                        className="px-3 py-1 rounded-full text-sm font-semibold"
                        style={{
                          backgroundColor: 'rgba(0, 240, 255, 0.2)',
                          color: '#00F0FF'
                        }}
                      >
                        {tuition.status}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoCard icon={<BookOpen />} label="Subject" value={tuition.subject} />
                  <InfoCard icon={<User />} label="Grade/Class" value={tuition.grade} />
                  <InfoCard icon={<MapPin />} label="Location" value={tuition.location} />
                  <InfoCard icon={<DollarSign />} label="Salary" value={`৳${tuition.salary}`} />
                </div>

                {/* Tutoring Details */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5" style={{ color: '#FF10F0' }} />
                    Tutoring Details
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoItem label="Type" value={tuition.tutoring_type} />
                    <InfoItem label="Days Per Week" value={tuition.days_per_week || 'N/A'} />
                    <InfoItem label="Class Duration" value={tuition.class_duration || 'N/A'} />
                    <InfoItem label="Preferred Medium" value={tuition.preferred_medium || 'N/A'} />
                    <InfoItem label="Student Gender" value={tuition.student_gender || 'Any'} />
                    <InfoItem label="Tutor Gender Preference" value={tuition.tutor_gender_preference || 'Any'} />
                  </div>
                </div>

                {/* Schedule & Requirements */}
                {tuition.schedule && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Schedule</h3>
                    <p className="text-gray-300 bg-gray-900/50 p-3 rounded-lg">{tuition.schedule}</p>
                  </div>
                )}

                {tuition.requirements && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Requirements</h3>
                    <p className="text-gray-300 bg-gray-900/50 p-3 rounded-lg">{tuition.requirements}</p>
                  </div>
                )}

                {tuition.description && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                    <p className="text-gray-300 bg-gray-900/50 p-3 rounded-lg">{tuition.description}</p>
                  </div>
                )}

                {/* Student Info */}
                {tuition.studentId && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Posted By</h3>
                    <div className="bg-gray-900/50 p-4 rounded-lg space-y-2">
                      <p className="text-gray-300"><span className="text-gray-400">Name:</span> {tuition.studentId.name}</p>
                      <p className="text-gray-300"><span className="text-gray-400">Email:</span> {tuition.studentId.email}</p>
                      {tuition.studentId.phone && (
                        <p className="text-gray-300"><span className="text-gray-400">Phone:</span> {tuition.studentId.phone}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Rejection Reason */}
                {tuition.approvalStatus === 'rejected' && tuition.rejectionReason && (
                  <div>
                    <h3 className="text-lg font-semibold text-red-400 mb-2">Rejection Reason</h3>
                    <p className="text-gray-300 bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                      {tuition.rejectionReason}
                    </p>
                  </div>
                )}

                {/* Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t" style={{ borderColor: 'rgba(255, 16, 240, 0.2)' }}>
                  <InfoItem label="Posted At" value={new Date(tuition.createdAt).toLocaleDateString()} />
                  {tuition.approvedAt && (
                    <InfoItem label="Approved At" value={new Date(tuition.approvedAt).toLocaleDateString()} />
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t" style={{ borderColor: 'rgba(255, 16, 240, 0.2)' }}>
                <button
                  onClick={onClose}
                  className="w-full px-4 py-3 rounded-lg font-semibold transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #FF10F0, #00F0FF)',
                    color: 'white'
                  }}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

const InfoCard = ({ icon, label, value }) => (
  <div className="bg-gray-900/50 p-4 rounded-lg border" style={{ borderColor: 'rgba(255, 16, 240, 0.2)' }}>
    <div className="flex items-center gap-2 mb-2" style={{ color: '#FF10F0' }}>
      {icon}
      <p className="text-sm text-gray-400">{label}</p>
    </div>
    <p className="text-white font-semibold">{value}</p>
  </div>
);

const InfoItem = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-400 mb-1">{label}</p>
    <p className="text-gray-300 font-medium">{value}</p>
  </div>
);

export default TuitionViewModal;