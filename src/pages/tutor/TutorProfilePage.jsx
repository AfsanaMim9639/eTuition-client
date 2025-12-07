import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FaStar, 
  FaGraduationCap, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope,
  FaBook,
  FaDollarSign,
  FaCalendar,
  FaCheckCircle
} from 'react-icons/fa';
import api from '../../utils/api';
import Loading from '../../components/shared/Loading';

const TutorProfilePage = () => {
  const { id } = useParams();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTutorProfile();
  }, [id]);

  const fetchTutorProfile = async () => {
    try {
      const response = await api.get(`/users/tutors/${id}`);
      setTutor(response.data.tutor);
    } catch (error) {
      console.error('Error fetching tutor:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (!tutor) return (
    <div className="min-h-screen bg-dark-bg pt-24 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-3xl font-bold neon-text-pink mb-4">Tutor Not Found</h2>
        <Link to="/tutors" className="btn btn-neon-blue px-6 py-3 rounded-lg">
          Back to Tutors
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-dark-bg pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header Section */}
        <div className="card-neon card-neon-blue p-8 rounded-xl mb-8">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Profile Image */}
            <img
              src={tutor.profileImage || '/default-avatar.png'}
              alt={tutor.name}
              className="w-48 h-48 rounded-full border-4 border-neon-blue shadow-neon-blue"
            />

            {/* Basic Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold neon-text-blue mb-3">{tutor.name}</h1>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
                <div className="flex items-center gap-2 text-neon-green">
                  <FaStar className="text-2xl" />
                  <span className="text-2xl font-bold">{tutor.rating || 5.0}</span>
                  <span className="text-gray-400">({tutor.totalReviews || 0} reviews)</span>
                </div>
              </div>

              <div className="space-y-2 text-gray-300">
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <FaGraduationCap className="text-neon-pink text-xl" />
                  <span className="text-lg">{tutor.education}</span>
                </div>
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <FaMapMarkerAlt className="text-neon-green text-xl" />
                  <span>{tutor.location || 'Dhaka, Bangladesh'}</span>
                </div>
                {tutor.phone && (
                  <div className="flex items-center gap-3 justify-center md:justify-start">
                    <FaPhone className="text-neon-blue text-xl" />
                    <span>{tutor.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <FaEnvelope className="text-neon-pink text-xl" />
                  <span>{tutor.email}</span>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  to={`/contact/${tutor._id}`}
                  className="btn btn-neon-pink px-8 py-3 rounded-lg font-semibold inline-block"
                >
                  Contact Tutor
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-8">
            {/* About Section */}
            <div className="card-neon card-neon-pink p-6 rounded-xl">
              <h2 className="text-2xl font-bold neon-text-pink mb-4 flex items-center gap-2">
                <FaUser className="text-xl" />
                About Me
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {tutor.bio || 'Experienced tutor dedicated to helping students achieve their academic goals.'}
              </p>
            </div>

            {/* Subjects Section */}
            <div className="card-neon card-neon-blue p-6 rounded-xl">
              <h2 className="text-2xl font-bold neon-text-blue mb-4 flex items-center gap-2">
                <FaBook className="text-xl" />
                Subjects I Teach
              </h2>
              <div className="flex flex-wrap gap-3">
                {tutor.subjects && tutor.subjects.length > 0 ? (
                  tutor.subjects.map((subject, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-neon-blue/20 border-2 border-neon-blue/50 rounded-lg text-neon-blue font-semibold"
                    >
                      {subject}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-400">No subjects listed</p>
                )}
              </div>
            </div>

            {/* Experience Section */}
            <div className="card-neon card-neon-green p-6 rounded-xl">
              <h2 className="text-2xl font-bold neon-text-green mb-4 flex items-center gap-2">
                <FaCheckCircle className="text-xl" />
                Experience & Qualifications
              </h2>
              <div className="space-y-4 text-gray-300">
                <div>
                  <h3 className="font-semibold text-neon-green mb-2">Education</h3>
                  <p>{tutor.education}</p>
                </div>
                {tutor.experience && (
                  <div>
                    <h3 className="font-semibold text-neon-green mb-2">Teaching Experience</h3>
                    <p>{tutor.experience}</p>
                  </div>
                )}
                {tutor.specialization && (
                  <div>
                    <h3 className="font-semibold text-neon-green mb-2">Specialization</h3>
                    <p>{tutor.specialization}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Info */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="card-neon card-neon-pink p-6 rounded-xl">
              <h3 className="text-xl font-bold neon-text-pink mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Students</span>
                  <span className="font-bold text-neon-pink text-xl">
                    {tutor.totalStudents || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Completed Tuitions</span>
                  <span className="font-bold text-neon-blue text-xl">
                    {tutor.completedTuitions || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Success Rate</span>
                  <span className="font-bold text-neon-green text-xl">
                    {tutor.successRate || 95}%
                  </span>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="card-neon card-neon-blue p-6 rounded-xl">
              <h3 className="text-xl font-bold neon-text-blue mb-4 flex items-center gap-2">
                <FaCalendar />
                Availability
              </h3>
              <div className="space-y-2 text-gray-300">
                <p className="flex items-center gap-2">
                  <FaCheckCircle className="text-neon-green" />
                  {tutor.availability || 'Available for new students'}
                </p>
                <p className="text-sm text-gray-400 mt-3">
                  Preferred teaching mode: {tutor.teachingMode || 'Both Online & Offline'}
                </p>
              </div>
            </div>

            {/* Fee Range */}
            <div className="card-neon card-neon-green p-6 rounded-xl">
              <h3 className="text-xl font-bold neon-text-green mb-4 flex items-center gap-2">
                <FaDollarSign />
                Fee Range
              </h3>
              <div className="text-center">
                <p className="text-3xl font-bold neon-text-green mb-2">
                  ৳{tutor.minFee || 3000} - ৳{tutor.maxFee || 10000}
                </p>
                <p className="text-sm text-gray-400">per month</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorProfilePage;