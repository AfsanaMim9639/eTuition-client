import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaBook, FaPlus, FaUsers, FaDollarSign, FaUser, FaChartBar, FaCog, FaTimes } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';

const Sidebar = () => {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getMenuItems = () => {
    switch (user?.role) {
      case 'student':
        return [
          { path: '/dashboard/student', icon: <FaHome />, label: 'Dashboard' },
          { path: '/dashboard/student/tuitions', icon: <FaBook />, label: 'My Tuitions' },
          { path: '/dashboard/student/post-tuition', icon: <FaPlus />, label: 'Post Tuition' },
          { path: '/dashboard/student/payments', icon: <FaDollarSign />, label: 'Payments' },
          { path: '/dashboard/student/profile', icon: <FaUser />, label: 'Profile' },
        ];
      case 'tutor':
        return [
          { path: '/dashboard/tutor', icon: <FaHome />, label: 'Dashboard' },
          { path: '/dashboard/tutor/applications', icon: <FaBook />, label: 'My Applications' },
          { path: '/dashboard/tutor/ongoing', icon: <FaUsers />, label: 'Ongoing Tuitions' },
          { path: '/dashboard/tutor/revenue', icon: <FaDollarSign />, label: 'Revenue' },
        ];
      case 'admin':
        return [
          { path: '/dashboard/admin', icon: <FaHome />, label: 'Dashboard' },
          { path: '/dashboard/admin/users', icon: <FaUsers />, label: 'User Management' },
          { path: '/dashboard/admin/tuitions', icon: <FaBook />, label: 'Tuition Management' },
          { path: '/dashboard/admin/reports', icon: <FaChartBar />, label: 'Reports & Analytics' },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-24 left-4 z-50 btn btn-neon-pink p-3 rounded-lg"
      >
        {isMobileMenuOpen ? <FaTimes size={20} /> : <FaCog size={20} />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-dark-card border-r-2 border-neon-pink/30 z-40
        transition-transform duration-300 pt-20
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* User Info */}
        <div className="p-6 border-b border-neon-pink/30">
          <div className="flex items-center space-x-3">
            <img
              src={user?.profileImage || 'https://i.ibb.co/qpB9ZNp/default-avatar.png'}
              alt={user?.name}
              className="w-12 h-12 rounded-full neon-border-pink"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-white truncate">{user?.name}</h3>
              <p className="text-sm text-gray-400 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'bg-neon-pink/20 border-2 border-neon-pink text-neon-pink'
                    : 'text-gray-400 hover:bg-neon-blue/10 hover:text-neon-blue'
                }`
              }
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-semibold">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Back to Home */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neon-pink/30">
          <NavLink
            to="/"
            className="flex items-center justify-center space-x-2 btn btn-neon-blue w-full py-3 rounded-lg font-semibold"
          >
            <FaHome />
            <span>Back to Home</span>
          </NavLink>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
        ></div>
      )}
    </>
  );
};

export default Sidebar;