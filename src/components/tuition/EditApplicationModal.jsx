import { useState } from 'react';
import { FaTimes, FaDollarSign } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const EditApplicationModal = ({ isOpen, onClose, application, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      qualifications: application.qualifications || '',
      experience: application.experience || '',
      proposedRate: application.proposedRate || application.tuition?.salary,
      message: application.message || ''
    }
  });

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await api.put(`/applications/${application._id}`, {
        qualifications: data.qualifications,
        experience: data.experience,
        proposedRate: data.proposedRate,
        message: data.message
      });
      
      if (response.data.success) {
        toast.success('Application updated successfully!');
        onSuccess();
      }
    } catch (error) {
      console.error('Update error:', error);
      toast.error(error.response?.data?.message || 'Failed to update application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="border-2 border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-cyan-600/10 p-6 rounded-xl max-w-2xl w-full relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-blue-500/20 hover:bg-blue-500/30 border-2 border-blue-500/50 rounded-lg transition-all hover:rotate-90"
        >
          <FaTimes className="text-blue-400" />
        </button>

        {/* Header */}
        <h2 className="text-3xl font-bold text-blue-400 mb-6">Edit Application</h2>

        {/* Tuition Info */}
        <div className="bg-[#0a0f0d] p-4 rounded-lg border-2 border-cyan-500/30 mb-6">
          <h3 className="font-bold text-lg text-cyan-400 mb-2">{application.tuition?.title}</h3>
          <p className="text-gray-400">{application.tuition?.subject} • {application.tuition?.class}</p>
          <p className="text-green-400 font-semibold mt-2">৳{application.tuition?.salary}/month</p>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Qualifications */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-pink-400">
              Qualifications *
            </label>
            <textarea
              {...register('qualifications', { 
                required: 'Qualifications are required',
                minLength: { value: 20, message: 'Please provide detailed qualifications (at least 20 characters)' }
              })}
              className="w-full px-4 py-2 bg-[#0a0f0d] border-2 border-pink-500/30 rounded-lg text-white focus:border-pink-500 focus:outline-none h-24 resize-none"
              placeholder="e.g., B.Sc in Mathematics from Dhaka University..."
            />
            {errors.qualifications && (
              <p className="text-red-500 text-sm mt-1">{errors.qualifications.message}</p>
            )}
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-blue-400">
              Experience *
            </label>
            <textarea
              {...register('experience', { 
                required: 'Experience is required',
                minLength: { value: 20, message: 'Please describe your experience (at least 20 characters)' }
              })}
              className="w-full px-4 py-2 bg-[#0a0f0d] border-2 border-blue-500/30 rounded-lg text-white focus:border-blue-500 focus:outline-none h-24 resize-none"
              placeholder="e.g., 3 years of teaching experience..."
            />
            {errors.experience && (
              <p className="text-red-500 text-sm mt-1">{errors.experience.message}</p>
            )}
          </div>

          {/* Proposed Rate */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-green-400 flex items-center gap-2">
              <FaDollarSign /> Proposed Salary (BDT/month) *
            </label>
            <input
              type="number"
              {...register('proposedRate', { 
                required: 'Proposed salary is required',
                min: { value: 0, message: 'Salary must be positive' }
              })}
              className="w-full px-4 py-2 bg-[#0a0f0d] border-2 border-green-500/30 rounded-lg text-white focus:border-green-500 focus:outline-none"
            />
            {errors.proposedRate && (
              <p className="text-red-500 text-sm mt-1">{errors.proposedRate.message}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-purple-400">
              Cover Letter / Message *
            </label>
            <textarea
              {...register('message', { 
                required: 'Message is required',
                minLength: { value: 50, message: 'Message must be at least 50 characters' }
              })}
              className="w-full px-4 py-2 bg-[#0a0f0d] border-2 border-purple-500/30 rounded-lg text-white focus:border-purple-500 focus:outline-none h-32 resize-none"
              placeholder="Explain why you're a good fit for this tuition..."
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border-2 border-gray-600 text-gray-400 hover:border-red-500 hover:text-red-500 py-3 rounded-lg font-semibold transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-[#00ffcc] to-[#00ff88] text-[#0a0f0d] py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-[#00ffcc]/50 transition-all"
            >
              {loading ? 'Updating...' : 'Update Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditApplicationModal;