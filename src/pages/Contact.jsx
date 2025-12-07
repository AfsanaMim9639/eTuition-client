import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export const Contact = () => {
  const { register, handleSubmit, reset } = useForm();
  
  const onSubmit = (data) => {
    console.log(data);
    toast.success('Message sent successfully!');
    reset();
  };
  
  return (
    <div className="min-h-screen bg-dark-bg pt-24 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-6">
          Contact <span className="gradient-text">Us</span>
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="space-y-6">
            <div className="card-neon card-neon-pink p-6 rounded-xl flex items-start gap-4">
              <FaEnvelope className="text-3xl text-neon-pink flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-1">Email</h3>
                <p className="text-gray-400">info@tuitionhub.com</p>
              </div>
            </div>
            <div className="card-neon card-neon-blue p-6 rounded-xl flex items-start gap-4">
              <FaPhone className="text-3xl text-neon-blue flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-1">Phone</h3>
                <p className="text-gray-400">+880 1234-567890</p>
              </div>
            </div>
            <div className="card-neon card-neon-green p-6 rounded-xl flex items-start gap-4">
              <FaMapMarkerAlt className="text-3xl text-neon-green flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-1">Address</h3>
                <p className="text-gray-400">Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="card-neon card-neon-blue p-6 rounded-xl space-y-4">
            <div>
              <input
                {...register('name', { required: true })}
                className="input-neon w-full"
                placeholder="Your Name"
              />
            </div>
            <div>
              <input
                type="email"
                {...register('email', { required: true })}
                className="input-neon w-full"
                placeholder="Your Email"
              />
            </div>
            <div>
              <textarea
                {...register('message', { required: true })}
                className="input-neon w-full h-32 resize-none"
                placeholder="Your Message"
              />
            </div>
            <button type="submit" className="btn btn-neon-pink w-full py-3 rounded-lg font-semibold">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};