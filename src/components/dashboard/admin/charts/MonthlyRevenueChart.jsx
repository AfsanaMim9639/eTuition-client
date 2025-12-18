// src/components/dashboard/admin/charts/MonthlyRevenueChart.jsx

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MonthlyRevenueChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12 text-gray-400">
        <p className="text-sm sm:text-base">No revenue data available</p>
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

  // Custom tooltip - Responsive
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
            {payload[0].payload.month}
          </p>
          <p className="text-cyan-400 text-xs sm:text-sm mb-0.5">
            Revenue: ৳{payload[0].value.toLocaleString()}
          </p>
          <p className="text-green-400 text-xs sm:text-sm mb-0.5">
            Platform Fee: ৳{payload[0].payload.platformFee.toLocaleString()}
          </p>
          <p className="text-gray-400 text-xs sm:text-sm">
            Transactions: {payload[0].payload.transactions}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-64 sm:h-72 md:h-80 lg:h-96 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart 
          data={chartData} 
          margin={{ 
            top: 10, 
            right: window.innerWidth < 640 ? 10 : 30, 
            left: window.innerWidth < 640 ? -10 : 0, 
            bottom: 0 
          }}
        >
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00F0FF" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#00F0FF" stopOpacity={0}/>
            </linearGradient>
          </defs>
          
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="rgba(255, 255, 255, 0.1)" 
          />
          
          <XAxis 
            dataKey="month" 
            stroke="#888"
            style={{ fontSize: window.innerWidth < 640 ? '10px' : '12px' }}
            angle={window.innerWidth < 640 ? -45 : 0}
            textAnchor={window.innerWidth < 640 ? 'end' : 'middle'}
            height={window.innerWidth < 640 ? 60 : 30}
            interval={window.innerWidth < 640 ? 1 : 0}
          />
          
          <YAxis 
            stroke="#888"
            style={{ fontSize: window.innerWidth < 640 ? '10px' : '12px' }}
            width={window.innerWidth < 640 ? 45 : 60}
            tickFormatter={(value) => {
              if (window.innerWidth < 640) {
                // Mobile: Show shorter format
                return value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value;
              }
              // Desktop: Show with ৳ symbol
              return `৳${(value / 1000).toFixed(0)}k`;
            }}
          />
          
          <Tooltip 
            content={<CustomTooltip />}
            cursor={{ stroke: '#00F0FF', strokeWidth: 1, strokeDasharray: '5 5' }}
          />
          
          <Area 
            type="monotone" 
            dataKey="revenue" 
            stroke="#00F0FF" 
            strokeWidth={window.innerWidth < 640 ? 1.5 : 2}
            fillOpacity={1} 
            fill="url(#colorRevenue)"
            animationDuration={1000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyRevenueChart;