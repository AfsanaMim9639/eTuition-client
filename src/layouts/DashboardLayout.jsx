import { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { GraduationCap } from 'lucide-react';

import { 
  FaHome, 
  FaBook, 
  FaUser, 
  FaSignOutAlt, 
  FaBars, 
  FaTimes,
  FaUsers,
  FaChartBar,
  FaDollarSign,
  FaBell // ✅ NEW: Bell icon for menu
} from 'react-icons/fa';

// ✅ NEW: Import NotificationBell component
import NotificationBell from '../components/notification/NotificationBell';

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
    const role = user?.role;
    const basePath = `/dashboard/${role}`;

    if (role === 'admin') {
      return [
        { path: `${basePath}`, icon: FaHome, label: 'Dashboard' },
        { path: `${basePath}/users`, icon: FaUsers, label: 'Manage Users' },
        { path: `${basePath}/tuitions`, icon: FaBook, label: 'Manage Tuitions' },
        { path: `${basePath}/reports`, icon: FaChartBar, label: 'Reports' },
        { path: `${basePath}/notifications`, icon: FaBell, label: 'Notifications' }, // ✅ NEW
        { path: `${basePath}/profile`, icon: FaUser, label: 'Profile' },
      ];
    }

    if (role === 'tutor') {
      return [
        { path: `${basePath}`, icon: FaHome, label: 'Dashboard' },
        { path: `${basePath}/applications`, icon: FaBook, label: 'My Applications' },
        { path: `${basePath}/ongoing`, icon: FaUsers, label: 'Ongoing Tuitions' },
        { path: `${basePath}/revenue`, icon: FaDollarSign, label: 'Revenue' },
        { path: `${basePath}/notifications`, icon: FaBell, label: 'Notifications' }, // ✅ NEW
        { path: `${basePath}/profile`, icon: FaUser, label: 'Profile' },
      ];
    }

    // Student
    return [
      { path: `${basePath}`, icon: FaHome, label: 'Dashboard' },
      { path: `${basePath}/tuitions`, icon: FaBook, label: 'My Tuitions' },
      { path: `${basePath}/post-tuition`, icon: FaBook, label: 'Post Tuition' },
      { path: `${basePath}/payments`, icon: FaDollarSign, label: 'Payments' },
      { path: `${basePath}/notifications`, icon: FaBell, label: 'Notifications' }, // ✅ NEW
      { path: `${basePath}/profile`, icon: FaUser, label: 'Profile' },
    ];
  };

  const menuItems = getMenuItems();

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* ✅ NEW: Top Bar with Notification Bell (visible on mobile/tablet) */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#0f1512]/95 backdrop-blur-xl border-b-2 border-[#00ffcc]/30">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg bg-[#00ffcc]/20 border border-[#00ffcc] text-[#00ffcc] hover:bg-[#00ffcc]/30 transition-all"
          >
            {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#00ff88] to-[#00ffcc] rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-[#0a0f0d]" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-[#00ff88] to-[#00ffcc] bg-clip-text text-transparent">
              eTuitionBD
            </span>
          </Link>

          {/* ✅ NEW: Notification Bell (Mobile) */}
          <NotificationBell />
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-[#0f1512] to-[#0a0f0d] 
            border-r-2 border-[#00ffcc]/30 backdrop-blur-lg z-40 transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="p-6">
          {/* Logo - Desktop */}
          <div className="mb-6 hidden lg:block">
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
          <div className="mb-6 p-4 rounded-lg bg-[#00ffcc]/10 border border-[#00ffcc]/30">
            <div className="flex items-center space-x-3">
              <img
                src={user?.profileImage || '/default-avatar.png'}
                alt={user?.name}
                className="w-12 h-12 rounded-full border-2 border-[#00ffcc] object-cover"
              />
              <div>
                <p className="font-semibold text-white">{user?.name}</p>
                <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>

          {/* ✅ NEW: Notification Bell (Desktop - in sidebar) */}
          <div className="hidden lg:block mb-4">
            <NotificationBell />
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-[#00ffcc]/20 hover:text-[#00ffcc] transition-all group"
              >
                <item.icon className="text-xl group-hover:text-[#00ffcc]" />
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