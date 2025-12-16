import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaMapMarkerAlt, FaDollarSign, FaBook, FaClock, FaUser, FaCalendar, FaCheckCircle } from 'react-icons/fa';
import api from '../../utils/api';
import useAuth from '../../hooks/useAuth';
import ApplyModal from '../../components/tuition/ApplyModal';
import toast from 'react-hot-toast';

const TuitionDetailsPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [tuition, setTuition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [checkingApplication, setCheckingApplication] = useState(false);

  useEffect(() => {
    fetchTuitionDetails();
  }, [id]);

  useEffect(() => {
    // Check if tutor already applied
    if (user?.role === 'tutor' && tuition) {
      checkIfApplied();
    }
  }, [user, tuition]);

  const fetchTuitionDetails = async () => {
    try {
      const response = await api.get(`/tuitions/${id}`);
      // Backend returns { status: 'success', data: tuition }
      setTuition(response.data.data || response.data.tuition);
    } catch (error) {
      console.error('Error fetching tuition:', error);
      toast.error('Failed to load tuition details');
    } finally {
      setLoading(false);
    }
  };

  const checkIfApplied = async () => {
    try {
      setCheckingApplication(true);
      const response = await api.get(`/applications/check/${id}`);
      setAlreadyApplied(response.data.alreadyApplied);
    } catch (error) {
      console.error('Error checking application:', error);
    } finally {
      setCheckingApplication(false);
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

  // Check if Apply button should be shown
  const showApplyButton = 
    user?.role === 'tutor' && 
    tuition.approvalStatus === 'approved' &&
    tuition.status === 'open';

  return (
    <div className="min-h-screen bg-dark-bg pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header Card */}
        <div className="card-neon card-neon-pink p-8 rounded-xl mb-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-start gap-4 mb-4">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  tuition.tutoring_type === 'Online Tutoring' ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30' :
                  tuition.tutoring_type === 'Home Tutoring' ? 'bg-neon-pink/20 text-neon-pink border border-neon-pink/30' :
                  'bg-neon-green/20 text-neon-green border border-neon-green/30'
                }`}>
                  {tuition.tutoring_type}
                </span>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  tuition.approvalStatus === 'approved' ? 'bg-neon-green/20 text-neon-green border border-neon-green/30' :
                  tuition.approvalStatus === 'pending' ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30' :
                  'bg-red-500/20 text-red-500 border border-red-500/30'
                }`}>
                  {tuition.approvalStatus}
                </span>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  tuition.status === 'open' ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30' :
                  'bg-gray-500/20 text-gray-500 border border-gray-500/30'
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
                  <span>{tuition.grade}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-neon-purple" />
                  <span>{tuition.location}</span>
                </div>
                {tuition.days_per_week && (
                  <div className="flex items-center gap-2">
                    <FaClock className="text-neon-pink" />
                    <span>{tuition.days_per_week} days/week</span>
                  </div>
                )}
                {tuition.class_duration && (
                  <div className="flex items-center gap-2">
                    <FaCalendar className="text-neon-blue" />
                    <span>{tuition.class_duration}</span>
                  </div>
                )}
                {tuition.preferred_medium && (
                  <div className="flex items-center gap-2">
                    <span>Medium: {tuition.preferred_medium}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 mb-4">
                <FaDollarSign className="text-neon-green text-2xl" />
                <span className="text-3xl font-bold text-neon-green">{tuition.salary} BDT/month</span>
              </div>
            </div>

            {/* Apply Button - Only for Tutors */}
            {showApplyButton && (
              <div className="flex flex-col gap-2">
                {checkingApplication ? (
                  <button
                    disabled
                    className="btn btn-neon-blue px-8 py-4 rounded-lg font-semibold text-lg whitespace-nowrap opacity-50 cursor-not-allowed"
                  >
                    Checking...
                  </button>
                ) : alreadyApplied ? (
                  <button
                    disabled
                    className="btn btn-neon-green px-8 py-4 rounded-lg font-semibold text-lg whitespace-nowrap opacity-70 cursor-not-allowed flex items-center gap-2"
                  >
                    <FaCheckCircle />
                    Already Applied
                  </button>
                ) : (
                  <button
                    onClick={() => setShowApplyModal(true)}
                    className="btn btn-neon-blue px-8 py-4 rounded-lg font-semibold text-lg whitespace-nowrap hover:shadow-lg hover:shadow-neon-blue/30 transition-all"
                  >
                    Apply Now
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Requirements */}
        <div className="card-neon card-neon-blue p-8 rounded-xl mb-6">
          <h2 className="text-2xl font-bold neon-text-blue mb-4">Requirements</h2>
          <p className="text-gray-400 leading-relaxed whitespace-pre-line">{tuition.requirements}</p>
        </div>

        {/* Description */}
        {tuition.description && (
          <div className="card-neon card-neon-green p-8 rounded-xl mb-6">
            <h2 className="text-2xl font-bold neon-text-green mb-4">Description</h2>
            <p className="text-gray-400 leading-relaxed whitespace-pre-line">{tuition.description}</p>
          </div>
        )}

        {/* Additional Details */}
        <div className="card-neon card-neon-pink p-8 rounded-xl mb-6">
          <h2 className="text-2xl font-bold neon-text-pink mb-4">Additional Details</h2>
          <div className="grid md:grid-cols-2 gap-4 text-gray-400">
            {tuition.student_gender && (
              <div>
                <span className="font-semibold text-white">Student Gender:</span> {tuition.student_gender}
              </div>
            )}
            {tuition.tutor_gender_preference && (
              <div>
                <span className="font-semibold text-white">Preferred Tutor Gender:</span> {tuition.tutor_gender_preference}
              </div>
            )}
            <div>
              <span className="font-semibold text-white">Schedule:</span> {tuition.schedule}
            </div>
            <div>
              <span className="font-semibold text-white">Posted:</span> {new Date(tuition.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Posted By */}
        {tuition.studentId && (
          <div className="card-neon card-neon-blue p-8 rounded-xl">
            <h2 className="text-2xl font-bold neon-text-blue mb-4">Posted By</h2>
            <div className="flex items-center gap-4">
              <img
                src={tuition.studentId?.profileImage || 'https://i.ibb.co/qpB9ZNp/default-avatar.png'}
                alt={tuition.studentId?.name}
                className="w-16 h-16 rounded-full neon-border-pink object-cover"
              />
              <div>
                <h3 className="text-xl font-bold">{tuition.studentId?.name}</h3>
                <p className="text-gray-400">{tuition.studentId?.email}</p>
                {tuition.studentId?.phone && (
                  <p className="text-sm text-neon-green">{tuition.studentId.phone}</p>
                )}
              </div>
            </div>
          </div>
        )}
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