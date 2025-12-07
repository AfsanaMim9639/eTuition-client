import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { gsap } from 'gsap';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const navigate = useNavigate();

  // GSAP Animations
  useEffect(() => {
    // Logo animation
    gsap.fromTo(
      logoRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }
    );

    // Nav items animation
    gsap.fromTo(
      '.nav-item',
      { opacity: 0, y: -20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.3
      }
    );
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
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
        return '/';
    }
  };

  const navLinks = (
    <>
      <NavLink 
        to="/" 
        className={({ isActive }) => 
          `nav-item px-4 py-2 rounded-lg transition-all duration-300 ${
            isActive ? 'neon-text-pink font-bold' : 'hover:neon-text-blue'
          }`
        }
      >
        Home
      </NavLink>
      <NavLink 
        to="/tuitions" 
        className={({ isActive }) => 
          `nav-item px-4 py-2 rounded-lg transition-all duration-300 ${
            isActive ? 'neon-text-pink font-bold' : 'hover:neon-text-blue'
          }`
        }
      >
        Tuitions
      </NavLink>
      <NavLink 
        to="/tutors" 
        className={({ isActive }) => 
          `nav-item px-4 py-2 rounded-lg transition-all duration-300 ${
            isActive ? 'neon-text-pink font-bold' : 'hover:neon-text-blue'
          }`
        }
      >
        Tutors
      </NavLink>
      <NavLink 
        to="/about" 
        className={({ isActive }) => 
          `nav-item px-4 py-2 rounded-lg transition-all duration-300 ${
            isActive ? 'neon-text-pink font-bold' : 'hover:neon-text-blue'
          }`
        }
      >
        About
      </NavLink>
      <NavLink 
        to="/contact" 
        className={({ isActive }) => 
          `nav-item px-4 py-2 rounded-lg transition-all duration-300 ${
            isActive ? 'neon-text-pink font-bold' : 'hover:neon-text-blue'
          }`
        }
      >
        Contact
      </NavLink>
    </>
  );

  return (
    <nav 
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-dark-bg/95 backdrop-blur-lg shadow-neon-pink' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            to="/" 
            ref={logoRef}
            className="flex items-center space-x-2 group"
          >
            <div className="w-12 h-12 rounded-lg neon-border-pink flex items-center justify-center group-hover:animate-pulse-neon">
              <span className="text-2xl font-bold gradient-text">T</span>
            </div>
            <span className="text-xl font-bold hidden md:block">
              <span className="neon-text-pink">Tuition</span>
              <span className="neon-text-blue">Hub</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navLinks}
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4 nav-item">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to={getDashboardLink()}
                  className="btn btn-neon-blue px-6 py-2 rounded-lg font-semibold"
                >
                  <FaUser className="inline mr-2" />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-neon-pink px-6 py-2 rounded-lg font-semibold"
                >
                  <FaSignOutAlt className="inline mr-2" />
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link 
                  to="/login"
                  className="btn btn-neon-blue px-6 py-2 rounded-lg font-semibold"
                >
                  Login
                </Link>
                <Link 
                  to="/register"
                  className="btn btn-neon-pink px-6 py-2 rounded-lg font-semibold"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden btn btn-neon-pink p-3 rounded-lg"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 space-y-4 border-t border-neon-pink/30">
            <div className="flex flex-col space-y-2">
              {navLinks}
            </div>
            <div className="flex flex-col space-y-2 pt-4">
              {user ? (
                <>
                  <Link 
                    to={getDashboardLink()}
                    className="btn btn-neon-blue px-6 py-2 rounded-lg font-semibold text-center"
                  >
                    <FaUser className="inline mr-2" />
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="btn btn-neon-pink px-6 py-2 rounded-lg font-semibold"
                  >
                    <FaSignOutAlt className="inline mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login"
                    className="btn btn-neon-blue px-6 py-2 rounded-lg font-semibold text-center"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register"
                    className="btn btn-neon-pink px-6 py-2 rounded-lg font-semibold text-center"
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
  );
};

export default Navbar;