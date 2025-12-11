// src/components/dashboard/admin/AdminDashboard.jsx
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import AdminHeader from './layout/AdminHeader';
import AdminTabNavigation from './layout/AdminTabNavigation';
import DashboardTab from './tabs/DashboardTab';
import UsersTab from './tabs/UsersTab';
import TuitionsTab from './tabs/TuitionsTab';
import ReportsTab from './tabs/ReportsTab';
import { useAdminStats } from './hooks/useAdminStats';
import { useAdminUsers } from './hooks/useAdminUsers';
import { useAdminTuitions } from './hooks/useAdminTuitions';
import { useAdminPayments } from './hooks/useAdminPayments';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const statsHook = useAdminStats();
  const usersHook = useAdminUsers();
  const tuitionsHook = useAdminTuitions();
  const paymentsHook = useAdminPayments();

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0f0d', color: 'white' }}>
      <AdminHeader />
      <AdminTabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && <DashboardTab stats={statsHook.stats} />}
          {activeTab === 'users' && <UsersTab usersHook={usersHook} />}
          {activeTab === 'tuitions' && <TuitionsTab tuitionsHook={tuitionsHook} />}
          {activeTab === 'reports' && <ReportsTab stats={statsHook.stats} paymentsHook={paymentsHook} />}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminDashboard;