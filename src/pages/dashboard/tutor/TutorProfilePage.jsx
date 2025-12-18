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
  const [error, setError] = useState(null);
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
      setLoading(true);
      setError(null);
      
      console.log('🔍 Fetching tutor profile:', id);
      
      const response = await api.get(`/users/${id}`);
      
      console.log('📦 Full Response:', response.data);
      
      // ✅ FIX: Handle different response structures
      let tutorData = null;
      
      if (response.data.data) {
        // Backend returns { status: 'success', data: user }
        tutorData = response.data.data;
        console.log('✅ Found in response.data.data');
      } else if (response.data.user) {
        // Alternative structure { user: ... }
        tutorData = response.data.user;
        console.log('✅ Found in response.data.user');
      } else if (response.data._id) {
        // Direct user object
        tutorData = response.data;
        console.log('✅ Found directly in response.data');
      }
      
      if (!tutorData) {
        throw new Error('Tutor data not found in response');
      }
      
      console.log('👤 Tutor Data:', tutorData);
      
      setTutor(tutorData);
    } catch (error) {
      console.error('❌ Error fetching tutor:', error);
      console.error('❌ Error response:', error.response);
      setError(error.message || 'Failed to load tutor profile');
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
      <div className="min-h-screen bg-[#0a0f0d] pt-16 sm:pt-20 md:pt-24 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-[#00ffcc]/30 border-t-[#00ffcc] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm sm:text-base text-gray-400">Loading tutor profile...</p>
        </div>
      </div>
    );
  }

  if (error || !tutor) {
    return (
      <div className="min-h-screen bg-[#0a0f0d] pt-16 sm:pt-20 md:pt-24 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-full bg-red-500/10 border-2 border-red-500/30 flex items-center justify-center">
            <span className="text-3xl sm:text-4xl">⚠️</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#ff0066] mb-3 sm:mb-4">
            {error || 'Tutor not found'}
          </h2>
          <p className="text-sm sm:text-base text-gray-400 mb-6">
            The tutor you're looking for doesn't exist or couldn't be loaded.
          </p>
          <button
            onClick={fetchTutor}
            className="px-6 py-3 bg-gradient-to-r from-[#00ffcc] to-[#00ff88] text-[#0a0f0d] rounded-lg font-semibold hover:shadow-lg hover:shadow-[#00ffcc]/30 transition-all"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f0d] pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Profile Header - Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 sm:p-6 md:p-8 rounded-2xl bg-gradient-to-br from-[#0a0f0d] via-[#0f1512] to-[#0a0f0d] border-2 border-[#00ffcc]/30 mb-6 sm:mb-8"
        >
          <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-center md:items-start">
            {/* Profile Image */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative flex-shrink-0"
            >
              <img
                src={tutor.profileImage || 'https://i.ibb.co/qpB9ZNp/default-avatar.png'}
                alt={tutor.name}
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl border-4 border-[#00ffcc]/50 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://i.ibb.co/qpB9ZNp/default-avatar.png';
                }}
              />
              {/* Rating badge */}
              <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 bg-[#0a0f0d] p-2 sm:p-3 rounded-xl border-2 border-[#00ff88]">
                <div className="flex items-center gap-1">
                  <FaStar className="text-[#00ff88] text-base sm:text-lg" />
                  <span className="text-lg sm:text-xl font-bold text-[#00ff88]">
                    {tutor.rating?.toFixed(1) || '0.0'}
                  </span>
                </div>
                <p className="text-xs text-gray-400 text-center">
                  {tutor.totalReviews || 0} reviews
                </p>
              </div>
            </motion.div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left w-full">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#00ffcc] mb-3 break-words">
                {tutor.name}
              </h1>
              
              {/* Bio */}
              {tutor.bio && (
                <p className="text-sm sm:text-base text-gray-300 mb-4 leading-relaxed">{tutor.bio}</p>
              )}

              {/* Stats Grid - Responsive */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
                {tutor.location && (
                  <div className="flex items-center gap-2 text-gray-400 justify-center md:justify-start">
                    <FaMapMarkerAlt className="text-[#00ff88] flex-shrink-0" />
                    <span className="text-xs sm:text-sm truncate">{tutor.location}</span>
                  </div>
                )}
                {tutor.experience !== undefined && tutor.experience > 0 && (
                  <div className="flex items-center gap-2 text-gray-400 justify-center md:justify-start">
                    <FaBriefcase className="text-[#00ff88] flex-shrink-0" />
                    <span className="text-xs sm:text-sm">{tutor.experience} years</span>
                  </div>
                )}
                {tutor.hourlyRate && (
                  <div className="flex items-center gap-2 text-gray-400 justify-center md:justify-start">
                    <FaDollarSign className="text-[#00ff88] flex-shrink-0" />
                    <span className="text-xs sm:text-sm">{tutor.hourlyRate} BDT/hr</span>
                  </div>
                )}
              </div>

              {/* Subjects - Responsive */}
              {tutor.subjects && tutor.subjects.length > 0 && (
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-400 mb-2">SUBJECTS</h3>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {tutor.subjects.map((subject, i) => (
                      <span
                        key={i}
                        className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#00ffcc]/20 border border-[#00ffcc]/30 rounded-lg text-[#00ffcc] text-xs sm:text-sm font-medium"
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

        {/* Education - Responsive */}
        {tutor.education && tutor.education.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-[#0a0f0d] via-[#0f1512] to-[#0a0f0d] border-2 border-[#00ffcc]/20 mb-6 sm:mb-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <FaGraduationCap className="text-xl sm:text-2xl text-[#00ffcc]" />
              <h2 className="text-xl sm:text-2xl font-bold text-[#00ffcc]">Education</h2>
            </div>
            <div className="space-y-3">
              {tutor.education.map((edu, i) => (
                <div key={i} className="p-3 sm:p-4 bg-[#0a0f0d]/50 rounded-lg border border-[#00ffcc]/10">
                  <h3 className="text-base sm:text-lg font-semibold text-white">{edu.degree}</h3>
                  <p className="text-sm sm:text-base text-gray-400">{edu.institution}</p>
                  {edu.year && <p className="text-xs sm:text-sm text-gray-500">{edu.year}</p>}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Reviews Section - Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-[#0a0f0d] via-[#0f1512] to-[#0a0f0d] border-2 border-[#00ffcc]/20"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#00ffcc]">Reviews</h2>
              <div className="px-2 sm:px-3 py-1 bg-[#00ffcc]/10 rounded-full">
                <RatingStars rating={tutor.rating || 0} size="sm" />
              </div>
            </div>

            {/* Write Review Button */}
            {isStudent && canReview && !hasReviewed && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowReviewForm(true)}
                className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-[#00ffcc] to-[#00ff88] rounded-lg text-[#0a0f0d] text-sm sm:text-base font-bold hover:shadow-lg hover:shadow-[#00ffcc]/50 transition-all"
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
                className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-[#00ffcc]/10 border-2 border-[#00ffcc] rounded-lg text-[#00ffcc] text-sm sm:text-base font-bold hover:bg-[#00ffcc]/20 transition-all"
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