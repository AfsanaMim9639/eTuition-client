// src/components/dashboard/admin/charts/UserGrowthChart.jsx

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const UserGrowthChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        <p>No user growth data available</p>
      </div>
    );
  }

  // Format month name
  const formatMonth = (monthStr) => {
    const [year, month] = monthStr.split('-');
    const date = new Date(year, month - 1);
    return date.toLocaleDateString('en-US', { month: 'short' });
  };

  // Format data for chart
  const chartData = data.map(item => ({
    month: formatMonth(item.month),
    Students: item.students,
    Tutors: item.tutors
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
            Students: {payload[0].value}
          </p>
          <p className="text-pink-400 text-sm">
            Tutors: {payload[1].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
          <XAxis 
            dataKey="month" 
            stroke="#888"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#888"
            style={{ fontSize: '12px' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ fontSize: '12px', color: '#888' }}
          />
          <Bar dataKey="Students" fill="#00F0FF" radius={[8, 8, 0, 0]} />
          <Bar dataKey="Tutors" fill="#FF10F0" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserGrowthChart;