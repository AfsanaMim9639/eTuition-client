import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Chrome, Eye, EyeOff, ArrowRight, User, GraduationCap, Shield } from 'lucide-react';
import { useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';

const Login = () => {
  const { login, googleLogin, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('student');
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await login(data.email, data.password);
      
      // Get user role from your backend or use selected role
      const userRole = result.user?.role || selectedRole;
      
      // Role-based routing
      if (userRole === 'admin') {
        navigate('/dashboard/admin');
      } else if (userRole === 'tutor') {
        navigate('/dashboard/tutor');
      } else {
        navigate('/dashboard/student');
      }
      
      toast.success(`Welcome back, ${userRole}!`);
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await googleLogin();
      
      // Use selected role for Google login
      const userRole = selectedRole;
      
      // Save user to backend with selected role
      await fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          role: userRole
        })
      });
      
      // Navigate based on role
      if (userRole === 'admin') {
        navigate('/dashboard/admin');
      } else if (userRole === 'tutor') {
        navigate('/dashboard/tutor');
      } else {
        navigate('/dashboard/student');
      }
      
      toast.success(`Welcome, ${userRole}!`);
    } catch (error) {
      console.error('Google login error:', error);
      toast.error(error.message || 'Google login failed.');
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    { id: 'student', name: 'Student', icon: User, color: 'from-[#00ff88] to-[#00ffcc]' },
    { id: 'tutor', name: 'Tutor', icon: GraduationCap, color: 'from-[#00ffcc] to-[#00ff88]' },
    { id: 'admin', name: 'Admin', icon: Shield, color: 'from-[#00ff88] to-[#00ffcc]' }
  ];

  return (
    <div className="min-h-screen bg-[#0a0f0d] flex items-center justify-center px-4 py-12">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#00ff88]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-[#00ffcc]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-[520px]">
        {/* Login Card */}
        <div className="bg-gradient-to-br from-[#0a0f0d] via-[#0f1512] to-[#0a0f0d] border-2 border-[#00ff88]/30 rounded-3xl p-10 shadow-2xl shadow-[#00ff88]/10">
          
          {/* Header */}
         <div className="flex items-center gap-8 mb-10 pb-8 border-b-2 border-[#00ff88]/20">
            {/* Icon - Left Side */}
            <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-gradient-to-br from-[#00ff88] to-[#00ffcc] rounded-2xl flex items-center justify-center transform hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#00ff88]/30">
                <Lock className="w-12 h-12 text-[#0a0f0d]" />
                </div>
                </div>

            {/* Text - Right Side */}
            <div className="flex-1 text-left">
                <h1 className="text-5xl font-bold mb-3 leading-tight">
                Welcome <span className="bg-gradient-to-r from-[#00ff88] to-[#00ffcc] bg-clip-text text-transparent">Back</span>
                </h1>
                <p className="text-gray-400 text-lg leading-relaxed">
                Login to continue your learning journey
                </p><br />
            </div>
         </div><br />
          {/* Role Selection */}
          <div className="mb-8">
            <label className="block text-base font-semibold text-gray-300 mb-4">
              Select Your Role
            </label>
            <div className="grid grid-cols-3 gap-3">
              {roles.map((role) => {
                const Icon = role.icon;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id)}
                    className={`
                      relative p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105
                      ${selectedRole === role.id 
                        ? 'border-[#00ff88] bg-[#00ff88]/10 shadow-lg shadow-[#00ff88]/30' 
                        : 'border-[#00ff88]/20 bg-[#0a0f0d] hover:border-[#00ff88]/50'
                      }
                    `}
                  >
                    <div className={`
                      w-12 h-12 mx-auto mb-2 rounded-lg flex items-center justify-center
                      ${selectedRole === role.id 
                        ? `bg-gradient-to-br ${role.color}` 
                        : 'bg-[#00ff88]/10'
                      }
                    `}>
                      <Icon className={`w-6 h-6 ${selectedRole === role.id ? 'text-[#0a0f0d]' : 'text-[#00ff88]'}`} />
                    </div>
                    <p className={`text-sm font-semibold ${selectedRole === role.id ? 'text-[#00ff88]' : 'text-gray-400'}`}>
                      {role.name}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
            
            {/* Email Field */}
            <div className="space-y-3">
              <label className="block text-base font-semibold text-gray-300">
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
                  className="w-full h-14 px-5 bg-[#0a0f0d] border-2 border-[#00ff88]/30 rounded-xl text-white text-base placeholder-gray-500 focus:outline-none focus:border-[#00ff88] focus:shadow-lg focus:shadow-[#00ff88]/20 transition-all duration-300"
                  placeholder="your@email.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-3">
              <label className="block text-base font-semibold text-gray-300">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters'
                    }
                  })}
                  className="w-full h-14 px-5 pr-14 bg-[#0a0f0d] border-2 border-[#00ff88]/30 rounded-xl text-white text-base placeholder-gray-500 focus:outline-none focus:border-[#00ff88] focus:shadow-lg focus:shadow-[#00ff88]/20 transition-all duration-300"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#00ff88] transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end pt-1">
              <Link to="/forgot-password" className="text-sm text-gray-400 hover:text-[#00ff88] transition-colors font-medium">
                Forgot password?
              </Link>
            </div>

            {/* Login Button - Centered & Smaller Width */}
            <div className="flex justify-center pt-2">
              <button
                type="submit"
                disabled={loading}
                className="group relative w-2/3 h-14 bg-gradient-to-r from-[#00ff88] to-[#00ffcc] text-[#0a0f0d] rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-[#00ff88]/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-[#0a0f0d]/30 border-t-[#0a0f0d] rounded-full animate-spin"></div>
                      Logging in...
                    </>
                  ) : (
                    <>
                      Login to Account
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#00ff88]/30 to-transparent"></div>
            <span className="px-5 text-gray-500 text-sm font-semibold">OR CONTINUE WITH</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#00ff88]/30 to-transparent"></div>
          </div>

          {/* Google Login - Centered & Smaller Width */}
          <div className="flex justify-center">
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="group relative w-2/3 h-14 bg-[#0a0f0d] border-2 border-[#00ff88]/30 text-white rounded-xl font-semibold text-base hover:bg-[#00ff88]/5 hover:border-[#00ff88] transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <span className="flex items-center justify-center gap-3">
                <Chrome className="w-6 h-6 text-[#00ff88]" />
                Continue with Google
              </span>
            </button>
          </div>

          

          {/* Register Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-base leading-relaxed">
              Don't have an account?{' '}
              <Link 
                to="/register" 
                className="text-[#00ff88] font-bold hover:text-[#00ffcc] transition-colors inline-flex items-center gap-1 group"
              >
                Register Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </p><br />
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Login;