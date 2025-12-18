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
  FaBell
} from 'react-icons/fa';

import NotificationBell from '../components/notification/NotificationBell';
import ScrollToTop from '../components/ScrollToTop';

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
        { path: `${basePath}/notifications`, icon: FaBell, label: 'Notifications' },
        { path: `${basePath}/profile`, icon: FaUser, label: 'Profile' },
      ];
    }

    if (role === 'tutor') {
      return [
        { path: `${basePath}`, icon: FaHome, label: 'Dashboard' },
        { path: `${basePath}/applications`, icon: FaBook, label: 'My Applications' },
        { path: `${basePath}/ongoing`, icon: FaUsers, label: 'Ongoing Tuitions' },
        { path: `${basePath}/revenue`, icon: FaDollarSign, label: 'Revenue' },
        { path: `${basePath}/notifications`, icon: FaBell, label: 'Notifications' },
        { path: `${basePath}/profile`, icon: FaUser, label: 'Profile' },
      ];
    }

    // Student
    return [
      { path: `${basePath}`, icon: FaHome, label: 'Dashboard' },
      { path: `${basePath}/tuitions`, icon: FaBook, label: 'My Tuitions' },
      { path: `${basePath}/post-tuition`, icon: FaBook, label: 'Post Tuition' },
      { path: `${basePath}/payments`, icon: FaDollarSign, label: 'Payments' },
      { path: `${basePath}/notifications`, icon: FaBell, label: 'Notifications' },
      { path: `${basePath}/profile`, icon: FaUser, label: 'Profile' },
    ];
  };

  const menuItems = getMenuItems();

  return (
    <div className="min-h-screen bg-dark-bg overflow-x-hidden">
      <ScrollToTop />
      
      {/* Mobile Top Bar with Hamburger Menu */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#0f1512]/95 backdrop-blur-xl border-b-2 border-[#00ffcc]/30">
        <div className="flex items-center justify-between px-3 sm:px-4 py-3">
          

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-[#00ff88] to-[#00ffcc] rounded-lg flex items-center justify-center">
              <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-[#0a0f0d]" />
            </div>
            <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-[#00ff88] to-[#00ffcc] bg-clip-text text-transparent">
              eTuitionBD
            </span>
          </Link>

          {/* Notification Bell */}
          <div className="scale-90 sm:scale-100">
            <NotificationBell />
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 sm:w-80 lg:w-64 bg-gradient-to-b from-[#0f1512] to-[#0a0f0d] 
            border-r-2 border-[#00ffcc]/30 backdrop-blur-lg z-40 transform transition-transform duration-300 
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 overflow-y-auto`}
      >
        <div className="p-4 sm:p-6">
          {/* Close Button - Mobile Only */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-[#00ffcc]/10 transition-colors"
            aria-label="Close menu"
          >
            <FaTimes className="text-xl text-[#00ffcc]" />
          </button>

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
          <div className="mb-6 p-3 sm:p-4 rounded-lg bg-[#00ffcc]/10 border border-[#00ffcc]/30 mt-12 lg:mt-0">
            <div className="flex items-center space-x-3">
              <img
                src={user?.profileImage || 'https://i.ibb.co/qpB9ZNp/default-avatar.png'}
                alt={user?.name}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#00ffcc] object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white truncate text-sm sm:text-base">{user?.name}</p>
                <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1 sm:space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center space-x-3 px-3 sm:px-4 py-3 sm:py-3.5 rounded-lg text-gray-300 hover:bg-[#00ffcc]/20 hover:text-[#00ffcc] transition-all group text-sm sm:text-base"
              >
                <item.icon className="text-lg sm:text-xl group-hover:text-[#00ffcc] flex-shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            ))}

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-3 sm:px-4 py-3 sm:py-3.5 rounded-lg text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition-all group mt-4 text-sm sm:text-base"
            >
              <FaSignOutAlt className="text-lg sm:text-xl group-hover:text-red-400 flex-shrink-0" />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content - FIXED HERE */}
      <main className="lg:ml-35 min-h-screen w-full overflow-x-hidden">
        <div className="p-4 sm:p-6 lg:p-8 pt-20 lg:pt-8 max-w-full">
          <Outlet />
        </div>
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-30 transition-opacity"
        />
      )}
    </div>
  );
};

export default DashboardLayout;