import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaMapMarkerAlt, FaDollarSign, FaBook, FaClock, FaUser, FaCalendar } from 'react-icons/fa';
import api from '../../utils/api';
import useAuth from '../../hooks/useAuth';
import ApplyModal from '../../components/tuition/ApplyModal';

const TuitionDetailsPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [tuition, setTuition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showApplyModal, setShowApplyModal] = useState(false);

  useEffect(() => {
    fetchTuitionDetails();
  }, [id]);

  const fetchTuitionDetails = async () => {
    try {
      const response = await api.get(`/tuitions/${id}`);
      setTuition(response.data.tuition);
    } catch (error) {
      console.error('Error fetching tuition:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg pt-24 flex items-center justify-center">
        <div className="spinner-neon w-12 h-12"></div>
      </div>
    );
  }

  if (!tuition) {
    return (
      <div className="min-h-screen bg-dark-bg pt-24 flex items-center justify-center">
        <h2 className="text-2xl neon-text-pink">Tuition not found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header Card */}
        <div className="card-neon card-neon-pink p-8 rounded-xl mb-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-start gap-4 mb-4">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  tuition.category === 'Online' ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30' :
                  tuition.category === 'Offline' ? 'bg-neon-pink/20 text-neon-pink border border-neon-pink/30' :
                  'bg-neon-green/20 text-neon-green border border-neon-green/30'
                }`}>
                  {tuition.category}
                </span>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  tuition.status === 'approved' ? 'bg-neon-green/20 text-neon-green border border-neon-green/30' :
                  tuition.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30' :
                  'bg-neon-blue/20 text-neon-blue border border-neon-blue/30'
                }`}>
                  {tuition.status}
                </span>
              </div>

              <h1 className="text-4xl font-bold neon-text-pink mb-4">{tuition.title}</h1>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-400 mb-6">
                <div className="flex items-center gap-2">
                  <FaBook className="text-neon-blue" />
                  <span>{tuition.subject}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaUser className="text-neon-green" />
                  <span>{tuition.class}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-neon-purple" />
                  <span>{tuition.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="text-neon-pink" />
                  <span>{tuition.daysPerWeek} days/week</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCalendar className="text-neon-blue" />
                  <span>{tuition.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Medium: {tuition.medium}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <FaDollarSign className="text-neon-green text-2xl" />
                <span className="text-3xl font-bold text-neon-green">{tuition.salary} BDT/month</span>
              </div>
            </div>

            {/* Apply Button */}
            {user?.role === 'tutor' && tuition.status === 'approved' && (
              <button
                onClick={() => setShowApplyModal(true)}
                className="btn btn-neon-blue px-8 py-4 rounded-lg font-semibold text-lg whitespace-nowrap"
              >
                Apply Now
              </button>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="card-neon card-neon-blue p-8 rounded-xl mb-6">
          <h2 className="text-2xl font-bold neon-text-blue mb-4">Description</h2>
          <p className="text-gray-400 leading-relaxed">{tuition.description}</p>
        </div>

        {/* Requirements */}
        {tuition.requirements && (
          <div className="card-neon card-neon-green p-8 rounded-xl mb-6">
            <h2 className="text-2xl font-bold neon-text-green mb-4">Requirements</h2>
            <p className="text-gray-400 leading-relaxed">{tuition.requirements}</p>
          </div>
        )}

        {/* Additional Details */}
        <div className="card-neon card-neon-pink p-8 rounded-xl mb-6">
          <h2 className="text-2xl font-bold neon-text-pink mb-4">Additional Details</h2>
          <div className="grid md:grid-cols-2 gap-4 text-gray-400">
            <div>
              <span className="font-semibold text-white">Student Gender:</span> {tuition.studentGender || 'Any'}
            </div>
            <div>
              <span className="font-semibold text-white">Preferred Tutor Gender:</span> {tuition.preferredTutorGender || 'Any'}
            </div>
            <div>
              <span className="font-semibold text-white">Applications:</span> {tuition.applicationCount || 0}
            </div>
            <div>
              <span className="font-semibold text-white">Views:</span> {tuition.viewCount || 0}
            </div>
          </div>
        </div>

        {/* Posted By */}
        <div className="card-neon card-neon-blue p-8 rounded-xl">
          <h2 className="text-2xl font-bold neon-text-blue mb-4">Posted By</h2>
          <div className="flex items-center gap-4">
            <img
              src={tuition.postedBy?.profileImage || 'https://i.ibb.co/qpB9ZNp/default-avatar.png'}
              alt={tuition.postedBy?.name}
              className="w-16 h-16 rounded-full neon-border-pink"
            />
            <div>
              <h3 className="text-xl font-bold">{tuition.postedBy?.name}</h3>
              <p className="text-gray-400">{tuition.postedBy?.email}</p>
              <p className="text-sm text-neon-green">{tuition.postedBy?.phone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      <ApplyModal
        isOpen={showApplyModal}
        onClose={() => setShowApplyModal(false)}
        tuition={tuition}
      />
    </div>
  );
};

export default TuitionDetailsPage;