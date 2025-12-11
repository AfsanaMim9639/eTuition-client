import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaDollarSign, FaBook, FaClock, FaCalendarAlt, FaEye } from 'react-icons/fa';

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
    if (type === 'Home Tutoring') return 'Home';
    if (type === 'Online Tutoring') return 'Online';
    if (type === 'Both') return 'Both';
    return type || 'Home';
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Recently';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  // Get student name from populated data or posted_by string
  const getPostedBy = () => {
    if (tuition.studentId?.name) return tuition.studentId.name;
    if (tuition.posted_by) return tuition.posted_by;
    return 'Student';
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
        className="card-neon card-neon-blue p-6 rounded-xl group block h-full flex flex-col"
      >
        {/* Header - Fixed height */}
        <div className="flex items-start justify-between mb-4 min-h-[80px]">
          <div className="flex-1 pr-2">
            <h3 className="text-xl font-bold bg-gradient-to-r from-[#00ff88] to-[#00ffcc] bg-clip-text text-transparent mb-2 group-hover:from-[#00ffcc] group-hover:to-[#00ff88] transition-colors line-clamp-2">
            {tuition.title}
            </h3>

            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <FaBook className="text-neon-blue flex-shrink-0" />
              <span className="truncate">{tuition.subject}</span>
              <span>•</span>
              <span className="truncate">{tuition.grade || tuition.level || tuition.class}</span>
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

        {/* Medium & Schedule - Fixed height */}
        <div className="flex items-center gap-3 text-sm text-gray-400 mb-4 min-h-[28px] flex-wrap">
          {tuition.preferred_medium && (
            <span className="px-2 py-1 bg-gray-800 rounded text-xs">
              {tuition.preferred_medium}
            </span>
          )}
          {tuition.schedule && (
            <div className="flex items-center gap-1">
              <FaClock className="text-neon-blue" />
              <span className="truncate">{tuition.schedule}</span>
            </div>
          )}
          {tuition.class_duration && (
            <span className="px-2 py-1 bg-gray-800 rounded text-xs">
              {tuition.class_duration}
            </span>
          )}
        </div>

        {/* Spacer to push bottom content down */}
        <div className="flex-grow"></div>

        {/* Salary & Days - Fixed at bottom */}
        <div className="flex items-center justify-between pt-4 border-t border-neon-blue/30 mb-4">
          <div className="flex items-center space-x-2">
            <FaDollarSign className="text-neon-green" />
            <span className="font-bold text-neon-green text-lg">
              ৳{tuition.salary}/mo
            </span>
          </div>
          {(tuition.days_per_week || tuition.daysPerWeek) && (
            <div className="flex items-center gap-1 text-sm text-gray-400">
              <FaCalendarAlt className="text-neon-blue" />
              <span>{tuition.days_per_week || tuition.daysPerWeek} days/wk</span>
            </div>
          )}
        </div>

        {/* Posted Info & Status - Fixed at bottom */}
        <div className="flex items-center justify-between pt-4 border-t border-neon-blue/30">
          <div className="text-xs text-gray-400">
            <span className="text-gray-500">Posted by: </span>
            <span className="text-gray-300 font-semibold">
              {getPostedBy()}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {/* Status Badge */}
            {tuition.status && tuition.status !== 'open' && (
              <span className={`text-xs px-2 py-1 rounded ${
                tuition.status === 'ongoing' ? 'bg-blue-500/20 text-blue-400' :
                tuition.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                'bg-gray-500/20 text-gray-400'
              }`}>
                {tuition.status}
              </span>
            )}
            {/* Views */}
            {tuition.views > 0 && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <FaEye className="text-neon-blue" />
                <span>{tuition.views}</span>
              </div>
            )}
          </div>
        </div>

        {/* Posted Date - Very bottom */}
        {tuition.postedAt && (
          <div className="text-xs text-gray-500 mt-2 text-right">
            {formatDate(tuition.postedAt)}
          </div>
        )}
      </Link>
    </motion.div>
  );
};

export default TuitionCard;