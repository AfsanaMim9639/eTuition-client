import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, MapPin, DollarSign, User, Phone, Mail, Calendar, Clock, Zap } from 'lucide-react';

export default function OngoingTuitions() {
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOngoingTuitions();
  }, []);

  const fetchOngoingTuitions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/applications/tutor/ongoing', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setTuitions(data.applications || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
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
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-7xl mx-auto p-6"
    >
      {/* Header */}
      <motion.div variants={cardVariants} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Zap className="text-green-400" size={32} />
          <h1 className="text-4xl font-bold gradient-text">Ongoing Tuitions</h1>
        </div>
        <p className="text-gray-400">Manage your active tuition assignments</p>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={cardVariants}
        whileHover={{ scale: 1.02 }}
        className="neon-border-green rounded-lg p-6 mb-6 bg-gradient-to-r from-green-500/20 to-emerald-600/20"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-300 mb-1">Active Tuitions</p>
            <motion.p
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.3 }}
              className="text-5xl font-bold neon-text-green"
            >
              {tuitions.length}
            </motion.p>
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <BookOpen size={64} className="text-green-400 opacity-30" />
          </motion.div>
        </div>
      </motion.div>

      {/* Tuitions List */}
      {tuitions.length === 0 ? (
        <motion.div
          variants={cardVariants}
          className="card-neon card-neon-green rounded-lg p-12 text-center"
        >
          <BookOpen size={64} className="mx-auto text-green-500 mb-4" />
          <h3 className="text-2xl font-semibold neon-text-green mb-2">No ongoing tuitions</h3>
          <p className="text-gray-400">You don't have any active tuition assignments yet</p>
        </motion.div>
      ) : (
        <motion.div variants={containerVariants} className="space-y-6">
          {tuitions.map((app, index) => (
            <motion.div
              key={app._id}
              variants={cardVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              className="card-neon card-neon-green rounded-lg overflow-hidden"
            >
              {/* Header Section */}
              <div className="neon-border-green bg-gradient-to-r from-green-500/30 to-emerald-600/30 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <motion.h3
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-2xl font-bold neon-text-green mb-2"
                    >
                      {app.tuition?.title}
                    </motion.h3>
                    <div className="flex flex-wrap gap-4 text-green-200">
                      <div className="flex items-center gap-1">
                        <BookOpen size={16} />
                        <span>{app.tuition?.subject} - {app.tuition?.grade}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={16} />
                        <span>{app.tuition?.location}</span>
                      </div>
                    </div>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="neon-border-green bg-white/10 backdrop-blur rounded-lg px-4 py-2"
                  >
                    <p className="text-sm text-green-300">Monthly Salary</p>
                    <p className="text-2xl font-bold neon-text-green">
                      ৳{app.proposedRate || app.tuition?.salary}
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Body Section */}
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Student Information */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-white text-lg border-b border-green-500/30 pb-2">
                      Student Information
                    </h4>
                    
                    {app.student && (
                      <div className="space-y-3">
                        {[
                          { icon: User, label: 'Name', value: app.student.name, color: 'blue' },
                          { icon: Phone, label: 'Phone', value: app.student.phone || 'Not provided', color: 'green' },
                          { icon: Mail, label: 'Email', value: app.student.email, color: 'purple' }
                        ].map((item, i) => {
                          const Icon = item.icon;
                          return (
                            <motion.div
                              key={item.label}
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: index * 0.1 + i * 0.05 }}
                              className="flex items-center gap-3"
                            >
                              <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.5 }}
                                className={`w-10 h-10 neon-border-${item.color} rounded-full flex items-center justify-center bg-${item.color}-500/10`}
                              >
                                <Icon size={20} className={`neon-text-${item.color}`} />
                              </motion.div>
                              <div>
                                <p className="text-sm text-gray-400">{item.label}</p>
                                <p className="font-medium text-white">{item.value}</p>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Tuition Details */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-white text-lg border-b border-green-500/30 pb-2">
                      Tuition Details
                    </h4>
                    
                    <div className="space-y-3">
                      {app.tuition?.schedule && (
                        <motion.div
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <Clock size={20} className="text-cyan-400 mt-1" />
                          <div>
                            <p className="text-sm text-gray-400">Schedule</p>
                            <p className="text-white">{app.tuition.schedule}</p>
                          </div>
                        </motion.div>
                      )}

                      {app.tuition?.requirements && (
                        <motion.div
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 + 0.05 }}
                          className="flex items-start gap-3"
                        >
                          <BookOpen size={20} className="text-orange-400 mt-1" />
                          <div>
                            <p className="text-sm text-gray-400">Requirements</p>
                            <p className="text-white">{app.tuition.requirements}</p>
                          </div>
                        </motion.div>
                      )}

                      <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <Calendar size={20} className="text-green-400 mt-1" />
                        <div>
                          <p className="text-sm text-gray-400">Started On</p>
                          <p className="text-white">
                            {new Date(app.respondedAt || app.updatedAt).toLocaleDateString('en-GB')}
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Application Message */}
                {app.message && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className="mt-6 neon-border-green bg-green-500/5 rounded-lg p-4"
                  >
                    <p className="text-sm font-medium text-green-400 mb-2">Your Application Message:</p>
                    <p className="text-sm text-gray-300 leading-relaxed">{app.message}</p>
                  </motion.div>
                )}

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                  className="mt-6 flex gap-3"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 btn-neon btn-neon-green px-6 py-3 rounded-lg font-medium"
                  >
                    Contact Student
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 border border-green-500/30 text-green-400 rounded-lg hover:bg-green-500/10 transition font-medium"
                  >
                    View Details
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}