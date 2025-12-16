// components/ProfileRedirect.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProfileRedirect = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Redirect to role-based profile
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
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00ff88]"></div>
    </div>
  );
};

export default ProfileRedirect;