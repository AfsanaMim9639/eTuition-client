import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaDollarSign, FaBook, FaClock, FaCalendarAlt } from 'react-icons/fa';

const TuitionCard = ({ tuition }) => {
  // Helper function to get category badge color
  const getCategoryStyle = () => {
    const type = tuition.tutoring_type || tuition.category;
    if (type === 'Online Tutoring' || type === 'Online') {
      return 'bg-neon-blue/20 text-neon-blue border-neon-blue/30';
    }
    if (type === 'Home Tutoring' || type === 'Offline') {
      return 'bg-neon-pink/20 text-neon-pink border-neon-pink/30';
    }
    return 'bg-neon-green/20 text-neon-green border-neon-green/30';
  };

  // Helper function to display category text
  const getCategoryText = () => {
    const type = tuition.tutoring_type || tuition.category;
    if (type === 'Home Tutoring') return 'Offline';
    if (type === 'Online Tutoring') return 'Online';
    return type || 'Both';
  };

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
        to={`/tuitions/${tuition._id}`} 
        className="card-neon card-neon-pink p-6 rounded-xl group block h-full flex flex-col"
      >
        {/* Header - Fixed height */}
        <div className="flex items-start justify-between mb-4 min-h-[80px]">
          <div className="flex-1 pr-2">
            <h3 className="text-xl font-bold neon-text-pink mb-2 group-hover:text-neon-blue transition-colors line-clamp-2">
              {tuition.title}
            </h3>
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <FaBook className="text-neon-blue flex-shrink-0" />
              <span className="truncate">{tuition.subject}</span>
              <span>•</span>
              <span className="truncate">{tuition.level || tuition.class}</span>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2 border ${getCategoryStyle()} flex-shrink-0`}>
            {getCategoryText()}
          </span>
        </div>

        {/* Location - Fixed height */}
        <div className="flex items-center space-x-2 text-gray-400 mb-3 min-h-[24px]">
          <FaMapMarkerAlt className="text-neon-green flex-shrink-0" />
          <span className="truncate">{tuition.location}</span>
        </div>

        {/* Medium & Duration - Fixed height */}
        <div className="flex items-center gap-3 text-sm text-gray-400 mb-4 min-h-[28px] flex-wrap">
          {tuition.preferred_medium && (
            <span className="px-2 py-1 bg-gray-800 rounded text-xs">
              {tuition.preferred_medium}
            </span>
          )}
          {tuition.class_duration && (
            <div className="flex items-center gap-1">
              <FaClock className="text-neon-blue" />
              <span>{tuition.class_duration}</span>
            </div>
          )}
        </div>

        {/* Spacer to push bottom content down */}
        <div className="flex-grow"></div>

        {/* Salary & Days - Fixed at bottom */}
        <div className="flex items-center justify-between pt-4 border-t border-neon-pink/30 mb-4">
          <div className="flex items-center space-x-2">
            <FaDollarSign className="text-neon-green" />
            <span className="font-bold text-neon-green text-lg">
              {tuition.salary} BDT/mo
            </span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-400">
            <FaCalendarAlt className="text-neon-blue" />
            <span>{tuition.days_per_week || tuition.daysPerWeek}d/wk</span>
          </div>
        </div>

        {/* Posted Info - Fixed at bottom */}
        <div className="flex items-center justify-between pt-4 border-t border-neon-pink/30">
          <div className="text-xs text-gray-400">
            <span>Posted by: </span>
            <span className="text-gray-300 font-semibold">
              {tuition.posted_by || 'Parent'}
            </span>
          </div>
          {tuition.views > 0 && (
            <span className="text-xs text-gray-500">
              👁️ {tuition.views} views
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default TuitionCard;