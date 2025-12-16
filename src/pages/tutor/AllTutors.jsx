import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa';
import { userAPI } from '../../utils/api';

function AllTutors() {
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

  useEffect(() => {
    fetchTutors();
  }, []);

  const fetchTutors = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Build query params
      const params = {};
      if (filters.search) params.search = filters.search;
      if (filters.subject) params.subject = filters.subject;
      if (filters.location) params.location = filters.location;
      if (filters.minRating) params.minRating = filters.minRating;
      if (filters.minExperience) params.minExperience = filters.minExperience;
      
      const response = await userAPI.getAllTutors(params);
      
      // Handle multiple possible response structures
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

  const handleSearch = (e) => {
    e.preventDefault();
    fetchTutors();
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      subject: '',
      location: '',
      minRating: '',
      minExperience: ''
    });
    // Fetch all tutors after clearing
    setTimeout(() => fetchTutors(), 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg pt-24 flex items-center justify-center">
        <div className="spinner-neon w-12 h-12"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg pt-12 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          All <span className="gradient-text">Tutors</span>
        </h1>
        <p className="text-center text-gray-400 mb-12">
          Browse {tutors.length}+ qualified tutors ready to help you succeed
        </p>

        {/* Filters */}
        <div className="card-neon card-neon-blue p-6 rounded-xl mb-8 max-w-5xl mx-auto">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Search by Name */}
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search by name..."
                className="input-neon"
              />
              
              {/* Subject */}
              <input
                type="text"
                name="subject"
                value={filters.subject}
                onChange={handleFilterChange}
                placeholder="Subject (e.g. Math)"
                className="input-neon"
              />
              
              {/* Location */}
              <input
                type="text"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                placeholder="Location (e.g. Dhaka)"
                className="input-neon"
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
                className="input-neon"
              />
              
              {/* Min Experience */}
              <input
                type="number"
                name="minExperience"
                value={filters.minExperience}
                onChange={handleFilterChange}
                placeholder="Min Experience (years)"
                min="0"
                className="input-neon"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 justify-center">
              <button
                type="submit"
                className="btn-neon btn-neon-primary px-6"
              >
                Search
              </button>
              <button
                type="button"
                onClick={clearFilters}
                className="btn-neon btn-neon-secondary px-6"
              >
                Clear Filters
              </button>
            </div>
          </form>
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 border-2 border-red-500/30 mb-4">
              <span className="text-2xl">⚠️</span>
            </div>
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={fetchTutors}
              className="btn-neon btn-neon-primary"
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
                    className="card-neon card-neon-blue p-6 rounded-xl text-center group hover:scale-105 transition-transform duration-300"
                  >
                    {/* Profile Image */}
                    <div className="relative inline-block mb-4">
                      <img 
                        src={tutor.profileImage || 'https://i.ibb.co/qpB9ZNp/default-avatar.png'} 
                        alt={tutor.name} 
                        className="w-24 h-24 rounded-full mx-auto neon-border-blue object-cover" 
                      />
                      {/* Rating Badge */}
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-dark-bg px-3 py-1 rounded-full border-2 border-neon-green flex items-center gap-1">
                        <FaStar className="text-neon-green text-xs" />
                        <span className="text-sm font-bold text-neon-green">
                          {tutor.rating?.toFixed(1) || '5.0'}
                        </span>
                      </div>
                    </div>

                    {/* Name */}
                    <h3 className="text-xl font-bold neon-text-blue mb-3 group-hover:text-neon-pink transition-colors line-clamp-1">
                      {tutor.name}
                    </h3>

                    {/* Location & Experience */}
                    <div className="space-y-2 mb-4">
                     
                      {(tutor.address || tutor.location) && (
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                          <FaMapMarkerAlt className="text-neon-pink flex-shrink-0" />
                          <span className="truncate">{tutor.address || tutor.location}</span>
                        </div>
                      )}
                      {tutor.experience !== undefined && tutor.experience !== null && (
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                          <FaBriefcase className="text-neon-pink flex-shrink-0" />
                          <span>{tutor.experience} {tutor.experience === 1 ? 'year' : 'years'}</span>
                        </div>
                      )}
                    </div>

                    {/* Subjects */}
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
              {tutor.subjects?.slice(0, 3).map((subject, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-neon-blue/20 border border-neon-blue/30 text-xs text-neon-blue text-center"
                >
                  {subject}
                </span>
              ))}
              {tutor.subjects?.length > 3 && (
                <span className="px-3 py-1 bg-gray-700/50 border border-gray-600 text-xs text-gray-400 text-center">
                  +{tutor.subjects.length - 3} more
                </span>
              )}
            </div>

                    {/* View Profile Button */}
                    <div className="pt-3 border-t border-neon-blue/30">
                      <span className="text-neon-blue group-hover:text-neon-pink transition-colors font-semibold">
                        View Profile →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neon-blue/10 border-2 border-neon-blue/30 mb-4">
                  <FaBriefcase className="text-neon-blue text-3xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-300 mb-2">No tutors found</h3>
                <p className="text-gray-400 mb-6">
                  Try adjusting your search filters or{' '}
                  <button 
                    onClick={clearFilters}
                    className="text-neon-blue hover:underline"
                  >
                    clear all filters
                  </button>
                </p>
                <Link
                  to="/register?role=tutor"
                  className="btn-neon btn-neon-primary inline-flex items-center gap-2"
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