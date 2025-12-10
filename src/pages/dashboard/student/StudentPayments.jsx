import { useState, useEffect } from 'react';
import { 
  FaDollarSign, 
  FaCheckCircle, 
  FaClock, 
  FaTimesCircle,
  FaFileInvoice,
  FaCalendar,
  FaUser
} from 'react-icons/fa';
import { paymentAPI } from '../../../utils/api';

const StudentPayments = () => {
  const [payments, setPayments] = useState([]);
  const [stats, setStats] = useState({
    totalSpent: 0,
    totalTransactions: 0
  });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, completed, pending, failed

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await paymentAPI.getMyPayments();
      const paymentsData = response.data.payments || [];
      
      setPayments(paymentsData);
      setStats({
        totalSpent: response.data.totalSpent || 0,
        totalTransactions: response.data.totalTransactions || paymentsData.length
      });
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <FaCheckCircle className="text-green-400" />;
      case 'pending': return <FaClock className="text-yellow-400" />;
      case 'failed': return <FaTimesCircle className="text-red-400" />;
      default: return <FaClock className="text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'failed': return 'bg-red-500/20 text-red-400 border-red-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const filteredPayments = payments.filter(payment => {
    if (filter === 'all') return true;
    return payment.status === filter;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#00ffcc] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00ffcc] to-[#00ff88] bg-clip-text text-transparent">
          Payment History
        </h1>
        <p className="text-gray-400 mt-1">View all your payment transactions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-[#0f1512] to-[#0a0f0d] border-2 border-[#00ffcc]/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500">
              <FaDollarSign className="text-2xl text-white" />
            </div>
          </div>
          <p className="text-gray-400 text-sm mb-1">Total Spent</p>
          <p className="text-3xl font-bold text-white">{stats.totalSpent.toLocaleString()} BDT</p>
        </div>

        <div className="bg-gradient-to-br from-[#0f1512] to-[#0a0f0d] border-2 border-[#00ffcc]/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500">
              <FaFileInvoice className="text-2xl text-white" />
            </div>
          </div>
          <p className="text-gray-400 text-sm mb-1">Total Transactions</p>
          <p className="text-3xl font-bold text-white">{stats.totalTransactions}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        {['all', 'completed', 'pending', 'failed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              filter === status
                ? 'bg-gradient-to-r from-[#00ffcc] to-[#00ff88] text-[#0a0f0d]'
                : 'bg-[#00ffcc]/10 text-[#00ffcc] border-2 border-[#00ffcc]/30 hover:border-[#00ffcc]'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Payments List */}
      {filteredPayments.length > 0 ? (
        <div className="space-y-4">
          {filteredPayments.map((payment) => (
            <div
              key={payment._id}
              className="bg-gradient-to-br from-[#0f1512] to-[#0a0f0d] border-2 border-[#00ffcc]/30 rounded-xl p-6 hover:border-[#00ffcc] transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-3 bg-[#00ffcc]/10 rounded-lg">
                    {getStatusIcon(payment.status)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-white">
                        {payment.tuition?.title || 'Tuition Payment'}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(payment.status)}`}>
                        {payment.status}
                      </span>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-400">
                      {payment.tuition && (
                        <div className="flex items-center gap-2">
                          <FaFileInvoice className="text-[#00ff88]" />
                          <span>{payment.tuition.subject} • {payment.tuition.grade}</span>
                        </div>
                      )}
                      
                      {payment.tutor && (
                        <div className="flex items-center gap-2">
                          <FaUser className="text-[#00ff88]" />
                          <span>{payment.tutor.name}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2">
                        <FaCalendar className="text-[#00ff88]" />
                        <span>{new Date(payment.createdAt).toLocaleDateString()}</span>
                      </div>
                      
                      {payment.transactionId && (
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">TXN:</span>
                          <span className="font-mono text-xs">{payment.transactionId.slice(0, 20)}...</span>
                        </div>
                      )}
                    </div>

                    {payment.description && (
                      <p className="text-sm text-gray-400 mt-2">{payment.description}</p>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold text-[#00ffcc]">
                    {payment.amount.toLocaleString()} BDT
                  </p>
                  {payment.platformFee > 0 && (
                    <p className="text-xs text-gray-500 mt-1">
                      Platform fee: {payment.platformFee} BDT
                    </p>
                  )}
                </div>
              </div>

              {/* Payment Method */}
              {payment.paymentMethod && (
                <div className="pt-4 border-t border-[#00ffcc]/20">
                  <p className="text-sm text-gray-400">
                    Payment Method: <span className="text-white font-semibold capitalize">{payment.paymentMethod}</span>
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gradient-to-br from-[#0f1512] to-[#0a0f0d] border-2 border-[#00ffcc]/30 rounded-xl p-12 text-center">
          <FaFileInvoice className="text-6xl text-gray-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-300 mb-2">
            No {filter !== 'all' ? filter : ''} Payments
          </h3>
          <p className="text-gray-400">
            {filter !== 'all' 
              ? `You don't have any ${filter} payments`
              : 'Your payment history will appear here'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentPayments;