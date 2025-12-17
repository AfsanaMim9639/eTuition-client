import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, ArrowRight, Loader, MapPin, Briefcase, Star } from 'lucide-react';
import { userAPI } from '../../utils/api';

const LatestTutors = () => {
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
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f1512] via-[#0a0f0d] to-[#0f1512] opacity-50" />
      
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
              <Users className="w-6 h-6 text-[#0a0f0d]" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Featured{' '}
            <span className="bg-gradient-to-r from-[#00ffcc] to-[#00ff88] bg-clip-text text-transparent">
              Tutors
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Connect with experienced and qualified tutors ready to help you succeed
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader className="w-12 h-12 text-[#00ffcc] animate-spin mb-4" />
            <p className="text-gray-400">Loading featured tutors...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 border-2 border-red-500/30 mb-4">
              <span className="text-2xl">⚠️</span>
            </div>
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={fetchLatestTutors}
              className="px-6 py-2 bg-gradient-to-r from-[#00ffcc] to-[#00ff88] text-[#0a0f0d] rounded-lg font-semibold hover:shadow-lg hover:shadow-[#00ffcc]/30 transition-all"
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
                      className="block p-6 rounded-xl bg-gradient-to-br from-[#0a0f0d] via-[#0f1512] to-[#0a0f0d] border-2 border-[#00ffcc]/30 hover:border-[#00ffcc] transition-all duration-300 shadow-lg hover:shadow-[#00ffcc]/20 group h-full flex flex-col"
                    >
                      {/* Profile Image & Rating */}
                      <div className="text-center mb-4">
                        <div className="relative inline-block mb-4">
                          <img 
                            src={tutor.profileImage || 'https://i.ibb.co/qpB9ZNp/default-avatar.png'} 
                            alt={tutor.name}
                            className="w-24 h-24 rounded-full border-4 border-[#00ffcc]/50 group-hover:border-[#00ffcc] transition-all duration-300 object-cover mx-auto"
                          />
                          {/* Rating Badge */}
                          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-[#0a0f0d] px-3 py-1 rounded-full border-2 border-[#00ff88] flex items-center space-x-1">
                            <Star className="w-3 h-3 text-[#00ff88] fill-[#00ff88]" />
                            <span className="text-sm font-bold text-[#00ff88]">
                              {tutor.rating !== undefined && tutor.rating !== null ? tutor.rating.toFixed(1) : '0.0'}
                            </span>
                          </div>
                        </div>

                        {/* Name */}
                        <h3 className="text-xl font-bold text-[#00ffcc] mb-2 group-hover:text-[#00ff88] transition-colors min-h-[32px] line-clamp-1">
                          {tutor.name}
                        </h3>

                        {/* Location & Experience */}
                        <div className="space-y-2 mb-4">
                          {tutor.location && (
                            <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm">
                              <MapPin className="w-4 h-4 text-[#00ff88] flex-shrink-0" />
                              <span className="truncate">{tutor.location}</span>
                            </div>
                          )}
                          {tutor.experience !== undefined && tutor.experience !== null && tutor.experience > 0 && (
                            <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm">
                              <Briefcase className="w-4 h-4 text-[#00ff88] flex-shrink-0" />
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
                                className="px-3 py-1 bg-[#00ffcc]/20 border border-[#00ffcc]/30  text-xs text-[#00ffcc]"
                              >
                                {subject}
                              </span>
                            ))}
                            {tutor.subjects.length > 3 && (
                              <span className="px-3 py-1 bg-gray-700/50 border border-gray-600  text-xs text-gray-400">
                                +{tutor.subjects.length - 3} more
                              </span>
                            )}
                          </>
                        ) : (
                          <span className="text-xs text-gray-500">No subjects listed</span>
                        )}
                      </div>

                      {/* Spacer */}
                      <div className="flex-grow"></div>

                      {/* View Profile Button */}
                      <div className="pt-4 border-t border-[#00ffcc]/30">
                        <div className="text-center">
                          <span className="inline-block px-6 py-2 bg-[#00ffcc]/10 border border-[#00ffcc] rounded-lg text-[#00ffcc] font-semibold group-hover:bg-[#00ffcc] group-hover:text-[#0a0f0d] transition-all duration-300">
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
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#00ffcc]/10 border-2 border-[#00ffcc]/30 mb-4">
                  <Users className="w-8 h-8 text-[#00ffcc]" />
                </div>
                <p className="text-gray-400 text-lg mb-6">No tutors available yet</p>
                <Link
                  to="/register?role=tutor"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00ffcc] to-[#00ff88] text-[#0a0f0d] rounded-lg font-semibold hover:shadow-lg hover:shadow-[#00ffcc]/30 transition-all"
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
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#00ffcc] to-[#00ff88] text-[#0a0f0d] rounded-lg text-lg font-bold hover:shadow-lg hover:shadow-[#00ffcc]/30 transition-all group"
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