import { FaStar, FaGraduationCap, FaDollarSign } from 'react-icons/fa';

const TutorProfile = ({ tutor }) => (
  <div className="card-neon card-neon-pink p-8 rounded-xl">
    <div className="flex flex-col md:flex-row gap-6 items-start">
      <img 
        src={tutor.profileImage || 'https://i.ibb.co/qpB9ZNp/default-avatar.png'} 
        alt={tutor.name}
        className="w-32 h-32 rounded-full neon-border-pink"
      />
      <div className="flex-1">
        <h1 className="text-4xl font-bold neon-text-pink mb-2">{tutor.name}</h1>
        <p className="text-xl text-gray-400 mb-4">{tutor.education}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tutor.subjects?.map((subject, i) => (
            <span key={i} className="px-3 py-1 bg-neon-blue/20 border border-neon-blue/30 rounded text-neon-blue">
              {subject}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-400">Experience:</span>
            <span className="text-white font-semibold ml-2">{tutor.experience || 'N/A'}</span>
          </div>
          <div>
            <span className="text-gray-400">Rating:</span>
            <span className="text-neon-green font-semibold ml-2">{tutor.rating || 5.0} ⭐</span>
          </div>
          <div>
            <span className="text-gray-400">Hourly Rate:</span>
            <span className="text-neon-green font-semibold ml-2">{tutor.hourlyRate || 500} BDT</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default TutorProfile;