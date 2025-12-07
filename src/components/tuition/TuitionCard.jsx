import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaDollarSign, FaBook, FaClock, FaEye } from 'react-icons/fa';

const TuitionCard = ({ tuition }) => {
  return (
    <Link
      to={`/tuitions/${tuition._id}`}
      className="card-neon card-neon-pink p-6 rounded-xl group block"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold neon-text-pink mb-2 group-hover:text-neon-blue transition-colors line-clamp-2">
            {tuition.title}
          </h3>
          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            <FaBook className="text-neon-blue flex-shrink-0" />
            <span>{tuition.subject}</span>
            <span>•</span>
            <span>{tuition.class}</span>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2 ${
          tuition.category === 'Online' 
            ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30' 
            : tuition.category === 'Offline'
            ? 'bg-neon-pink/20 text-neon-pink border border-neon-pink/30'
            : 'bg-neon-green/20 text-neon-green border border-neon-green/30'
        }`}>
          {tuition.category}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
        {tuition.description}
      </p>

      {/* Location */}
      <div className="flex items-center space-x-2 text-gray-400 mb-4">
        <FaMapMarkerAlt className="text-neon-green flex-shrink-0" />
        <span className="truncate">{tuition.location}</span>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center space-x-2 text-sm">
          <FaClock className="text-neon-blue flex-shrink-0" />
          <span className="text-gray-400">{tuition.daysPerWeek} days/week</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-gray-400">{tuition.duration}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <FaEye className="text-neon-purple flex-shrink-0" />
          <span className="text-gray-400">{tuition.viewCount || 0} views</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-gray-400">{tuition.applicationCount || 0} applications</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-neon-pink/30">
        <div className="flex items-center space-x-2">
          <FaDollarSign className="text-neon-green" />
          <span className="font-bold text-neon-green text-lg">{tuition.salary} BDT/month</span>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          tuition.status === 'approved' 
            ? 'bg-neon-green/20 text-neon-green border border-neon-green/30'
            : tuition.status === 'pending'
            ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30'
            : 'bg-red-500/20 text-red-500 border border-red-500/30'
        }`}>
          {tuition.status}
        </span>
      </div>

      {/* Posted By */}
      <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-neon-pink/30">
        <img 
          src={tuition.postedBy?.profileImage || 'https://i.ibb.co/qpB9ZNp/default-avatar.png'} 
          alt={tuition.postedBy?.name}
          className="w-8 h-8 rounded-full neon-border-blue"
        />
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-400">Posted by</p>
          <p className="text-sm font-semibold truncate">{tuition.postedBy?.name}</p>
        </div>
      </div>
    </Link>
  );
};

export default TuitionCard;