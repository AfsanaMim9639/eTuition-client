import { motion } from 'framer-motion';
import { 
  Clock, 
  Video, 
  MapPin, 
  User,
  Calendar,
  Edit,
  Trash2,
  X,
  ExternalLink,
  Play,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const ClassCard = ({ 
  classData, 
  userRole, 
  onEdit, 
  onDelete, 
  onCancel, 
  onStart,
  onComplete,
  compact = false 
}) => {
  
  const getStatusConfig = (status) => {
    const configs = {
      scheduled: {
        gradient: 'from-[#00F0FF] to-[#39FF14]',
        icon: Calendar,
        text: 'Scheduled'
      },
      'in-progress': {
        gradient: 'from-[#FF10F0] to-[#00F0FF]',
        icon: Play,
        text: 'In Progress'
      },
      completed: {
        gradient: 'from-[#39FF14] to-[#00ff88]',
        icon: CheckCircle,
        text: 'Completed'
      },
      cancelled: {
        gradient: 'from-gray-500 to-gray-600',
        icon: X,
        text: 'Cancelled'
      },
      rescheduled: {
        gradient: 'from-[#00F0FF] to-[#FF10F0]',
        icon: Calendar,
        text: 'Rescheduled'
      }
    };
    return configs[status] || configs.scheduled;
  };

  const statusConfig = getStatusConfig(classData.status);
  const StatusIcon = statusConfig.icon;
  const participant = userRole === 'tutor' ? classData.student : classData.tutor;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Compact version for lists
  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02, x: 5 }}
        className="bg-[#121212] rounded-xl p-3 sm:p-4 border border-[#FF10F0]/20
                   hover:border-[#FF10F0] transition-all duration-300 cursor-pointer
                   hover:shadow-[0_0_20px_rgba(255,16,240,0.2)]"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          {/* Left: Time & Title */}
          <div className="flex items-center gap-3 sm:gap-4 flex-1 w-full">
            <div className="text-center min-w-[50px] sm:min-w-[60px]">
              <div className="text-[#00F0FF] text-xs font-semibold">
                {formatTime(classData.startTime)}
              </div>
              <div className="text-white/40 text-[10px] sm:text-xs">
                {classData.duration}m
              </div>
            </div>

            <div className="border-l-2 border-[#FF10F0]/30 pl-3 sm:pl-4 flex-1 min-w-0">
              <h4 className="text-white text-sm sm:text-base font-semibold truncate">{classData.title}</h4>
              <p className="text-xs sm:text-sm text-white/60 truncate">{participant?.name}</p>
            </div>
          </div>

          {/* Right: Status */}
          <div className={`
            px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold whitespace-nowrap
            bg-gradient-to-r ${statusConfig.gradient}
            text-black flex items-center gap-1
          `}>
            <StatusIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            <span className="hidden sm:inline">{statusConfig.text}</span>
          </div>
        </div>
      </motion.div>
    );
  }

  // Full version
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="bg-[#121212] rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-[#FF10F0]/20
                 hover:border-[#FF10F0] transition-all duration-300
                 hover:shadow-[0_0_40px_rgba(255,16,240,0.2)]"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="flex-1 w-full">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            {classData.title}
          </h3>
          <p className="text-[#00F0FF] text-sm sm:text-base font-semibold mb-1">
            {classData.subject}
          </p>
          {classData.description && (
            <p className="text-xs sm:text-sm text-white/60 mt-2 line-clamp-2">
              {classData.description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className={`
            flex-1 sm:flex-none px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold
            bg-gradient-to-r ${statusConfig.gradient}
            text-black flex items-center justify-center gap-2
          `}>
            <StatusIcon className="w-3 h-3 sm:w-4 sm:h-4" />
            {statusConfig.text}
          </div>
        </div>
      </div>

      {/* Participant Card */}
      <div className="bg-[#0a0a0a] rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 border border-white/10">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative flex-shrink-0">
            <img
              src={participant?.profileImage || 'https://i.ibb.co/qpB9ZNp/default-avatar.png'}
              alt={participant?.name}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-[#00F0FF] object-cover"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-[#39FF14] 
                          rounded-full border-2 border-[#121212]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold text-base sm:text-lg truncate">{participant?.name}</p>
            <p className="text-xs sm:text-sm text-white/60 truncate">{participant?.email}</p>
            <p className="text-xs text-[#00F0FF] font-semibold mt-1">
              {userRole === 'tutor' ? 'Student' : 'Tutor'}
            </p>
          </div>
          <User className="w-4 h-4 sm:w-5 sm:h-5 text-[#00F0FF] flex-shrink-0" />
        </div>
      </div>

      {/* Date & Time Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="bg-[#0a0a0a] rounded-xl p-3 sm:p-4 border border-[#FF10F0]/20">
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-3 bg-[#FF10F0]/10 rounded-lg">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF10F0]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] sm:text-xs text-white/60 mb-1">Date</p>
              <p className="text-white text-sm sm:text-base font-semibold truncate">
                {formatDate(classData.startTime)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#0a0a0a] rounded-xl p-3 sm:p-4 border border-[#00F0FF]/20">
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-3 bg-[#00F0FF]/10 rounded-lg">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#00F0FF]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] sm:text-xs text-white/60 mb-1">Time</p>
              <p className="text-white text-sm sm:text-base font-semibold truncate">
                {formatTime(classData.startTime)} - {formatTime(classData.endTime)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Class Type & Location */}
      <div className="bg-[#0a0a0a] rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 border border-[#39FF14]/20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {classData.classType === 'online' ? (
              <>
                <div className="p-2 sm:p-3 bg-[#39FF14]/10 rounded-lg flex-shrink-0">
                  <Video className="w-4 h-4 sm:w-5 sm:h-5 text-[#39FF14]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] sm:text-xs text-white/60 mb-1">Class Type</p>
                  <p className="text-white text-sm sm:text-base font-semibold">Online Class</p>
                </div>
              </>
            ) : (
              <>
                <div className="p-2 sm:p-3 bg-[#39FF14]/10 rounded-lg flex-shrink-0">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#39FF14]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] sm:text-xs text-white/60 mb-1">Location</p>
                  <p className="text-white text-sm sm:text-base font-semibold truncate">{classData.location}</p>
                </div>
              </>
            )}
          </div>
          <div className="text-left sm:text-right w-full sm:w-auto">
            <p className="text-[10px] sm:text-xs text-white/60 mb-1">Duration</p>
            <p className="text-[#00F0FF] font-bold text-base sm:text-lg">
              {classData.duration} min
            </p>
          </div>
        </div>
      </div>

      {/* Cancellation Info */}
      {classData.status === 'cancelled' && classData.cancellationReason && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6"
        >
          <div className="flex items-start gap-2 sm:gap-3">
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 mt-0.5 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-red-500 text-sm sm:text-base font-semibold mb-1">Cancellation Reason:</p>
              <p className="text-white/80 text-xs sm:text-sm">{classData.cancellationReason}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
        {classData.classType === 'online' && classData.meetingLink && (
          <motion.a
            href={classData.meetingLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:flex-1 sm:min-w-[200px] flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 
                     bg-gradient-to-r from-[#00F0FF] to-[#39FF14] text-black text-sm sm:text-base
                     font-bold rounded-xl hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]
                     transition-all duration-300"
          >
            <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Join Meeting
          </motion.a>
        )}

        {userRole === 'tutor' && classData.status === 'scheduled' && onStart && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onStart(classData._id)}
            className="w-full sm:flex-1 sm:min-w-[150px] flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 
                     bg-gradient-to-r from-[#FF10F0] to-[#00F0FF] text-black text-sm sm:text-base
                     font-bold rounded-xl hover:shadow-[0_0_20px_rgba(255,16,240,0.5)]
                     transition-all duration-300"
          >
            <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Start Class
          </motion.button>
        )}

        {userRole === 'tutor' && classData.status === 'in-progress' && onComplete && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onComplete(classData._id)}
            className="w-full sm:flex-1 sm:min-w-[150px] flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 
                     bg-gradient-to-r from-[#39FF14] to-[#00ff88] text-black text-sm sm:text-base
                     font-bold rounded-xl hover:shadow-[0_0_20px_rgba(57,255,20,0.5)]
                     transition-all duration-300"
          >
            <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Complete Class
          </motion.button>
        )}

        <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
          {classData.status === 'scheduled' && onEdit && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onEdit(classData)}
              className="flex-1 sm:flex-none px-4 py-2.5 sm:py-3 bg-[#0a0a0a] border border-[#00F0FF]/30 text-[#00F0FF] text-sm sm:text-base
                       font-semibold rounded-xl hover:border-[#00F0FF] hover:bg-[#00F0FF]/10
                       transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Edit className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Edit</span>
            </motion.button>
          )}

          {classData.status === 'scheduled' && onCancel && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCancel(classData._id)}
              className="flex-1 sm:flex-none px-4 py-2.5 sm:py-3 bg-[#0a0a0a] border border-red-500/30 text-red-500 text-sm sm:text-base
                       font-semibold rounded-xl hover:border-red-500 hover:bg-red-500/10
                       transition-all duration-300 flex items-center justify-center gap-2"
            >
              <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Cancel</span>
            </motion.button>
          )}

          {onDelete && (userRole === 'admin' || classData.status === 'cancelled') && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onDelete(classData._id)}
              className="flex-1 sm:flex-none px-4 py-2.5 sm:py-3 bg-[#0a0a0a] border border-red-500/30 text-red-500 text-sm sm:text-base
                       font-semibold rounded-xl hover:border-red-500 hover:bg-red-500/10
                       transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Delete</span>
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ClassCard;