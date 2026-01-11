import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart3, Users, BookOpen, FileText, MessageCircle, User } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';

const TABS = [
  { id: 'dashboard', icon: BarChart3, label: 'Dashboard', color: '#FF10F0', path: '/dashboard/admin' },
  { id: 'users', icon: Users, label: 'User Management', color: '#00F0FF', path: '/dashboard/admin/users' },
  { id: 'tuitions', icon: BookOpen, label: 'Tuition Management', color: '#39FF14', path: '/dashboard/admin/tuitions' },
  { id: 'reports', icon: FileText, label: 'Reports & Analytics', color: '#FF10F0', path: '/dashboard/admin/reports' },
  { id: 'messages', icon: MessageCircle, label: 'Messages', color: '#00ffcc', path: '/dashboard/admin/messages' },
  { id: 'profile', icon: User, label: 'Profile', color: '#00F0FF', path: '/dashboard/admin/profile' }
];

const AdminTabNavigation = ({ activeTab }) => {
  const { isDark } = useTheme();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <NavLink
              key={tab.id}
              to={tab.path}
              end={tab.id === 'dashboard'}
            >
              {({ isActive: isRouteActive }) => {
                const active = isActive || isRouteActive;
                
                return (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 rounded-lg flex items-center gap-2 font-semibold transition-all whitespace-nowrap cursor-pointer"
                    style={{
                      background: active 
                        ? `linear-gradient(135deg, ${tab.color}22, ${tab.color}11)` 
                        : (isDark ? 'rgba(18, 18, 18, 0.5)' : 'rgba(255, 255, 255, 0.5)'),
                      border: `2px solid ${active ? tab.color : (isDark ? 'rgba(255, 16, 240, 0.2)' : 'rgba(255, 16, 240, 0.15)')}`,
                      color: active ? tab.color : (isDark ? '#888' : '#6b7280'),
                      boxShadow: active ? `0 0 20px ${tab.color}33` : 'none'
                    }}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </motion.div>
                );
              }}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default AdminTabNavigation;