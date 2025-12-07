import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center">
          <div
            className="inline-block mb-6"
            style={{
              transform: `translateY(${scrollY * 0.3}px)`,
              opacity: Math.max(0, 1 - scrollY / 500)
            }}
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00ff88] to-[#00ffcc] rounded-lg blur opacity-30 animate-pulse" />
              <h1 className="relative text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-[#00ff88] via-[#00ffcc] to-[#00ff88] bg-clip-text text-transparent animate-gradient">
                  Find Your Perfect Tutor
                </span>
              </h1>
            </div>
          </div>

          <p
            className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
            style={{
              transform: `translateY(${scrollY * 0.2}px)`,
              opacity: Math.max(0, 1 - scrollY / 500)
            }}
          >
            Connect with verified tutors, manage tuitions seamlessly, and track your academic progress all in one platform
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group px-8 py-4 bg-gradient-to-r from-[#00ff88] to-[#00ffcc] text-[#0a0f0d] rounded-lg font-bold text-lg hover:shadow-2xl hover:shadow-[#00ff88]/50 transition-all duration-300 transform hover:scale-105">
              Get Started
              <ChevronRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 border-2 border-[#00ff88] text-[#00ff88] rounded-lg font-bold text-lg hover:bg-[#00ff88]/10 transition-all duration-300 transform hover:scale-105">
              Browse Tutors
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-[#00ff88] rounded-full flex justify-center">
          <div className="w-1 h-3 bg-[#00ff88] rounded-full mt-2 animate-pulse" />
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;