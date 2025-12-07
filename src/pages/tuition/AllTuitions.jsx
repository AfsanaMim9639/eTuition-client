import { useState, useEffect } from 'react';
import api from '../../utils/api';
import TuitionCard from '../../components/tuition/TuitionCard';
import SearchFilter from '../../components/tuition/SearchFilter';
import Loading from '../../components/shared/Loading';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const AllTuitions = () => {
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0
  });
  const [filters, setFilters] = useState({
    search: '',
    subject: '',
    category: '',
    medium: '',
    minSalary: '',
    maxSalary: ''
  });

  useEffect(() => {
    fetchTuitions();
  }, [pagination.currentPage]);

  const fetchTuitions = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.currentPage,
        limit: 12,
        ...filters
      });

      const response = await api.get(`/tuitions?${params}`);
      setTuitions(response.data.tuitions);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Error fetching tuitions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPagination({ ...pagination, currentPage: 1 });
    fetchTuitions();
  };

  const handlePageChange = (newPage) => {
    setPagination({ ...pagination, currentPage: newPage });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading && tuitions.length === 0) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-dark-bg pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            All <span className="gradient-text">Tuitions</span>
          </h1>
          <p className="text-xl text-gray-400">
            Find the perfect tuition opportunity for you
          </p>
        </div>

        {/* Search & Filter */}
        <SearchFilter 
          filters={filters} 
          setFilters={setFilters} 
          onSearch={handleSearch}
        />

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-400">
            Showing <span className="neon-text-pink font-semibold">{tuitions.length}</span> of{' '}
            <span className="neon-text-blue font-semibold">{pagination.totalItems}</span> tuitions
          </p>
        </div>

        {/* Tuitions Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="spinner-neon w-12 h-12 mx-auto"></div>
          </div>
        ) : tuitions.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {tuitions.map((tuition) => (
                <TuitionCard key={tuition._id} tuition={tuition} />
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center items-center space-x-4">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className="btn btn-neon-blue px-4 py-2 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <FaChevronLeft />
                </button>

                <div className="flex space-x-2">
                  {[...Array(pagination.totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(index + 1)}
                      className={`px-4 py-2 rounded-lg font-semibold ${
                        pagination.currentPage === index + 1
                          ? 'btn-neon-pink'
                          : 'border-2 border-gray-600 text-gray-400 hover:border-neon-pink'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
                  className="btn btn-neon-blue px-4 py-2 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <FaChevronRight />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold neon-text-pink mb-4">No Tuitions Found</h3>
            <p className="text-gray-400">Try adjusting your search filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTuitions;