import { FaMapMarkerAlt, FaDollarSign, FaBook, FaClock, FaCalendarAlt, FaUserGraduate, FaChalkboardTeacher, FaGlobe, FaHome, FaLanguage, FaGenderless } from 'react-icons/fa';

const TuitionDetails = ({ tuition }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryIcon = () => {
    if (tuition.tutoring_type === 'Online Tutoring') return <FaGlobe className="text-neon-blue" />;
    if (tuition.tutoring_type === 'Home Tutoring') return <FaHome className="text-neon-pink" />;
    return <FaChalkboardTeacher className="text-neon-green" />;
  };

  return (
    <div className="space-y-6">
      {/* Main Card */}
      <div className="card-neon card-neon-pink p-8 rounded-xl">
        {/* Title & Category */}
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-3xl font-bold neon-text-pink flex-1">{tuition.title}</h2>
          <div className="flex items-center gap-2 px-4 py-2 bg-neon-pink/10 border border-neon-pink/30 rounded-lg">
            {getCategoryIcon()}
            <span className="font-semibold text-sm">{tuition.tutoring_type || 'Home Tutoring'}</span>
          </div>
        </div>

        {/* Quick Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
            <FaBook className="text-neon-blue text-2xl" />
            <div>
              <p className="text-xs text-gray-400">Subject</p>
              <p className="font-semibold text-white">{tuition.subject}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
            <FaUserGraduate className="text-neon-green text-2xl" />
            <div>
              <p className="text-xs text-gray-400">Grade/Class</p>
              <p className="font-semibold text-white">{tuition.grade || tuition.level || 'N/A'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
            <FaMapMarkerAlt className="text-neon-pink text-2xl" />
            <div>
              <p className="text-xs text-gray-400">Location</p>
              <p className="font-semibold text-white">{tuition.location}</p>
            </div>
          </div>
        </div>

        {/* Salary Highlight */}
        <div className="flex items-center justify-center gap-3 p-6 bg-gradient-to-r from-neon-green/10 to-neon-blue/10 border-2 border-neon-green/30 rounded-xl mb-6">
          <FaDollarSign className="text-neon-green text-4xl" />
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-1">Monthly Salary</p>
            <p className="text-4xl font-bold text-neon-green">৳{tuition.salary}</p>
          </div>
        </div>

        {/* Schedule & Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {tuition.schedule && (
            <div className="flex items-start gap-3 p-4 bg-gray-800/30 rounded-lg">
              <FaClock className="text-neon-blue text-xl mt-1" />
              <div>
                <p className="text-xs text-gray-400 mb-1">Schedule</p>
                <p className="text-white">{tuition.schedule}</p>
              </div>
            </div>
          )}

          {(tuition.days_per_week || tuition.daysPerWeek) && (
            <div className="flex items-start gap-3 p-4 bg-gray-800/30 rounded-lg">
              <FaCalendarAlt className="text-neon-green text-xl mt-1" />
              <div>
                <p className="text-xs text-gray-400 mb-1">Days Per Week</p>
                <p className="text-white">{tuition.days_per_week || tuition.daysPerWeek} days</p>
              </div>
            </div>
          )}

          {tuition.class_duration && (
            <div className="flex items-start gap-3 p-4 bg-gray-800/30 rounded-lg">
              <FaClock className="text-neon-purple text-xl mt-1" />
              <div>
                <p className="text-xs text-gray-400 mb-1">Class Duration</p>
                <p className="text-white">{tuition.class_duration}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Additional Details Card */}
      <div className="card-neon card-neon-blue p-8 rounded-xl">
        <h3 className="text-2xl font-bold neon-text-blue mb-6">Additional Details</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Medium */}
          {tuition.preferred_medium && (
            <div className="flex items-start gap-3">
              <FaLanguage className="text-neon-blue text-xl mt-1" />
              <div>
                <p className="text-sm text-gray-400 mb-1">Preferred Medium</p>
                <p className="text-white font-semibold">{tuition.preferred_medium}</p>
              </div>
            </div>
          )}

          {/* Student Gender */}
          {tuition.student_gender && (
            <div className="flex items-start gap-3">
              <FaGenderless className="text-neon-pink text-xl mt-1" />
              <div>
                <p className="text-sm text-gray-400 mb-1">Student Gender</p>
                <p className="text-white font-semibold">{tuition.student_gender}</p>
              </div>
            </div>
          )}

          {/* Tutor Gender Preference */}
          {tuition.tutor_gender_preference && (
            <div className="flex items-start gap-3">
              <FaGenderless className="text-neon-green text-xl mt-1" />
              <div>
                <p className="text-sm text-gray-400 mb-1">Preferred Tutor Gender</p>
                <p className="text-white font-semibold">{tuition.tutor_gender_preference}</p>
              </div>
            </div>
          )}

          {/* Views */}
          {tuition.views > 0 && (
            <div className="flex items-start gap-3">
              <span className="text-neon-blue text-xl mt-1">👁️</span>
              <div>
                <p className="text-sm text-gray-400 mb-1">Views</p>
                <p className="text-white font-semibold">{tuition.views} views</p>
              </div>
            </div>
          )}
        </div>

        {/* Requirements */}
        {tuition.requirements && (
          <div className="mb-6">
            <h4 className="text-lg font-bold neon-text-green mb-3">Requirements</h4>
            <p className="text-gray-300 leading-relaxed whitespace-pre-line bg-gray-800/30 p-4 rounded-lg">
              {tuition.requirements}
            </p>
          </div>
        )}

        {/* Student Details */}
        {tuition.student_details && (
          <div>
            <h4 className="text-lg font-bold neon-text-purple mb-3">Student Information</h4>
            <div className="text-gray-300 bg-gray-800/30 p-4 rounded-lg">
              {typeof tuition.student_details === 'string' ? (
                <p className="leading-relaxed whitespace-pre-line">{tuition.student_details}</p>
              ) : (
                <pre className="text-sm">{JSON.stringify(tuition.student_details, null, 2)}</pre>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Posted Info Card */}
      <div className="card-neon card-neon-green p-6 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400 mb-1">Posted By</p>
            <p className="text-white font-semibold">
              {tuition.studentId?.name || tuition.posted_by || 'Student'}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400 mb-1">Posted On</p>
            <p className="text-white font-semibold">
              {formatDate(tuition.postedAt || tuition.createdAt)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400 mb-1">Status</p>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              tuition.status === 'open' ? 'bg-green-500/20 text-green-400' :
              tuition.status === 'ongoing' ? 'bg-blue-500/20 text-blue-400' :
              tuition.status === 'completed' ? 'bg-purple-500/20 text-purple-400' :
              'bg-gray-500/20 text-gray-400'
            }`}>
              {tuition.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TuitionDetails;