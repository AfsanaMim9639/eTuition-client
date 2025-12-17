import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, DollarSign, Briefcase, GraduationCap, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../utils/api';

export default function EditApplicationModal({ isOpen, onClose, application, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    qualifications: application?.qualifications || '',
    experience: application?.experience || '',
    proposedRate: application?.proposedRate || application?.tuition?.salary || '',
    message: application?.message || ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.qualifications.trim()) {
      newErrors.qualifications = 'Qualifications are required';
    } else if (formData.qualifications.trim().length < 20) {
      newErrors.qualifications = 'Please provide detailed qualifications (at least 20 characters)';
    }

    if (!formData.experience.trim()) {
      newErrors.experience = 'Experience is required';
    } else if (formData.experience.trim().length < 20) {
      newErrors.experience = 'Please describe your experience (at least 20 characters)';
    }

    if (!formData.proposedRate || formData.proposedRate <= 0) {
      newErrors.proposedRate = 'Please enter a valid salary';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 50) {
      newErrors.message = 'Message must be at least 50 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async () => {
    if (!validateForm()) {
      toast.error('Please fix all errors');
      return;
    }

    if (!application?._id) {
      toast.error('Application ID not found');
      return;
    }

    setLoading(true);
    try {
      // ✅ Using PATCH method with correct endpoint
      const response = await api.patch(`/applications/${application._id}`, {
        qualifications: formData.qualifications.trim(),
        experience: formData.experience.trim(),
        proposedRate: parseFloat(formData.proposedRate),
        message: formData.message.trim()
      });
      
      if (response.data.success) {
        toast.success('Application updated successfully! 🎉');
        onSuccess?.(response.data.data);
        onClose();
      } else {
        toast.error(response.data.message || 'Failed to update');
      }
    } catch (error) {
      console.error('Update error:', error);
      
      // Better error messages
      let errorMessage = 'Failed to update application';
      
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message;
        
        if (status === 404) {
          errorMessage = 'Application not found or has been removed';
        } else if (status === 403) {
          errorMessage = 'You cannot edit this application';
        } else if (status === 400) {
          errorMessage = message || 'Invalid application data';
        } else if (status === 409) {
          errorMessage = 'Application has already been processed';
        } else if (message) {
          errorMessage = message;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      qualifications: application?.qualifications || '',
      experience: application?.experience || '',
      proposedRate: application?.proposedRate || application?.tuition?.salary || '',
      message: application?.message || ''
    });
    setErrors({});
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
            className="card-neon card-neon-blue rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-blue-500/30 sticky top-0 bg-dark-card backdrop-blur-xl z-10">
              <motion.h2 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold neon-text-blue"
              >
                Edit Application
              </motion.h2>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClose}
                className="text-gray-400 hover:text-blue-500 transition"
              >
                <X size={24} />
              </motion.button>
            </div>

            {/* Body */}
            <div className="p-6">
              {/* Tuition Info */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="neon-border-cyan rounded-lg p-4 mb-6 bg-cyan-500/5"
              >
                <h3 className="font-bold text-lg text-cyan-400 mb-2">
                  {application?.tuition?.title}
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
                  <div>
                    <span className="text-cyan-400">Subject:</span> {application?.tuition?.subject}
                  </div>
                  <div>
                    <span className="text-cyan-400">Grade:</span> {application?.tuition?.grade || application?.tuition?.class}
                  </div>
                  <div className="col-span-2">
                    <span className="text-green-400 font-semibold">
                      Budget: ৳{application?.tuition?.salary}/month
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Edit Fields */}
              <div className="space-y-5">
                {/* Qualifications */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center gap-2">
                    <GraduationCap size={18} className="text-pink-400" />
                    Qualifications <span className="text-pink-500">*</span>
                  </label>
                  <textarea
                    name="qualifications"
                    value={formData.qualifications}
                    onChange={handleChange}
                    className="input-neon w-full h-24 resize-none"
                    placeholder="e.g., B.Sc in Mathematics from Dhaka University..."
                  />
                  {errors.qualifications && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.qualifications}
                    </p>
                  )}
                </motion.div>

                {/* Experience */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.45 }}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center gap-2">
                    <Briefcase size={18} className="text-blue-400" />
                    Experience <span className="text-pink-500">*</span>
                  </label>
                  <textarea
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="input-neon w-full h-24 resize-none"
                    placeholder="e.g., 3 years of teaching experience with excellent results..."
                  />
                  {errors.experience && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.experience}
                    </p>
                  )}
                </motion.div>

                {/* Proposed Rate */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center gap-2">
                    <DollarSign size={18} className="text-green-400" />
                    Your Proposed Rate (৳/month) <span className="text-pink-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="proposedRate"
                    value={formData.proposedRate}
                    onChange={handleChange}
                    className="input-neon w-full"
                    placeholder="Enter your expected salary"
                  />
                  {errors.proposedRate && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.proposedRate}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Student's budget: ৳{application?.tuition?.salary}/month
                  </p>
                </motion.div>

                {/* Message */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.55 }}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center gap-2">
                    <MessageSquare size={18} className="text-purple-400" />
                    Cover Letter / Message <span className="text-pink-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="input-neon w-full h-32 resize-none"
                    placeholder="Explain why you're a good fit for this tuition..."
                  />
                  {errors.message && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.message}
                    </p>
                  )}
                </motion.div>

                {/* Submit Buttons */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex gap-4 pt-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleClose}
                    disabled={loading}
                    className="flex-1 px-6 py-3 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleUpdate}
                    disabled={loading}
                    className="flex-1 btn-neon btn-neon-blue px-6 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="spinner-neon w-5 h-5"></span>
                        Updating...
                      </span>
                    ) : (
                      'Update Application'
                    )}
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}