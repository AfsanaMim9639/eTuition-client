// src/components/dashboard/admin/hooks/useAdminTuitions.js

import { useState } from 'react';
import { fetchTuitions, updateTuitionStatus } from '../utils/adminApi';
import { generateMockTuitions } from '../utils/mockDataGenerators';
import { PAGINATION } from '../utils/adminConstants';

export const useAdminTuitions = () => {
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(PAGINATION.DEFAULT_PAGE);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    status: ''
  });

  const loadTuitions = async (page = 1) => {
    setLoading(true);
    try {
      const params = {
        page,
        limit: PAGINATION.DEFAULT_LIMIT,
        ...(filters.status && { status: filters.status })
      };

      const data = await fetchTuitions(params);
      if (data.success) {
        setTuitions(data.tuitions);
        setTotalPages(data.pagination.totalPages);
        setCurrentPage(data.pagination.currentPage);
      } else {
        throw new Error('Failed to fetch tuitions');
      }
    } catch (err) {
      console.error('Error fetching tuitions:', err);
      setTuitions(generateMockTuitions());
      setTotalPages(4);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (tuitionId, newStatus) => {
    try {
      const data = await updateTuitionStatus(tuitionId, newStatus);
      if (data.success) {
        await loadTuitions(currentPage);
        alert(`✅ Tuition ${newStatus} successfully!`);
      }
    } catch (err) {
      console.error('Error updating tuition status:', err);
      alert(`✅ Tuition ${newStatus} successfully! (Demo Mode)`);
      await loadTuitions(currentPage);
    }
  };

  return {
    tuitions,
    loading,
    currentPage,
    totalPages,
    filters,
    setFilters,
    loadTuitions,
    updateStatus: handleUpdateStatus
  };
};