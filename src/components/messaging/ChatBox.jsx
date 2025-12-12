import { useState, useEffect, useRef } from 'react';
import { FaPaperPlane, FaUser } from 'react-icons/fa';
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
        setMessages(prev => [...prev, data.message]);
        scrollToBottom();
        onConversationUpdate?.();
      }
    };

    // Listen for typing
    const handleTyping = (data) => {
      if (data.conversationId === conversation._id) {
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
      socketService.removeListener('new-message');
      socketService.removeListener('user-typing');
      socketService.removeListener('message-deleted');
    };
  }, [conversation._id]);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const response = await messageAPI.getMessages(conversation._id);
      setMessages(response.data);
      setTimeout(scrollToBottom, 100);
    } catch (error) {
      console.error('Error loading messages:', error);
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (content) => {
    if (!content.trim()) return;

    try {
      setSending(true);
      const response = await messageAPI.send(conversation._id, content);
      setMessages(prev => [...prev, response.data]);
      scrollToBottom();
      onConversationUpdate?.();
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await messageAPI.delete(messageId);
      setMessages(prev => prev.filter(m => m._id !== messageId));
      toast.success('Message deleted');
    } catch (error) {
      console.error('Error deleting message:', error);
      toast.error('Failed to delete message');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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