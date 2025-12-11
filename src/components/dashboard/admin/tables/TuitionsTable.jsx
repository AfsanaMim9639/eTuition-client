import React from "react";
import { motion } from "framer-motion";
import { FaEye } from "react-icons/fa";

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.03 },
  }),
};

const TuitionsTable = ({ tuitions = [], onViewDetails, onUpdateStatus }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.4 }}
      className="w-full overflow-x-auto bg-[#0a0f0d] border border-[#00ff88]/30 rounded-xl shadow-lg"
    >
      <table className="min-w-full text-left">
        
        {/* Table Header */}
        <thead>
          <tr className="bg-[#0d1513] border-b border-[#00ff88]/20 text-[#00ff88]">
            <th className="p-3">Title</th>
            <th className="p-3">Subject</th>
            <th className="p-3">Grade</th>
            <th className="p-3">Location</th>
            <th className="p-3">Salary</th>
            <th className="p-3">Type</th>
            <th className="p-3">Medium</th>
            <th className="p-3">Status</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {tuitions.length === 0 ? (
            <tr>
              <td 
                colSpan="10"
                className="text-center text-gray-400 py-6"
              >
                No tuitions found
              </td>
            </tr>
          ) : (
            tuitions.map((t, idx) => (
              <motion.tr 
                key={t._id}
                custom={idx}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                className="border-b border-[#00ff8833] hover:bg-[#0f1a17] transition"
              >
                <td className="p-3 text-gray-200">{t.title}</td>
                <td className="p-3 text-gray-200">{t.subject}</td>
                <td className="p-3 text-gray-200">{t.grade}</td>
                <td className="p-3 text-gray-200">{t.location}</td>
                <td className="p-3 text-gray-200">{t.salary} Tk</td>

                {/* Virtual fields */}
                <td className="p-3 text-gray-200">{t.category}</td>
                <td className="p-3 text-gray-200">{t.medium}</td>

                <td className="p-3">
                  <span 
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      t.status === "open"
                        ? "bg-green-500/20 text-green-400"
                        : t.status === "closed"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {t.status}
                  </span>
                </td>

                {/* Action Buttons */}
                <td className="p-3 text-center flex items-center gap-4 justify-center">

                  {/* View button */}
                  <button
                    onClick={() => onViewDetails(t)}
                    className="text-[#00ff88] hover:text-[#00ffcc] transition"
                  >
                    <FaEye size={18} />
                  </button>

                  {/* Status toggle (example) */}
                  {onUpdateStatus && (
                    <button
                      onClick={() => onUpdateStatus(t._id, t.status === "open" ? "closed" : "open")}
                      className="px-3 py-1 rounded-md text-xs bg-[#00ff88]/10 text-[#00ff88] hover:bg-[#00ff88]/20"
                    >
                      {t.status === "open" ? "Close" : "Reopen"}
                    </button>
                  )}

                </td>
              </motion.tr>
            ))
          )}
        </tbody>
      </table>
    </motion.div>
  );
};

export default TuitionsTable;
