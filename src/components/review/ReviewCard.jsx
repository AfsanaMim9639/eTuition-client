import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaCheckCircle } from 'react-icons/fa';
import RatingStars from './RatingStars';

const ReviewCard = ({ review, isOwner = false, onEdit, onDelete }) => {
  const [showFullComment, setShowFullComment] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      setIsDeleting(true);
      await onDelete(review._id);
      setIsDeleting(false);
    }
  };

  const commentPreview = review.comment.length > 150 
    ? review.comment.substring(0, 150) + '...' 
    : review.comment;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-6 rounded-xl bg-gradient-to-br from-[#0a0f0d] via-[#0f1512] to-[#0a0f0d] border-2 border-[#00ffcc]/20 hover:border-[#00ffcc]/40 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={review.student?.profileImage || 'https://i.ibb.co/qpB9ZNp/default-avatar.png'}
            alt={review.student?.name}
            className="w-12 h-12 rounded-full border-2 border-[#00ffcc]/50 object-cover"
            onError={(e) => {
              e.target.src = 'https://i.ibb.co/qpB9ZNp/default-avatar.png';
            }}
          />
          <div>
            <h4 className="text-lg font-semibold text-white flex items-center gap-2">
              {review.student?.name || 'Anonymous'}
              {review.student?._id && (
                <FaCheckCircle className="text-[#00ff88] text-sm" title="Verified User" />
              )}
            </h4>
            <p className="text-xs text-gray-400">
              {formatDate(review.createdAt)}
            </p>
          </div>
        </div>

        {/* Actions for owner */}
        {isOwner && (
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onEdit(review)}
              className="p-2 text-[#00ffcc] hover:text-[#00ff88] transition-colors"
              title="Edit Review"
            >
              <FaEdit className="text-lg" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-2 text-gray-400 hover:text-[#ff0066] transition-colors disabled:opacity-50"
              title="Delete Review"
            >
              <FaTrash className="text-lg" />
            </motion.button>
          </div>
        )}
      </div>

      {/* Rating */}
      <div className="mb-4">
        <RatingStars rating={review.rating} size="md" showNumber={false} />
      </div>

      {/* Comment */}
      <div className="text-gray-300 leading-relaxed">
        <p className="whitespace-pre-wrap">
          {showFullComment ? review.comment : commentPreview}
        </p>
        {review.comment.length > 150 && (
          <button
            onClick={() => setShowFullComment(!showFullComment)}
            className="text-[#00ffcc] hover:text-[#00ff88] text-sm font-medium mt-2 transition-colors"
          >
            {showFullComment ? 'Show Less' : 'Read More'}
          </button>
        )}
      </div>

      {/* Updated indicator */}
      {review.createdAt !== review.updatedAt && (
        <p className="text-xs text-gray-500 mt-4 italic">
          Edited on {formatDate(review.updatedAt)}
        </p>
      )}
    </motion.div>
  );
};

export default ReviewCard;