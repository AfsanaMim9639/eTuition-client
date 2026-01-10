import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight, Loader } from 'lucide-react';
import TuitionCard from '../tuition/TuitionCard';
import { tuitionAPI } from '../../utils/api';
import { useTheme } from '../../contexts/ThemeContext';

const LatestTuitions = () => {
  const { isDark } = useTheme();
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLatestTuitions();
  }, []);

  const fetchLatestTuitions = async () => {
    try {
      setLoading(true);
      const response = await tuitionAPI.getLatestTuitions();
      
      // Handle multiple possible response structures
      let tuitionData = [];
      if (response.data) {
        tuitionData = response.data.tuitions || 
                      response.data.data || 
                      (Array.isArray(response.data) ? response.data : []);
      }
      
      // Ensure we have an array
      setTuitions(Array.isArray(tuitionData) ? tuitionData : []);
      setError(null);
    } catch (err) {
      console.error('Error fetching tuitions:', err);
      setError(err.response?.data?.message || 'Failed to load tuitions. Please try again later.');
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
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f0d] via-[#0f1512] to-[#0a0f0d] opacity-50" />
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
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00ff88] to-[#00ffcc] flex items-center justify-center">
              <BookOpen className={`w-6 h-6 ${isDark ? 'text-[#0a0f0d]' : 'text-white'}`} />
            </div>
          </div>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${
            isDark ? '' : 'text-gray-900'
          }`}>
            Latest{' '}
            <span className="bg-gradient-to-r from-[#00ff88] to-[#00ffcc] bg-clip-text text-transparent">
              Tuition Posts
            </span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Browse the most recent tuition opportunities and find your perfect match
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader className={`w-12 h-12 animate-spin mb-4 ${
              isDark ? 'text-[#00ff88]' : 'text-emerald-600'
            }`} />
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              Loading latest tuitions...
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
              onClick={fetchLatestTuitions}
              className={`px-6 py-2 bg-gradient-to-r from-[#00ff88] to-[#00ffcc] rounded-lg font-semibold transition-all ${
                isDark 
                  ? 'text-[#0a0f0d] hover:shadow-lg hover:shadow-[#00ff88]/30' 
                  : 'text-white hover:shadow-lg hover:shadow-emerald-300/50'
              }`}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Tuitions Grid */}
        {!loading && !error && (
          <>
            {tuitions.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 auto-rows-fr"
              >
                {tuitions.map((tuition) => (
                  <TuitionCard 
                    key={tuition._id || tuition.id} 
                    tuition={tuition} 
                  />
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-20">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full border-2 mb-4 ${
                  isDark 
                    ? 'bg-[#00ff88]/10 border-[#00ff88]/30' 
                    : 'bg-emerald-50 border-emerald-200'
                }`}>
                  <BookOpen className={`w-8 h-8 ${
                    isDark ? 'text-[#00ff88]' : 'text-emerald-600'
                  }`} />
                </div>
                <p className={`text-lg mb-6 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  No tuitions available yet
                </p>
                <Link
                  to="/post-tuition"
                  className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00ff88] to-[#00ffcc] rounded-lg font-semibold transition-all ${
                    isDark 
                      ? 'text-[#0a0f0d] hover:shadow-lg hover:shadow-[#00ff88]/30' 
                      : 'text-white hover:shadow-lg hover:shadow-emerald-300/50'
                  }`}
                >
                  Post First Tuition
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            )}

            {/* View All Button */}
            {tuitions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-center"
              >
                <Link
                  to="/tuitions"
                  className={`inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#00ff88] to-[#00ffcc] rounded-lg text-lg font-bold transition-all group ${
                    isDark 
                      ? 'text-[#0a0f0d] hover:shadow-lg hover:shadow-[#00ff88]/30' 
                      : 'text-white hover:shadow-lg hover:shadow-emerald-300/50'
                  }`}
                >
                  <span>View All Tuitions</span>
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

export default LatestTuitions;