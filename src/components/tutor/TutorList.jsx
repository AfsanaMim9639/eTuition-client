import TutorCard from './TutorCard';
import { Users } from 'lucide-react';

const TutorList = ({ tutors, loading, error }) => {
  // Loading State
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="spinner-neon w-12 h-12"></div>
        <p className="text-gray-400 mt-4">Loading tutors...</p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="text-center py-20">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 border-2 border-red-500/30 mb-4">
          <span className="text-2xl">⚠️</span>
        </div>
        <p className="text-red-400 mb-4">{error}</p>
      </div>
    );
  }

  // Empty State
  if (!tutors || tutors.length === 0) {
    return (
      <div className="card-neon card-neon-blue p-12 rounded-xl text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#00ffcc]/10 border-2 border-[#00ffcc]/30 mb-4">
          <Users className="w-8 h-8 text-[#00ffcc]" />
        </div>
        <h3 className="text-2xl font-bold neon-text-blue mb-4">No Tutors Found</h3>
        <p className="text-gray-400">Try adjusting your search filters or check back later</p>
      </div>
    );
  }

  // Tutors Grid
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tutors.map(tutor => (
        <TutorCard key={tutor._id || tutor.id} tutor={tutor} />
      ))}
    </div>
  );
};

export default TutorList;