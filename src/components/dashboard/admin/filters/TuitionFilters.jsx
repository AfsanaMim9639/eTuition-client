// src/components/dashboard/admin/filters/TuitionFilters.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';

const TuitionFilters = ({ filters, setFilters, onSearch }) => {
  const handleInputChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      status: '',
      subject: '',
      tutoring_type: '',
      grade: '',
      search: ''
    });
    if (onSearch) onSearch();
  };

  const hasActiveFilters = () => {
    return filters.status || filters.subject || filters.tutoring_type || 
           filters.grade || filters.search;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Search Bar */}
      <div className="relative">
        <Search 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" 
          style={{ color: '#FF10F0' }}
        />
        <input
          type="text"
          placeholder="Search by title, location, or subject..."
          value={filters.search || ''}
          onChange={(e) => handleInputChange('search', e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSearch && onSearch()}
          className="w-full pl-12 pr-4 py-3 rounded-lg border-2 transition-all focus:outline-none"
          style={{
            backgroundColor: 'rgba(18, 18, 18, 0.8)',
            borderColor: 'rgba(255, 16, 240, 0.3)',
            color: 'white'
          }}
          onFocus={(e) => e.target.style.borderColor = '#FF10F0'}
          onBlur={(e) => e.target.style.borderColor = 'rgba(255, 16, 240, 0.3)'}
        />
      </div>

      {/* Filter Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Status Filter */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-400 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Status
          </label>
          <select
            value={filters.status || ''}
            onChange={(e) => handleInputChange('status', e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border-2 transition-all focus:outline-none cursor-pointer"
            style={{
              backgroundColor: 'rgba(18, 18, 18, 0.8)',
              borderColor: filters.status ? '#39FF14' : 'rgba(255, 16, 240, 0.2)',
              color: filters.status ? '#39FF14' : '#888'
            }}
          >
            <option value="">All Status</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Tutoring Type Filter */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-400 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Type
          </label>
          <select
            value={filters.tutoring_type || ''}
            onChange={(e) => handleInputChange('tutoring_type', e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border-2 transition-all focus:outline-none cursor-pointer"
            style={{
              backgroundColor: 'rgba(18, 18, 18, 0.8)',
              borderColor: filters.tutoring_type ? '#00F0FF' : 'rgba(255, 16, 240, 0.2)',
              color: filters.tutoring_type ? '#00F0FF' : '#888'
            }}
          >
            <option value="">All Types</option>
            <option value="Home Tutoring">Home Tutoring</option>
            <option value="Online Tutoring">Online Tutoring</option>
            <option value="Both">Both</option>
          </select>
        </div>

        {/* Subject Filter */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-400 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Subject
          </label>
          <select
            value={filters.subject || ''}
            onChange={(e) => handleInputChange('subject', e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border-2 transition-all focus:outline-none cursor-pointer"
            style={{
              backgroundColor: 'rgba(18, 18, 18, 0.8)',
              borderColor: filters.subject ? '#FF10F0' : 'rgba(255, 16, 240, 0.2)',
              color: filters.subject ? '#FF10F0' : '#888'
            }}
          >
            <option value="">All Subjects</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Biology">Biology</option>
            <option value="English">English</option>
            <option value="Bangla">Bangla</option>
            <option value="ICT">ICT</option>
            <option value="Economics">Economics</option>
            <option value="Accounting">Accounting</option>
            <option value="Business Studies">Business Studies</option>
          </select>
        </div>

        {/* Grade Filter */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-400 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Grade/Class
          </label>
          <select
            value={filters.grade || ''}
            onChange={(e) => handleInputChange('grade', e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border-2 transition-all focus:outline-none cursor-pointer"
            style={{
              backgroundColor: 'rgba(18, 18, 18, 0.8)',
              borderColor: filters.grade ? '#FFA500' : 'rgba(255, 16, 240, 0.2)',
              color: filters.grade ? '#FFA500' : '#888'
            }}
          >
            <option value="">All Grades</option>
            <option value="Class 1">Class 1</option>
            <option value="Class 2">Class 2</option>
            <option value="Class 3">Class 3</option>
            <option value="Class 4">Class 4</option>
            <option value="Class 5">Class 5</option>
            <option value="Class 6">Class 6</option>
            <option value="Class 7">Class 7</option>
            <option value="Class 8">Class 8</option>
            <option value="Class 9">Class 9</option>
            <option value="Class 10">Class 10</option>
            <option value="SSC">SSC</option>
            <option value="HSC">HSC</option>
            <option value="O Level">O Level</option>
            <option value="A Level">A Level</option>
            <option value="Undergraduate">Undergraduate</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-transparent">Actions</label>
          <div className="flex gap-2">
            {/* Search Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onSearch}
              className="flex-1 px-4 py-2.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
              style={{
                background: 'linear-gradient(135deg, #FF10F022, #FF10F011)',
                border: '2px solid #FF10F0',
                color: '#FF10F0'
              }}
            >
              <Search className="w-4 h-4" />
              Search
            </motion.button>

            {/* Clear Filters Button */}
            {hasActiveFilters() && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClearFilters}
                className="px-4 py-2.5 rounded-lg font-semibold transition-all flex items-center justify-center"
                style={{
                  backgroundColor: 'rgba(255, 0, 0, 0.1)',
                  border: '2px solid rgba(255, 0, 0, 0.5)',
                  color: '#FF0000'
                }}
                title="Clear all filters"
              >
                <X className="w-4 h-4" />
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters() && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="flex flex-wrap gap-2 pt-2"
        >
          <span className="text-sm text-gray-400">Active Filters:</span>
          {filters.status && (
            <span 
              className="px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"
              style={{ backgroundColor: '#39FF1422', color: '#39FF14', border: '1px solid #39FF14' }}
            >
              Status: {filters.status}
              <X 
                className="w-3 h-3 cursor-pointer" 
                onClick={() => handleInputChange('status', '')}
              />
            </span>
          )}
          {filters.tutoring_type && (
            <span 
              className="px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"
              style={{ backgroundColor: '#00F0FF22', color: '#00F0FF', border: '1px solid #00F0FF' }}
            >
              Type: {filters.tutoring_type}
              <X 
                className="w-3 h-3 cursor-pointer" 
                onClick={() => handleInputChange('tutoring_type', '')}
              />
            </span>
          )}
          {filters.subject && (
            <span 
              className="px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"
              style={{ backgroundColor: '#FF10F022', color: '#FF10F0', border: '1px solid #FF10F0' }}
            >
              Subject: {filters.subject}
              <X 
                className="w-3 h-3 cursor-pointer" 
                onClick={() => handleInputChange('subject', '')}
              />
            </span>
          )}
          {filters.grade && (
            <span 
              className="px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"
              style={{ backgroundColor: '#FFA50022', color: '#FFA500', border: '1px solid #FFA500' }}
            >
              Grade: {filters.grade}
              <X 
                className="w-3 h-3 cursor-pointer" 
                onClick={() => handleInputChange('grade', '')}
              />
            </span>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default TuitionFilters;