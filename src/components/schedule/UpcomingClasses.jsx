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
        className="text-center py-12 bg-[#121212] rounded-2xl border border-white/10"
      >
        <Calendar className="w-16 h-16 text-white/20 mx-auto mb-4" />
        <p className="text-lg text-white/60">No upcoming classes</p>
        <p className="text-sm text-white/40 mt-2">
          Schedule a class to see it here
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
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
              relative bg-[#121212] rounded-2xl p-6 border transition-all duration-300 cursor-pointer
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
                className="absolute -top-3 -right-3 bg-gradient-to-r from-[#FF10F0] to-[#00F0FF] 
                         text-black text-xs font-bold px-4 py-2 rounded-full shadow-lg"
              >
                Starting Soon!
              </motion.div>
            )}

            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {cls.title}
                  </h3>
                  <p className="text-sm text-[#00F0FF] font-medium">
                    {cls.subject}
                  </p>
                </div>

                <div className={`
                  px-4 py-1.5 rounded-full text-xs font-bold
                  bg-gradient-to-r ${getStatusColor(cls.status)}
                  text-black
                `}>
                  {cls.status}
                </div>
              </div>

              {/* Participant Info */}
              <div className="flex items-center gap-3 p-3 bg-[#0a0a0a] rounded-xl border border-white/10">
                <div className="relative">
                  <img
                    src={participant?.profileImage || 'https://i.ibb.co/qpB9ZNp/default-avatar.png'}
                    alt={participant?.name}
                    className="w-12 h-12 rounded-full border-2 border-[#00F0FF]"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#39FF14] rounded-full border-2 border-[#121212]" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-semibold">{participant?.name}</p>
                  <p className="text-xs text-white/60">
                    {userRole === 'tutor' ? 'Student' : 'Tutor'}
                  </p>
                </div>
                <User className="w-4 h-4 text-[#00F0FF]" />
              </div>

              {/* Time & Duration */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <div className="p-2 bg-[#FF10F0]/10 rounded-lg">
                    <Calendar className="w-4 h-4 text-[#FF10F0]" />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs">Date</p>
                    <p className="text-white font-medium">
                      {new Date(cls.startTime).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <div className="p-2 bg-[#00F0FF]/10 rounded-lg">
                    <Clock className="w-4 h-4 text-[#00F0FF]" />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs">Time</p>
                    <p className="text-white font-medium">
                      {new Date(cls.startTime).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Class Type & Location */}
              <div className="flex items-center gap-2 p-3 bg-[#0a0a0a] rounded-xl border border-white/10">
                {cls.classType === 'online' ? (
                  <>
                    <Video className="w-4 h-4 text-[#39FF14]" />
                    <span className="text-sm text-white/80">Online Class</span>
                  </>
                ) : (
                  <>
                    <MapPin className="w-4 h-4 text-[#39FF14]" />
                    <span className="text-sm text-white/80">{cls.location}</span>
                  </>
                )}
                <span className="ml-auto text-xs text-[#00F0FF] font-semibold">
                  {cls.duration} minutes
                </span>
              </div>

              {/* Time Until Class */}
              <div className="text-center p-3 bg-gradient-to-r from-[#FF10F0]/10 to-[#00F0FF]/10 
                            rounded-xl border border-[#FF10F0]/20">
                <p className="text-sm text-white/80">
                  Starts {formatDistanceToNow(new Date(cls.startTime), { addSuffix: true })}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                {cls.classType === 'online' && cls.meetingLink && (
                  <motion.a
                    href={cls.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 
                             bg-gradient-to-r from-[#00F0FF] to-[#39FF14] text-black 
                             font-bold rounded-xl hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]
                             transition-all duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-4 h-4" />
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
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 
                             bg-gradient-to-r from-[#FF10F0] to-[#00F0FF] text-black 
                             font-bold rounded-xl hover:shadow-[0_0_20px_rgba(255,16,240,0.5)]
                             transition-all duration-300"
                  >
                    <Play className="w-4 h-4" />
                    Start Class
                  </motion.button>
                )}

                {cls.status === 'in-progress' && userRole === 'tutor' && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 
                             bg-gradient-to-r from-[#39FF14] to-[#00ff88] text-black 
                             font-bold rounded-xl hover:shadow-[0_0_20px_rgba(57,255,20,0.5)]
                             transition-all duration-300 animate-pulse"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Class In Progress
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