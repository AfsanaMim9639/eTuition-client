// src/components/dashboard/admin/tables/PaymentsTable.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, XCircle, DollarSign, Calendar, User } from 'lucide-react';

const PaymentsTable = ({ payments }) => {
  if (!payments || payments.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <DollarSign className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>No payment records found</p>
      </div>
    );
  }

  const getStatusConfig = (status) => {
    switch (status) {
      case 'completed':
      case 'paid':
        return {
          color: '#39FF14',
          icon: CheckCircle,
          label: 'Completed',
          bg: 'rgba(57, 255, 20, 0.1)'
        };
      case 'pending':
        return {
          color: '#FFA500',
          icon: Clock,
          label: 'Pending',
          bg: 'rgba(255, 165, 0, 0.1)'
        };
      case 'failed':
      case 'cancelled':
        return {
          color: '#FF0000',
          icon: XCircle,
          label: 'Failed',
          bg: 'rgba(255, 0, 0, 0.1)'
        };
      default:
        return {
          color: '#888',
          icon: Clock,
          label: status,
          bg: 'rgba(136, 136, 136, 0.1)'
        };
    }
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div 
      className="overflow-x-auto rounded-xl border" 
      style={{ 
        backgroundColor: 'rgba(18, 18, 18, 0.5)',
        borderColor: 'rgba(255, 16, 240, 0.2)'
      }}
    >
      <table className="w-full">
        <thead>
          <tr style={{ borderBottom: '2px solid rgba(255, 16, 240, 0.2)' }}>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Transaction ID</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Student</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Tutor</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Amount</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Method</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, idx) => {
            const statusConfig = getStatusConfig(payment.status);
            const StatusIcon = statusConfig.icon;

            return (
              <motion.tr
                key={payment._id || payment.transactionId || idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors"
              >
                {/* Transaction ID */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-cyan-400" />
                    <span className="text-gray-300 font-mono text-sm">
                      {payment.transactionId || payment._id?.slice(-8) || 'N/A'}
                    </span>
                  </div>
                </td>

                {/* Student */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{
                        background: 'linear-gradient(135deg, #39FF14, #00F0FF)'
                      }}
                    >
                      {payment.studentName?.charAt(0).toUpperCase() || 'S'}
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">
                        {payment.studentName || 'Unknown Student'}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {payment.studentEmail || ''}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Tutor */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{
                        background: 'linear-gradient(135deg, #FF10F0, #00F0FF)'
                      }}
                    >
                      {payment.tutorName?.charAt(0).toUpperCase() || 'T'}
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">
                        {payment.tutorName || 'Unknown Tutor'}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {payment.tutorEmail || ''}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Amount */}
                <td className="px-6 py-4">
                  <span 
                    className="text-lg font-bold"
                    style={{ color: '#00F0FF' }}
                  >
                    {formatAmount(payment.amount)}
                  </span>
                </td>

                {/* Payment Method */}
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-800 text-gray-300">
                    {payment.paymentMethod || payment.method || 'N/A'}
                  </span>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <div 
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 font-semibold text-sm"
                    style={{
                      backgroundColor: statusConfig.bg,
                      borderColor: statusConfig.color,
                      color: statusConfig.color
                    }}
                  >
                    <StatusIcon className="w-4 h-4" />
                    {statusConfig.label}
                  </div>
                </td>

                {/* Date */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {formatDate(payment.createdAt || payment.paymentDate)}
                  </div>
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>

      {/* Summary Footer */}
      <div 
        className="px-6 py-4 border-t"
        style={{ borderColor: 'rgba(255, 16, 240, 0.2)' }}
      >
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">
            Total Transactions: {payments.length}
          </span>
          <span className="text-white text-sm font-semibold">
            Total Revenue: {' '}
            <span style={{ color: '#39FF14' }}>
              {formatAmount(
                payments.reduce((sum, p) => {
                  if (p.status === 'completed' || p.status === 'paid') {
                    return sum + (p.amount || 0);
                  }
                  return sum;
                }, 0)
              )}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PaymentsTable;