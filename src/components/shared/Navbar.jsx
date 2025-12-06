// src/components/shared/Navbar.jsx
import { useState, useEffect } from 'react';
import { FaGraduationCap, FaBars, FaTimes, FaUser, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('/');

  // Mock user - production এ auth context use করবে
  const user = null; // Change to actual user after auth setup
  // const user = { name: "John Doe", email: "john@example.com", photoURL: "https://via.placeholder.com/40" };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Tuitions', path: '/tuitions' },
    { name: 'Tutors', path: '/tutors' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-4 left-4 right-4 z-50 rounded-3xl transition-all duration-500 ${
          isScrolled
            ? 'bg-[#0a0f0d]/80 backdrop-blur-2xl border border-[#00ff88]/20 shadow-lg shadow-[#00ff88]/10'
            : 'bg-[#0a0f0d]/40 backdrop-blur-xl border border-[#00ff88]/10'
        }`}
      >
        <div className="container mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between h-20 gap-8">
          
          {/* Logo & Brand - Enhanced 3D Effect */}
          <a href="/" className="flex items-center gap-3 group relative ml-4 sm:ml-6 lg:ml-8">
            {/* 3D Animated Icon with Multiple Layers */}
            <div className="relative transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
              {/* Glow Effect - Multiple Layers */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#00ff88] to-[#00ffcc] rounded-xl blur-2xl opacity-40 group-hover:opacity-70 animate-pulse transition-opacity" />
              <div className="absolute inset-0 bg-[#00ff88] rounded-xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
              
              {/* Main Icon Container with 3D Layers */}
              <div className="relative bg-gradient-to-br from-[#00ff88] via-[#00ffaa] to-[#00ffcc] p-4 rounded-xl shadow-2xl shadow-[#00ff88]/50 group-hover:shadow-[#00ff88]/70 transition-all duration-300">
                <FaGraduationCap className="text-black text-2xl relative z-10 drop-shadow-lg" />
                
                {/* 3D Depth Layers */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-xl transform translate-x-0.5 translate-y-0.5 -z-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl transform translate-x-1 translate-y-1 -z-20" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl transform translate-x-1.5 translate-y-1.5 -z-30" />
              </div>
              
              {/* Orbiting Particles */}
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#00ffcc] rounded-full animate-ping" />
              <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-[#00ff88] rounded-full animate-pulse" />
            </div>

            {/* Brand Name with Animated Gradient */}
            <div className="relative">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#00ff88] via-[#00ffaa] to-[#00ffcc] bg-clip-text text-transparent animate-gradient bg-[length:200%_auto] group-hover:tracking-wider transition-all duration-300">
                eTuitionBD
              </h1>
              <p className="text-xs text-white/50 group-hover:text-white/70 transition-colors">
                Find Your Perfect Tutor
              </p>
              {/* Underline Animation */}
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00ff88] to-[#00ffcc] group-hover:w-full transition-all duration-300" />
            </div>
          </a>

          {/* Desktop Navigation Links - Premium Design */}
          <div className="hidden lg:flex items-center gap-3">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.path}
                onClick={() => setActiveLink(link.path)}
                className={`relative px-6 py-3 rounded-2xl font-semibold transition-all duration-500 group overflow-hidden ${
                  activeLink === link.path
                    ? 'text-black'
                    : 'text-white/70 hover:text-white'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {/* Active Background with Gradient */}
                {activeLink === link.path && (
                  <>
                    <span className="absolute inset-0 bg-gradient-to-r from-[#00ff88] via-[#00ffaa] to-[#00ffcc] animate-gradient bg-[length:200%_auto]" />
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    {/* Glow Effect */}
                    <span className="absolute -inset-1 bg-gradient-to-r from-[#00ff88] to-[#00ffcc] opacity-50 blur-xl" />
                  </>
                )}
                
                {/* Hover Background */}
                {activeLink !== link.path && (
                  <>
                    <span className="absolute inset-0 bg-gradient-to-r from-[#00ff88]/20 to-[#00ffcc]/20 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl backdrop-blur-sm" />
                    <span className="absolute inset-0 border-2 border-[#00ff88]/0 group-hover:border-[#00ff88]/40 rounded-2xl transition-all duration-300" />
                  </>
                )}
                
                <span className="relative z-10 flex items-center gap-2">
                  {link.name}
                  
                  {/* Animated Icon based on link */}
                  <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    activeLink === link.path 
                      ? 'bg-black animate-pulse' 
                      : 'bg-[#00ff88] opacity-0 group-hover:opacity-100'
                  }`} />
                </span>
                
                {/* Bottom Glow Line */}
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-transparent via-[#00ff88] to-transparent transition-all duration-500 ${
                  activeLink === link.path 
                    ? 'w-full opacity-100' 
                    : 'w-0 opacity-0 group-hover:w-3/4 group-hover:opacity-100'
                }`} />
                
                {/* Top Shine Effect */}
                <span className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>

          {/* Auth Section - Enhanced */}
          <div className="hidden lg:flex items-center gap-4 mr-4 sm:mr-6 lg:mr-8">
            {!user ? (
              <>
                <a
                  href="/login"
                  className="relative px-6 py-2.5 text-white/70 hover:text-white font-medium transition-all group"
                >
                  <span className="relative z-10">Login</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00ff88] group-hover:w-full transition-all duration-300" />
                </a>
                
                <a
                  href="/register"
                  className="relative px-6 py-3 rounded-xl font-semibold text-black overflow-hidden group"
                >
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00ff88] via-[#00ffaa] to-[#00ffcc] transition-transform group-hover:scale-105" />
                  
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  
                  {/* Glow on Hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 blur-xl bg-[#00ff88] transition-opacity" />
                  
                  <span className="relative z-10 flex items-center gap-2">
                    Register
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </a>
              </>
            ) : (
              <>
                <a
                  href="/dashboard"
                  className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-[#00ff88]/20 hover:border-[#00ff88]/40 rounded-xl font-medium text-white transition-all duration-300 group hover:shadow-lg hover:shadow-[#00ff88]/20"
                >
                  <FaTachometerAlt className="text-[#00ff88] group-hover:rotate-180 transition-transform duration-500" />
                  <span>Dashboard</span>
                </a>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-3 px-4 py-2 bg-white/5 hover:bg-white/10 border border-[#00ff88]/20 hover:border-[#00ff88]/40 rounded-xl transition-all duration-300 group"
                  >
                    <img
                      src={user.photoURL || "https://via.placeholder.com/40"}
                      alt={user.name}
                      className="w-10 h-10 rounded-full border-2 border-[#00ff88] group-hover:border-[#00ffcc] transition-colors ring-2 ring-[#00ff88]/20 group-hover:ring-[#00ff88]/40"
                    />
                    <div className="text-left">
                      <p className="text-white font-medium text-sm">{user.name}</p>
                      <p className="text-white/50 text-xs">{user.email}</p>
                    </div>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-[#0d1612]/95 backdrop-blur-xl border border-[#00ff88]/20 rounded-2xl shadow-2xl shadow-[#00ff88]/10 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      <a
                        href="/dashboard/profile"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 text-white transition-all group"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <FaUser className="text-[#00ff88] group-hover:scale-110 transition-transform" />
                        <span>Profile Settings</span>
                      </a>
                      <button
                        onClick={() => setIsProfileOpen(false)}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-500/10 text-red-400 transition-all group border-t border-white/5"
                      >
                        <FaSignOutAlt className="group-hover:translate-x-1 transition-transform" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button - Enhanced */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-[#00ff88]/20 hover:border-[#00ff88]/40 text-white transition-all hover:shadow-lg hover:shadow-[#00ff88]/20 mr-4"
          >
            {isMobileMenuOpen ? (
              <FaTimes size={24} className="text-[#00ff88]" />
            ) : (
              <FaBars size={24} className="text-[#00ff88]" />
            )}
          </button>
        </div>

        {/* Mobile Menu - Enhanced */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#00ff88]/10 animate-in fade-in slide-in-from-top duration-300">
            <div className="flex flex-col gap-3 mb-4">
              {navLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={() => {
                    setActiveLink(link.path);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`relative px-5 py-4 rounded-2xl font-semibold transition-all duration-300 overflow-hidden group ${
                    activeLink === link.path
                      ? 'text-black'
                      : 'text-white/70'
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {/* Active State - Full Gradient Background */}
                  {activeLink === link.path && (
                    <>
                      <span className="absolute inset-0 bg-gradient-to-r from-[#00ff88] via-[#00ffaa] to-[#00ffcc] animate-gradient bg-[length:200%_auto]" />
                      <span className="absolute -inset-1 bg-gradient-to-r from-[#00ff88] to-[#00ffcc] opacity-30 blur-xl" />
                    </>
                  )}
                  
                  {/* Inactive State - Border with Hover Effect */}
                  {activeLink !== link.path && (
                    <>
                      <span className="absolute inset-0 border-2 border-[#00ff88]/30 rounded-2xl group-hover:border-[#00ff88]/60 transition-all" />
                      <span className="absolute inset-0 bg-[#00ff88]/5 group-hover:bg-[#00ff88]/10 rounded-2xl transition-all" />
                    </>
                  )}
                  
                  <span className="relative z-10 flex items-center justify-between">
                    {link.name}
                    <span className={`w-2 h-2 rounded-full transition-all ${
                      activeLink === link.path 
                        ? 'bg-black' 
                        : 'bg-[#00ff88] opacity-50 group-hover:opacity-100'
                    }`} />
                  </span>
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-[#00ff88]/10 flex flex-col gap-2">
              <a
                href="/login"
                className="w-full px-4 py-3 text-center bg-white/5 hover:bg-white/10 border border-[#00ff88]/20 rounded-xl text-white font-medium transition-all"
              >
                Login
              </a>
              <a
                href="/register"
                className="w-full px-4 py-3 text-center bg-gradient-to-r from-[#00ff88] to-[#00ffcc] rounded-xl text-black font-semibold hover:shadow-lg hover:shadow-[#00ff88]/50 transition-all"
              >
                Register
              </a>
            </div>
          </div>
        )}
      </div>
      
      {/* Add custom animation for gradient */}
      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </nav>
    
    {/* Torch Light Effect - Bottom Glow Shadow */}
    <div className="fixed top-20 left-0 right-0 z-40 pointer-events-none">
      {/* Main Torch Light - Center Spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] opacity-60">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00ff88]/30 via-[#00ff88]/10 to-transparent blur-3xl" />
      </div>
      
      {/* Left Side Glow */}
      <div className="absolute top-0 left-[10%] w-[400px] h-[150px] opacity-40">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00ff88]/20 to-transparent blur-2xl" />
      </div>
      
      {/* Right Side Glow */}
      <div className="absolute top-0 right-[10%] w-[400px] h-[150px] opacity-40">
        <div className="absolute inset-0 bg-gradient-to-bl from-[#00ffcc]/20 to-transparent blur-2xl" />
      </div>
      
      {/* Bottom Gradient Fade */}
      <div className="absolute top-0 left-0 right-0 h-[300px]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00ff88]/5 via-[#00ff88]/2 to-transparent" />
      </div>
      
      {/* Animated Particles */}
      <div className="absolute top-10 left-[20%] w-2 h-2 bg-[#00ff88] rounded-full animate-pulse opacity-60" />
      <div className="absolute top-20 left-[40%] w-1.5 h-1.5 bg-[#00ffcc] rounded-full animate-ping opacity-40" />
      <div className="absolute top-16 left-[60%] w-1 h-1 bg-[#00ff88] rounded-full animate-pulse opacity-50" />
      <div className="absolute top-12 left-[80%] w-2 h-2 bg-[#00ffcc] rounded-full animate-ping opacity-30" />
    </div>
  </>
  );
};

export default Navbar;