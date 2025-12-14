import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaStar, 
  FaGraduationCap, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope,
  FaBook,
  FaBriefcase,
  FaCheckCircle,
  FaArrowLeft,
  FaDollarSign,
  FaCalendar,
  FaExclamationTriangle
} from 'react-icons/fa';
import api, { isAuthenticated } from '../../utils/api';
import { reviewAPI } from '../../utils/api';
import Loading from '../../components/shared/Loading';
import ReviewList from '../../components/review/ReviewList';
import ReviewForm from '../../components/review/ReviewForm';
import RatingStars from '../../components/review/RatingStars';

const TutorProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [canReview, setCanReview] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [existingReview, setExistingReview] = useState(null);
  const [reviewToEdit, setReviewToEdit] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  const isStudent = currentUser?.role === 'student';

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    
    fetchTutorProfile();
    if (isStudent) {
      checkCanReview();
    }
  }, [id, retryCount]);

  const fetchTutorProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔍 Fetching tutor profile:', id);
      
      const response = await api.get(`/users/${id}`);
      console.log('📦 API Response:', response.data);
      
      // Handle different response structures
      const tutorData = response.data.data || response.data.user || response.data;
      
      if (!tutorData) {
        throw new Error('Tutor data not found');
      }
      
      if (tutorData.role !== 'tutor') {
        throw new Error('This user is not a tutor');
      }
      
      setTutor(tutorData);
      console.log('✅ Tutor profile loaded:', tutorData.name);
    } catch (error) {
      console.error('❌ Error fetching tutor:', error);
      
      // Handle different error types
      if (error.message.includes('timeout')) {
        setError('Request timeout. The server is taking too long to respond.');
      } else if (error.message.includes('Network error')) {
        setError('Network error. Please check your internet connection.');
      } else if (error.response?.status === 401) {
        setError('Session expired. Redirecting to login...');
        setTimeout(() => {
          localStorage.clear();
          navigate('/login');
        }, 2000);
      } else if (error.response?.status === 404) {
        setError('Tutor not found. This profile may have been removed.');
      } else if (error.response?.status === 500) {
        setError('Server error. Please try again later.');
      } else if (error.response?.status === 503) {
        setError('Service temporarily unavailable. Please try again later.');
      } else {
        setError(error.response?.data?.message || error.message || 'Failed to load tutor profile');
      }
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
      // Don't show error for review check failure
    }
  };

  const handleReviewSuccess = () => {
    setShowReviewForm(false);
    setReviewToEdit(null);
    fetchTutorProfile();
    if (isStudent) {
      checkCanReview();
    }
  };

  const handleEditReview = (review) => {
    setReviewToEdit(review);
    setShowReviewForm(true);
  };

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  if (loading) return <Loading />;
  
  if (error || !tutor) {
    return (
      <div className="min-h-screen bg-[#0a0f0d] pt-24 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/10 border-2 border-red-500/30 mb-6">
            <FaExclamationTriangle className="text-4xl text-red-400" />
          </div>
          <h2 className="text-3xl font-bold text-red-400 mb-4">
            {error || 'Tutor Not Found'}
          </h2>
          <p className="text-gray-400 mb-6">
            {error?.includes('timeout') && 'The server is not responding. This might be a temporary issue.'}
            {error?.includes('Network') && 'Please check your internet connection and try again.'}
            {error?.includes('Session expired') && 'Your session has expired. You will be redirected to login.'}
            {error?.includes('Server error') && 'There seems to be an issue with the server. Please try again in a few moments.'}
            {!error?.includes('timeout') && !error?.includes('Network') && !error?.includes('Session') && !error?.includes('Server') && 
              'Unable to load the tutor profile. Please try again.'}
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleRetry}
              className="px-6 py-3 bg-gradient-to-r from-[#00ffcc] to-[#00ff88] text-[#0a0f0d] rounded-lg font-semibold hover:shadow-lg hover:shadow-[#00ffcc]/30 transition-all"
            >
              Try Again
            </button>
            <Link 
              to="/tutors" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all"
            >
              <FaArrowLeft />
              Back to Tutors
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f0d] pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Back Button */}
        <Link 
          to="/tutors"
          className="inline-flex items-center gap-2 text-[#00ffcc] hover:text-[#00ff88] mb-6 transition-colors"
        >
          <FaArrowLeft />
          <span>Back to Tutors</span>
        </Link>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#0a0f0d] via-[#0f1512] to-[#0a0f0d] border-2 border-[#00ffcc]/30 p-8 rounded-2xl mb-8 shadow-lg shadow-[#00ffcc]/10"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Profile Image */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <img
                src={tutor.profileImage || 'https://i.ibb.co/qpB9ZNp/default-avatar.png'}
                alt={tutor.name}
                className="w-48 h-48 rounded-full border-4 border-[#00ffcc] shadow-lg shadow-[#00ffcc]/30 object-cover"
              />
              {/* Rating Badge */}
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-[#0a0f0d] px-4 py-2 rounded-full border-2 border-[#00ff88] flex items-center gap-2">
                <FaStar className="text-[#00ff88]" />
                <span className="text-lg font-bold text-[#00ff88]">
                  {tutor.rating?.toFixed(1) || '0.0'}
                </span>
              </div>
            </motion.div>

            {/* Basic Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00ffcc] to-[#00ff88] bg-clip-text text-transparent mb-4">
                {tutor.name}
              </h1>
              
              <div className="space-y-3 text-gray-300">
                {/* Education - First entry from array */}
                {tutor.education && Array.isArray(tutor.education) && tutor.education.length > 0 && (
                  <div className="flex items-center gap-3 justify-center md:justify-start">
                    <FaGraduationCap className="text-[#00ffcc] text-xl flex-shrink-0" />
                    <div>
                      <span className="text-lg">{tutor.education[0].degree}</span>
                      {tutor.education[0].institution && (
                        <span className="text-sm text-gray-400 ml-2">
                          - {tutor.education[0].institution}
                        </span>
                      )}
                    </div>
                  </div>
                )}
                
                {tutor.location && (
                  <div className="flex items-center gap-3 justify-center md:justify-start">
                    <FaMapMarkerAlt className="text-[#00ff88] text-xl flex-shrink-0" />
                    <span>{tutor.location}</span>
                  </div>
                )}

                {tutor.experience !== undefined && tutor.experience !== null && tutor.experience > 0 && (
                  <div className="flex items-center gap-3 justify-center md:justify-start">
                    <FaBriefcase className="text-[#00ffcc] text-xl flex-shrink-0" />
                    <span>{tutor.experience} {tutor.experience === 1 ? 'year' : 'years'} of experience</span>
                  </div>
                )}

                {tutor.hourlyRate && tutor.hourlyRate > 0 && (
                  <div className="flex items-center gap-3 justify-center md:justify-start">
                    <FaDollarSign className="text-[#00ff88] text-xl flex-shrink-0" />
                    <span className="font-semibold">{tutor.hourlyRate} BDT/hour</span>
                  </div>
                )}
                
                {tutor.phone && (
                  <div className="flex items-center gap-3 justify-center md:justify-start">
                    <FaPhone className="text-[#00ffcc] text-xl flex-shrink-0" />
                    <span>{tutor.phone}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <FaEnvelope className="text-[#00ff88] text-xl flex-shrink-0" />
                  <span className="break-all">{tutor.email}</span>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
                <a
                  href={`mailto:${tutor.email}`}
                  className="px-8 py-3 bg-gradient-to-r from-[#00ffcc] to-[#00ff88] text-[#0a0f0d] rounded-lg font-bold hover:shadow-lg hover:shadow-[#00ffcc]/30 transition-all inline-block"
                >
                  Contact via Email
                </a>
                {tutor.phone && (
                  <a
                    href={`tel:${tutor.phone}`}
                    className="px-8 py-3 bg-[#0a0f0d] border-2 border-[#00ffcc] text-[#00ffcc] rounded-lg font-bold hover:bg-[#00ffcc]/10 transition-all inline-block"
                  >
                    Call Now
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-8">
            {/* Bio Section */}
            {tutor.bio && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-[#0a0f0d] via-[#0f1512] to-[#0a0f0d] border-2 border-[#00ffcc]/30 p-6 rounded-2xl shadow-lg shadow-[#00ffcc]/10"
              >
                <h2 className="text-2xl font-bold text-[#00ffcc] mb-4 flex items-center gap-2">
                  <FaCheckCircle className="text-xl" />
                  About Me
                </h2>
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{tutor.bio}</p>
              </motion.div>
            )}

            {/* Subjects Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-gradient-to-br from-[#0a0f0d] via-[#0f1512] to-[#0a0f0d] border-2 border-[#00ffcc]/30 p-6 rounded-2xl shadow-lg shadow-[#00ffcc]/10"
            >
              <h2 className="text-2xl font-bold text-[#00ffcc] mb-4 flex items-center gap-2">
                <FaBook className="text-xl" />
                Subjects I Teach
              </h2>
              <div className="flex flex-wrap gap-3">
                {tutor.subjects && Array.isArray(tutor.subjects) && tutor.subjects.length > 0 ? (
                  tutor.subjects.map((subject, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-[#00ffcc]/20 border-2 border-[#00ffcc]/50 rounded-lg text-[#00ffcc] font-semibold hover:bg-[#00ffcc]/30 transition-colors"
                    >
                      {subject}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-400">No subjects listed</p>
                )}
              </div>
            </motion.div>

            {/* Education Section */}
            {tutor.education && Array.isArray(tutor.education) && tutor.education.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-[#0a0f0d] via-[#0f1512] to-[#0a0f0d] border-2 border-[#00ff88]/30 p-6 rounded-2xl shadow-lg shadow-[#00ff88]/10"
              >
                <h2 className="text-2xl font-bold text-[#00ff88] mb-4 flex items-center gap-2">
                  <FaGraduationCap className="text-xl" />
                  Education & Qualifications
                </h2>
                <div className="space-y-4">
                  {tutor.education.map((edu, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-[#00ff88]/10 rounded-lg border border-[#00ff88]/20">
                      <FaGraduationCap className="text-[#00ff88] text-xl mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#00ff88] text-lg mb-1">
                          {edu.degree || 'Degree'}
                        </h3>
                        {edu.institution && (
                          <p className="text-gray-300 mb-1">{edu.institution}</p>
                        )}
                        {edu.year && (
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <FaCalendar className="text-xs" />
                            <span>{edu.year}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {/* Teaching Experience */}
                  {tutor.experience !== undefined && tutor.experience !== null && tutor.experience > 0 && (
                    <div className="flex items-start gap-3 p-4 bg-[#00ff88]/10 rounded-lg border border-[#00ff88]/20">
                      <FaBriefcase className="text-[#00ff88] text-xl mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-[#00ff88] mb-1">Teaching Experience</h3>
                        <p className="text-gray-300 text-lg">
                          {tutor.experience} {tutor.experience === 1 ? 'year' : 'years'} of professional teaching
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column - Info Cards */}
          <div className="space-y-6">
            {/* Account Status */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-[#0a0f0d] via-[#0f1512] to-[#0a0f0d] border-2 border-[#00ff88]/30 p-6 rounded-2xl shadow-lg shadow-[#00ff88]/10"
            >
              <h3 className="text-xl font-bold text-[#00ff88] mb-4">Status</h3>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-[#00ff88] text-2xl" />
                <span className="text-lg font-semibold text-[#00ff88]">
                  {tutor.active && tutor.status === 'active' ? 'Active & Available' : 'Currently Unavailable'}
                </span>
              </div>
              {tutor.active && tutor.status === 'active' && (
                <p className="text-sm text-gray-400 mt-3">
                  Available for new students
                </p>
              )}
            </motion.div>

            {/* Rating Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-gradient-to-br from-[#0a0f0d] via-[#0f1512] to-[#0a0f0d] border-2 border-[#00ffcc]/30 p-6 rounded-2xl shadow-lg shadow-[#00ffcc]/10"
            >
              <h3 className="text-xl font-bold text-[#00ffcc] mb-4">Rating</h3>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <FaStar className="text-[#00ff88] text-3xl" />
                  <span className="text-4xl font-bold text-[#00ff88]">
                    {tutor.rating?.toFixed(1) || '0.0'}
                  </span>
                </div>
                <p className="text-sm text-gray-400">out of 5.0</p>
                {tutor.totalReviews > 0 && (
                  <p className="text-xs text-gray-500 mt-1">
                    Based on {tutor.totalReviews} {tutor.totalReviews === 1 ? 'review' : 'reviews'}
                  </p>
                )}
              </div>
            </motion.div>

            {/* Earnings Card */}
            {tutor.totalEarnings > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-[#0a0f0d] via-[#0f1512] to-[#0a0f0d] border-2 border-[#00ff88]/30 p-6 rounded-2xl shadow-lg shadow-[#00ff88]/10"
              >
                <h3 className="text-xl font-bold text-[#00ff88] mb-4">Total Earnings</h3>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <FaDollarSign className="text-[#00ffcc] text-2xl" />
                    <span className="text-3xl font-bold text-[#00ffcc]">
                      {tutor.totalEarnings.toLocaleString()} BDT
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">Total lifetime earnings</p>
                </div>
              </motion.div>
            )}

            {/* Contact Info Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-gradient-to-br from-[#0a0f0d] via-[#0f1512] to-[#0a0f0d] border-2 border-[#00ffcc]/30 p-6 rounded-2xl shadow-lg shadow-[#00ffcc]/10"
            >
              <h3 className="text-xl font-bold text-[#00ffcc] mb-4">Contact Information</h3>
              <div className="space-y-3 text-sm">
                <a 
                  href={`mailto:${tutor.email}`}
                  className="flex items-center gap-2 text-gray-300 hover:text-[#00ffcc] transition-colors break-all"
                >
                  <FaEnvelope className="text-[#00ff88] flex-shrink-0" />
                  <span className="truncate">{tutor.email}</span>
                </a>
                {tutor.phone && (
                  <a 
                    href={`tel:${tutor.phone}`}
                    className="flex items-center gap-2 text-gray-300 hover:text-[#00ffcc] transition-colors"
                  >
                    <FaPhone className="text-[#00ff88] flex-shrink-0" />
                    <span>{tutor.phone}</span>
                  </a>
                )}
                {tutor.location && (
                  <div className="flex items-center gap-2 text-gray-300">
                    <FaMapMarkerAlt className="text-[#00ff88] flex-shrink-0" />
                    <span>{tutor.location}</span>
                  </div>
                )}
                {tutor.address && (
                  <div className="flex items-start gap-2 text-gray-300">
                    <FaMapMarkerAlt className="text-[#00ff88] mt-1 flex-shrink-0" />
                    <span className="text-xs leading-relaxed">{tutor.address}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-[#0a0f0d] via-[#0f1512] to-[#0a0f0d] border-2 border-[#00ffcc]/20 shadow-lg shadow-[#00ffcc]/10"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-[#00ffcc]">Student Reviews</h2>
              <div className="px-3 py-1 bg-[#00ffcc]/10 rounded-full">
                <RatingStars rating={tutor.rating || 0} size="sm" />
              </div>
            </div>

            {/* Write Review Button */}
            {isStudent && (
              <>
                {!hasReviewed ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowReviewForm(true)}
                    className="px-6 py-3 bg-gradient-to-r from-[#00ffcc] to-[#00ff88] rounded-lg text-[#0a0f0d] font-bold hover:shadow-lg hover:shadow-[#00ffcc]/50 transition-all"
                  >
                    Write a Review
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleEditReview(existingReview)}
                    className="px-6 py-3 bg-[#00ffcc]/10 border-2 border-[#00ffcc] rounded-lg text-[#00ffcc] font-bold hover:bg-[#00ffcc]/20 transition-all"
                  >
                    Edit Your Review
                  </motion.button>
                )}
              </>
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