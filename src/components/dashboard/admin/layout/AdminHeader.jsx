import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Settings } from 'lucide-react';
import NotificationBell from '../../../notification/NotificationBell';

const AdminHeader = () => {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 backdrop-blur-lg border-b"
      style={{
        background: 'linear-gradient(135deg, rgba(18, 18, 18, 0.95), rgba(26, 26, 26, 0.95))',
        borderColor: 'rgba(255, 16, 240, 0.3)',
        boxShadow: '0 0 20px rgba(255, 16, 240, 0.1)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8" style={{ color: '#FF10F0' }} />
            <h1 className="text-2xl font-bold" style={{
              background: 'linear-gradient(90deg, #FF10F0, #00F0FF, #39FF14)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Admin
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Dynamic Notification Bell */}
            <NotificationBell />
            
            <Settings className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform" style={{ color: '#39FF14' }} />
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default AdminHeader;