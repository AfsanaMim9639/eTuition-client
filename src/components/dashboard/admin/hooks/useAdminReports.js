// src/components/dashboard/admin/hooks/useAdminReports.js

import { useState, useRef } from 'react';
import { fetchFinancialReports, fetchPayments } from '../utils/adminApi'; // ✅ Both imported
import { toast } from 'react-hot-toast';

export const useAdminReports = () => {
  const [report, setReport] = useState(null);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const [filters, setFilters] = useState({
    status: '',
    paymentMethod: '',
    startDate: '',
    endDate: ''
  });

  const activeToastsRef = useRef(new Set());

  // Load financial reports
  const loadReports = async () => {
    setLoading(true);
    try {
      console.log('📊 Loading financial reports...');

      const data = await fetchFinancialReports();

      if (data.success) {
        setReport(data.report);
        console.log('✅ Reports loaded successfully:', data.report);
      } else {
        throw new Error(data.message || 'Failed to load reports');
      }

    } catch (error) {
      console.error('❌ Error loading reports:', error);

      const errorKey = 'load-reports-error';
      if (!activeToastsRef.current.has(errorKey)) {
        activeToastsRef.current.add(errorKey);
        toast.error(error.message || 'Failed to load financial reports', {
          id: errorKey,
          duration: 3000
        });
        setTimeout(() => activeToastsRef.current.delete(errorKey), 3000);
      }

      setReport(null);
    } finally {
      setLoading(false);
    }
  };

  // Load payments with filters
  const loadPayments = async (page = 1) => {
    setLoading(true);
    try {
      const params = {
        page,
        limit: 50 // Increased limit to show more transactions
      };

      // Add filters if they exist
      if (filters.status) params.status = filters.status;
      if (filters.paymentMethod) params.paymentMethod = filters.paymentMethod;
      if (filters.startDate) params.startDate = filters.startDate;
      if (filters.endDate) params.endDate = filters.endDate;

      console.log('💰 Loading payments with params:', params);

      const data = await fetchPayments(params);

      if (data.success) {
        setPayments(data.payments || []);
        setTotalPages(data.pagination?.totalPages || 1);
        setCurrentPage(data.pagination?.currentPage || 1);
        console.log('✅ Payments loaded:', data.payments?.length || 0);
        console.log('📄 Payment data sample:', data.payments?.[0]);
      } else {
        throw new Error(data.message || 'Failed to load payments');
      }

    } catch (error) {
      console.error('❌ Error loading payments:', error);

      const errorKey = 'load-payments-error';
      if (!activeToastsRef.current.has(errorKey)) {
        activeToastsRef.current.add(errorKey);
        toast.error(error.message || 'Failed to load payments', {
          id: errorKey,
          duration: 3000
        });
        setTimeout(() => activeToastsRef.current.delete(errorKey), 3000);
      }

      setPayments([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  return {
    // State
    report,
    payments,
    loading,
    currentPage,
    totalPages,
    filters,

    // Setters
    setFilters,

    // Actions
    loadReports,
    loadPayments
  };
};


