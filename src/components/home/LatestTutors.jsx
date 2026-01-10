import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, ArrowRight, Loader, MapPin, Briefcase, Star } from 'lucide-react';
import { userAPI } from '../../utils/api';
import { useTheme } from '../../contexts/ThemeContext';

const LatestTutors = () => {
  const { isDark } = useTheme();
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLatestTutors();
  }, []);

  const fetchLatestTutors = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getLatestTutors();
      
      // Handle multiple possible response structures
      const tutorData = response.data.tutors || response.data.data || response.data;
      setTutors(Array.isArray(tutorData) ? tutorData : []);
      setError(null);
    } catch (err) {
      console.error('Error fetching tutors:', err);
      setError(err.response?.data?.message || 'Failed to load tutors. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <section className={`py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden ${
      isDark ? '' : 'bg-gradient-to-b from-emerald-200 via-teal-100 to-emerald-200'
    }`}>
      {/* Background gradient - Dark mode only */}
      {isDark && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1512] via-[#0a0f0d] to-[#0f1512] opacity-50" />
      )}
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00ffcc] to-[#00ff88] flex items-center justify-center">
              <Users className={`w-6 h-6 ${isDark ? 'text-[#0a0f0d]' : 'text-white'}`} />
            </div>
          </div>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${
            isDark ? '' : 'text-gray-900'
          }`}>
            Featured{' '}
            <span className="bg-gradient-to-r from-[#00ffcc] to-[#00ff88] bg-clip-text text-transparent">
              Tutors
            </span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            isDark ? 'text-gray-400' : 'text-gray-700'
          }`}>
            Connect with experienced and qualified tutors ready to help you succeed
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader className={`w-12 h-12 animate-spin mb-4 ${
              isDark ? 'text-[#00ffcc]' : 'text-cyan-600'
            }`} />
            <p className={isDark ? 'text-gray-400' : 'text-gray-700'}>
              Loading featured tutors...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-20">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full border-2 mb-4 ${
              isDark 
                ? 'bg-red-500/10 border-red-500/30' 
                : 'bg-red-50 border-red-200'
            }`}>
              <span className="text-2xl">⚠️</span>
            </div>
            <p className={`mb-4 ${isDark ? 'text-red-400' : 'text-red-600'}`}>
              {error}
            </p>
            <button
              onClick={fetchLatestTutors}
              className={`px-6 py-2 bg-gradient-to-r from-[#00ffcc] to-[#00ff88] rounded-lg font-semibold transition-all ${
                isDark 
                  ? 'text-[#0a0f0d] hover:shadow-lg hover:shadow-[#00ffcc]/30' 
                  : 'text-white hover:shadow-lg hover:shadow-cyan-300/50'
              }`}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Tutors Grid */}
        {!loading && !error && (
          <>
            {tutors.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
              >
                {tutors.slice(0, 6).map((tutor) => (
                  <motion.div
                    key={tutor._id || tutor.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ 
                      y: -8,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <Link 
                      to={`/tutors/${tutor._id || tutor.id}`} 
                      className={`block p-6 rounded-xl border-2 transition-all duration-300 shadow-lg group h-full flex flex-col ${
                        isDark
                          ? 'bg-gradient-to-br from-[#0a0f0d] via-[#0f1512] to-[#0a0f0d] border-[#00ffcc]/30 hover:border-[#00ffcc] hover:shadow-[#00ffcc]/20'
                          : 'bg-white border-cyan-200 hover:border-cyan-400 hover:shadow-cyan-200/50'
                      }`}
                    >
                      {/* Profile Image & Rating */}
                      <div className="text-center mb-4">
                        <div className="relative inline-block mb-4">
                          <img 
                            src={tutor.profileImage || 'https://i.ibb.co/qpB9ZNp/default-avatar.png'} 
                            alt={tutor.name}
                            className={`w-24 h-24 rounded-full border-4 transition-all duration-300 object-cover mx-auto ${
                              isDark
                                ? 'border-[#00ffcc]/50 group-hover:border-[#00ffcc]'
                                : 'border-cyan-300 group-hover:border-cyan-500'
                            }`}
                          />
                          {/* Rating Badge */}
                          <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full border-2 flex items-center space-x-1 ${
                            isDark
                              ? 'bg-[#0a0f0d] border-[#00ff88]'
                              : 'bg-white border-emerald-500'
                          }`}>
                            <Star className={`w-3 h-3 ${
                              isDark ? 'text-[#00ff88] fill-[#00ff88]' : 'text-emerald-600 fill-emerald-600'
                            }`} />
                            <span className={`text-sm font-bold ${
                              isDark ? 'text-[#00ff88]' : 'text-emerald-700'
                            }`}>
                              {tutor.rating !== undefined && tutor.rating !== null ? tutor.rating.toFixed(1) : '0.0'}
                            </span>
                          </div>
                        </div>

                        {/* Name */}
                        <h3 className={`text-xl font-bold mb-2 transition-colors min-h-[32px] line-clamp-1 ${
                          isDark
                            ? 'text-[#00ffcc] group-hover:text-[#00ff88]'
                            : 'text-cyan-700 group-hover:text-emerald-700'
                        }`}>
                          {tutor.name}
                        </h3>

                        {/* Location & Experience */}
                        <div className="space-y-2 mb-4">
                          {tutor.location && (
                            <div className={`flex items-center justify-center space-x-2 text-sm ${
                              isDark ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              <MapPin className={`w-4 h-4 flex-shrink-0 ${
                                isDark ? 'text-[#00ff88]' : 'text-emerald-600'
                              }`} />
                              <span className="truncate">{tutor.location}</span>
                            </div>
                          )}
                          {tutor.experience !== undefined && tutor.experience !== null && tutor.experience > 0 && (
                            <div className={`flex items-center justify-center space-x-2 text-sm ${
                              isDark ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              <Briefcase className={`w-4 h-4 flex-shrink-0 ${
                                isDark ? 'text-[#00ff88]' : 'text-emerald-600'
                              }`} />
                              <span>
                                {tutor.experience} {tutor.experience === 1 ? 'year' : 'years'} experience
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Subjects */}
                      <div className="flex flex-wrap gap-2 justify-center mb-4 min-h-[16px]">
                        {tutor.subjects && Array.isArray(tutor.subjects) && tutor.subjects.length > 0 ? (
                          <>
                            {tutor.subjects.slice(0, 3).map((subject, index) => (
                              <span 
                                key={index} 
                                className={`px-3 py-1 border text-xs ${
                                  isDark
                                    ? 'bg-[#00ffcc]/20 border-[#00ffcc]/30 text-[#00ffcc]'
                                    : 'bg-cyan-50 border-cyan-300 text-cyan-700'
                                }`}
                              >
                                {subject}
                              </span>
                            ))}
                            {tutor.subjects.length > 3 && (
                              <span className={`px-3 py-1 border text-xs ${
                                isDark
                                  ? 'bg-gray-700/50 border-gray-600 text-gray-400'
                                  : 'bg-gray-100 border-gray-300 text-gray-600'
                              }`}>
                                +{tutor.subjects.length - 3} more
                              </span>
                            )}
                          </>
                        ) : (
                          <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                            No subjects listed
                          </span>
                        )}
                      </div>

                      {/* Spacer */}
                      <div className="flex-grow"></div>

                      {/* View Profile Button */}
                      <div className={`pt-4 border-t ${
                        isDark ? 'border-[#00ffcc]/30' : 'border-cyan-200'
                      }`}>
                        <div className="text-center">
                          <span className={`inline-block px-6 py-2 border rounded-lg font-semibold transition-all duration-300 ${
                            isDark
                              ? 'bg-[#00ffcc]/10 border-[#00ffcc] text-[#00ffcc] group-hover:bg-[#00ffcc] group-hover:text-[#0a0f0d]'
                              : 'bg-cyan-50 border-cyan-500 text-cyan-700 group-hover:bg-cyan-600 group-hover:text-white'
                          }`}>
                            View Profile
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-20">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full border-2 mb-4 ${
                  isDark 
                    ? 'bg-[#00ffcc]/10 border-[#00ffcc]/30' 
                    : 'bg-cyan-50 border-cyan-200'
                }`}>
                  <Users className={`w-8 h-8 ${
                    isDark ? 'text-[#00ffcc]' : 'text-cyan-600'
                  }`} />
                </div>
                <p className={`text-lg mb-6 ${
                  isDark ? 'text-gray-400' : 'text-gray-700'
                }`}>
                  No tutors available yet
                </p>
                <Link
                  to="/register?role=tutor"
                  className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00ffcc] to-[#00ff88] rounded-lg font-semibold transition-all ${
                    isDark 
                      ? 'text-[#0a0f0d] hover:shadow-lg hover:shadow-[#00ffcc]/30' 
                      : 'text-white hover:shadow-lg hover:shadow-cyan-300/50'
                  }`}
                >
                  Become a Tutor
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            )}

            {/* View All Button */}
            {tutors.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-center"
              >
                <Link
                  to="/tutors"
                  className={`inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#00ffcc] to-[#00ff88] rounded-lg text-lg font-bold transition-all group ${
                    isDark 
                      ? 'text-[#0a0f0d] hover:shadow-lg hover:shadow-[#00ffcc]/30' 
                      : 'text-white hover:shadow-lg hover:shadow-cyan-300/50'
                  }`}
                >
                  <span>View All Tutors</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default LatestTutors;