import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar, FaGraduationCap, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import api from '../../../utils/api';
import toast from 'react-hot-toast';
import PaymentModal from '../../../components/dashboard/PaymentModal';
import Swal from 'sweetalert2';

const AppliedTutors = () => {
  const { id } = useParams();
  const [applications, setApplications] = useState([]);
  const [tuition, setTuition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, [id]);

  const fetchApplications = async () => {
    try {
      const [applicationsRes, tuitionRes] = await Promise.all([
        api.get(`/applications/tuition/${id}`),
        api.get(`/tuitions/${id}`)
      ]);
      setApplications(applicationsRes.data.applications);
      setTuition(tuitionRes.data.tuition);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast.error('Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = (application) => {
    setSelectedApplication(application);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    toast.success('Tutor approved successfully!');
    fetchApplications();
  };

  const handleReject = async (applicationId) => {
    const { value: reason } = await Swal.fire({
      title: 'Reject Application',
      input: 'textarea',
      inputLabel: 'Rejection Reason (optional)',
      inputPlaceholder: 'Enter reason for rejection...',
      showCancelButton: true,
      confirmButtonColor: '#FF10F0',
      cancelButtonColor: '#6b7280',
      background: '#121212',
      color: '#fff',
    });

    if (reason !== undefined) {
      try {
        await api.patch(`/applications/${applicationId}/status`, {
          status: 'rejected',
          rejectionReason: reason
        });
        toast.success('Application rejected');
        fetchApplications();
      } catch (error) {
        console.error('Error rejecting application:', error);
        toast.error('Failed to reject application');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="spinner-neon w-12 h-12"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tuition Info */}
      {tuition && (
        <div className="card-neon card-neon-blue p-6 rounded-xl">
          <h1 className="text-2xl font-bold neon-text-blue mb-2">{tuition.title}</h1>
          <p className="text-gray-400">{tuition.subject} • {tuition.class}</p>
          <div className="mt-4 flex gap-4 text-sm">
            <span className="text-neon-green">Salary: {tuition.salary} BDT</span>
            <span className="text-neon-pink">Applications: {applications.length}</span>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold neon-text-pink">Applied Tutors</h2>

      {applications.length > 0 ? (
        <div className="grid gap-6">
          {applications.map((application) => (
            <div key={application._id} className="card-neon card-neon-pink p-6 rounded-xl">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Tutor Info */}
                <div className="flex-1">
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={application.tutor?.profileImage || 'https://i.ibb.co/qpB9ZNp/default-avatar.png'}
                      alt={application.tutor?.name}
                      className="w-20 h-20 rounded-full neon-border-blue"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold neon-text-pink mb-1">
                        {application.tutor?.name}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
                        <div className="flex items-center gap-1">
                          <FaStar className="text-neon-green" />
                          <span>{application.tutor?.rating || 5.0}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaGraduationCap className="text-neon-blue" />
                          <span>{application.tutor?.education}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {application.tutor?.subjects?.map((subject, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-neon-blue/20 border border-neon-blue/30 rounded text-xs text-neon-blue"
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Cover Letter */}
                  <div className="bg-dark-bg p-4 rounded-lg mb-4">
                    <h4 className="font-bold text-sm neon-text-blue mb-2">Cover Letter</h4>
                    <p className="text-gray-400 text-sm">{application.coverLetter}</p>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-400">Expected Salary:</span>
                      <span className="ml-2 font-bold text-neon-green">{application.expectedSalary} BDT</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Availability:</span>
                      <span className="ml-2 text-white">{application.availability}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                {application.status === 'pending' && (
                  <div className="flex lg:flex-col gap-2 lg:w-32">
                    <button
                      onClick={() => handleApprove(application)}
                      className="flex-1 btn btn-neon-green py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
                    >
                      <FaCheckCircle />
                      <span className="hidden lg:inline">Approve</span>
                    </button>
                    <button
                      onClick={() => handleReject(application._id)}
                      className="flex-1 btn border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
                    >
                      <FaTimesCircle />
                      <span className="hidden lg:inline">Reject</span>
                    </button>
                  </div>
                )}

                {application.status === 'approved' && (
                  <div className="lg:w-32 flex items-center">
                    <span className="px-4 py-2 bg-neon-green/20 text-neon-green border border-neon-green/30 rounded-full text-sm font-semibold">
                      Approved
                    </span>
                  </div>
                )}

                {application.status === 'rejected' && (
                  <div className="lg:w-32 flex items-center">
                    <span className="px-4 py-2 bg-red-500/20 text-red-500 border border-red-500/30 rounded-full text-sm font-semibold">
                      Rejected
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card-neon card-neon-blue p-12 rounded-xl text-center">
          <h3 className="text-2xl font-bold neon-text-blue mb-4">No Applications Yet</h3>
          <p className="text-gray-400">Wait for tutors to apply to your tuition</p>
        </div>
      )}

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        application={selectedApplication}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default AppliedTutors;