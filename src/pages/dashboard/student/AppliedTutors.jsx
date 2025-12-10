import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  FaUser, 
  FaStar, 
  FaGraduationCap, 
  FaBriefcase,
  FaMapMarkerAlt,
  FaDollarSign,
  FaCheck,
  FaTimes,
  FaEnvelope,
  FaPhone,
  FaBook
} from 'react-icons/fa';
import { tuitionAPI, applicationAPI } from '../../../utils/api';

const AppliedTutors = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [tuitions, setTuitions] = useState([]);
  const [selectedTuition, setSelectedTuition] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [rejectModal, setRejectModal] = useState({ show: false, application: null });
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    fetchTuitions();
  }, []);

  useEffect(() => {
    const tuitionId = searchParams.get('tuition');
    if (tuitionId && tuitions.length > 0) {
      const tuition = tuitions.find(t => t._id === tuitionId);
      if (tuition) {
        setSelectedTuition(tuition);
        fetchApplications(tuitionId);
      }
    }
  }, [searchParams, tuitions]);

  const fetchTuitions = async () => {
    try {
      const response = await tuitionAPI.getMyTuitions();
      const tuitionsData = response.data.tuitions || [];
      setTuitions(tuitionsData);
      
      if (tuitionsData.length > 0 && !searchParams.get('tuition')) {
        setSelectedTuition(tuitionsData[0]);
        fetchApplications(tuitionsData[0]._id);
      }
    } catch (error) {
      console.error('Error fetching tuitions:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async (tuitionId) => {
    try {
      setLoading(true);
      const response = await applicationAPI.getTuitionApplications(tuitionId);
      setApplications(response.data.applications || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTuitionChange = (tuition) => {
    setSelectedTuition(tuition);
    fetchApplications(tuition._id);
  };

  const handleApprove = (application) => {
    // Redirect to payment/checkout page
    navigate('/student/checkout', { 
      state: { 
        application,
        tuition: selectedTuition
      } 
    });
  };

  const handleReject = async () => {
    if (!rejectModal.application) return;
    
    try {
      await applicationAPI.updateApplicationStatus(
        rejectModal.application._id, 
        { 
          status: 'rejected',
          rejectionReason 
        }
      );
      
      // Update local state
      setApplications(applications.map(app => 
        app._id === rejectModal.application._id 
          ? { ...app, status: 'rejected', rejectionReason }
          : app
      ));
      
      setRejectModal({ show: false, application: null });
      setRejectionReason('');
      alert('Application rejected successfully');
    } catch (error) {
      console.error('Error rejecting application:', error);
      alert(error.response?.data?.message || 'Failed to reject application');
    }
  };

  if (loading && tuitions.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#00ffcc] border-t-transparent"></div>
      </div>
    );
  }

  if (tuitions.length === 0) {
    return (
      <div className="bg-gradient-to-br from-[#0f1512] to-[#0a0f0d] border-2 border-[#00ffcc]/30 rounded-xl p-12 text-center">
        <FaBook className="text-6xl text-gray-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-300 mb-2">No Tuitions Posted</h3>
        <p className="text-gray-400 mb-6">
          Post a tuition to start receiving applications from tutors
        </p>
        <button
          onClick={() => navigate('/student/post-tuition')}
          className="px-8 py-3 bg-gradient-to-r from-[#00ffcc] to-[#00ff88] text-[#0a0f0d] rounded-lg font-bold hover:shadow-lg hover:shadow-[#00ffcc]/30 transition-all"
        >
          Post Your First Tuition
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00ffcc] to-[#00ff88] bg-clip-text text-transparent">
          Applied Tutors
        </h1>
        <p className="text-gray-400 mt-1">Review and manage tutor applications</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Tuition List Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-[#0f1512] to-[#0a0f0d] border-2 border-[#00ffcc]/30 rounded-xl p-4 sticky top-4">
            <h2 className="text-lg font-bold text-[#00ffcc] mb-4">Your Tuitions</h2>
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {tuitions.map((tuition) => (
                <button
                  key={tuition._id}
                  onClick={() => handleTuitionChange(tuition)}
                  className={`w-full text-left p-4 rounded-lg transition-all ${
                    selectedTuition?._id === tuition._id
                      ? 'bg-[#00ffcc]/20 border-2 border-[#00ffcc]'
                      : 'bg-[#00ffcc]/5 border-2 border-transparent hover:border-[#00ffcc]/50'
                  }`}
                >
                  <h3 className="font-semibold text-white mb-1 line-clamp-1">
                    {tuition.title}
                  </h3>
                  <p className="text-xs text-gray-400 mb-2">
                    {tuition.subject} • {tuition.grade}
                  </p>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                    tuition.status === 'open' 
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {tuition.status}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Applications List */}
        <div className="lg:col-span-2">
          {selectedTuition && (
            <div className="bg-gradient-to-br from-[#0f1512] to-[#0a0f0d] border-2 border-[#00ffcc]/30 rounded-xl p-6 mb-6">
              <h2 className="text-xl font-bold text-white mb-2">{selectedTuition.title}</h2>
              <p className="text-gray-400 text-sm">
                {applications.length} {applications.length === 1 ? 'application' : 'applications'} received
              </p>
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#00ffcc] border-t-transparent"></div>
            </div>
          ) : applications.length > 0 ? (
            <div className="space-y-6">
              {applications.map((application) => (
                <div
                  key={application._id}
                  className="bg-gradient-to-br from-[#0f1512] to-[#0a0f0d] border-2 border-[#00ffcc]/30 rounded-xl p-6 hover:border-[#00ffcc] transition-all"
                >
                  <div className="flex items-start gap-4 mb-4">
                    {/* Tutor Avatar */}
                    <img
                      src={application.tutor?.profileImage || 'https://i.ibb.co/qpB9ZNp/default-avatar.png'}
                      alt={application.tutor?.name}
                      className="w-20 h-20 rounded-full border-2 border-[#00ffcc] object-cover"
                    />

                    {/* Tutor Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">
                            {application.tutor?.name}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <FaStar className="text-yellow-400" />
                            <span>{application.tutor?.rating?.toFixed(1) || '0.0'}</span>
                            <span className="text-gray-600">•</span>
                            <FaBriefcase className="text-[#00ff88]" />
                            <span>{application.tutor?.experience || 0} years</span>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                          application.status === 'pending'
                            ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'
                            : application.status === 'accepted'
                            ? 'bg-green-500/20 text-green-400 border-green-500/50'
                            : 'bg-red-500/20 text-red-400 border-red-500/50'
                        }`}>
                          {application.status}
                        </span>
                      </div>

                      {/* Tutor Details */}
                      <div className="grid grid-cols-2 gap-3 text-sm text-gray-400 mb-4">
                        {application.tutor?.address && (
                          <div className="flex items-center gap-2">
                            <FaMapMarkerAlt className="text-[#00ff88]" />
                            <span>{application.tutor.address}</span>
                          </div>
                        )}
                        {application.tutor?.email && (
                          <div className="flex items-center gap-2">
                            <FaEnvelope className="text-[#00ff88]" />
                            <span className="truncate">{application.tutor.email}</span>
                          </div>
                        )}
                        {application.tutor?.phone && (
                          <div className="flex items-center gap-2">
                            <FaPhone className="text-[#00ff88]" />
                            <span>{application.tutor.phone}</span>
                          </div>
                        )}
                        {application.proposedRate && (
                          <div className="flex items-center gap-2">
                            <FaDollarSign className="text-[#00ff88]" />
                            <span>{application.proposedRate} BDT/month</span>
                          </div>
                        )}
                      </div>

                      {/* Education */}
                      {application.tutor?.education && application.tutor.education.length > 0 && (
                        <div className="mb-4">
                          <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                            <FaGraduationCap className="text-[#00ffcc]" />
                            <span className="font-semibold">Education:</span>
                          </div>
                          {application.tutor.education.map((edu, idx) => (
                            <p key={idx} className="text-sm text-gray-300 ml-6">
                              {edu.degree} {edu.institution && `- ${edu.institution}`}
                            </p>
                          ))}
                        </div>
                      )}

                      {/* Subjects */}
                      {application.tutor?.subjects && application.tutor.subjects.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {application.tutor.subjects.map((subject, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-[#00ffcc]/20 border border-[#00ffcc]/30 rounded text-xs text-[#00ffcc]"
                            >
                              {subject}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Application Message */}
                      {application.message && (
                        <div className="p-4 bg-[#00ffcc]/5 border border-[#00ffcc]/20 rounded-lg mb-4">
                          <p className="text-sm text-gray-300 italic">"{application.message}"</p>
                        </div>
                      )}

                      {/* Rejection Reason (if rejected) */}
                      {application.status === 'rejected' && application.rejectionReason && (
                        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg mb-4">
                          <p className="text-sm text-red-400">
                            <strong>Rejection Reason:</strong> {application.rejectionReason}
                          </p>
                        </div>
                      )}

                      {/* Action Buttons */}
                      {application.status === 'pending' && (
                        <div className="flex gap-3 mt-4">
                          <button
                            onClick={() => handleApprove(application)}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-green-500/30 transition-all flex items-center justify-center gap-2"
                          >
                            <FaCheck />
                            Accept & Pay
                          </button>
                          <button
                            onClick={() => setRejectModal({ show: true, application })}
                            className="flex-1 px-6 py-3 bg-red-500/20 border-2 border-red-500/50 text-red-400 rounded-lg font-bold hover:bg-red-500/30 transition-all flex items-center justify-center gap-2"
                          >
                            <FaTimes />
                            Reject
                          </button>
                        </div>
                      )}

                      {/* Applied Date */}
                      <p className="text-xs text-gray-500 mt-4">
                        Applied: {new Date(application.appliedAt || application.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gradient-to-br from-[#0f1512] to-[#0a0f0d] border-2 border-[#00ffcc]/30 rounded-xl p-12 text-center">
              <FaUser className="text-6xl text-gray-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-300 mb-2">No Applications Yet</h3>
              <p className="text-gray-400">
                Tutors will apply to this tuition soon
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Reject Modal */}
      {rejectModal.show && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-[#0f1512] to-[#0a0f0d] border-2 border-red-500/50 rounded-xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-red-400 mb-4">Reject Application</h3>
            <p className="text-gray-300 mb-4">
              Are you sure you want to reject <strong className="text-white">{rejectModal.application?.tutor?.name}</strong>'s application?
            </p>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Reason for rejection (optional)"
              rows="3"
              className="w-full px-4 py-3 bg-[#0a0f0d] border-2 border-red-500/30 rounded-lg text-white focus:border-red-500 focus:outline-none transition-all resize-none mb-6"
            />
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setRejectModal({ show: false, application: null });
                  setRejectionReason('');
                }}
                className="flex-1 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppliedTutors;