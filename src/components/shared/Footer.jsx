import React from 'react';
import { BookOpen } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative z-10 bg-[#0a0f0d] border-t border-[#00ff88]/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="w-8 h-8 text-[#00ff88]" />
              <span className="text-2xl font-bold bg-gradient-to-r from-[#00ff88] to-[#00ffcc] bg-clip-text text-transparent">
                eTuitionBd
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Bangladesh's leading tuition management platform connecting students with verified tutors.
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Tuitions', 'Tutors', 'About', 'Contact'].map(link => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-[#00ff88] transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Dhaka, Bangladesh</li>
              <li>info@etuitionbd.com</li>
              <li>+880 1234-567890</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {['Facebook', 'X', 'LinkedIn', 'Instagram'].map(social => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 bg-[#00ff88]/10 border border-[#00ff88]/30 rounded-lg flex items-center justify-center hover:bg-[#00ff88] hover:border-[#00ff88] transition-all duration-300 group"
                >
                  <span className="text-[#00ff88] group-hover:text-[#0a0f0d] text-sm font-bold">
                    {social[0]}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[#00ff88]/20 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 eTuitionBd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;