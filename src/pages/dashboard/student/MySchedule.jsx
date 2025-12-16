import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar as CalendarIcon,
  Clock,
  Plus,
  Filter,
  BarChart3,
  Loader2,
  AlertCircle,
  X
} from 'lucide-react';
import { toast } from 'react-hot-toast';

import Calendar from '../../../components/schedule/Calendar';
import UpcomingClasses from '../../../components/schedule/UpcomingClasses';
import ClassCard from '../../../components/schedule/ClassCard';
import ScheduleForm from '../../../components/schedule/ScheduleForm';

import {
  getSchedules,
  getUpcomingClasses,
  getTodayClasses,
  getClassStatistics,
  cancelSchedule,
  createSchedule
} from '../../../utils/scheduleService';

const MySchedule = () => {
  const [view, setView] = useState('calendar');
  const [schedules, setSchedules] = useState([]);
  const [upcomingClasses, setUpcomingClasses] = useState([]);
  const [todayClasses, setTodayClasses] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  
  // 🆕 Cancel modal state
  const [cancelModal, setCancelModal] = useState({ show: false, classId: null });
  const [cancelReason, setCancelReason] = useState('');

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [schedulesRes, upcomingRes, todayRes, statsRes] = await Promise.all([
        getSchedules(),
        getUpcomingClasses(10),
        getTodayClasses(),
        getClassStatistics()
      ]);

      setSchedules(schedulesRes.data || []);
      setUpcomingClasses(upcomingRes.data || []);
      setTodayClasses(todayRes.data || []);
      setStatistics(statsRes.data || null);
    } catch (error) {
      console.error('Error fetching schedule data:', error);
      toast.error('Failed to load schedule data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSchedule = async (formData) => {
    try {
      await createSchedule(formData);
      toast.success('Class scheduled successfully!');
      fetchAllData();
      setShowCreateForm(false);
    } catch (error) {
      console.error('Error creating schedule:', error);
      toast.error(error.message || 'Failed to create schedule');
    }
  };

  // 🆕 Open cancel modal instead of window.confirm
  const handleCancelClass = (classId) => {
    setCancelModal({ show: true, classId });
    setCancelReason('');
  };

  // 🆕 Confirm cancellation with modal
  const confirmCancelClass = async () => {
    if (!cancelReason.trim()) {
      toast.error('Please provide a reason for cancellation');
      return;
    }

    try {
      await cancelSchedule(cancelModal.classId, cancelReason);
      toast.success('Class cancelled successfully');
      fetchAllData();
      setCancelModal({ show: false, classId: null });
      setCancelReason('');
    } catch (error) {
      console.error('Error cancelling class:', error);
      toast.error(error.message || 'Failed to cancel class');
    }
  };

  const handleClassClick = (cls) => {
    console.log('Class clicked:', cls);
  };

  const filteredSchedules = statusFilter === 'all' 
    ? schedules 
    : schedules.filter(s => s.status === statusFilter);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <Loader2 className="w-12 h-12 text-[#FF10F0]" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f0d] p-3 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text mb-2">
              My Schedule
            </h1>
            <p className="text-sm sm:text-base text-white/60">
              Manage and view your class schedule
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateForm(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 
                     bg-gradient-to-r from-[#FF10F0] to-[#00F0FF]
                     text-black text-sm sm:text-base font-bold rounded-xl 
                     hover:shadow-[0_0_30px_rgba(255,16,240,0.5)]
                     transition-all duration-300"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Request Class</span>
            <span className="sm:hidden">Request</span>
          </motion.button>
        </motion.div>

        {/* Statistics Cards */}
        {statistics && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-3 gap-2 sm:gap-3"
          >
            <div className="bg-[#121212] rounded-lg sm:rounded-xl p-2 sm:p-4 border border-[#00F0FF]/20">
              <div className="flex flex-col items-center sm:items-start justify-center sm:justify-between gap-1 sm:gap-2">
                <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-[#00F0FF]" />
                <div className="text-center sm:text-left w-full">
                  <p className="text-white/60 text-[10px] sm:text-xs mb-0.5 sm:mb-1 truncate">Today</p>
                  <p className="text-lg sm:text-2xl font-bold text-[#00F0FF]">
                    {statistics.today || 0}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#121212] rounded-lg sm:rounded-xl p-2 sm:p-4 border border-[#39FF14]/20">
              <div className="flex flex-col items-center sm:items-start justify-center sm:justify-between gap-1 sm:gap-2">
                <CalendarIcon className="w-6 h-6 sm:w-8 sm:h-8 text-[#39FF14]" />
                <div className="text-center sm:text-left w-full">
                  <p className="text-white/60 text-[10px] sm:text-xs mb-0.5 sm:mb-1 truncate">Upcoming</p>
                  <p className="text-lg sm:text-2xl font-bold text-[#39FF14]">
                    {statistics.upcoming || 0}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#121212] rounded-lg sm:rounded-xl p-2 sm:p-4 border border-[#FF10F0]/20">
              <div className="flex flex-col items-center sm:items-start justify-center sm:justify-between gap-1 sm:gap-2">
                <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-[#FF10F0]" />
                <div className="text-center sm:text-left w-full">
                  <p className="text-white/60 text-[10px] sm:text-xs mb-0.5 sm:mb-1 truncate">Done</p>
                  <p className="text-lg sm:text-2xl font-bold text-[#FF10F0]">
                    {statistics.byStatus?.find(s => s._id === 'completed')?.count || 0}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Today's Classes */}
        {todayClasses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#121212] rounded-2xl p-4 sm:p-6 border border-[#FF10F0]/30
                     shadow-[0_0_40px_rgba(255,16,240,0.2)]"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-[#FF10F0] mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
              Today's Classes
            </h2>
            <div className="space-y-3">
              {todayClasses.map((cls) => (
                <ClassCard
                  key={cls._id}
                  classData={cls}
                  userRole="student"
                  onCancel={handleCancelClass}
                  compact
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* View Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-1 sm:gap-2 bg-[#121212] rounded-xl p-1 sm:p-1.5 border border-white/10"
        >
          {['calendar', 'upcoming', 'list'].map((tab) => (
            <motion.button
              key={tab}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setView(tab)}
              className={`
                flex-1 px-2 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold capitalize transition-all duration-300
                ${view === tab
                  ? 'bg-gradient-to-r from-[#FF10F0] to-[#00F0FF] text-black'
                  : 'text-white hover:bg-white/5'
                }
              `}
            >
              {tab}
            </motion.button>
          ))}
        </motion.div>

        {/* Filter (for list view) */}
        {view === 'list' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-white/60" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-neon px-3 sm:px-4 py-2 bg-[#121212] text-sm sm:text-base w-full sm:w-auto rounded-lg border border-white/20 text-white"
            >
              <option value="all">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </motion.div>
        )}

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {view === 'calendar' && (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <Calendar
                schedules={schedules}
                onDateSelect={setSelectedDate}
                onClassClick={handleClassClick}
              />
            </motion.div>
          )}

          {view === 'upcoming' && (
            <motion.div
              key="upcoming"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <UpcomingClasses
                classes={upcomingClasses}
                onClassClick={handleClassClick}
                userRole="student"
              />
            </motion.div>
          )}

          {view === 'list' && (
            <motion.div
              key="list"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              {filteredSchedules.length === 0 ? (
                <div className="text-center py-12 bg-[#121212] rounded-2xl border border-white/10">
                  <AlertCircle className="w-12 h-12 sm:w-16 sm:h-16 text-white/20 mx-auto mb-4" />
                  <p className="text-base sm:text-lg text-white/60">No classes found</p>
                </div>
              ) : (
                filteredSchedules.map((cls) => (
                  <ClassCard
                    key={cls._id}
                    classData={cls}
                    userRole="student"
                    onCancel={handleCancelClass}
                  />
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Create Schedule Form */}
      <ScheduleForm
        isOpen={showCreateForm}
        onClose={() => setShowCreateForm(false)}
        onSubmit={handleCreateSchedule}
        currentUserRole="student"
      />

      {/* 🆕 Cancel Class Modal - Replaces window.confirm and prompt */}
      <AnimatePresence>
        {cancelModal.show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setCancelModal({ show: false, classId: null })}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-[#121212] to-[#0a0f0d] border-2 border-[#FF10F0]/50 rounded-2xl p-6 sm:p-8 max-w-md w-full
                       shadow-[0_0_50px_rgba(255,16,240,0.3)]"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl sm:text-2xl font-bold text-[#FF10F0]">Cancel Class?</h3>
                <button
                  onClick={() => setCancelModal({ show: false, classId: null })}
                  className="p-2 hover:bg-white/10 rounded-lg transition-all"
                >
                  <X className="w-5 h-5 text-white/60" />
                </button>
              </div>
              
              <p className="text-white/70 mb-4 text-sm sm:text-base">
                Please provide a reason for cancelling this class:
              </p>
              
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="e.g., Schedule conflict, Emergency, etc."
                rows="4"
                className="w-full px-4 py-3 bg-[#0a0f0d] border-2 border-[#FF10F0]/30 rounded-lg text-white 
                         focus:border-[#FF10F0] focus:outline-none transition-all resize-none mb-6"
              />
              
              <div className="flex gap-3 sm:gap-4">
                <button
                  onClick={() => setCancelModal({ show: false, classId: null })}
                  className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all border border-white/20"
                >
                  Go Back
                </button>
                <button
                  onClick={confirmCancelClass}
                  className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#FF10F0] to-[#FF1493] text-white rounded-xl font-semibold hover:shadow-[0_0_20px_rgba(255,16,240,0.5)] transition-all"
                >
                  Cancel Class
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MySchedule;