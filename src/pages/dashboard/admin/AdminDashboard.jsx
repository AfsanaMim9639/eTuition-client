import { useState, useEffect } from 'react';
import { FaUsers, FaBook, FaDollarSign } from 'react-icons/fa';
import api from '../../../utils/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get('/admin/stats');
      setStats(response.data.stats);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold gradient-text">Admin Dashboard</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card-neon card-neon-pink p-6 rounded-xl">
          <FaUsers className="text-4xl text-neon-pink mb-3" />
          <div className="text-4xl font-bold neon-text-pink mb-2">{stats.users?.total || 0}</div>
          <div className="text-gray-400">Total Users</div>
          <div className="text-sm text-gray-500 mt-2">Students: {stats.users?.students || 0} | Tutors: {stats.users?.tutors || 0}</div>
        </div>
        <div className="card-neon card-neon-blue p-6 rounded-xl">
          <FaBook className="text-4xl text-neon-blue mb-3" />
          <div className="text-4xl font-bold neon-text-blue mb-2">{stats.tuitions?.total || 0}</div>
          <div className="text-gray-400">Total Tuitions</div>
          <div className="text-sm text-gray-500 mt-2">Pending: {stats.tuitions?.pending || 0} | Active: {stats.tuitions?.ongoing || 0}</div>
        </div>
        <div className="card-neon card-neon-green p-6 rounded-xl">
          <FaDollarSign className="text-4xl text-neon-green mb-3" />
          <div className="text-4xl font-bold neon-text-green mb-2">{stats.payments?.revenue || 0}</div>
          <div className="text-gray-400">Total Revenue (BDT)</div>
          <div className="text-sm text-gray-500 mt-2">Transactions: {stats.payments?.total || 0}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;