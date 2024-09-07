"use client";

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { date: '2023-01', holders: 1000 },
  { date: '2023-02', holders: 1500 },
  { date: '2023-03', holders: 2200 },
  { date: '2023-04', holders: 2800 },
  { date: '2023-05', holders: 3500 },
  { date: '2023-06', holders: 4200 },
  { date: '2023-07', holders: 5000 },
  { date: '2023-08', holders: 5800 },
  { date: '2023-09', holders: 6500 },
  { date: '2023-10', holders: 7200 },
  { date: '2023-11', holders: 8000 },
  { date: '2023-12', holders: 8800 },
];

export default function SSVHoldersChart() {
  return (
    <div className="w-[685px] ml-[10px] p-6 bg-[rgba(249,250,251,0.1)] rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-white mb-4">SSV Holders Over Time</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#D1D5DB" />
          <XAxis 
            dataKey="date" 
            tickFormatter={(value) => new Date(value).toLocaleDateString('default', { month: 'short' })}
            stroke="#4B5563"
          />
          <YAxis 
            stroke="#4B5563" 
          />
          <Tooltip 
            labelFormatter={(value) => new Date(value).toLocaleDateString('default', { month: 'long', year: 'numeric' })}
            formatter={(value) => [`${value.toLocaleString()} holders`, 'SSV Holders']}
            contentStyle={{ backgroundColor: '#1D4ED8', borderColor: '#1E40AF' }} // Blue background for tooltip
            labelStyle={{ color: '#ffffff' }} // White label text
            itemStyle={{ color: '#ffffff' }} // White item text
          />
          <Line 
            type="monotone" 
            dataKey="holders" 
            stroke="#fff" // Ensure this is set in your CSS
            strokeWidth={2}
            dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
