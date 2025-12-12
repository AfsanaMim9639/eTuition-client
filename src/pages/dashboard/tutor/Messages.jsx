
import { useState, useEffect } from 'react';
import { FaComments, FaInbox } from 'react-icons/fa';
import { useAuth } from '../../../contexts/AuthContext';
import ConversationList from '../../../components/messaging/ConversationList';
import ChatBox from '../../../components/messaging/ChatBox';
import { conversationAPI } from '../../../utils/messageService';
import socketService from '../../../utils/socketService';
import toast from 'react-hot-toast';

const Messages = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    loadConversations();
    
    // Connect to socket
    const token = localStorage.getItem('token');
    if (token) {
      socketService.connect(token);
    }

    // Listen for new messages
    socketService.onNewMessage((data) => {
      console.log('📨 New message received:', data);
      loadConversations();
    });

    return () => {
      socketService.removeListener('new-message');
    };
  }, []);

  const loadConversations = async () => {
    try {
      const response = await conversationAPI.getMyConversations();
      setConversations(response.data);
      
      // Calculate total unread count
      const total = response.data.reduce((sum, conv) => sum + (conv.myUnreadCount || 0), 0);
      setUnreadCount(total);
      
      setLoading(false);
    } catch (error) {
      console.error('Error loading conversations:', error);
      toast.error('Failed to load conversations');
      setLoading(false);
    }
  };

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    
    // Mark as read
    if (conversation.myUnreadCount > 0) {
      conversationAPI.markAsRead(conversation._id)
        .then(() => {
          loadConversations();
        })
        .catch((error) => {
          console.error('Error marking as read:', error);
        });
    }
  };

  const handleDeleteConversation = async (conversationId) => {
    try {
      await conversationAPI.delete(conversationId);
      toast.success('Conversation deleted');
      loadConversations();
      if (selectedConversation?._id === conversationId) {
        setSelectedConversation(null);
      }
    } catch (error) {
      console.error('Error deleting conversation:', error);
      toast.error('Failed to delete conversation');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00ffcc]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00ff88] to-[#00ffcc] bg-clip-text text-transparent">
            Messages
          </h1>
          <p className="text-gray-400 mt-1">
            Chat with your students
          </p>
        </div>
        {unreadCount > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg">
            <FaInbox className="text-red-400" />
            <span className="text-red-400 font-medium">
              {unreadCount} unread
            </span>
          </div>
        )}
      </div>

      {/* Messages Layout */}
      <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-250px)]">
        {/* Conversation List */}
        <div className="lg:col-span-1 bg-[#0f1512] border-2 border-[#00ffcc]/30 rounded-xl overflow-hidden">
          <ConversationList
            conversations={conversations}
            selectedConversation={selectedConversation}
            onSelectConversation={handleSelectConversation}
            onDeleteConversation={handleDeleteConversation}
            currentUserId={user?._id}
          />
        </div>

        {/* Chat Box */}
        <div className="lg:col-span-2 bg-[#0f1512] border-2 border-[#00ffcc]/30 rounded-xl overflow-hidden">
          {selectedConversation ? (
            <ChatBox
              conversation={selectedConversation}
              currentUser={user}
              onConversationUpdate={loadConversations}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <FaComments className="text-6xl mb-4 opacity-30" />
              <p className="text-lg">Select a conversation to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;