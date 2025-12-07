import { FaSearch, FaTimes } from 'react-icons/fa';

const SearchFilter = ({ filters, setFilters, onSearch }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      subject: '',
      category: '',
      medium: '',
      minSalary: '',
      maxSalary: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
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
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {/* Search Input */}
          <div className="lg:col-span-3">
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Search Keywords
            </label>
            <div className="relative">
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleInputChange}
                placeholder="Search by location, area, or details..."
                className="input-neon w-full pl-10"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
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
            type="submit"
            className="btn btn-neon-pink px-6 py-3 flex items-center space-x-2"
          >
            <FaSearch />
            <span>Search</span>
          </button>
          <button
            type="button"
            onClick={handleClearFilters}
            className="btn btn-neon-blue px-6 py-3 flex items-center space-x-2"
          >
            <FaTimes />
            <span>Clear Filters</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchFilter;