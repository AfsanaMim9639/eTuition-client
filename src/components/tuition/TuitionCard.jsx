import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaDollarSign, FaBook } from 'react-icons/fa';

const TuitionCard = ({ tuition }) => (
  <Link to={`/tuitions/${tuition._id}`} className="card-neon card-neon-pink p-6 rounded-xl group block">
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
        tuition.category === 'Online' ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30' : 
        tuition.category === 'Offline' ? 'bg-neon-pink/20 text-neon-pink border border-neon-pink/30' :
        'bg-neon-green/20 text-neon-green border border-neon-green/30'
      }`}>
        {tuition.category}
      </span>
    </div>

    <div className="flex items-center space-x-2 text-gray-400 mb-4">
      <FaMapMarkerAlt className="text-neon-green flex-shrink-0" />
      <span className="truncate">{tuition.location}</span>
    </div>

    <div className="flex items-center justify-between pt-4 border-t border-neon-pink/30">
      <div className="flex items-center space-x-2">
        <FaDollarSign className="text-neon-green" />
        <span className="font-bold text-neon-green text-lg">{tuition.salary} BDT/month</span>
      </div>
      <span className="text-sm text-gray-400">{tuition.daysPerWeek} days/week</span>
    </div>

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

export default TuitionCard;