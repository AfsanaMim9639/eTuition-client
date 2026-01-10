// src/components/dashboard/admin/tables/PaymentsTable.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, XCircle, DollarSign, Calendar } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';

const PaymentsTable = ({ payments }) => {
  const { isDark } = useTheme();

  if (!payments || payments.length === 0) {
    return (
      <div 
        className="text-center py-12"
        style={{ color: isDark ? '#9ca3af' : '#6b7280' }}
      >
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
          bg: isDark ? 'rgba(57, 255, 20, 0.1)' : 'rgba(57, 255, 20, 0.08)'
        };
      case 'pending':
        return {
          color: '#FFA500',
          icon: Clock,
          label: 'Pending',
          bg: isDark ? 'rgba(255, 165, 0, 0.1)' : 'rgba(255, 165, 0, 0.08)'
        };
      case 'failed':
      case 'cancelled':
        return {
          color: '#FF0000',
          icon: XCircle,
          label: 'Failed',
          bg: isDark ? 'rgba(255, 0, 0, 0.1)' : 'rgba(255, 0, 0, 0.08)'
        };
      default:
        return {
          color: '#888',
          icon: Clock,
          label: status,
          bg: isDark ? 'rgba(136, 136, 136, 0.1)' : 'rgba(136, 136, 136, 0.08)'
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
        backgroundColor: isDark ? 'rgba(18, 18, 18, 0.5)' : 'rgba(255, 255, 255, 0.8)',
        borderColor: isDark ? 'rgba(255, 16, 240, 0.2)' : 'rgba(255, 16, 240, 0.15)'
      }}
    >
      <table className="w-full">
        <thead>
          <tr style={{ 
            borderBottom: isDark 
              ? '2px solid rgba(255, 16, 240, 0.2)' 
              : '2px solid rgba(255, 16, 240, 0.15)' 
          }}>
            <th 
              className="px-6 py-4 text-left text-sm font-semibold"
              style={{ color: isDark ? '#d1d5db' : '#4b5563' }}
            >
              Transaction ID
            </th>
            <th 
              className="px-6 py-4 text-left text-sm font-semibold"
              style={{ color: isDark ? '#d1d5db' : '#4b5563' }}
            >
              Student
            </th>
            <th 
              className="px-6 py-4 text-left text-sm font-semibold"
              style={{ color: isDark ? '#d1d5db' : '#4b5563' }}
            >
              Tutor
            </th>
            <th 
              className="px-6 py-4 text-left text-sm font-semibold"
              style={{ color: isDark ? '#d1d5db' : '#4b5563' }}
            >
              Amount
            </th>
            <th 
              className="px-6 py-4 text-left text-sm font-semibold"
              style={{ color: isDark ? '#d1d5db' : '#4b5563' }}
            >
              Method
            </th>
            <th 
              className="px-6 py-4 text-left text-sm font-semibold"
              style={{ color: isDark ? '#d1d5db' : '#4b5563' }}
            >
              Status
            </th>
            <th 
              className="px-6 py-4 text-left text-sm font-semibold"
              style={{ color: isDark ? '#d1d5db' : '#4b5563' }}
            >
              Date
            </th>
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
                className="transition-colors"
                style={{
                  borderBottom: isDark ? '1px solid #1f2937' : '1px solid #e5e7eb'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isDark 
                    ? 'rgba(17, 24, 39, 0.5)' 
                    : 'rgba(249, 250, 251, 0.8)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {/* Transaction ID */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-cyan-400" />
                    <span 
                      className="font-mono text-sm"
                      style={{ color: isDark ? '#d1d5db' : '#4b5563' }}
                    >
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
                      <p 
                        className="text-sm font-medium"
                        style={{ color: isDark ? '#ffffff' : '#111827' }}
                      >
                        {payment.studentName || 'Unknown Student'}
                      </p>
                      <p 
                        className="text-xs"
                        style={{ color: isDark ? '#9ca3af' : '#6b7280' }}
                      >
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
                      <p 
                        className="text-sm font-medium"
                        style={{ color: isDark ? '#ffffff' : '#111827' }}
                      >
                        {payment.tutorName || 'Unknown Tutor'}
                      </p>
                      <p 
                        className="text-xs"
                        style={{ color: isDark ? '#9ca3af' : '#6b7280' }}
                      >
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
                  <span 
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor: isDark ? 'rgba(31, 41, 55, 0.8)' : 'rgba(243, 244, 246, 0.8)',
                      color: isDark ? '#d1d5db' : '#4b5563'
                    }}
                  >
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
                  <div 
                    className="flex items-center gap-2 text-sm"
                    style={{ color: isDark ? '#d1d5db' : '#4b5563' }}
                  >
                    <Calendar 
                      className="w-4 h-4"
                      style={{ color: isDark ? '#9ca3af' : '#6b7280' }}
                    />
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
        style={{ 
          borderColor: isDark 
            ? 'rgba(255, 16, 240, 0.2)' 
            : 'rgba(255, 16, 240, 0.15)' 
        }}
      >
        <div className="flex justify-between items-center">
          <span 
            className="text-sm"
            style={{ color: isDark ? '#9ca3af' : '#6b7280' }}
          >
            Total Transactions: {payments.length}
          </span>
          <span 
            className="text-sm font-semibold"
            style={{ color: isDark ? '#ffffff' : '#111827' }}
          >
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