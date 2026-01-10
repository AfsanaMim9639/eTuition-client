// src/components/dashboard/admin/AdminDashboard.jsx
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import AdminHeader from './layout/AdminHeader';
import AdminTabNavigation from './layout/AdminTabNavigation';
import DashboardTab from './tabs/DashboardTab';
import UsersTab from './tabs/UsersTab';
import TuitionsTab from './tabs/TuitionsTab';
import ReportsTab from './tabs/ReportsTab';
import ProfileTab from './tabs/ProfileTab';
import Messages from '../../../pages/dashboard/admin/Messages';
import { useAdminStats } from './hooks/useAdminStats';
import { useAdminUsers } from './hooks/useAdminUsers';
import { useAdminTuitions } from './hooks/useAdminTuitions';
import { useAdminReports } from './hooks/useAdminReports';
import { useTheme } from '../../../contexts/ThemeContext';

const AdminDashboard = () => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('dashboard');
  const statsHook = useAdminStats();
  const usersHook = useAdminUsers();
  const tuitionsHook = useAdminTuitions();
  const reportsHook = useAdminReports();

  return (
    <div 
      className={`min-h-screen transition-colors duration-300 ${
        isDark 
          ? 'bg-[#0a0f0d] text-white' 
          : 'bg-gradient-to-b from-emerald-100 via-teal-50 to-emerald-100'
      }`}
      style={isDark ? {} : { color: '#000000', fontWeight: '500' }}
    >
      <AdminHeader isDark={isDark} />
      <AdminTabNavigation activeTab={activeTab} onTabChange={setActiveTab} isDark={isDark} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && <DashboardTab stats={statsHook.stats} isDark={isDark} />}
          {activeTab === 'users' && <UsersTab usersHook={usersHook} isDark={isDark} />}
          {activeTab === 'tuitions' && <TuitionsTab tuitionsHook={tuitionsHook} isDark={isDark} />}
          {activeTab === 'reports' && <ReportsTab reportsHook={reportsHook} isDark={isDark} />}
          {activeTab === 'messages' && <Messages isDark={isDark} />}
          {activeTab === 'profile' && <ProfileTab isDark={isDark} />}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminDashboard;