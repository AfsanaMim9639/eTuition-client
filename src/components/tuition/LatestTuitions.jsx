import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight, Loader } from 'lucide-react';
import TuitionCard from '../tuitions/TuitionCard';
import { tuitionAPI } from '../../services/api';

const LatestTuitions = () => {
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
      setTuitions(response.data.tuitions);
      setError(null);
    } catch (err) {
      console.error('Error fetching tuitions:', err);
      setError('Failed to load tuitions. Please try again later.');
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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f0d] via-[#0f1512] to-[#0a0f0d] opacity-50" />
      
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
              <BookOpen className="w-6 h-6 text-[#0a0f0d]" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Latest{' '}
            <span className="bg-gradient-to-r from-[#00ff88] to-[#00ffcc] bg-clip-text text-transparent">
              Tuition Posts
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Browse the most recent tuition opportunities and find your perfect match
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader className="w-12 h-12 text-[#00ff88] animate-spin mb-4" />
            <p className="text-gray-400">Loading latest tuitions...</p>
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
              onClick={fetchLatestTuitions}
              className="px-6 py-2 bg-gradient-to-r from-[#00ff88] to-[#00ffcc] text-[#0a0f0d] rounded-lg font-semibold hover:shadow-lg hover:shadow-[#00ff88]/30 transition-all"
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
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
              >
                {tuitions.map((tuition) => (
                  <motion.div key={tuition._id} variants={itemVariants}>
                    <TuitionCard tuition={tuition} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#00ff88]/10 border-2 border-[#00ff88]/30 mb-4">
                  <BookOpen className="w-8 h-8 text-[#00ff88]" />
                </div>
                <p className="text-gray-400 text-lg mb-6">No tuitions available yet</p>
                <Link
                  to="/post-tuition"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00ff88] to-[#00ffcc] text-[#0a0f0d] rounded-lg font-semibold hover:shadow-lg hover:shadow-[#00ff88]/30 transition-all"
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
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#00ff88] to-[#00ffcc] text-[#0a0f0d] rounded-lg text-lg font-bold hover:shadow-lg hover:shadow-[#00ff88]/30 transition-all group"
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