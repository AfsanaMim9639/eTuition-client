// src/components/dashboard/admin/filters/UserFilters.jsx
import React from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

const UserFilters = ({ filters, setFilters, onApply }) => (
  <div className="flex gap-3 flex-wrap">
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        placeholder="Search users..."
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        className="pl-10 pr-4 py-2 rounded-lg"
        style={{ background: 'rgba(18, 18, 18, 0.95)', border: '2px solid rgba(0, 240, 255, 0.3)', color: 'white' }}
      />
    </div>
    <select value={filters.role} onChange={(e) => setFilters({ ...filters, role: e.target.value })}>
      <option value="">All Roles</option>
      <option value="student">Student</option>
      <option value="tutor">Tutor</option>
      <option value="admin">Admin</option>
    </select>
    <motion.button onClick={onApply} whileHover={{ scale: 1.05 }}>Apply Filters</motion.button>
  </div>
);
export default UserFilters;