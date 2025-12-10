import { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { GraduationCap,} from 'lucide-react';

import { 
  FaHome, 
  FaBook, 
  FaUser, 
  FaSignOutAlt, 
  FaBars, 
  FaTimes,
  FaUsers,
  FaChartBar,
  FaDollarSign
} from 'react-icons/fa';
import Navbar from '../components/shared/Navbar';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Role-based menu items
  const getMenuItems = () => {
    const baseItems = [
      { path: '/dashboard', icon: FaHome, label: 'Dashboard' },
      { path: '/dashboard/profile', icon: FaUser, label: 'Profile' },
    ];

    if (user?.role === 'admin') {
      return [
        ...baseItems,
        { path: '/dashboard/users', icon: FaUsers, label: 'Manage Users' },
        { path: '/dashboard/tuitions', icon: FaBook, label: 'Manage Tuitions' },
        { path: '/dashboard/analytics', icon: FaChartBar, label: 'Analytics' },
      ];
    }

    if (user?.role === 'tutor') {
      return [
        ...baseItems,
        { path: '/dashboard/applications', icon: FaBook, label: 'My Applications' },
        { path: '/dashboard/earnings', icon: FaDollarSign, label: 'Earnings' },
      ];
    }

    // Student
    return [
      ...baseItems,
      { path: '/dashboard/tuitions', icon: FaBook, label: 'My Tuitions' },
      { path: '/dashboard/applications', icon: FaUsers, label: 'Applications' },
    ];
  };

  const menuItems = getMenuItems();

  return (
    <div className="min-h-screen bg-dark-bg">
        
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-lg bg-neon-blue/20 border border-neon-blue text-neon-blue hover:bg-neon-blue/30 transition-all"
      >
        {sidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-[#0f1512] to-[#0a0f0d] 
            border-r-2 border-[#00ffcc]/30 backdrop-blur-lg z-40 transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="p-6">
          {/* Logo - Border and Shadow Removed */}
          <div className="mb-6">
            <Link 
              to="/" 
              className="flex items-center gap-3 group"
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-[#00ff88] to-[#00ffcc] rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="w-7 h-7 text-[#0a0f0d]" />
                </div>
              </div>
              <span className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-[#00ff88] to-[#00ffcc] bg-clip-text text-transparent">
                  eTuitionBD
                </span>
              </span>
            </Link>
          </div>

          {/* User Info */}
          <div className="mb-8 p-4 rounded-lg bg-neon-blue/10 border border-neon-blue/30">
            <div className="flex items-center space-x-3">
              <img
                src={user?.profileImage || '/default-avatar.png'}
                alt={user?.name}
                className="w-12 h-12 rounded-full border-2 border-neon-blue"
              />
              <div>
                <p className="font-semibold text-white">{user?.name}</p>
                <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-neon-blue/20 hover:text-neon-blue transition-all group"
              >
                <item.icon className="text-xl group-hover:text-neon-blue" />
                <span>{item.label}</span>
              </Link>
            ))}

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition-all group mt-4"
            >
              <FaSignOutAlt className="text-xl group-hover:text-red-400" />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen">
        <div className="p-6 lg:p-8 pt-20 lg:pt-8">
          <Outlet />
        </div>
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
        />
      )}
    </div>
  );
};

export default DashboardLayout;