// src/components/dashboard/admin/hooks/useAdminTuitions.js

import { useState, useRef } from 'react';
import { 
  fetchTuitions, 
  getTuitionById, 
  updateTuitionStatus, 
  approveTuition, 
  rejectTuition 
} from '../utils/adminApi';
import { PAGINATION } from '../utils/adminConstants';
import { toast } from 'react-hot-toast';

export const useAdminTuitions = () => {
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(PAGINATION.DEFAULT_PAGE);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedTuition, setSelectedTuition] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  
  const [filters, setFilters] = useState({
    status: '',
    subject: '',
    tutoring_type: '',
    grade: '',
    search: '',
    approvalStatus: ''
  });

  // ✅ FIX: Use useRef to track active toasts
  const activeToastsRef = useRef(new Set());

  // Load tuitions with filters
  const loadTuitions = async (page = 1) => {
    setLoading(true);
    try {
      const params = {
        page,
        limit: PAGINATION.DEFAULT_LIMIT
      };

      // Add filters if they exist
      if (filters.status) params.status = filters.status;
      if (filters.subject) params.subject = filters.subject;
      if (filters.tutoring_type) params.tutoring_type = filters.tutoring_type;
      if (filters.grade) params.grade = filters.grade;
      if (filters.search) params.search = filters.search;
      if (filters.approvalStatus) params.approvalStatus = filters.approvalStatus;

      console.log('🔍 Loading tuitions with params:', params);

      const data = await fetchTuitions(params);
      
      if (data.success) {
        setTuitions(data.tuitions || []);
        setTotalPages(data.pagination?.totalPages || 1);
        setCurrentPage(data.pagination?.currentPage || 1);
        console.log('✅ Tuitions loaded:', data.tuitions?.length || 0);
      } else {
        throw new Error(data.message || 'Failed to fetch tuitions');
      }
      
    } catch (err) {
      console.error('Error fetching tuitions:', err);
      
      // Handle authentication errors
      if (err.message.includes('Authentication token not found') || 
          err.message.includes('Session expired')) {
        toast.error('Please login to continue', { duration: 4000 });
        // Redirect to login after a short delay
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
        return;
      }
      
      // Show error toast only once
      const errorKey = 'load-tuitions-error';
      if (!activeToastsRef.current.has(errorKey)) {
        activeToastsRef.current.add(errorKey);
        toast.error(err.message || 'Failed to load tuitions', {
          id: errorKey,
          duration: 3000
        });
        setTimeout(() => activeToastsRef.current.delete(errorKey), 3000);
      }
      
      setTuitions([]);
      setTotalPages(1);
      
    } finally {
      setLoading(false);
    }
  };

  // View tuition details
  const viewTuition = async (tuition) => {
    try {
      console.log('👀 Viewing tuition:', tuition._id);
      
      // Fetch full details from backend
      const data = await getTuitionById(tuition._id);
      
      if (data.success) {
        setSelectedTuition(data.tuition);
        setIsViewModalOpen(true);
      } else {
        throw new Error(data.message || 'Failed to load tuition details');
      }

    } catch (error) {
      console.error('❌ Error viewing tuition:', error);
      
      const errorKey = `view-tuition-${tuition._id}`;
      if (!activeToastsRef.current.has(errorKey)) {
        activeToastsRef.current.add(errorKey);
        toast.error(error.message || 'Failed to load tuition details', {
          id: errorKey,
          duration: 3000
        });
        setTimeout(() => activeToastsRef.current.delete(errorKey), 3000);
      }
    }
  };

  // Approve tuition
  const handleApproveTuition = async (tuitionId) => {
    const toastKey = `approve-${tuitionId}`;
    
    // Prevent duplicate toasts
    if (activeToastsRef.current.has(toastKey)) {
      return;
    }

    try {
      console.log('✅ Approving tuition:', tuitionId);
      
      activeToastsRef.current.add(toastKey);
      
      const data = await approveTuition(tuitionId);

      if (data.success) {
        // Update tuitions list optimistically
        setTuitions(prev => 
          prev.map(t => 
            t._id === tuitionId 
              ? { ...t, approvalStatus: 'approved', approvedAt: new Date() }
              : t
          )
        );

        // Show success toast
        toast.success('Tuition approved successfully', {
          id: toastKey,
          duration: 3000
        });
        
        setTimeout(() => activeToastsRef.current.delete(toastKey), 3000);
        
        // Reload to get fresh data from backend
        await loadTuitions(currentPage);
      } else {
        throw new Error(data.message || 'Failed to approve tuition');
      }

    } catch (error) {
      console.error('❌ Error approving tuition:', error);
      
      toast.error(error.message || 'Failed to approve tuition', {
        id: toastKey,
        duration: 3000
      });
      
      setTimeout(() => activeToastsRef.current.delete(toastKey), 3000);
    }
  };

  // Reject tuition
  const handleRejectTuition = async (tuitionId, rejectionReason = '') => {
    const toastKey = `reject-${tuitionId}`;
    
    // Prevent duplicate toasts
    if (activeToastsRef.current.has(toastKey)) {
      return;
    }
    
    try {
      console.log('❌ Rejecting tuition:', tuitionId);
      
      activeToastsRef.current.add(toastKey);
      
      const data = await rejectTuition(tuitionId, rejectionReason);

      if (data.success) {
        // Update tuitions list optimistically
        setTuitions(prev => 
          prev.map(t => 
            t._id === tuitionId 
              ? { 
                  ...t, 
                  approvalStatus: 'rejected', 
                  rejectionReason: rejectionReason || 'No reason provided',
                  rejectedAt: new Date() 
                }
              : t
          )
        );

        // Show success toast
        toast.success('Tuition rejected successfully', {
          id: toastKey,
          duration: 3000
        });
        
        setTimeout(() => activeToastsRef.current.delete(toastKey), 3000);
        
        // Reload to get fresh data from backend
        await loadTuitions(currentPage);
      } else {
        throw new Error(data.message || 'Failed to reject tuition');
      }

    } catch (error) {
      console.error('❌ Error rejecting tuition:', error);
      
      toast.error(error.message || 'Failed to reject tuition', {
        id: toastKey,
        duration: 3000
      });
      
      setTimeout(() => activeToastsRef.current.delete(toastKey), 3000);
    }
  };

  // Update tuition status (open/closed/ongoing/completed)
  const handleUpdateStatus = async (tuitionId, newStatus) => {
    const toastKey = `status-${tuitionId}-${newStatus}`;
    
    // Prevent duplicate toasts
    if (activeToastsRef.current.has(toastKey)) {
      return;
    }
    
    try {
      console.log('🔄 Updating tuition status:', tuitionId, newStatus);
      
      activeToastsRef.current.add(toastKey);
      
      const data = await updateTuitionStatus(tuitionId, newStatus);

      if (data.success) {
        // Update tuitions list optimistically
        setTuitions(prev => 
          prev.map(t => 
            t._id === tuitionId 
              ? { ...t, status: newStatus }
              : t
          )
        );

        toast.success(`Status updated to ${newStatus}`, {
          id: toastKey,
          duration: 3000
        });
        
        setTimeout(() => activeToastsRef.current.delete(toastKey), 3000);
        
        // Reload to get fresh data
        await loadTuitions(currentPage);
      } else {
        throw new Error(data.message || 'Failed to update status');
      }

    } catch (error) {
      console.error('❌ Error updating status:', error);
      
      toast.error(error.message || 'Failed to update status', {
        id: toastKey,
        duration: 3000
      });
      
      setTimeout(() => activeToastsRef.current.delete(toastKey), 3000);
    }
  };

  return {
    // State
    tuitions,
    loading,
    currentPage,
    totalPages,
    filters,
    selectedTuition,
    isViewModalOpen,
    
    // Setters
    setFilters,
    setIsViewModalOpen,
    
    // Actions
    loadTuitions,
    viewTuition,
    approveTuition: handleApproveTuition,
    rejectTuition: handleRejectTuition,
    updateStatus: handleUpdateStatus
  };
};