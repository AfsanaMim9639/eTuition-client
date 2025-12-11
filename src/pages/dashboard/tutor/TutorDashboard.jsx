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
  FaArrowLeft
} from 'react-icons/fa';
import { useAuth } from '../../../contexts/AuthContext';
import { GraduationCap } from 'lucide-react';

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
    { path: '/dashboard/tutor/revenue', icon: FaDollarSign, label: 'Revenue History' },
    { path: '/dashboard/tutor/profile', icon: FaUser, label: 'Profile Settings' },
  ];

  const isActive = (path, end = false) => {
    if (end) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#0a0f0d]">
      <div className="flex">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-gradient-to-r from-[#00ffcc] to-[#00ff88] rounded-lg text-[#0a0f0d] shadow-lg hover:shadow-[#00ffcc]/50 transition-all"
        >
          {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>

        {/* Sidebar */}
        <aside
          className={`
            fixed top-0 left-0 h-full w-64 
            bg-gradient-to-b from-[#0f1512] to-[#0a0f0d] 
            border-r-2 border-[#00ffcc]/30
            transition-transform duration-300 z-40 overflow-y-auto
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            lg:translate-x-0
            shadow-xl shadow-[#00ffcc]/10
          `}
        >
          <div className="flex flex-col h-full">
            {/* Logo & Back to Home */}
            <div className="p-6 border-b border-[#00ffcc]/30">
              <Link 
                to="/" 
                className="flex items-center gap-3 group mb-4"
              >
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#00ff88] to-[#00ffcc] rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#00ffcc]/30">
                    <GraduationCap className="w-6 h-6 text-[#0a0f0d]" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00ff88] to-[#00ffcc] rounded-xl blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
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
                className="flex items-center gap-2 px-3 py-2 bg-[#00ff88]/10 border border-[#00ff88]/30 rounded-lg text-[#00ff88] hover:bg-[#00ff88]/20 hover:border-[#00ff88] hover:shadow-lg hover:shadow-[#00ff88]/30 transition-all text-sm group"
              >
                <FaArrowLeft className="text-sm group-hover:-translate-x-1 transition-transform" />
                <span>Back to Website</span>
              </Link>
            </div>

            {/* User Info */}
            <div className="p-6 border-b border-[#00ffcc]/30">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#00ffcc] to-[#00ff88] flex items-center justify-center text-[#0a0f0d] font-bold text-xl shadow-lg shadow-[#00ffcc]/30">
                    {user?.name?.charAt(0)?.toUpperCase() || 'T'}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0a0f0d]"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-[#00ffcc]">
                    {user?.name || 'Tutor'}
                  </h3>
                  <p className="text-xs text-gray-400">Tutor Dashboard</p>
                </div>
              </div>
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
                        flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300
                        ${isActive(item.path, item.end)
                          ? 'bg-gradient-to-r from-[#00ffcc]/20 to-[#00ff88]/20 border-2 border-[#00ffcc] text-[#00ffcc] shadow-lg shadow-[#00ffcc]/20 transform scale-105'
                          : 'text-gray-400 hover:bg-[#00ffcc]/10 hover:text-[#00ffcc] hover:translate-x-1 border-2 border-transparent'
                        }
                      `}
                    >
                      <item.icon className="text-xl" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Logout Button */}
            <div className="p-4 border-t border-[#00ffcc]/30">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500/20 border-2 border-red-500/50 text-red-400 hover:bg-red-500/30 hover:border-red-500 hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300"
              >
                <FaSignOutAlt className="text-xl" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area with Outlet */}
        <main className="flex-1 lg:ml-28 min-h-screen pt-20 lg:pt-8 pb-8 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
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