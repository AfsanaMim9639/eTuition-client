import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaMapMarkerAlt, FaBriefcase, FaGraduationCap, FaDollarSign } from 'react-icons/fa';
import api from '../../utils/api';
import { reviewAPI } from '../../utils/reviewService';
import ReviewList from '../../components/review/ReviewList';
import ReviewForm from '../../components/review/ReviewForm';
import RatingStars from '../../components/review/RatingStars';

const TutorProfilePage = () => {
  const { id } = useParams();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [canReview, setCanReview] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [existingReview, setExistingReview] = useState(null);
  const [reviewToEdit, setReviewToEdit] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  const isStudent = currentUser?.role === 'student';

  useEffect(() => {
    fetchTutor();
    if (isStudent) {
      checkCanReview();
    }
  }, [id]);

  const fetchTutor = async () => {
    try {
      const response = await api.get(`/users/${id}`);
      setTutor(response.data.user);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkCanReview = async () => {
    try {
      const response = await reviewAPI.canReviewTutor(id);
      setCanReview(response.data.canReview);
      setHasReviewed(response.data.hasReviewed);
      setExistingReview(response.data.review);
    } catch (error) {
      console.error('Error checking review status:', error);
    }
  };

  const handleReviewSuccess = () => {
    setShowReviewForm(false);
    setReviewToEdit(null);
    fetchTutor();
    if (isStudent) {
      checkCanReview();
    }
  };

  const handleEditReview = (review) => {
    setReviewToEdit(review);
    setShowReviewForm(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0f0d] pt-24 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#00ffcc]/30 border-t-[#00ffcc] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="min-h-screen bg-[#0a0f0d] pt-24 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-[#ff0066] mb-4">Tutor not found</h2>
          <p className="text-gray-400">The tutor you're looking for doesn't exist.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f0d] pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-2xl bg-gradient-to-br from-[#0a0f0d] via-[#0f1512] to-[#0a0f0d] border-2 border-[#00ffcc]/30 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Profile Image */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <img
                src={tutor.profileImage || 'https://i.ibb.co/qpB9ZNp/default-avatar.png'}
                alt={tutor.name}
                className="w-40 h-40 rounded-2xl border-4 border-[#00ffcc]/50 object-cover"
                onError={(e) => {
                  e.target.src = 'https://i.ibb.co/qpB9ZNp/default-avatar.png';
                }}
              />
              {/* Rating badge */}
              <div className="absolute -bottom-3 -right-3 bg-[#0a0f0d] p-3 rounded-xl border-2 border-[#00ff88]">
                <div className="flex items-center gap-1">
                  <FaStar className="text-[#00ff88] text-lg" />
                  <span className="text-xl font-bold text-[#00ff88]">
                    {tutor.rating?.toFixed(1) || '0.0'}
                  </span>
                </div>
                <p className="text-xs text-gray-400 text-center">
                  {tutor.totalReviews || 0} reviews
                </p>
              </div>
            </motion.div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-[#00ffcc] mb-3">{tutor.name}</h1>
              
              {/* Bio */}
              {tutor.bio && (
                <p className="text-gray-300 mb-4 leading-relaxed">{tutor.bio}</p>
              )}

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {tutor.location && (
                  <div className="flex items-center gap-2 text-gray-400">
                    <FaMapMarkerAlt className="text-[#00ff88]" />
                    <span className="text-sm">{tutor.location}</span>
                  </div>
                )}
                {tutor.experience !== undefined && tutor.experience > 0 && (
                  <div className="flex items-center gap-2 text-gray-400">
                    <FaBriefcase className="text-[#00ff88]" />
                    <span className="text-sm">{tutor.experience} years exp.</span>
                  </div>
                )}
                {tutor.hourlyRate && (
                  <div className="flex items-center gap-2 text-gray-400">
                    <FaDollarSign className="text-[#00ff88]" />
                    <span className="text-sm">{tutor.hourlyRate} BDT/hr</span>
                  </div>
                )}
              </div>

              {/* Subjects */}
              {tutor.subjects && tutor.subjects.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 mb-2">SUBJECTS</h3>
                  <div className="flex flex-wrap gap-2">
                    {tutor.subjects.map((subject, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-[#00ffcc]/20 border border-[#00ffcc]/30 rounded-lg text-[#00ffcc] text-sm font-medium"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Education */}
        {tutor.education && tutor.education.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-[#0a0f0d] via-[#0f1512] to-[#0a0f0d] border-2 border-[#00ffcc]/20 mb-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <FaGraduationCap className="text-2xl text-[#00ffcc]" />
              <h2 className="text-2xl font-bold text-[#00ffcc]">Education</h2>
            </div>
            <div className="space-y-3">
              {tutor.education.map((edu, i) => (
                <div key={i} className="p-4 bg-[#0a0f0d]/50 rounded-lg border border-[#00ffcc]/10">
                  <h3 className="text-lg font-semibold text-white">{edu.degree}</h3>
                  <p className="text-gray-400">{edu.institution}</p>
                  {edu.year && <p className="text-sm text-gray-500">{edu.year}</p>}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl bg-gradient-to-br from-[#0a0f0d] via-[#0f1512] to-[#0a0f0d] border-2 border-[#00ffcc]/20"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-[#00ffcc]">Student Reviews</h2>
              <div className="px-3 py-1 bg-[#00ffcc]/10 rounded-full">
                <RatingStars rating={tutor.rating || 0} size="sm" />
              </div>
            </div>

            {/* Write Review Button */}
            {isStudent && canReview && !hasReviewed && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowReviewForm(true)}
                className="px-6 py-3 bg-gradient-to-r from-[#00ffcc] to-[#00ff88] rounded-lg text-[#0a0f0d] font-bold hover:shadow-lg hover:shadow-[#00ffcc]/50 transition-all"
              >
                Write a Review
              </motion.button>
            )}

            {/* Edit Review Button */}
            {isStudent && hasReviewed && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleEditReview(existingReview)}
                className="px-6 py-3 bg-[#00ffcc]/10 border-2 border-[#00ffcc] rounded-lg text-[#00ffcc] font-bold hover:bg-[#00ffcc]/20 transition-all"
              >
                Edit Your Review
              </motion.button>
            )}
          </div>

          {/* Review List */}
          <ReviewList
            tutorId={id}
            currentUserId={currentUser?._id || currentUser?.userId}
            onEdit={handleEditReview}
          />
        </motion.div>
      </div>

      {/* Review Form Modal */}
      <AnimatePresence>
        {showReviewForm && (
          <ReviewForm
            tutorId={id}
            tutorName={tutor.name}
            existingReview={reviewToEdit}
            onSuccess={handleReviewSuccess}
            onCancel={() => {
              setShowReviewForm(false);
              setReviewToEdit(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default TutorProfilePage;