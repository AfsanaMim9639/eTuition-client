// src/components/dashboard/admin/charts/PaymentMethodsChart.jsx

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const PaymentMethodsChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        <p>No payment method data available</p>
      </div>
    );
  }

  const COLORS = {
    bkash: '#E2136E',
    nagad: '#F15B2A',
    rocket: '#8B4789',
    stripe: '#635BFF',
    bank_transfer: '#00F0FF',
    cash: '#39FF14'
  };

  // Format data for chart
  const chartData = data.map(item => ({
    name: item.method?.toUpperCase() || 'UNKNOWN',
    value: item.count,
    amount: item.amount
  }));

  // Custom label
  const renderLabel = (entry) => {
    return `${entry.name}: ${entry.value}`;
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div 
          className="p-4 rounded-lg border"
          style={{
            backgroundColor: 'rgba(18, 18, 18, 0.95)',
            borderColor: 'rgba(255, 16, 240, 0.3)'
          }}
        >
          <p className="text-white font-semibold mb-2">{payload[0].name}</p>
          <p className="text-cyan-400 text-sm">
            Transactions: {payload[0].value}
          </p>
          <p className="text-green-400 text-sm">
            Amount: ৳{payload[0].payload.amount.toLocaleString()}
          </p>
          <p className="text-gray-400 text-sm">
            {((payload[0].value / data.reduce((sum, item) => sum + item.count, 0)) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[entry.name.toLowerCase()] || '#888'} 
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ fontSize: '12px', color: '#888' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PaymentMethodsChart;