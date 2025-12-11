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
  }, []);

  const fetchProfile = async () => {
    try {
      // Check what user object contains
      console.log('User object from context:', user);
      
      // Try different possible user id fields
      const userId = user?._id || user?.id || user?.userId;
      
      if (!userId) {
        console.error('No user ID found in user object');
        throw new Error('User ID not found');
      }
      
      console.log('Fetching profile for user ID:', userId);
      
      // GET /users/:userId endpoint থেকে data fetch করা
      const response = await api.get(`/users/${userId}`);
      console.log('Profile data received:', response.data);
      
      if (response.data.success) {
        const userData = response.data.data;
        setProfile({
          name: userData.name || '',
          email: userData.email || '',
          phone: userData.phone || '',
          address: userData.address || '',
          location: userData.location || '',
          subjects: userData.subjects || [],
          experience: userData.experience || 0,
          education: userData.education || [],
          bio: userData.bio || '',
          hourlyRate: userData.hourlyRate || 0,
          profileImage: userData.profileImage || ''
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      // PUT /users/profile endpoint এ data update করা
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
      
      if (response.data.success) {
        toast.success('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
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
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-[#00ffcc] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent mb-2">
          Profile Settings
        </h1>
        <p className="text-gray-400">Manage your profile information</p>
      </div>

      {/* Profile Form */}
      <div className="space-y-6">
        {/* Profile Picture */}
        <div className="border-2 border-[#00ffcc]/30 rounded-lg p-6 bg-gradient-to-br from-[#00ffcc]/10 to-[#00ff88]/10">
          <div className="flex items-center gap-6">
            <div className="relative">
              {profile.profileImage ? (
                <img 
                  src={profile.profileImage} 
                  alt={profile.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-[#00ffcc]"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#00ffcc] to-[#00ff88] flex items-center justify-center text-[#0a0f0d] font-bold text-3xl">
                  {profile.name?.charAt(0)?.toUpperCase() || 'T'}
                </div>
              )}
              <button
                type="button"
                className="absolute bottom-0 right-0 p-2 bg-[#00ffcc] rounded-full hover:bg-[#00ff88] transition-colors"
              >
                <Camera size={16} className="text-[#0a0f0d]" />
              </button>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">{profile.name}</h3>
              <p className="text-gray-400 text-sm">Tutor</p>
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="border-2 border-pink-500/30 rounded-lg p-6 bg-gradient-to-br from-pink-500/10 to-purple-600/10">
          <h2 className="text-xl font-bold text-pink-400 mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 mb-2 text-sm">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                  className="w-full pl-10 pr-4 py-2 bg-[#0a0f0d] border-2 border-pink-500/30 rounded-lg text-white focus:border-pink-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2 text-sm">Email (Cannot be changed)</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="email"
                  value={profile.email}
                  disabled
                  className="w-full pl-10 pr-4 py-2 bg-[#0a0f0d]/50 border-2 border-gray-500/30 rounded-lg text-gray-400 cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2 text-sm">Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  placeholder="01XXXXXXXXX"
                  className="w-full pl-10 pr-4 py-2 bg-[#0a0f0d] border-2 border-pink-500/30 rounded-lg text-white focus:border-pink-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2 text-sm">Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  value={profile.address}
                  onChange={(e) => setProfile({...profile, address: e.target.value})}
                  placeholder="Your full address"
                  className="w-full pl-10 pr-4 py-2 bg-[#0a0f0d] border-2 border-pink-500/30 rounded-lg text-white focus:border-pink-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-300 mb-2 text-sm">Location/Area</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  value={profile.location}
                  onChange={(e) => setProfile({...profile, location: e.target.value})}
                  placeholder="e.g., Dhanmondi, Dhaka"
                  className="w-full pl-10 pr-4 py-2 bg-[#0a0f0d] border-2 border-pink-500/30 rounded-lg text-white focus:border-pink-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Professional Information */}
        <div className="border-2 border-blue-500/30 rounded-lg p-6 bg-gradient-to-br from-blue-500/10 to-cyan-600/10">
          <h2 className="text-xl font-bold text-blue-400 mb-4">Professional Information</h2>
          
          {/* Subjects */}
          <div className="mb-4">
            <label className="block text-gray-300 mb-2 text-sm">Subjects You Teach</label>
            <div className="flex gap-2 mb-3">
              <div className="relative flex-1">
                <BookOpen className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSubject())}
                  placeholder="Add a subject"
                  className="w-full pl-10 pr-4 py-2 bg-[#0a0f0d] border-2 border-blue-500/30 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
              <button
                type="button"
                onClick={handleAddSubject}
                className="px-6 py-2 bg-blue-500/20 border-2 border-blue-500/50 text-blue-400 rounded-lg hover:bg-blue-500/30 hover:border-blue-500 transition-all"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.subjects.map((subject, index) => (
                <div
                  key={index}
                  className="px-3 py-1 bg-blue-500/20 border border-blue-500/50 rounded-full text-blue-400 flex items-center gap-2"
                >
                  <span>{subject}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSubject(index)}
                    className="hover:text-red-400 transition-colors"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Experience & Hourly Rate */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-300 mb-2 text-sm">Experience (Years)</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="number"
                  value={profile.experience}
                  onChange={(e) => setProfile({...profile, experience: parseInt(e.target.value) || 0})}
                  min="0"
                  className="w-full pl-10 pr-4 py-2 bg-[#0a0f0d] border-2 border-blue-500/30 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2 text-sm">Hourly Rate (৳)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="number"
                  value={profile.hourlyRate}
                  onChange={(e) => setProfile({...profile, hourlyRate: parseInt(e.target.value) || 0})}
                  min="0"
                  placeholder="500"
                  className="w-full pl-10 pr-4 py-2 bg-[#0a0f0d] border-2 border-blue-500/30 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="mb-4">
            <label className="block text-gray-300 mb-2 text-sm">Education</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
              <input
                type="text"
                value={newEducation.degree}
                onChange={(e) => setNewEducation({...newEducation, degree: e.target.value})}
                placeholder="Degree"
                className="px-4 py-2 bg-[#0a0f0d] border-2 border-blue-500/30 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              />
              <input
                type="text"
                value={newEducation.institution}
                onChange={(e) => setNewEducation({...newEducation, institution: e.target.value})}
                placeholder="Institution"
                className="px-4 py-2 bg-[#0a0f0d] border-2 border-blue-500/30 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newEducation.year}
                  onChange={(e) => setNewEducation({...newEducation, year: e.target.value})}
                  placeholder="Year"
                  className="flex-1 px-4 py-2 bg-[#0a0f0d] border-2 border-blue-500/30 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddEducation}
                  className="px-6 py-2 bg-blue-500/20 border-2 border-blue-500/50 text-blue-400 rounded-lg hover:bg-blue-500/30 hover:border-blue-500 transition-all"
                >
                  Add
                </button>
              </div>
            </div>
            <div className="space-y-2">
              {profile.education.map((edu, index) => (
                <div
                  key={index}
                  className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-center justify-between"
                >
                  <div className="flex items-center gap-2 text-white">
                    <GraduationCap className="text-blue-400" size={20} />
                    <div>
                      <div className="font-semibold">{edu.degree}</div>
                      <div className="text-sm text-gray-400">{edu.institution} {edu.year && `(${edu.year})`}</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveEducation(index)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-gray-300 mb-2 text-sm">Bio (Max 500 characters)</label>
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile({...profile, bio: e.target.value})}
              rows={4}
              maxLength={500}
              placeholder="Tell us about yourself, your teaching style, achievements..."
              className="w-full px-4 py-2 bg-[#0a0f0d] border-2 border-blue-500/30 rounded-lg text-white focus:border-blue-500 focus:outline-none resize-none"
            />
            <div className="text-right text-xs text-gray-400 mt-1">
              {profile.bio.length}/500
            </div>
          </div>
        </div>

        {/* Save Button */}
        <motion.button
          type="button"
          onClick={handleSubmit}
          disabled={saving}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-[#00ffcc] to-[#00ff88] text-[#0a0f0d] font-bold rounded-lg hover:shadow-lg hover:shadow-[#00ffcc]/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Save size={20} />
          {saving ? 'Saving...' : 'Save Changes'}
        </motion.button>
      </div>
    </div>
  );
};

export default TutorProfile;