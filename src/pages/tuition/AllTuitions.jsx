import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaDollarSign, FaBook, FaSearch, FaFilter, FaSortAmountDown, FaPaperPlane, FaCheckCircle, FaClock } from 'react-icons/fa';
import TuitionCard from '../../components/tuition/TuitionCard';
import { tuitionAPI, applicationAPI } from '../../utils/api';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

function AllTuitions() {
  const { user, isAuthenticated } = useAuth();
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
  
  // Apply Modal State
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

  // ✅ Scroll to top on component mount
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

  // ✅ Apply functions - Updated with correct fields
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

    // ✅ Updated validation
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
      
      // ✅ Send correct data format
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
      <div className="min-h-screen bg-dark-bg pt-24 flex items-center justify-center">
        <div className="spinner-neon w-12 h-12"></div>
      </div>
    );
  }

  return (
    <div className="bg-dark-bg pt-12 pb-12">
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
                    <div key={tuition._id} className="relative">
                      <TuitionCard tuition={tuition} />
                      
                      {/* Apply Button - Only for logged-in tutors */}
                      {isAuthenticated && user?.role === 'tutor' && (
                        <button
                          onClick={() => handleApplyClick(tuition)}
                          className="absolute bottom-4 right-4 px-4 py-2 bg-gradient-to-r from-neon-pink to-neon-blue text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-neon-pink/50 transition-all flex items-center gap-2"
                        >
                          <FaPaperPlane />
                          Apply Now
                        </button>
                      )}
                    </div>
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

      {/* ✅ Apply Modal - Updated with correct fields */}
      {applyModal.show && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card-neon card-neon-blue p-8 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold neon-text-blue mb-6">Apply for Tuition</h2>
            
            {/* Tuition Info */}
            <div className="bg-gray-800/50 p-4 rounded-lg mb-6">
              <h3 className="font-bold text-white mb-2">{applyModal.tuition?.title}</h3>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <FaBook className="text-neon-blue" />
                  {applyModal.tuition?.subject} • {applyModal.tuition?.grade}
                </div>
                <div className="flex items-center gap-2">
                  <FaDollarSign className="text-neon-green" />
                  {applyModal.tuition?.salary} BDT/month
                </div>
              </div>
            </div>

            <form onSubmit={handleApplySubmit} className="space-y-4">
              {/* Qualifications */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">
                  Qualifications <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={applicationForm.qualifications}
                  onChange={(e) => setApplicationForm({ ...applicationForm, qualifications: e.target.value })}
                  placeholder="Describe your educational background, certifications, and relevant qualifications..."
                  rows="4"
                  className="input-neon w-full resize-none"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  {applicationForm.qualifications.length} / 20 minimum characters
                </p>
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">
                  Experience <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={applicationForm.experience}
                  onChange={(e) => setApplicationForm({ ...applicationForm, experience: e.target.value })}
                  placeholder="e.g., 3 years of teaching experience in Mathematics"
                  className="input-neon w-full"
                  required
                />
              </div>

              {/* Expected Salary */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">
                  Expected Salary (BDT/month) <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  value={applicationForm.expectedSalary}
                  onChange={(e) => setApplicationForm({ ...applicationForm, expectedSalary: e.target.value })}
                  placeholder="e.g., 5000"
                  min="0"
                  className="input-neon w-full"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Student's budget: ৳{applyModal.tuition?.salary}/month
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setApplyModal({ show: false, tuition: null })}
                  className="flex-1 btn border-2 border-gray-600 text-gray-400 hover:border-red-500 hover:text-red-500 py-3 rounded-lg font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={applyLoading}
                  className="flex-1 btn btn-neon-blue py-3 rounded-lg font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {applyLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Submit Application
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