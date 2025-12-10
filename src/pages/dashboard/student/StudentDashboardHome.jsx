import { useState, useEffect } from 'react';
import { FaBriefcase, FaChalkboardTeacher, FaMoneyBillWave, FaPlus, FaEye, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import api from '../../../utils/api';

const StudentDashboardHome = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    stats: {
      activeTuitions: 0,
      pendingApplications: 0,
      totalSpent: 0
    },
    recentActivities: [],
    upcomingSessions: []
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // API call to get dashboard data
      const response = await api.get('/student/dashboard');
      
      // ✅ Backend sends: { success: true, stats: {...}, recentActivities: [...], upcomingSessions: [...] }
      // Extract the data properly
      const { stats, recentActivities, upcomingSessions } = response.data;
      
      setDashboardData({
        stats: stats || { activeTuitions: 0, pendingApplications: 0, totalSpent: 0 },
        recentActivities: recentActivities || [],
        upcomingSessions: upcomingSessions || []
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Keep default empty state on error
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('bn-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getActivityIcon = (type) => {
    // ✅ Match with backend notification types
    switch (type) {
      case 'application_received':
      case 'application':
        return 'bg-[#00ffcc]';
      case 'payment_received':
      case 'payment_sent':
      case 'payment':
        return 'bg-green-500';
      case 'message':
        return 'bg-blue-500';
      case 'tuition_completed':
      case 'session':
        return 'bg-yellow-500';
      case 'application_accepted':
        return 'bg-blue-500';
      case 'application_rejected':
        return 'bg-red-500';
      case 'system_alert':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const activityDate = new Date(date);
    const diffInHours = Math.floor((now - activityDate) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    return `${diffInDays} days ago`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <FaSpinner className="animate-spin text-5xl text-[#00ffcc] mx-auto mb-4" />
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#0f1512] to-[#0a0f0d] border-2 border-[#00ffcc]/30 rounded-xl p-8">
        <h1 className="text-3xl font-bold text-[#00ffcc] mb-2">
          Welcome Back, {user?.name || 'Student'}! 🎓
        </h1>
        <p className="text-gray-400">
          Manage your tuitions and track your learning progress
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0f1512] border-2 border-[#00ffcc]/30 rounded-xl p-6 hover:border-[#00ffcc] transition-all cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <FaBriefcase className="text-3xl text-[#00ffcc]" />
            <span className="text-xs text-gray-400 bg-[#00ffcc]/10 px-2 py-1 rounded">Total</span>
          </div>
          <h3 className="text-sm text-gray-400 mb-2">Active Tuitions</h3>
          <p className="text-4xl font-bold text-[#00ffcc]">
            {dashboardData.stats.activeTuitions}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            {dashboardData.stats.activeTuitions > 0 ? 'Manage your tuitions' : 'Post your first tuition'}
          </p>
        </div>

        <div className="bg-[#0f1512] border-2 border-[#00ffcc]/30 rounded-xl p-6 hover:border-[#00ffcc] transition-all cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <FaChalkboardTeacher className="text-3xl text-[#00ffcc]" />
            <span className="text-xs text-gray-400 bg-[#00ffcc]/10 px-2 py-1 rounded">Pending</span>
          </div>
          <h3 className="text-sm text-gray-400 mb-2">Tutor Applications</h3>
          <p className="text-4xl font-bold text-[#00ffcc]">
            {dashboardData.stats.pendingApplications}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            {dashboardData.stats.pendingApplications > 0 ? 'Review applications' : 'No pending applications'}
          </p>
        </div>

        <div className="bg-[#0f1512] border-2 border-[#00ffcc]/30 rounded-xl p-6 hover:border-[#00ffcc] transition-all cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <FaMoneyBillWave className="text-3xl text-[#00ffcc]" />
            <span className="text-xs text-gray-400 bg-[#00ffcc]/10 px-2 py-1 rounded">This Month</span>
          </div>
          <h3 className="text-sm text-gray-400 mb-2">Total Spent</h3>
          <p className="text-4xl font-bold text-[#00ffcc]">
            ৳{dashboardData.stats.totalSpent.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-2">Payment history</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-[#0f1512] border-2 border-[#00ffcc]/30 rounded-xl p-6">
        <h2 className="text-xl font-bold text-[#00ffcc] mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/dashboard/student/post-tuition"
            className="flex items-center gap-4 p-4 bg-[#00ffcc]/10 border-2 border-[#00ffcc]/30 rounded-lg hover:bg-[#00ffcc]/20 hover:border-[#00ffcc] transition-all group"
          >
            <div className="w-12 h-12 bg-[#00ffcc]/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <FaPlus className="text-2xl text-[#00ffcc]" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Post New Tuition</h3>
              <p className="text-sm text-gray-400">Find the perfect tutor</p>
            </div>
          </Link>

          <Link
            to="/dashboard/student/tuitions"
            className="flex items-center gap-4 p-4 bg-[#00ffcc]/10 border-2 border-[#00ffcc]/30 rounded-lg hover:bg-[#00ffcc]/20 hover:border-[#00ffcc] transition-all group"
          >
            <div className="w-12 h-12 bg-[#00ffcc]/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <FaEye className="text-2xl text-[#00ffcc]" />
            </div>
            <div>
              <h3 className="font-semibold text-white">View My Tuitions</h3>
              <p className="text-sm text-gray-400">Manage active tuitions</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-[#0f1512] border-2 border-[#00ffcc]/30 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-[#00ffcc]">Recent Activity</h2>
          <button className="text-sm text-gray-400 hover:text-[#00ffcc] transition-colors">
            View All
          </button>
        </div>
        
        {dashboardData.recentActivities.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400">No recent activities</p>
          </div>
        ) : (
          <div className="space-y-3">
            {dashboardData.recentActivities.map((activity) => (
              <div 
                key={activity._id}
                className="flex items-start gap-3 p-3 bg-[#00ffcc]/5 rounded-lg hover:bg-[#00ffcc]/10 transition-all"
              >
                <div className={`w-2 h-2 ${getActivityIcon(activity.type)} rounded-full mt-2 ${
                  activity.type === 'application_received' ? 'animate-pulse' : ''
                }`}></div>
                <div className="flex-1">
                  <p className="text-gray-300">{activity.message}</p>
                  <span className="text-xs text-gray-500">
                    {formatTimeAgo(activity.createdAt)}
                  </span>
                </div>
                {activity.actionUrl && (
                  <Link 
                    to={activity.actionUrl}
                    className="text-sm text-[#00ffcc] hover:underline"
                  >
                    View
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upcoming Sessions */}
      <div className="bg-[#0f1512] border-2 border-[#00ffcc]/30 rounded-xl p-6">
        <h2 className="text-xl font-bold text-[#00ffcc] mb-4">Upcoming Sessions</h2>
        
        {dashboardData.upcomingSessions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400">No upcoming sessions</p>
          </div>
        ) : (
          <div className="space-y-3">
            {dashboardData.upcomingSessions.map((session) => (
              <div 
                key={session._id}
                className="flex items-center justify-between p-4 bg-[#00ffcc]/5 border border-[#00ffcc]/20 rounded-lg hover:bg-[#00ffcc]/10 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#00ffcc]/20 rounded-lg flex items-center justify-center">
                    <FaChalkboardTeacher className="text-xl text-[#00ffcc]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{session.subject} - {session.topic}</h3>
                    <p className="text-sm text-gray-400">with {session.tutorName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-[#00ffcc]">
                    {new Date(session.date).toLocaleDateString('en-US', { weekday: 'long' })}
                  </p>
                  <p className="text-xs text-gray-400">{session.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboardHome;