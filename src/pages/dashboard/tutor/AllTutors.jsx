import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaGraduationCap } from 'react-icons/fa';
import api from '../../utils/api';

export const AllTutors = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTutors();
  }, []);

  const fetchTutors = async () => {
    try {
      const response = await api.get('/users/tutors');
      setTutors(response.data.tutors);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-dark-bg pt-24 flex items-center justify-center"><div className="spinner-neon w-12 h-12"></div></div>;

  return (
    <div className="min-h-screen bg-dark-bg pt-24 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-12">
          All <span className="gradient-text">Tutors</span>
        </h1>
        
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tutors.map(tutor => (
            <Link key={tutor._id} to={`/tutors/${tutor._id}`} className="card-neon card-neon-blue p-6 rounded-xl text-center group">
              <img src={tutor.profileImage} alt={tutor.name} className="w-24 h-24 rounded-full mx-auto mb-4 neon-border-blue" />
              <h3 className="text-xl font-bold neon-text-blue mb-2 group-hover:text-neon-pink transition-colors">{tutor.name}</h3>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-3">
                <FaGraduationCap className="text-neon-pink" />
                <span>{tutor.education}</span>
              </div>
              <div className="flex justify-center gap-1 mb-3">
                {tutor.subjects?.slice(0, 2).map((s, i) => (
                  <span key={i} className="px-2 py-1 bg-neon-blue/20 border border-neon-blue/30 rounded text-xs text-neon-blue">{s}</span>
                ))}
              </div>
              <div className="flex items-center justify-center gap-1 text-neon-green">
                <FaStar />
                <span className="font-bold">{tutor.rating || 5.0}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
