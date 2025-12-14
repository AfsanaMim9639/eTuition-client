import { motion } from 'framer-motion';
import { 
  Clock, 
  Video, 
  MapPin, 
  User,
  Calendar,
  ExternalLink,
  Play,
  CheckCircle
  
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const UpcomingClasses = ({ classes = [], onClassClick, onStartClass, userRole }) => {
  
  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'from-[#00F0FF] to-[#39FF14]';
      case 'in-progress': return 'from-[#FF10F0] to-[#00F0FF]';
      case 'completed': return 'from-[#39FF14] to-[#00ff88]';
      default: return 'from-[#00F0FF] to-[#39FF14]';
    }
  };

  // Check if class is starting soon (within 15 minutes)
  const isStartingSoon = (startTime) => {
    const now = new Date();
    const start = new Date(startTime);
    const diffMinutes = (start - now) / (1000 * 60);
    return diffMinutes > 0 && diffMinutes <= 15;
  };

  // Check if class can be started (within 10 minutes before)
  const canStartClass = (startTime) => {
    const now = new Date();
    const start = new Date(startTime);
    const diffMinutes = (start - now) / (1000 * 60);
    return diffMinutes <= 10 && diffMinutes >= -5;
  };

  if (!classes || classes.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8 sm:py-12 bg-[#121212] rounded-xl sm:rounded-2xl border border-white/10"
      >
        <Calendar className="w-12 h-12 sm:w-16 sm:h-16 text-white/20 mx-auto mb-3 sm:mb-4" />
        <p className="text-base sm:text-lg text-white/60">No upcoming classes</p>
        <p className="text-xs sm:text-sm text-white/40 mt-2">
          Schedule a class to see it here
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {classes.map((cls, index) => {
        const startingSoon = isStartingSoon(cls.startTime);
        const canStart = userRole === 'tutor' && canStartClass(cls.startTime);
        const participant = userRole === 'tutor' ? cls.student : cls.tutor;

        return (
          <motion.div
            key={cls._id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, x: 5 }}
            className={`
              relative bg-[#121212] rounded-xl sm:rounded-2xl p-4 sm:p-6 border transition-all duration-300 cursor-pointer
              ${startingSoon 
                ? 'border-[#FF10F0] shadow-[0_0_30px_rgba(255,16,240,0.3)] animate-pulse' 
                : 'border-[#FF10F0]/20 hover:border-[#FF10F0]'
              }
              hover:shadow-[0_0_30px_rgba(255,16,240,0.2)]
            `}
            onClick={() => onClassClick && onClassClick(cls)}
          >
            {/* Starting Soon Badge */}
            {startingSoon && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3 bg-gradient-to-r from-[#FF10F0] to-[#00F0FF] 
                         text-black text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-1 sm:py-2 rounded-full shadow-lg"
              >
                Starting Soon!
              </motion.div>
            )}

            <div className="space-y-3 sm:space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1 truncate">
                    {cls.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#00F0FF] font-medium truncate">
                    {cls.subject}
                  </p>
                </div>

                <div className={`
                  px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold whitespace-nowrap flex-shrink-0
                  bg-gradient-to-r ${getStatusColor(cls.status)}
                  text-black
                `}>
                  {cls.status}
                </div>
              </div>

              {/* Participant Info */}
              <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-[#0a0a0a] rounded-xl border border-white/10">
                <div className="relative flex-shrink-0">
                  <img
                    src={participant?.profileImage || 'https://i.ibb.co/qpB9ZNp/default-avatar.png'}
                    alt={participant?.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#00F0FF] object-cover"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-3 h-3 sm:w-4 sm:h-4 bg-[#39FF14] rounded-full border-2 border-[#121212]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base text-white font-semibold truncate">{participant?.name}</p>
                  <p className="text-[10px] sm:text-xs text-white/60">
                    {userRole === 'tutor' ? 'Student' : 'Tutor'}
                  </p>
                </div>
                <User className="w-3 h-3 sm:w-4 sm:h-4 text-[#00F0FF] flex-shrink-0" />
              </div>

              {/* Time & Duration */}
              <div className="grid grid-cols-2 gap-2 sm:gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <div className="p-1.5 sm:p-2 bg-[#FF10F0]/10 rounded-lg flex-shrink-0">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-[#FF10F0]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-white/60 text-[10px] sm:text-xs">Date</p>
                    <p className="text-white text-xs sm:text-sm font-medium truncate">
                      {new Date(cls.startTime).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <div className="p-1.5 sm:p-2 bg-[#00F0FF]/10 rounded-lg flex-shrink-0">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-[#00F0FF]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-white/60 text-[10px] sm:text-xs">Time</p>
                    <p className="text-white text-xs sm:text-sm font-medium truncate">
                      {new Date(cls.startTime).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Class Type & Location */}
              <div className="flex items-center gap-2 p-2 sm:p-3 bg-[#0a0a0a] rounded-xl border border-white/10">
                {cls.classType === 'online' ? (
                  <>
                    <Video className="w-3 h-3 sm:w-4 sm:h-4 text-[#39FF14] flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-white/80 truncate flex-1">Online Class</span>
                  </>
                ) : (
                  <>
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-[#39FF14] flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-white/80 truncate flex-1">{cls.location}</span>
                  </>
                )}
                <span className="text-[10px] sm:text-xs text-[#00F0FF] font-semibold whitespace-nowrap">
                  {cls.duration} min
                </span>
              </div>

              {/* Time Until Class */}
              <div className="text-center p-2 sm:p-3 bg-gradient-to-r from-[#FF10F0]/10 to-[#00F0FF]/10 
                            rounded-xl border border-[#FF10F0]/20">
                <p className="text-xs sm:text-sm text-white/80">
                  Starts {formatDistanceToNow(new Date(cls.startTime), { addSuffix: true })}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                {cls.classType === 'online' && cls.meetingLink && (
                  <motion.a
                    href={cls.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:flex-1 flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 
                             bg-gradient-to-r from-[#00F0FF] to-[#39FF14] text-black text-sm sm:text-base
                             font-bold rounded-xl hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]
                             transition-all duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    Join Meeting
                  </motion.a>
                )}

                {canStart && cls.status === 'scheduled' && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onStartClass && onStartClass(cls._id);
                    }}
                    className="w-full sm:flex-1 flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 
                             bg-gradient-to-r from-[#FF10F0] to-[#00F0FF] text-black text-sm sm:text-base
                             font-bold rounded-xl hover:shadow-[0_0_20px_rgba(255,16,240,0.5)]
                             transition-all duration-300"
                  >
                    <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    Start Class
                  </motion.button>
                )}

                {cls.status === 'in-progress' && userRole === 'tutor' && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:flex-1 flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 
                             bg-gradient-to-r from-[#39FF14] to-[#00ff88] text-black text-sm sm:text-base
                             font-bold rounded-xl hover:shadow-[0_0_20px_rgba(57,255,20,0.5)]
                             transition-all duration-300 animate-pulse"
                  >
                    <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Class In Progress</span>
                    <span className="sm:hidden">In Progress</span>
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default UpcomingClasses;