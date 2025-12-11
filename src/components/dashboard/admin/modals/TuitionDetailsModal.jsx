import React from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modal = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
};

const TuitionDetailsModal = ({ tuition, onClose }) => {
  if (!tuition) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      variants={backdrop}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div
        className="bg-[#0a0f0d] border border-[#00ff88]/30 rounded-xl p-6 w-full max-w-lg shadow-lg relative"
        variants={modal}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[#00ff88] hover:text-[#00ffd0] transition"
        >
          <FaTimes size={20} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-[#00ff88] mb-4">
          {tuition.title}
        </h2>

        {/* Details */}
        <div className="space-y-3 text-gray-200">
          <p><span className="text-[#00ff88]">Subject:</span> {tuition.subject}</p>
          <p><span className="text-[#00ff88]">Grade:</span> {tuition.grade}</p>
          <p><span className="text-[#00ff88]">Location:</span> {tuition.location}</p>
          <p><span className="text-[#00ff88]">Salary:</span> {tuition.salary} Tk</p>
          <p><span className="text-[#00ff88]">Days/Week:</span> {tuition.days_per_week}</p>
          <p><span className="text-[#00ff88]">Class Duration:</span> {tuition.class_duration}</p>
          <p><span className="text-[#00ff88]">Preferred Medium:</span> {tuition.preferred_medium}</p>
          <p><span className="text-[#00ff88]">Tutoring Type:</span> {tuition.tutoring_type}</p>
          <p><span className="text-[#00ff88]">Status:</span> {tuition.status}</p>

          {tuition.description && (
            <p><span className="text-[#00ff88]">Description:</span> {tuition.description}</p>
          )}
        </div>

        {/* Footer */}
        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-md bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/40 hover:bg-[#00ff88]/30 transition"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TuitionDetailsModal;
