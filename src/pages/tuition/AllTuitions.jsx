import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaDollarSign, FaBook, FaSearch, FaFilter, FaSortAmountDown } from 'react-icons/fa';
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
    class: '',
    tutoring_type: '',
    preferred_medium: '',
    minSalary: '',
    maxSalary: ''
  });
  
  const [filterOptions, setFilterOptions] = useState({
    subjects: [],
    grades: [],
    tutoringTypes: [],
    mediums: []
  });
  
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  useEffect(() => {
    fetchTuitions();
  }, [pagination.currentPage, sortBy, sortOrder, filters]);

  const fetchFilterOptions = async () => {
    try {
      const response = await tuitionAPI.getFilterOptions();
      // ✅ Fixed: Handle both old and new response formats
      if (response.data.status === 'success') {
        setFilterOptions(response.data.data || response.data.options || {
          subjects: [],
          grades: [],
          tutoringTypes: [],
          mediums: []
        });
      }
    } catch (error) {
      console.error('Error fetching filter options:', error);
    }
  };

  const fetchTuitions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        page: pagination.currentPage,
        limit: 12,
        sortBy: sortBy,
        sortOrder: sortOrder
      };
      if (filters.search) params.search = filters.search;
      if (filters.subject) params.subject = filters.subject;
      if (filters.class) params.class = filters.class;
      if (filters.tutoring_type) params.tutoring_type = filters.tutoring_type;
      if (filters.preferred_medium) params.preferred_medium = filters.preferred_medium;
      if (filters.minSalary) params.minSalary = filters.minSalary;
      if (filters.maxSalary) params.maxSalary = filters.maxSalary;
      
      const response = await tuitionAPI.getAllTuitions(params);
      
      // ✅ Fixed: Handle standardized response format
      if (response.data.status === 'success') {
        setTuitions(response.data.data || []);
        setPagination({
          currentPage: response.data.page || 1,
          totalPages: response.data.pages || 1,
          totalItems: response.data.total || 0
        });
      }
    } catch (error) {
      console.error('Error fetching tuitions:', error);
      setError('Failed to load tuitions. Please try again later.');
      setTuitions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
    setPagination({ ...pagination, currentPage: 1 });
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      subject: '',
      class: '',
      tutoring_type: '',
      preferred_medium: '',
      minSalary: '',
      maxSalary: ''
    });
    setSortBy('createdAt');
    setSortOrder('desc');
    setPagination({ ...pagination, currentPage: 1 });
  };

  const handlePageChange = (newPage) => {
    setPagination({ ...pagination, currentPage: newPage });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    
    switch(value) {
      case 'date-newest':
        setSortBy('createdAt');
        setSortOrder('desc');
        break;
      case 'date-oldest':
        setSortBy('createdAt');
        setSortOrder('asc');
        break;
      case 'salary-high':
        setSortBy('salary');
        setSortOrder('desc');
        break;
      case 'salary-low':
        setSortBy('salary');
        setSortOrder('asc');
        break;
      default:
        setSortBy('createdAt');
        setSortOrder('desc');
    }
    
    setPagination({ ...pagination, currentPage: 1 });
  };

  if (loading && tuitions.length === 0) {
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
          All <span className="gradient-text">Tuitions</span>
        </h1>
        <p className="text-center text-gray-400 mb-8">
          Explore {pagination.totalItems}+ tuition opportunities
        </p>

        {/* Compact Filters */}
        <div className="card-neon card-neon-pink p-3 rounded-xl mb-8 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-2 items-stretch">
            {/* Search Bar */}
            <div className="lg:w-2/5">
              <div className="relative h-full">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neon-pink text-sm z-10" />
                <input
                  type="text"
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                  placeholder="Search by title, subject, or location..."
                  className="input-neon w-full h-full pl-10 py-2 text-sm"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="lg:w-3/5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-2">
              <select
                name="class"
                value={filters.class}
                onChange={handleFilterChange}
                className="input-neon text-xs py-2 px-2"
              >
                <option value="">Class</option>
                {filterOptions.grades?.map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>

              <select
                name="subject"
                value={filters.subject}
                onChange={handleFilterChange}
                className="input-neon text-xs py-2 px-2"
              >
                <option value="">Subject</option>
                {filterOptions.subjects?.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>

              <select
                name="tutoring_type"
                value={filters.tutoring_type}
                onChange={handleFilterChange}
                className="input-neon text-xs py-2 px-2"
              >
                <option value="">Type</option>
                {filterOptions.tutoringTypes?.map(type => (
                  <option key={type} value={type}>
                    {type === 'Home Tutoring' ? 'Home' : type === 'Online Tutoring' ? 'Online' : 'Both'}
                  </option>
                ))}
              </select>

              <select
                name="preferred_medium"
                value={filters.preferred_medium}
                onChange={handleFilterChange}
                className="input-neon text-xs py-2 px-2"
              >
                <option value="">Medium</option>
                {filterOptions.mediums?.map(medium => (
                  <option key={medium} value={medium}>
                    {medium.replace(' Medium', '').replace('English Version', 'Version')}
                  </option>
                ))}
              </select>

              <input
                type="number"
                name="minSalary"
                value={filters.minSalary}
                onChange={handleFilterChange}
                placeholder="Min ৳"
                className="input-neon text-xs py-2 px-2"
                min="0"
              />

              <input
                type="number"
                name="maxSalary"
                value={filters.maxSalary}
                onChange={handleFilterChange}
                placeholder="Max ৳"
                className="input-neon text-xs py-2 px-2"
                min="0"
              />

              <select
                onChange={handleSortChange}
                className="input-neon text-xs py-2 px-2"
                defaultValue="date-newest"
              >
                <option value="date-newest">Newest</option>
                <option value="date-oldest">Oldest</option>
                <option value="salary-high">High ৳</option>
                <option value="salary-low">Low ৳</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end mt-2">
            <button
              type="button"
              onClick={clearFilters}
              className="text-neon-pink hover:text-neon-blue text-xs flex items-center gap-1 transition-colors"
            >
              <FaFilter className="text-xs" />
              Clear All
            </button>
          </div>
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
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default AllTuitions;