import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import api from '../../utils/api';
import Loading from '../../components/shared/Loading';
import TutorProfile from '../../components/tutor/TutorProfile';

const TutorProfilePage = () => {
  const { id } = useParams();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchTutorProfile();
    }
  }, [id]);

  const fetchTutorProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔍 Fetching tutor profile:', id);
      
      const response = await api.get(`/users/${id}`);
      console.log('📦 API Response:', response.data);
      
      // ✅ Handle different response structures
      let tutorData = null;
      
      if (response.data.data) {
        tutorData = response.data.data;
      } else if (response.data.user) {
        tutorData = response.data.user;
      } else if (response.data) {
        tutorData = response.data;
      }
      
      console.log('👤 Tutor Data:', tutorData);
      
      if (!tutorData) {
        throw new Error('No tutor data found');
      }
      
      if (tutorData.role !== 'tutor') {
        throw new Error('This user is not a tutor');
      }
      
      setTutor(tutorData);
      console.log('✅ Tutor profile loaded:', tutorData.name);
    } catch (error) {
      console.error('❌ Error fetching tutor:', error);
      console.error('❌ Error details:', error.response?.data);
      setError(error.response?.data?.message || error.message || 'Failed to load tutor profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  
  if (error || !tutor) {
    return (
      <div className="min-h-screen bg-[#0a0f0d] pt-16 sm:pt-20 md:pt-24 flex items-center justify-center px-4">
        <div className="text-center max-w-md w-full">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-500/10 border-2 border-red-500/30 mb-4 sm:mb-6">
            <span className="text-3xl sm:text-4xl">⚠️</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-red-400 mb-3 sm:mb-4 px-4">
            {error || 'Tutor Not Found'}
          </h2>
          <p className="text-sm sm:text-base text-gray-400 mb-6 px-4">
            The tutor profile you're looking for doesn't exist or has been removed.
          </p>
          <Link 
            to="/tutors" 
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#00ffcc] to-[#00ff88] text-[#0a0f0d] rounded-lg font-semibold hover:shadow-lg hover:shadow-[#00ffcc]/30 transition-all text-sm sm:text-base"
          >
            <FaArrowLeft />
            Back to Tutors
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f0d] pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Back Button */}
        <Link 
          to="/tutors"
          className="inline-flex items-center gap-2 text-[#00ffcc] hover:text-[#00ff88] mb-4 sm:mb-6 transition-colors text-sm sm:text-base group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Tutors</span>
        </Link>

        {/* Tutor Profile Component */}
        <div className="w-full">
          <TutorProfile tutor={tutor} />
        </div>
      </div>
    </div>
  );
};

export default TutorProfilePage;