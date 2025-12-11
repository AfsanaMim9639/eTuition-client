// src/components/dashboard/admin/tabs/ReportsTab.jsx
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Activity, Award } from 'lucide-react';
import PaymentsTable from '../tables/PaymentsTable';
import LoadingSpinner from '../ui/LoadingSpinner';

const ReportsTab = ({ stats, paymentsHook }) => {
  const { payments, loading, loadPayments } = paymentsHook;

  useEffect(() => {
    loadPayments();
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2 className="text-3xl font-bold mb-8">Reports & Analytics</h2>
      
      {/* Revenue Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Revenue, Transactions, Pending cards */}
      </div>
      
      {loading ? <LoadingSpinner /> : <PaymentsTable payments={payments.slice(0, 10)} />}
    </motion.div>
  );
};
export default ReportsTab;