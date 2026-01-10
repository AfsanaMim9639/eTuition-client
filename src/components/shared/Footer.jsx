import { Link, useLocation } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { GraduationCap } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../../contexts/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const location = useLocation();
  const { isDark } = useTheme();

  useEffect(() => {
    ScrollTrigger.refresh();
    
    const timer = setTimeout(() => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === footerRef.current) {
          trigger.kill();
        }
      });

      const ctx = gsap.context(() => {
        gsap.fromTo(
          footerRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top bottom',
              end: 'bottom bottom',
              toggleActions: 'play none none reverse',
              invalidateOnRefresh: true,
              once: false
            }
          }
        );
      }, footerRef);

      return () => ctx.revert();
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.refresh();
    };
  }, [location.pathname]);

  return (
    <footer 
      ref={footerRef} 
      className={`border-t-2 transition-colors duration-300 ${
        isDark 
          ? 'bg-[#0f1512] border-[#00ff88]/30' 
          : 'bg-gray-50 border-emerald-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <Link 
              to="/" 
              className="flex items-center gap-3 group mb-4"
            >
              <div className="relative">
                <div className={`w-12 h-12 bg-gradient-to-br from-[#00ff88] to-[#00ffcc] rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#00ff88]/30`}>
                  <GraduationCap className={`w-7 h-7 ${isDark ? 'text-[#0a0f0d]' : 'text-white'}`} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#00ff88] to-[#00ffcc] rounded-xl blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              </div>
              <span className="text-xl font-bold">
                <span className="bg-gradient-to-r from-[#00ff88] to-[#00ffcc] bg-clip-text text-transparent">
                  eTuitionBD
                </span>
              </span>
            </Link>
            <p className={`text-sm mb-6 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Connect students with the best tutors in Bangladesh. Quality education at your fingertips.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors duration-300 ${
                  isDark 
                    ? 'text-gray-400 hover:text-[#00ff88]' 
                    : 'text-gray-600 hover:text-emerald-700'
                }`}
                aria-label="Facebook"
              >
                <FaFacebook size={22} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors duration-300 ${
                  isDark 
                    ? 'text-gray-400 hover:text-[#00ff88]' 
                    : 'text-gray-600 hover:text-emerald-700'
                }`}
                aria-label="X (Twitter)"
              >
                <FaXTwitter size={22} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors duration-300 ${
                  isDark 
                    ? 'text-gray-400 hover:text-[#00ff88]' 
                    : 'text-gray-600 hover:text-emerald-700'
                }`}
                aria-label="Instagram"
              >
                <FaInstagram size={22} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors duration-300 ${
                  isDark 
                    ? 'text-gray-400 hover:text-[#00ff88]' 
                    : 'text-gray-600 hover:text-emerald-700'
                }`}
                aria-label="LinkedIn"
              >
                <FaLinkedin size={22} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`text-lg font-bold mb-4 ${
              isDark ? 'text-[#00ff88]' : 'text-emerald-700'
            }`}>
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link 
                  to="/" 
                  className={`text-sm transition-colors ${
                    isDark 
                      ? 'text-gray-400 hover:text-[#00ff88]' 
                      : 'text-gray-600 hover:text-emerald-700'
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/tuitions" 
                  className={`text-sm transition-colors ${
                    isDark 
                      ? 'text-gray-400 hover:text-[#00ff88]' 
                      : 'text-gray-600 hover:text-emerald-700'
                  }`}
                >
                  All Tuitions
                </Link>
              </li>
              <li>
                <Link 
                  to="/tutors" 
                  className={`text-sm transition-colors ${
                    isDark 
                      ? 'text-gray-400 hover:text-[#00ff88]' 
                      : 'text-gray-600 hover:text-emerald-700'
                  }`}
                >
                  All Tutors
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className={`text-sm transition-colors ${
                    isDark 
                      ? 'text-gray-400 hover:text-[#00ff88]' 
                      : 'text-gray-600 hover:text-emerald-700'
                  }`}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className={`text-sm transition-colors ${
                    isDark 
                      ? 'text-gray-400 hover:text-[#00ff88]' 
                      : 'text-gray-600 hover:text-emerald-700'
                  }`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* For Users */}
          <div>
            <h3 className={`text-lg font-bold mb-4 ${
              isDark ? 'text-[#00ffcc]' : 'text-cyan-700'
            }`}>
              For Users
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link 
                  to="/register" 
                  className={`text-sm transition-colors ${
                    isDark 
                      ? 'text-gray-400 hover:text-[#00ff88]' 
                      : 'text-gray-600 hover:text-emerald-700'
                  }`}
                >
                  Register as Student
                </Link>
              </li>
              <li>
                <Link 
                  to="/register" 
                  className={`text-sm transition-colors ${
                    isDark 
                      ? 'text-gray-400 hover:text-[#00ff88]' 
                      : 'text-gray-600 hover:text-emerald-700'
                  }`}
                >
                  Register as Tutor
                </Link>
              </li>
              <li>
                <Link 
                  to="/login" 
                  className={`text-sm transition-colors ${
                    isDark 
                      ? 'text-gray-400 hover:text-[#00ff88]' 
                      : 'text-gray-600 hover:text-emerald-700'
                  }`}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy" 
                  className={`text-sm transition-colors ${
                    isDark 
                      ? 'text-gray-400 hover:text-[#00ff88]' 
                      : 'text-gray-600 hover:text-emerald-700'
                  }`}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms" 
                  className={`text-sm transition-colors ${
                    isDark 
                      ? 'text-gray-400 hover:text-[#00ff88]' 
                      : 'text-gray-600 hover:text-emerald-700'
                  }`}
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className={`text-lg font-bold mb-4 ${
              isDark ? 'text-[#00ff88]' : 'text-emerald-700'
            }`}>
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className={`flex items-start space-x-3 text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <FaMapMarkerAlt 
                  className={`mt-0.5 flex-shrink-0 ${
                    isDark ? 'text-[#00ff88]' : 'text-emerald-700'
                  }`} 
                  size={16} 
                />
                <span>Dhaka, Bangladesh</span>
              </li>
              <li className={`flex items-center space-x-3 text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <FaPhone 
                  className={`flex-shrink-0 ${
                    isDark ? 'text-[#00ffcc]' : 'text-cyan-700'
                  }`} 
                  size={16} 
                />
                <a 
                  href="tel:+8801234567890" 
                  className={`transition-colors ${
                    isDark 
                      ? 'hover:text-[#00ff88]' 
                      : 'hover:text-emerald-700'
                  }`}
                >
                  +880 1234-567890
                </a>
              </li>
              <li className={`flex items-center space-x-3 text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <FaEnvelope 
                  className={`flex-shrink-0 ${
                    isDark ? 'text-[#00ff88]' : 'text-emerald-700'
                  }`} 
                  size={16} 
                />
                <a 
                  href="mailto:info@etuitionbd.com" 
                  className={`transition-colors ${
                    isDark 
                      ? 'hover:text-[#00ff88]' 
                      : 'hover:text-emerald-700'
                  }`}
                >
                  info@etuitionbd.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar - Copyright */}
        <div className={`border-t mt-10 pt-6 text-center ${
          isDark ? 'border-[#00ff88]/30' : 'border-emerald-200'
        }`}>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            &copy; {new Date().getFullYear()}{' '}
            <span className="bg-gradient-to-r from-[#00ff88] to-[#00ffcc] bg-clip-text text-transparent font-semibold">
              eTuitionBD
            </span>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;