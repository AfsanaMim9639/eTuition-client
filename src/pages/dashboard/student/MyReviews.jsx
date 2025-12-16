import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { reviewAPI } from '../../../utils/reviewService';
import RatingStars from '../../../components/review/RatingStars';
import ReviewForm from '../../../components/review/ReviewForm';

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditForm, setShowEditForm] = useState(false);
  const [reviewToEdit, setReviewToEdit] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ show: false, reviewId: null, tutorName: '' });

  useEffect(() => {
    fetchMyReviews();
  }, []);

  const fetchMyReviews = async () => {
    setLoading(true);
    try {
      const response = await reviewAPI.getMyReviews();
      setReviews(response.data.reviews);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
      toast.error('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (review) => {
    setReviewToEdit(review);
    setShowEditForm(true);
  };

  const handleDelete = (review) => {
    setDeleteModal({ 
      show: true, 
      reviewId: review._id, 
      tutorName: review.tutor?.name || 'this tutor' 
    });
  };

  const confirmDelete = async () => {
    try {
      await reviewAPI.deleteReview(deleteModal.reviewId);
      setReviews(reviews.filter(r => r._id !== deleteModal.reviewId));
      setDeleteModal({ show: false, reviewId: null, tutorName: '' });
      toast.success('Review deleted successfully!');
    } catch (error) {
      console.error('Failed to delete review:', error);
      toast.error(error.response?.data?.message || 'Failed to delete review');
    }
  };

  const handleReviewSuccess = () => {
    setShowEditForm(false);
    setReviewToEdit(null);
    fetchMyReviews();
    toast.success('Review updated successfully!');
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0f0d] pt-24 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#00ffcc]/30 border-t-[#00ffcc] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f0d] pt-5 pb-5">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-[#00ffcc] mb-2">My Reviews</h1>
          <p className="text-gray-400">Manage all your tutor reviews</p>
        </motion.div>

        {/* Reviews List */}
        {reviews.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 p-8 rounded-2xl bg-gradient-to-br from-[#0a0f0d] via-[#0f1512] to-[#0a0f0d] border-2 border-[#00ffcc]/20"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#00ffcc]/10 flex items-center justify-center">
              <span className="text-6xl">📝</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-300 mb-2">No reviews yet</h3>
            <p className="text-gray-500 mb-6">Start by reviewing tutors you've worked with</p>
            <Link
              to="/tutors"
              className="inline-block px-6 py-3 bg-gradient-to-r from-[#00ffcc] to-[#00ff88] rounded-lg text-[#0a0f0d] font-bold hover:shadow-lg hover:shadow-[#00ffcc]/50 transition-all"
            >
              Browse Tutors
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {reviews.map((review, index) => (
                <motion.div
                  key={review._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-6 rounded-2xl bg-gradient-to-br from-[#0a0f0d] via-[#0f1512] to-[#0a0f0d] border-2 border-[#00ffcc]/20 hover:border-[#00ffcc]/40 transition-all group"
                >
                  {/* Tutor Info */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <Link to={`/tutors/${review.tutor._id}`}>
                        <motion.img
                          whileHover={{ scale: 1.1 }}
                          src={review.tutor?.profileImage || 'https://i.ibb.co/qpB9ZNp/default-avatar.png'}
                          alt={review.tutor?.name}
                          className="w-16 h-16 rounded-xl border-2 border-[#00ffcc]/50 object-cover"
                          onError={(e) => {
                            e.target.src = 'https://i.ibb.co/qpB9ZNp/default-avatar.png';
                          }}
                        />
                      </Link>
                      <div>
                        <Link to={`/tutors/${review.tutor._id}`}>
                          <h3 className="text-xl font-bold text-white hover:text-[#00ffcc] transition-colors">
                            {review.tutor?.name || 'Unknown Tutor'}
                          </h3>
                        </Link>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {review.tutor?.subjects?.slice(0, 3).map((subject, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-[#00ffcc]/10 border border-[#00ffcc]/20 rounded text-xs text-[#00ffcc]"
                            >
                              {subject}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link to={`/tutors/${review.tutor._id}`}>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 text-[#00ffcc] hover:text-[#00ff88] transition-colors"
                          title="View Tutor Profile"
                        >
                          <FaEye className="text-lg" />
                        </motion.button>
                      </Link>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEdit(review)}
                        className="p-2 text-[#00ffcc] hover:text-[#00ff88] transition-colors"
                        title="Edit Review"
                      >
                        <FaEdit className="text-lg" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(review)}
                        className="p-2 text-gray-400 hover:text-[#ff0066] transition-colors"
                        title="Delete Review"
                      >
                        <FaTrash className="text-lg" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="mb-3">
                    <RatingStars rating={review.rating} size="md" showNumber={false} />
                  </div>

                  {/* Comment */}
                  <p className="text-gray-300 leading-relaxed mb-3 whitespace-pre-wrap">
                    {review.comment}
                  </p>

                  {/* Date */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Reviewed on {formatDate(review.createdAt)}</span>
                    {review.createdAt !== review.updatedAt && (
                      <span className="italic">Edited on {formatDate(review.updatedAt)}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Edit Form Modal */}
      <AnimatePresence>
        {showEditForm && reviewToEdit && (
          <ReviewForm
            tutorId={reviewToEdit.tutor._id}
            tutorName={reviewToEdit.tutor.name}
            existingReview={reviewToEdit}
            onSuccess={handleReviewSuccess}
            onCancel={() => {
              setShowEditForm(false);
              setReviewToEdit(null);
            }}
          />
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteModal.show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setDeleteModal({ show: false, reviewId: null, tutorName: '' })}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-[#0f1512] to-[#0a0f0d] border-2 border-red-500/50 rounded-xl p-8 max-w-md w-full"
            >
              <h3 className="text-2xl font-bold text-red-400 mb-4">Delete Review?</h3>
              <p className="text-gray-300 mb-6">
                Are you sure you want to delete your review for <strong className="text-white">{deleteModal.tutorName}</strong>? 
                This action cannot be undone.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setDeleteModal({ show: false, reviewId: null, tutorName: '' })}
                  className="flex-1 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyReviews;