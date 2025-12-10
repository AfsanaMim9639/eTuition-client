import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye, 
  FaMapMarkerAlt, 
  FaDollarSign,
  FaClock,
  FaUsers,
  FaCheckCircle
} from 'react-icons/fa';
import { tuitionAPI, applicationAPI } from '../../../utils/api';

const MyTuitions = () => {
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ show: false, tuition: null });
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyTuitions();
  }, []);

  const fetchMyTuitions = async () => {
    try {
      setLoading(true);
      const response = await tuitionAPI.getMyTuitions();
      const tuitionsData = response.data.tuitions || [];
      
      // Fetch application counts for each tuition
      const tuitionsWithCounts = await Promise.all(
        tuitionsData.map(async (tuition) => {
          try {
            const appResponse = await applicationAPI.getTuitionApplications(tuition._id);
            return {
              ...tuition,
              applicationsCount: appResponse.data.applications?.length || 0
            };
          } catch {
            return { ...tuition, applicationsCount: 0 };
          }
        })
      );
      
      setTuitions(tuitionsWithCounts);
    } catch (error) {
      console.error('Error fetching tuitions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal.tuition) return;
    
    try {
      await tuitionAPI.deleteTuition(deleteModal.tuition._id);
      setTuitions(tuitions.filter(t => t._id !== deleteModal.tuition._id));
      setDeleteModal({ show: false, tuition: null });
    } catch (error) {
      console.error('Error deleting tuition:', error);
      alert(error.response?.data?.message || 'Failed to delete tuition');
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'open': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'ongoing': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'completed': return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
      case 'closed': return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00ffcc] to-[#00ff88] bg-clip-text text-transparent">
            My Tuitions
          </h1>
          <p className="text-gray-400 mt-1">Manage your posted tuitions</p>
        </div>
        <Link
          to="/student/post-tuition"
          className="px-6 py-3 bg-gradient-to-r from-[#00ffcc] to-[#00ff88] text-[#0a0f0d] rounded-lg font-bold hover:shadow-lg hover:shadow-[#00ffcc]/30 transition-all flex items-center gap-2"
        >
          <FaPlus />
          Post New Tuition
        </Link>
      </div>

      {/* Tuitions List */}
      {tuitions.length > 0 ? (
        <div className="grid gap-6">
          {tuitions.map((tuition) => (
            <div
              key={tuition._id}
              className="bg-gradient-to-br from-[#0f1512] to-[#0a0f0d] border-2 border-[#00ffcc]/30 rounded-xl p-6 hover:border-[#00ffcc] transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-white">{tuition.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(tuition.status)}`}>
                      {tuition.status}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">
                    {tuition.subject} • {tuition.grade}
                  </p>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <Link
                    to={`/student/applied-tutors?tuition=${tuition._id}`}
                    className="p-2 bg-blue-500/20 border border-blue-500/50 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all"
                    title="View Applications"
                  >
                    <FaUsers />
                  </Link>
                  <button
                    onClick={() => navigate(`/student/edit-tuition/${tuition._id}`, { state: { tuition } })}
                    className="p-2 bg-[#00ffcc]/20 border border-[#00ffcc]/50 text-[#00ffcc] rounded-lg hover:bg-[#00ffcc]/30 transition-all"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => setDeleteModal({ show: true, tuition })}
                    className="p-2 bg-red-500/20 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/30 transition-all"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>

              {/* Tuition Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <FaMapMarkerAlt className="text-[#00ff88]" />
                  <span>{tuition.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <FaDollarSign className="text-[#00ff88]" />
                  <span>{tuition.salary} BDT/month</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <FaClock className="text-[#00ff88]" />
                  <span>{tuition.tutoring_type || 'Not specified'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <FaUsers className="text-[#00ff88]" />
                  <span>{tuition.applicationsCount || 0} Applications</span>
                </div>
              </div>

              {/* Description */}
              {tuition.requirements && (
                <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                  {tuition.requirements}
                </p>
              )}

              {/* Footer */}
              <div className="flex justify-between items-center pt-4 border-t border-[#00ffcc]/20">
                <span className="text-xs text-gray-500">
                  Posted: {new Date(tuition.postedAt || tuition.createdAt).toLocaleDateString()}
                </span>
                {tuition.applicationsCount > 0 && (
                  <Link
                    to={`/student/applied-tutors?tuition=${tuition._id}`}
                    className="text-[#00ffcc] hover:text-[#00ff88] text-sm font-semibold flex items-center gap-2"
                  >
                    View {tuition.applicationsCount} Applications →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gradient-to-br from-[#0f1512] to-[#0a0f0d] border-2 border-[#00ffcc]/30 rounded-xl p-12 text-center">
          <FaCheckCircle className="text-6xl text-gray-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-300 mb-2">No Tuitions Posted Yet</h3>
          <p className="text-gray-400 mb-6">
            Start by posting your first tuition to find the perfect tutor
          </p>
          <Link
            to="/student/post-tuition"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#00ffcc] to-[#00ff88] text-[#0a0f0d] rounded-lg font-bold hover:shadow-lg hover:shadow-[#00ffcc]/30 transition-all"
          >
            <FaPlus />
            Post Your First Tuition
          </Link>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-[#0f1512] to-[#0a0f0d] border-2 border-red-500/50 rounded-xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-red-400 mb-4">Delete Tuition?</h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete <strong className="text-white">"{deleteModal.tuition?.title}"</strong>? 
              This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setDeleteModal({ show: false, tuition: null })}
                className="flex-1 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTuitions;