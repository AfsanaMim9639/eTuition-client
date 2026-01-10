import { useEffect, useRef } from 'react';
import { FaRocket, FaUsers, FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const About = () => {
  const { isDark } = useTheme();

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className={`min-h-screen pt-12 pb-12 transition-colors duration-300 ${
      isDark ? 'bg-dark-bg' : 'bg-green-200'
    }`}>
      <div className="container mx-auto px-4">
        {/* Centered Header */}
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h1 className={`text-5xl font-bold mb-4 ${
            isDark ? '' : 'text-gray-900'
          }`}>
            About <span className={isDark ? 'gradient-text' : 'text-gradient-light'}>eTuitionBD</span>
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${
            isDark ? 'text-gray-400' : 'text-gray-700'
          }`}>
            Connecting students with qualified tutors for quality education
          </p>
        </motion.div>
        
        {/* Centered Cards Grid */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div 
            className={`p-8 text-center rounded-xl ${
              isDark 
                ? 'card-neon card-neon-pink' 
                : 'bg-white shadow-xl border-2 border-pink-300 hover:shadow-2xl'
            }`}
            variants={fadeInUp}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <FaRocket className={`text-5xl mx-auto mb-4 ${
              isDark ? 'text-neon-pink' : 'text-pink-600'
            }`} />
            <h3 className={`text-2xl font-bold mb-3 ${
              isDark ? 'neon-text-pink' : 'text-pink-700'
            }`}>Our Mission</h3>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              Make quality education accessible to everyone through technology and innovation
            </p>
          </motion.div>
          
          <motion.div 
            className={`p-8 text-center rounded-xl ${
              isDark 
                ? 'card-neon card-neon-blue' 
                : 'bg-white shadow-xl border-2 border-blue-300 hover:shadow-2xl'
            }`}
            variants={fadeInUp}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <FaUsers className={`text-5xl mx-auto mb-4 ${
              isDark ? 'text-neon-blue' : 'text-blue-600'
            }`} />
            <h3 className={`text-2xl font-bold mb-3 ${
              isDark ? 'neon-text-blue' : 'text-blue-700'
            }`}>Our Community</h3>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              1000+ students and 500+ tutors actively learning and teaching together
            </p>
          </motion.div>
          
          <motion.div 
            className={`p-8 text-center rounded-xl ${
              isDark 
                ? 'card-neon card-neon-green' 
                : 'bg-white shadow-xl border-2 border-green-300 hover:shadow-2xl'
            }`}
            variants={fadeInUp}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <FaHeart className={`text-5xl mx-auto mb-4 ${
              isDark ? 'text-neon-green' : 'text-green-600'
            }`} />
            <h3 className={`text-2xl font-bold mb-3 ${
              isDark ? 'neon-text-green' : 'text-green-700'
            }`}>Our Values</h3>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              Quality, integrity, and student success at the heart of everything we do
            </p>
          </motion.div>
        </motion.div>

        {/* Story Section */}
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className={`p-8 rounded-xl ${
            isDark 
              ? 'card-neon card-neon-blue' 
              : 'bg-white shadow-xl border-2 border-emerald-300'
          }`}>
            <h2 className={`text-3xl font-bold mb-6 text-center ${
              isDark ? 'neon-text-blue' : 'text-emerald-700'
            }`}>Our Story</h2>
            <p className={`leading-relaxed mb-4 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              eTuitionBD was founded with a simple yet powerful vision: to bridge the gap between 
              students seeking quality education and talented tutors eager to share their knowledge 
              in Bangladesh. We understand that finding the right tutor can transform a student's 
              learning journey, and we're committed to making this process easier for families across 
              the country.
            </p>
            <p className={`leading-relaxed mb-4 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Born from the challenges faced by students and parents in finding qualified tutors, 
              eTuitionBD has grown into a trusted platform that connects learners with experienced 
              educators. We recognize the unique educational landscape of Bangladesh and have tailored 
              our platform to meet the specific needs of our community - from SSC and HSC preparation 
              to university-level courses and professional skill development.
            </p>
            <p className={`leading-relaxed mb-4 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Our platform leverages modern technology to make this connection seamless, efficient, 
              and accessible to everyone. We've built features that allow parents to browse tutor 
              profiles, check qualifications, read reviews, and connect directly with tutors who match 
              their requirements. For tutors, we provide a platform to showcase their expertise, build 
              their reputation, and reach students who need their guidance.
            </p>
            <p className={`leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Whether you're a student looking for academic support, a parent searching for the perfect 
              tutor for your child, or a tutor wanting to make a difference in students' lives, eTuitionBD 
              is here to help you succeed. Together, we're building a stronger educational community in 
              Bangladesh, one connection at a time.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;