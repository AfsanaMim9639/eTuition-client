import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaUsers, FaDollarSign, FaPlus } from 'react-icons/fa';
import api from '../../../utils/api';
import useAuth from '../../../hooks/useAuth';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalTuitions: 0,
    activeTuitions: 0,
    completedTuitions: 0,
    totalApplications: 0
  });
  const [recentTuitions, setRecentTuitions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const tuitionsResponse = await api.get('/tuitions/my/tuitions');
      const tuitions = tuitionsResponse.data.tuitions;

      setStats({
        totalTuitions: tuitions.length,
        activeTuitions: tuitions.filter(t => t.status === 'ongoing').length,
        completedTuitions: tuitions.filter(t => t.status === 'completed').length,
        totalApplications: tuitions.reduce((sum, t) => sum + (t.applicationCount || 0), 0)
      });

      setRecentTuitions(tuitions.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: 'Total Tuitions', value: stats.totalTuitions, icon: <FaBook />, color: 'pink' },
    { label: 'Active Tuitions', value: stats.activeTuitions, icon: <FaUsers />, color: 'blue' },
    { label: 'Completed', value: stats.completedTuitions, icon: <FaDollarSign />, color: 'green' },
    { label: 'Total Applications', value: stats.totalApplications, icon: <FaUsers />, color: 'purple' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="card-neon card-neon-pink p-6 rounded-xl">
        <h1 className="text-3xl font-bold mb-2">Student Dashboard</h1>
        <p className="text-gray-400">Manage your tuitions and find the perfect tutor</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className={`card-neon card-neon-${stat.color} p-6 rounded-xl`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-full bg-dark-bg neon-border-${stat.color} flex items-center justify-center text-neon-${stat.color} text-xl`}>
                {stat.icon}
              </div>
              <span className={`text-4xl font-bold neon-text-${stat.color}`}>{stat.value}</span>
            </div>
            <h3 className="text-gray-400 font-semibold">{stat.label}</h3>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="card-neon card-neon-blue p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-4 neon-text-blue">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/dashboard/student/post-tuition" className="btn btn-neon-pink p-4 rounded-lg text-center">
            <FaPlus className="mx-auto mb-2 text-2xl" />
            <span className="font-semibold">Post New Tuition</span>
          </Link>
          <Link to="/dashboard/student/tuitions" className="btn btn-neon-blue p-4 rounded-lg text-center">
            <FaBook className="mx-auto mb-2 text-2xl" />
            <span className="font-semibold">View My Tuitions</span>
          </Link>
          <Link to="/dashboard/student/payments" className="btn btn-neon-green p-4 rounded-lg text-center">
            <FaDollarSign className="mx-auto mb-2 text-2xl" />
            <span className="font-semibold">Payment History</span>
          </Link>
        </div>
      </div>

      {/* Recent Tuitions */}
      <div className="card-neon card-neon-pink p-6 rounded-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold neon-text-pink">Recent Tuitions</h2>
          <Link to="/dashboard/student/tuitions" className="text-neon-blue hover:text-neon-green transition-colors">
            View All
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="spinner-neon w-12 h-12 mx-auto"></div>
          </div>
        ) : recentTuitions.length > 0 ? (
          <div className="space-y-3">
            {recentTuitions.map((tuition) => (
              <div key={tuition._id} className="bg-dark-bg p-4 rounded-lg border-2 border-neon-pink/30 hover:border-neon-pink/60 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-bold text-white mb-1">{tuition.title}</h3>
                    <p className="text-sm text-gray-400">{tuition.subject} • {tuition.class}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    tuition.status === 'approved' ? 'bg-neon-green/20 text-neon-green' :
                    tuition.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                    'bg-neon-blue/20 text-neon-blue'
                  }`}>
                    {tuition.status}
                  </span>
                </div>
                <div className="mt-2 flex items-center space-x-4 text-sm text-gray-400">
                  <span>{tuition.applicationCount || 0} applications</span>
                  <span>•</span>
                  <span className="text-neon-green font-semibold">{tuition.salary} BDT/month</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">
            <p>No tuitions yet. Post your first tuition!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;