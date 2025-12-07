import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const ErrorPage = () => {
  const errorRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      errorRef.current,
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 1, ease: 'elastic.out(1, 0.5)' }
    );
  }, []);

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4">
      <div ref={errorRef} className="text-center">
        <h1 className="text-9xl font-bold mb-4" data-text="404">
          <span className="glitch gradient-text">404</span>
        </h1>
        <h2 className="text-4xl font-bold mb-4 neon-text-pink">Page Not Found</h2>
        <p className="text-gray-400 text-xl mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link 
          to="/"
          className="btn btn-neon-blue px-8 py-3 rounded-lg text-lg font-semibold inline-flex items-center space-x-2"
        >
          <FaHome />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;