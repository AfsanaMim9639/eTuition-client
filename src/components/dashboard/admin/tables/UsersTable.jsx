// src/components/dashboard/admin/tables/UsersTable.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Eye, Edit, Mail, Phone, Calendar } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';

const UsersTable = ({ users, onUpdateRole, onUpdateStatus, onDelete, onView, onEdit }) => {
  const { isDark } = useTheme();

  if (!users || users.length === 0) {
    return (
      <div 
        className="text-center py-12"
        style={{ color: isDark ? '#9ca3af' : '#6b7280' }}
      >
        <p>No users found</p>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#FFA500';
      case 'approved': return '#39FF14';
      case 'rejected': return '#FF0000';
      case 'suspended': return '#FFD700';
      case 'blocked': return '#8B0000';
      default: return '#888';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return '#FF10F0';
      case 'tutor': return '#00F0FF';
      case 'student': return '#39FF14';
      default: return '#888';
    }
  };

  return (
    <>
      {/* Desktop Table View (hidden on mobile) */}
      <div 
        className="hidden lg:block overflow-x-auto rounded-xl border" 
        style={{ 
          backgroundColor: isDark ? 'rgba(18, 18, 18, 0.5)' : 'rgba(255, 255, 255, 0.8)',
          borderColor: isDark ? 'rgba(255, 16, 240, 0.2)' : 'rgba(255, 16, 240, 0.15)'
        }}
      >
        <table className="w-full">
          <thead>
            <tr style={{ 
              borderBottom: isDark 
                ? '2px solid rgba(255, 16, 240, 0.2)' 
                : '2px solid rgba(255, 16, 240, 0.15)' 
            }}>
              <th 
                className="px-4 py-3 text-left text-xs font-semibold"
                style={{ color: isDark ? '#d1d5db' : '#4b5563' }}
              >
                User
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-semibold"
                style={{ color: isDark ? '#d1d5db' : '#4b5563' }}
              >
                Email
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-semibold"
                style={{ color: isDark ? '#d1d5db' : '#4b5563' }}
              >
                Phone
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-semibold"
                style={{ color: isDark ? '#d1d5db' : '#4b5563' }}
              >
                Role
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-semibold"
                style={{ color: isDark ? '#d1d5db' : '#4b5563' }}
              >
                Status
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-semibold"
                style={{ color: isDark ? '#d1d5db' : '#4b5563' }}
              >
                Joined
              </th>
              <th 
                className="px-4 py-3 text-center text-xs font-semibold"
                style={{ color: isDark ? '#d1d5db' : '#4b5563' }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <motion.tr
                key={user._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="transition-colors"
                style={{
                  borderBottom: isDark ? '1px solid #1f2937' : '1px solid #e5e7eb'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isDark 
                    ? 'rgba(17, 24, 39, 0.5)' 
                    : 'rgba(249, 250, 251, 0.8)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm"
                      style={{
                        background: 'linear-gradient(135deg, #FF10F0, #00F0FF)'
                      }}
                    >
                      {user.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <span 
                      className="font-medium text-sm"
                      style={{ color: isDark ? '#ffffff' : '#111827' }}
                    >
                      {user.name || 'Unknown'}
                    </span>
                  </div>
                </td>
                <td 
                  className="px-4 py-3 text-xs max-w-[200px] truncate"
                  style={{ color: isDark ? '#d1d5db' : '#4b5563' }}
                >
                  {user.email}
                </td>
                <td 
                  className="px-4 py-3 text-sm"
                  style={{ color: isDark ? '#d1d5db' : '#4b5563' }}
                >
                  {user.phone || 'N/A'}
                </td>
                <td className="px-4 py-3">
                  <select
                    value={user.role}
                    onChange={(e) => onUpdateRole(user._id, e.target.value)}
                    className="px-2 py-1 rounded-lg border-2 font-semibold transition-all cursor-pointer text-xs"
                    style={{
                      backgroundColor: isDark ? 'rgba(18, 18, 18, 0.8)' : 'rgba(255, 255, 255, 0.9)',
                      borderColor: getRoleColor(user.role),
                      color: getRoleColor(user.role)
                    }}
                  >
                    <option value="student">Student</option>
                    <option value="tutor">Tutor</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="px-4 py-3">
                  <select
                    value={user.status || 'pending'}
                    onChange={(e) => onUpdateStatus(user._id, e.target.value)}
                    className="px-2 py-1 rounded-lg border-2 font-semibold transition-all cursor-pointer text-xs"
                    style={{
                      backgroundColor: isDark ? 'rgba(18, 18, 18, 0.8)' : 'rgba(255, 255, 255, 0.9)',
                      borderColor: getStatusColor(user.status || 'pending'),
                      color: getStatusColor(user.status || 'pending')
                    }}
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="suspended">Suspended</option>
                    <option value="blocked">Blocked</option>
                  </select>
                </td>
                <td 
                  className="px-4 py-3 text-xs"
                  style={{ color: isDark ? '#d1d5db' : '#4b5563' }}
                >
                  {user.createdAt 
                    ? new Date(user.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })
                    : 'N/A'
                  }
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-1.5">
                    <motion.button
                      onClick={() => onView(user)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 rounded-lg transition-colors"
                      style={{
                        backgroundColor: isDark ? 'transparent' : 'transparent'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = isDark 
                          ? 'rgba(0, 240, 255, 0.2)' 
                          : 'rgba(0, 240, 255, 0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" style={{ color: '#00F0FF' }} />
                    </motion.button>
                    <motion.button
                      onClick={() => onEdit(user)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 rounded-lg transition-colors"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = isDark 
                          ? 'rgba(57, 255, 20, 0.2)' 
                          : 'rgba(57, 255, 20, 0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                      title="Edit User"
                    >
                      <Edit className="w-4 h-4" style={{ color: '#39FF14' }} />
                    </motion.button>
                    {user.role !== 'admin' ? (
                      <motion.button
                        onClick={() => onDelete(user._id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 rounded-lg transition-colors"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = isDark 
                            ? 'rgba(255, 16, 240, 0.2)' 
                            : 'rgba(255, 16, 240, 0.15)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                        title="Delete User"
                      >
                        <Trash2 className="w-4 h-4" style={{ color: '#FF10F0' }} />
                      </motion.button>
                    ) : (
                      <div 
                        className="p-2 rounded-lg opacity-50 cursor-not-allowed"
                        title="Cannot delete admin accounts"
                      >
                        <Trash2 
                          className="w-4 h-4" 
                          style={{ color: isDark ? '#4b5563' : '#9ca3af' }} 
                        />
                      </div>
                    )}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View (hidden on desktop) */}
      <div className="lg:hidden space-y-3">
        {users.map((user, idx) => (
          <motion.div
            key={user._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="rounded-xl border p-4"
            style={{
              backgroundColor: isDark ? 'rgba(18, 18, 18, 0.5)' : 'rgba(255, 255, 255, 0.8)',
              borderColor: isDark ? 'rgba(255, 16, 240, 0.2)' : 'rgba(255, 16, 240, 0.15)'
            }}
          >
            {/* User Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white"
                  style={{
                    background: 'linear-gradient(135deg, #FF10F0, #00F0FF)'
                  }}
                >
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div>
                  <h3 
                    className="font-semibold text-base"
                    style={{ color: isDark ? '#ffffff' : '#111827' }}
                  >
                    {user.name || 'Unknown'}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <select
                      value={user.role}
                      onChange={(e) => onUpdateRole(user._id, e.target.value)}
                      className="px-2 py-0.5 rounded-md border font-semibold transition-all cursor-pointer text-xs"
                      style={{
                        backgroundColor: isDark ? 'rgba(18, 18, 18, 0.9)' : 'rgba(255, 255, 255, 0.95)',
                        borderColor: getRoleColor(user.role),
                        color: getRoleColor(user.role)
                      }}
                    >
                      <option value="student">Student</option>
                      <option value="tutor">Tutor</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Status Badge */}
              <select
                value={user.status || 'pending'}
                onChange={(e) => onUpdateStatus(user._id, e.target.value)}
                className="px-2 py-1 rounded-md border font-semibold transition-all cursor-pointer text-xs"
                style={{
                  backgroundColor: isDark ? 'rgba(18, 18, 18, 0.9)' : 'rgba(255, 255, 255, 0.95)',
                  borderColor: getStatusColor(user.status || 'pending'),
                  color: getStatusColor(user.status || 'pending')
                }}
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="suspended">Suspended</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>

            {/* User Details */}
            <div className="space-y-2 mb-4">
              <div 
                className="flex items-center gap-2 text-sm"
                style={{ color: isDark ? '#d1d5db' : '#4b5563' }}
              >
                <Mail 
                  className="w-4 h-4 flex-shrink-0" 
                  style={{ color: isDark ? '#6b7280' : '#9ca3af' }} 
                />
                <span className="truncate">{user.email}</span>
              </div>
              <div 
                className="flex items-center gap-2 text-sm"
                style={{ color: isDark ? '#d1d5db' : '#4b5563' }}
              >
                <Phone 
                  className="w-4 h-4 flex-shrink-0" 
                  style={{ color: isDark ? '#6b7280' : '#9ca3af' }} 
                />
                <span>{user.phone || 'N/A'}</span>
              </div>
              <div 
                className="flex items-center gap-2 text-sm"
                style={{ color: isDark ? '#d1d5db' : '#4b5563' }}
              >
                <Calendar 
                  className="w-4 h-4 flex-shrink-0" 
                  style={{ color: isDark ? '#6b7280' : '#9ca3af' }} 
                />
                <span>
                  {user.createdAt 
                    ? new Date(user.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })
                    : 'N/A'
                  }
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div 
              className="flex items-center gap-2 pt-3 border-t" 
              style={{ 
                borderColor: isDark 
                  ? 'rgba(255, 16, 240, 0.1)' 
                  : 'rgba(255, 16, 240, 0.08)' 
              }}
            >
              <motion.button
                onClick={() => onView(user)}
                whileTap={{ scale: 0.95 }}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm font-medium"
                style={{ 
                  color: '#00F0FF',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isDark 
                    ? 'rgba(0, 240, 255, 0.2)' 
                    : 'rgba(0, 240, 255, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <Eye className="w-4 h-4" />
                <span>View</span>
              </motion.button>
              
              <motion.button
                onClick={() => onEdit(user)}
                whileTap={{ scale: 0.95 }}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm font-medium"
                style={{ 
                  color: '#39FF14',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isDark 
                    ? 'rgba(57, 255, 20, 0.2)' 
                    : 'rgba(57, 255, 20, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </motion.button>
              
              {user.role !== 'admin' ? (
                <motion.button
                  onClick={() => onDelete(user._id)}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm font-medium"
                  style={{ 
                    color: '#FF10F0',
                    backgroundColor: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = isDark 
                      ? 'rgba(255, 16, 240, 0.2)' 
                      : 'rgba(255, 16, 240, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </motion.button>
              ) : (
                <div 
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg opacity-50 cursor-not-allowed text-sm font-medium"
                  style={{ color: isDark ? '#4b5563' : '#9ca3af' }}
                  title="Cannot delete admin"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default UsersTable;