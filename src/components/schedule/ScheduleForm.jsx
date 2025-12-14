import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Calendar, 
  Clock, 
  Video, 
  MapPin,
  User,
  BookOpen,
  FileText,
  Save,
  Loader2
} from 'lucide-react';

const ScheduleForm = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  editData = null,
  students = [],
  tutors = [],
  currentUserRole 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    description: '',
    tutorId: '',
    studentId: '',
    startTime: '',
    endTime: '',
    classType: 'online',
    meetingLink: '',
    location: '',
    isRecurring: false,
    recurrence: {
      frequency: 'none',
      daysOfWeek: [],
      endDate: '',
      occurrences: 1
    }
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editData) {
      setFormData({
        title: editData.title || '',
        subject: editData.subject || '',
        description: editData.description || '',
        tutorId: editData.tutor?._id || '',
        studentId: editData.student?._id || '',
        startTime: editData.startTime ? new Date(editData.startTime).toISOString().slice(0, 16) : '',
        endTime: editData.endTime ? new Date(editData.endTime).toISOString().slice(0, 16) : '',
        classType: editData.classType || 'online',
        meetingLink: editData.meetingLink || '',
        location: editData.location || '',
        isRecurring: editData.isRecurring || false,
        recurrence: editData.recurrence || {
          frequency: 'none',
          daysOfWeek: [],
          endDate: '',
          occurrences: 1
        }
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleRecurrenceChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      recurrence: {
        ...prev.recurrence,
        [field]: value
      }
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.tutorId) newErrors.tutorId = 'Tutor is required';
    if (!formData.studentId) newErrors.studentId = 'Student is required';
    if (!formData.startTime) newErrors.startTime = 'Start time is required';
    if (!formData.endTime) newErrors.endTime = 'End time is required';

    if (formData.startTime && formData.endTime) {
      if (new Date(formData.endTime) <= new Date(formData.startTime)) {
        newErrors.endTime = 'End time must be after start time';
      }
    }

    if (formData.classType === 'online' && !formData.meetingLink.trim()) {
      newErrors.meetingLink = 'Meeting link is required for online classes';
    }

    if (formData.classType === 'in-person' && !formData.location.trim()) {
      newErrors.location = 'Location is required for in-person classes';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    setLoading(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#121212] rounded-xl sm:rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto
                   border border-[#FF10F0]/30 shadow-[0_0_50px_rgba(255,16,240,0.3)]"
        >
          {/* Header */}
          <div className="sticky top-0 bg-[#121212] border-b border-white/10 p-4 sm:p-6 flex items-center justify-between z-10">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF10F0] flex-shrink-0" />
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold gradient-text truncate">
                {editData ? 'Edit Schedule' : 'Create New Schedule'}
              </h2>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </motion.button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* Basic Info */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-[#00F0FF] flex items-center gap-2">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                Basic Information
              </h3>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-white mb-2">
                  Class Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Physics - Chapter 5: Motion"
                  className={`w-full input-neon text-sm sm:text-base ${errors.title ? 'border-red-500' : ''}`}
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1">{errors.title}</p>
                )}
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-white mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g., Physics"
                  className={`w-full input-neon text-sm sm:text-base ${errors.subject ? 'border-red-500' : ''}`}
                />
                {errors.subject && (
                  <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
                )}
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-white mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Brief description of the class..."
                  className="w-full input-neon resize-none text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Participants */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-[#00F0FF] flex items-center gap-2">
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
                Participants
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-white mb-2">
                    Tutor *
                  </label>
                  <select
                    name="tutorId"
                    value={formData.tutorId}
                    onChange={handleChange}
                    disabled={currentUserRole === 'tutor'}
                    className={`w-full input-neon text-sm sm:text-base ${errors.tutorId ? 'border-red-500' : ''}`}
                  >
                    <option value="">Select Tutor</option>
                    {tutors.map(tutor => (
                      <option key={tutor._id} value={tutor._id}>
                        {tutor.name}
                      </option>
                    ))}
                  </select>
                  {errors.tutorId && (
                    <p className="text-red-500 text-xs mt-1">{errors.tutorId}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-white mb-2">
                    Student *
                  </label>
                  <select
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    disabled={currentUserRole === 'student'}
                    className={`w-full input-neon text-sm sm:text-base ${errors.studentId ? 'border-red-500' : ''}`}
                  >
                    <option value="">Select Student</option>
                    {students.map(student => (
                      <option key={student._id} value={student._id}>
                        {student.name}
                      </option>
                    ))}
                  </select>
                  {errors.studentId && (
                    <p className="text-red-500 text-xs mt-1">{errors.studentId}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Time & Date */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-[#00F0FF] flex items-center gap-2">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                Schedule
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-white mb-2">
                    Start Time *
                  </label>
                  <input
                    type="datetime-local"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    className={`w-full input-neon text-sm sm:text-base ${errors.startTime ? 'border-red-500' : ''}`}
                  />
                  {errors.startTime && (
                    <p className="text-red-500 text-xs mt-1">{errors.startTime}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-white mb-2">
                    End Time *
                  </label>
                  <input
                    type="datetime-local"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    className={`w-full input-neon text-sm sm:text-base ${errors.endTime ? 'border-red-500' : ''}`}
                  />
                  {errors.endTime && (
                    <p className="text-red-500 text-xs mt-1">{errors.endTime}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Class Type & Location */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-[#00F0FF] flex items-center gap-2">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                Location
              </h3>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-white mb-2">
                  Class Type *
                </label>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {['online', 'in-person', 'hybrid'].map(type => (
                    <motion.button
                      key={type}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleChange({ target: { name: 'classType', value: type }})}
                      className={`
                        px-2 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold capitalize transition-all duration-300
                        ${formData.classType === type
                          ? 'bg-gradient-to-r from-[#FF10F0] to-[#00F0FF] text-black border-2 border-[#FF10F0]'
                          : 'bg-[#0a0a0a] text-white border-2 border-white/20 hover:border-[#FF10F0]'
                        }
                      `}
                    >
                      {type === 'online' && <Video className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" />}
                      {type === 'in-person' && <MapPin className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" />}
                      <span className="hidden sm:inline">{type}</span>
                      <span className="sm:hidden">{type.charAt(0).toUpperCase()}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {formData.classType === 'online' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                >
                  <label className="block text-xs sm:text-sm font-semibold text-white mb-2">
                    Meeting Link *
                  </label>
                  <input
                    type="url"
                    name="meetingLink"
                    value={formData.meetingLink}
                    onChange={handleChange}
                    placeholder="https://meet.google.com/..."
                    className={`w-full input-neon text-sm sm:text-base ${errors.meetingLink ? 'border-red-500' : ''}`}
                  />
                  {errors.meetingLink && (
                    <p className="text-red-500 text-xs mt-1">{errors.meetingLink}</p>
                  )}
                </motion.div>
              )}

              {formData.classType === 'in-person' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                >
                  <label className="block text-xs sm:text-sm font-semibold text-white mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., Room 301, City Library"
                    className={`w-full input-neon text-sm sm:text-base ${errors.location ? 'border-red-500' : ''}`}
                  />
                  {errors.location && (
                    <p className="text-red-500 text-xs mt-1">{errors.location}</p>
                  )}
                </motion.div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4 border-t border-white/10">
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="w-full sm:flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-[#0a0a0a] border border-white/20 text-white text-sm sm:text-base
                         font-semibold rounded-xl hover:border-white/40 transition-all duration-300"
              >
                Cancel
              </motion.button>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.05 }}
                whileTap={{ scale: loading ? 1 : 0.95 }}
                className="w-full sm:flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#FF10F0] to-[#00F0FF] 
                         text-black text-sm sm:text-base font-bold rounded-xl hover:shadow-[0_0_30px_rgba(255,16,240,0.5)]
                         transition-all duration-300 flex items-center justify-center gap-2
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                    <span className="hidden sm:inline">Saving...</span>
                    <span className="sm:hidden">...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">{editData ? 'Update Schedule' : 'Create Schedule'}</span>
                    <span className="sm:hidden">{editData ? 'Update' : 'Create'}</span>
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ScheduleForm;