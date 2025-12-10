import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Calendar, BookOpen, Download, Zap } from 'lucide-react';

export default function RevenueHistory() {
  const [earnings, setEarnings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEarnings: 0,
    thisMonth: 0,
    activeTuitions: 0,
    completedTuitions: 0
  });

  useEffect(() => {
    fetchRevenueData();
  }, []);

  const fetchRevenueData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/applications/tutor/revenue', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      
      if (data.success) {
        setEarnings(data.earnings || []);
        calculateStats(data.earnings || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (earningsData) => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const total = earningsData.reduce((sum, item) => sum + (item.amount || 0), 0);
    const thisMonth = earningsData
      .filter(item => {
        const date = new Date(item.date);
        return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
      })
      .reduce((sum, item) => sum + (item.amount || 0), 0);

    setStats({
      totalEarnings: total,
      thisMonth: thisMonth,
      activeTuitions: earningsData.filter(e => e.status === 'active').length,
      completedTuitions: earningsData.filter(e => e.status === 'completed').length
    });
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Tuition', 'Student', 'Amount', 'Status'];
    const rows = earnings.map(e => [
      new Date(e.date).toLocaleDateString('en-GB'),
      e.tuitionTitle || 'N/A',
      e.studentName || 'N/A',
      `৳${e.amount || 0}`,
      e.status || 'N/A'
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `revenue_history_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
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
    { label: 'Total Earnings', value: stats.totalEarnings, icon: DollarSign, color: 'pink', gradient: 'from-pink-500 to-purple-600' },
    { label: 'This Month', value: stats.thisMonth, icon: TrendingUp, color: 'blue', gradient: 'from-blue-500 to-cyan-600' },
    { label: 'Active Tuitions', value: stats.activeTuitions, icon: BookOpen, color: 'green', gradient: 'from-green-500 to-emerald-600' },
    { label: 'Completed', value: stats.completedTuitions, icon: Calendar, color: 'purple', gradient: 'from-purple-500 to-pink-600' }
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-7xl mx-auto p-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex justify-between items-center mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Zap className="text-purple-500" size={32} />
            <h1 className="text-4xl font-bold gradient-text">Revenue History</h1>
          </div>
          <p className="text-gray-400">Track your earnings and transaction history</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={exportToCSV}
          className="flex items-center gap-2 btn-neon btn-neon-green px-4 py-2 rounded-lg font-medium"
        >
          <Download size={20} />
          Export CSV
        </motion.button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                  className="bg-white bg-opacity-10 rounded-lg p-3"
                >
                  <Icon size={32} className={`neon-text-${card.color}`} />
                </motion.div>
              </div>
              <p className="text-gray-300 text-sm mb-1">{card.label}</p>
              <motion.p
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
                className={`text-3xl font-bold neon-text-${card.color}`}
              >
                {typeof card.value === 'number' && card.label.includes('Earnings') 
                  ? `৳${card.value.toLocaleString()}` 
                  : card.value}
              </motion.p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Revenue Table */}
      <motion.div variants={itemVariants} className="card-neon card-neon-blue rounded-lg overflow-hidden">
        <div className="p-6 border-b border-cyan-500/30">
          <h2 className="text-xl font-bold neon-text-blue">Transaction History</h2>
        </div>

        {earnings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-12 text-center"
          >
            <DollarSign size={64} className="mx-auto text-cyan-500 mb-4" />
            <h3 className="text-xl font-semibold neon-text-blue mb-2">No earnings yet</h3>
            <p className="text-gray-400">Your earnings will appear here once you start teaching</p>
          </motion.div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-cyan-500/10">
                <tr>
                  {['Date', 'Tuition', 'Student', 'Amount', 'Status'].map((header, i) => (
                    <motion.th
                      key={header}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="px-6 py-4 text-left text-sm font-semibold text-cyan-300"
                    >
                      {header}
                    </motion.th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-cyan-500/20">
                {earnings.map((earning, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ backgroundColor: 'rgba(0, 240, 255, 0.05)' }}
                    className="transition"
                  >
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {new Date(earning.date).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-white">{earning.tuitionTitle || 'N/A'}</p>
                      <p className="text-xs text-gray-400">{earning.subject}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {earning.studentName || 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <motion.span
                        whileHover={{ scale: 1.1 }}
                        className="text-lg font-bold neon-text-green"
                      >
                        ৳{(earning.amount || 0).toLocaleString()}
                      </motion.span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${
                        earning.status === 'completed'
                          ? 'neon-border-green text-green-400'
                          : earning.status === 'active'
                          ? 'neon-border-blue text-blue-400'
                          : 'border-gray-500 text-gray-400'
                      }`}>
                        {earning.status || 'N/A'}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Monthly Summary */}
      {earnings.length > 0 && (
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          className="mt-6 card-neon neon-border-pink rounded-lg p-6 bg-gradient-to-r from-indigo-500/20 to-purple-600/20"
        >
          <h3 className="text-xl font-bold gradient-text mb-4">Quick Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Average per Tuition', value: `৳${earnings.length > 0 ? Math.round(stats.totalEarnings / earnings.length) : 0}`, color: 'pink' },
              { label: 'Total Transactions', value: earnings.length, color: 'blue' },
              { label: 'Success Rate', value: `${earnings.length > 0 ? Math.round((stats.completedTuitions / earnings.length) * 100) : 0}%`, color: 'green' }
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 + index * 0.1, type: "spring" }}
              >
                <p className="text-gray-300 text-sm mb-1">{item.label}</p>
                <p className={`text-2xl font-bold neon-text-${item.color}`}>{item.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}