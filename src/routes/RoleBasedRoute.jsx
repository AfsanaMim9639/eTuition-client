import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Loading from '../components/shared/Loading';

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  // Loading state
  if (loading) {
    return <Loading />;
  }

  // Not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check if user's role is allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    if (user.role === 'admin') {
      return <Navigate to="/dashboard/admin" replace />;
    }
    if (user.role === 'tutor') {
      return <Navigate to="/dashboard/tutor" replace />;
    }
    if (user.role === 'student') {
      return <Navigate to="/dashboard/student" replace />;
    }
    // Fallback
    return <Navigate to="/dashboard" replace />;
  }

  // User has correct role, render children
  return children;
};

export default RoleBasedRoute;