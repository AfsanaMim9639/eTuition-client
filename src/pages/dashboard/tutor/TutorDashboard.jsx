import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  BookOpen, 
  DollarSign, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Zap
} from 'lucide-react';

export default function TutorDashboard() {
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
      const token = localStorage.getItem('token');
      
      const appsResponse = await fetch('http://localhost:5000/api/applications/my-applications', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const appsData = await appsResponse.json();
      
      const ongoingResponse = await fetch('http://localhost:5000/api/applications/tutor/ongoing', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const ongoingData = await ongoingResponse.json();

      if (appsData.success) {
        const applications = appsData.applications || [];
        const ongoing = ongoingData.applications || [];
        
        const total = applications.length;
        const pending = applications.filter(a => a.status === 'pending').length;
        const accepted = applications.filter(a => a.status === 'accepted').length;
        const active = ongoing.length;
        
        const totalEarnings = ongoing.reduce((sum, app) => 
          sum + (app.proposedRate || app.tuition?.salary || 0), 0
        );

        setStats({
          totalApplications: total,
          pendingApplications: pending,
          activeTuitions: active,
          totalEarnings: totalEarnings,
          thisMonthEarnings: totalEarnings,
          acceptanceRate: total > 0 ? Math.round((accepted / total) * 100) : 0
        });

        setRecentApplications(applications.slice(0, 5));
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'neon-border-blue text-blue-400',
      accepted: 'neon-border-green text-green-400',
      rejected: 'border-red-500 text-red-400',
      withdrawn: 'border-gray-500 text-gray-400'
    };
    return styles[status] || styles.pending;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="spinner-neon w-12 h-12"
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
      gradient: 'from-pink-500 to-purple-600'
    },
    { 
      label: 'Pending', 
      value: stats.pendingApplications, 
      icon: Clock, 
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-600'
    },
    { 
      label: 'Active Tuitions', 
      value: stats.activeTuitions, 
      icon: BookOpen, 
      color: 'green',
      gradient: 'from-green-500 to-emerald-600'
    },
    { 
      label: 'Monthly Earnings', 
      value: `৳${stats.thisMonthEarnings.toLocaleString()}`, 
      icon: DollarSign, 
      color: 'purple',
      gradient: 'from-purple-500 to-pink-600'
    }
  ];

  const quickActions = [
    { label: 'Browse Tuitions', icon: BookOpen, color: 'blue', href: '/tuitions' },
    { label: 'My Applications', icon: FileText, color: 'yellow', href: '/tutor/applications' },
    { label: 'Ongoing Tuitions', icon: CheckCircle, color: 'green', href: '/tutor/ongoing' },
    { label: 'Revenue History', icon: DollarSign, color: 'purple', href: '/tutor/revenue' }
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-7xl mx-auto p-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="inline-flex items-center gap-2 mb-4"
        >
          <Zap className="text-pink-500" size={32} />
          <h1 className="text-4xl font-bold gradient-text">Tutor Dashboard</h1>
        </motion.div>
        <p className="text-gray-400">Welcome back! Here's your overview</p>
      </motion.div>

      {/* Main Stats Grid */}
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              className={`card-neon neon-border-${card.color} rounded-lg p-6 bg-gradient-to-br ${card.gradient} bg-opacity-10`}
            >
              <div className="flex items-center justify-between mb-4">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white bg-opacity-10 backdrop-blur rounded-lg p-3"
                >
                  <Icon size={24} className={`neon-text-${card.color}`} />
                </motion.div>
                <TrendingUp size={20} className="text-gray-400" />
              </div>
              <p className="text-gray-300 text-sm mb-1">{card.label}</p>
              <motion.p
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
                className={`text-3xl font-bold neon-text-${card.color}`}
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
        <motion.div variants={itemVariants} className="card-neon card-neon-pink rounded-lg p-6">
          <h2 className="text-xl font-bold neon-text-pink mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.a
                  key={action.label}
                  href={action.href}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, x: 10 }}
                  className={`flex items-center justify-between p-4 card-neon neon-border-${action.color} rounded-lg transition group`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`neon-text-${action.color}`} size={20} />
                    <span className="font-medium text-white">{action.label}</span>
                  </div>
                  <ArrowRight className={`neon-text-${action.color} group-hover:translate-x-2 transition`} size={20} />
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        {/* Recent Applications */}
        <motion.div variants={itemVariants} className="lg:col-span-2 card-neon card-neon-blue rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold neon-text-blue">Recent Applications</h2>
            <a href="/tutor/applications" className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">
              View All →
            </a>
          </div>

          {recentApplications.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <FileText size={48} className="mx-auto text-cyan-500 mb-3" />
              <p className="text-gray-400">No applications yet</p>
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
                  className="flex items-center justify-between p-4 border border-cyan-500/30 rounded-lg hover:border-cyan-500/60 hover:shadow-lg hover:shadow-cyan-500/20 transition"
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
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(app.status)}`}>
                      {app.status}
                    </span>
                    <span className="text-sm font-semibold neon-text-green">
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
        className="mt-6 card-neon neon-border-pink rounded-lg p-6 bg-gradient-to-r from-indigo-500/20 to-purple-600/20"
      >
        <h3 className="text-xl font-bold gradient-text mb-4">Performance Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Acceptance Rate', value: `${stats.acceptanceRate}%`, color: 'pink' },
            { label: 'Total Revenue', value: `৳${stats.totalEarnings.toLocaleString()}`, color: 'blue' },
            { label: 'Avg. per Tuition', value: `৳${stats.activeTuitions > 0 ? Math.round(stats.totalEarnings / stats.activeTuitions).toLocaleString() : 0}`, color: 'green' }
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1 + index * 0.1, type: "spring" }}
            >
              <p className="text-gray-300 text-sm mb-1">{item.label}</p>
              <p className={`text-3xl font-bold neon-text-${item.color}`}>{item.value}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}