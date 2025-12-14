import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, AlertCircle } from 'lucide-react';

const MySchedule = () => {
  return (
    <div className="min-h-screen bg-[#0a0f0d] p-3 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text mb-2">
            My Schedule
          </h1>
          <p className="text-sm sm:text-base text-white/60">
            Manage and view your class schedule
          </p>
        </motion.div>

        {/* Coming Soon Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#121212] to-[#0a0f0d] 
                     border-2 border-[#FF10F0]/30 rounded-2xl p-8 sm:p-12 text-center
                     shadow-[0_0_50px_rgba(255,16,240,0.2)]"
        >
          <div className="relative mb-6">
            <CalendarIcon className="w-16 h-16 sm:w-20 sm:h-20 text-[#FF10F0] mx-auto mb-4" />
            <Clock className="w-8 h-8 text-[#00F0FF] absolute top-0 right-1/4 animate-pulse" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Schedule Feature Coming Soon!
          </h2>
          
          <p className="text-base sm:text-lg text-white/70 mb-8 max-w-2xl mx-auto">
            We're working on an amazing schedule management system that will help you:
          </p>

          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8 text-left">
            <div className="bg-[#FF10F0]/10 border border-[#FF10F0]/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#FF10F0] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-black text-sm font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">View All Classes</h3>
                  <p className="text-sm text-white/60">See your upcoming and past classes</p>
                </div>
              </div>
            </div>

            <div className="bg-[#00F0FF]/10 border border-[#00F0FF]/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#00F0FF] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-black text-sm font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Request Classes</h3>
                  <p className="text-sm text-white/60">Schedule new classes with tutors</p>
                </div>
              </div>
            </div>

            <div className="bg-[#39FF14]/10 border border-[#39FF14]/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#39FF14] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-black text-sm font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Track Attendance</h3>
                  <p className="text-sm text-white/60">Monitor your class attendance</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-black text-sm font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Get Reminders</h3>
                  <p className="text-sm text-white/60">Never miss a class with notifications</p>
                </div>
              </div>
            </div>
          </div>

          
        </motion.div>

        {/* Alternative Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-center"
        >
          <p className="text-white/60 mb-4">In the meantime, you can:</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/dashboard/student/tuitions"
              className="px-6 py-3 bg-gradient-to-r from-[#00F0FF] to-[#00ffcc] 
                       text-black font-bold rounded-xl hover:shadow-lg 
                       hover:shadow-[#00F0FF]/30 transition-all"
            >
              View My Tuitions
            </a>
            <a
              href="/dashboard/student/messages"
              className="px-6 py-3 bg-white/10 border-2 border-white/20 
                       text-white font-bold rounded-xl hover:bg-white/20 
                       transition-all"
            >
              Message Tutors
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MySchedule;