import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon,
  Clock,
  Video,
  MapPin
} from 'lucide-react';

const Calendar = ({ schedules = [], onDateSelect, onClassClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  // Get calendar data
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayNamesShort = ['S', 'M', 'T', 'W', 'T', 'F', 'S']; // Mobile

  // Navigation
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Get classes for a specific date
  const getClassesForDate = (date) => {
    return schedules.filter(schedule => {
      const scheduleDate = new Date(schedule.startTime);
      return scheduleDate.toDateString() === date.toDateString();
    });
  };

  // Check if date is today
  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  // Check if date is selected
  const isSelected = (date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  // Handle date click
  const handleDateClick = (date) => {
    setSelectedDate(date);
    if (onDateSelect) {
      onDateSelect(date);
    }
  };

  // Generate calendar days
  const calendarDays = [];
  
  // Empty cells for days before month starts
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }
  
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(new Date(year, month, day));
  }

  // Status colors
  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'from-[#00F0FF] to-[#39FF14]';
      case 'in-progress': return 'from-[#FF10F0] to-[#00F0FF]';
      case 'completed': return 'from-[#39FF14] to-[#00ff88]';
      case 'cancelled': return 'from-gray-500 to-gray-600';
      default: return 'from-[#00F0FF] to-[#39FF14]';
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4"
      >
        <div className="flex items-center gap-2 sm:gap-4">
          <CalendarIcon className="w-6 h-6 sm:w-8 sm:h-8 text-[#FF10F0]" />
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold gradient-text">
            {monthNames[month]} {year}
          </h2>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={goToPreviousMonth}
            className="p-1.5 sm:p-2 rounded-lg bg-[#121212] border border-[#FF10F0]/30 
                     hover:border-[#FF10F0] transition-all duration-300
                     hover:shadow-[0_0_20px_rgba(255,16,240,0.3)]"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF10F0]" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={goToToday}
            className="flex-1 sm:flex-none px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-[#121212] border border-[#00F0FF]/30 
                     hover:border-[#00F0FF] transition-all duration-300
                     hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] text-white text-sm sm:text-base font-medium"
          >
            Today
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={goToNextMonth}
            className="p-1.5 sm:p-2 rounded-lg bg-[#121212] border border-[#FF10F0]/30 
                     hover:border-[#FF10F0] transition-all duration-300
                     hover:shadow-[0_0_20px_rgba(255,16,240,0.3)]"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF10F0]" />
          </motion.button>
        </div>
      </motion.div>

      {/* Calendar Grid */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#121212] rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-[#FF10F0]/20
                   shadow-[0_0_40px_rgba(255,16,240,0.1)]"
      >
        {/* Day Names */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-3 sm:mb-4">
          {/* Mobile: Show first letter only */}
          {dayNamesShort.map((day, index) => (
            <div
              key={day + index}
              className="sm:hidden text-center py-2 text-xs font-semibold text-[#00F0FF]"
            >
              {day}
            </div>
          ))}
          {/* Desktop: Show full name */}
          {dayNames.map((day) => (
            <div
              key={day}
              className="hidden sm:block text-center py-2 sm:py-3 text-xs sm:text-sm font-semibold text-[#00F0FF]"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {calendarDays.map((date, index) => {
            if (!date) {
              return <div key={`empty-${index}`} className="aspect-square" />;
            }

            const classes = getClassesForDate(date);
            const hasClasses = classes.length > 0;
            const dayIsToday = isToday(date);
            const dayIsSelected = isSelected(date);

            return (
              <motion.button
                key={date.toISOString()}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.005 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDateClick(date)}
                className={`
                  relative aspect-square rounded-lg sm:rounded-xl p-1 sm:p-2 transition-all duration-300
                  ${dayIsToday 
                    ? 'bg-gradient-to-br from-[#FF10F0] to-[#00F0FF] text-black font-bold' 
                    : dayIsSelected
                    ? 'bg-[#00F0FF]/20 border-2 border-[#00F0FF]'
                    : 'bg-[#0a0a0a] hover:bg-[#1a1a1a]'
                  }
                  ${hasClasses ? 'border-2 border-[#39FF14]/50' : 'border border-white/10'}
                `}
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <span className={`text-sm sm:text-base md:text-lg ${dayIsToday ? 'text-black' : 'text-white'}`}>
                    {date.getDate()}
                  </span>
                  
                  {hasClasses && (
                    <div className="flex gap-0.5 sm:gap-1 mt-0.5 sm:mt-1">
                      {classes.slice(0, 3).map((cls, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.1 + i * 0.05 }}
                          className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-gradient-to-r ${getStatusColor(cls.status)}`}
                        />
                      ))}
                      {classes.length > 3 && (
                        <span className="text-[8px] sm:text-[10px] text-[#39FF14]">
                          +{classes.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Selected Date Classes */}
      <AnimatePresence>
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-3 sm:space-y-4"
          >
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#00F0FF]">
              Classes on {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h3>

            {getClassesForDate(selectedDate).length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8 sm:py-12 bg-[#121212] rounded-xl border border-white/10"
              >
                <CalendarIcon className="w-10 h-10 sm:w-12 sm:h-12 text-white/20 mx-auto mb-3 sm:mb-4" />
                <p className="text-sm sm:text-base text-white/60">No classes scheduled for this day</p>
              </motion.div>
            ) : (
              <div className="space-y-2 sm:space-y-3">
                {getClassesForDate(selectedDate).map((cls, index) => (
                  <motion.div
                    key={cls._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    onClick={() => onClassClick && onClassClick(cls)}
                    className="bg-[#121212] rounded-xl p-3 sm:p-4 border border-[#FF10F0]/20
                             hover:border-[#FF10F0] transition-all duration-300 cursor-pointer
                             hover:shadow-[0_0_20px_rgba(255,16,240,0.2)]"
                  >
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
                      <div className="flex-1 w-full">
                        <h4 className="font-semibold text-base sm:text-lg text-white mb-2">
                          {cls.title}
                        </h4>
                        
                        <div className="space-y-1.5 sm:space-y-2">
                          <div className="flex items-center gap-2 text-xs sm:text-sm text-white/70">
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-[#00F0FF] flex-shrink-0" />
                            <span className="truncate">
                              {new Date(cls.startTime).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                              {' - '}
                              {new Date(cls.endTime).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                            <span className="text-[#39FF14] whitespace-nowrap">
                              ({cls.duration} min)
                            </span>
                          </div>

                          {cls.classType === 'online' && cls.meetingLink && (
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-white/70">
                              <Video className="w-3 h-3 sm:w-4 sm:h-4 text-[#FF10F0] flex-shrink-0" />
                              <span>Online Class</span>
                            </div>
                          )}

                          {cls.classType === 'in-person' && cls.location && (
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-white/70">
                              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-[#39FF14] flex-shrink-0" />
                              <span className="truncate">{cls.location}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className={`
                        px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold whitespace-nowrap
                        bg-gradient-to-r ${getStatusColor(cls.status)}
                        text-black
                      `}>
                        {cls.status}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Calendar;