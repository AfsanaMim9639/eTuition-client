// src/components/dashboard/admin/tables/UsersTable.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Eye, Edit } from 'lucide-react';

const UsersTable = ({ users, onUpdateRole, onUpdateStatus, onDelete, onView, onEdit }) => {
  if (!users || users.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
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
    <div 
      className="overflow-x-auto rounded-xl border" 
      style={{ 
        backgroundColor: 'rgba(18, 18, 18, 0.5)',
        borderColor: 'rgba(255, 16, 240, 0.2)'
      }}
    >
      <table className="w-full">
        <thead>
          <tr style={{ borderBottom: '2px solid rgba(255, 16, 240, 0.2)' }}>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-300">User</th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-300">Email</th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-300">Phone</th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-300">Role</th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-300">Status</th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-300">Joined</th>
            <th className="px-4 py-2 text-center text-xs font-semibold text-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <motion.tr
              key={user._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors"
            >
              {/* User Info */}
              <td className="px-4 py-2">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm"
                    style={{
                      background: 'linear-gradient(135deg, #FF10F0, #00F0FF)'
                    }}
                  >
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="text-white font-medium text-sm">{user.name || 'Unknown'}</span>
                </div>
              </td>

              {/* Email */}
              <td className="px-4 py-2 text-gray-300 text-xs max-w-[200px] truncate">{user.email}</td>

              {/* Phone */}
              <td className="px-4 py-2 text-gray-300 text-sm">{user.phone || 'N/A'}</td>

              {/* Role Select */}
              <td className="px-4 py-2">
                <select
                  value={user.role}
                  onChange={(e) => onUpdateRole(user._id, e.target.value)}
                  className="px-2 py-1 rounded-lg border-2 font-semibold transition-all cursor-pointer text-xs"
                  style={{
                    backgroundColor: 'rgba(18, 18, 18, 0.8)',
                    borderColor: getRoleColor(user.role),
                    color: getRoleColor(user.role)
                  }}
                >
                  <option value="student">Student</option>
                  <option value="tutor">Tutor</option>
                  <option value="admin">Admin</option>
                </select>
              </td>

              {/* Status Select */}
              <td className="px-4 py-2">
                <select
                  value={user.status || 'pending'}
                  onChange={(e) => onUpdateStatus(user._id, e.target.value)}
                  className="px-2 py-1 rounded-lg border-2 font-semibold transition-all cursor-pointer text-xs"
                  style={{
                    backgroundColor: 'rgba(18, 18, 18, 0.8)',
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

              {/* Joined Date */}
              <td className="px-4 py-2 text-gray-300 text-xs">
                {user.createdAt 
                  ? new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })
                  : 'N/A'
                }
              </td>

              {/* Actions */}
              <td className="px-4 py-2">
                <div className="flex items-center justify-center gap-1.5">
                  {/* View Button */}
                  <motion.button
                    onClick={() => onView(user)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-lg hover:bg-blue-500/20 transition-colors"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" style={{ color: '#00F0FF' }} />
                  </motion.button>

                  {/* Edit Button */}
                  <motion.button
                    onClick={() => onEdit(user)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-lg hover:bg-green-500/20 transition-colors"
                    title="Edit User"
                  >
                    <Edit className="w-4 h-4" style={{ color: '#39FF14' }} />
                  </motion.button>

                  {/* Delete Button */}
                  {user.role !== 'admin' ? (
                    <motion.button
                      onClick={() => onDelete(user._id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 rounded-lg hover:bg-red-500/20 transition-colors"
                      title="Delete User"
                    >
                      <Trash2 className="w-4 h-4" style={{ color: '#FF10F0' }} />
                    </motion.button>
                  ) : (
                    <div 
                      className="p-2 rounded-lg opacity-50 cursor-not-allowed"
                      title="Cannot delete admin accounts"
                    >
                      <Trash2 className="w-4 h-4 text-gray-600" />
                    </div>
                  )}
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;