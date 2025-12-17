// components/ProfileRedirect.jsx - FIXED VERSION

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-cyan-500 border-t-transparent mb-4 mx-auto"></div>
        <p className="text-gray-300 text-lg">Redirecting to your profile...</p>
      </div>
    </div>
  );
};

export default ProfileRedirect;