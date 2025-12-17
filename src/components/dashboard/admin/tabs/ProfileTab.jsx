// src/components/dashboard/admin/tabs/ProfileTab.jsx

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Calendar, Shield, Edit2, Save, X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { userAPI } from '../../../../utils/api'; // ✅ Import API

const ProfileTab = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  // Load user data from localStorage
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setFormData({
        name: parsedUser.name || '',
        email: parsedUser.email || '',
        phone: parsedUser.phone || '',
        address: parsedUser.address || ''
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // ✅ Call API to update profile
      const response = await userAPI.updateProfile(formData);
      
      console.log('✅ Profile update response:', response.data);
      
      // ✅ Update localStorage with new user data
      const updatedUser = response.data.user || { ...user, ...formData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsEditing(false);
      
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('❌ Error updating profile:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      address: user.address || ''
    });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Admin Profile</h2>
          <p className="text-sm text-gray-400 mt-1">
            Manage your account information
          </p>
        </div>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all"
            style={{
              background: 'linear-gradient(135deg, #FF10F0, #00F0FF)',
              color: '#000'
            }}
          >
            <Edit2 className="w-4 h-4" />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all disabled:opacity-50"
              style={{
                background: loading ? 'rgba(100, 100, 100, 0.3)' : 'linear-gradient(135deg, #39FF14, #00F0FF)',
                color: loading ? '#666' : '#000'
              }}
            >
              <Save className="w-4 h-4" />
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}
      </div>

      {/* Profile Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="p-8 rounded-xl backdrop-blur-lg"
        style={{
          background: 'linear-gradient(135deg, rgba(18, 18, 18, 0.95), rgba(26, 26, 26, 0.95))',
          border: '2px solid rgba(255, 16, 240, 0.3)',
          boxShadow: '0 0 20px rgba(255, 16, 240, 0.1)'
        }}
      >
        {/* Avatar Section */}
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-800">
          <div 
            className="w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold"
            style={{
              background: 'linear-gradient(135deg, #FF10F0, #00F0FF)'
            }}
          >
            {user.name?.charAt(0).toUpperCase() || 'A'}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">{user.name}</h3>
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400 font-semibold">Administrator</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Calendar className="w-4 h-4" />
              Member since {new Date(user.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="space-y-6">
          {/* Name */}
          <div>
            <label className="flex items-center gap-2 text-gray-400 text-sm mb-2">
              <User className="w-4 h-4" />
              Full Name
            </label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white focus:border-cyan-400 focus:outline-none transition-colors"
                placeholder="Enter your name"
              />
            ) : (
              <p className="text-white text-lg font-medium">{user.name}</p>
            )}
          </div>

          {/* Email - Read only */}
          <div>
            <label className="flex items-center gap-2 text-gray-400 text-sm mb-2">
              <Mail className="w-4 h-4" />
              Email Address
            </label>
            <p className="text-white text-lg font-medium">{user.email}</p>
            {isEditing && (
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="flex items-center gap-2 text-gray-400 text-sm mb-2">
              <Phone className="w-4 h-4" />
              Phone Number
            </label>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white focus:border-cyan-400 focus:outline-none transition-colors"
                placeholder="Enter your phone number"
              />
            ) : (
              <p className="text-white text-lg font-medium">{user.phone || 'Not provided'}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="flex items-center gap-2 text-gray-400 text-sm mb-2">
              <MapPin className="w-4 h-4" />
              Address
            </label>
            {isEditing ? (
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white focus:border-cyan-400 focus:outline-none transition-colors resize-none"
                placeholder="Enter your address"
              />
            ) : (
              <p className="text-white text-lg font-medium">{user.address || 'Not provided'}</p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Account Details */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="p-6 rounded-xl backdrop-blur-lg"
        style={{
          background: 'linear-gradient(135deg, rgba(18, 18, 18, 0.95), rgba(26, 26, 26, 0.95))',
          border: '2px solid rgba(0, 240, 255, 0.3)',
          boxShadow: '0 0 20px rgba(0, 240, 255, 0.1)'
        }}
      >
        <h3 className="text-xl font-bold text-white mb-4">Account Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-gray-900/50">
            <p className="text-gray-400 text-sm mb-1">User ID</p>
            <p className="text-white font-mono text-xs">{user._id || user.id || 'N/A'}</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-900/50">
            <p className="text-gray-400 text-sm mb-1">Role</p>
            <p className="text-cyan-400 font-semibold capitalize">{user.role}</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-900/50">
            <p className="text-gray-400 text-sm mb-1">Account Status</p>
            <p className="text-green-400 font-semibold capitalize">{user.status || 'Active'}</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-900/50">
            <p className="text-gray-400 text-sm mb-1">Last Login</p>
            <p className="text-white text-sm">{new Date().toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProfileTab;