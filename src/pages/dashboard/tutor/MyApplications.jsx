import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Clock, CheckCircle, XCircle, Trash2, MapPin, BookOpen, DollarSign } from 'lucide-react';

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/applications/my-applications', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setApplications(data.applications);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async (applicationId) => {
    if (!confirm('Are you sure you want to withdraw this application?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/applications/${applicationId}/withdraw`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      
      if (data.success) {
        alert('Application withdrawn successfully');
        fetchApplications();
      }
    } catch (error) {
      alert('Error withdrawing application');
    }
  };

  const getStatusBadge = (status) => {
    const config = {
      pending: { icon: <Clock size={16} />, class: 'neon-border-blue text-blue-400' },
      accepted: { icon: <CheckCircle size={16} />, class: 'neon-border-green text-green-400' },
      rejected: { icon: <XCircle size={16} />, class: 'border-red-500 text-red-400' },
      withdrawn: { icon: <XCircle size={16} />, class: 'border-gray-500 text-gray-400' }
    };
    const { icon, class: className } = config[status] || config.pending;

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${className}`}>
        {icon}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const filteredApplications = applications.filter(app => 
    filter === 'all' || app.status === filter
  );

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    accepted: applications.filter(a => a.status === 'accepted').length,
    rejected: applications.filter(a => a.status === 'rejected').length
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

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-7xl mx-auto p-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-4xl font-bold gradient-text mb-2">My Applications</h1>
        <p className="text-gray-400">Track and manage your tuition applications</p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total', value: stats.total, color: 'pink', border: 'neon-border-pink' },
          { label: 'Pending', value: stats.pending, color: 'blue', border: 'neon-border-blue' },
          { label: 'Accepted', value: stats.accepted, color: 'green', border: 'neon-border-green' },
          { label: 'Rejected', value: stats.rejected, color: 'red', border: 'border-red-500' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            className={`card-neon ${stat.border} rounded-lg p-6`}
          >
            <p className="text-gray-400 text-sm">{stat.label} Applications</p>
            <motion.p
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
              className={`text-4xl font-bold neon-text-${stat.color}`}
            >
              {stat.value}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>

      {/* Filter Tabs */}
      <motion.div variants={itemVariants} className="card-neon rounded-lg mb-6">
        <div className="flex flex-wrap gap-2 p-4">
          {['all', 'pending', 'accepted', 'rejected'].map((status) => (
            <motion.button
              key={status}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === status
                  ? 'btn-neon btn-neon-pink'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Applications List */}
      <AnimatePresence mode="wait">
        {filteredApplications.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="card-neon card-neon-pink rounded-lg p-12 text-center"
          >
            <FileText size={48} className="mx-auto text-pink-500 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No applications found</h3>
            <p className="text-gray-400">
              {filter === 'all' 
                ? 'You haven\'t applied to any tuitions yet'
                : `No ${filter} applications`
              }
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="list"
            variants={containerVariants}
            className="space-y-4"
          >
            {filteredApplications.map((app, index) => (
              <motion.div
                key={app._id}
                variants={itemVariants}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02, x: 10 }}
                className="card-neon card-neon-blue rounded-lg p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {app.tuition?.title || 'Tuition Post'}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                      <div className="flex items-center gap-1">
                        <BookOpen size={16} className="text-cyan-400" />
                        <span>{app.tuition?.subject} - {app.tuition?.grade}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={16} className="text-green-400" />
                        <span>{app.tuition?.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign size={16} className="text-pink-400" />
                        <span>৳{app.tuition?.salary}/month</span>
                      </div>
                    </div>
                  </div>
                  {getStatusBadge(app.status)}
                </div>

                {/* Application Details */}
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="neon-border-blue bg-blue-500/5 rounded-lg p-4 mb-4"
                >
                  <p className="text-sm font-medium text-blue-400 mb-2">Your Message:</p>
                  <p className="text-sm text-gray-300 leading-relaxed">{app.message}</p>
                  {app.proposedRate && (
                    <p className="text-sm text-gray-300 mt-2">
                      <span className="font-medium text-cyan-400">Proposed Rate:</span> ৳{app.proposedRate}/month
                    </p>
                  )}
                </motion.div>

                {/* Footer */}
                <div className="flex justify-between items-center text-sm">
                  <div className="text-gray-400">
                    Applied on {new Date(app.appliedAt || app.createdAt).toLocaleDateString('en-GB')}
                  </div>

                  {app.status === 'pending' && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleWithdraw(app._id)}
                      className="flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition border border-red-500/30"
                    >
                      <Trash2 size={16} />
                      Withdraw
                    </motion.button>
                  )}
                </div>

                {app.status === 'rejected' && app.rejectionReason && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 border border-red-500/30 bg-red-500/10 rounded-lg p-3"
                  >
                    <p className="text-sm font-medium text-red-400 mb-1">Rejection Reason:</p>
                    <p className="text-sm text-red-300">{app.rejectionReason}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}