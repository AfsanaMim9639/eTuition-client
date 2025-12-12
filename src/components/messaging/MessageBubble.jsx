import { FaTrash } from 'react-icons/fa';
import { formatTime } from '../../utils/dateUtils';

const MessageBubble = ({ message, isOwn, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm('Delete this message?')) {
      onDelete(message._id);
    }
  };

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} group`}>
      <div className={`max-w-[70%] ${isOwn ? 'order-2' : 'order-1'}`}>
        {/* Sender Name (for received messages) */}
        {!isOwn && (
          <div className="mb-1 px-3">
            <span className="text-xs text-gray-400">
              {message.sender?.name || 'Unknown'}
            </span>
          </div>
        )}

        {/* Message Bubble */}
        <div className="relative">
          <div
            className={`
              px-4 py-3 rounded-2xl
              ${isOwn
                ? 'bg-gradient-to-r from-[#00ffcc] to-[#00ff88] text-[#0a0f0d]'
                : 'bg-[#1a1f1c] border border-[#00ffcc]/20 text-gray-200'
              }
            `}
          >
            <p className="text-sm leading-relaxed break-words">
              {message.content}
            </p>
          </div>

          {/* Delete Button (only for own messages) */}
          {isOwn && (
            <button
              onClick={handleDelete}
              className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-500/20 rounded-lg text-red-400"
              title="Delete message"
            >
              <FaTrash className="text-xs" />
            </button>
          )}
        </div>

        {/* Timestamp */}
        <div className={`mt-1 px-3 flex items-center gap-2 ${isOwn ? 'justify-end' : 'justify-start'}`}>
          <span className="text-xs text-gray-500">
            {formatTime(message.createdAt)}
          </span>
          {isOwn && message.delivered && (
            <span className="text-xs text-[#00ffcc]">✓✓</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;