import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Trash2, AlertCircle, CheckCircle, MessageSquare, DollarSign, Star, Bell, User } from 'lucide-react';
import { markAsRead, deleteNotification } from '../../utils/notificationService';

const NotificationItem = ({ notification, index, onUpdate, onClose }) => {
  const navigate = useNavigate();

  // Icon mapping based on notification type
  const getIcon = () => {
    const iconClass = "w-5 h-5";
    
    switch (notification.type) {
      case 'application_received':
        return <User className={`${iconClass} text-[#00F0FF]`} />;
      case 'application_accepted':
        return <CheckCircle className={`${iconClass} text-[#39FF14]`} />;
      case 'application_rejected':
        return <AlertCircle className={`${iconClass} text-red-400`} />;
      case 'payment_received':
      case 'payment_made':
        return <DollarSign className={`${iconClass} text-[#39FF14]`} />;
      case 'review_received':
        return <Star className={`${iconClass} text-yellow-400`} />;
      case 'message_received':
        return <MessageSquare className={`${iconClass} text-[#00F0FF]`} />;
      case 'system_alert':
      case 'account_update':
        return <AlertCircle className={`${iconClass} text-orange-400`} />;
      default:
        return <Bell className={`${iconClass} text-[#FF10F0]`} />;
    }
  };

  // Priority color
  const getPriorityColor = () => {
    switch (notification.priority) {
      case 'urgent': return '#FF10F0';
      case 'high': return '#00F0FF';
      case 'medium': return '#39FF14';
      default: return '#666';
    }
  };

  // Format time
  const formatTime = (date) => {
    const now = new Date();
    const notifDate = new Date(date);
    const diffMs = now - notifDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return notifDate.toLocaleDateString();
  };

  const handleClick = async () => {
    try {
      // Mark as read
      if (!notification.isRead) {
        await markAsRead(notification._id);
      }
      
      // Navigate if link exists
      if (notification.link) {
        navigate(notification.link);
        onClose();
      }
      
      onUpdate();
    } catch (error) {
      console.error('Failed to handle notification click:', error);
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      await deleteNotification(notification._id);
      onUpdate();
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={handleClick}
      className={`p-4 hover:bg-[#1a1a1a]/50 cursor-pointer transition-all group ${
        !notification.isRead ? 'bg-[#FF10F0]/5' : ''
      }`}
      style={{
        borderLeft: `3px solid ${getPriorityColor()}`
      }}
    >
      <div className="flex gap-3">
        {/* Icon */}
        <div className="flex-shrink-0 mt-1">
          <div className="p-2 rounded-lg bg-[#1a1a1a] border border-[#FF10F0]/20">
            {getIcon()}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className={`font-semibold text-sm ${
              notification.isRead ? 'text-gray-300' : 'text-white'
            }`}>
              {notification.title}
            </h4>
            
            {/* Delete Button */}
            <button
              onClick={handleDelete}
              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 rounded transition-all"
            >
              <Trash2 className="w-4 h-4 text-red-400" />
            </button>
          </div>

          <p className={`text-xs mt-1 line-clamp-2 ${
            notification.isRead ? 'text-gray-500' : 'text-gray-400'
          }`}>
            {notification.message}
          </p>

          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-gray-600">
              {formatTime(notification.createdAt)}
            </span>
            
            {!notification.isRead && (
              <span className="w-2 h-2 rounded-full bg-[#FF10F0] animate-pulse" />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NotificationItem;