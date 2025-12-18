import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Check, Trash2, Filter, RefreshCw } from 'lucide-react';
import { getNotifications, markAllAsRead, deleteAllRead } from '../../utils/notificationService';
import NotificationItem from '../../components/notification/NotificationItem';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'unread', or type
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchNotifications();
  }, [filter, page]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const data = await getNotifications({
        page,
        limit: 20,
        unreadOnly: filter === 'unread'
      });
      
      setNotifications(data.data || []);
      setTotalPages(data.pages || 1);
      setUnreadCount(data.unreadCount || 0);
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
    if (!confirm('Are you sure you want to delete all read notifications?')) return;
    
    try {
      await deleteAllRead();
      fetchNotifications();
    } catch (error) {
      console.error('Failed to clear read notifications:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f0d] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-[#FF10F0] neon-text-pink mb-2">
                Notifications
              </h1>
              <p className="text-gray-400">
                {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
              </p>
            </div>

            <button
              onClick={fetchNotifications}
              disabled={loading}
              className="p-3 bg-[#121212] border-2 border-[#FF10F0]/30 hover:border-[#FF10F0] rounded-lg transition-all"
            >
              <RefreshCw className={`w-5 h-5 text-[#FF10F0] ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {/* Filters & Actions */}
          <div className="flex flex-wrap gap-3">
            {/* Filter Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === 'all'
                    ? 'bg-gradient-to-r from-[#FF10F0] to-[#00F0FF] text-black'
                    : 'bg-[#121212] text-gray-400 hover:text-white border border-[#FF10F0]/20'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === 'unread'
                    ? 'bg-gradient-to-r from-[#FF10F0] to-[#00F0FF] text-black'
                    : 'bg-[#121212] text-gray-400 hover:text-white border border-[#FF10F0]/20'
                }`}
              >
                Unread {unreadCount > 0 && `(${unreadCount})`}
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 ml-auto">
              <button
                onClick={handleMarkAllRead}
                className="flex items-center gap-2 px-4 py-2 bg-[#121212] hover:bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/30 rounded-lg transition-all"
              >
                <Check className="w-4 h-4" />
                Mark all read
              </button>
              <button
                onClick={handleClearRead}
                className="flex items-center gap-2 px-4 py-2 bg-[#121212] hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg transition-all"
              >
                <Trash2 className="w-4 h-4" />
                Clear read
              </button>
            </div>
          </div>
        </motion.div>

        {/* Notifications List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-[#121212]/50 backdrop-blur-xl border-2 border-[#FF10F0]/20 rounded-xl overflow-hidden"
        >
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-[#FF10F0] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-20">
              <Bell className="w-16 h-16 mx-auto mb-4 text-[#FF10F0]/30" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">
                No notifications
              </h3>
              <p className="text-gray-600">
                {filter === 'unread' 
                  ? "You're all caught up!"
                  : "You'll see notifications here when you get them"}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#FF10F0]/10">
              <AnimatePresence>
                {notifications.map((notification, index) => (
                  <NotificationItem
                    key={notification._id}
                    notification={notification}
                    index={index}
                    onUpdate={fetchNotifications}
                    onClose={() => {}}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="p-4 border-t border-[#FF10F0]/20 flex items-center justify-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-[#1a1a1a] border border-[#FF10F0]/30 hover:border-[#FF10F0] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-all text-[#FF10F0]"
              >
                Previous
              </button>
              
              <span className="px-4 py-2 text-gray-400">
                Page {page} of {totalPages}
              </span>
              
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 bg-[#1a1a1a] border border-[#FF10F0]/30 hover:border-[#FF10F0] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-all text-[#FF10F0]"
              >
                Next
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Notifications;