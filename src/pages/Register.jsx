import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaGoogle, FaGraduationCap } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';
import { gsap } from 'gsap';

const Register = () => {
  const { register: registerUser, googleLogin, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('student');
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const formRef = useRef(null);

  const password = watch('password');

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await registerUser({ ...data, role });
      navigate('/');
    } catch (error) {
      console.error('Register error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setLoading(true);
    try {
      await googleLogin(role);
      navigate('/');
    } catch (error) {
      console.error('Google register error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4 py-24">
      <div className="absolute inset-0 hero-gradient opacity-50"></div>
      
      <div ref={formRef} className="relative z-10 w-full max-w-2xl">
        <div className="card-neon card-neon-blue p-8 rounded-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">
              Create <span className="gradient-text">Account</span>
            </h1>
            <p className="text-gray-400">Join us and start your learning journey</p>
          </div>

          {/* Role Selection */}
          <div className="flex gap-4 mb-8">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${
                role === 'student'
                  ? 'btn-neon-pink'
                  : 'border-2 border-gray-600 text-gray-400 hover:border-neon-pink'
              }`}
            >
              Register as Student
            </button>
            <button
              type="button"
              onClick={() => setRole('tutor')}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${
                role === 'tutor'
                  ? 'btn-neon-blue'
                  : 'border-2 border-gray-600 text-gray-400 hover:border-neon-blue'
              }`}
            >
              Register as Tutor
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold mb-2 neon-text-pink">
                  Full Name
                </label>
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neon-blue" />
                  <input
                    type="text"
                    {...register('name', { required: 'Name is required' })}
                    className="input-neon w-full pl-12"
                    placeholder="John Doe"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold mb-2 neon-text-pink">
                  Email Address
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neon-blue" />
                  <input
                    type="email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className="input-neon w-full pl-12"
                    placeholder="your@email.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold mb-2 neon-text-pink">
                  Phone Number
                </label>
                <div className="relative">
                  <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neon-blue" />
                  <input
                    type="tel"
                    {...register('phone', { required: 'Phone is required' })}
                    className="input-neon w-full pl-12"
                    placeholder="+880 1234567890"
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold mb-2 neon-text-pink">
                  Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neon-blue" />
                  <input
                    type="password"
                    {...register('password', { 
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters'
                      }
                    })}
                    className="input-neon w-full pl-12"
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>
            </div>

            {/* Tutor specific fields */}
            {role === 'tutor' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-neon-blue/30">
                <div>
                  <label className="block text-sm font-semibold mb-2 neon-text-blue">
                    Education
                  </label>
                  <div className="relative">
                    <FaGraduationCap className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neon-pink" />
                    <input
                      type="text"
                      {...register('education', { required: role === 'tutor' })}
                      className="input-neon w-full pl-12"
                      placeholder="B.Sc in CSE"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 neon-text-blue">
                    Subjects (comma separated)
                  </label>
                  <input
                    type="text"
                    {...register('subjects')}
                    className="input-neon w-full"
                    placeholder="Math, Physics, Chemistry"
                    onChange={(e) => {
                      const value = e.target.value.split(',').map(s => s.trim());
                      e.target.value = value.join(', ');
                    }}
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-neon-pink w-full py-3 rounded-lg font-semibold text-lg disabled:opacity-50 mt-6"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-neon-blue/30"></div>
            <span className="px-4 text-gray-400">OR</span>
            <div className="flex-1 border-t border-neon-blue/30"></div>
          </div>

          {/* Google Register */}
          <button
            onClick={handleGoogleRegister}
            disabled={loading}
            className="btn btn-neon-blue w-full py-3 rounded-lg font-semibold flex items-center justify-center space-x-2"
          >
            <FaGoogle />
            <span>Continue with Google</span>
          </button>

          {/* Login Link */}
          <p className="text-center mt-6 text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="neon-text-blue font-semibold hover:text-neon-pink transition-colors">
              Login Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;