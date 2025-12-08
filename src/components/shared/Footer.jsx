import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { GraduationCap } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      footerRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top bottom-=100',
        }
      }
    );
  }, []);

  return (
    <footer ref={footerRef} className="bg-[#0f1512] border-t-2 border-[#00ff88]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <Link 
              to="/" 
              className="flex items-center gap-3 group mb-4"
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-[#00ff88] to-[#00ffcc] rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#00ff88]/30">
                  <GraduationCap className="w-7 h-7 text-[#0a0f0d]" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#00ff88] to-[#00ffcc] rounded-xl blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              </div>
              <span className="text-xl font-bold">
                <span className="bg-gradient-to-r from-[#00ff88] to-[#00ffcc] bg-clip-text text-transparent">
                  eTuitionBD
                </span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Connect students with the best tutors in Bangladesh. Quality education at your fingertips.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#00ff88] transition-colors duration-300"
                aria-label="Facebook"
              >
                <FaFacebook size={22} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#00ff88] transition-colors duration-300"
                aria-label="X (Twitter)"
              >
                <FaXTwitter size={22} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#00ff88] transition-colors duration-300"
                aria-label="Instagram"
              >
                <FaInstagram size={22} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#00ff88] transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={22} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-[#00ff88] mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/" className="text-gray-400 hover:text-[#00ff88] transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/tuitions" className="text-gray-400 hover:text-[#00ff88] transition-colors text-sm">
                  All Tuitions
                </Link>
              </li>
              <li>
                <Link to="/tutors" className="text-gray-400 hover:text-[#00ff88] transition-colors text-sm">
                  All Tutors
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-[#00ff88] transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-[#00ff88] transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* For Users */}
          <div>
            <h3 className="text-lg font-bold text-[#00ffcc] mb-4">For Users</h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/register" className="text-gray-400 hover:text-[#00ff88] transition-colors text-sm">
                  Register as Student
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-400 hover:text-[#00ff88] transition-colors text-sm">
                  Register as Tutor
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-[#00ff88] transition-colors text-sm">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-[#00ff88] transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-[#00ff88] transition-colors text-sm">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-[#00ff88] mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-gray-400 text-sm">
                <FaMapMarkerAlt className="text-[#00ff88] mt-0.5 flex-shrink-0" size={16} />
                <span>Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400 text-sm">
                <FaPhone className="text-[#00ffcc] flex-shrink-0" size={16} />
                <a href="tel:+8801234567890" className="hover:text-[#00ff88] transition-colors">
                  +880 1234-567890
                </a>
              </li>
              <li className="flex items-center space-x-3 text-gray-400 text-sm">
                <FaEnvelope className="text-[#00ff88] flex-shrink-0" size={16} />
                <a href="mailto:info@etuitionbd.com" className="hover:text-[#00ff88] transition-colors">
                  info@etuitionbd.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar - Copyright */}
        <div className="border-t border-[#00ff88]/30 mt-10 pt-6 text-center">
          <p className="text-gray-400 text-sm">
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