import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ReviewCard from './ReviewCard';
import { reviewAPI } from '../../utils/reviewService';

const ReviewList = ({ tutorId, currentUserId, onEdit }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalReviews, setTotalReviews] = useState(0);
  const limit = 5;

  useEffect(() => {
    fetchReviews();
  }, [tutorId, currentPage]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await reviewAPI.getTutorReviews(tutorId, { page: currentPage, limit });
      setReviews(response.data.reviews);
      setTotalPages(response.data.pagination.totalPages);
      setTotalReviews(response.data.pagination.totalReviews);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      await reviewAPI.deleteReview(reviewId);
      fetchReviews(); // Refresh list
    } catch (error) {
      console.error('Failed to delete review:', error);
      alert(error.response?.data?.message || 'Failed to delete review');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-12 h-12 border-4 border-[#00ffcc]/30 border-t-[#00ffcc] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#00ffcc]/10 flex items-center justify-center">
          <span className="text-4xl">📝</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-400 mb-2">No reviews yet</h3>
        <p className="text-gray-500">Be the first to review this tutor!</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Reviews count */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-[#00ffcc]">
          Reviews ({totalReviews})
        </h3>
      </div>

      {/* Review cards */}
      <div className="space-y-4">
        <AnimatePresence mode="wait">
          {reviews.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
              isOwner={review.student?._id === currentUserId}
              onEdit={onEdit}
              onDelete={handleDelete}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 pt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="p-3 rounded-lg bg-[#00ffcc]/10 border-2 border-[#00ffcc]/30 text-[#00ffcc] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#00ffcc]/20 transition-all"
          >
            <FaChevronLeft />
          </motion.button>

          <span className="text-gray-400 font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="p-3 rounded-lg bg-[#00ffcc]/10 border-2 border-[#00ffcc]/30 text-[#00ffcc] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#00ffcc]/20 transition-all"
          >
            <FaChevronRight />
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default ReviewList;