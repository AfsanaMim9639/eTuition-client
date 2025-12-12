import { useState, useRef } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import socketService from '../../utils/socketService';

const MessageInput = ({ onSendMessage, disabled, conversationId }) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);
  const inputRef = useRef(null);

  const handleTyping = (value) => {
    setMessage(value);

    // Send typing indicator
    if (value && !isTyping) {
      setIsTyping(true);
      socketService.sendTyping(conversationId, true);
    }

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout to stop typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      socketService.sendTyping(conversationId, false);
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!message.trim() || disabled) return;

    // Clear typing indicator
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    setIsTyping(false);
    socketService.sendTyping(conversationId, false);

    // Send message
    onSendMessage(message.trim());
    setMessage('');
    
    // Focus back to input
    inputRef.current?.focus();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="flex items-end gap-3">
        {/* Text Input */}
        <div className="flex-1">
          <textarea
            ref={inputRef}
            value={message}
            onChange={(e) => handleTyping(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={disabled}
            rows={1}
            className="
              w-full px-4 py-3 
              bg-[#1a1f1c] border-2 border-[#00ffcc]/30 rounded-xl 
              text-gray-200 placeholder-gray-500
              focus:outline-none focus:border-[#00ffcc]
              resize-none
              disabled:opacity-50 disabled:cursor-not-allowed
            "
            style={{
              minHeight: '48px',
              maxHeight: '120px'
            }}
            onInput={(e) => {
              e.target.style.height = '48px';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
          />
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className="
            px-6 py-3 
            bg-gradient-to-r from-[#00ffcc] to-[#00ff88] 
            rounded-xl text-[#0a0f0d] font-medium
            hover:shadow-lg hover:shadow-[#00ffcc]/50
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all flex items-center gap-2
          "
        >
          <FaPaperPlane />
          <span className="hidden sm:inline">Send</span>
        </button>
      </div>

      {/* Character count */}
      <div className="mt-2 text-right">
        <span className={`text-xs ${message.length > 4500 ? 'text-red-400' : 'text-gray-500'}`}>
          {message.length} / 5000
        </span>
      </div>
    </form>
  );
};

export default MessageInput;