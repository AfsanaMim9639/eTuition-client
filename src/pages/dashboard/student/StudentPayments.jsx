import { useState, useEffect } from 'react';
import api from '../../../utils/api';

export const StudentPayments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await api.get('/payments/my-payments');
      setPayments(response.data.payments);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold neon-text-pink">Payment History</h1>
      
      {payments.length > 0 ? (
        <div className="space-y-3">
          {payments.map(payment => (
            <div key={payment._id} className="card-neon card-neon-green p-6 rounded-xl flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">{payment.tuition?.title}</h3>
                <p className="text-sm text-gray-400">Tutor: {payment.tutor?.name}</p>
                <p className="text-xs text-gray-500">{new Date(payment.createdAt).toLocaleString()}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-neon-green">{payment.amount} BDT</div>
                <span className="text-xs px-2 py-1 bg-neon-green/20 text-neon-green border border-neon-green/30 rounded">{payment.status}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card-neon card-neon-blue p-12 rounded-xl text-center">
          <h3 className="text-2xl font-bold neon-text-blue mb-4">No Payments Yet</h3>
          <p className="text-gray-400">Your payment history will appear here</p>
        </div>
      )}
    </div>
  );
};
