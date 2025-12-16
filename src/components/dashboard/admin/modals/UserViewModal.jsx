// src/components/dashboard/admin/modals/UserViewModal.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, MapPin, Calendar, Shield, User, GraduationCap, Briefcase, DollarSign } from 'lucide-react';

const UserViewModal = ({ user, isOpen, onClose }) => {
  if (!isOpen || !user) return null;

  const getStatusBadge = (status) => {
    const colors = {
      pending: { bg: 'rgba(255, 165, 0, 0.2)', border: '#FFA500', text: '#FFA500' },
      approved: { bg: 'rgba(57, 255, 20, 0.2)', border: '#39FF14', text: '#39FF14' },
      rejected: { bg: 'rgba(255, 0, 0, 0.2)', border: '#FF0000', text: '#FF0000' },
      suspended: { bg: 'rgba(255, 215, 0, 0.2)', border: '#FFD700', text: '#FFD700' },
      blocked: { bg: 'rgba(139, 0, 0, 0.2)', border: '#8B0000', text: '#8B0000' }
    };
    
    const style = colors[status] || colors.pending;
    
    return (
      <span 
        className="px-3 py-1 rounded-full text-sm font-semibold border-2"
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

  const getRoleBadge = (role) => {
    const colors = {
      admin: { bg: 'rgba(255, 16, 240, 0.2)', border: '#FF10F0', text: '#FF10F0' },
      tutor: { bg: 'rgba(0, 240, 255, 0.2)', border: '#00F0FF', text: '#00F0FF' },
      student: { bg: 'rgba(57, 255, 20, 0.2)', border: '#39FF14', text: '#39FF14' }
    };
    
    const style = colors[role] || colors.student;
    
    return (
      <span 
        className="px-3 py-1 rounded-full text-sm font-semibold border-2"
        style={{
          backgroundColor: style.bg,
          borderColor: style.border,
          color: style.text
        }}
      >
        {role?.charAt(0).toUpperCase() + role?.slice(1) || 'Student'}
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
              className="w-full max-w-2xl rounded-2xl border-2 overflow-hidden max-h-[90vh] overflow-y-auto"
              style={{
                background: 'linear-gradient(135deg, rgba(18, 18, 18, 0.98), rgba(26, 26, 26, 0.98))',
                borderColor: 'rgba(255, 16, 240, 0.3)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 border-b" style={{ borderColor: 'rgba(255, 16, 240, 0.2)' }}>
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">User Details</h2>
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
                {/* Profile Section */}
                <div className="flex items-center gap-4">
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, #FF10F0, #00F0FF)' }}
                  >
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{user.name}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      {getRoleBadge(user.role)}
                      {getStatusBadge(user.status)}
                    </div>
                  </div>
                </div>

                {/* Basic Info */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                    <User className="w-5 h-5" style={{ color: '#FF10F0' }} />
                    Basic Information
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoItem icon={<Mail />} label="Email" value={user.email} />
                    <InfoItem icon={<Phone />} label="Phone" value={user.phone || 'Not provided'} />
                    <InfoItem icon={<MapPin />} label="Address" value={user.address || 'Not provided'} />
                    <InfoItem icon={<Calendar />} label="Joined" value={new Date(user.createdAt).toLocaleDateString()} />
                  </div>
                </div>

                {/* Student Specific Info */}
                {user.role === 'student' && (
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                      <GraduationCap className="w-5 h-5" style={{ color: '#39FF14' }} />
                      Student Information
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InfoItem label="Grade/Class" value={user.grade || 'Not provided'} />
                      <InfoItem label="Institution" value={user.institution || 'Not provided'} />
                    </div>
                  </div>
                )}

                {/* Tutor Specific Info */}
                {user.role === 'tutor' && (
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                      <Briefcase className="w-5 h-5" style={{ color: '#00F0FF' }} />
                      Tutor Information
                    </h4>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <InfoItem label="Experience" value={`${user.experience || 0} years`} />
                      <InfoItem label="Location" value={user.location || 'Not provided'} />
                      
                      {user.subjects && user.subjects.length > 0 && (
                        <div>
                          <p className="text-sm text-gray-400 mb-2">Subjects</p>
                          <div className="flex flex-wrap gap-2">
                            {user.subjects.map((subject, idx) => (
                              <span 
                                key={idx}
                                className="px-3 py-1 rounded-full text-sm font-medium"
                                style={{
                                  backgroundColor: 'rgba(0, 240, 255, 0.2)',
                                  color: '#00F0FF',
                                  border: '1px solid rgba(0, 240, 255, 0.3)'
                                }}
                              >
                                {subject}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {user.hourlyRate && (
                        <InfoItem 
                          icon={<DollarSign />} 
                          label="Hourly Rate" 
                          value={`৳${user.hourlyRate}`} 
                        />
                      )}

                      {user.bio && (
                        <div>
                          <p className="text-sm text-gray-400 mb-2">Bio</p>
                          <p className="text-gray-300">{user.bio}</p>
                        </div>
                      )}

                      {user.education && user.education.length > 0 && (
                        <div>
                          <p className="text-sm text-gray-400 mb-2">Education</p>
                          {user.education.map((edu, idx) => (
                            <div key={idx} className="mb-2 text-gray-300">
                              <p className="font-medium">{edu.degree}</p>
                              <p className="text-sm text-gray-400">{edu.institution} {edu.year && `(${edu.year})`}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
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

const InfoItem = ({ icon, label, value }) => (
  <div>
    <div className="flex items-center gap-2 mb-1">
      {icon && <span style={{ color: '#FF10F0' }}>{icon}</span>}
      <p className="text-sm text-gray-400">{label}</p>
    </div>
    <p className="text-gray-300 font-medium">{value}</p>
  </div>
);

export default UserViewModal;