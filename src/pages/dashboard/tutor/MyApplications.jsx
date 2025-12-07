import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../utils/api';

export const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await api.get('/applications/my-applications');
      setApplications(response.data.applications);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><div className="spinner-neon w-12 h-12"></div></div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold neon-text-pink">My Applications</h1>
      
      {applications.length > 0 ? (
        <div className="grid gap-6">
          {applications.map(app => (
            <div key={app._id} className="card-neon card-neon-blue p-6 rounded-xl">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-bold neon-text-blue mb-1">{app.tuition?.title}</h3>
                  <p className="text-gray-400">{app.tuition?.subject} • {app.tuition?.class}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  app.status === 'approved' ? 'bg-neon-green/20 text-neon-green border border-neon-green/30' :
                  app.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30' :
                  'bg-red-500/20 text-red-500 border border-red-500/30'
                }`}>
                  {app.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm text-gray-400">
                <div>Expected Salary: <span className="text-neon-green font-semibold">{app.expectedSalary} BDT</span></div>
                <div>Availability: {app.availability}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card-neon card-neon-pink p-12 rounded-xl text-center">
          <h3 className="text-2xl font-bold neon-text-pink mb-4">No Applications Yet</h3>
          <Link to="/tuitions" className="btn btn-neon-blue px-8 py-3 rounded-lg font-semibold inline-block">Browse Tuitions</Link>
        </div>
      )}
    </div>
  );
};