import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function ApplyModal({ isOpen, onClose, tuition, tutorInfo, onSubmit }) {
  const [formData, setFormData] = useState({
    message: '',
    proposedRate: tuition?.salary || ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    setError('');

    if (formData.message.trim().length < 20) {
      setError('Message must be at least 20 characters');
      return;
    }

    if (!formData.proposedRate || formData.proposedRate <= 0) {
      setError('Please enter a valid proposed rate');
      return;
    }

    setLoading(true);
    try {
      await onSubmit({
        tuitionId: tuition._id,
        message: formData.message,
        proposedRate: parseFloat(formData.proposedRate)
      });
      
      setFormData({ message: '', proposedRate: '' });
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
            className="card-neon card-neon-pink rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-pink-500/30 sticky top-0 bg-dark-card backdrop-blur-xl">
              <motion.h2 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold neon-text-pink"
              >
                Apply for Tuition
              </motion.h2>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-gray-400 hover:text-pink-500 transition"
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
                className="neon-border-pink rounded-lg p-4 mb-6 bg-pink-500/5"
              >
                <h3 className="font-semibold text-white mb-2">{tuition?.title}</h3>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
                  <div><span className="text-pink-400">Subject:</span> {tuition?.subject}</div>
                  <div><span className="text-pink-400">Grade:</span> {tuition?.grade}</div>
                  <div><span className="text-pink-400">Location:</span> {tuition?.location}</div>
                  <div><span className="text-pink-400">Salary:</span> ৳{tuition?.salary}/month</div>
                </div>
              </motion.div>

              {/* Form Fields */}
              <div className="space-y-5">
                {/* Read-only fields */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={tutorInfo?.name || ''}
                    readOnly
                    className="w-full px-4 py-2 bg-dark-card border border-gray-700 rounded-lg text-gray-500 cursor-not-allowed"
                  />
                </motion.div>

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.45 }}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    value={tutorInfo?.email || ''}
                    readOnly
                    className="w-full px-4 py-2 bg-dark-card border border-gray-700 rounded-lg text-gray-500 cursor-not-allowed"
                  />
                </motion.div>

                {/* Editable fields */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Cover Letter / Message <span className="text-pink-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write why you're the perfect fit for this tuition..."
                    rows="6"
                    className="input-neon w-full resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.message.length} / 20 minimum characters
                  </p>
                </motion.div>

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.55 }}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Your Proposed Rate (৳/month) <span className="text-pink-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="proposedRate"
                    value={formData.proposedRate}
                    onChange={handleChange}
                    placeholder="Enter your expected monthly salary"
                    min="0"
                    className="input-neon w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Student's budget: ৳{tuition?.salary}/month
                  </p>
                </motion.div>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="neon-border-pink bg-pink-500/10 text-pink-400 px-4 py-3 rounded-lg"
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Action Buttons */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex gap-3 pt-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="flex-1 px-6 py-3 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-1 btn-neon btn-neon-pink px-6 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="spinner-neon w-5 h-5"></span>
                        Submitting...
                      </span>
                    ) : (
                      'Submit Application'
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