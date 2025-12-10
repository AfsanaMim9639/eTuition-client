import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FaSave, 
  FaTimes, 
  FaBook, 
  FaGraduationCap, 
  FaMapMarkerAlt, 
  FaDollarSign,
  FaClock,
  FaCalendar,
  FaUser,
  FaInfoCircle
} from 'react-icons/fa';
import { tuitionAPI } from '../../../utils/api';

const PostNewTuition = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editingTuition = location.state?.tuition;
  const isEditing = !!editingTuition;

  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    grade: '',
    location: '',
    salary: '',
    schedule: '',
    requirements: '',
    tutoring_type: 'Home Tutoring',
    preferred_medium: 'Both',
    days_per_week: 3,
    class_duration: '1 hour',
    student_gender: 'Any',
    tutor_gender_preference: 'Any',
    description: ''
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingTuition) {
      setFormData({
        title: editingTuition.title || '',
        subject: editingTuition.subject || '',
        grade: editingTuition.grade || '',
        location: editingTuition.location || '',
        salary: editingTuition.salary || '',
        schedule: editingTuition.schedule || '',
        requirements: editingTuition.requirements || '',
        tutoring_type: editingTuition.tutoring_type || 'Home Tutoring',
        preferred_medium: editingTuition.preferred_medium || 'Both',
        days_per_week: editingTuition.days_per_week || 3,
        class_duration: editingTuition.class_duration || '1 hour',
        student_gender: editingTuition.student_gender || 'Any',
        tutor_gender_preference: editingTuition.tutor_gender_preference || 'Any',
        description: editingTuition.description || ''
      });
    }
  }, [editingTuition]);

  const subjects = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology',
    'English', 'Bangla', 'ICT', 'Economics',
    'Accounting', 'Finance', 'Statistics', 'Other'
  ];

  const grades = [
    'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
    'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10',
    'SSC', 'HSC', 'O Level', 'A Level', 'Undergraduate', 'Graduate'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.subject) newErrors.subject = 'Subject is required';
    if (!formData.grade) newErrors.grade = 'Grade is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.salary || formData.salary < 1) newErrors.salary = 'Valid salary is required';
    if (!formData.schedule.trim()) newErrors.schedule = 'Schedule is required';
    if (!formData.requirements.trim()) newErrors.requirements = 'Requirements are required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    try {
      setLoading(true);
      
      if (isEditing) {
        await tuitionAPI.updateTuition(editingTuition._id, formData);
        alert('Tuition updated successfully!');
      } else {
        await tuitionAPI.createTuition(formData);
        alert('Tuition posted successfully!');
      }
      
      navigate('/student/my-tuitions');
    } catch (error) {
      console.error('Error saving tuition:', error);
      alert(error.response?.data?.message || 'Failed to save tuition. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00ffcc] to-[#00ff88] bg-clip-text text-transparent">
            {isEditing ? 'Edit Tuition' : 'Post New Tuition'}
          </h1>
          <p className="text-gray-400 mt-1">
            {isEditing ? 'Update your tuition details' : 'Fill in the details to find the perfect tutor'}
          </p>
        </div>
        <button
          onClick={() => navigate('/student/my-tuitions')}
          className="p-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-all"
          title="Cancel"
        >
          <FaTimes />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-gradient-to-br from-[#0f1512] to-[#0a0f0d] border-2 border-[#00ffcc]/30 rounded-xl p-6">
          <h2 className="text-xl font-bold text-[#00ffcc] mb-6 flex items-center gap-2">
            <FaInfoCircle />
            Basic Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Tuition Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Need Math Tutor for Class 10"
                className={`w-full px-4 py-3 bg-[#0a0f0d] border-2 ${
                  errors.title ? 'border-red-500' : 'border-[#00ffcc]/30'
                } rounded-lg text-white focus:border-[#00ffcc] focus:outline-none transition-all`}
              />
              {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                <FaBook className="inline mr-2" />
                Subject <span className="text-red-400">*</span>
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-[#0a0f0d] border-2 ${
                  errors.subject ? 'border-red-500' : 'border-[#00ffcc]/30'
                } rounded-lg text-white focus:border-[#00ffcc] focus:outline-none transition-all`}
              >
                <option value="">Select Subject</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
              {errors.subject && <p className="text-red-400 text-sm mt-1">{errors.subject}</p>}
            </div>

            {/* Grade */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                <FaGraduationCap className="inline mr-2" />
                Grade/Class <span className="text-red-400">*</span>
              </label>
              <select
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-[#0a0f0d] border-2 ${
                  errors.grade ? 'border-red-500' : 'border-[#00ffcc]/30'
                } rounded-lg text-white focus:border-[#00ffcc] focus:outline-none transition-all`}
              >
                <option value="">Select Grade</option>
                {grades.map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
              {errors.grade && <p className="text-red-400 text-sm mt-1">{errors.grade}</p>}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                <FaMapMarkerAlt className="inline mr-2" />
                Location <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Dhanmondi, Dhaka"
                className={`w-full px-4 py-3 bg-[#0a0f0d] border-2 ${
                  errors.location ? 'border-red-500' : 'border-[#00ffcc]/30'
                } rounded-lg text-white focus:border-[#00ffcc] focus:outline-none transition-all`}
              />
              {errors.location && <p className="text-red-400 text-sm mt-1">{errors.location}</p>}
            </div>

            {/* Salary */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                <FaDollarSign className="inline mr-2" />
                Salary (BDT/month) <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="e.g., 5000"
                min="0"
                className={`w-full px-4 py-3 bg-[#0a0f0d] border-2 ${
                  errors.salary ? 'border-red-500' : 'border-[#00ffcc]/30'
                } rounded-lg text-white focus:border-[#00ffcc] focus:outline-none transition-all`}
              />
              {errors.salary && <p className="text-red-400 text-sm mt-1">{errors.salary}</p>}
            </div>
          </div>
        </div>

        {/* Schedule & Preferences */}
        <div className="bg-gradient-to-br from-[#0f1512] to-[#0a0f0d] border-2 border-[#00ffcc]/30 rounded-xl p-6">
          <h2 className="text-xl font-bold text-[#00ffcc] mb-6 flex items-center gap-2">
            <FaClock />
            Schedule & Preferences
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Schedule */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                <FaCalendar className="inline mr-2" />
                Preferred Schedule <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="schedule"
                value={formData.schedule}
                onChange={handleChange}
                placeholder="e.g., Monday to Friday, 6:00 PM - 8:00 PM"
                className={`w-full px-4 py-3 bg-[#0a0f0d] border-2 ${
                  errors.schedule ? 'border-red-500' : 'border-[#00ffcc]/30'
                } rounded-lg text-white focus:border-[#00ffcc] focus:outline-none transition-all`}
              />
              {errors.schedule && <p className="text-red-400 text-sm mt-1">{errors.schedule}</p>}
            </div>

            {/* Tutoring Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Tutoring Type
              </label>
              <select
                name="tutoring_type"
                value={formData.tutoring_type}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#0a0f0d] border-2 border-[#00ffcc]/30 rounded-lg text-white focus:border-[#00ffcc] focus:outline-none transition-all"
              >
                <option value="Home Tutoring">Home Tutoring</option>
                <option value="Online Tutoring">Online Tutoring</option>
                <option value="Both">Both</option>
              </select>
            </div>

            {/* Preferred Medium */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Preferred Medium
              </label>
              <select
                name="preferred_medium"
                value={formData.preferred_medium}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#0a0f0d] border-2 border-[#00ffcc]/30 rounded-lg text-white focus:border-[#00ffcc] focus:outline-none transition-all"
              >
                <option value="Bangla Medium">Bangla Medium</option>
                <option value="English Medium">English Medium</option>
                <option value="English Version">English Version</option>
                <option value="Both">Both</option>
              </select>
            </div>

            {/* Days Per Week */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Days Per Week
              </label>
              <input
                type="number"
                name="days_per_week"
                value={formData.days_per_week}
                onChange={handleChange}
                min="1"
                max="7"
                className="w-full px-4 py-3 bg-[#0a0f0d] border-2 border-[#00ffcc]/30 rounded-lg text-white focus:border-[#00ffcc] focus:outline-none transition-all"
              />
            </div>

            {/* Class Duration */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Class Duration
              </label>
              <select
                name="class_duration"
                value={formData.class_duration}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#0a0f0d] border-2 border-[#00ffcc]/30 rounded-lg text-white focus:border-[#00ffcc] focus:outline-none transition-all"
              >
                <option value="30 minutes">30 minutes</option>
                <option value="1 hour">1 hour</option>
                <option value="1.5 hours">1.5 hours</option>
                <option value="2 hours">2 hours</option>
              </select>
            </div>

            {/* Student Gender */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                <FaUser className="inline mr-2" />
                Student Gender
              </label>
              <select
                name="student_gender"
                value={formData.student_gender}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#0a0f0d] border-2 border-[#00ffcc]/30 rounded-lg text-white focus:border-[#00ffcc] focus:outline-none transition-all"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Any">Any</option>
              </select>
            </div>

            {/* Tutor Gender Preference */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Tutor Gender Preference
              </label>
              <select
                name="tutor_gender_preference"
                value={formData.tutor_gender_preference}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#0a0f0d] border-2 border-[#00ffcc]/30 rounded-lg text-white focus:border-[#00ffcc] focus:outline-none transition-all"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Any">Any</option>
              </select>
            </div>
          </div>
        </div>

        {/* Requirements & Description */}
        <div className="bg-gradient-to-br from-[#0f1512] to-[#0a0f0d] border-2 border-[#00ffcc]/30 rounded-xl p-6">
          <h2 className="text-xl font-bold text-[#00ffcc] mb-6">Additional Details</h2>

          <div className="space-y-6">
            {/* Requirements */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Requirements <span className="text-red-400">*</span>
              </label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                rows="4"
                placeholder="Describe what you're looking for in a tutor..."
                className={`w-full px-4 py-3 bg-[#0a0f0d] border-2 ${
                  errors.requirements ? 'border-red-500' : 'border-[#00ffcc]/30'
                } rounded-lg text-white focus:border-[#00ffcc] focus:outline-none transition-all resize-none`}
              />
              {errors.requirements && <p className="text-red-400 text-sm mt-1">{errors.requirements}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Additional Description (Optional)
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                placeholder="Any additional information..."
                className="w-full px-4 py-3 bg-[#0a0f0d] border-2 border-[#00ffcc]/30 rounded-lg text-white focus:border-[#00ffcc] focus:outline-none transition-all resize-none"
              />
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => navigate('/student/my-tuitions')}
            className="flex-1 px-6 py-4 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-bold transition-all flex items-center justify-center gap-2"
          >
            <FaTimes />
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-6 py-4 bg-gradient-to-r from-[#00ffcc] to-[#00ff88] text-[#0a0f0d] rounded-lg font-bold hover:shadow-lg hover:shadow-[#00ffcc]/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-[#0a0f0d] border-t-transparent"></div>
                {isEditing ? 'Updating...' : 'Posting...'}
              </>
            ) : (
              <>
                <FaSave />
                {isEditing ? 'Update Tuition' : 'Post Tuition'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostNewTuition;