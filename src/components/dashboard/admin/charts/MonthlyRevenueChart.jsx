// src/components/dashboard/admin/charts/MonthlyRevenueChart.jsx

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MonthlyRevenueChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        <p>No revenue data available</p>
      </div>
    );
  }

  // Format month name
  const formatMonth = (monthStr) => {
    const [year, month] = monthStr.split('-');
    const date = new Date(year, month - 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
  };

  // Format data for chart
  const chartData = data.map(item => ({
    month: formatMonth(item.month),
    revenue: item.revenue,
    platformFee: item.platformFee,
    transactions: item.count
  }));

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
          <p className="text-white font-semibold mb-2">{payload[0].payload.month}</p>
          <p className="text-cyan-400 text-sm">
            Revenue: ৳{payload[0].value.toLocaleString()}
          </p>
          <p className="text-green-400 text-sm">
            Platform Fee: ৳{payload[0].payload.platformFee.toLocaleString()}
          </p>
          <p className="text-gray-400 text-sm">
            Transactions: {payload[0].payload.transactions}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00F0FF" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#00F0FF" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
          <XAxis 
            dataKey="month" 
            stroke="#888"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#888"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => `৳${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey="revenue" 
            stroke="#00F0FF" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorRevenue)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyRevenueChart;