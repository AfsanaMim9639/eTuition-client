import { useState, useEffect } from 'react';
import { FaComments, FaInbox, FaHeadset } from 'react-icons/fa';
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
  const [stats, setStats] = useState({
    total: 0,
    unread: 0,
    studentChats: 0,
    tutorChats: 0
  });

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
      
      // Calculate stats
      const total = response.data.length;
      const unread = response.data.reduce((sum, conv) => sum + (conv.myUnreadCount || 0), 0);
      const studentChats = response.data.filter(conv => 
        conv.participants.some(p => p.role === 'student')
      ).length;
      const tutorChats = response.data.filter(conv => 
        conv.participants.some(p => p.role === 'tutor')
      ).length;

      setStats({ total, unread, studentChats, tutorChats });
      setUnreadCount(unread);
      
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
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00ff88] to-[#00ffcc] bg-clip-text text-transparent flex items-center gap-3">
            <FaHeadset />
            Support Messages
          </h1>
          <p className="text-gray-400 mt-1">
            Manage user support conversations
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0f1512] border-2 border-[#00ffcc]/30 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Conversations</p>
              <p className="text-2xl font-bold text-[#00ffcc] mt-1">
                {stats.total}
              </p>
            </div>
            <FaComments className="text-3xl text-[#00ffcc]/30" />
          </div>
        </div>

        <div className="bg-[#0f1512] border-2 border-red-500/30 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Unread Messages</p>
              <p className="text-2xl font-bold text-red-400 mt-1">
                {stats.unread}
              </p>
            </div>
            <FaInbox className="text-3xl text-red-400/30" />
          </div>
        </div>

        <div className="bg-[#0f1512] border-2 border-blue-500/30 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Student Chats</p>
              <p className="text-2xl font-bold text-blue-400 mt-1">
                {stats.studentChats}
              </p>
            </div>
            <span className="text-3xl">👨‍🎓</span>
          </div>
        </div>

        <div className="bg-[#0f1512] border-2 border-purple-500/30 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Tutor Chats</p>
              <p className="text-2xl font-bold text-purple-400 mt-1">
                {stats.tutorChats}
              </p>
            </div>
            <span className="text-3xl">👨‍🏫</span>
          </div>
        </div>
      </div>

      {/* Messages Layout */}
      <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-400px)]">
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
              <FaHeadset className="text-6xl mb-4 opacity-30" />
              <p className="text-lg">Select a conversation to provide support</p>
              <p className="text-sm mt-2">Help users with their questions and issues</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;