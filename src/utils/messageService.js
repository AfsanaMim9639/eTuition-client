import api from './api';

// Conversation APIs
export const conversationAPI = {
  // Create or get conversation
  createOrGet: async (participantId, tuitionId = null, type = 'student-tutor') => {
    try {
      console.log('📝 Creating/getting conversation:', { participantId, tuitionId, type });
      const response = await api.post('/conversations', {
        participantId,
        tuitionId,
        type
      });
      return response.data;
    } catch (error) {
      console.error('❌ Create conversation error:', error);
      throw error;
    }
  },

  // Get all my conversations
  getMyConversations: async () => {
    try {
      console.log('📥 Fetching my conversations');
      const response = await api.get('/conversations/my');
      return response.data;
    } catch (error) {
      console.error('❌ Get conversations error:', error);
      throw error;
    }
  },

  // Get conversation by ID
  getById: async (conversationId) => {
    try {
      console.log('📥 Fetching conversation:', conversationId);
      const response = await api.get(`/conversations/${conversationId}`);
      return response.data;
    } catch (error) {
      console.error('❌ Get conversation error:', error);
      throw error;
    }
  },

  // Mark conversation as read
  markAsRead: async (conversationId) => {
    try {
      console.log('✅ Marking conversation as read:', conversationId);
      const response = await api.patch(`/conversations/${conversationId}/read`);
      return response.data;
    } catch (error) {
      console.error('❌ Mark as read error:', error);
      throw error;
    }
  },

  // Archive conversation
  archive: async (conversationId) => {
    try {
      console.log('📦 Archiving conversation:', conversationId);
      const response = await api.patch(`/conversations/${conversationId}/archive`);
      return response.data;
    } catch (error) {
      console.error('❌ Archive error:', error);
      throw error;
    }
  },

  // Delete conversation
  delete: async (conversationId) => {
    try {
      console.log('🗑️ Deleting conversation:', conversationId);
      const response = await api.delete(`/conversations/${conversationId}`);
      return response.data;
    } catch (error) {
      console.error('❌ Delete conversation error:', error);
      throw error;
    }
  }
};

// Message APIs
export const messageAPI = {
  // Send message
  send: async (conversationId, content) => {
    try {
      console.log('📤 Sending message:', { conversationId, content });
      const response = await api.post('/messages', {
        conversationId,
        content
      });
      return response.data;
    } catch (error) {
      console.error('❌ Send message error:', error);
      throw error;
    }
  },

  // Get messages for a conversation
  getMessages: async (conversationId, page = 1, limit = 50) => {
    try {
      console.log('📥 Fetching messages:', { conversationId, page, limit });
      const response = await api.get(`/messages/conversation/${conversationId}`, {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      console.error('❌ Get messages error:', error);
      throw error;
    }
  },

  // Delete message
  delete: async (messageId) => {
    try {
      console.log('🗑️ Deleting message:', messageId);
      const response = await api.delete(`/messages/${messageId}`);
      return response.data;
    } catch (error) {
      console.error('❌ Delete message error:', error);
      throw error;
    }
  },

  // Mark as delivered
  markAsDelivered: async (messageId) => {
    try {
      const response = await api.patch(`/messages/${messageId}/delivered`);
      return response.data;
    } catch (error) {
      console.error('❌ Mark as delivered error:', error);
      throw error;
    }
  }
};

export default { conversationAPI, messageAPI };