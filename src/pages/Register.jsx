import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, Chrome, GraduationCap, BookOpen, ArrowRight, Briefcase } from 'lucide-react';
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
  const headerRef = useRef(null);

  const password = watch('password');

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    // Animate header
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );

    // Animate form
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: 'power3.out' }
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
    <div className="mt-20 min-h-screen bg-[#0a0f0d] flex items-center justify-center px-4 py-12">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#00ff88]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-[#00ffcc]/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-4xl">
        

        {/* Main Card */}
        <div ref={formRef} className="bg-gradient-to-br from-[#0a0f0d] via-[#0f1512] to-[#0a0f0d] border-2 border-[#00ff88]/30 rounded-2xl p-8 shadow-2xl shadow-[#00ff88]/10">
          {/* Header */}
        <div
          ref={headerRef}
          className="flex items-center gap-6 mb-6 p-6 border-2 border-[#00ff88]/30 rounded-2xl bg-[#0a0f0d]/40 shadow-lg shadow-[#00ff88]/20"
        >
          {/* Icon - Left Side */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-gradient-to-br from-[#00ff88] to-[#00ffcc] rounded-xl flex items-center justify-center transform hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#00ff88]/30">
              <User className="w-8 h-8 text-[#0a0f0d]" />
            </div>
          </div>

          {/* Text - Right Side */}
          <div className="flex-1 text-left">
            <h1 className="text-3xl font-bold mb-1 leading-tight">
              Create <span className="bg-gradient-to-r from-[#00ff88] to-[#00ffcc] bg-clip-text text-transparent">Account</span>
            </h1>
            <p className="text-gray-400 text-sm">
              Join us and start your learning journey
            </p>
          </div>
        </div>
          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-300 mb-3">
              Select Your Role
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`
                  relative p-4 rounded-lg border-2 transition-all duration-300 transform hover:scale-105
                  ${role === 'student' 
                    ? 'border-[#00ff88] bg-[#00ff88]/10 shadow-lg shadow-[#00ff88]/30' 
                    : 'border-[#00ff88]/20 bg-[#0a0f0d] hover:border-[#00ff88]/50'
                  }
                `}
              >
                <div className={`
                  w-12 h-12 mx-auto mb-2 rounded-lg flex items-center justify-center
                  ${role === 'student' 
                    ? 'bg-gradient-to-br from-[#00ff88] to-[#00ffcc]' 
                    : 'bg-[#00ff88]/10'
                  }
                `}>
                  <GraduationCap className={`w-6 h-6 ${role === 'student' ? 'text-[#0a0f0d]' : 'text-[#00ff88]'}`} />
                </div>
                <p className={`text-sm font-bold text-center ${role === 'student' ? 'text-[#00ff88]' : 'text-gray-400'}`}>
                  I'm a Student
                </p>
                <p className="text-xs text-gray-500 text-center mt-0.5">Learn from experts</p>
              </button>
              
              <button
                type="button"
                onClick={() => setRole('tutor')}
                className={`
                  relative p-4 rounded-lg border-2 transition-all duration-300 transform hover:scale-105
                  ${role === 'tutor' 
                    ? 'border-[#00ff88] bg-[#00ff88]/10 shadow-lg shadow-[#00ff88]/30' 
                    : 'border-[#00ff88]/20 bg-[#0a0f0d] hover:border-[#00ff88]/50'
                  }
                `}
              >
                <div className={`
                  w-12 h-12 mx-auto mb-2 rounded-lg flex items-center justify-center
                  ${role === 'tutor' 
                    ? 'bg-gradient-to-br from-[#00ff88] to-[#00ffcc]' 
                    : 'bg-[#00ff88]/10'
                  }
                `}>
                  <Briefcase className={`w-6 h-6 ${role === 'tutor' ? 'text-[#0a0f0d]' : 'text-[#00ff88]'}`} />
                </div>
                <p className={`text-sm font-bold text-center ${role === 'tutor' ? 'text-[#00ff88]' : 'text-gray-400'}`}>
                  I'm a Tutor
                </p>
                <p className="text-xs text-gray-500 text-center mt-0.5">Share your knowledge</p>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-300">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    {...register('name', { required: 'Name is required' })}
                    className="w-full h-11 px-4 bg-[#0a0f0d] border-2 border-[#00ff88]/30 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#00ff88] focus:shadow-lg focus:shadow-[#00ff88]/20 transition-all duration-300"
                    placeholder="John Doe"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1.5">
                    <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-300">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className="w-full h-11 px-4 bg-[#0a0f0d] border-2 border-[#00ff88]/30 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#00ff88] focus:shadow-lg focus:shadow-[#00ff88]/20 transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1.5">
                    <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-300">
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    {...register('phone', { required: 'Phone is required' })}
                    className="w-full h-11 px-4 bg-[#0a0f0d] border-2 border-[#00ff88]/30 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#00ff88] focus:shadow-lg focus:shadow-[#00ff88]/20 transition-all duration-300"
                    placeholder="+880 1234567890"
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1.5">
                    <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    {...register('password', { 
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters'
                      }
                    })}
                    className="w-full h-11 px-4 bg-[#0a0f0d] border-2 border-[#00ff88]/30 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#00ff88] focus:shadow-lg focus:shadow-[#00ff88]/20 transition-all duration-300"
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1.5">
                    <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            {/* Tutor specific fields */}
            {role === 'tutor' && (
              <div className="mt-6 pt-6 border-t-2 border-[#00ff88]/20">
                <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-[#00ff88] to-[#00ffcc] bg-clip-text text-transparent">
                  Professional Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Education */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-300">
                      Education
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        {...register('education', { required: role === 'tutor' })}
                        className="w-full h-11 px-4 bg-[#0a0f0d] border-2 border-[#00ff88]/30 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#00ff88] focus:shadow-lg focus:shadow-[#00ff88]/20 transition-all duration-300"
                        placeholder="B.Sc in Computer Science"
                      />
                    </div>
                  </div>

                  {/* Subjects */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-300">
                      Subjects (comma separated)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        {...register('subjects')}
                        className="w-full h-11 px-4 bg-[#0a0f0d] border-2 border-[#00ff88]/30 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#00ff88] focus:shadow-lg focus:shadow-[#00ff88]/20 transition-all duration-300"
                        placeholder="Math, Physics, Chemistry"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full h-12 bg-gradient-to-r from-[#00ff88] to-[#00ffcc] text-[#0a0f0d] rounded-lg font-bold text-base hover:shadow-2xl hover:shadow-[#00ff88]/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#0a0f0d]/30 border-t-[#0a0f0d] rounded-full animate-spin"></div>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="flex items-center my-5">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#00ff88]/30 to-transparent"></div>
            <span className="px-4 text-gray-500 text-xs font-semibold">OR CONTINUE WITH</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#00ff88]/30 to-transparent"></div>
          </div>

          {/* Google Register */}
          <div className="flex justify-center">
            <button
              onClick={handleGoogleRegister}
              disabled={loading}
              className="group relative w-full h-12 bg-[#0a0f0d] border-2 border-[#00ff88]/30 text-white rounded-lg font-semibold text-sm hover:bg-[#00ff88]/5 hover:border-[#00ff88] transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <span className="flex items-center justify-center gap-2">
                <Chrome className="w-5 h-5 text-[#00ff88]" />
                Continue with Google
              </span>
            </button>
          </div>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="text-[#00ff88] font-bold hover:text-[#00ffcc] transition-colors inline-flex items-center gap-1 group"
              >
                Login Now
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;