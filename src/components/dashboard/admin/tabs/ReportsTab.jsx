// src/components/dashboard/admin/tabs/ReportsTab.jsx
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, CreditCard, Activity } from 'lucide-react';
import PaymentsTable from '../tables/PaymentsTable';
import StatCard from '../cards/StatCard';
import LoadingSpinner from '../ui/LoadingSpinner';

const ReportsTab = ({ reportsHook }) => {
  // Handle case where hook is not passed
  if (!reportsHook) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p>Reports hook not initialized</p>
      </div>
    );
  }

  const { report, payments, loading, loadReports, loadPayments } = reportsHook;

  useEffect(() => {
    loadReports();
    loadPayments(1);
  }, []);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0
    }).format(amount || 0);
  };

  // Loading state
  if (loading && !report) {
    return <LoadingSpinner />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Reports & Analytics</h2>
          <p className="text-sm text-gray-400 mt-1">
            View platform earnings and transaction history
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      {report && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Platform Earnings */}
          <StatCard
            title="Platform Earnings"
            value={formatCurrency(report.summary?.totalEarnings || 0)}
            icon={DollarSign}
            color="#39FF14"
            subtext="Total platform fees collected"
            index={0}
          />

          {/* Total Transaction Amount */}
          <StatCard
            title="Total Transactions"
            value={formatCurrency(report.summary?.totalTransactionAmount || 0)}
            icon={TrendingUp}
            color="#00F0FF"
            subtext="All successful payments"
            index={1}
          />

          {/* Completed Transactions Count */}
          <StatCard
            title="Completed Orders"
            value={report.summary?.totalCompletedTransactions || 0}
            icon={CreditCard}
            color="#FF10F0"
            subtext="Successfully processed"
            index={2}
          />

          {/* Average Transaction */}
          <StatCard
            title="Average Transaction"
            value={formatCurrency(report.summary?.averageTransactionAmount || 0)}
            icon={Activity}
            color="#FFA500"
            subtext="Per transaction"
            index={3}
          />
        </div>
      )}

      {/* Payment Method Stats */}
      {report?.paymentMethodStats && report.paymentMethodStats.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-xl border-2"
          style={{
            background: 'linear-gradient(135deg, rgba(18, 18, 18, 0.95), rgba(26, 26, 26, 0.95))',
            borderColor: 'rgba(255, 16, 240, 0.2)'
          }}
        >
          <h3 className="text-lg font-bold text-white mb-4">Payment Methods Distribution</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {report.paymentMethodStats.map((method, idx) => (
              <div key={idx} className="text-center p-4 rounded-lg bg-gray-900/50">
                <p className="text-gray-400 text-sm mb-1">{method._id?.toUpperCase() || 'Unknown'}</p>
                <p className="text-2xl font-bold text-cyan-400">{method.count}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatCurrency(method.totalAmount)}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Transactions Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Recent Transactions</h3>
          <span className="text-sm text-gray-400">
            {payments.length} transactions
          </span>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <PaymentsTable payments={payments} />
        )}
      </motion.div>
    </motion.div>
  );
};

export default ReportsTab;