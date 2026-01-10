import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa';
import { userAPI } from '../../utils/api';
import { useTheme } from '../../contexts/ThemeContext';

function AllTutors() {
  const { isDark } = useTheme();
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    subject: '',
    location: '',
    minRating: '',
    minExperience: ''
  });

  // Auto-search with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchTutors();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [filters]);

  const fetchTutors = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {};
      if (filters.search) params.search = filters.search;
      if (filters.subject) params.subject = filters.subject;
      if (filters.location) params.location = filters.location;
      if (filters.minRating) params.minRating = filters.minRating;
      if (filters.minExperience) params.minExperience = filters.minExperience;
      
      const response = await userAPI.getAllTutors(params);
      
      const tutorData = response.data.tutors || response.data.data || response.data;
      setTutors(Array.isArray(tutorData) ? tutorData : []);
    } catch (error) {
      console.error('Error fetching tutors:', error);
      setError(error.response?.data?.message || 'Failed to load tutors. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      subject: '',
      location: '',
      minRating: '',
      minExperience: ''
    });
  };

  if (loading && tutors.length === 0) {
    return (
      <div className={`min-h-screen pt-24 flex items-center justify-center transition-colors duration-300 ${
        isDark ? 'bg-dark-bg' : 'bg-green-200'
      }`}>
        <div className="spinner-neon w-12 h-12"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-12 pb-12 transition-colors duration-300 ${
      isDark ? 'bg-dark-bg' : 'bg-green-200'
    }`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <h1 className={`text-4xl md:text-5xl font-bold text-center mb-4 ${
          isDark ? '' : 'text-gray-900'
        }`}>
          All <span className={isDark ? 'gradient-text' : 'text-gradient-light'}>Tutors</span>
        </h1>
        <p className={`text-center mb-12 ${
          isDark ? 'text-gray-400' : 'text-gray-700'
        }`}>
          Browse {tutors.length}+ qualified tutors ready to help you succeed
        </p>

        {/* Filters */}
        <div className={`p-6 rounded-xl mb-8 max-w-5xl mx-auto ${
          isDark 
            ? 'card-neon card-neon-blue' 
            : 'bg-white shadow-xl border-2 border-emerald-300'
        }`}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Search by Name */}
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search by name..."
                className={isDark ? 'input-neon' : 'px-4 py-2 border-2 border-emerald-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-gray-900'}
              />
              
              {/* Subject */}
              <input
                type="text"
                name="subject"
                value={filters.subject}
                onChange={handleFilterChange}
                placeholder="Subject (e.g. Math)"
                className={isDark ? 'input-neon' : 'px-4 py-2 border-2 border-emerald-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-gray-900'}
              />
              
              {/* Location */}
              <input
                type="text"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                placeholder="Location (e.g. Dhaka)"
                className={isDark ? 'input-neon' : 'px-4 py-2 border-2 border-emerald-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-gray-900'}
              />
              
              {/* Min Rating */}
              <input
                type="number"
                name="minRating"
                value={filters.minRating}
                onChange={handleFilterChange}
                placeholder="Min Rating (0-5)"
                min="0"
                max="5"
                step="0.1"
                className={isDark ? 'input-neon' : 'px-4 py-2 border-2 border-emerald-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-gray-900'}
              />
              
              {/* Min Experience */}
              <input
                type="number"
                name="minExperience"
                value={filters.minExperience}
                onChange={handleFilterChange}
                placeholder="Min Experience (years)"
                min="0"
                className={isDark ? 'input-neon' : 'px-4 py-2 border-2 border-emerald-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-gray-900'}
              />
            </div>

            {/* Clear Filters Button */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={clearFilters}
                className={isDark 
                  ? 'btn-neon btn-neon-secondary px-6' 
                  : 'px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold shadow-lg'
                }
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Loading indicator while searching */}
        {loading && tutors.length > 0 && (
          <div className="text-center py-4">
            <div className="inline-block spinner-neon w-8 h-8"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
              isDark 
                ? 'bg-red-500/10 border-2 border-red-500/30' 
                : 'bg-red-100 border-2 border-red-300'
            }`}>
              <span className="text-2xl">⚠️</span>
            </div>
            <p className={`mb-4 ${isDark ? 'text-red-400' : 'text-red-600'}`}>{error}</p>
            <button
              onClick={fetchTutors}
              className={isDark 
                ? 'btn-neon btn-neon-primary' 
                : 'px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold shadow-lg'
              }
            >
              Try Again
            </button>
          </div>
        )}

        {/* Tutors Grid */}
        {!error && (
          <>
            {tutors.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {tutors.map(tutor => (
                  <Link 
                    key={tutor._id} 
                    to={`/tutors/${tutor._id}`} 
                    className={`p-6 rounded-xl text-center group hover:scale-105 transition-transform duration-300 ${
                      isDark 
                        ? 'card-neon card-neon-blue' 
                        : 'bg-white shadow-lg hover:shadow-2xl border-2 border-emerald-300'
                    }`}
                  >
                    {/* Profile Image */}
                    <div className="relative inline-block mb-4">
                      <img 
                        src={tutor.profileImage || 'https://i.ibb.co/qpB9ZNp/default-avatar.png'} 
                        alt={tutor.name} 
                        className={`w-24 h-24 rounded-full mx-auto object-cover ${
                          isDark ? 'neon-border-blue' : 'border-4 border-emerald-400'
                        }`}
                      />
                      {/* Rating Badge */}
                      <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full flex items-center gap-1 ${
                        isDark 
                          ? 'bg-dark-bg border-2 border-neon-green' 
                          : 'bg-emerald-500 border-2 border-emerald-600'
                      }`}>
                        <FaStar className={`text-xs ${isDark ? 'text-neon-green' : 'text-white'}`} />
                        <span className={`text-sm font-bold ${isDark ? 'text-neon-green' : 'text-white'}`}>
                          {tutor.rating?.toFixed(1) || '5.0'}
                        </span>
                      </div>
                    </div>

                    {/* Name */}
                    <h3 className={`text-xl font-bold mb-3 transition-colors line-clamp-1 ${
                      isDark 
                        ? 'neon-text-blue group-hover:text-neon-pink' 
                        : 'text-emerald-700 group-hover:text-purple-600'
                    }`}>
                      {tutor.name}
                    </h3>

                    {/* Location & Experience */}
                    <div className="space-y-2 mb-4">
                      {(tutor.address || tutor.location) && (
                        <div className={`flex items-center justify-center gap-2 text-sm ${
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          <FaMapMarkerAlt className={`flex-shrink-0 ${
                            isDark ? 'text-neon-pink' : 'text-purple-600'
                          }`} />
                          <span className="truncate">{tutor.address || tutor.location}</span>
                        </div>
                      )}
                      {tutor.experience !== undefined && tutor.experience !== null && (
                        <div className={`flex items-center justify-center gap-2 text-sm ${
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          <FaBriefcase className={`flex-shrink-0 ${
                            isDark ? 'text-neon-pink' : 'text-purple-600'
                          }`} />
                          <span>{tutor.experience} {tutor.experience === 1 ? 'year' : 'years'}</span>
                        </div>
                      )}
                    </div>

                    {/* Subjects */}
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                      {tutor.subjects?.slice(0, 3).map((subject, index) => (
                        <span 
                          key={index} 
                          className={`px-3 py-1 text-xs text-center ${
                            isDark 
                              ? 'bg-neon-blue/20 border border-neon-blue/30 text-neon-blue' 
                              : 'bg-emerald-100 border border-emerald-400 text-emerald-700'
                          }`}
                        >
                          {subject}
                        </span>
                      ))}
                      {tutor.subjects?.length > 3 && (
                        <span className={`px-3 py-1 text-xs text-center ${
                          isDark 
                            ? 'bg-gray-700/50 border border-gray-600 text-gray-400' 
                            : 'bg-gray-200 border border-gray-400 text-gray-600'
                        }`}>
                          +{tutor.subjects.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* View Profile Button */}
                    <div className={`pt-3 border-t ${
                      isDark ? 'border-neon-blue/30' : 'border-emerald-300'
                    }`}>
                      <span className={`font-semibold transition-colors ${
                        isDark 
                          ? 'text-neon-blue group-hover:text-neon-pink' 
                          : 'text-emerald-600 group-hover:text-purple-600'
                      }`}>
                        View Profile →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                  isDark 
                    ? 'bg-neon-blue/10 border-2 border-neon-blue/30' 
                    : 'bg-emerald-100 border-2 border-emerald-300'
                }`}>
                  <FaBriefcase className={`text-3xl ${
                    isDark ? 'text-neon-blue' : 'text-emerald-600'
                  }`} />
                </div>
                <h3 className={`text-2xl font-bold mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-800'
                }`}>No tutors found</h3>
                <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Try adjusting your search filters or{' '}
                  <button 
                    onClick={clearFilters}
                    className={`hover:underline ${
                      isDark ? 'text-neon-blue' : 'text-emerald-600 font-semibold'
                    }`}
                  >
                    clear all filters
                  </button>
                </p>
                <Link
                  to="/register?role=tutor"
                  className={isDark 
                    ? 'btn-neon btn-neon-primary inline-flex items-center gap-2' 
                    : 'inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold shadow-lg'
                  }
                >
                  Become a Tutor
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default AllTutors;