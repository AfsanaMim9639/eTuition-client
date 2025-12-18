import { useState, useEffect, useRef } from 'react';
import { FaUser } from 'react-icons/fa';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import { messageAPI } from '../../utils/messageService';
import socketService from '../../utils/socketService';
import toast from 'react-hot-toast';

const ChatBox = ({ conversation, currentUser, onConversationUpdate }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [typingUsers, setTypingUsers] = useState(new Set());
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // Get other participant
  const otherUser = conversation.participants.find(p => p._id !== currentUser?._id);

  useEffect(() => {
    loadMessages();
    
    // Join conversation room
    socketService.joinConversation(conversation._id);

    // Listen for new messages
    const handleNewMessage = (data) => {
      if (data.conversationId === conversation._id) {
        // Only add if not already in messages (prevent duplicates)
        setMessages(prev => {
          const exists = prev.some(m => m._id === data.message._id);
          if (exists) return prev;
          return [...prev, data.message];
        });
        scrollToBottom();
      }
    };

    // Listen for typing
    const handleTyping = (data) => {
      if (data.conversationId === conversation._id && data.userId !== currentUser._id) {
        setTypingUsers(prev => {
          const newSet = new Set(prev);
          if (data.isTyping) {
            newSet.add(data.userId);
          } else {
            newSet.delete(data.userId);
          }
          return newSet;
        });
      }
    };

    // Listen for message deleted
    const handleMessageDeleted = (data) => {
      if (data.conversationId === conversation._id) {
        setMessages(prev => prev.filter(m => m._id !== data.messageId));
      }
    };

    socketService.onNewMessage(handleNewMessage);
    socketService.onUserTyping(handleTyping);
    socketService.onMessageDeleted(handleMessageDeleted);

    return () => {
      socketService.leaveConversation(conversation._id);
      socketService.removeListener('new-message', handleNewMessage);
      socketService.removeListener('user-typing', handleTyping);
      socketService.removeListener('message-deleted', handleMessageDeleted);
    };
  }, [conversation._id, currentUser._id]);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const response = await messageAPI.getMessages(conversation._id);
      setMessages(response.data || []);
      setTimeout(scrollToBottom, 100);
    } catch (error) {
      console.error('Error loading messages:', error);
      if (error.response?.status !== 404) {
        toast.error('Failed to load messages', { duration: 3000 });
      }
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (content) => {
    if (!content.trim() || sending) return;

    // Create optimistic message
    const tempId = `temp-${Date.now()}`;
    const optimisticMessage = {
      _id: tempId,
      content: content.trim(),
      sender: {
        _id: currentUser._id,
        name: currentUser.name
      },
      createdAt: new Date().toISOString(),
      isOptimistic: true
    };

    try {
      setSending(true);
      
      // Add message to UI immediately
      setMessages(prev => [...prev, optimisticMessage]);
      scrollToBottom();
      
      // Send to backend
      const response = await messageAPI.send(conversation._id, content.trim());
      
      // Replace optimistic message with real one
      setMessages(prev => 
        prev.map(m => m._id === tempId ? response.data : m)
      );
      
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Remove optimistic message on error
      setMessages(prev => prev.filter(m => m._id !== tempId));
      
      toast.error(error.response?.data?.message || 'Failed to send message', { 
        duration: 3000 
      });
    } finally {
      setSending(false);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    // Optimistically remove from UI
    const messageToDelete = messages.find(m => m._id === messageId);
    setMessages(prev => prev.filter(m => m._id !== messageId));
    
    try {
      await messageAPI.delete(messageId);
    } catch (error) {
      console.error('Error deleting message:', error);
      
      // Restore message on error
      if (messageToDelete) {
        setMessages(prev => [...prev, messageToDelete].sort((a, b) => 
          new Date(a.createdAt) - new Date(b.createdAt)
        ));
      }
      
      toast.error('Failed to delete message', { duration: 3000 });
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00ffcc]"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="p-4 border-b border-[#00ffcc]/30 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#00ffcc] to-[#00ff88] flex items-center justify-center text-[#0a0f0d] font-bold">
          {otherUser?.name?.charAt(0)?.toUpperCase() || 'U'}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-[#00ffcc]">
            {otherUser?.name || 'Unknown User'}
          </h3>
          <p className="text-xs text-gray-400">
            {otherUser?.role === 'tutor' ? '👨‍🏫 Tutor' : '👨‍🎓 Student'}
          </p>
        </div>
        {conversation.tuition && (
          <div className="text-right">
            <p className="text-xs text-gray-400">Related to:</p>
            <p className="text-sm text-[#00ff88] font-medium">
              {conversation.tuition.title}
            </p>
          </div>
        )}
      </div>

      {/* Messages Area */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <FaUser className="text-4xl mb-2 opacity-30" />
            <p>No messages yet</p>
            <p className="text-sm">Start the conversation!</p>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble
                key={message._id}
                message={message}
                isOwn={message.sender._id === currentUser?._id}
                onDelete={handleDeleteMessage}
                isOptimistic={message.isOptimistic}
              />
            ))}
            
            {/* Typing Indicator */}
            {typingUsers.size > 0 && (
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-[#00ffcc] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-[#00ffcc] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-[#00ffcc] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <span>{otherUser?.name} is typing...</span>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Message Input */}
      <div className="border-t border-[#00ffcc]/30">
        <MessageInput
          onSendMessage={handleSendMessage}
          disabled={sending}
          conversationId={conversation._id}
        />
      </div>
    </div>
  );
};

export default ChatBox;