// utils/notificationPolling.js
import { getNotifications, getUnreadCount } from './notificationService';

class NotificationPollingService {
  constructor() {
    this.pollingInterval = null;
    this.unreadCountInterval = null;
    this.lastCheck = new Date().toISOString();
    this.callbacks = {
      newNotification: [],
      unreadCountChange: []
    };
  }

  /**
   * Start polling for notifications
   * @param {number} interval - Polling interval in milliseconds (default: 10000 = 10 seconds)
   */
  startPolling(interval = 10000) {
    console.log('🔔 Starting notification polling...');
    
    // Clear any existing intervals
    this.stopPolling();

    // Poll for new notifications
    this.pollingInterval = setInterval(async () => {
      await this.checkNewNotifications();
    }, interval);

    // Poll for unread count more frequently (every 5 seconds)
    this.unreadCountInterval = setInterval(async () => {
      await this.checkUnreadCount();
    }, 5000);

    // Initial checks
    this.checkNewNotifications();
    this.checkUnreadCount();
  }

  /**
   * Stop polling
   */
  stopPolling() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
    if (this.unreadCountInterval) {
      clearInterval(this.unreadCountInterval);
      this.unreadCountInterval = null;
    }
    console.log('🔕 Notification polling stopped');
  }

  /**
   * Check for new notifications
   */
  async checkNewNotifications() {
    try {
      const response = await getNotifications({
        page: 1,
        limit: 5,
        unreadOnly: true
      });

      if (response.data && response.data.length > 0) {
        // Check if there are notifications newer than last check
        const newNotifications = response.data.filter(
          notif => new Date(notif.createdAt) > new Date(this.lastCheck)
        );

        if (newNotifications.length > 0) {
          // Notify all listeners
          this.callbacks.newNotification.forEach(callback => {
            newNotifications.forEach(notification => {
              callback(notification);
            });
          });

          // Update last check time
          this.lastCheck = new Date().toISOString();
        }
      }
    } catch (error) {
      console.error('Failed to check notifications:', error);
    }
  }

  /**
   * Check unread count
   */
  async checkUnreadCount() {
    try {
      const response = await getUnreadCount();
      if (response && typeof response.count === 'number') {
        this.callbacks.unreadCountChange.forEach(callback => {
          callback(response.count);
        });
      }
    } catch (error) {
      // Silently fail - don't spam console
    }
  }

  /**
   * Register callback for new notifications
   */
  onNewNotification(callback) {
    this.callbacks.newNotification.push(callback);
  }

  /**
   * Register callback for unread count changes
   */
  onUnreadCountChange(callback) {
    this.callbacks.unreadCountChange.push(callback);
  }

  /**
   * Remove all listeners
   */
  removeAllListeners() {
    this.callbacks = {
      newNotification: [],
      unreadCountChange: []
    };
  }

  /**
   * Check if polling is active
   */
  isPolling() {
    return this.pollingInterval !== null;
  }
}

// Create singleton instance
const notificationPolling = new NotificationPollingService();

export default notificationPolling;