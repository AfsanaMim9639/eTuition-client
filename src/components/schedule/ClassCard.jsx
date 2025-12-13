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
        className="bg-[#121212] rounded-xl p-4 border border-[#FF10F0]/20
                   hover:border-[#FF10F0] transition-all duration-300 cursor-pointer
                   hover:shadow-[0_0_20px_rgba(255,16,240,0.2)]"
      >
        <div className="flex items-center justify-between gap-4">
          {/* Left: Time & Title */}
          <div className="flex items-center gap-4 flex-1">
            <div className="text-center min-w-[60px]">
              <div className="text-[#00F0FF] text-xs font-semibold">
                {formatTime(classData.startTime)}
              </div>
              <div className="text-white/40 text-xs">
                {classData.duration}m
              </div>
            </div>

            <div className="border-l-2 border-[#FF10F0]/30 pl-4 flex-1">
              <h4 className="text-white font-semibold">{classData.title}</h4>
              <p className="text-sm text-white/60">{participant?.name}</p>
            </div>
          </div>

          {/* Right: Status */}
          <div className={`
            px-3 py-1 rounded-full text-xs font-bold
            bg-gradient-to-r ${statusConfig.gradient}
            text-black flex items-center gap-1
          `}>
            <StatusIcon className="w-3 h-3" />
            {statusConfig.text}
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
      className="bg-[#121212] rounded-2xl p-6 border border-[#FF10F0]/20
                 hover:border-[#FF10F0] transition-all duration-300
                 hover:shadow-[0_0_40px_rgba(255,16,240,0.2)]"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-white mb-2">
            {classData.title}
          </h3>
          <p className="text-[#00F0FF] font-semibold mb-1">
            {classData.subject}
          </p>
          {classData.description && (
            <p className="text-sm text-white/60 mt-2">
              {classData.description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className={`
            px-4 py-2 rounded-full text-sm font-bold
            bg-gradient-to-r ${statusConfig.gradient}
            text-black flex items-center gap-2
          `}>
            <StatusIcon className="w-4 h-4" />
            {statusConfig.text}
          </div>
        </div>
      </div>

      {/* Participant Card */}
      <div className="bg-[#0a0a0a] rounded-xl p-4 mb-6 border border-white/10">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={participant?.profileImage || 'https://i.ibb.co/qpB9ZNp/default-avatar.png'}
              alt={participant?.name}
              className="w-16 h-16 rounded-full border-2 border-[#00F0FF]"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#39FF14] 
                          rounded-full border-2 border-[#121212]" />
          </div>
          <div className="flex-1">
            <p className="text-white font-bold text-lg">{participant?.name}</p>
            <p className="text-sm text-white/60">{participant?.email}</p>
            <p className="text-xs text-[#00F0FF] font-semibold mt-1">
              {userRole === 'tutor' ? 'Student' : 'Tutor'}
            </p>
          </div>
          <User className="w-5 h-5 text-[#00F0FF]" />
        </div>
      </div>

      {/* Date & Time Info */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-[#0a0a0a] rounded-xl p-4 border border-[#FF10F0]/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#FF10F0]/10 rounded-lg">
              <Calendar className="w-5 h-5 text-[#FF10F0]" />
            </div>
            <div>
              <p className="text-xs text-white/60 mb-1">Date</p>
              <p className="text-white font-semibold">
                {formatDate(classData.startTime)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#0a0a0a] rounded-xl p-4 border border-[#00F0FF]/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#00F0FF]/10 rounded-lg">
              <Clock className="w-5 h-5 text-[#00F0FF]" />
            </div>
            <div>
              <p className="text-xs text-white/60 mb-1">Time</p>
              <p className="text-white font-semibold">
                {formatTime(classData.startTime)} - {formatTime(classData.endTime)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Class Type & Location */}
      <div className="bg-[#0a0a0a] rounded-xl p-4 mb-6 border border-[#39FF14]/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {classData.classType === 'online' ? (
              <>
                <div className="p-3 bg-[#39FF14]/10 rounded-lg">
                  <Video className="w-5 h-5 text-[#39FF14]" />
                </div>
                <div>
                  <p className="text-xs text-white/60 mb-1">Class Type</p>
                  <p className="text-white font-semibold">Online Class</p>
                </div>
              </>
            ) : (
              <>
                <div className="p-3 bg-[#39FF14]/10 rounded-lg">
                  <MapPin className="w-5 h-5 text-[#39FF14]" />
                </div>
                <div>
                  <p className="text-xs text-white/60 mb-1">Location</p>
                  <p className="text-white font-semibold">{classData.location}</p>
                </div>
              </>
            )}
          </div>
          <div className="text-right">
            <p className="text-xs text-white/60 mb-1">Duration</p>
            <p className="text-[#00F0FF] font-bold text-lg">
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
          className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
            <div>
              <p className="text-red-500 font-semibold mb-1">Cancellation Reason:</p>
              <p className="text-white/80 text-sm">{classData.cancellationReason}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        {classData.classType === 'online' && classData.meetingLink && (
          <motion.a
            href={classData.meetingLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 min-w-[200px] flex items-center justify-center gap-2 px-4 py-3 
                     bg-gradient-to-r from-[#00F0FF] to-[#39FF14] text-black 
                     font-bold rounded-xl hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]
                     transition-all duration-300"
          >
            <ExternalLink className="w-4 h-4" />
            Join Meeting
          </motion.a>
        )}

        {userRole === 'tutor' && classData.status === 'scheduled' && onStart && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onStart(classData._id)}
            className="flex-1 min-w-[150px] flex items-center justify-center gap-2 px-4 py-3 
                     bg-gradient-to-r from-[#FF10F0] to-[#00F0FF] text-black 
                     font-bold rounded-xl hover:shadow-[0_0_20px_rgba(255,16,240,0.5)]
                     transition-all duration-300"
          >
            <Play className="w-4 h-4" />
            Start Class
          </motion.button>
        )}

        {userRole === 'tutor' && classData.status === 'in-progress' && onComplete && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onComplete(classData._id)}
            className="flex-1 min-w-[150px] flex items-center justify-center gap-2 px-4 py-3 
                     bg-gradient-to-r from-[#39FF14] to-[#00ff88] text-black 
                     font-bold rounded-xl hover:shadow-[0_0_20px_rgba(57,255,20,0.5)]
                     transition-all duration-300"
          >
            <CheckCircle className="w-4 h-4" />
            Complete Class
          </motion.button>
        )}

        {classData.status === 'scheduled' && onEdit && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onEdit(classData)}
            className="px-4 py-3 bg-[#0a0a0a] border border-[#00F0FF]/30 text-[#00F0FF]
                     font-semibold rounded-xl hover:border-[#00F0FF] hover:bg-[#00F0FF]/10
                     transition-all duration-300 flex items-center gap-2"
          >
            <Edit className="w-4 h-4" />
            Edit
          </motion.button>
        )}

        {classData.status === 'scheduled' && onCancel && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCancel(classData._id)}
            className="px-4 py-3 bg-[#0a0a0a] border border-red-500/30 text-red-500
                     font-semibold rounded-xl hover:border-red-500 hover:bg-red-500/10
                     transition-all duration-300 flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Cancel
          </motion.button>
        )}

        {onDelete && (userRole === 'admin' || classData.status === 'cancelled') && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDelete(classData._id)}
            className="px-4 py-3 bg-[#0a0a0a] border border-red-500/30 text-red-500
                     font-semibold rounded-xl hover:border-red-500 hover:bg-red-500/10
                     transition-all duration-300 flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default ClassCard;