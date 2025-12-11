// src/components/dashboard/admin/tabs/TuitionsTab.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import TuitionFilters from '../filters/TuitionFilters';
import TuitionsTable from '../tables/TuitionsTable';
import TuitionDetailsModal from '../modals/TuitionDetailsModal';
import LoadingSpinner from '../ui/LoadingSpinner';
import Pagination from '../ui/Pagination';

const TuitionsTab = ({ tuitionsHook }) => {
  const [selectedTuition, setSelectedTuition] = useState(null);
  const { tuitions, loading, currentPage, totalPages, filters, setFilters, loadTuitions, updateStatus } = tuitionsHook;

  useEffect(() => {
    loadTuitions(1);
  }, [filters]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <TuitionFilters filters={filters} setFilters={setFilters} onApply={() => loadTuitions(1)} />
      
      {loading ? <LoadingSpinner color="#39FF14" /> : (
        <>
          <TuitionsTable 
            tuitions={tuitions}
            onUpdateStatus={updateStatus}
            onViewDetails={setSelectedTuition}
          />
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={loadTuitions} />
        </>
      )}
      
      <TuitionDetailsModal tuition={selectedTuition} onClose={() => setSelectedTuition(null)} />
    </motion.div>
  );
};
export default TuitionsTab;