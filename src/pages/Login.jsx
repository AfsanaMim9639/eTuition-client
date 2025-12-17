import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Chrome, Eye, EyeOff, ArrowRight, User, GraduationCap, Shield, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
  const { login, googleLogin, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [roleError, setRoleError] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      console.log('👤 User already logged in, redirecting...');
      redirectToDashboard(user.role);
    }
  }, [user, navigate]);

  // Helper function to redirect based on role
  const redirectToDashboard = (role) => {
    console.log('🔀 Redirecting to dashboard for role:', role);
    
    switch(role) {
      case 'admin':
        navigate('/dashboard/admin', { replace: true });
        break;
      case 'tutor':
        navigate('/dashboard/tutor', { replace: true });
        break;
      case 'student':
        navigate('/dashboard/student', { replace: true });
        break;
      default:
        navigate('/', { replace: true });
    }
  };

  // Handle role selection
  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setRoleError(false);
  };

 const onSubmit = async (data) => {
  if (!selectedRole) {
    setRoleError(true);
    toast.error('Please select your role first');
    return;
  }
  
  setLoading(true);
  try {
    console.log('📝 Logging in with:', data.email, 'as', selectedRole);
    
    const result = await login(data.email, data.password, selectedRole);
    
    console.log('✅ Login successful:', result);
    
    const userRole = result.user?.role;
    
    if (!userRole) {
      throw new Error('User role not found in response');
    }
    
    toast.success(`Welcome back, ${userRole}!`);
    
    redirectToDashboard(userRole);
    
  } catch (error) {
    console.error('❌ Login error:', error);
    // ✅ Error already shown in AuthContext
    // ✅ Loading will be set to false in finally block
  } finally {
    setLoading(false); // ✅ This ensures button is re-enabled
  }
};

const handleGoogleLogin = async () => {
  // Validate role selection
  if (!selectedRole) {
    setRoleError(true);
    toast.error('Please select your role first');
    return;
  }

  setLoading(true);
  try {
    console.log('🔐 Google login with role:', selectedRole);
    
    // ✅ Pass selectedRole to googleLogin function
    const result = await googleLogin(selectedRole);
    
    console.log('✅ Google login successful:', result);
    
    const userRole = result.user?.role;
    
    if (!userRole) {
      throw new Error('User role not found in response');
    }
    
    toast.success(`Welcome, ${userRole}!`);
    
    // Redirect based on role
    redirectToDashboard(userRole);
    
  } catch (error) {
    console.error('❌ Google login error:', error);
    // Error handling already done in AuthContext
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
    <div className=" min-h-screen bg-[#0a0f0d] flex items-center justify-center px-4 py-12">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#00ff88]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-[#00ffcc]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-[480px]">
        {/* Login Card */}
        <div className="bg-gradient-to-br from-[#0a0f0d] via-[#0f1512] to-[#0a0f0d] border-2 border-[#00ff88]/30 rounded-2xl p-8 shadow-2xl shadow-[#00ff88]/10">
          
          {/* Header */}
          <div className="flex items-center gap-6 mb-6 pb-6 border-b-2 border-[#00ff88]/20">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gradient-to-br from-[#00ff88] to-[#00ffcc] rounded-xl flex items-center justify-center transform hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#00ff88]/30">
                <Lock className="w-8 h-8 text-[#0a0f0d]" />
              </div>
            </div>

            <div className="flex-1 text-left">
              <h1 className="text-3xl font-bold mb-1 leading-tight">
                Welcome <span className="bg-gradient-to-r from-[#00ff88] to-[#00ffcc] bg-clip-text text-transparent">Back</span>
              </h1>
              <p className="text-gray-400 text-sm">
                Login to continue your learning journey
              </p>
            </div>
          </div>

          {/* Role Selection */}
          <div className="mb-5">
            <label className={`block text-sm font-semibold mb-3 transition-colors ${roleError ? 'text-red-400' : 'text-gray-300'}`}>
              {roleError ? (
                <span className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Please Select Your Role
                </span>
              ) : (
                'Select Your Role'
              )}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {roles.map((role) => {
                const Icon = role.icon;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => handleRoleSelect(role.id)}
                    className={`
                      relative p-3 rounded-lg border-2 transition-all duration-300 transform hover:scale-105
                      ${selectedRole === role.id 
                        ? 'border-[#00ff88] bg-[#00ff88]/10 shadow-lg shadow-[#00ff88]/30' 
                        : roleError
                        ? 'border-red-400/50 bg-red-500/5 hover:border-red-400'
                        : 'border-[#00ff88]/20 bg-[#0a0f0d] hover:border-[#00ff88]/50'
                      }
                    `}
                  >
                    <div className={`
                      w-10 h-10 mx-auto mb-1.5 rounded-lg flex items-center justify-center
                      ${selectedRole === role.id 
                        ? `bg-gradient-to-br ${role.color}` 
                        : roleError
                        ? 'bg-red-500/10'
                        : 'bg-[#00ff88]/10'
                      }
                    `}>
                      <Icon className={`w-5 h-5 ${selectedRole === role.id ? 'text-[#0a0f0d]' : roleError ? 'text-red-400' : 'text-[#00ff88]'}`} />
                    </div>
                    <p className={`text-xs font-semibold ${selectedRole === role.id ? 'text-[#00ff88]' : roleError ? 'text-red-400' : 'text-gray-400'}`}>
                      {role.name}
                    </p>
                  </button>
                );
              })}
            </div>
            {roleError && (
              <p className="text-red-400 text-xs mt-2 flex items-center gap-1.5 animate-pulse">
                <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                You must select a role to continue
              </p>
            )}
            {/* ✅ Helper text */}
            <p className="text-gray-500 text-xs mt-2 flex items-center gap-1.5">
              <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
              Select the role you registered with
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            {/* Email Field */}
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

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-300">
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
                  className="w-full h-11 px-4 pr-12 bg-[#0a0f0d] border-2 border-[#00ff88]/30 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#00ff88] focus:shadow-lg focus:shadow-[#00ff88]/20 transition-all duration-300"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#00ff88] transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1 flex items-center gap-1.5">
                  <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-xs text-gray-400 hover:text-[#00ff88] transition-colors font-medium">
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <div className="flex justify-center pt-2">
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full h-12 bg-gradient-to-r from-[#00ff88] to-[#00ffcc] text-[#0a0f0d] rounded-lg font-bold text-base hover:shadow-2xl hover:shadow-[#00ff88]/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#0a0f0d]/30 border-t-[#0a0f0d] rounded-full animate-spin"></div>
                      Logging in...
                    </>
                  ) : (
                    <>
                      Login to Account
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

          {/* Google Login */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="group relative w-full h-12 bg-[#0a0f0d] border-2 border-[#00ff88]/30 text-white rounded-lg font-semibold text-sm hover:bg-[#00ff88]/5 hover:border-[#00ff88] transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <span className="flex items-center justify-center gap-2">
                <Chrome className="w-5 h-5 text-[#00ff88]" />
                Continue with Google
              </span>
            </button>
          </div>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Don't have an account?{' '}
              <Link 
                to="/register" 
                className="text-[#00ff88] font-bold hover:text-[#00ffcc] transition-colors inline-flex items-center gap-1 group"
              >
                Register Now
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;