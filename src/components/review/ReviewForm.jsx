import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaTimes } from 'react-icons/fa';
import { reviewAPI } from '../../utils/reviewService';

const ReviewForm = ({ tutorId, tutorName, onSuccess, onCancel, existingReview = null }) => {
  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState(existingReview?.comment || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (rating === 0) {
      setError('Please select a rating');
      return;
    }

    if (comment.trim().length < 10) {
      setError('Review must be at least 10 characters');
      return;
    }

    setLoading(true);

    try {
      if (existingReview) {
        await reviewAPI.updateReview(existingReview._id, { rating, comment });
      } else {
        await reviewAPI.createReview({ tutorId, rating, comment });
      }
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        className="bg-gradient-to-br from-[#0a0f0d] via-[#0f1512] to-[#0a0f0d] border-2 border-[#00ffcc]/30 rounded-2xl p-8 max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-2xl font-bold text-[#00ffcc] mb-1">
              {existingReview ? 'Edit Review' : 'Write a Review'}
            </h3>
            <p className="text-gray-400">for {tutorName}</p>
          </div>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-[#ff0066] transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Rating <span className="text-[#ff0066]">*</span>
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  type="button"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="focus:outline-none"
                >
                  <FaStar
                    className={`text-3xl transition-colors ${
                      star <= (hoveredRating || rating)
                        ? 'text-[#00ff88]'
                        : 'text-gray-600'
                    }`}
                  />
                </motion.button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-sm text-gray-400 mt-2">
                You rated: <span className="text-[#00ff88] font-semibold">{rating} stars</span>
              </p>
            )}
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Review <span className="text-[#ff0066]">*</span>
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this tutor..."
              rows={5}
              className="w-full px-4 py-3 bg-[#0a0f0d]/50 border-2 border-[#00ffcc]/30 rounded-lg text-white placeholder-gray-500 focus:border-[#00ffcc] focus:outline-none transition-colors resize-none"
              maxLength={500}
            />
            <p className="text-xs text-gray-500 mt-1">
              {comment.length}/500 characters (min. 10)
            </p>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-[#ff0066]/10 border border-[#ff0066]/30 rounded-lg text-[#ff0066] text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Buttons */}
          <div className="flex gap-3">
            <motion.button
              type="button"
              onClick={onCancel}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 px-6 py-3 bg-gray-700/50 border-2 border-gray-600 rounded-lg text-gray-300 font-semibold hover:bg-gray-700 transition-colors"
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-[#00ffcc] to-[#00ff88] rounded-lg text-[#0a0f0d] font-bold hover:shadow-lg hover:shadow-[#00ffcc]/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : existingReview ? 'Update Review' : 'Submit Review'}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ReviewForm;