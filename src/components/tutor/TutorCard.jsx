import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa';

const TutorCard = ({ tutor }) => {
  // Safe checks for data
  const tutorId = tutor._id || tutor.id;
  const tutorName = tutor.name || 'Unknown Tutor';
  const tutorImage = tutor.profileImage || 'https://i.ibb.co/qpB9ZNp/default-avatar.png';
  const tutorRating = tutor.rating !== undefined && tutor.rating !== null ? tutor.rating.toFixed(1) : '0.0';
  const totalReviews = tutor.totalReviews || 0;
  const tutorLocation = tutor.location;
  const tutorExperience = tutor.experience;
  const tutorSubjects = Array.isArray(tutor.subjects) ? tutor.subjects : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.2 }
      }}
      className="h-full"
    >
      <Link 
        to={`/tutors/${tutorId}`} 
        className="block p-6 rounded-xl bg-gradient-to-br from-[#0a0f0d] via-[#0f1512] to-[#0a0f0d] border-2 border-[#00ffcc]/30 hover:border-[#00ffcc] transition-all duration-300 shadow-lg hover:shadow-[#00ffcc]/20 group h-full flex flex-col"
      >
        {/* Profile Image & Rating */}
        <div className="text-center mb-4">
          <div className="relative inline-block mb-4">
            <motion.img 
              whileHover={{ scale: 1.05 }}
              src={tutorImage} 
              alt={tutorName}
              className="w-24 h-24 rounded-full border-4 border-[#00ffcc]/50 group-hover:border-[#00ffcc] transition-all duration-300 object-cover mx-auto"
              onError={(e) => {
                e.target.src = 'https://i.ibb.co/qpB9ZNp/default-avatar.png';
              }}
            />
            {/* Rating Badge */}
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-[#0a0f0d] px-3 py-1 rounded-full border-2 border-[#00ff88] flex items-center space-x-1"
            >
              <FaStar className="text-[#00ff88] text-xs" />
              <span className="text-sm font-bold text-[#00ff88]">
                {tutorRating}
              </span>
            </motion.div>
          </div>

          {/* Name */}
          <h3 className="text-xl font-bold text-[#00ffcc] mb-2 group-hover:text-[#00ff88] transition-colors min-h-[32px] line-clamp-1">
            {tutorName}
          </h3>

          {/* Review Count */}
          {totalReviews > 0 && (
            <p className="text-xs text-gray-400 mb-3">
              {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
            </p>
          )}

          {/* Location & Experience */}
          <div className="space-y-2 mb-4">
            {tutorLocation && (
              <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm">
                <FaMapMarkerAlt className="text-[#00ff88] flex-shrink-0" />
                <span className="truncate">{tutorLocation}</span>
              </div>
            )}
            {tutorExperience !== undefined && tutorExperience !== null && tutorExperience > 0 && (
              <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm">
                <FaBriefcase className="text-[#00ff88] flex-shrink-0" />
                <span>
                  {tutorExperience} {tutorExperience === 1 ? 'year' : 'years'} experience
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Subjects */}
        <div className="flex flex-wrap gap-2 justify-center mb-4 min-h-[64px]">
          {tutorSubjects.length > 0 ? (
            <>
              {tutorSubjects.slice(0, 3).map((subject, index) => (
                <motion.span 
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="px-3 py-1 bg-[#00ffcc]/20 border border-[#00ffcc]/30 rounded-full text-xs text-[#00ffcc] hover:bg-[#00ffcc]/30 transition-colors"
                >
                  {subject}
                </motion.span>
              ))}
              {tutorSubjects.length > 3 && (
                <span className="px-3 py-1 bg-gray-700/50 border border-gray-600 rounded-full text-xs text-gray-400">
                  +{tutorSubjects.length - 3} more
                </span>
              )}
            </>
          ) : (
            <span className="text-xs text-gray-500">No subjects listed</span>
          )}
        </div>

        {/* Spacer */}
        <div className="flex-grow"></div>

        {/* View Profile Button */}
        <div className="pt-4 border-t border-[#00ffcc]/30">
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="inline-block px-6 py-2 bg-[#00ffcc]/10 border border-[#00ffcc] rounded-lg text-[#00ffcc] font-semibold group-hover:bg-[#00ffcc] group-hover:text-[#0a0f0d] transition-all duration-300">
              View Profile
            </span>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
};

export default TutorCard;