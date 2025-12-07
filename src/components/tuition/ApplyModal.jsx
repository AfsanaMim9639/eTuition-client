import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ApplyModal = ({ isOpen, onClose, tuition }) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await api.post('/applications/apply', {
        tuitionId: tuition._id,
        ...data
      });
      
      toast.success('Application submitted successfully!');
      reset();
      onClose();
      navigate('/dashboard/tutor/applications');
    } catch (error) {
      console.error('Apply error:', error);
      toast.error(error.response?.data?.message || 'Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="card-neon card-neon-pink p-6 rounded-xl max-w-2xl w-full relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 btn btn-neon-blue p-2 rounded-lg"
        >
          <FaTimes />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold neon-text-pink mb-6">Apply for Tuition</h2>

        {/* Tuition Info */}
        <div className="bg-dark-bg p-4 rounded-lg border-2 border-neon-blue/30 mb-6">
          <h3 className="font-bold text-lg neon-text-blue mb-2">{tuition.title}</h3>
          <p className="text-gray-400">{tuition.subject} • {tuition.class}</p>
          <p className="text-neon-green font-semibold mt-2">{tuition.salary} BDT/month</p>
        </div>

        {/* Application Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Cover Letter */}
          <div>
            <label className="block text-sm font-semibold mb-2 neon-text-blue">
              Cover Letter *
            </label>
            <textarea
              {...register('coverLetter', { 
                required: 'Cover letter is required',
                minLength: { value: 50, message: 'Cover letter must be at least 50 characters' }
              })}
              className="input-neon w-full h-32 resize-none"
              placeholder="Explain why you're a good fit for this tuition..."
            />
            {errors.coverLetter && (
              <p className="text-red-500 text-sm mt-1">{errors.coverLetter.message}</p>
            )}
          </div>

          {/* Expected Salary */}
          <div>
            <label className="block text-sm font-semibold mb-2 neon-text-pink">
              Expected Salary (BDT/month) *
            </label>
            <input
              type="number"
              {...register('expectedSalary', { 
                required: 'Expected salary is required',
                min: { value: 0, message: 'Salary must be positive' }
              })}
              className="input-neon w-full"
              placeholder={tuition.salary}
              defaultValue={tuition.salary}
            />
            {errors.expectedSalary && (
              <p className="text-red-500 text-sm mt-1">{errors.expectedSalary.message}</p>
            )}
          </div>

          {/* Availability */}
          <div>
            <label className="block text-sm font-semibold mb-2 neon-text-green">
              Availability *
            </label>
            <input
              type="text"
              {...register('availability', { required: 'Availability is required' })}
              className="input-neon w-full"
              placeholder="e.g., Mon-Fri 3PM-6PM"
            />
            {errors.availability && (
              <p className="text-red-500 text-sm mt-1">{errors.availability.message}</p>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn border-2 border-gray-600 text-gray-400 hover:border-red-500 hover:text-red-500 py-3 rounded-lg font-semibold transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn btn-neon-pink py-3 rounded-lg font-semibold disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyModal;