import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '../../contexts/ThemeContext';


const ErrorPage = () => {
  const errorRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    gsap.fromTo(
      errorRef.current,
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 1, ease: 'elastic.out(1, 0.5)' }
    );
  }, []);

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-300 ${
      isDark ? 'bg-[#0a0f0d]' : 'bg-gray-50'
    }`}>
      <div ref={errorRef} className="text-center">
        <h1 className="text-9xl font-bold mb-4" data-text="404">
          <span className={`glitch gradient-text ${
            isDark ? '' : 'text-gradient-light'
          }`}>
            404
          </span>
        </h1>
        <h2 className={`text-4xl font-bold mb-4 ${
          isDark ? 'neon-text-pink' : 'text-purple-600'
        }`}>
          Page Not Found
        </h2>
        <p className={`text-xl mb-8 ${
          isDark ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link 
          to="/"
          className={`px-8 py-3 rounded-lg text-lg font-semibold inline-flex items-center space-x-2 transition-all duration-300 ${
            isDark
              ? 'btn-neon-blue'
              : 'bg-cyan-600 text-white hover:bg-cyan-700 border-2 border-cyan-600 hover:border-cyan-700 shadow-lg hover:shadow-xl'
          }`}
        >
          <FaHome />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;