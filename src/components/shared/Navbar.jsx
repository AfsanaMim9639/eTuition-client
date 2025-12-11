import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, ChevronDown, BookOpen, GraduationCap, Info, Phone, Home, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext'; 

const Navbar = () => {
  // Real auth hook ব্যবহার করুন
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.profile-dropdown')) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'admin':
        return '/dashboard/admin';
      case 'tutor':
        return '/dashboard/tutor';
      case 'student':
        return '/dashboard/student';
      default:
        return '/dashboard';
    }
  };

  const navLinks = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/tuitions', label: 'Tuitions', icon: BookOpen },
    { to: '/tutors', label: 'Tutors', icon: GraduationCap },
    { to: '/about', label: 'About', icon: Info },
    { to: '/contact', label: 'Contact', icon: Phone },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#0a0f0d]/70 backdrop-blur-lg shadow-lg shadow-[#00ff88]/10 border-b border-[#00ff88]/20' 
            : 'bg-[#0a0f0d]/50 backdrop-blur-sm'
        }`}
      >
        <div className="mx-auto">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="ml-20 flex-shrink-0">
              <Link 
                to="/" 
                className="flex items-center gap-3 group"
              >
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00ff88] to-[#00ffcc] rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#00ff88]/30">
                    <GraduationCap className="w-7 h-7 text-[#0a0f0d]" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00ff88] to-[#00ffcc] rounded-xl blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                </div>
                <span className="text-2xl font-bold">
                  <span className="bg-gradient-to-r from-[#00ff88] to-[#00ffcc] bg-clip-text text-transparent">
                    eTuitionBD
                  </span>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-3 flex-1 justify-center">
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        isActive
                          ? 'bg-[#00ff88]/10 text-[#00ff88] shadow-md shadow-[#00ff88]/20'
                          : 'text-gray-300 hover:text-[#00ff88] hover:bg-[#00ff88]/5'
                      }`
                    }
                  >
                    <IconComponent className="w-5 h-5" />
                    {link.label}
                  </NavLink>
                );
              })}
            </div>

            {/* Auth Buttons / Profile */}
            <div className="hidden lg:flex items-center gap-4 flex-shrink-0 mr-10">
              {user ? (
                <>
                  {/* Dashboard Button */}
                  <Link
                    to={getDashboardLink()}
                    className="flex items-center gap-2 px-5 py-3.5 bg-[#00ff88]/10 text-[#00ff88] rounded-lg font-semibold border border-[#00ff88]/30 hover:bg-[#00ff88]/20 hover:shadow-lg hover:shadow-[#00ff88]/30 transition-all duration-300"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>

                  {/* Profile Dropdown */}
                  <div className="relative profile-dropdown">
                    <button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-[#00ff88]/10 to-[#00ffcc]/10 border border-[#00ff88]/30 rounded-lg hover:border-[#00ff88] transition-all duration-300"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-[#00ff88] to-[#00ffcc] rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-[#0a0f0d]" />
                      </div>
                      <span className="text-gray-200 font-medium">{user.name || user.email}</span>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu */}
                    {isProfileOpen && (
                      <div className="absolute right-0 mt-3 w-56 bg-[#0f1512] border-2 border-[#00ff88]/30 rounded-xl shadow-2xl shadow-[#00ff88]/20 overflow-hidden animate-fadeIn">
                        <div className="p-4 border-b border-[#00ff88]/20">
                          <p className="text-sm text-gray-400">Signed in as</p>
                          <p className="text-white font-semibold truncate">{user.name || user.email}</p>
                          <p className="text-xs text-[#00ff88] capitalize mt-1">{user.role}</p>
                        </div>
                        <div className="p-2">
                          <Link
                            to="/profile"
                            className="flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:text-[#00ff88] hover:bg-[#00ff88]/10 rounded-lg transition-all duration-200"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <User className="w-4 h-4" />
                            My Profile
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                          >
                            <LogOut className="w-4 h-4" />
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-6 py-2.5 text-[#00ff88] font-semibold border-2 border-[#00ff88]/30 rounded-lg hover:bg-[#00ff88]/10 hover:border-[#00ff88] transition-all duration-300"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-6 py-2.5 bg-gradient-to-r from-[#00ff88] to-[#00ffcc] text-[#0a0f0d] font-bold rounded-lg hover:shadow-lg hover:shadow-[#00ff88]/50 transition-all duration-300 transform hover:scale-105"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden mr-4 p-2 text-[#00ff88] hover:bg-[#00ff88]/10 rounded-lg transition-all duration-300"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 px-4 border-t border-[#00ff88]/20 animate-slideDown">
              {/* Nav Links */}
              <div className="flex flex-col gap-2 mb-4">
                {navLinks.map((link) => {
                  const IconComponent = link.icon;
                  return (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      onClick={() => setIsMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                          isActive
                            ? 'bg-[#00ff88]/10 text-[#00ff88] shadow-md shadow-[#00ff88]/20'
                            : 'text-gray-300 hover:text-[#00ff88] hover:bg-[#00ff88]/5'
                        }`
                      }
                    >
                      <IconComponent className="w-5 h-5" />
                      {link.label}
                    </NavLink>
                  );
                })}
              </div>

              {/* Auth Buttons / Profile for Mobile */}
              <div className="flex flex-col gap-3 pt-4 border-t border-[#00ff88]/20">
                {user ? (
                  <>
                    <div className="px-4 py-3 bg-[#00ff88]/5 rounded-lg border border-[#00ff88]/20">
                      <p className="text-sm text-gray-400">Signed in as</p>
                      <p className="text-white font-semibold">{user.name || user.email}</p>
                      <p className="text-xs text-[#00ff88] capitalize mt-1">{user.role}</p>
                    </div>
                    <Link
                      to={getDashboardLink()}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-[#00ff88]/10 text-[#00ff88] rounded-lg font-semibold border border-[#00ff88]/30"
                    >
                      <LayoutDashboard className="w-5 h-5" />
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-[#00ff88]/10 text-[#00ff88] rounded-lg font-semibold border border-[#00ff88]/30"
                    >
                      <User className="w-5 h-5" />
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-red-500/10 text-red-400 rounded-lg font-semibold border border-red-500/30"
                    >
                      <LogOut className="w-5 h-5" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="px-6 py-3 text-center text-[#00ff88] font-semibold border-2 border-[#00ff88]/30 rounded-lg"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMenuOpen(false)}
                      className="px-6 py-3 text-center bg-gradient-to-r from-[#00ff88] to-[#00ffcc] text-[#0a0f0d] font-bold rounded-lg"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Navbar;