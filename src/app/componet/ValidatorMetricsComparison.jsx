'use client';

import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { subject: 'Uptime', A: 120, B: 110, fullMark: 150 },
  { subject: 'Performance', A: 98, B: 130, fullMark: 150 },
  { subject: 'Reliability', A: 86, B: 130, fullMark: 150 },
  { subject: 'Stake', A: 99, B: 100, fullMark: 150 },
  { subject: 'Rewards', A: 85, B: 90, fullMark: 150 },
];

export default function ValidatorMetricsComparison() {
  return (
    <div className="w-[40%] h-[400px] p-4 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Validator Metrics Comparison</h2>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 150]} />
          <Radar name="Validator A" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          <Radar name="Validator B" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}