import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, BookOpen, Save, Camera, GraduationCap, DollarSign, Briefcase } from 'lucide-react';
import api from '../../../utils/api';
import { useAuth } from '../../../contexts/AuthContext';
import toast from 'react-hot-toast';

const TutorProfile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    location: '',
    subjects: [],
    experience: 0,
    education: [],
    bio: '',
    hourlyRate: 0,
    profileImage: ''
  });
  const [newSubject, setNewSubject] = useState('');
  const [newEducation, setNewEducation] = useState({ degree: '', institution: '', year: '' });

  useEffect(() => {
    fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    try {
      console.log('🔍 User from context:', user);
      
      // ✅ Get user ID from different possible sources
      const userId = user?._id || user?.id || user?.userId;
      
      if (!userId) {
        console.error('❌ No user ID found');
        // Fallback: use data from context if available
        if (user) {
          console.log('⚠️ Using user data from context as fallback');
          setProfile({
            name: user.name || '',
            email: user.email || '',
            phone: user.phone || '',
            address: user.address || '',
            location: user.location || '',
            subjects: user.subjects || [],
            experience: user.experience || 0,
            education: user.education || [],
            bio: user.bio || '',
            hourlyRate: user.hourlyRate || 0,
            profileImage: user.profileImage || ''
          });
        }
        setLoading(false);
        return;
      }
      
      console.log('📡 Fetching profile for user ID:', userId);
      
      const response = await api.get(`/users/${userId}`);
      console.log('📦 Raw response:', response);
      console.log('📦 Response data:', response.data);
      
      // ✅ FIX: Handle different response structures
      let userData = null;
      
      if (response.data.data) {
        // Backend returns { status: 'success', data: user }
        userData = response.data.data;
        console.log('✅ Found user in response.data.data');
      } else if (response.data.user) {
        // Alternative structure { user: ... }
        userData = response.data.user;
        console.log('✅ Found user in response.data.user');
      } else if (response.data._id) {
        // Direct user object
        userData = response.data;
        console.log('✅ Found user directly in response.data');
      }
      
      if (!userData) {
        console.error('❌ No user data found in response');
        throw new Error('User data not found in response');
      }
      
      console.log('👤 User data extracted:', userData);
      
      setProfile({
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        address: userData.address || '',
        location: userData.location || '',
        subjects: Array.isArray(userData.subjects) ? userData.subjects : [],
        experience: userData.experience || 0,
        education: Array.isArray(userData.education) ? userData.education : [],
        bio: userData.bio || '',
        hourlyRate: userData.hourlyRate || 0,
        profileImage: userData.profileImage || ''
      });
      
      console.log('✅ Profile state updated');
      
    } catch (error) {
      console.error('❌ Error fetching profile:', error);
      console.error('❌ Error response:', error.response);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      console.log('📤 Updating profile with:', profile);
      
      const updateData = {
        name: profile.name,
        phone: profile.phone,
        address: profile.address,
        location: profile.location,
        subjects: profile.subjects,
        experience: profile.experience,
        education: profile.education,
        bio: profile.bio,
        hourlyRate: profile.hourlyRate
      };

      const response = await api.put('/users/profile', updateData);
      
      console.log('📦 Update response:', response.data);
      
      // ✅ FIX: Check for success in different ways
      const isSuccess = response.data.success || 
                       response.data.status === 'success' || 
                       response.status === 200;
      
      if (isSuccess) {
        toast.success('Profile updated successfully! ✨');
        
        // ✅ Update localStorage if user data returned
        if (response.data.data || response.data.user) {
          const updatedUser = response.data.data || response.data.user;
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
      } else {
        throw new Error('Update failed');
      }
    } catch (error) {
      console.error('❌ Error updating profile:', error);
      console.error('❌ Error response:', error.response);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleAddSubject = () => {
    if (newSubject.trim() && !profile.subjects.includes(newSubject.trim())) {
      setProfile({
        ...profile,
        subjects: [...profile.subjects, newSubject.trim()]
      });
      setNewSubject('');
    }
  };

  const handleRemoveSubject = (index) => {
    setProfile({
      ...profile,
      subjects: profile.subjects.filter((_, i) => i !== index)
    });
  };

  const handleAddEducation = () => {
    if (newEducation.degree && newEducation.institution) {
      setProfile({
        ...profile,
        education: [...profile.education, { ...newEducation }]
      });
      setNewEducation({ degree: '', institution: '', year: '' });
    }
  };

  const handleRemoveEducation = (index) => {
    setProfile({
      ...profile,
      education: profile.education.filter((_, i) => i !== index)
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-[#00ffcc] border-t-transparent rounded-full"
        />
        <p className="text-gray-400 text-sm">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 px-4 sm:px-0">
      {/* Header - Responsive */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent mb-2">
          Profile Settings
        </h1>
        <p className="text-sm sm:text-base text-gray-400">Manage your profile information</p>
      </div>

      {/* Profile Form */}
      <div className="space-y-6">
        {/* Profile Picture - Responsive */}
        <div className="border-2 border-[#00ffcc]/30 rounded-lg p-4 sm:p-6 bg-gradient-to-br from-[#00ffcc]/10 to-[#00ff88]/10">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="relative flex-shrink-0">
              {profile.profileImage ? (
                <img 
                  src={profile.profileImage} 
                  alt={profile.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://i.ibb.co/qpB9ZNp/default-avatar.png';
                  }}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-[#00ffcc]"
                />
              ) : (
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-r from-[#00ffcc] to-[#00ff88] flex items-center justify-center text-[#0a0f0d] font-bold text-2xl sm:text-3xl">
                  {profile.name?.charAt(0)?.toUpperCase() || 'T'}
                </div>
              )}
              <button
                type="button"
                className="absolute bottom-0 right-0 p-1.5 sm:p-2 bg-[#00ffcc] rounded-full hover:bg-[#00ff88] transition-colors"
              >
                <Camera size={14} className="sm:w-4 sm:h-4 text-[#0a0f0d]" />
              </button>
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 break-words">{profile.name || 'Your Name'}</h3>
              <p className="text-gray-400 text-xs sm:text-sm">Tutor</p>
            </div>
          </div>
        </div>

        {/* Basic Information - Responsive */}
        <div className="border-2 border-pink-500/30 rounded-lg p-4 sm:p-6 bg-gradient-to-br from-pink-500/10 to-purple-600/10">
          <h2 className="text-lg sm:text-xl font-bold text-pink-400 mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-gray-300 mb-2 text-xs sm:text-sm">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 sm:top-3 text-gray-400" size={18} />
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                  className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm sm:text-base bg-[#0a0f0d] border-2 border-pink-500/30 rounded-lg text-white focus:border-pink-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2 text-xs sm:text-sm">Email (Cannot be changed)</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 sm:top-3 text-gray-400" size={18} />
                <input
                  type="email"
                  value={profile.email}
                  disabled
                  className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm sm:text-base bg-[#0a0f0d]/50 border-2 border-gray-500/30 rounded-lg text-gray-400 cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2 text-xs sm:text-sm">Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 sm:top-3 text-gray-400" size={18} />
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  placeholder="01XXXXXXXXX"
                  className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm sm:text-base bg-[#0a0f0d] border-2 border-pink-500/30 rounded-lg text-white focus:border-pink-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2 text-xs sm:text-sm">Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 sm:top-3 text-gray-400" size={18} />
                <input
                  type="text"
                  value={profile.address}
                  onChange={(e) => setProfile({...profile, address: e.target.value})}
                  placeholder="Your full address"
                  className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm sm:text-base bg-[#0a0f0d] border-2 border-pink-500/30 rounded-lg text-white focus:border-pink-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-300 mb-2 text-xs sm:text-sm">Location/Area</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 sm:top-3 text-gray-400" size={18} />
                <input
                  type="text"
                  value={profile.location}
                  onChange={(e) => setProfile({...profile, location: e.target.value})}
                  placeholder="e.g., Dhanmondi, Dhaka"
                  className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm sm:text-base bg-[#0a0f0d] border-2 border-pink-500/30 rounded-lg text-white focus:border-pink-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Professional Information - Responsive */}
        <div className="border-2 border-blue-500/30 rounded-lg p-4 sm:p-6 bg-gradient-to-br from-blue-500/10 to-cyan-600/10">
          <h2 className="text-lg sm:text-xl font-bold text-blue-400 mb-4">Professional Information</h2>
          
          {/* Subjects */}
          <div className="mb-4">
            <label className="block text-gray-300 mb-2 text-xs sm:text-sm">Subjects You Teach</label>
            <div className="flex flex-col sm:flex-row gap-2 mb-3">
              <div className="relative flex-1">
                <BookOpen className="absolute left-3 top-2.5 sm:top-3 text-gray-400" size={18} />
                <input
                  type="text"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSubject())}
                  placeholder="Add a subject"
                  className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm sm:text-base bg-[#0a0f0d] border-2 border-blue-500/30 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
              <button
                type="button"
                onClick={handleAddSubject}
                className="px-4 sm:px-6 py-2 text-sm sm:text-base bg-blue-500/20 border-2 border-blue-500/50 text-blue-400 rounded-lg hover:bg-blue-500/30 hover:border-blue-500 transition-all"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.subjects.map((subject, index) => (
                <div
                  key={index}
                  className="px-3 py-1 text-xs sm:text-sm bg-blue-500/20 border border-blue-500/50 rounded-full text-blue-400 flex items-center gap-2"
                >
                  <span>{subject}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSubject(index)}
                    className="hover:text-red-400 transition-colors text-base sm:text-lg"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Experience & Hourly Rate */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
            <div>
              <label className="block text-gray-300 mb-2 text-xs sm:text-sm">Experience (Years)</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-2.5 sm:top-3 text-gray-400" size={18} />
                <input
                  type="number"
                  value={profile.experience}
                  onChange={(e) => setProfile({...profile, experience: parseInt(e.target.value) || 0})}
                  min="0"
                  className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm sm:text-base bg-[#0a0f0d] border-2 border-blue-500/30 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2 text-xs sm:text-sm">Hourly Rate (৳)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 sm:top-3 text-gray-400" size={18} />
                <input
                  type="number"
                  value={profile.hourlyRate}
                  onChange={(e) => setProfile({...profile, hourlyRate: parseInt(e.target.value) || 0})}
                  min="0"
                  placeholder="500"
                  className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm sm:text-base bg-[#0a0f0d] border-2 border-blue-500/30 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Education - Responsive */}
          <div className="mb-4">
            <label className="block text-gray-300 mb-2 text-xs sm:text-sm">Education</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-3">
              <input
                type="text"
                value={newEducation.degree}
                onChange={(e) => setNewEducation({...newEducation, degree: e.target.value})}
                placeholder="Degree"
                className="px-4 py-2 text-sm sm:text-base bg-[#0a0f0d] border-2 border-blue-500/30 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              />
              <input
                type="text"
                value={newEducation.institution}
                onChange={(e) => setNewEducation({...newEducation, institution: e.target.value})}
                placeholder="Institution"
                className="px-4 py-2 text-sm sm:text-base bg-[#0a0f0d] border-2 border-blue-500/30 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              />
              <div className="flex gap-2 sm:col-span-2 md:col-span-1">
                <input
                  type="text"
                  value={newEducation.year}
                  onChange={(e) => setNewEducation({...newEducation, year: e.target.value})}
                  placeholder="Year"
                  className="flex-1 px-4 py-2 text-sm sm:text-base bg-[#0a0f0d] border-2 border-blue-500/30 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddEducation}
                  className="px-4 sm:px-6 py-2 text-sm sm:text-base bg-blue-500/20 border-2 border-blue-500/50 text-blue-400 rounded-lg hover:bg-blue-500/30 hover:border-blue-500 transition-all"
                >
                  Add
                </button>
              </div>
            </div>
            <div className="space-y-2">
              {profile.education.map((edu, index) => (
                <div
                  key={index}
                  className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
                >
                  <div className="flex items-start gap-2 text-white flex-1">
                    <GraduationCap className="text-blue-400 flex-shrink-0 mt-1" size={18} />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm sm:text-base break-words">{edu.degree}</div>
                      <div className="text-xs sm:text-sm text-gray-400 break-words">{edu.institution} {edu.year && `(${edu.year})`}</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveEducation(index)}
                    className="text-xs sm:text-sm text-red-400 hover:text-red-300 transition-colors whitespace-nowrap"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Bio - Responsive */}
          <div>
            <label className="block text-gray-300 mb-2 text-xs sm:text-sm">Bio (Max 500 characters)</label>
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile({...profile, bio: e.target.value})}
              rows={4}
              maxLength={500}
              placeholder="Tell us about yourself, your teaching style, achievements..."
              className="w-full px-4 py-2 text-sm sm:text-base bg-[#0a0f0d] border-2 border-blue-500/30 rounded-lg text-white focus:border-blue-500 focus:outline-none resize-none"
            />
            <div className="text-right text-xs text-gray-400 mt-1">
              {profile.bio.length}/500
            </div>
          </div>
        </div>

        {/* Save Button - Responsive */}
        <motion.button
          type="button"
          onClick={handleSubmit}
          disabled={saving}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full md:w-auto px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-[#00ffcc] to-[#00ff88] text-[#0a0f0d] font-bold rounded-lg hover:shadow-lg hover:shadow-[#00ffcc]/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {saving ? (
            <>
              <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-[#0a0f0d]/30 border-t-[#0a0f0d] rounded-full animate-spin"></div>
              Saving...
            </>
          ) : (
            <>
              <Save size={18} />
              Save Changes
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default TutorProfile;