import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaDollarSign, FaBook, FaSearch, FaFilter } from 'react-icons/fa';
import TuitionCard from '../../components/tuition/TuitionCard';
import { tuitionAPI } from '../../utils/api';

function AllTuitions() {
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0
  });
  const [filters, setFilters] = useState({
    search: '',
    subject: '',
    tutoring_type: '', // ✅ Changed from category to tutoring_type
    preferred_medium: '', // ✅ Changed from medium to preferred_medium
    minSalary: '',
    maxSalary: ''
  });

  useEffect(() => {
    fetchTuitions();
  }, [pagination.currentPage]);

  const fetchTuitions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Build query params
      const params = {
        page: pagination.currentPage,
        limit: 12
      };
      if (filters.search) params.search = filters.search;
      if (filters.subject) params.subject = filters.subject;
      if (filters.tutoring_type) params.tutoring_type = filters.tutoring_type; // ✅ Fixed
      if (filters.preferred_medium) params.preferred_medium = filters.preferred_medium; // ✅ Fixed
      if (filters.minSalary) params.minSalary = filters.minSalary;
      if (filters.maxSalary) params.maxSalary = filters.maxSalary;
      
      const response = await tuitionAPI.getAllTuitions(params);
      setTuitions(response.data.tuitions);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Error fetching tuitions:', error);
      setError('Failed to load tuitions. Please try again later.');
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
    setPagination({ ...pagination, currentPage: 1 });
    fetchTuitions();
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      subject: '',
      tutoring_type: '',
      preferred_medium: '',
      minSalary: '',
      maxSalary: ''
    });
    setPagination({ ...pagination, currentPage: 1 });
    setTimeout(() => fetchTuitions(), 100);
  };

  const handlePageChange = (newPage) => {
    setPagination({ ...pagination, currentPage: newPage });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading && tuitions.length === 0) {
    return (
      <div className="min-h-screen bg-dark-bg pt-24 flex items-center justify-center">
        <div className="spinner-neon w-12 h-12"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          All <span className="gradient-text">Tuitions</span>
        </h1>
        <p className="text-center text-gray-400 mb-12">
          Explore {pagination.totalItems}+ tuition opportunities
        </p>

        {/* Filters */}
        <div className="card-neon card-neon-pink p-6 rounded-xl mb-8 max-w-6xl mx-auto">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Search */}
              <div className="lg:col-span-2">
                <input
                  type="text"
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                  placeholder="Search by title, subject, or location..."
                  className="input-neon w-full"
                />
              </div>

              {/* Tutoring Type */}
              <select
                name="tutoring_type"
                value={filters.tutoring_type}
                onChange={handleFilterChange}
                className="input-neon"
              >
                <option value="">All Types</option>
                <option value="Home Tutoring">Home Tutoring</option>
                <option value="Online Tutoring">Online Tutoring</option>
                <option value="Both">Both</option>
              </select>

              {/* Subject */}
              <select
                name="subject"
                value={filters.subject}
                onChange={handleFilterChange}
                className="input-neon"
              >
                <option value="">All Subjects</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="English">English</option>
                <option value="Bangla">Bangla</option>
                <option value="ICT">ICT</option>
              </select>

              {/* Medium */}
              <select
                name="preferred_medium"
                value={filters.preferred_medium}
                onChange={handleFilterChange}
                className="input-neon"
              >
                <option value="">All Mediums</option>
                <option value="Bangla Medium">Bangla Medium</option>
                <option value="English Medium">English Medium</option>
                <option value="English Version">English Version</option>
                <option value="Both">Both</option>
              </select>

              {/* Min Salary */}
              <input
                type="number"
                name="minSalary"
                value={filters.minSalary}
                onChange={handleFilterChange}
                placeholder="Min Salary (BDT)"
                className="input-neon"
                min="0"
              />

              {/* Max Salary */}
              <input
                type="number"
                name="maxSalary"
                value={filters.maxSalary}
                onChange={handleFilterChange}
                placeholder="Max Salary (BDT)"
                className="input-neon"
                min="0"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 justify-center">
              <button
                type="submit"
                className="btn-neon btn-neon-primary px-6 flex items-center gap-2"
              >
                <FaSearch />
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
              onClick={fetchTuitions}
              className="btn-neon btn-neon-primary"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Tuitions Grid */}
        {!error && (
          <>
            {tuitions.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 auto-rows-fr">
                  {tuitions.map(tuition => (
                    <TuitionCard key={tuition._id} tuition={tuition} />
                  ))}
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() => handlePageChange(pagination.currentPage - 1)}
                      disabled={pagination.currentPage === 1}
                      className="btn-neon btn-neon-secondary px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    
                    <div className="flex gap-2">
                      {[...Array(pagination.totalPages)].map((_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => handlePageChange(i + 1)}
                          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                            pagination.currentPage === i + 1
                              ? 'bg-neon-pink text-dark-bg'
                              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => handlePageChange(pagination.currentPage + 1)}
                      disabled={pagination.currentPage === pagination.totalPages}
                      className="btn-neon btn-neon-secondary px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neon-pink/10 border-2 border-neon-pink/30 mb-4">
                  <FaBook className="text-neon-pink text-3xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-300 mb-2">No tuitions found</h3>
                <p className="text-gray-400 mb-6">
                  Try adjusting your search filters or{' '}
                  <button 
                    onClick={clearFilters}
                    className="text-neon-pink hover:underline"
                  >
                    clear all filters
                  </button>
                </p>
                <Link
                  to="/dashboard/student/post-tuition"
                  className="btn-neon btn-neon-primary inline-flex items-center gap-2"
                >
                  Post a Tuition
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default AllTuitions;