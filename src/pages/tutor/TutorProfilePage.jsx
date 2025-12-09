import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FaStar, 
  FaGraduationCap, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope,
  FaBook,
  FaBriefcase,
  FaCheckCircle,
  FaUser,
  FaArrowLeft
} from 'react-icons/fa';
import api from '../../utils/api';
import Loading from '../../components/shared/Loading';

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
      
      // Use the correct route that exists in your backend
      const response = await api.get(`/users/${id}`);
      
      if (response.data.user.role !== 'tutor') {
        throw new Error('This user is not a tutor');
      }
      
      setTutor(response.data.user);
      console.log('✅ Tutor profile loaded:', response.data.user.name);
    } catch (error) {
      console.error('❌ Error fetching tutor:', error);
      setError(error.response?.data?.message || 'Failed to load tutor profile');
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

        {/* Header Section */}
        <div className="bg-gradient-to-br from-[#0a0f0d] via-[#0f1512] to-[#0a0f0d] border-2 border-[#00ffcc]/30 p-8 rounded-2xl mb-8 shadow-lg shadow-[#00ffcc]/10">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Profile Image */}
            <div className="relative">
              <img
                src={tutor.profileImage || 'https://i.ibb.co/qpB9ZNp/default-avatar.png'}
                alt={tutor.name}
                className="w-48 h-48 rounded-full border-4 border-[#00ffcc] shadow-lg shadow-[#00ffcc]/30 object-cover"
              />
              {/* Rating Badge */}
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-[#0a0f0d] px-4 py-2 rounded-full border-2 border-[#00ff88] flex items-center gap-2">
                <FaStar className="text-[#00ff88]" />
                <span className="text-lg font-bold text-[#00ff88]">
                  {tutor.rating?.toFixed(1) || '5.0'}
                </span>
              </div>
            </div>

            {/* Basic Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00ffcc] to-[#00ff88] bg-clip-text text-transparent mb-4">
                {tutor.name}
              </h1>
              
              <div className="space-y-3 text-gray-300">
                {tutor.education && (
                  <div className="flex items-center gap-3 justify-center md:justify-start">
                    <FaGraduationCap className="text-[#00ffcc] text-xl flex-shrink-0" />
                    <span className="text-lg">{tutor.education}</span>
                  </div>
                )}
                
                {tutor.location && (
                  <div className="flex items-center gap-3 justify-center md:justify-start">
                    <FaMapMarkerAlt className="text-[#00ff88] text-xl flex-shrink-0" />
                    <span>{tutor.location}</span>
                  </div>
                )}

                {tutor.experience !== undefined && (
                  <div className="flex items-center gap-3 justify-center md:justify-start">
                    <FaBriefcase className="text-[#00ffcc] text-xl flex-shrink-0" />
                    <span>{tutor.experience} {tutor.experience === 1 ? 'year' : 'years'} of experience</span>
                  </div>
                )}
                
                {tutor.phone && (
                  <div className="flex items-center gap-3 justify-center md:justify-start">
                    <FaPhone className="text-[#00ffcc] text-xl flex-shrink-0" />
                    <span>{tutor.phone}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <FaEnvelope className="text-[#00ff88] text-xl flex-shrink-0" />
                  <span>{tutor.email}</span>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
                <a
                  href={`mailto:${tutor.email}`}
                  className="px-8 py-3 bg-gradient-to-r from-[#00ffcc] to-[#00ff88] text-[#0a0f0d] rounded-lg font-bold hover:shadow-lg hover:shadow-[#00ffcc]/30 transition-all inline-block"
                >
                  Contact via Email
                </a>
                {tutor.phone && (
                  <a
                    href={`tel:${tutor.phone}`}
                    className="px-8 py-3 bg-[#0a0f0d] border-2 border-[#00ffcc] text-[#00ffcc] rounded-lg font-bold hover:bg-[#00ffcc]/10 transition-all inline-block"
                  >
                    Call Now
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-8">
            {/* Subjects Section */}
            <div className="bg-gradient-to-br from-[#0a0f0d] via-[#0f1512] to-[#0a0f0d] border-2 border-[#00ffcc]/30 p-6 rounded-2xl shadow-lg shadow-[#00ffcc]/10">
              <h2 className="text-2xl font-bold text-[#00ffcc] mb-4 flex items-center gap-2">
                <FaBook className="text-xl" />
                Subjects I Teach
              </h2>
              <div className="flex flex-wrap gap-3">
                {tutor.subjects && tutor.subjects.length > 0 ? (
                  tutor.subjects.map((subject, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-[#00ffcc]/20 border-2 border-[#00ffcc]/50 rounded-lg text-[#00ffcc] font-semibold hover:bg-[#00ffcc]/30 transition-colors"
                    >
                      {subject}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-400">No subjects listed</p>
                )}
              </div>
            </div>

            {/* Education & Experience Section */}
            {tutor.education && (
              <div className="bg-gradient-to-br from-[#0a0f0d] via-[#0f1512] to-[#0a0f0d] border-2 border-[#00ff88]/30 p-6 rounded-2xl shadow-lg shadow-[#00ff88]/10">
                <h2 className="text-2xl font-bold text-[#00ff88] mb-4 flex items-center gap-2">
                  <FaCheckCircle className="text-xl" />
                  Education & Qualifications
                </h2>
                <div className="space-y-4 text-gray-300">
                  <div className="flex items-start gap-3">
                    <FaGraduationCap className="text-[#00ff88] text-xl mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-[#00ff88] mb-1">Education</h3>
                      <p className="text-lg">{tutor.education}</p>
                    </div>
                  </div>
                  
                  {tutor.experience !== undefined && (
                    <div className="flex items-start gap-3">
                      <FaBriefcase className="text-[#00ff88] text-xl mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-[#00ff88] mb-1">Teaching Experience</h3>
                        <p className="text-lg">
                          {tutor.experience} {tutor.experience === 1 ? 'year' : 'years'} of professional teaching
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Info Cards */}
          <div className="space-y-6">
            {/* Account Status */}
            <div className="bg-gradient-to-br from-[#0a0f0d] via-[#0f1512] to-[#0a0f0d] border-2 border-[#00ff88]/30 p-6 rounded-2xl shadow-lg shadow-[#00ff88]/10">
              <h3 className="text-xl font-bold text-[#00ff88] mb-4">Status</h3>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-[#00ff88] text-2xl" />
                <span className="text-lg font-semibold text-[#00ff88]">
                  {tutor.active ? 'Active & Available' : 'Currently Unavailable'}
                </span>
              </div>
              {tutor.active && (
                <p className="text-sm text-gray-400 mt-3">
                  Available for new students
                </p>
              )}
            </div>

            {/* Rating Card */}
            <div className="bg-gradient-to-br from-[#0a0f0d] via-[#0f1512] to-[#0a0f0d] border-2 border-[#00ffcc]/30 p-6 rounded-2xl shadow-lg shadow-[#00ffcc]/10">
              <h3 className="text-xl font-bold text-[#00ffcc] mb-4">Rating</h3>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <FaStar className="text-[#00ff88] text-3xl" />
                  <span className="text-4xl font-bold text-[#00ff88]">
                    {tutor.rating?.toFixed(1) || '5.0'}
                  </span>
                </div>
                <p className="text-sm text-gray-400">out of 5.0</p>
              </div>
            </div>

            {/* Contact Info Card */}
            <div className="bg-gradient-to-br from-[#0a0f0d] via-[#0f1512] to-[#0a0f0d] border-2 border-[#00ffcc]/30 p-6 rounded-2xl shadow-lg shadow-[#00ffcc]/10">
              <h3 className="text-xl font-bold text-[#00ffcc] mb-4">Contact Information</h3>
              <div className="space-y-3 text-sm">
                <a 
                  href={`mailto:${tutor.email}`}
                  className="flex items-center gap-2 text-gray-300 hover:text-[#00ffcc] transition-colors"
                >
                  <FaEnvelope className="text-[#00ff88]" />
                  <span className="truncate">{tutor.email}</span>
                </a>
                {tutor.phone && (
                  <a 
                    href={`tel:${tutor.phone}`}
                    className="flex items-center gap-2 text-gray-300 hover:text-[#00ffcc] transition-colors"
                  >
                    <FaPhone className="text-[#00ff88]" />
                    <span>{tutor.phone}</span>
                  </a>
                )}
                {tutor.location && (
                  <div className="flex items-center gap-2 text-gray-300">
                    <FaMapMarkerAlt className="text-[#00ff88]" />
                    <span>{tutor.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorProfilePage;