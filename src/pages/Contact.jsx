import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  
  const onSubmit = (data) => {
    console.log(data);
    toast.success('Message sent successfully! 📧');
    reset();
  };
  
  return (
    <div className="min-h-screen bg-dark-bg pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Responsive */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            Contact <span className="gradient-text">Us</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 px-4">
            Get in touch with us for any queries or support
          </p>
        </div>
        
        {/* Grid - Responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {/* Contact Info Cards - Responsive */}
          <div className="space-y-4 sm:space-y-6">
            {/* Email Card */}
            <div className="card-neon card-neon-pink p-4 sm:p-5 md:p-6 rounded-xl flex items-start gap-3 sm:gap-4 hover:scale-105 transition-transform">
              <FaEnvelope className="text-2xl sm:text-3xl text-neon-pink flex-shrink-0 mt-1" />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base sm:text-lg mb-1 neon-text-pink">Email</h3>
                <p className="text-sm sm:text-base text-gray-400 break-all">info@tuitionhub.com</p>
                <p className="text-sm sm:text-base text-gray-400 break-all">support@tuitionhub.com</p>
              </div>
            </div>
            
            {/* Phone Card */}
            <div className="card-neon card-neon-blue p-4 sm:p-5 md:p-6 rounded-xl flex items-start gap-3 sm:gap-4 hover:scale-105 transition-transform">
              <FaPhone className="text-2xl sm:text-3xl text-neon-blue flex-shrink-0 mt-1" />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base sm:text-lg mb-1 neon-text-blue">Phone</h3>
                <p className="text-sm sm:text-base text-gray-400">+880 1234-567890</p>
                <p className="text-sm sm:text-base text-gray-400">Available: 9 AM - 9 PM</p>
              </div>
            </div>
            
            {/* Address Card */}
            <div className="card-neon card-neon-green p-4 sm:p-5 md:p-6 rounded-xl flex items-start gap-3 sm:gap-4 hover:scale-105 transition-transform">
              <FaMapMarkerAlt className="text-2xl sm:text-3xl text-neon-green flex-shrink-0 mt-1" />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base sm:text-lg mb-1 neon-text-green">Address</h3>
                <p className="text-sm sm:text-base text-gray-400">123 Education Street</p>
                <p className="text-sm sm:text-base text-gray-400">Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>
          
          {/* Contact Form - Responsive */}
          <form 
            onSubmit={handleSubmit(onSubmit)} 
            className="card-neon card-neon-blue p-4 sm:p-5 md:p-6 rounded-xl space-y-3 sm:space-y-4"
          >
            <h3 className="text-xl sm:text-2xl font-bold neon-text-blue mb-3 sm:mb-4">
              Send us a Message
            </h3>
            
            {/* Name Field */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-1.5 sm:mb-2">
                Your Name
              </label>
              <input
                {...register('name', { required: 'Name is required' })}
                className="input-neon w-full text-sm sm:text-base py-2 sm:py-2.5"
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center gap-1">
                  <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.name.message}
                </p>
              )}
            </div>
            
            {/* Email Field */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-1.5 sm:mb-2">
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
                className="input-neon w-full text-sm sm:text-base py-2 sm:py-2.5"
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center gap-1">
                  <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.email.message}
                </p>
              )}
            </div>
            
            {/* Message Field */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-1.5 sm:mb-2">
                Your Message
              </label>
              <textarea
                {...register('message', { required: 'Message is required' })}
                className="input-neon w-full h-28 sm:h-32 resize-none text-sm sm:text-base py-2 sm:py-2.5"
                placeholder="Tell us how we can help you..."
              />
              {errors.message && (
                <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center gap-1">
                  <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.message.message}
                </p>
              )}
            </div>
            
            {/* Submit Button */}
            <button 
              type="submit" 
              className="btn btn-neon-pink w-full py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base hover:scale-105 transition-transform"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;