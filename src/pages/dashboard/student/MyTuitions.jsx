import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaEye, FaUsers } from 'react-icons/fa';
import api from '../../../utils/api';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const MyTuitions = () => {
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyTuitions();
  }, []);

  const fetchMyTuitions = async () => {
    try {
      const response = await api.get('/tuitions/my/tuitions');
      setTuitions(response.data.tuitions);
    } catch (error) {
      console.error('Error fetching tuitions:', error);
      toast.error('Failed to fetch tuitions');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#FF10F0',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
      background: '#121212',
      color: '#fff',
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/tuitions/${id}`);
        setTuitions(tuitions.filter(t => t._id !== id));
        toast.success('Tuition deleted successfully');
      } catch (error) {
        console.error('Error deleting tuition:', error);
        toast.error(error.response?.data?.message || 'Failed to delete tuition');
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
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold neon-text-pink">My Tuitions</h1>
        <Link to="/dashboard/student/post-tuition" className="btn btn-neon-blue px-6 py-3 rounded-lg font-semibold">
          Post New Tuition
        </Link>
      </div>

      {tuitions.length > 0 ? (
        <div className="grid gap-6">
          {tuitions.map((tuition) => (
            <div key={tuition._id} className="card-neon card-neon-pink p-6 rounded-xl">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold neon-text-pink mb-1">{tuition.title}</h3>
                      <p className="text-gray-400">{tuition.subject} • {tuition.class}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      tuition.status === 'approved' ? 'bg-neon-green/20 text-neon-green border border-neon-green/30' :
                      tuition.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30' :
                      tuition.status === 'ongoing' ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30' :
                      'bg-red-500/20 text-red-500 border border-red-500/30'
                    }`}>
                      {tuition.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-400">
                    <div>
                      <span className="text-neon-blue">Location:</span> {tuition.location}
                    </div>
                    <div>
                      <span className="text-neon-green">Salary:</span> {tuition.salary} BDT
                    </div>
                    <div>
                      <span className="text-neon-purple">Category:</span> {tuition.category}
                    </div>
                    <div>
                      <span className="text-neon-pink">Applications:</span> {tuition.applicationCount || 0}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link
                    to={`/tuitions/${tuition._id}`}
                    className="btn btn-neon-blue px-4 py-2 rounded-lg"
                    title="View Details"
                  >
                    <FaEye />
                  </Link>
                  {tuition.applicationCount > 0 && (
                    <Link
                      to={`/dashboard/student/tuition/${tuition._id}/applications`}
                      className="btn btn-neon-green px-4 py-2 rounded-lg"
                      title="View Applications"
                    >
                      <FaUsers />
                    </Link>
                  )}
                  {tuition.status !== 'ongoing' && (
                    <>
                      <button
                        className="btn btn-neon-purple px-4 py-2 rounded-lg"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(tuition._id)}
                        className="btn border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-lg transition-all"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card-neon card-neon-blue p-12 rounded-xl text-center">
          <h3 className="text-2xl font-bold neon-text-blue mb-4">No Tuitions Yet</h3>
          <p className="text-gray-400 mb-6">Start by posting your first tuition</p>
          <Link to="/dashboard/student/post-tuition" className="btn btn-neon-pink px-8 py-3 rounded-lg font-semibold inline-block">
            Post Tuition Now
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyTuitions;