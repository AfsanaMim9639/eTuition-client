import { useState, useEffect } from 'react';
import { 
  FaSave, 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt,
  FaGraduationCap,
  FaSchool,
  FaCamera
} from 'react-icons/fa';
import { userAPI } from '../../../utils/api';

const StudentProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    grade: '',
    institution: '',
    profileImage: ''
  });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setFormData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      address: user.address || '',
      grade: user.grade || '',
      institution: user.institution || '',
      profileImage: user.profileImage || ''
    });
    setImagePreview(user.profileImage || 'https://ui-avatars.com/api/?name=' + (user.name || 'User'));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await userAPI.updateProfile(formData);
      
      // Update localStorage
      const updatedUser = response.data.data || response.data.user;
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00ffcc] to-[#00ff88] bg-clip-text text-transparent">
          Profile Settings
        </h1>
        <p className="text-gray-400 mt-2">Update your personal information</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Image */}
        <div className="bg-gradient-to-br from-[#0f1512] to-[#0a0f0d] border-2 border-[#00ffcc]/30 rounded-xl p-8">
          <h2 className="text-xl font-bold text-[#00ffcc] mb-6">Profile Picture</h2>
          
          <div className="flex items-center gap-8">
            <div className="relative">
              <img
                src={imagePreview}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-[#00ffcc] object-cover"
              />
              <label className="absolute bottom-0 right-0 p-3 bg-gradient-to-r from-[#00ffcc] to-[#00ff88] rounded-full cursor-pointer hover:shadow-lg hover:shadow-[#00ffcc]/30 transition-all">
                <FaCamera className="text-[#0a0f0d]" size={16} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
            
            <div>
              <p className="text-gray-300 mb-2 text-lg">Upload a new profile picture</p>
              <p className="text-sm text-gray-500">JPG, PNG or GIF. Max size 2MB</p>
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="bg-gradient-to-br from-[#0f1512] to-[#0a0f0d] border-2 border-[#00ffcc]/30 rounded-xl p-8">
          <h2 className="text-xl font-bold text-[#00ffcc] mb-6">Basic Information</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                <FaUser className="inline mr-2" />
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#0a0f0d] border-2 border-[#00ffcc]/30 rounded-lg text-white focus:border-[#00ffcc] focus:outline-none transition-all"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                <FaEnvelope className="inline mr-2" />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                className="w-full px-4 py-3 bg-[#0a0f0d] border-2 border-gray-600 rounded-lg text-gray-500 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-2">Email cannot be changed</p>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                <FaPhone className="inline mr-2" />
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="01XXXXXXXXX"
                className="w-full px-4 py-3 bg-[#0a0f0d] border-2 border-[#00ffcc]/30 rounded-lg text-white focus:border-[#00ffcc] focus:outline-none transition-all"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                <FaMapMarkerAlt className="inline mr-2" />
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Your address"
                className="w-full px-4 py-3 bg-[#0a0f0d] border-2 border-[#00ffcc]/30 rounded-lg text-white focus:border-[#00ffcc] focus:outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Student Information */}
        <div className="bg-gradient-to-br from-[#0f1512] to-[#0a0f0d] border-2 border-[#00ffcc]/30 rounded-xl p-8">
          <h2 className="text-xl font-bold text-[#00ffcc] mb-6">Student Information</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Grade */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                <FaGraduationCap className="inline mr-2" />
                Current Grade/Class
              </label>
              <input
                type="text"
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                placeholder="e.g., Class 10, SSC, O Level"
                className="w-full px-4 py-3 bg-[#0a0f0d] border-2 border-[#00ffcc]/30 rounded-lg text-white focus:border-[#00ffcc] focus:outline-none transition-all"
              />
            </div>

            {/* Institution */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                <FaSchool className="inline mr-2" />
                Institution
              </label>
              <input
                type="text"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                placeholder="Your school/college"
                className="w-full px-4 py-3 bg-[#0a0f0d] border-2 border-[#00ffcc]/30 rounded-lg text-white focus:border-[#00ffcc] focus:outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-4 bg-gradient-to-r from-[#00ffcc] to-[#00ff88] text-[#0a0f0d] rounded-lg font-bold text-lg hover:shadow-lg hover:shadow-[#00ffcc]/30 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-[#0a0f0d] border-t-transparent"></div>
              Updating...
            </>
          ) : (
            <>
              <FaSave size={18} />
              Save Changes
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default StudentProfile;