import { useState, useEffect } from 'react';
import { FaBook, FaDollarSign, FaClock } from 'react-icons/fa';
import api from '../../../utils/api';

export const TutorDashboard = () => {
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, revenue: 0 });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [appsRes, revenueRes] = await Promise.all([
        api.get('/applications/my-applications'),
        api.get('/payments/my-revenue')
      ]);
      
      const apps = appsRes.data.applications;
      setStats({
        total: apps.length,
        pending: apps.filter(a => a.status === 'pending').length,
        approved: apps.filter(a => a.status === 'approved').length,
        revenue: revenueRes.data.totalRevenue
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="card-neon card-neon-blue p-6 rounded-xl">
        <h1 className="text-3xl font-bold mb-2">Tutor Dashboard</h1>
        <p className="text-gray-400">Manage your applications and earnings</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card-neon card-neon-pink p-6 rounded-xl">
          <FaBook className="text-3xl text-neon-pink mb-3" />
          <div className="text-4xl font-bold neon-text-pink mb-2">{stats.total}</div>
          <div className="text-gray-400">Total Applications</div>
        </div>
        <div className="card-neon card-neon-blue p-6 rounded-xl">
          <FaClock className="text-3xl text-neon-blue mb-3" />
          <div className="text-4xl font-bold neon-text-blue mb-2">{stats.pending}</div>
          <div className="text-gray-400">Pending</div>
        </div>
        <div className="card-neon card-neon-green p-6 rounded-xl">
          <FaBook className="text-3xl text-neon-green mb-3" />
          <div className="text-4xl font-bold neon-text-green mb-2">{stats.approved}</div>
          <div className="text-gray-400">Approved</div>
        </div>
        <div className="card-neon card-neon-purple p-6 rounded-xl">
          <FaDollarSign className="text-3xl text-neon-purple mb-3" />
          <div className="text-4xl font-bold neon-text-purple mb-2">{stats.revenue}</div>
          <div className="text-gray-400">Total Earnings (BDT)</div>
        </div>
      </div>
    </div>
  );
};