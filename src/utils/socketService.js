import api from './api';

class PollingService {
  constructor() {
    this.pollingInterval = null;
    this.currentConversationId = null;
    this.lastMessageTimestamp = null;
    this.callbacks = {
      newMessage: [],
      userTyping: [],
      userStatus: []
    };
  }

  connect(token) {
    console.log('🔌 Using polling mode (Vercel compatible)');
    this.token = token;
  }

  disconnect() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
  }

  // Start polling for a conversation
  joinConversation(conversationId) {
    console.log('📥 Polling conversation:', conversationId);
    this.currentConversationId = conversationId;
    this.lastMessageTimestamp = new Date().toISOString();
    
    // Stop previous polling
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }

    // Start polling every 2 seconds
    this.pollingInterval = setInterval(() => {
      this.checkNewMessages();
    }, 2000);
  }

  leaveConversation() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
    this.currentConversationId = null;
  }

  async checkNewMessages() {
    if (!this.currentConversationId) return;

    try {
      // Use axios api instance instead of fetch - this fixes the /api/api issue
      const response = await api.get(
        `/messages/conversation/${this.currentConversationId}`,
        {
          params: {
            since: this.lastMessageTimestamp
          }
        }
      );

      if (response.data && response.data.data && response.data.data.length > 0) {
        // New messages found
        response.data.data.forEach(message => {
          this.callbacks.newMessage.forEach(callback => {
            callback({
              conversationId: this.currentConversationId,
              message
            });
          });
        });

        // Update timestamp
        const lastMessage = response.data.data[response.data.data.length - 1];
        this.lastMessageTimestamp = lastMessage.createdAt;
      }
    } catch (error) {
      // Only log non-404 errors (404 means no new messages)
      if (error.response?.status !== 404) {
        console.error('Polling error:', error);
      }
    }
  }

  // Typing indicator (simulated - won't be real-time)
  sendTyping(conversationId, isTyping) {
    // In polling mode, typing indicators are limited
    // You can implement this with API calls if needed
  }

  // Event listeners
  onNewMessage(callback) {
    this.callbacks.newMessage.push(callback);
  }

  onUserTyping(callback) {
    this.callbacks.userTyping.push(callback);
  }

  onUserStatus(callback) {
    this.callbacks.userStatus.push(callback);
  }

  onMessageRead(callback) {
    // Not implemented in polling mode
  }

  onMessageDeleted(callback) {
    // Not implemented in polling mode
  }

  removeAllListeners() {
    this.callbacks = {
      newMessage: [],
      userTyping: [],
      userStatus: []
    };
  }

  removeListener(event) {
    if (this.callbacks[event]) {
      this.callbacks[event] = [];
    }
  }

  isConnected() {
    return this.pollingInterval !== null;
  }

  // Compatibility methods
  markAsRead() {}
  updateStatus() {}
}

// Create singleton
const socketService = new PollingService();

export default socketService;