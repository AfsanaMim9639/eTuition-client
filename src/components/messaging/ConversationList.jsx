import { FaTrash, FaCircle } from 'react-icons/fa';
import { formatDistanceToNow } from '../../utils/dateUtils';
import toast from 'react-hot-toast';

const ConversationList = ({ 
  conversations, 
  selectedConversation, 
  onSelectConversation,
  onDeleteConversation,
  currentUserId 
}) => {
  // Get other participant in conversation
  const getOtherParticipant = (conversation) => {
    return conversation.participants.find(p => p._id !== currentUserId);
  };

  // Format time
  const formatTime = (date) => {
    if (!date) return '';
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: true });
    } catch (error) {
      return '';
    }
  };

  const handleDelete = (e, conversationId, userName) => {
    e.stopPropagation();
    
    // Custom toast with confirmation buttons
    toast((t) => (
      <div className="flex flex-col gap-3">
        <div>
          <p className="font-semibold text-gray-900">Delete Conversation?</p>
          <p className="text-sm text-gray-600 mt-1">
            Are you sure you want to delete this conversation with {userName}?
          </p>
        </div>
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => {
              toast.dismiss(t.id);
            }}
            className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 font-medium transition-colors text-sm"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onDeleteConversation(conversationId);
              toast.dismiss(t.id);
            }}
            className="px-3 py-1.5 bg-red-500 hover:bg-red-600 rounded-lg text-white font-medium transition-colors text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    ), {
      duration: 5000,
      position: 'top-center',
      style: {
        background: '#fff',
        padding: '16px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      }
    });
  };

  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center text-gray-400">
        <p>No conversations yet</p>
        <p className="text-sm mt-2">Start chatting with tutors!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-[#00ffcc]/30">
        <h3 className="font-semibold text-[#00ffcc]">Conversations</h3>
        <p className="text-sm text-gray-400">{conversations.length} total</p>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conversation) => {
          const otherUser = getOtherParticipant(conversation);
          const isSelected = selectedConversation?._id === conversation._id;
          const hasUnread = conversation.myUnreadCount > 0;

          return (
            <div
              key={conversation._id}
              onClick={() => onSelectConversation(conversation)}
              className={`
                p-4 border-b border-[#00ffcc]/10 cursor-pointer transition-all
                hover:bg-[#00ffcc]/5
                ${isSelected ? 'bg-[#00ffcc]/10 border-l-4 border-l-[#00ffcc]' : ''}
              `}
            >
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#00ffcc] to-[#00ff88] flex items-center justify-center text-[#0a0f0d] font-bold">
                    {otherUser?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  {hasUnread && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-[#0f1512]">
                      {conversation.myUnreadCount}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className={`font-medium truncate ${hasUnread ? 'text-[#00ffcc]' : 'text-gray-300'}`}>
                      {otherUser?.name || 'Unknown User'}
                    </h4>
                    <span className="text-xs text-gray-500 flex-shrink-0">
                      {formatTime(conversation.lastMessage?.timestamp || conversation.updatedAt)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <p className={`text-sm truncate flex-1 ${hasUnread ? 'text-gray-300 font-medium' : 'text-gray-400'}`}>
                      {conversation.lastMessage?.content || 'No messages yet'}
                    </p>
                    
                    {/* Delete Button */}
                    <button
                      onClick={(e) => handleDelete(e, conversation._id, otherUser?.name || 'Unknown User')}
                      className="p-1.5 hover:bg-red-500/20 rounded-lg text-red-400 hover:text-red-300 transition-colors flex-shrink-0"
                      title="Delete conversation"
                    >
                      <FaTrash className="text-xs" />
                    </button>
                  </div>

                  {/* Tuition Tag */}
                  {conversation.tuition && (
                    <div className="mt-2">
                      <span className="text-xs px-2 py-1 bg-[#00ff88]/10 border border-[#00ff88]/30 rounded text-[#00ff88]">
                        📚 {conversation.tuition.title}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ConversationList;