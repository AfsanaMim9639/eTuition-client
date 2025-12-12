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
      {/* Notification Bell Button */}
      <motion.button
        onClick={handleBellClick}
        className="relative p-2 rounded-lg bg-[#121212]/50 border border-[#FF10F0]/20 hover:border-[#FF10F0]/60 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={isAnimating ? {
          rotate: [0, -15, 15, -15, 15, 0],
        } : {}}
        transition={{ duration: 0.5 }}
      >
        {/* Bell Icon */}
        <Bell 
          className="w-5 h-5 text-[#FF10F0]" 
          strokeWidth={2}
        />
        
        {/* Unread Badge */}
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 flex items-center justify-center rounded-full bg-gradient-to-r from-[#FF10F0] to-[#00F0FF] text-black text-xs font-bold"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Neon Glow Effect */}
        {unreadCount > 0 && (
          <motion.div
            className="absolute inset-0 rounded-lg bg-[#FF10F0]/20 blur-lg"
            animate={{
              opacity: [0.3, 0.6, 0.3],
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