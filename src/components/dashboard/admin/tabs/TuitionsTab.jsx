// src/components/dashboard/admin/tabs/TuitionsTab.jsx
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import TuitionFilters from '../filters/TuitionFilters';
import TuitionsTable from '../tables/TuitionsTable';
import TuitionViewModal from '../modals/TuitionViewModal';
import LoadingSpinner from '../ui/LoadingSpinner';
import Pagination from '../ui/Pagination';

const TuitionsTab = ({ tuitionsHook }) => {
  const {
    tuitions,
    loading,
    currentPage,
    totalPages,
    filters,
    setFilters,
    loadTuitions,
    updateStatus,
    // ⭐ NEW props
    viewTuition,
    approveTuition,
    rejectTuition,
    selectedTuition,
    isViewModalOpen,
    setIsViewModalOpen
  } = tuitionsHook;

  useEffect(() => {
    loadTuitions(1);
  }, [filters]);

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
          <h2 className="text-2xl font-bold text-white">Tuition Management</h2>
          <p className="text-sm text-gray-400 mt-1">
            Review and approve tuition posts before they become visible to tutors
          </p>
        </div>
        <div className="text-sm text-gray-400">
          Total: {tuitions?.length || 0}
        </div>
      </div>

      {/* Filters */}
      <TuitionFilters 
        filters={filters} 
        setFilters={setFilters}
        onSearch={() => loadTuitions(1)}
      />

      {/* Content */}
      <div className="space-y-4">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {/* Tuitions Table */}
            <TuitionsTable
              tuitions={tuitions}
              onViewDetails={viewTuition}
              onUpdateStatus={updateStatus}
              onApprove={approveTuition}
              onReject={rejectTuition}
            />

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={loadTuitions}
              />
            )}
          </>
        )}
      </div>

      {/* View Tuition Modal */}
      <TuitionViewModal
        tuition={selectedTuition}
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
        }}
      />
    </motion.div>
  );
};

export default TuitionsTab;