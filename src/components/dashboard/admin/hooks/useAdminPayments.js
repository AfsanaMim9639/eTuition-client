// src/components/dashboard/admin/hooks/useAdminPayments.js

import { useState } from 'react';
import { fetchPayments } from '../utils/adminApi';
import { generateMockPayments } from '../utils/mockDataGenerators';

export const useAdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadPayments = async () => {
    setLoading(true);
    try {
      const data = await fetchPayments();
      if (data.success) {
        setPayments(data.payments || []);
      } else {
        throw new Error('Failed to fetch payments');
      }
    } catch (err) {
      console.error('Error fetching payments:', err);
      setPayments(generateMockPayments());
    } finally {
      setLoading(false);
    }
  };

  return {
    payments,
    loading,
    loadPayments
  };
};