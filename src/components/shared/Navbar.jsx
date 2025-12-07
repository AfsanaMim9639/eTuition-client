import React, { useState } from 'react';
import { BookOpen, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-[#0a0f0d]/80 border-b border-[#00ff88]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-8 h-8 text-[#00ff88]" />
            <span className="text-2xl font-bold bg-gradient-to-r from-[#00ff88] to-[#00ffcc] bg-clip-text text-transparent">
              eTuitionBd
            </span>
          </div>

          <div className="hidden md:flex space-x-8">
            {['Home', 'Tuitions', 'Tutors', 'About', 'Contact'].map(item => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-300 hover:text-[#00ff88] transition-colors duration-300 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00ff88] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          <div className="hidden md:flex space-x-4">
            <button className="px-4 py-2 text-[#00ff88] border border-[#00ff88] rounded-lg hover:bg-[#00ff88]/10 transition-all duration-300">
              Login
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-[#00ff88] to-[#00ffcc] text-[#0a0f0d] rounded-lg hover:shadow-lg hover:shadow-[#00ff88]/50 transition-all duration-300 font-semibold">
              Register
            </button>
          </div>

          <button
            className="md:hidden text-[#00ff88]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0f0d]/95 backdrop-blur-lg border-t border-[#00ff88]/20">
          <div className="px-4 py-4 space-y-3">
            {['Home', 'Tuitions', 'Tutors', 'About', 'Contact'].map(item => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block text-gray-300 hover:text-[#00ff88] transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <button className="w-full px-4 py-2 text-[#00ff88] border border-[#00ff88] rounded-lg">
              Login
            </button>
            <button className="w-full px-4 py-2 bg-gradient-to-r from-[#00ff88] to-[#00ffcc] text-[#0a0f0d] rounded-lg font-semibold">
              Register
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;