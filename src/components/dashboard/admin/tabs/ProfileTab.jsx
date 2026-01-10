// src/components/dashboard/admin/tabs/ProfileTab.jsx

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Calendar, Shield, Edit2, Save, X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { userAPI } from '../../../../utils/api';
import { useTheme } from '../../../../contexts/ThemeContext';

const ProfileTab = () => {
  const { isDark } = useTheme();
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
      console.log('👤 Loaded user from localStorage:', parsedUser);
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
      console.log('📤 Updating profile with:', formData);
      
      const response = await userAPI.updateProfile(formData);
      
      console.log('📦 Update response:', response.data);
      
      let updatedUser = null;
      
      if (response.data.data) {
        updatedUser = response.data.data;
        console.log('✅ Found updated user in response.data.data');
      } else if (response.data.user) {
        updatedUser = response.data.user;
        console.log('✅ Found updated user in response.data.user');
      } else {
        updatedUser = { ...user, ...formData };
        console.log('⚠️ Using fallback: merged data');
      }
      
      console.log('💾 Saving to localStorage:', updatedUser);
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsEditing(false);
      
      toast.success('Profile updated successfully! ✨');
    } catch (error) {
      console.error('❌ Error updating profile:', error);
      console.error('❌ Error response:', error.response);
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
        <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${
          isDark ? 'border-cyan-400' : 'border-cyan-600'
        }`}></div>
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Admin Profile
          </h2>
          <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
            Manage your account information
          </p>
        </div>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all hover:scale-105"
            style={{
              background: isDark 
                ? 'linear-gradient(135deg, #FF10F0, #00F0FF)' 
                : 'linear-gradient(135deg, #a855f7, #0891b2)',
              color: isDark ? '#000' : '#fff'
            }}
          >
            <Edit2 className="w-4 h-4" />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-3 w-full sm:w-auto">
            <button
              onClick={handleCancel}
              disabled={loading}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all disabled:opacity-50 ${
                isDark
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all disabled:opacity-50"
              style={{
                background: loading 
                  ? 'rgba(100, 100, 100, 0.3)' 
                  : isDark 
                    ? 'linear-gradient(135deg, #39FF14, #00F0FF)' 
                    : 'linear-gradient(135deg, #065f46, #0891b2)',
                color: loading ? '#666' : isDark ? '#000' : '#fff'
              }}
            >
              {loading ? (
                <>
                  <div className={`w-4 h-4 border-2 border-t-transparent rounded-full animate-spin ${
                    isDark ? 'border-gray-600' : 'border-gray-400'
                  }`}></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Profile Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="p-4 sm:p-6 md:p-8 rounded-xl backdrop-blur-lg"
        style={{
          background: isDark 
            ? 'linear-gradient(135deg, rgba(18, 18, 18, 0.95), rgba(26, 26, 26, 0.95))'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(249, 250, 251, 0.95))',
          border: isDark ? '2px solid rgba(255, 16, 240, 0.3)' : '2px solid rgba(168, 85, 247, 0.3)',
          boxShadow: isDark ? '0 0 20px rgba(255, 16, 240, 0.1)' : '0 0 10px rgba(168, 85, 247, 0.1)'
        }}
      >
        {/* Avatar Section */}
        <div className={`flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b ${
          isDark ? 'border-gray-800' : 'border-gray-200'
        }`}>
          <div 
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-3xl sm:text-4xl font-bold flex-shrink-0"
            style={{
              background: isDark 
                ? 'linear-gradient(135deg, #FF10F0, #00F0FF)'
                : 'linear-gradient(135deg, #a855f7, #0891b2)',
              color: '#fff'
            }}
          >
            {user.name?.charAt(0).toUpperCase() || 'A'}
          </div>
          <div className="text-center sm:text-left">
            <h3 className={`text-xl sm:text-2xl font-bold mb-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {user.name}
            </h3>
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
              <Shield className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
              <span className={`font-semibold ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`}>
                Administrator
              </span>
            </div>
            <div className={`flex items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <Calendar className="w-4 h-4" />
              Member since {new Date(user.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="space-y-4 sm:space-y-6">
          {/* Name */}
          <div>
            <label className={`flex items-center gap-2 text-xs sm:text-sm mb-2 ${
              isDark ? 'text-gray-400' : 'text-gray-700'
            }`}>
              <User className="w-4 h-4" />
              Full Name
            </label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border text-sm sm:text-base focus:outline-none transition-colors ${
                  isDark
                    ? 'bg-gray-900/50 border-gray-700 text-white focus:border-cyan-400'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-cyan-600'
                }`}
                placeholder="Enter your name"
              />
            ) : (
              <p className={`text-base sm:text-lg font-medium break-words ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {user.name}
              </p>
            )}
          </div>

          {/* Email - Read only */}
          <div>
            <label className={`flex items-center gap-2 text-xs sm:text-sm mb-2 ${
              isDark ? 'text-gray-400' : 'text-gray-700'
            }`}>
              <Mail className="w-4 h-4" />
              Email Address
            </label>
            <p className={`text-base sm:text-lg font-medium break-all ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {user.email}
            </p>
            {isEditing && (
              <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                Email cannot be changed
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className={`flex items-center gap-2 text-xs sm:text-sm mb-2 ${
              isDark ? 'text-gray-400' : 'text-gray-700'
            }`}>
              <Phone className="w-4 h-4" />
              Phone Number
            </label>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border text-sm sm:text-base focus:outline-none transition-colors ${
                  isDark
                    ? 'bg-gray-900/50 border-gray-700 text-white focus:border-cyan-400'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-cyan-600'
                }`}
                placeholder="Enter your phone number"
              />
            ) : (
              <p className={`text-base sm:text-lg font-medium ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {user.phone || 'Not provided'}
              </p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className={`flex items-center gap-2 text-xs sm:text-sm mb-2 ${
              isDark ? 'text-gray-400' : 'text-gray-700'
            }`}>
              <MapPin className="w-4 h-4" />
              Address
            </label>
            {isEditing ? (
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border text-sm sm:text-base focus:outline-none transition-colors resize-none ${
                  isDark
                    ? 'bg-gray-900/50 border-gray-700 text-white focus:border-cyan-400'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-cyan-600'
                }`}
                placeholder="Enter your address"
              />
            ) : (
              <p className={`text-base sm:text-lg font-medium ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {user.address || 'Not provided'}
              </p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Account Details */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="p-4 sm:p-6 rounded-xl backdrop-blur-lg"
        style={{
          background: isDark 
            ? 'linear-gradient(135deg, rgba(18, 18, 18, 0.95), rgba(26, 26, 26, 0.95))'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(249, 250, 251, 0.95))',
          border: isDark ? '2px solid rgba(0, 240, 255, 0.3)' : '2px solid rgba(8, 145, 178, 0.3)',
          boxShadow: isDark ? '0 0 20px rgba(0, 240, 255, 0.1)' : '0 0 10px rgba(8, 145, 178, 0.1)'
        }}
      >
        <h3 className={`text-lg sm:text-xl font-bold mb-4 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          Account Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className={`p-3 sm:p-4 rounded-lg ${
            isDark ? 'bg-gray-900/50' : 'bg-gray-50'
          }`}>
            <p className={`text-xs sm:text-sm mb-1 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              User ID
            </p>
            <p className={`font-mono text-xs break-all ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {user._id || user.id || 'N/A'}
            </p>
          </div>
          <div className={`p-3 sm:p-4 rounded-lg ${
            isDark ? 'bg-gray-900/50' : 'bg-gray-50'
          }`}>
            <p className={`text-xs sm:text-sm mb-1 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Role
            </p>
            <p className={`font-semibold capitalize ${
              isDark ? 'text-cyan-400' : 'text-cyan-700'
            }`}>
              {user.role}
            </p>
          </div>
          <div className={`p-3 sm:p-4 rounded-lg ${
            isDark ? 'bg-gray-900/50' : 'bg-gray-50'
          }`}>
            <p className={`text-xs sm:text-sm mb-1 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Account Status
            </p>
            <p className={`font-semibold capitalize ${
              isDark ? 'text-green-400' : 'text-green-700'
            }`}>
              {user.status || 'Active'}
            </p>
          </div>
          <div className={`p-3 sm:p-4 rounded-lg ${
            isDark ? 'bg-gray-900/50' : 'bg-gray-50'
          }`}>
            <p className={`text-xs sm:text-sm mb-1 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Last Login
            </p>
            <p className={`text-xs sm:text-sm ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {new Date().toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProfileTab;