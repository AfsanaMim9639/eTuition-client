// components/ProfileRedirect.jsx - RESPONSIVE VERSION

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectToProfile = () => {
      try {
        // ✅ Get user from localStorage
        const userStr = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        // ✅ Check if logged in
        if (!userStr || !token) {
          navigate('/login');
          return;
        }

        const user = JSON.parse(userStr);
        console.log('👤 User:', user); // Debug log

        // ✅ Redirect based on role
        switch (user.role) {
          case 'admin':
            navigate('/dashboard/admin/profile');
            break;
          case 'tutor':
            navigate('/dashboard/tutor/profile');
            break;
          case 'student':
            navigate('/dashboard/student/profile');
            break;
          default:
            navigate('/');
        }
      } catch (error) {
        console.error('❌ Profile redirect error:', error);
        navigate('/login');
      }
    };

    redirectToProfile();
  }, [navigate]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 px-4 sm:px-6 lg:px-8">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 sm:-left-48 w-48 h-48 sm:w-96 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 sm:-right-48 w-48 h-48 sm:w-96 sm:h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 text-center max-w-md w-full">
        {/* Spinner Container */}
        <div className="mb-6 sm:mb-8 flex justify-center">
          <div className="relative">
            {/* Outer Ring */}
            <div className="animate-spin rounded-full h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 border-4 sm:border-[5px] border-cyan-500/30 border-t-cyan-500"></div>
            
            {/* Inner Ring */}
            <div className="absolute inset-0 animate-spin rounded-full h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 border-4 sm:border-[5px] border-transparent border-b-purple-500" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            
            {/* Center Dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-2 sm:space-y-3">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
            Redirecting...
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 px-4">
            Taking you to your profile
          </p>
          
          {/* Loading Dots */}
          <div className="flex justify-center gap-1 sm:gap-1.5 pt-2 sm:pt-4">
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>

        {/* Optional: Progress Bar */}
        <div className="mt-8 sm:mt-12 px-4 sm:px-8">
          <div className="h-1 sm:h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full animate-progress"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
        .animate-progress {
          animation: progress 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ProfileRedirect;