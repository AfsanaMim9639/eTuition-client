import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  
  const onSubmit = (data) => {
    console.log(data);
    toast.success('Message sent successfully!');
    reset();
  };
  
  return (
    <div className="min-h-screen bg-dark-bg pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Centered Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            Contact <span className="gradient-text">Us</span>
          </h1>
          <p className="text-xl text-gray-400">
            Get in touch with us for any queries or support
          </p>
        </div>
        
        {/* Centered Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            <div className="card-neon card-neon-pink p-6 rounded-xl flex items-start gap-4">
              <FaEnvelope className="text-3xl text-neon-pink flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-1 neon-text-pink">Email</h3>
                <p className="text-gray-400">info@tuitionhub.com</p>
                <p className="text-gray-400">support@tuitionhub.com</p>
              </div>
            </div>
            
            <div className="card-neon card-neon-blue p-6 rounded-xl flex items-start gap-4">
              <FaPhone className="text-3xl text-neon-blue flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-1 neon-text-blue">Phone</h3>
                <p className="text-gray-400">+880 1234-567890</p>
                <p className="text-gray-400">Available: 9 AM - 9 PM</p>
              </div>
            </div>
            
            <div className="card-neon card-neon-green p-6 rounded-xl flex items-start gap-4">
              <FaMapMarkerAlt className="text-3xl text-neon-green flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-1 neon-text-green">Address</h3>
                <p className="text-gray-400">123 Education Street</p>
                <p className="text-gray-400">Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="card-neon card-neon-blue p-6 rounded-xl space-y-4">
            <h3 className="text-2xl font-bold neon-text-blue mb-4">Send us a Message</h3>
            
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Your Name
              </label>
              <input
                {...register('name', { required: 'Name is required' })}
                className="input-neon w-full"
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Your Email
              </label>
              <input
                type="email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                className="input-neon w-full"
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Your Message
              </label>
              <textarea
                {...register('message', { required: 'Message is required' })}
                className="input-neon w-full h-32 resize-none"
                placeholder="Tell us how we can help you..."
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
              )}
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

export default Contact;