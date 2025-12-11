import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Clock, CheckCircle, XCircle, Trash2, MapPin, BookOpen, DollarSign, Edit } from 'lucide-react';
import api from '../../../utils/api';
import toast from 'react-hot-toast';
import EditApplicationModal from '../../../components/tuition/EditApplicationModal';

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [editingApp, setEditingApp] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await api.get('/applications/my-applications');
      if (response.data.success) {
        setApplications(response.data.applications);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async (applicationId) => {
    if (!confirm('Are you sure you want to withdraw this application?')) return;

    try {
      const response = await api.patch(`/applications/${applicationId}/withdraw`);
      
      if (response.data.success) {
        toast.success('Application withdrawn successfully');
        fetchApplications();
      }
    } catch (error) {
      toast.error('Error withdrawing application');
    }
  };

  const handleEdit = (application) => {
    setEditingApp(application);
  };

  const handleUpdateSuccess = () => {
    fetchApplications();
    setEditingApp(null);
  };

  const getStatusBadge = (status) => {
    const config = {
      pending: { icon: <Clock size={16} />, class: 'border-blue-500/50 text-blue-400 bg-blue-500/10' },
      accepted: { icon: <CheckCircle size={16} />, class: 'border-green-500/50 text-green-400 bg-green-500/10' },
      rejected: { icon: <XCircle size={16} />, class: 'border-red-500/50 text-red-400 bg-red-500/10' },
      withdrawn: { icon: <XCircle size={16} />, class: 'border-gray-500/50 text-gray-400 bg-gray-500/10' }
    };
    const { icon, class: className } = config[status] || config.pending;

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border-2 ${className}`}>
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

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-7xl mx-auto p-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent mb-2">
          My Applications
        </h1>
        <p className="text-gray-400">Track and manage your tuition applications</p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total', value: stats.total, color: 'pink', border: 'border-pink-500/30', gradient: 'from-pink-500/10 to-purple-600/10' },
          { label: 'Pending', value: stats.pending, color: 'blue', border: 'border-blue-500/30', gradient: 'from-blue-500/10 to-cyan-600/10' },
          { label: 'Accepted', value: stats.accepted, color: 'green', border: 'border-green-500/30', gradient: 'from-green-500/10 to-emerald-600/10' },
          { label: 'Rejected', value: stats.rejected, color: 'red', border: 'border-red-500/30', gradient: 'from-red-500/10 to-orange-600/10' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            className={`border-2 ${stat.border} rounded-lg p-6 bg-gradient-to-br ${stat.gradient}`}
          >
            <p className="text-gray-400 text-sm">{stat.label} Applications</p>
            <motion.p
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
              className={`text-4xl font-bold text-${stat.color}-400`}
            >
              {stat.value}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>

      {/* Filter Tabs */}
      <motion.div variants={itemVariants} className="border-2 border-cyan-500/30 rounded-lg mb-6 bg-cyan-500/5">
        <div className="flex flex-wrap gap-2 p-4">
          {['all', 'pending', 'accepted', 'rejected'].map((status) => (
            <motion.button
              key={status}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === status
                  ? 'bg-gradient-to-r from-[#00ffcc] to-[#00ff88] text-[#0a0f0d]'
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
            className="border-2 border-pink-500/30 rounded-lg p-12 text-center bg-gradient-to-br from-pink-500/10 to-purple-600/10"
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
                className="border-2 border-blue-500/30 rounded-lg p-6 bg-gradient-to-br from-blue-500/10 to-cyan-600/10"
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
                  className="border-2 border-blue-500/30 bg-blue-500/5 rounded-lg p-4 mb-4"
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
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleEdit(app)}
                        className="flex items-center gap-2 px-4 py-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition border-2 border-blue-500/30"
                      >
                        <Edit size={16} />
                        Edit
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleWithdraw(app._id)}
                        className="flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition border-2 border-red-500/30"
                      >
                        <Trash2 size={16} />
                        Withdraw
                      </motion.button>
                    </div>
                  )}
                </div>

                {app.status === 'rejected' && app.rejectionReason && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 border-2 border-red-500/30 bg-red-500/10 rounded-lg p-3"
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

      {/* Edit Modal */}
      {editingApp && (
        <EditApplicationModal
          isOpen={!!editingApp}
          onClose={() => setEditingApp(null)}
          application={editingApp}
          onSuccess={handleUpdateSuccess}
        />
      )}
    </motion.div>
  );
}