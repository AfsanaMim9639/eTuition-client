// src/components/dashboard/admin/modals/UserEditModal.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save } from 'lucide-react';
import toast from 'react-hot-toast';

const UserEditModal = ({ user, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    location: '',
    profileImage: '',
    // Student fields
    grade: '',
    institution: '',
    // Tutor fields
    subjects: [],
    experience: 0,
    bio: '',
    hourlyRate: 0
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        location: user.location || '',
        profileImage: user.profileImage || '',
        grade: user.grade || '',
        institution: user.institution || '',
        subjects: user.subjects || [],
        experience: user.experience || 0,
        bio: user.bio || '',
        hourlyRate: user.hourlyRate || 0
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubjectsChange = (e) => {
    const subjects = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
    setFormData(prev => ({
      ...prev,
      subjects
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      toast.error('Name is required');
      return;
    }
    
    if (!formData.email.trim()) {
      toast.error('Email is required');
      return;
    }

    setLoading(true);
    
    try {
      await onSave(user._id, formData);
      // ⭐ Removed duplicate toast - already handled in useAdminUsers
      onClose();
    } catch (error) {
      // ⭐ Error toast also handled in useAdminUsers
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !user) return null;

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
                  <h2 className="text-2xl font-bold text-white">Edit User Information</h2>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Basic Information */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Basic Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      label="Name *"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    
                    <InputField
                      label="Email *"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    
                    <InputField
                      label="Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    
                    <InputField
                      label="Address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Student Specific Fields */}
                {user.role === 'student' && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Student Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField
                        label="Grade/Class"
                        name="grade"
                        value={formData.grade}
                        onChange={handleChange}
                      />
                      
                      <InputField
                        label="Institution"
                        name="institution"
                        value={formData.institution}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                )}

                {/* Tutor Specific Fields */}
                {user.role === 'tutor' && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Tutor Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField
                        label="Experience (years)"
                        name="experience"
                        type="number"
                        value={formData.experience}
                        onChange={handleChange}
                        min="0"
                      />
                      
                      <InputField
                        label="Location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                      />
                      
                      <InputField
                        label="Hourly Rate (৳)"
                        name="hourlyRate"
                        type="number"
                        value={formData.hourlyRate}
                        onChange={handleChange}
                        min="0"
                      />
                      
                      <InputField
                        label="Subjects (comma separated)"
                        name="subjects"
                        value={formData.subjects.join(', ')}
                        onChange={handleSubjectsChange}
                        placeholder="Math, Physics, Chemistry"
                      />
                    </div>
                    
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Bio
                      </label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows="4"
                        className="w-full px-4 py-3 rounded-lg border-2 bg-gray-900 text-white placeholder-gray-500 focus:outline-none transition-all"
                        style={{
                          borderColor: 'rgba(255, 16, 240, 0.3)',
                          ':focus': { borderColor: '#FF10F0' }
                        }}
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-3 rounded-lg font-semibold border-2 transition-all"
                    style={{
                      borderColor: 'rgba(255, 16, 240, 0.3)',
                      color: '#FF10F0'
                    }}
                  >
                    Cancel
                  </button>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-4 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                    style={{
                      background: loading ? 'rgba(255, 16, 240, 0.5)' : 'linear-gradient(135deg, #FF10F0, #00F0FF)',
                      color: 'white'
                    }}
                  >
                    <Save className="w-5 h-5" />
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

const InputField = ({ label, name, type = 'text', value, onChange, required = false, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-300 mb-2">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-3 rounded-lg border-2 bg-gray-900 text-white placeholder-gray-500 focus:outline-none transition-all"
      style={{
        borderColor: 'rgba(255, 16, 240, 0.3)'
      }}
      {...props}
    />
  </div>
);

export default UserEditModal;