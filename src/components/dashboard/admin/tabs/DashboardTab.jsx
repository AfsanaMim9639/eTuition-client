// src/components/dashboard/admin/tabs/DashboardTab.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, DollarSign, TrendingUp, BarChart3, PieChart } from 'lucide-react';
import StatCard from '../cards/StatCard';
import MonthlyRevenueChart from '../charts/MonthlyRevenueChart';
import PaymentMethodsChart from '../charts/PaymentMethodsChart';
import UserGrowthChart from '../charts/UserGrowthChart';
import TuitionsStatusChart from '../charts/TuitionsStatusChart';
import { useTheme } from '../../../../contexts/ThemeContext';

const DashboardTab = ({ stats }) => {
  const { isDark } = useTheme();

  const statCards = [
    { 
      title: 'Total Users', 
      value: stats?.users?.total || 0, 
      icon: Users, 
      color: isDark ? '#FF10F0' : '#a855f7',
      subtext: `${stats?.users?.students || 0} Students, ${stats?.users?.tutors || 0} Tutors`
    },
    { 
      title: 'Total Tuitions', 
      value: stats?.tuitions?.total || 0, 
      icon: BookOpen, 
      color: isDark ? '#00F0FF' : '#0891b2',
      subtext: `${stats?.tuitions?.pending || 0} Pending`
    },
    { 
      title: 'Total Revenue', 
      value: `৳${(stats?.payments?.revenue || 0).toLocaleString()}`, 
      icon: DollarSign, 
      color: isDark ? '#39FF14' : '#065f46',
      subtext: `${stats?.payments?.total || 0} Transactions`
    },
    { 
      title: 'Applications', 
      value: stats?.applications || 0, 
      icon: TrendingUp, 
      color: isDark ? '#FF10F0' : '#a855f7',
      subtext: 'Total Applications'
    }
  ];

  return (
    <motion.div
      key="dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      <motion.h2 
        className="text-3xl font-bold mb-8"
        style={{
          background: isDark 
            ? 'linear-gradient(90deg, #FF10F0, #00F0FF)' 
            : 'linear-gradient(90deg, #a855f7, #0891b2)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        Dashboard Overview
      </motion.h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <StatCard key={card.title} {...card} index={index} isDark={isDark} />
        ))}
      </div>

      {/* Quick Stats */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="p-6 rounded-xl backdrop-blur-lg"
        style={{
          background: isDark 
            ? 'linear-gradient(135deg, rgba(18, 18, 18, 0.95), rgba(26, 26, 26, 0.95))'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(249, 250, 251, 0.95))',
          border: isDark ? '2px solid rgba(255, 16, 240, 0.3)' : '2px solid rgba(168, 85, 247, 0.3)',
          boxShadow: isDark ? '0 0 20px rgba(255, 16, 240, 0.1)' : '0 0 10px rgba(168, 85, 247, 0.1)'
        }}
      >
        <h3 
          className="text-xl font-bold mb-4" 
          style={{ color: isDark ? '#FF10F0' : '#a855f7' }}
        >
          Quick Stats
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div 
            className="p-4 rounded-lg" 
            style={{ background: isDark ? 'rgba(255, 16, 240, 0.05)' : 'rgba(168, 85, 247, 0.1)' }}
          >
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
              Pending Tuitions
            </p>
            <p 
              className="text-2xl font-bold" 
              style={{ color: isDark ? '#FF10F0' : '#a855f7' }}
            >
              {stats?.tuitions?.pending || 0}
            </p>
          </div>
          <div 
            className="p-4 rounded-lg" 
            style={{ background: isDark ? 'rgba(0, 240, 255, 0.05)' : 'rgba(8, 145, 178, 0.1)' }}
          >
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
              Approved Tuitions
            </p>
            <p 
              className="text-2xl font-bold" 
              style={{ color: isDark ? '#00F0FF' : '#0891b2' }}
            >
              {stats?.tuitions?.approved || 0}
            </p>
          </div>
          <div 
            className="p-4 rounded-lg" 
            style={{ background: isDark ? 'rgba(57, 255, 20, 0.05)' : 'rgba(6, 95, 70, 0.1)' }}
          >
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
              Ongoing Tuitions
            </p>
            <p 
              className="text-2xl font-bold" 
              style={{ color: isDark ? '#39FF14' : '#065f46' }}
            >
              {stats?.tuitions?.ongoing || 0}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Charts Section */}
      {stats?.charts && (
        <>
          {/* Monthly Revenue Chart */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="p-6 rounded-xl backdrop-blur-lg"
            style={{
              background: isDark 
                ? 'linear-gradient(135deg, rgba(18, 18, 18, 0.95), rgba(26, 26, 26, 0.95))'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(249, 250, 251, 0.95))',
              border: isDark ? '2px solid rgba(0, 240, 255, 0.3)' : '2px solid rgba(8, 145, 178, 0.3)',
              boxShadow: isDark ? '0 0 20px rgba(0, 240, 255, 0.1)' : '0 0 10px rgba(8, 145, 178, 0.1)'
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 
                className="w-6 h-6" 
                style={{ color: isDark ? '#00F0FF' : '#0891b2' }} 
              />
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Monthly Revenue Trend
              </h3>
            </div>
            <MonthlyRevenueChart data={stats.charts.monthlyRevenue} isDark={isDark} />
          </motion.div>

          {/* Two Column Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Payment Methods Chart */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="p-6 rounded-xl backdrop-blur-lg"
              style={{
                background: isDark 
                  ? 'linear-gradient(135deg, rgba(18, 18, 18, 0.95), rgba(26, 26, 26, 0.95))'
                  : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(249, 250, 251, 0.95))',
                border: isDark ? '2px solid rgba(255, 16, 240, 0.3)' : '2px solid rgba(168, 85, 247, 0.3)',
                boxShadow: isDark ? '0 0 20px rgba(255, 16, 240, 0.1)' : '0 0 10px rgba(168, 85, 247, 0.1)'
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <PieChart 
                  className="w-6 h-6" 
                  style={{ color: isDark ? '#FF10F0' : '#a855f7' }} 
                />
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Payment Methods
                </h3>
              </div>
              <PaymentMethodsChart data={stats.charts.paymentMethods} isDark={isDark} />
            </motion.div>

            {/* User Growth Chart */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="p-6 rounded-xl backdrop-blur-lg"
              style={{
                background: isDark 
                  ? 'linear-gradient(135deg, rgba(18, 18, 18, 0.95), rgba(26, 26, 26, 0.95))'
                  : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(249, 250, 251, 0.95))',
                border: isDark ? '2px solid rgba(57, 255, 20, 0.3)' : '2px solid rgba(6, 95, 70, 0.3)',
                boxShadow: isDark ? '0 0 20px rgba(57, 255, 20, 0.1)' : '0 0 10px rgba(6, 95, 70, 0.1)'
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Users 
                  className="w-6 h-6" 
                  style={{ color: isDark ? '#39FF14' : '#065f46' }} 
                />
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  User Growth (Last 6 Months)
                </h3>
              </div>
              <UserGrowthChart data={stats.charts.userGrowth} isDark={isDark} />
            </motion.div>
          </div>

          {/* Tuitions Status Chart */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="p-6 rounded-xl backdrop-blur-lg"
            style={{
              background: isDark 
                ? 'linear-gradient(135deg, rgba(18, 18, 18, 0.95), rgba(26, 26, 26, 0.95))'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(249, 250, 251, 0.95))',
              border: isDark ? '2px solid rgba(255, 165, 0, 0.3)' : '2px solid rgba(249, 115, 22, 0.3)',
              boxShadow: isDark ? '0 0 20px rgba(255, 165, 0, 0.1)' : '0 0 10px rgba(249, 115, 22, 0.1)'
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <BookOpen 
                className="w-6 h-6" 
                style={{ color: isDark ? '#FFA500' : '#f97316' }} 
              />
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Tuitions Status Distribution
              </h3>
            </div>
            <TuitionsStatusChart data={stats.charts.tuitionsStatus} isDark={isDark} />
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default DashboardTab;