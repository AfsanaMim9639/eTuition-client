import { useState } from 'react';
import { FaTimes, FaUser, FaEnvelope, FaGraduationCap, FaBriefcase, FaDollarSign } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ApplyModal = ({ isOpen, onClose, tuition }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await api.post('/applications/apply', {
        tuitionId: tuition._id,
        qualifications: data.qualifications,
        experience: data.experience,
        proposedRate: data.expectedSalary,
        message: data.coverLetter
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
          className="absolute top-4 right-4 btn btn-neon-blue p-2 rounded-lg hover:rotate-90 transition-transform"
        >
          <FaTimes />
        </button>

        {/* Header */}
        <h2 className="text-3xl font-bold neon-text-pink mb-6">Apply for Tuition</h2>

        {/* Tuition Info */}
        <div className="bg-dark-bg p-4 rounded-lg border-2 border-neon-blue/30 mb-6">
          <h3 className="font-bold text-lg neon-text-blue mb-2">{tuition.title}</h3>
          <p className="text-gray-400">{tuition.subject} • {tuition.class}</p>
          <p className="text-neon-green font-semibold mt-2">{tuition.salary} BDT/month</p>
        </div>

        {/* Application Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name (Read-only) */}
          <div>
            <label className="block text-sm font-semibold mb-2 neon-text-blue flex items-center gap-2">
              <FaUser /> Name
            </label>
            <input
              type="text"
              value={user?.name || ''}
              readOnly
              className="input-neon w-full bg-gray-800/50 cursor-not-allowed"
            />
          </div>

          {/* Email (Read-only) */}
          <div>
            <label className="block text-sm font-semibold mb-2 neon-text-green flex items-center gap-2">
              <FaEnvelope /> Email
            </label>
            <input
              type="email"
              value={user?.email || ''}
              readOnly
              className="input-neon w-full bg-gray-800/50 cursor-not-allowed"
            />
          </div>

          {/* Qualifications */}
          <div>
            <label className="block text-sm font-semibold mb-2 neon-text-pink flex items-center gap-2">
              <FaGraduationCap /> Qualifications *
            </label>
            <textarea
              {...register('qualifications', { 
                required: 'Qualifications are required',
                minLength: { value: 20, message: 'Please provide detailed qualifications (at least 20 characters)' }
              })}
              className="input-neon w-full h-24 resize-none"
              placeholder="e.g., B.Sc in Mathematics from Dhaka University, SSC & HSC with GPA 5.00..."
            />
            {errors.qualifications && (
              <p className="text-red-500 text-sm mt-1">{errors.qualifications.message}</p>
            )}
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-semibold mb-2 neon-text-blue flex items-center gap-2">
              <FaBriefcase /> Experience *
            </label>
            <textarea
              {...register('experience', { 
                required: 'Experience is required',
                minLength: { value: 20, message: 'Please describe your experience (at least 20 characters)' }
              })}
              className="input-neon w-full h-24 resize-none"
              placeholder="e.g., 3 years of teaching experience in Mathematics for O-Level and A-Level students..."
            />
            {errors.experience && (
              <p className="text-red-500 text-sm mt-1">{errors.experience.message}</p>
            )}
          </div>

          {/* Expected Salary */}
          <div>
            <label className="block text-sm font-semibold mb-2 neon-text-green flex items-center gap-2">
              <FaDollarSign /> Expected Salary (BDT/month) *
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

          {/* Cover Letter */}
          <div>
            <label className="block text-sm font-semibold mb-2 neon-text-pink">
              Cover Letter / Message *
            </label>
            <textarea
              {...register('coverLetter', { 
                required: 'Cover letter is required',
                minLength: { value: 50, message: 'Cover letter must be at least 50 characters' }
              })}
              className="input-neon w-full h-32 resize-none"
              placeholder="Explain why you're a good fit for this tuition, your teaching style, and what makes you stand out..."
            />
            {errors.coverLetter && (
              <p className="text-red-500 text-sm mt-1">{errors.coverLetter.message}</p>
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
              className="flex-1 btn btn-neon-pink py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
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