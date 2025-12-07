import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaGraduationCap, FaDollarSign, FaArrowRight } from 'react-icons/fa';
import api from '../../utils/api';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LatestTutors = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestTutors();
  }, []);

  useEffect(() => {
    if (tutors.length > 0) {
      gsap.fromTo(
        '.tutor-card-home',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.tutor-grid',
            start: 'top bottom-=100',
          }
        }
      );
    }
  }, [tutors]);

  const fetchLatestTutors = async () => {
    try {
      const response = await api.get('/users/tutors/latest');
      setTutors(response.data.tutors);
    } catch (error) {
      console.error('Error fetching tutors:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-dark-card">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="spinner-neon w-12 h-12 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-dark-card">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Top <span className="gradient-text">Tutors</span>
            </h2>
            <p className="text-xl text-gray-400">
              Meet our experienced and qualified tutors
            </p>
          </div>
          <Link 
            to="/tutors"
            className="btn btn-neon-blue px-6 py-3 rounded-lg font-semibold hidden md:flex items-center space-x-2"
          >
            <span>View All</span>
            <FaArrowRight />
          </Link>
        </div>

        {/* Tutors Grid */}
        <div className="tutor-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutors.map((tutor) => (
            <Link
              key={tutor._id}
              to={`/tutors/${tutor._id}`}
              className="tutor-card-home card-neon card-neon-blue p-6 rounded-xl text-center group"
            >
              {/* Avatar */}
              <div className="relative inline-block mb-4">
                <img 
                  src={tutor.profileImage || 'https://i.ibb.co/qpB9ZNp/default-avatar.png'} 
                  alt={tutor.name}
                  className="w-24 h-24 rounded-full neon-border-blue mx-auto group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-dark-bg px-3 py-1 rounded-full border-2 border-neon-green flex items-center space-x-1">
                  <FaStar className="text-neon-green text-xs" />
                  <span className="text-sm font-bold text-neon-green">
                    {tutor.rating || 5.0}
                  </span>
                </div>
              </div>

              {/* Name */}
              <h3 className="text-xl font-bold neon-text-blue mb-2 group-hover:text-neon-pink transition-colors">
                {tutor.name}
              </h3>

              {/* Education */}
              <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm mb-4">
                <FaGraduationCap className="text-neon-pink" />
                <span className="truncate">{tutor.education}</span>
              </div>

              {/* Subjects */}
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {tutor.subjects?.slice(0, 3).map((subject, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-neon-blue/20 border border-neon-blue/30 rounded-full text-xs text-neon-blue"
                  >
                    {subject}
                  </span>
                ))}
                {tutor.subjects?.length > 3 && (
                  <span className="px-3 py-1 bg-neon-pink/20 border border-neon-pink/30 rounded-full text-xs text-neon-pink">
                    +{tutor.subjects.length - 3} more
                  </span>
                )}
              </div>

              {/* Rate */}
              <div className="pt-4 border-t border-neon-blue/30">
                <div className="flex items-center justify-center space-x-2">
                  <FaDollarSign className="text-neon-green" />
                  <span className="font-bold text-neon-green">
                    {tutor.hourlyRate || 500} BDT/hour
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="text-center mt-8 md:hidden">
          <Link 
            to="/tutors"
            className="btn btn-neon-blue px-8 py-3 rounded-lg font-semibold inline-flex items-center space-x-2"
          >
            <span>View All Tutors</span>
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestTutors;