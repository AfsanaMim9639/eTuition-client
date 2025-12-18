import { useState, useEffect } from 'react';
import { FaComments, FaInbox, FaPlus, FaTimes } from 'react-icons/fa';
import { useAuth } from '../../../contexts/AuthContext';
import { useLocation } from 'react-router-dom';
import ConversationList from '../../../components/messaging/ConversationList';
import ChatBox from '../../../components/messaging/ChatBox';
import { conversationAPI } from '../../../utils/messageService';
import socketService from '../../../utils/socketService';
import toast from 'react-hot-toast';
import api from '../../../utils/api';

const Messages = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [error, setError] = useState(null);
  
  // New Chat Modal
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [creatingChatId, setCreatingChatId] = useState(null);

  useEffect(() => {
    if (user) {
      loadConversations();
      
      const token = localStorage.getItem('token');
      if (token) {
        socketService.connect(token);
      }

      // Define handler function
      const handleNewMessage = (data) => {
        console.log('📨 New message received:', data);
        
        const sender = data.sender || data.message?.sender;
        
        // Update conversations list
        setConversations(prevConvs => {
          const updated = prevConvs.map(conv => {
            if (conv._id === data.conversationId) {
              return {
                ...conv,
                lastMessage: data.message,
                myUnreadCount: sender?._id !== user._id ? (conv.myUnreadCount || 0) + 1 : conv.myUnreadCount
              };
            }
            return conv;
          });
          return updated;
        });
        
        // Update unread count
        if (sender?._id !== user._id && data.conversationId !== selectedConversation?._id) {
          setUnreadCount(prev => prev + 1);
          toast.success(`New message from ${sender?.name || 'Someone'}`, {
            duration: 3000,
            icon: '💬'
          });
        }
      };

      socketService.onNewMessage(handleNewMessage);

      return () => {
        socketService.removeListener('new-message', handleNewMessage);
      };
    }
  }, [user, selectedConversation]);

  useEffect(() => {
    const state = location.state;
    if (state?.selectedConversation && conversations.length > 0) {
      const conv = conversations.find(c => c._id === state.selectedConversation._id);
      if (conv) {
        setSelectedConversation(conv);
      }
    }
  }, [conversations, location.state]);

  const loadConversations = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Loading conversations...');
      const response = await conversationAPI.getMyConversations();
      console.log('✅ Conversations response:', response);
      
      if (response && response.data) {
        console.log('📊 Conversations count:', response.data.length);
        setConversations(response.data);
        const total = response.data.reduce((sum, conv) => sum + (conv.myUnreadCount || 0), 0);
        setUnreadCount(total);
      } else {
        console.warn('⚠️ No data in response');
        setConversations([]);
      }
      
    } catch (error) {
      console.error('❌ Error loading conversations:', error);
      console.error('Error details:', {
        status: error.response?.status,
        message: error.response?.data?.message,
        data: error.response?.data
      });
      
      setConversations([]);
      
      if (error.response?.status === 401) {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Please login to access messages', { duration: 3000 });
          setTimeout(() => {
            window.location.href = '/login';
          }, 1500);
        } else {
          toast.error('Session expired. Please login again.', { duration: 3000 });
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setTimeout(() => {
            window.location.href = '/login';
          }, 1500);
        }
      } else if (error.response?.status === 404) {
        console.log('ℹ️ No conversations found (404)');
        setConversations([]);
      } else {
        const errorMsg = error.response?.data?.message || 'Failed to load conversations';
        setError(errorMsg);
        toast.error(errorMsg, { duration: 4000 });
      }
    } finally {
      setLoading(false);
    }
  };

  const loadStudents = async () => {
    try {
      setLoadingStudents(true);
      const response = await api.get('/users/students', {
        params: { limit: 50 }
      });
      
      if (response.data && response.data.data) {
        setStudents(response.data.data);
      }
    } catch (error) {
      console.error('Error loading students:', error);
      toast.error(error.response?.data?.message || 'Failed to load students', { duration: 4000 });
    } finally {
      setLoadingStudents(false);
    }
  };

  const handleCreateChat = async (studentId, studentName) => {
    try {
      setCreatingChatId(studentId);
      
      const response = await conversationAPI.createOrGet(studentId, null, 'student-tutor');
      
      if (response.success) {
        setShowNewChatModal(false);
        
        // Check if conversation already exists in list
        const existingConv = conversations.find(c => c._id === response.data._id);
        
        if (existingConv) {
          // Just select it, no need to reload
          setSelectedConversation(existingConv);
        } else {
          // Add to list and select
          setConversations(prev => [response.data, ...prev]);
          setSelectedConversation(response.data);
        }
        
        toast.success(`Chat with ${studentName} ready!`, {
          duration: 2000,
          icon: '✅'
        });
      } else {
        toast.error('Could not start chat. Please try again.', { duration: 3000 });
      }
      
    } catch (error) {
      console.error('Error creating chat:', error);
      toast.error(error.response?.data?.message || 'Failed to start chat', { duration: 4000 });
    } finally {
      setCreatingChatId(null);
    }
  };

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    
    if (conversation.myUnreadCount > 0) {
      // Optimistically update UI
      setUnreadCount(prev => Math.max(0, prev - conversation.myUnreadCount));
      setConversations(prevConvs => 
        prevConvs.map(conv => 
          conv._id === conversation._id 
            ? { ...conv, myUnreadCount: 0 }
            : conv
        )
      );
      
      // Then update backend
      conversationAPI.markAsRead(conversation._id)
        .catch((error) => {
          console.error('Error marking as read:', error);
          // Revert on error
          loadConversations();
        });
    }
  };

  const handleDeleteConversation = async (conversationId) => {
    // Optimistically update UI
    const deletedConv = conversations.find(c => c._id === conversationId);
    setConversations(prev => prev.filter(c => c._id !== conversationId));
    if (selectedConversation?._id === conversationId) {
      setSelectedConversation(null);
    }
    if (deletedConv?.myUnreadCount) {
      setUnreadCount(prev => Math.max(0, prev - deletedConv.myUnreadCount));
    }
    
    try {
      await conversationAPI.delete(conversationId);
    } catch (error) {
      console.error('Error deleting conversation:', error);
      toast.error(error.response?.data?.message || 'Failed to delete conversation', { 
        duration: 4000 
      });
      // Reload on error
      loadConversations();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00ffcc] mx-auto mb-4"></div>
          <p className="text-gray-400">Loading messages...</p>
        </div>
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
        
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <div className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg">
              <FaInbox className="text-red-400" />
              <span className="text-red-400 font-medium">
                {unreadCount} unread
              </span>
            </div>
          )}
          
          <button
            onClick={() => {
              setShowNewChatModal(true);
              loadStudents();
            }}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00ffcc] to-[#00ff88] rounded-lg text-[#0a0f0d] font-medium hover:shadow-lg hover:shadow-[#00ffcc]/50 transition-all"
          >
            <FaPlus />
            <span>New Chat</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
          {error}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-250px)]">
        <div className="lg:col-span-1 bg-[#0f1512] border-2 border-[#00ffcc]/30 rounded-xl overflow-hidden">
          <ConversationList
            conversations={conversations}
            selectedConversation={selectedConversation}
            onSelectConversation={handleSelectConversation}
            onDeleteConversation={handleDeleteConversation}
            currentUserId={user?._id}
          />
        </div>

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
              {conversations.length === 0 && (
                <div className="mt-4">
                  <p className="text-sm mb-3">No conversations yet</p>
                  <button
                    onClick={() => {
                      setShowNewChatModal(true);
                      loadStudents();
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-[#00ffcc] to-[#00ff88] rounded-xl text-[#0a0f0d] font-medium hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    <FaPlus />
                    Start Your First Chat
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {showNewChatModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f1512] border-2 border-[#00ffcc]/30 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-[#00ffcc]/30 flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#00ffcc]">Start New Chat</h3>
              <button
                onClick={() => setShowNewChatModal(false)}
                className="p-2 hover:bg-[#00ffcc]/10 rounded-lg text-gray-400 hover:text-[#00ffcc] transition-all"
              >
                <FaTimes />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
              {loadingStudents ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00ffcc] mx-auto mb-2"></div>
                  <p className="text-gray-400">Loading students...</p>
                </div>
              ) : students.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400">No students available</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {students.map((student) => (
                    <div
                      key={student._id}
                      className="flex items-center justify-between p-4 bg-[#1a1f1c] border border-[#00ffcc]/20 rounded-lg hover:border-[#00ffcc] transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#00ffcc] to-[#00ff88] flex items-center justify-center text-[#0a0f0d] font-bold">
                          {student.name?.charAt(0)?.toUpperCase() || 'S'}
                        </div>
                        <div>
                          <h4 className="font-medium text-[#00ffcc]">{student.name}</h4>
                          <p className="text-sm text-gray-400">{student.email}</p>
                          {student.grade && (
                            <p className="text-xs text-gray-500 mt-1">
                              {student.grade}
                            </p>
                          )}
                          {student.institution && (
                            <p className="text-xs text-gray-500">
                              {student.institution}
                            </p>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => handleCreateChat(student._id, student.name)}
                        disabled={creatingChatId === student._id}
                        className="px-4 py-2 bg-gradient-to-r from-[#00ffcc] to-[#00ff88] rounded-lg text-[#0a0f0d] font-medium hover:shadow-lg transition-all disabled:opacity-50"
                      >
                        {creatingChatId === student._id ? 'Starting...' : 'Chat'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;