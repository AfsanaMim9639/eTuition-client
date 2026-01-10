import { Link } from 'react-router-dom';
import { Search, GraduationCap, Users, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const HeroSection = () => {
  const { isDark } = useTheme();

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'backOut'
      }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.2,
        duration: 0.6,
        ease: 'easeOut'
      }
    }),
    hover: {
      y: -10,
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden ${
      isDark ? '' : 'bg-gradient-to-b from-emerald-200 via-teal-100 to-emerald-200'
    }`}>
      {/* Animated background circles */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#00ff88]/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#00ffcc]/10 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.6, 0.3, 0.6]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight ${
              isDark ? '' : 'text-gray-900'
            }`}
          >
            Find Your Perfect{' '}
            <span className="bg-gradient-to-r from-[#00ff88] to-[#00ffcc] bg-clip-text text-transparent">
              Tutor
            </span>
            <br />
            Start Learning{' '}
            <span className={isDark ? 'text-[#00ffcc]' : 'text-cyan-600'}>
              Today
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className={`text-lg sm:text-xl md:text-2xl mb-12 leading-relaxed ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Connect with qualified tutors and achieve your academic goals.
            <br className="hidden sm:block" />
            Quality education is just a click away!
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={containerVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Link
                to="/tuitions"
                className={`group relative px-8 py-4 bg-gradient-to-r from-[#00ff88] to-[#00ffcc] rounded-lg text-lg font-bold flex items-center gap-3 w-full sm:w-auto overflow-hidden shadow-lg ${
                  isDark ? 'text-[#0a0f0d] shadow-[#00ff88]/30' : 'text-white shadow-emerald-300/50'
                }`}
              >
                <Search className="w-5 h-5" />
                <span>Find Tuitions</span>
              </Link>
            </motion.div>

            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Link
                to="/tutors"
                className={`group px-8 py-4 border-2 rounded-lg text-lg font-bold flex items-center gap-3 w-full sm:w-auto transition-all shadow-lg ${
                  isDark 
                    ? 'bg-[#0a0f0d] border-[#00ff88] text-[#00ff88] hover:bg-[#00ff88]/10 shadow-[#00ff88]/20'
                    : 'bg-white border-emerald-600 text-emerald-700 hover:bg-emerald-50 shadow-emerald-200/50'
                }`}
              >
                <Users className="w-5 h-5" />
                <span>Browse Tutors</span>
              </Link>
            </motion.div>

            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Link
                to="/register"
                className={`group px-8 py-4 border-2 rounded-lg text-lg font-bold flex items-center gap-3 w-full sm:w-auto transition-all shadow-lg ${
                  isDark
                    ? 'bg-[#0a0f0d] border-[#00ffcc] text-[#00ffcc] hover:bg-[#00ffcc]/10 shadow-[#00ffcc]/20'
                    : 'bg-white border-cyan-600 text-cyan-700 hover:bg-cyan-50 shadow-cyan-200/50'
                }`}
              >
                <GraduationCap className="w-5 h-5" />
                <span>Register Now</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            <motion.div
              custom={0}
              variants={cardVariants}
              whileHover="hover"
              className={`rounded-xl p-6 shadow-lg backdrop-blur-sm ${
                isDark
                  ? 'bg-gradient-to-br from-[#0a0f0d] via-[#0f1512] to-[#0a0f0d] border-2 border-[#00ff88]/30 shadow-[#00ff88]/10'
                  : 'bg-white border-2 border-emerald-200 shadow-emerald-100/50'
              }`}
            >
              <motion.div variants={floatingVariants} animate="animate">
                <div className={`w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-[#00ff88] to-[#00ffcc] rounded-lg flex items-center justify-center ${
                  isDark ? '' : 'shadow-lg shadow-emerald-300/50'
                }`}>
                  <Users className={`w-6 h-6 ${isDark ? 'text-[#0a0f0d]' : 'text-white'}`} />
                </div>
              </motion.div>
              <div className="text-4xl font-bold bg-gradient-to-r from-[#00ff88] to-[#00ffcc] bg-clip-text text-transparent mb-2">
                500+
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Active Tutors
              </div>
            </motion.div>

            <motion.div
              custom={1}
              variants={cardVariants}
              whileHover="hover"
              className={`rounded-xl p-6 shadow-lg backdrop-blur-sm ${
                isDark
                  ? 'bg-gradient-to-br from-[#0a0f0d] via-[#0f1512] to-[#0a0f0d] border-2 border-[#00ffcc]/30 shadow-[#00ffcc]/10'
                  : 'bg-white border-2 border-cyan-200 shadow-cyan-100/50'
              }`}
            >
              <motion.div
                variants={floatingVariants}
                animate="animate"
                transition={{ delay: 0.3 }}
              >
                <div className={`w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-[#00ffcc] to-[#00ff88] rounded-lg flex items-center justify-center ${
                  isDark ? '' : 'shadow-lg shadow-cyan-300/50'
                }`}>
                  <GraduationCap className={`w-6 h-6 ${isDark ? 'text-[#0a0f0d]' : 'text-white'}`} />
                </div>
              </motion.div>
              <div className="text-4xl font-bold bg-gradient-to-r from-[#00ffcc] to-[#00ff88] bg-clip-text text-transparent mb-2">
                1000+
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Happy Students
              </div>
            </motion.div>

            <motion.div
              custom={2}
              variants={cardVariants}
              whileHover="hover"
              className={`rounded-xl p-6 shadow-lg backdrop-blur-sm ${
                isDark
                  ? 'bg-gradient-to-br from-[#0a0f0d] via-[#0f1512] to-[#0a0f0d] border-2 border-[#00ff88]/30 shadow-[#00ff88]/10'
                  : 'bg-white border-2 border-emerald-200 shadow-emerald-100/50'
              }`}
            >
              <motion.div
                variants={floatingVariants}
                animate="animate"
                transition={{ delay: 0.6 }}
              >
                <div className={`w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-[#00ff88] to-[#00ffcc] rounded-lg flex items-center justify-center ${
                  isDark ? '' : 'shadow-lg shadow-emerald-300/50'
                }`}>
                  <BookOpen className={`w-6 h-6 ${isDark ? 'text-[#0a0f0d]' : 'text-white'}`} />
                </div>
              </motion.div>
              <div className="text-4xl font-bold bg-gradient-to-r from-[#00ff88] to-[#00ffcc] bg-clip-text text-transparent mb-2">
                50+
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Subjects Available
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;