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
  DollarSign,
  Users
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
  startClass,
  completeClass,
  createSchedule,
  updateSchedule
} from '../../../services/scheduleService';

const MySchedule = () => {
  const [view, setView] = useState('calendar'); // calendar, list, upcoming
  const [schedules, setSchedules] = useState([]);
  const [upcomingClasses, setUpcomingClasses] = useState([]);
  const [todayClasses, setTodayClasses] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

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
      if (editingClass) {
        await updateSchedule(editingClass._id, formData);
        toast.success('Schedule updated successfully!');
      } else {
        await createSchedule(formData);
        toast.success('Class scheduled successfully!');
      }
      fetchAllData();
      setShowCreateForm(false);
      setEditingClass(null);
    } catch (error) {
      console.error('Error saving schedule:', error);
      toast.error(error.message || 'Failed to save schedule');
    }
  };

  const handleEditClass = (cls) => {
    setEditingClass(cls);
    setShowCreateForm(true);
  };

  const handleCancelClass = async (classId) => {
    const confirmed = window.confirm('Are you sure you want to cancel this class?');
    if (!confirmed) return;

    const reason = prompt('Please provide a reason for cancellation:');
    if (!reason) return;

    try {
      await cancelSchedule(classId, reason);
      toast.success('Class cancelled successfully');
      fetchAllData();
    } catch (error) {
      console.error('Error cancelling class:', error);
      toast.error(error.message || 'Failed to cancel class');
    }
  };

  const handleStartClass = async (classId) => {
    try {
      await startClass(classId);
      toast.success('Class started!');
      fetchAllData();
    } catch (error) {
      console.error('Error starting class:', error);
      toast.error(error.message || 'Failed to start class');
    }
  };

  const handleCompleteClass = async (classId) => {
    const confirmed = window.confirm('Mark this class as completed?');
    if (!confirmed) return;

    try {
      await completeClass(classId);
      toast.success('Class completed!');
      fetchAllData();
    } catch (error) {
      console.error('Error completing class:', error);
      toast.error(error.message || 'Failed to complete class');
    }
  };

  const handleClassClick = (cls) => {
    // Navigate to class details or show modal
    console.log('Class clicked:', cls);
  };

  const filteredSchedules = statusFilter === 'all' 
    ? schedules 
    : schedules.filter(s => s.status === statusFilter);

  // Calculate earnings from completed classes
  const totalEarnings = schedules
    .filter(s => s.status === 'completed')
    .reduce((sum, cls) => sum + (cls.duration * 2), 0); // Example calculation

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
    <div className="min-h-screen bg-[#0a0f0d] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">
              My Schedule
            </h1>
            <p className="text-white/60">
              Manage your teaching schedule
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setEditingClass(null);
              setShowCreateForm(true);
            }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FF10F0] to-[#00F0FF]
                     text-black font-bold rounded-xl hover:shadow-[0_0_30px_rgba(255,16,240,0.5)]
                     transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            Schedule Class
          </motion.button>
        </motion.div>

        {/* Statistics Cards */}
        {statistics && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <div className="bg-[#121212] rounded-xl p-6 border border-[#00F0FF]/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm mb-1">Today's Classes</p>
                  <p className="text-3xl font-bold text-[#00F0FF]">
                    {statistics.today || 0}
                  </p>
                </div>
                <Clock className="w-10 h-10 text-[#00F0FF]" />
              </div>
            </div>

            <div className="bg-[#121212] rounded-xl p-6 border border-[#39FF14]/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm mb-1">Upcoming</p>
                  <p className="text-3xl font-bold text-[#39FF14]">
                    {statistics.upcoming || 0}
                  </p>
                </div>
                <CalendarIcon className="w-10 h-10 text-[#39FF14]" />
              </div>
            </div>

            <div className="bg-[#121212] rounded-xl p-6 border border-[#FF10F0]/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm mb-1">Completed</p>
                  <p className="text-3xl font-bold text-[#FF10F0]">
                    {statistics.byStatus?.find(s => s._id === 'completed')?.count || 0}
                  </p>
                </div>
                <BarChart3 className="w-10 h-10 text-[#FF10F0]" />
              </div>
            </div>

            <div className="bg-[#121212] rounded-xl p-6 border border-[#00ff88]/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm mb-1">Total Hours</p>
                  <p className="text-3xl font-bold text-[#00ff88]">
                    {Math.round((statistics.byStatus?.find(s => s._id === 'completed')?.totalDuration || 0) / 60)}h
                  </p>
                </div>
                <DollarSign className="w-10 h-10 text-[#00ff88]" />
              </div>
            </div>
          </motion.div>
        )}

        {/* Today's Classes */}
        {todayClasses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#121212] rounded-2xl p-6 border border-[#FF10F0]/30
                     shadow-[0_0_40px_rgba(255,16,240,0.2)]"
          >
            <h2 className="text-2xl font-bold text-[#FF10F0] mb-4 flex items-center gap-2">
              <Clock className="w-6 h-6" />
              Today's Classes
            </h2>
            <div className="space-y-3">
              {todayClasses.map((cls) => (
                <ClassCard
                  key={cls._id}
                  classData={cls}
                  userRole="tutor"
                  onStart={handleStartClass}
                  onComplete={handleCompleteClass}
                  onCancel={handleCancelClass}
                  onEdit={handleEditClass}
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
          className="flex items-center gap-3 bg-[#121212] rounded-xl p-2 border border-white/10"
        >
          {['calendar', 'upcoming', 'list'].map((tab) => (
            <motion.button
              key={tab}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setView(tab)}
              className={`
                flex-1 px-6 py-3 rounded-lg font-semibold capitalize transition-all duration-300
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
            <Filter className="w-5 h-5 text-white/60" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-neon px-4 py-2 bg-[#121212]"
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
                onStartClass={handleStartClass}
                userRole="tutor"
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
                  <AlertCircle className="w-16 h-16 text-white/20 mx-auto mb-4" />
                  <p className="text-lg text-white/60">No classes found</p>
                </div>
              ) : (
                filteredSchedules.map((cls) => (
                  <ClassCard
                    key={cls._id}
                    classData={cls}
                    userRole="tutor"
                    onEdit={handleEditClass}
                    onCancel={handleCancelClass}
                    onStart={handleStartClass}
                    onComplete={handleCompleteClass}
                  />
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Create/Edit Schedule Form */}
      <ScheduleForm
        isOpen={showCreateForm}
        onClose={() => {
          setShowCreateForm(false);
          setEditingClass(null);
        }}
        onSubmit={handleCreateSchedule}
        editData={editingClass}
        currentUserRole="tutor"
      />
    </div>
  );
};

export default MySchedule;