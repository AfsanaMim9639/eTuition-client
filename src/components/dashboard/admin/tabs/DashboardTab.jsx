// src/components/dashboard/admin/tabs/DashboardTab.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, DollarSign, TrendingUp, BarChart3, PieChart } from 'lucide-react';
import StatCard from '../cards/StatCard';
import MonthlyRevenueChart from '../charts/MonthlyRevenueChart';
import PaymentMethodsChart from '../charts/PaymentMethodsChart';
import UserGrowthChart from '../charts/UserGrowthChart';
import TuitionsStatusChart from '../charts/TuitionsStatusChart';

const DashboardTab = ({ stats }) => {
  const statCards = [
    { 
      title: 'Total Users', 
      value: stats?.users?.total || 0, 
      icon: Users, 
      color: '#FF10F0',
      subtext: `${stats?.users?.students || 0} Students, ${stats?.users?.tutors || 0} Tutors`
    },
    { 
      title: 'Total Tuitions', 
      value: stats?.tuitions?.total || 0, 
      icon: BookOpen, 
      color: '#00F0FF',
      subtext: `${stats?.tuitions?.pending || 0} Pending`
    },
    { 
      title: 'Total Revenue', 
      value: `৳${(stats?.payments?.revenue || 0).toLocaleString()}`, 
      icon: DollarSign, 
      color: '#39FF14',
      subtext: `${stats?.payments?.total || 0} Transactions`
    },
    { 
      title: 'Applications', 
      value: stats?.applications || 0, 
      icon: TrendingUp, 
      color: '#FF10F0',
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
          background: 'linear-gradient(90deg, #FF10F0, #00F0FF)',
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
          <StatCard key={card.title} {...card} index={index} />
        ))}
      </div>

      {/* Quick Stats */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="p-6 rounded-xl backdrop-blur-lg"
        style={{
          background: 'linear-gradient(135deg, rgba(18, 18, 18, 0.95), rgba(26, 26, 26, 0.95))',
          border: '2px solid rgba(255, 16, 240, 0.3)',
          boxShadow: '0 0 20px rgba(255, 16, 240, 0.1)'
        }}
      >
        <h3 className="text-xl font-bold mb-4" style={{ color: '#FF10F0' }}>
          Quick Stats
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg" style={{ background: 'rgba(255, 16, 240, 0.05)' }}>
            <p className="text-gray-400 text-sm">Pending Tuitions</p>
            <p className="text-2xl font-bold" style={{ color: '#FF10F0' }}>
              {stats?.tuitions?.pending || 0}
            </p>
          </div>
          <div className="p-4 rounded-lg" style={{ background: 'rgba(0, 240, 255, 0.05)' }}>
            <p className="text-gray-400 text-sm">Approved Tuitions</p>
            <p className="text-2xl font-bold" style={{ color: '#00F0FF' }}>
              {stats?.tuitions?.approved || 0}
            </p>
          </div>
          <div className="p-4 rounded-lg" style={{ background: 'rgba(57, 255, 20, 0.05)' }}>
            <p className="text-gray-400 text-sm">Ongoing Tuitions</p>
            <p className="text-2xl font-bold" style={{ color: '#39FF14' }}>
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
              background: 'linear-gradient(135deg, rgba(18, 18, 18, 0.95), rgba(26, 26, 26, 0.95))',
              border: '2px solid rgba(0, 240, 255, 0.3)',
              boxShadow: '0 0 20px rgba(0, 240, 255, 0.1)'
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-6 h-6" style={{ color: '#00F0FF' }} />
              <h3 className="text-xl font-bold text-white">
                Monthly Revenue Trend
              </h3>
            </div>
            <MonthlyRevenueChart data={stats.charts.monthlyRevenue} />
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
                background: 'linear-gradient(135deg, rgba(18, 18, 18, 0.95), rgba(26, 26, 26, 0.95))',
                border: '2px solid rgba(255, 16, 240, 0.3)',
                boxShadow: '0 0 20px rgba(255, 16, 240, 0.1)'
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <PieChart className="w-6 h-6" style={{ color: '#FF10F0' }} />
                <h3 className="text-xl font-bold text-white">
                  Payment Methods
                </h3>
              </div>
              <PaymentMethodsChart data={stats.charts.paymentMethods} />
            </motion.div>

            {/* User Growth Chart */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="p-6 rounded-xl backdrop-blur-lg"
              style={{
                background: 'linear-gradient(135deg, rgba(18, 18, 18, 0.95), rgba(26, 26, 26, 0.95))',
                border: '2px solid rgba(57, 255, 20, 0.3)',
                boxShadow: '0 0 20px rgba(57, 255, 20, 0.1)'
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-6 h-6" style={{ color: '#39FF14' }} />
                <h3 className="text-xl font-bold text-white">
                  User Growth (Last 6 Months)
                </h3>
              </div>
              <UserGrowthChart data={stats.charts.userGrowth} />
            </motion.div>
          </div>

          {/* Tuitions Status Chart */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="p-6 rounded-xl backdrop-blur-lg"
            style={{
              background: 'linear-gradient(135deg, rgba(18, 18, 18, 0.95), rgba(26, 26, 26, 0.95))',
              border: '2px solid rgba(255, 165, 0, 0.3)',
              boxShadow: '0 0 20px rgba(255, 165, 0, 0.1)'
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-6 h-6" style={{ color: '#FFA500' }} />
              <h3 className="text-xl font-bold text-white">
                Tuitions Status Distribution
              </h3>
            </div>
            <TuitionsStatusChart data={stats.charts.tuitionsStatus} />
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default DashboardTab;