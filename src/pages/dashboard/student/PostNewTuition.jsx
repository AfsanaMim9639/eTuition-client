import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../utils/api';
import toast from 'react-hot-toast';
import { FaBook, FaMapMarkerAlt, FaDollarSign, FaCalendar } from 'react-icons/fa';

const PostNewTuition = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    class: '',
    category: '',
    medium: '',
    location: '',
    area: '',
    salary: '',
    daysPerWeek: '',
    duration: '',
    studentGender: '',
    preferredTutorGender: '',
    details: ''
  });

  const categories = [
    'Class 1-5',
    'Class 6-8',
    'Class 9-10',
    'SSC',
    'HSC',
    'University',
    'Professional'
  ];

  const subjects = [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'English',
    'Bangla',
    'ICT',
    'Economics',
    'Accounting',
    'Business Studies',
    'Higher Mathematics',
    'Statistics'
  ];

  const mediums = ['Bangla', 'English', 'Both'];
  const genders = ['Male', 'Female', 'Any'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/tuitions', formData);
      toast.success('Tuition posted successfully!');
      navigate('/dashboard/tuitions');
    } catch (error) {
      console.error('Error posting tuition:', error);
      toast.error(error.response?.data?.message || 'Failed to post tuition');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold gradient-text mb-2">Post New Tuition</h1>
        <p className="text-gray-400">Fill in the details to find the perfect tutor</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="card-neon card-neon-blue p-6 rounded-xl">
          <h2 className="text-2xl font-bold neon-text-blue mb-6 flex items-center gap-2">
            <FaBook /> Basic Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Tuition Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Need Physics tutor for HSC"
                className="input-neon w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Subject *
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="input-neon w-full"
                required
              >
                <option value="">Select Subject</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Class/Level *
              </label>
              <input
                type="text"
                name="class"
                value={formData.class}
                onChange={handleChange}
                placeholder="e.g., Class 10, HSC 1st Year"
                className="input-neon w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input-neon w-full"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Medium *
              </label>
              <select
                name="medium"
                value={formData.medium}
                onChange={handleChange}
                className="input-neon w-full"
                required
              >
                <option value="">Select Medium</option>
                {mediums.map((med) => (
                  <option key={med} value={med}>
                    {med}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Location Details */}
        <div className="card-neon card-neon-pink p-6 rounded-xl">
          <h2 className="text-2xl font-bold neon-text-pink mb-6 flex items-center gap-2">
            <FaMapMarkerAlt /> Location Details
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Location/City *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Dhaka, Chittagong"
                className="input-neon w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Area/Neighborhood *
              </label>
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleChange}
                placeholder="e.g., Dhanmondi, Gulshan"
                className="input-neon w-full"
                required
              />
            </div>
          </div>
        </div>

        {/* Tuition Details */}
        <div className="card-neon card-neon-green p-6 rounded-xl">
          <h2 className="text-2xl font-bold neon-text-green mb-6 flex items-center gap-2">
            <FaDollarSign /> Tuition Details
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Salary (BDT/month) *
              </label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="e.g., 5000"
                className="input-neon w-full"
                min="0"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Days Per Week *
              </label>
              <select
                name="daysPerWeek"
                value={formData.daysPerWeek}
                onChange={handleChange}
                className="input-neon w-full"
                required
              >
                <option value="">Select Days</option>
                {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                  <option key={day} value={day}>
                    {day} {day === 1 ? 'day' : 'days'} per week
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Duration (minutes) *
              </label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g., 60, 90, 120"
                className="input-neon w-full"
                min="30"
                step="30"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Student Gender *
              </label>
              <select
                name="studentGender"
                value={formData.studentGender}
                onChange={handleChange}
                className="input-neon w-full"
                required
              >
                <option value="">Select Gender</option>
                {genders.map((gender) => (
                  <option key={gender} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Preferred Tutor Gender *
              </label>
              <select
                name="preferredTutorGender"
                value={formData.preferredTutorGender}
                onChange={handleChange}
                className="input-neon w-full"
                required
              >
                <option value="">Select Preference</option>
                {genders.map((gender) => (
                  <option key={gender} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Additional Details */}
        <div className="card-neon card-neon-blue p-6 rounded-xl">
          <h2 className="text-2xl font-bold neon-text-blue mb-6 flex items-center gap-2">
            <FaCalendar /> Additional Details
          </h2>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Additional Information
            </label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              placeholder="Any specific requirements, preferred time slots, or additional information..."
              className="input-neon w-full h-32 resize-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="btn btn-neon-pink px-8 py-3 rounded-lg font-semibold flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Posting...' : 'Post Tuition'}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn btn-neon-blue px-8 py-3 rounded-lg font-semibold"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostNewTuition;