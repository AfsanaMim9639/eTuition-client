import { useState, useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

const SearchFilter = ({ filters, setFilters, onSearch }) => {
  const [localSearch, setLocalSearch] = useState(filters.search);

  // Debounce search input - এখন 500ms পর update হবে
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== filters.search) {
        setFilters({ ...filters, search: localSearch });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [localSearch]);

  // Sync with external filters
  useEffect(() => {
    setLocalSearch(filters.search);
  }, [filters.search]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'search') {
      setLocalSearch(value);
    } else {
      setFilters({ ...filters, [name]: value });
    }
  };

  const handleClearFilters = () => {
    setLocalSearch('');
    setFilters({
      search: '',
      subject: '',
      category: '',
      medium: '',
      minSalary: '',
      maxSalary: ''
    });
  };

  const handleSearch = () => {
    // নিশ্চিত করুন যে latest search value set হয়েছে
    setFilters({ ...filters, search: localSearch });
    onSearch();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const categories = [
    'Class 1-5',
    'Class 6-8',
    'Class 9-10',
    'SSC',
    'HSC',
    'University',
    'Professional'
  ];

  const subjects = [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'English',
    'Bangla',
    'ICT',
    'Economics',
    'Accounting',
    'Business Studies'
  ];

  const mediums = ['Bangla', 'English', 'Both'];

  return (
    <div className="card-neon-blue p-6 mb-8">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {/* Search Input */}
          <div className="lg:col-span-3">
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Search Keywords
            </label>
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm z-10" />
              <input
                type="text"
                name="search"
                value={localSearch}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Search by location, area, or details..."
                className="input-neon w-full pl-11 pr-4 py-3"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Category
            </label>
            <select
              name="category"
              value={filters.category}
              onChange={handleInputChange}
              className="input-neon w-full"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Subject
            </label>
            <select
              name="subject"
              value={filters.subject}
              onChange={handleInputChange}
              className="input-neon w-full"
            >
              <option value="">All Subjects</option>
              {subjects.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>

          {/* Medium */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Medium
            </label>
            <select
              name="medium"
              value={filters.medium}
              onChange={handleInputChange}
              className="input-neon w-full"
            >
              <option value="">All Mediums</option>
              {mediums.map((med) => (
                <option key={med} value={med}>
                  {med}
                </option>
              ))}
            </select>
          </div>

          {/* Min Salary */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Min Salary (৳)
            </label>
            <input
              type="number"
              name="minSalary"
              value={filters.minSalary}
              onChange={handleInputChange}
              placeholder="e.g., 3000"
              className="input-neon w-full"
              min="0"
            />
          </div>

          {/* Max Salary */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Max Salary (৳)
            </label>
            <input
              type="number"
              name="maxSalary"
              value={filters.maxSalary}
              onChange={handleInputChange}
              placeholder="e.g., 10000"
              className="input-neon w-full"
              min="0"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleSearch}
            className="btn btn-neon-pink px-6 py-3 flex items-center space-x-2"
          >
            <FaSearch />
            <span>Search Now</span>
          </button>
          <button
            onClick={handleClearFilters}
            className="btn btn-neon-blue px-6 py-3 flex items-center space-x-2"
          >
            <FaTimes />
            <span>Clear Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;