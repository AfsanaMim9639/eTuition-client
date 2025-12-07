import TutorCard from './TutorCard';

const TutorList = ({ tutors, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="spinner-neon w-12 h-12"></div>
      </div>
    );
  }

  if (tutors.length === 0) {
    return (
      <div className="card-neon card-neon-blue p-12 rounded-xl text-center">
        <h3 className="text-2xl font-bold neon-text-blue mb-4">No Tutors Found</h3>
        <p className="text-gray-400">Try adjusting your search filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tutors.map(tutor => (
        <TutorCard key={tutor._id} tutor={tutor} />
      ))}
    </div>
  );
};

export default TutorList;