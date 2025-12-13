import { FaBell, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const DashboardHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 h-20 bg-dark-card/95 backdrop-blur-lg border-b-2 border-neon-blue/30 z-30">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Welcome Message */}
        <div>
          <h2 className="text-2xl font-bold">
            Welcome back, <span className="gradient-text">{user?.name}</span>
          </h2>
          <p className="text-sm text-gray-400">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          
          

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="btn btn-neon-pink px-4 py-2 rounded-lg font-semibold flex items-center space-x-2"
          >
            <FaSignOutAlt />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;