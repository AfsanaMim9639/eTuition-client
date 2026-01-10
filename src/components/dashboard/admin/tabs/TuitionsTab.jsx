// src/components/dashboard/admin/tabs/TuitionsTab.jsx
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import TuitionFilters from '../filters/TuitionFilters';
import TuitionsTable from '../tables/TuitionsTable';
import TuitionViewModal from '../modals/TuitionViewModal';
import LoadingSpinner from '../ui/LoadingSpinner';
import Pagination from '../ui/Pagination';
import { useTheme } from '../../../../contexts/ThemeContext';

const TuitionsTab = ({ tuitionsHook }) => {
  const { isDark } = useTheme();
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
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Tuition Management
          </h2>
          <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
            Review and approve tuition posts before they become visible to tutors
          </p>
        </div>
        <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Total: {tuitions?.length || 0}
        </div>
      </div>

      {/* Filters */}
      <TuitionFilters 
        filters={filters} 
        setFilters={setFilters}
        onSearch={() => loadTuitions(1)}
        isDark={isDark}
      />

      {/* Content */}
      <div className="space-y-4">
        {loading ? (
          <LoadingSpinner isDark={isDark} />
        ) : (
          <>
            {/* Tuitions Table */}
            <TuitionsTable
              tuitions={tuitions}
              onViewDetails={viewTuition}
              onUpdateStatus={updateStatus}
              onApprove={approveTuition}
              onReject={rejectTuition}
              isDark={isDark}
            />

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={loadTuitions}
                isDark={isDark}
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
        isDark={isDark}
      />
    </motion.div>
  );
};

export default TuitionsTab;