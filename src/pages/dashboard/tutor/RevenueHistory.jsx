import { useState, useEffect } from 'react';
import api from '../../../utils/api';

const RevenueHistory = () => {
  const [payments, setPayments] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchRevenue();
  }, []);

  const fetchRevenue = async () => {
    try {
      const response = await api.get('/payments/my-revenue');
      setPayments(response.data.payments);
      setTotal(response.data.totalRevenue);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="card-neon card-neon-green p-6 rounded-xl">
        <h1 className="text-3xl font-bold neon-text-green mb-2">Revenue History</h1>
        <p className="text-5xl font-bold gradient-text">{total} BDT</p>
      </div>

      <div className="space-y-3">
        {payments.map(payment => (
          <div key={payment._id} className="card-neon card-neon-blue p-4 rounded-xl flex justify-between items-center">
            <div>
              <h3 className="font-bold">{payment.tuition?.title}</h3>
              <p className="text-sm text-gray-400">{new Date(payment.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="text-2xl font-bold text-neon-green">{payment.amount} BDT</div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default RevenueHistory;