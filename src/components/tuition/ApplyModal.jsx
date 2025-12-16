// components/tuition/ApplyModal.jsx

import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const ApplyModal = ({ isOpen, onClose, tuition }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    qualifications: '',
    experience: '',
    expectedSalary: tuition?.salary || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (formData.qualifications.length < 20) {
      toast.error('Qualifications must be at least 20 characters');
      return;
    }

    if (!formData.experience.trim()) {
      toast.error('Please enter your experience');
      return;
    }

    if (!formData.expectedSalary || formData.expectedSalary <= 0) {
      toast.error('Please enter a valid expected salary');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/applications/apply', {
        tuitionId: tuition._id,
        qualifications: formData.qualifications,
        experience: formData.experience,
        expectedSalary: Number(formData.expectedSalary)
      });

      if (response.data.success) {
        toast.success('Application submitted successfully!');
        onClose();
        
        // Reset form
        setFormData({
          qualifications: '',
          experience: '',
          expectedSalary: tuition?.salary || ''
        });

        // Reload page after 1 second
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error('Application error:', error);
      
      if (error.response?.data?.alreadyApplied) {
        toast.error('You have already applied to this tuition');
      } else {
        toast.error(error.response?.data?.message || 'Failed to submit application');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-[#0f1512] to-[#0a0f0d] border-2 border-[#00ffcc] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-br from-[#0f1512] to-[#0a0f0d] border-b-2 border-[#00ffcc]/30 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#00ffcc]">Apply for Tuition</h2>
            <p className="text-gray-400 text-sm mt-1">{tuition?.title}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#00ffcc]/20 rounded-lg transition-all"
          >
            <FaTimes className="text-2xl text-gray-400 hover:text-[#00ffcc]" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Name (Read-only) */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={user?.name || ''}
              readOnly
              className="w-full px-4 py-3 bg-[#0a0f0d]/50 border-2 border-gray-600 rounded-lg text-gray-400 cursor-not-allowed"
            />
          </div>

          {/* Email (Read-only) */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={user?.email || ''}
              readOnly
              className="w-full px-4 py-3 bg-[#0a0f0d]/50 border-2 border-gray-600 rounded-lg text-gray-400 cursor-not-allowed"
            />
          </div>

          {/* Qualifications */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Qualifications <span className="text-red-500">*</span>
            </label>
            <textarea
              name="qualifications"
              value={formData.qualifications}
              onChange={handleChange}
              rows="4"
              placeholder="Describe your educational background, degrees, certifications, etc. (minimum 20 characters)"
              required
              className="w-full px-4 py-3 bg-[#0a0f0d] border-2 border-[#00ffcc]/30 rounded-lg text-white placeholder-gray-500 focus:border-[#00ffcc] focus:outline-none transition-all resize-none"
            />
            <p className="text-xs text-gray-400 mt-1">
              {formData.qualifications.length}/20 characters minimum
            </p>
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Experience <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="e.g., 3 years teaching Math to high school students"
              required
              className="w-full px-4 py-3 bg-[#0a0f0d] border-2 border-[#00ffcc]/30 rounded-lg text-white placeholder-gray-500 focus:border-[#00ffcc] focus:outline-none transition-all"
            />
          </div>

          {/* Expected Salary */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Expected Salary (BDT/month) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="expectedSalary"
              value={formData.expectedSalary}
              onChange={handleChange}
              placeholder="Enter your expected salary"
              required
              min="0"
              className="w-full px-4 py-3 bg-[#0a0f0d] border-2 border-[#00ffcc]/30 rounded-lg text-white placeholder-gray-500 focus:border-[#00ffcc] focus:outline-none transition-all"
            />
            {tuition?.salary && (
              <p className="text-xs text-gray-400 mt-1">
                Tuition budget: {tuition.salary} BDT/month
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-[#00ffcc] to-[#00ff88] text-[#0a0f0d] rounded-lg font-bold hover:shadow-lg hover:shadow-[#00ffcc]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-[#0a0f0d] border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </span>
              ) : (
                'Submit Application'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyModal;