import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaDollarSign, FaBook, FaSearch, FaFilter, FaSortAmountDown, FaPaperPlane, FaCheckCircle, FaClock } from 'react-icons/fa';
import TuitionCard from '../../components/tuition/TuitionCard';
import { tuitionAPI, applicationAPI } from '../../utils/api';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import toast from 'react-hot-toast';

function AllTuitions() {
  const { user, isAuthenticated } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();
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
  
  const [applyModal, setApplyModal] = useState({
    show: false,
    tuition: null
  });
  const [applicationForm, setApplicationForm] = useState({
    qualifications: '',
    experience: '',
    expectedSalary: ''
  });
  const [applyLoading, setApplyLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  useEffect(() => {
    fetchTuitions();
  }, [pagination.currentPage, sortBy, sortOrder, filters]);

  const fetchFilterOptions = async () => {
    try {
      const response = await tuitionAPI.getFilterOptions();
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

  const handleApplyClick = (tuition) => {
    if (!isAuthenticated) {
      toast.error('Please login as a tutor to apply');
      navigate('/login');
      return;
    }

    if (user?.role !== 'tutor') {
      toast.error('Only tutors can apply for tuitions');
      return;
    }

    setApplyModal({ show: true, tuition });
    setApplicationForm({
      qualifications: '',
      experience: '',
      expectedSalary: tuition.salary || ''
    });
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();

    if (applicationForm.qualifications.trim().length < 20) {
      toast.error('Qualifications must be at least 20 characters');
      return;
    }

    if (!applicationForm.experience.trim()) {
      toast.error('Please enter your experience');
      return;
    }

    if (!applicationForm.expectedSalary || applicationForm.expectedSalary < 1) {
      toast.error('Please enter your expected salary');
      return;
    }

    try {
      setApplyLoading(true);
      
      await applicationAPI.applyForTuition({
        tuitionId: applyModal.tuition._id,
        qualifications: applicationForm.qualifications.trim(),
        experience: applicationForm.experience.trim(),
        expectedSalary: parseFloat(applicationForm.expectedSalary)
      });

      toast.success('Application submitted successfully!');
      setApplyModal({ show: false, tuition: null });
      setApplicationForm({ qualifications: '', experience: '', expectedSalary: '' });
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error(error.response?.data?.message || 'Failed to submit application');
    } finally {
      setApplyLoading(false);
    }
  };

  if (loading && tuitions.length === 0) {
    return (
      <div className={`min-h-screen pt-16 sm:pt-20 md:pt-24 flex items-center justify-center px-4 ${
        isDark ? 'bg-[#0a0f0d]' : 'bg-gradient-to-b from-emerald-200 via-teal-100 to-emerald-200'
      }`}>
        <div className="spinner-neon w-10 h-10 sm:w-12 sm:h-12"></div>
      </div>
    );
  }

  return (
    <div className={`pt-16 sm:pt-20 md:pt-10 pb-8 sm:pb-12 overflow-x-hidden ${
      isDark ? 'bg-[#0a0f0d]' : 'bg-gradient-to-b from-emerald-200 via-teal-100 to-emerald-200'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full">
        {/* Header */}
        <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-3 sm:mb-4 ${
          isDark ? '' : 'text-gray-900'
        }`}>
          All <span className={isDark ? 'gradient-text' : 'text-gradient-light'}>Tuitions</span>
        </h1>
        <p className={`text-center text-sm sm:text-base mb-6 sm:mb-8 ${
          isDark ? 'text-gray-400' : 'text-gray-800'
        }`}>
          Explore {pagination.totalItems}+ tuition opportunities
        </p>

        {/* Filters */}
        <div className={`p-3 sm:p-4 rounded-xl mb-6 sm:mb-8 w-full overflow-hidden ${
          isDark 
            ? 'card-neon card-neon-pink' 
            : 'bg-white/80 border-2 border-emerald-300 shadow-lg'
        }`}>
          <div className="flex flex-col lg:flex-row gap-2 sm:gap-3 items-stretch w-full">
            {/* Search Bar */}
            <div className="w-full lg:w-2/5 min-w-0">
              <div className="relative h-full">
              <FaSearch className={`absolute left-3 top-1/2 -translate-y-1/2 text-xs sm:text-sm z-10 pointer-events-none ${
                isDark ? 'text-neon-pink' : 'text-emerald-600'
              }`} />
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search tuitions..."
                className="input-neon w-full h-full pr-3 py-2 text-xs sm:text-sm"
                style={{ paddingLeft: '2.5rem' }}
              />
            </div>
            </div>

            {/* Filters Grid */}
            <div className="w-full lg:w-3/5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 min-w-0">
              <select
                name="class"
                value={filters.class}
                onChange={handleFilterChange}
                className="input-neon text-xs py-2 px-1 sm:px-2 w-full min-w-0"
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
                className="input-neon text-xs py-2 px-1 sm:px-2 w-full min-w-0"
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
                className="input-neon text-xs py-2 px-1 sm:px-2 w-full min-w-0"
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
                className="input-neon text-xs py-2 px-1 sm:px-2 w-full min-w-0"
              >
                <option value="">Medium</option>
                {filterOptions.mediums?.map(medium => (
                  <option key={medium} value={medium}>
                    {medium.replace(' Medium', '').replace('English Version', 'Ver.')}
                  </option>
                ))}
              </select>

              <input
                type="number"
                name="minSalary"
                value={filters.minSalary}
                onChange={handleFilterChange}
                placeholder="Min ৳"
                className="input-neon text-xs py-2 px-1 sm:px-2 w-full min-w-0"
                min="0"
              />

              <input
                type="number"
                name="maxSalary"
                value={filters.maxSalary}
                onChange={handleFilterChange}
                placeholder="Max ৳"
                className="input-neon text-xs py-2 px-1 sm:px-2 w-full min-w-0"
                min="0"
              />

              <select
                onChange={handleSortChange}
                className="input-neon text-xs py-2 px-1 sm:px-2 w-full min-w-0"
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
              className={`text-xs flex items-center gap-1 transition-colors ${
                isDark 
                  ? 'text-neon-pink hover:text-neon-blue' 
                  : 'text-emerald-700 hover:text-cyan-700'
              }`}
            >
              <FaFilter className="text-xs" />
              Clear All
            </button>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center py-8 sm:py-12 px-4">
            <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 mb-3 sm:mb-4 ${
              isDark 
                ? 'bg-red-500/10 border-red-500/30' 
                : 'bg-red-50 border-red-200'
            }`}>
              <span className="text-xl sm:text-2xl">⚠️</span>
            </div>
            <p className={`text-sm sm:text-base mb-3 sm:mb-4 ${
              isDark ? 'text-red-400' : 'text-red-600'
            }`}>
              {error}
            </p>
            <button
              onClick={fetchTuitions}
              className="btn-neon btn-neon-primary text-sm sm:text-base px-4 sm:px-6 py-2"
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 auto-rows-fr w-full">
                  {tuitions.map(tuition => (
                    <div key={tuition._id} className="relative">
                      <TuitionCard tuition={tuition} />
                      
                      {isAuthenticated && user?.role === 'tutor' && (
                        <button
                          onClick={() => handleApplyClick(tuition)}
                          className={`absolute bottom-4 right-4 px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-lg font-semibold transition-all flex items-center gap-1 sm:gap-2 ${
                            isDark
                              ? 'bg-gradient-to-r from-neon-pink to-neon-blue text-white hover:shadow-lg hover:shadow-neon-pink/50'
                              : 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:shadow-lg hover:shadow-purple-400/50'
                          }`}
                        >
                          <FaPaperPlane className="text-xs sm:text-sm" />
                          <span className="hidden sm:inline">Apply Now</span>
                          <span className="sm:hidden">Apply</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-2">
                    <button
                      onClick={() => handlePageChange(pagination.currentPage - 1)}
                      disabled={pagination.currentPage === 1}
                      className="w-full sm:w-auto btn-neon btn-neon-secondary px-4 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    
                    <div className="flex flex-wrap gap-2 justify-center">
                      {[...Array(pagination.totalPages)].map((_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => handlePageChange(i + 1)}
                          className={`px-3 sm:px-4 py-2 text-sm rounded-lg font-semibold transition-all ${
                            pagination.currentPage === i + 1
                              ? isDark
                                ? 'bg-neon-pink text-dark-bg'
                                : 'bg-emerald-600 text-white'
                              : isDark
                                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                : 'bg-white text-gray-700 hover:bg-emerald-50 border border-emerald-200'
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => handlePageChange(pagination.currentPage + 1)}
                      disabled={pagination.currentPage === pagination.totalPages}
                      className="w-full sm:w-auto btn-neon btn-neon-secondary px-4 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12 sm:py-20 px-4">
                <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 mb-3 sm:mb-4 ${
                  isDark 
                    ? 'bg-neon-pink/10 border-neon-pink/30' 
                    : 'bg-purple-50 border-purple-200'
                }`}>
                  <FaBook className={`text-2xl sm:text-3xl ${
                    isDark ? 'text-neon-pink' : 'text-purple-600'
                  }`} />
                </div>
                <h3 className={`text-xl sm:text-2xl font-bold mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-900'
                }`}>
                  No tuitions found
                </h3>
                <p className={`text-sm sm:text-base mb-4 sm:mb-6 ${
                  isDark ? 'text-gray-400' : 'text-gray-700'
                }`}>
                  Try adjusting your search filters or{' '}
                  <button 
                    onClick={clearFilters}
                    className={isDark ? 'text-neon-pink hover:underline' : 'text-emerald-700 hover:underline'}
                  >
                    clear all filters
                  </button>
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Apply Modal */}
      {applyModal.show && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`p-4 sm:p-6 md:p-8 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto ${
            isDark 
              ? 'card-neon card-neon-blue' 
              : 'bg-white border-2 border-cyan-300 shadow-2xl'
          }`}>
            <h2 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 ${
              isDark ? 'neon-text-blue' : 'text-cyan-700'
            }`}>
              Apply for Tuition
            </h2>
            
            {/* Tuition Info */}
            <div className={`p-3 sm:p-4 rounded-lg mb-4 sm:mb-6 ${
              isDark ? 'bg-gray-800/50' : 'bg-emerald-50 border border-emerald-200'
            }`}>
              <h3 className={`font-bold text-sm sm:text-base mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {applyModal.tuition?.title}
              </h3>
              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-700'
              }`}>
                <div className="flex items-center gap-2">
                  <FaBook className={`flex-shrink-0 ${
                    isDark ? 'text-neon-blue' : 'text-cyan-600'
                  }`} />
                  <span className="truncate">{applyModal.tuition?.subject} • {applyModal.tuition?.grade}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaDollarSign className={`flex-shrink-0 ${
                    isDark ? 'text-neon-green' : 'text-emerald-600'
                  }`} />
                  {applyModal.tuition?.salary} BDT/month
                </div>
              </div>
            </div>

            <form onSubmit={handleApplySubmit} className="space-y-3 sm:space-y-4">
              {/* Qualifications */}
              <div>
                <label className={`block text-xs sm:text-sm font-semibold mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-800'
                }`}>
                  Qualifications <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={applicationForm.qualifications}
                  onChange={(e) => setApplicationForm({ ...applicationForm, qualifications: e.target.value })}
                  placeholder="Describe your educational background..."
                  rows="4"
                  className="input-neon w-full resize-none text-sm"
                  required
                />
                <p className={`text-xs mt-1 ${
                  isDark ? 'text-gray-500' : 'text-gray-600'
                }`}>
                  {applicationForm.qualifications.length} / 20 minimum
                </p>
              </div>

              {/* Experience */}
              <div>
                <label className={`block text-xs sm:text-sm font-semibold mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-800'
                }`}>
                  Experience <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={applicationForm.experience}
                  onChange={(e) => setApplicationForm({ ...applicationForm, experience: e.target.value })}
                  placeholder="e.g., 3 years teaching Math"
                  className="input-neon w-full text-sm"
                  required
                />
              </div>

              {/* Expected Salary */}
              <div>
                <label className={`block text-xs sm:text-sm font-semibold mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-800'
                }`}>
                  Expected Salary (BDT/month) <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  value={applicationForm.expectedSalary}
                  onChange={(e) => setApplicationForm({ ...applicationForm, expectedSalary: e.target.value })}
                  placeholder="e.g., 5000"
                  min="0"
                  className="input-neon w-full text-sm"
                  required
                />
                <p className={`text-xs mt-1 ${
                  isDark ? 'text-gray-500' : 'text-gray-600'
                }`}>
                  Student's budget: ৳{applyModal.tuition?.salary}/month
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setApplyModal({ show: false, tuition: null })}
                  className={`order-2 sm:order-1 flex-1 btn border-2 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all ${
                    isDark
                      ? 'border-gray-600 text-gray-400 hover:border-red-500 hover:text-red-500'
                      : 'border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-600'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={applyLoading}
                  className="order-1 sm:order-2 flex-1 btn btn-neon-blue py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {applyLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-2 border-white border-t-transparent"></div>
                      <span className="hidden sm:inline">Submitting...</span>
                      <span className="sm:hidden">Submitting</span>
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="text-xs sm:text-sm" />
                      <span className="hidden sm:inline">Submit Application</span>
                      <span className="sm:hidden">Submit</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllTuitions;