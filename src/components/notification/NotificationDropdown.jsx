import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, Check, Trash2, Eye } from 'lucide-react';
import { getNotifications, markAllAsRead, deleteAllRead } from '../../utils/notificationService';
import NotificationItem from './NotificationItem';

const NotificationDropdown = ({ onClose, onCountUpdate }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('all'); // 'all' or 'unread'
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
    
    // Close on outside click
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [tab]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const data = await getNotifications({
        limit: 10,
        unreadOnly: tab === 'unread'
      });
      
      setNotifications(data.data || []);
      onCountUpdate(data.unreadCount || 0);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllAsRead();
      fetchNotifications();
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  };

  const handleClearRead = async () => {
    try {
      await deleteAllRead();
      fetchNotifications();
    } catch (error) {
      console.error('Failed to clear read notifications:', error);
    }
  };

  const handleViewAll = () => {
    const role = JSON.parse(localStorage.getItem('user'))?.role || 'student';
    navigate(`/dashboard/${role}/notifications`);
    onClose();
  };

  return (
    <motion.div
      ref={dropdownRef}
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="absolute right-0 top-12 w-96 max-h-[600px] bg-[#121212]/95 backdrop-blur-xl border-2 border-[#FF10F0]/30 rounded-xl shadow-2xl overflow-hidden z-50"
      style={{
        boxShadow: '0 0 40px rgba(255, 16, 240, 0.2)'
      }}
    >
      {/* Header */}
      <div className="p-4 border-b border-[#FF10F0]/20">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-[#FF10F0] neon-text-pink">
            Notifications
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#FF10F0]/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setTab('all')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              tab === 'all'
                ? 'bg-gradient-to-r from-[#FF10F0] to-[#00F0FF] text-black'
                : 'bg-[#1a1a1a] text-gray-400 hover:text-white'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setTab('unread')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              tab === 'unread'
                ? 'bg-gradient-to-r from-[#FF10F0] to-[#00F0FF] text-black'
                : 'bg-[#1a1a1a] text-gray-400 hover:text-white'
            }`}
          >
            Unread
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="p-3 border-b border-[#FF10F0]/20 flex gap-2">
        <button
          onClick={handleMarkAllRead}
          className="flex items-center gap-2 px-3 py-1.5 text-xs bg-[#1a1a1a] hover:bg-[#00F0FF]/20 text-[#00F0FF] rounded-lg transition-all"
        >
          <Check className="w-3.5 h-3.5" />
          Mark all read
        </button>
        <button
          onClick={handleClearRead}
          className="flex items-center gap-2 px-3 py-1.5 text-xs bg-[#1a1a1a] hover:bg-red-500/20 text-red-400 rounded-lg transition-all"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Clear read
        </button>
      </div>

      {/* Notification List */}
      <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#FF10F0] scrollbar-track-transparent">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-3 border-[#FF10F0] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <Bell className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No notifications</p>
          </div>
        ) : (
          <div className="divide-y divide-[#FF10F0]/10">
            {notifications.map((notification, index) => (
              <NotificationItem
                key={notification._id}
                notification={notification}
                index={index}
                onUpdate={fetchNotifications}
                onClose={onClose}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="p-3 border-t border-[#FF10F0]/20">
          <button
            onClick={handleViewAll}
            className="w-full py-2 px-4 bg-gradient-to-r from-[#FF10F0] to-[#00F0FF] hover:opacity-90 text-black font-medium rounded-lg transition-all flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            View All Notifications
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default NotificationDropdown;