import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa';

const TutorCard = ({ tutor }) => (
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
      to={`/tutors/${tutor._id}`} 
      className="block p-6 rounded-xl bg-gradient-to-br from-[#0a0f0d] via-[#0f1512] to-[#0a0f0d] border-2 border-[#00ffcc]/30 hover:border-[#00ffcc] transition-all duration-300 shadow-lg hover:shadow-[#00ffcc]/20 group h-full flex flex-col"
    >
      {/* Profile Image & Rating */}
      <div className="text-center mb-4">
        <div className="relative inline-block mb-4">
          <img 
            src={tutor.profileImage || 'https://i.ibb.co/qpB9ZNp/default-avatar.png'} 
            alt={tutor.name}
            className="w-24 h-24 rounded-full border-4 border-[#00ffcc]/50 group-hover:border-[#00ffcc] transition-all duration-300 object-cover mx-auto"
          />
          {/* Rating Badge */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-[#0a0f0d] px-3 py-1 rounded-full border-2 border-[#00ff88] flex items-center space-x-1">
            <FaStar className="text-[#00ff88] text-xs" />
            <span className="text-sm font-bold text-[#00ff88]">{tutor.rating?.toFixed(1) || '5.0'}</span>
          </div>
        </div>

        {/* Name */}
        <h3 className="text-xl font-bold text-[#00ffcc] mb-2 group-hover:text-[#00ff88] transition-colors min-h-[32px] line-clamp-1">
          {tutor.name}
        </h3>

        {/* Location & Experience */}
        <div className="space-y-2 mb-4">
          {tutor.location && (
            <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm">
              <FaMapMarkerAlt className="text-[#00ff88] flex-shrink-0" />
              <span>{tutor.location}</span>
            </div>
          )}
          {tutor.experience && (
            <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm">
              <FaBriefcase className="text-[#00ff88] flex-shrink-0" />
              <span>{tutor.experience} {tutor.experience === 1 ? 'year' : 'years'} experience</span>
            </div>
          )}
        </div>
      </div>

      {/* Subjects */}
      <div className="flex flex-wrap gap-2 justify-center mb-4 min-h-[64px]">
        {tutor.subjects?.slice(0, 3).map((subject, index) => (
          <span 
            key={index} 
            className="px-3 py-1 bg-[#00ffcc]/20 border border-[#00ffcc]/30 rounded-full text-xs text-[#00ffcc]"
          >
            {subject}
          </span>
        ))}
        {tutor.subjects?.length > 3 && (
          <span className="px-3 py-1 bg-gray-700/50 border border-gray-600 rounded-full text-xs text-gray-400">
            +{tutor.subjects.length - 3} more
          </span>
        )}
      </div>

      {/* Spacer */}
      <div className="flex-grow"></div>

      {/* View Profile Button */}
      <div className="pt-4 border-t border-[#00ffcc]/30">
        <div className="text-center">
          <span className="inline-block px-6 py-2 bg-[#00ffcc]/10 border border-[#00ffcc] rounded-lg text-[#00ffcc] font-semibold group-hover:bg-[#00ffcc] group-hover:text-[#0a0f0d] transition-all duration-300">
            View Profile
          </span>
        </div>
      </div>
    </Link>
  </motion.div>
);

export default TutorCard;