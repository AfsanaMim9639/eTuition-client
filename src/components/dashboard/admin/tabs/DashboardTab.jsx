// src/components/dashboard/admin/tabs/DashboardTab.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, DollarSign, TrendingUp } from 'lucide-react';
import StatCard from '../cards/StatCard';

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <StatCard key={card.title} {...card} index={index} />
        ))}
      </div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 p-6 rounded-xl backdrop-blur-lg"
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
    </motion.div>
  );
};

export default DashboardTab;