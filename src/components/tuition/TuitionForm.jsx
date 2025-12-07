import { useForm } from 'react-hook-form';

const TuitionForm = ({ onSubmit, defaultValues, loading }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold mb-2 neon-text-blue">Title</label>
        <input
          {...register('title', { required: 'Title is required' })}
          className="input-neon w-full"
          placeholder="e.g., Need Math Tutor for Class 10"
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold mb-2 neon-text-blue">Subject</label>
          <select {...register('subject', { required: true })} className="input-neon w-full">
            <option value="">Select Subject</option>
            <option value="Math">Math</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Biology">Biology</option>
            <option value="English">English</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 neon-text-blue">Class</label>
          <select {...register('class', { required: true })} className="input-neon w-full">
            <option value="">Select Class</option>
            <option value="Class 6-8">Class 6-8</option>
            <option value="Class 9-10">Class 9-10</option>
            <option value="HSC">HSC</option>
          </select>
        </div>
      </div>

      <button type="submit" disabled={loading} className="btn btn-neon-pink w-full py-3 rounded-lg font-semibold">
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default TuitionForm;
