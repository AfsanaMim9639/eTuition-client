import { Link } from 'react-router-dom';
import { FaStar, FaGraduationCap, FaDollarSign } from 'react-icons/fa';

const TutorCard = ({ tutor }) => (
  <Link to={`/tutors/${tutor._id}`} className="card-neon card-neon-blue p-6 rounded-xl text-center group">
    <div className="relative inline-block mb-4">
      <img 
        src={tutor.profileImage || 'https://i.ibb.co/qpB9ZNp/default-avatar.png'} 
        alt={tutor.name}
        className="w-24 h-24 rounded-full neon-border-blue mx-auto group-hover:scale-110 transition-transform duration-300"
      />
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-dark-bg px-3 py-1 rounded-full border-2 border-neon-green flex items-center space-x-1">
        <FaStar className="text-neon-green text-xs" />
        <span className="text-sm font-bold text-neon-green">{tutor.rating || 5.0}</span>
      </div>
    </div>

    <h3 className="text-xl font-bold neon-text-blue mb-2 group-hover:text-neon-pink transition-colors">
      {tutor.name}
    </h3>

    <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm mb-4">
      <FaGraduationCap className="text-neon-pink" />
      <span className="truncate">{tutor.education}</span>
    </div>

    <div className="flex flex-wrap gap-2 justify-center mb-4">
      {tutor.subjects?.slice(0, 3).map((subject, index) => (
        <span key={index} className="px-3 py-1 bg-neon-blue/20 border border-neon-blue/30 rounded-full text-xs text-neon-blue">
          {subject}
        </span>
      ))}
    </div>

    <div className="pt-4 border-t border-neon-blue/30">
      <div className="flex items-center justify-center space-x-2">
        <FaDollarSign className="text-neon-green" />
        <span className="font-bold text-neon-green">{tutor.hourlyRate || 500} BDT/hour</span>
      </div>
    </div>
  </Link>
);

export default TutorCard;
