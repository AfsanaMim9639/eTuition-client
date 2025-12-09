import { useForm } from 'react-hook-form';
import { FaBook, FaMapMarkerAlt, FaDollarSign, FaClock, FaCalendarAlt } from 'react-icons/fa';

const TuitionForm = ({ onSubmit, defaultValues, loading }) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm({ 
    defaultValues: defaultValues || {
      tutoring_type: 'Home Tutoring',
      preferred_medium: 'Both',
      student_gender: 'Any',
      tutor_gender_preference: 'Any'
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-semibold mb-2 neon-text-blue flex items-center gap-2">
          <FaBook />
          Tuition Title *
    </label>
    <input
      {...register('title', { required: 'Title is required' })}
      className="input-neon w-full"
      placeholder="e.g., Need Mathematics Tutor for SSC Student"
    />
    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
  </div>

  {/* Subject & Grade */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label className="block text-sm font-semibold mb-2 neon-text-blue">Subject *</label>
      <select {...register('subject', { required: 'Subject is required' })} className="input-neon w-full">
        <option value="">Select Subject</option>
        <option value="Mathematics">Mathematics</option>
        <option value="Physics">Physics</option>
        <option value="Chemistry">Chemistry</option>
        <option value="Biology">Biology</option>
        <option value="English">English</option>
        <option value="Bangla">Bangla</option>
        <option value="ICT">ICT</option>
        <option value="Higher Math">Higher Math</option>
      </select>
      {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
    </div>

    <div>
      <label className="block text-sm font-semibold mb-2 neon-text-blue">Grade/Class *</label>
      <select {...register('grade', { required: 'Grade is required' })} className="input-neon w-full">
        <option value="">Select Grade</option>
        <option value="Class 6">Class 6</option>
        <option value="Class 7">Class 7</option>
        <option value="Class 8">Class 8</option>
        <option value="Class 9">Class 9 (SSC)</option>
        <option value="Class 10">Class 10 (SSC)</option>
        <option value="Class 11">Class 11 (HSC)</option>
        <option value="Class 12">Class 12 (HSC)</option>
      </select>
      {errors.grade && <p className="text-red-500 text-sm mt-1">{errors.grade.message}</p>}
    </div>
  </div>

  {/* Location & Salary */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label className="block text-sm font-semibold mb-2 neon-text-blue flex items-center gap-2">
        <FaMapMarkerAlt />
        Location *
      </label>
      <input
        {...register('location', { required: 'Location is required' })}
        className="input-neon w-full"
        placeholder="e.g., Dhanmondi, Dhaka"
      />
      {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
    </div>

    <div>
      <label className="block text-sm font-semibold mb-2 neon-text-green flex items-center gap-2">
        <FaDollarSign />
        Monthly Salary (BDT) *
      </label>
      <input
        type="number"
        {...register('salary', { 
          required: 'Salary is required',
          min: { value: 1000, message: 'Minimum salary is 1000 BDT' }
        })}
        className="input-neon w-full"
        placeholder="e.g., 8000"
        min="1000"
      />
      {errors.salary && <p className="text-red-500 text-sm mt-1">{errors.salary.message}</p>}
    </div>
  </div>

  {/* Schedule & Days Per Week */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label className="block text-sm font-semibold mb-2 neon-text-blue flex items-center gap-2">
        <FaClock />
        Schedule *
      </label>
      <input
        {...register('schedule', { required: 'Schedule is required' })}
        className="input-neon w-full"
        placeholder="e.g., Evening 5-7 PM"
      />
      {errors.schedule && <p className="text-red-500 text-sm mt-1">{errors.schedule.message}</p>}
    </div>

    <div>
      <label className="block text-sm font-semibold mb-2 neon-text-blue flex items-center gap-2">
        <FaCalendarAlt />
        Days Per Week
      </label>
      <input
        type="number"
        {...register('days_per_week', { 
          min: { value: 1, message: 'Minimum 1 day' },
          max: { value: 7, message: 'Maximum 7 days' }
        })}
        className="input-neon w-full"
        placeholder="e.g., 3"
        min="1"
        max="7"
      />
      {errors.days_per_week && <p className="text-red-500 text-sm mt-1">{errors.days_per_week.message}</p>}
    </div>
  </div>

  {/* Tutoring Type & Medium */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label className="block text-sm font-semibold mb-2 neon-text-blue">Tutoring Type *</label>
      <select {...register('tutoring_type', { required: true })} className="input-neon w-full">
        <option value="Home Tutoring">Home Tutoring</option>
        <option value="Online Tutoring">Online Tutoring</option>
        <option value="Both">Both</option>
      </select>
    </div>

    <div>
      <label className="block text-sm font-semibold mb-2 neon-text-blue">Preferred Medium</label>
      <select {...register('preferred_medium')} className="input-neon w-full">
        <option value="Bangla Medium">Bangla Medium</option>
        <option value="English Medium">English Medium</option>
        <option value="English Version">English Version</option>
        <option value="Both">Both</option>
      </select>
    </div>
  </div>

  {/* Gender Preferences */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label className="block text-sm font-semibold mb-2 neon-text-blue">Student Gender</label>
      <select {...register('student_gender')} className="input-neon w-full">
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Any">Any</option>
      </select>
    </div>

    <div>
      <label className="block text-sm font-semibold mb-2 neon-text-blue">Preferred Tutor Gender</label>
      <select {...register('tutor_gender_preference')} className="input-neon w-full">
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Any">Any</option>
      </select>
    </div>
  </div>

  {/* Requirements */}
  <div>
    <label className="block text-sm font-semibold mb-2 neon-text-blue">Requirements *</label>
    <textarea
      {...register('requirements', { required: 'Requirements are required' })}
      className="input-neon w-full"
      rows="4"
      placeholder="Describe the requirements for the tutor (qualifications, experience, teaching style, etc.)"
    />
    {errors.requirements && <p className="text-red-500 text-sm mt-1">{errors.requirements.message}</p>}
  </div>

  {/* Optional Fields */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label className="block text-sm font-semibold mb-2 text-gray-400">Class Duration (Optional)</label>
      <input
        {...register('class_duration')}
        className="input-neon w-full"
        placeholder="e.g., 1.5 hours"
      />
    </div>

    <div>
      <label className="block text-sm font-semibold mb-2 text-gray-400">Student Details (Optional)</label>
      <input
        {...register('student_details')}
        className="input-neon w-full"
        placeholder="e.g., Struggling with algebra"
      />
    </div>
  </div>

  {/* Submit Button */}
  <button 
    type="submit" 
    disabled={loading} 
    className="btn-neon btn-neon-primary w-full py-3 rounded-lg font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {loading ? (
      <span className="flex items-center justify-center gap-2">
        <div className="w-5 h-5 border-2 border-dark-bg/30 border-t-dark-bg rounded-full animate-spin"></div>
        Submitting...
      </span>
    ) : (
      'Post Tuition'
    )}
  </button>
</form>
);
};
export default TuitionForm;