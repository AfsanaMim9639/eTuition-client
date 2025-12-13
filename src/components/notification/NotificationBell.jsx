import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell } from 'lucide-react';
import { getUnreadCount } from '../../utils/notificationService';
import NotificationDropdown from './NotificationDropdown';

const NotificationBell = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Fetch unread count
  const fetchUnreadCount = async () => {
    try {
      // Check if user is logged in
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found, skipping notification fetch');
        return;
      }

      const data = await getUnreadCount();
      const newCount = data.count || 0;
      
      // Trigger animation if count increased
      if (newCount > unreadCount) {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 1000);
      }
      
      setUnreadCount(newCount);
    } catch (error) {
      console.error('Failed to fetch unread count:', error);
    }
  };

  useEffect(() => {
    fetchUnreadCount();
    
    // Poll every 30 seconds
    const interval = setInterval(fetchUnreadCount, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const handleBellClick = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="relative">
      {/* Notification Bell Button - Icon Only */}
      <motion.button
        onClick={handleBellClick}
        className="relative p-2 rounded-lg hover:bg-[#00ffcc]/10 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={isAnimating ? {
          rotate: [0, -15, 15, -15, 15, 0],
        } : {}}
        transition={{ duration: 0.5 }}
      >
        {/* Bell Icon */}
        <Bell 
          className="w-6 h-6 text-[#00ffcc]" 
          strokeWidth={2}
        />
        
        {/* Unread Badge */}
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-gradient-to-r from-[#00ff88] to-[#00ffcc] text-black text-[10px] font-bold"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Neon Glow Effect */}
        {unreadCount > 0 && (
          <motion.div
            className="absolute inset-0 rounded-lg bg-[#00ffcc]/30 blur-md -z-10"
            animate={{
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        )}
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {showDropdown && (
          <NotificationDropdown 
            onClose={() => setShowDropdown(false)}
            onCountUpdate={setUnreadCount}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationBell;