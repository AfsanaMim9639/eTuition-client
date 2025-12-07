import { FaMapMarkerAlt, FaDollarSign, FaBook, FaClock } from 'react-icons/fa';

const TuitionDetails = ({ tuition }) => (
  <div className="card-neon card-neon-pink p-8 rounded-xl">
    <h2 className="text-3xl font-bold neon-text-pink mb-4">{tuition.title}</h2>
    
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
      <div className="flex items-center gap-2 text-gray-400">
        <FaBook className="text-neon-blue" />
        <span>{tuition.subject}</span>
      </div>
      <div className="flex items-center gap-2 text-gray-400">
        <FaMapMarkerAlt className="text-neon-green" />
        <span>{tuition.location}</span>
      </div>
      <div className="flex items-center gap-2 text-gray-400">
        <FaClock className="text-neon-purple" />
        <span>{tuition.daysPerWeek} days/week</span>
      </div>
    </div>

    <div className="flex items-center gap-3 mb-6">
      <FaDollarSign className="text-neon-green text-2xl" />
      <span className="text-3xl font-bold text-neon-green">{tuition.salary} BDT/month</span>
    </div>

    <div className="mb-6">
      <h3 className="text-xl font-bold neon-text-blue mb-3">Description</h3>
      <p className="text-gray-400 leading-relaxed">{tuition.description}</p>
    </div>

    {tuition.requirements && (
      <div>
        <h3 className="text-xl font-bold neon-text-green mb-3">Requirements</h3>
        <p className="text-gray-400 leading-relaxed">{tuition.requirements}</p>
      </div>
    )}
  </div>
);

export default TuitionDetails;
