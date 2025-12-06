// src/components/shared/Footer.jsx
import { FaGraduationCap, FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebookF, FaLinkedinIn, FaYoutube, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Find Tuitions', path: '/tuitions' },
    { name: 'Find Tutors', path: '/tutors' },
    { name: 'About Us', path: '/about' },
  ];

  const resources = [
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'FAQs', path: '/faqs' },
    { name: 'Blog', path: '/blog' },
  ];

  const legal = [
    { name: 'Terms & Conditions', path: '/terms' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Support', path: '/support' },
  ];

  const contactInfo = [
    { name: 'Dhaka, Bangladesh', path: '#' },
    { name: '+880 1700-000000', path: 'tel:+8801700000000' },
    { name: 'info@etuitionbd.com', path: 'mailto:info@etuitionbd.com' },
  ];

  const socialLinks = [
    { icon: FaFacebookF, name: 'Facebook', url: '#' },
    { icon: FaXTwitter, name: 'X', url: '#' },
    { icon: FaLinkedinIn, name: 'LinkedIn', url: '#' },
    { icon: FaYoutube, name: 'YouTube', url: '#' },
    { icon: FaInstagram, name: 'Instagram', url: '#' }
  ];

  return (
    <footer className="w-full bg-[#0a0f0d] border-t border-[#00ff88]/20">
      <div className="w-full px-8 md:px-12 lg:px-16">
        <br /><br />
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12">
          
          {/* Brand Section */}
          <div className="px-4 !ml-6">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-[#00ff88] to-[#00ffcc] p-3 rounded-xl">
                <FaGraduationCap className="text-black text-2xl" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-[#00ff88] to-[#00ffcc] bg-clip-text text-transparent">
                eTuitionBD
              </h3>
            </div>

            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Bangladesh's leading online platform connecting students with qualified tutors.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-[#00ff88]/20 text-white/60 hover:text-[#00ff88] hover:border-[#00ff88]/40 hover:bg-[#00ff88]/10 transition-all"
                  aria-label={social.name}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="px-6">
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.path}
                    className="text-white/60 hover:text-[#00ff88] transition-colors text-sm block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="px-4">
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Resources</h4>
            <ul className="space-y-3">
              {resources.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.path}
                    className="text-white/60 hover:text-[#00ff88] transition-colors text-sm block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="px-4">
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3">
              {legal.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.path}
                    className="text-white/60 hover:text-[#00ff88] transition-colors text-sm block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="px-4">
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3">
              {contactInfo.map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.path}
                    className="text-white/60 hover:text-[#00ff88] transition-colors text-sm block"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar - Copyright Centered */}
        <div className="border-t border-[#00ff88]/10 py-6">
          <div className="text-center">
            <p className="text-white/50 text-sm">
              © {currentYear} <span className="text-[#00ff88]">eTuitionBD</span>. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;