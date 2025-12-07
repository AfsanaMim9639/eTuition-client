import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
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
    <footer ref={footerRef} className="bg-dark-card border-t-2 border-neon-pink/30 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-lg neon-border-pink flex items-center justify-center">
                <span className="text-xl font-bold gradient-text">T</span>
              </div>
              <span className="text-xl font-bold">
                <span className="neon-text-pink">Tuition</span>
                <span className="neon-text-blue">Hub</span>
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Connect students with the best tutors. Quality education at your fingertips.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neon-pink hover:text-neon-blue transition-colors duration-300">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-neon-pink hover:text-neon-blue transition-colors duration-300">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-neon-pink hover:text-neon-blue transition-colors duration-300">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-neon-pink hover:text-neon-blue transition-colors duration-300">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold neon-text-blue mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-neon-pink transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/tuitions" className="text-gray-400 hover:text-neon-pink transition-colors">
                  All Tuitions
                </Link>
              </li>
              <li>
                <Link to="/tutors" className="text-gray-400 hover:text-neon-pink transition-colors">
                  All Tutors
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-neon-pink transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-neon-pink transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* For Users */}
          <div>
            <h3 className="text-xl font-bold neon-text-green mb-4">For Users</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/register" className="text-gray-400 hover:text-neon-pink transition-colors">
                  Register as Student
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-400 hover:text-neon-pink transition-colors">
                  Register as Tutor
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-neon-pink transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-neon-pink transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-neon-pink transition-colors">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold neon-text-pink mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-gray-400">
                <FaMapMarkerAlt className="text-neon-pink mt-1 flex-shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <FaPhone className="text-neon-blue flex-shrink-0" />
                <span>+880 1234-567890</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <FaEnvelope className="text-neon-green flex-shrink-0" />
                <span>info@tuitionhub.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neon-pink/30 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} <span className="gradient-text font-semibold">TuitionHub</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;