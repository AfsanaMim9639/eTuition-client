import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FaHome, 
  FaFileAlt,
  FaBook,
  FaDollarSign,
  FaUser, 
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaArrowLeft,
  FaBell,
  FaComments,
  FaCalendarAlt
} from 'react-icons/fa';
import { useAuth } from '../../../contexts/AuthContext';
import { GraduationCap } from 'lucide-react';
import NotificationBell from '../../../components/notification/NotificationBell';

const TutorDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const menuItems = [
    { path: '/dashboard/tutor', icon: FaHome, label: 'Dashboard', end: true },
    { path: '/dashboard/tutor/applications', icon: FaFileAlt, label: 'My Applications' },
    { path: '/dashboard/tutor/ongoing', icon: FaBook, label: 'Ongoing Tuitions' },
    { path: '/dashboard/tutor/schedule', icon: FaCalendarAlt, label: 'My Schedule' },
    { path: '/dashboard/tutor/revenue', icon: FaDollarSign, label: 'Revenue History' },
    { path: '/dashboard/tutor/messages', icon: FaComments, label: 'Messages' },
    { path: '/dashboard/tutor/notifications', icon: FaBell, label: 'Notifications' },
    { path: '/dashboard/tutor/profile', icon: FaUser, label: 'Profile Settings' },
  ];

  const isActive = (path, end = false) => {
    if (end) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#0a0f0d] overflow-x-hidden">
      <div className="flex">
        {/* Mobile Top Bar */}
        <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#0f1512]/95 backdrop-blur-xl border-b-2 border-[#00ffcc]/30">
          <div className="flex items-center justify-between px-3 sm:px-4 py-3">
            {/* Hamburger Menu */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 bg-[#00ffcc]/20 rounded-lg border border-[#00ffcc] text-[#00ffcc]"
              aria-label="Toggle menu"
            >
              {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>

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
          className={`
            fixed top-0 left-0 h-full w-72 sm:w-80 lg:w-60
            bg-gradient-to-b from-[#0f1512] to-[#0a0f0d] 
            border-r-2 border-[#00ffcc]/30
            transition-transform duration-300 z-40 overflow-y-auto
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            lg:translate-x-0
          `}
        >
          <div className="flex flex-col h-full">
            {/* Close Button - Mobile Only */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-[#00ffcc]/10 text-[#00ffcc] transition-colors z-50"
              aria-label="Close menu"
            >
              <FaTimes size={20} />
            </button>

            {/* Logo & Back to Home */}
            <div className="p-4 sm:p-6 border-b border-[#00ffcc]/30">
              <Link 
                to="/" 
                className="flex items-center gap-3 group mb-4"
              >
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#00ff88] to-[#00ffcc] rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                    <GraduationCap className="w-6 h-6 text-[#0a0f0d]" />
                  </div>
                </div>
                <span className="text-xl font-bold">
                  <span className="bg-gradient-to-r from-[#00ff88] to-[#00ffcc] bg-clip-text text-transparent">
                    eTuitionBD
                  </span>
                </span>
              </Link>

              {/* Back to Website Button */}
              <Link
                to="/"
                className="flex items-center gap-2 px-3 py-2 bg-[#00ff88]/10 border border-[#00ff88]/30 rounded-lg text-[#00ff88] hover:bg-[#00ff88]/20 hover:border-[#00ff88] transition-all text-sm group"
              >
                <FaArrowLeft className="text-sm group-hover:-translate-x-1 transition-transform" />
                <span>Back to Website</span>
              </Link>
            </div>
 {/* Desktop Header */}
          <div className="hidden lg:flex items-center justify-between px-6 py-4 bg-[#0f1512]/50 backdrop-blur-xl border-b-2 border-[#00ffcc]/20 sticky top-0 z-30">
            {/* Left Side - Welcome Text */}
            <div>
              <h2 className="text-xl font-bold text-white">
                Welcome back, <span className="text-[#00ffcc]">{user?.name || 'Tutor'}</span>
              </h2>
               </div>

            {/* Right Side - Notification & User Profile */}
            
          </div>
            {/* Navigation */}
            <nav className="flex-1 p-4 overflow-y-auto">
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`
                        flex items-center gap-3 px-3 sm:px-4 py-3 rounded-lg transition-all text-sm sm:text-base
                        ${isActive(item.path, item.end)
                          ? 'bg-gradient-to-r from-[#00ffcc]/20 to-[#00ff88]/20 border-2 border-[#00ffcc] text-[#00ffcc] shadow-lg shadow-[#00ffcc]/20'
                          : 'text-gray-400 hover:bg-[#00ffcc]/10 hover:text-[#00ffcc] border-2 border-transparent'
                        }
                      `}
                    >
                      <item.icon className="text-lg sm:text-xl flex-shrink-0" />
                      <span className="font-medium truncate">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            

            {/* Logout Button */}
            <div className="p-4 border-t border-[#00ffcc]/30">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 sm:px-4 py-3 rounded-lg bg-red-500/20 border-2 border-red-500/50 text-red-400 hover:bg-red-500/30 transition-all text-sm sm:text-base"
              >
                <FaSignOutAlt className="text-lg sm:text-xl flex-shrink-0" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-screen w-full overflow-x-hidden">
         

          {/* Content Area */}
          <div className="pt-20 lg:pt-6 pb-8 px-4 sm:px-6 lg:px-8 max-w-full">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default TutorDashboard;