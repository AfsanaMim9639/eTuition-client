// src/pages/dashboard/admin/AdminDashboard.jsx
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AdminHeader from '../../../components/dashboard/admin/layout/AdminHeader';
import AdminTabNavigation from '../../../components/dashboard/admin/layout/AdminTabNavigation';

const AdminDashboard = () => {
  const location = useLocation();
  
  // Determine active tab from URL
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('/users')) return 'users';
    if (path.includes('/tuitions')) return 'tuitions';
    if (path.includes('/reports')) return 'reports';
    return 'dashboard';
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0f0d', color: 'white' }}>
      <AdminHeader />
      
      {/* Tab Navigation - No onTabChange needed */}
      <AdminTabNavigation activeTab={getActiveTab()} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Child routes render here */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;