import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  BookOpen, 
  DollarSign, 
  TrendingUp, 
  Clock,
  CheckCircle,
  ArrowRight,
  Zap
} from 'lucide-react';
import api from '../../../utils/api';

export default function TutorDashboardHome() {
  const [stats, setStats] = useState({
    totalApplications: 0,
    pendingApplications: 0,
    activeTuitions: 0,
    totalEarnings: 0,
    thisMonthEarnings: 0,
    acceptanceRate: 0
  });
  const [recentApplications, setRecentApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch tutor's applications
      const appsResponse = await api.get('/applications/my-applications');
      const applications = appsResponse.data.applications || [];
      
      // Calculate stats
      const total = applications.length;
      const pending = applications.filter(a => a.status === 'pending').length;
      const accepted = applications.filter(a => a.status === 'accepted').length;
      const active = accepted; // Accepted applications are considered active
      
      // Calculate earnings (from accepted applications)
      const totalEarnings = applications
        .filter(a => a.status === 'accepted')
        .reduce((sum, app) => sum + (app.proposedRate || app.tuition?.salary || 0), 0);

      setStats({
        totalApplications: total,
        pendingApplications: pending,
        activeTuitions: active,
        totalEarnings: totalEarnings,
        thisMonthEarnings: totalEarnings,
        acceptanceRate: total > 0 ? Math.round((accepted / total) * 100) : 0
      });

      // Get recent 5 applications
      setRecentApplications(applications.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'border-blue-500/50 text-blue-400 bg-blue-500/10',
      accepted: 'border-green-500/50 text-green-400 bg-green-500/10',
      rejected: 'border-red-500/50 text-red-400 bg-red-500/10',
      withdrawn: 'border-gray-500/50 text-gray-400 bg-gray-500/10'
    };
    return styles[status] || styles.pending;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-[#00ffcc] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const statCards = [
    { 
      label: 'Total Applications', 
      value: stats.totalApplications, 
      icon: FileText, 
      color: 'pink',
      gradient: 'from-pink-500 to-purple-600',
      borderColor: 'border-pink-500/30 hover:border-pink-500',
      textColor: 'text-pink-400'
    },
    { 
      label: 'Pending', 
      value: stats.pendingApplications, 
      icon: Clock, 
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-600',
      borderColor: 'border-blue-500/30 hover:border-blue-500',
      textColor: 'text-blue-400'
    },
    { 
      label: 'Active Tuitions', 
      value: stats.activeTuitions, 
      icon: BookOpen, 
      color: 'green',
      gradient: 'from-green-500 to-emerald-600',
      borderColor: 'border-green-500/30 hover:border-green-500',
      textColor: 'text-green-400'
    },
    { 
      label: 'Monthly Earnings', 
      value: `৳${stats.thisMonthEarnings.toLocaleString()}`, 
      icon: DollarSign, 
      color: 'purple',
      gradient: 'from-purple-500 to-pink-600',
      borderColor: 'border-purple-500/30 hover:border-purple-500',
      textColor: 'text-purple-400'
    }
  ];

  const quickActions = [
    { 
      label: 'Browse Tuitions', 
      icon: BookOpen, 
      color: 'blue', 
      href: '/tuitions',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30 hover:border-blue-500',
      textColor: 'text-blue-400'
    },
    { 
      label: 'My Applications', 
      icon: FileText, 
      color: 'yellow', 
      href: '/dashboard/tutor/applications',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/30 hover:border-yellow-500',
      textColor: 'text-yellow-400'
    },
    { 
      label: 'Ongoing Tuitions', 
      icon: CheckCircle, 
      color: 'green', 
      href: '/dashboard/tutor/ongoing',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30 hover:border-green-500',
      textColor: 'text-green-400'
    },
    { 
      label: 'Revenue History', 
      icon: DollarSign, 
      color: 'purple', 
      href: '/dashboard/tutor/revenue',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30 hover:border-purple-500',
      textColor: 'text-purple-400'
    }
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8 max-w-6xl mx-auto"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="inline-flex items-center gap-2 mb-4"
        >
          <Zap className="text-pink-500" size={32} />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
            Tutor Dashboard
          </h1>
        </motion.div>
        <p className="text-gray-400">Welcome back! Here's your overview</p>
      </motion.div>

      {/* Main Stats Grid */}
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              className={`border-2 ${card.borderColor} rounded-lg p-6 bg-gradient-to-br ${card.gradient} bg-opacity-10 backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-2xl`}
            >
              <div className="flex items-center justify-between mb-4">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white bg-opacity-10 backdrop-blur rounded-lg p-3"
                >
                  <Icon size={24} className={card.textColor} />
                </motion.div>
                <TrendingUp size={20} className="text-gray-400" />
              </div>
              <p className="text-gray-300 text-sm mb-1">{card.label}</p>
              <motion.p
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
                className={`text-3xl font-bold ${card.textColor}`}
              >
                {card.value}
              </motion.p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Quick Actions & Recent Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <motion.div 
          variants={itemVariants} 
          className="border-2 border-pink-500/30 rounded-lg p-6 bg-gradient-to-br from-pink-500/10 to-purple-600/10 backdrop-blur-sm"
        >
          <h2 className="text-xl font-bold text-pink-400 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.div key={action.label}>
                  <Link
                    to={action.href}
                    className={`flex items-center justify-between p-4 border-2 ${action.borderColor} ${action.bgColor} rounded-lg transition-all duration-300 group`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={action.textColor} size={20} />
                      <span className="font-medium text-white">{action.label}</span>
                    </div>
                    <ArrowRight className={`${action.textColor} group-hover:translate-x-2 transition-transform`} size={20} />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Recent Applications */}
        <motion.div 
          variants={itemVariants} 
          className="lg:col-span-2 border-2 border-cyan-500/30 rounded-lg p-6 bg-gradient-to-br from-blue-500/10 to-cyan-600/10 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-cyan-400">Recent Applications</h2>
            <Link 
              to="/dashboard/tutor/applications" 
              className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
            >
              View All →
            </Link>
          </div>

          {recentApplications.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <FileText size={48} className="mx-auto text-cyan-500 mb-3 opacity-50" />
              <p className="text-gray-400 mb-4">No applications yet</p>
              <Link
                to="/tuitions"
                className="inline-block px-6 py-2 bg-cyan-500/20 border-2 border-cyan-500/50 text-cyan-400 rounded-lg hover:bg-cyan-500/30 hover:border-cyan-500 transition-all"
              >
                Browse Tuitions
              </Link>
            </motion.div>
          ) : (
            <div className="space-y-3">
              {recentApplications.map((app, index) => (
                <motion.div
                  key={app._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-center justify-between p-4 border-2 border-cyan-500/30 rounded-lg hover:border-cyan-500/60 hover:shadow-lg hover:shadow-cyan-500/20 transition-all bg-cyan-500/5"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">
                      {app.tuition?.title || 'Tuition Post'}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {app.tuition?.subject} • {app.tuition?.location}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border-2 ${getStatusBadge(app.status)}`}>
                      {app.status}
                    </span>
                    <span className="text-sm font-semibold text-green-400">
                      ৳{app.proposedRate || app.tuition?.salary}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Performance Summary */}
      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        className="border-2 border-pink-500/30 rounded-lg p-6 bg-gradient-to-r from-indigo-500/20 to-purple-600/20 backdrop-blur-sm"
      >
        <h3 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-4">
          Performance Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Acceptance Rate', value: `${stats.acceptanceRate}%`, color: 'text-pink-400' },
            { label: 'Total Revenue', value: `৳${stats.totalEarnings.toLocaleString()}`, color: 'text-blue-400' },
            { label: 'Avg. per Tuition', value: `৳${stats.activeTuitions > 0 ? Math.round(stats.totalEarnings / stats.activeTuitions).toLocaleString() : 0}`, color: 'text-green-400' }
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1 + index * 0.1, type: "spring" }}
            >
              <p className="text-gray-300 text-sm mb-1">{item.label}</p>
              <p className={`text-3xl font-bold ${item.color}`}>{item.value}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}