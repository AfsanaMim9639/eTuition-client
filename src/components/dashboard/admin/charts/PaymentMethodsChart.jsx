// src/components/dashboard/admin/charts/PaymentMethodsChart.jsx

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const PaymentMethodsChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12 text-gray-400">
        <p className="text-sm sm:text-base">No payment method data available</p>
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

  const chartData = data.map(item => ({
    name: item.method?.toUpperCase() || 'UNKNOWN',
    value: item.count,
    amount: item.amount
  }));

  const getRadius = () => {
    if (typeof window === 'undefined') return 80;
    const width = window.innerWidth;
    if (width < 640) return 60;
    if (width < 768) return 75;
    return 100;
  };

  const renderLabel = (entry) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    if (isMobile) {
      const total = chartData.reduce((sum, item) => sum + item.value, 0);
      const percentage = ((entry.value / total) * 100).toFixed(0);
      return `${percentage}%`;
    }
    return `${entry.name}: ${entry.value}`;
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div 
          className="p-3 sm:p-4 rounded-lg border shadow-lg"
          style={{
            backgroundColor: 'rgba(18, 18, 18, 0.98)',
            borderColor: 'rgba(255, 16, 240, 0.3)'
          }}
        >
          <p className="text-white font-semibold mb-1.5 sm:mb-2 text-xs sm:text-sm">
            {payload[0].name}
          </p>
          <p className="text-cyan-400 text-xs sm:text-sm mb-0.5">
            Transactions: {payload[0].value}
          </p>
          <p className="text-green-400 text-xs sm:text-sm mb-0.5">
            Amount: ৳{payload[0].payload.amount.toLocaleString()}
          </p>
          <p className="text-gray-400 text-xs sm:text-sm">
            {((payload[0].value / data.reduce((sum, item) => sum + item.count, 0)) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-64 sm:h-72 md:h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="45%"
            labelLine={false}
            label={renderLabel}
            outerRadius={getRadius()}
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
            verticalAlign="bottom"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PaymentMethodsChart;