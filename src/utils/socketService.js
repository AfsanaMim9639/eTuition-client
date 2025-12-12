import { io } from 'socket.io-client';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

class SocketService {
  constructor() {
    this.socket = null;
    this.connected = false;
  }

  connect(token) {
    if (this.socket?.connected) {
      console.log('🔌 Socket already connected');
      return;
    }

    console.log('🔌 Connecting to socket...', API_URL);

    this.socket = io(API_URL, {
      auth: { token },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5
    });

    this.socket.on('connect', () => {
      console.log('✅ Socket connected:', this.socket.id);
      this.connected = true;
    });

    this.socket.on('disconnect', (reason) => {
      console.log('❌ Socket disconnected:', reason);
      this.connected = false;
    });

    this.socket.on('connect_error', (error) => {
      console.error('🔴 Socket connection error:', error);
    });

    this.socket.on('error', (error) => {
      console.error('🔴 Socket error:', error);
    });
  }

  disconnect() {
    if (this.socket) {
      console.log('🔌 Disconnecting socket...');
      this.socket.disconnect();
      this.socket = null;
      this.connected = false;
    }
  }

  // Join conversation room
  joinConversation(conversationId) {
    if (this.socket?.connected) {
      console.log('📥 Joining conversation:', conversationId);
      this.socket.emit('join-conversation', conversationId);
    }
  }

  // Leave conversation room
  leaveConversation(conversationId) {
    if (this.socket?.connected) {
      console.log('📤 Leaving conversation:', conversationId);
      this.socket.emit('leave-conversation', conversationId);
    }
  }

  // Send typing indicator
  sendTyping(conversationId, isTyping) {
    if (this.socket?.connected) {
      this.socket.emit('typing', { conversationId, isTyping });
    }
  }

  // Mark message as read
  markAsRead(conversationId, messageId) {
    if (this.socket?.connected) {
      this.socket.emit('mark-read', { conversationId, messageId });
    }
  }

  // Update online status
  updateStatus(status) {
    if (this.socket?.connected) {
      this.socket.emit('update-status', status);
    }
  }

  // Listen for new messages
  onNewMessage(callback) {
    if (this.socket) {
      this.socket.on('new-message', callback);
    }
  }

  // Listen for typing indicator
  onUserTyping(callback) {
    if (this.socket) {
      this.socket.on('user-typing', callback);
    }
  }

  // Listen for message read
  onMessageRead(callback) {
    if (this.socket) {
      this.socket.on('message-read', callback);
    }
  }

  // Listen for user status
  onUserStatus(callback) {
    if (this.socket) {
      this.socket.on('user-status', callback);
    }
  }

  // Listen for message deleted
  onMessageDeleted(callback) {
    if (this.socket) {
      this.socket.on('message-deleted', callback);
    }
  }

  // Remove all listeners
  removeAllListeners() {
    if (this.socket) {
      this.socket.removeAllListeners();
    }
  }

  // Remove specific listener
  removeListener(event) {
    if (this.socket) {
      this.socket.off(event);
    }
  }

  isConnected() {
    return this.connected && this.socket?.connected;
  }
}

// Create singleton instance
const socketService = new SocketService();

export default socketService;