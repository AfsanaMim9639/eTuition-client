import { useState, useEffect } from 'react';
import { 
  FaCheckCircle, 
  FaTimesCircle, 
  FaBook,
  FaMapMarkerAlt,
  FaDollarSign,
  FaUser,
  FaClock
} from 'react-icons/fa';
import axios from 'axios';

const AdminTuitionApproval = () => {
  const [pendingTuitions, setpendingTuitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rejectionReason, setRejectionReason] = useState('');
  const [rejectingId, setRejectingId] = useState(null);

  useEffect(() => {
    fetchPendingTuitions();
  }, []);

  const fetchPendingTuitions = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/tuitions/admin/pending`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setpendingTuitions(response.data.data || []);
    } catch (error) {
      console.error('Error fetching pending tuitions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    if (!window.confirm('Approve this tuition?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/tuitions/admin/${id}/approve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Tuition approved successfully!');
      fetchPendingTuitions();
    } catch (error) {
      console.error('Error approving tuition:', error);
      alert('Failed to approve tuition');
    }
  };

  const handleReject = async (id) => {
    if (!rejectionReason.trim()) {
      alert('Please provide a rejection reason');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/tuitions/admin/${id}/reject`,
        { reason: rejectionReason },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Tuition rejected');
      setRejectingId(null);
      setRejectionReason('');
      fetchPendingTuitions();
    } catch (error) {
      console.error('Error rejecting tuition:', error);
      alert('Failed to reject tuition');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#00ffcc] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00ffcc] to-[#00ff88] bg-clip-text text-transparent">
          Pending Tuition Approvals
        </h1>
        <p className="text-gray-400 mt-1">
          {pendingTuitions.length} tuition{pendingTuitions.length !== 1 ? 's' : ''} awaiting approval
        </p>
      </div>

      {/* Pending Tuitions */}
      {pendingTuitions.length > 0 ? (
        <div className="space-y-4">
          {pendingTuitions.map((tuition) => (
            <div
              key={tuition._id}
              className="bg-gradient-to-br from-[#0f1512] to-[#0a0f0d] border-2 border-yellow-500/30 rounded-xl p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-white">{tuition.title}</h3>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 flex items-center gap-2">
                      <FaClock /> Pending
                    </span>
                  </div>

                  {/* Student Info */}
                  {tuition.studentId && (
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                      <FaUser className="text-[#00ff88]" />
                      <span>Student: {tuition.studentId.name}</span>
                      {tuition.studentId.phone && (
                        <span>• {tuition.studentId.phone}</span>
                      )}
                    </div>
                  )}

                  {/* Tuition Details */}
                  <div className="grid md:grid-cols-3 gap-3 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <FaBook className="text-[#00ff88]" />
                      <span>{tuition.subject} • {tuition.grade}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-[#00ff88]" />
                      <span>{tuition.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaDollarSign className="text-[#00ff88]" />
                      <span className="font-bold text-[#00ffcc]">{tuition.salary} BDT/month</span>
                    </div>
                  </div>

                  {/* Requirements */}
                  {tuition.requirements && (
                    <div className="mt-4 p-3 bg-[#00ffcc]/5 border border-[#00ffcc]/20 rounded-lg">
                      <p className="text-sm text-gray-300">{tuition.requirements}</p>
                    </div>
                  )}

                  {/* Posted Date */}
                  <p className="text-xs text-gray-500 mt-3">
                    Posted: {new Date(tuition.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              {rejectingId === tuition._id ? (
                <div className="space-y-3 mt-4 pt-4 border-t border-[#00ffcc]/20">
                  <textarea
                    placeholder="Enter rejection reason..."
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0a0f0d] border-2 border-red-500/30 rounded-lg text-white focus:border-red-500 focus:outline-none resize-none"
                    rows="3"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setRejectingId(null);
                        setRejectionReason('');
                      }}
                      className="flex-1 px-4 py-2 bg-gray-500/20 text-gray-400 rounded-lg hover:bg-gray-500/30 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleReject(tuition._id)}
                      className="flex-1 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all flex items-center justify-center gap-2"
                    >
                      <FaTimesCircle /> Confirm Rejection
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-3 mt-4 pt-4 border-t border-[#00ffcc]/20">
                  <button
                    onClick={() => handleApprove(tuition._id)}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-green-500/30 transition-all flex items-center justify-center gap-2"
                  >
                    <FaCheckCircle /> Approve
                  </button>
                  <button
                    onClick={() => setRejectingId(tuition._id)}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-red-500/30 transition-all flex items-center justify-center gap-2"
                  >
                    <FaTimesCircle /> Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gradient-to-br from-[#0f1512] to-[#0a0f0d] border-2 border-[#00ffcc]/30 rounded-xl p-12 text-center">
          <FaCheckCircle className="text-6xl text-gray-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-300 mb-2">All Caught Up!</h3>
          <p className="text-gray-400">No pending tuitions to review</p>
        </div>
      )}
    </div>
  );
};

export default AdminTuitionApproval;