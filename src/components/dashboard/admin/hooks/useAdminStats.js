// src/components/dashboard/admin/hooks/useAdminStats.js

import { useState, useEffect } from 'react';
import { fetchStats } from '../utils/adminApi';
import { generateMockStats } from '../utils/mockDataGenerators';

export const useAdminStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadStats = async () => {
    setLoading(true);
    try {
      const data = await fetchStats();
      if (data.success) {
        setStats(data.stats);
      } else {
        throw new Error('Failed to fetch stats');
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
      // Fallback to mock data
      setStats(generateMockStats());
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return { stats, loading, error, refetch: loadStats };
};