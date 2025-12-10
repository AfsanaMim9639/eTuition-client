import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import api from '../../utils/api';
import Loading from '../../components/shared/Loading';
import TutorProfile from '../../components/tutor/TutorProfile'; // Import the component

const TutorProfilePage = () => {
  const { id } = useParams();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTutorProfile();
  }, [id]);

  const fetchTutorProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔍 Fetching tutor profile:', id);
      
      const response = await api.get(`/users/${id}`);
      
      // ✅ FIXED: Access response.data.data instead of response.data.user
      if (response.data.data.role !== 'tutor') {
        throw new Error('This user is not a tutor');
      }
      
      setTutor(response.data.data);
      console.log('✅ Tutor profile loaded:', response.data.data.name);
    } catch (error) {
      console.error('❌ Error fetching tutor:', error);
      setError(error.response?.data?.message || error.message || 'Failed to load tutor profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  
  if (error || !tutor) {
    return (
      <div className="min-h-screen bg-dark-bg pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/10 border-2 border-red-500/30 mb-6">
            <span className="text-4xl">⚠️</span>
          </div>
          <h2 className="text-3xl font-bold text-red-400 mb-4">
            {error || 'Tutor Not Found'}
          </h2>
          <Link 
            to="/tutors" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00ffcc] to-[#00ff88] text-[#0a0f0d] rounded-lg font-semibold hover:shadow-lg hover:shadow-[#00ffcc]/30 transition-all"
          >
            <FaArrowLeft />
            Back to Tutors
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f0d] pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Back Button */}
        <Link 
          to="/tutors"
          className="inline-flex items-center gap-2 text-[#00ffcc] hover:text-[#00ff88] mb-6 transition-colors"
        >
          <FaArrowLeft />
          <span>Back to Tutors</span>
        </Link>

        {/* Use the TutorProfile component */}
        <TutorProfile tutor={tutor} />
      </div>
    </div>
  );
};

export default TutorProfilePage;