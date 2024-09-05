"use client";
import Image from "next/image";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, ComposedChart, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jul 2023', operatorAmount: 17, momGrowth: 0 },
  { month: 'Aug 2023', operatorAmount: 24, momGrowth: 41 },
  { month: 'Sep 2023', operatorAmount: 36, momGrowth: 50 },
  { month: 'Oct 2023', operatorAmount: 53, momGrowth: 47 },
  { month: 'Nov 2023', operatorAmount: 74, momGrowth: 40 },
  { month: 'Dec 2023', operatorAmount: 94, momGrowth: 27 },
  { month: 'Jan 2024', operatorAmount: 151, momGrowth: 61 },
  { month: 'Feb 2024', operatorAmount: 209, momGrowth: 38 },
  { month: 'Mar 2024', operatorAmount: 274, momGrowth: 31 },
  { month: 'Apr 2024', operatorAmount: 500, momGrowth: 82 },
  { month: 'May 2024', operatorAmount: 660, momGrowth: 32 },
  { month: 'Jun 2024', operatorAmount: 787, momGrowth: 19 },
  { month: 'Jul 2024', operatorAmount: 957, momGrowth: 22 },
  { month: 'Aug 2024', operatorAmount: 975, momGrowth: 2 },
];

export default function momGraph() {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  return (
    <main>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-900 p-6 rounded-lg max-w-2xl mx-auto"
      >
        <h2 className="text-blue-400 text-2xl font-bold mb-4">Operators Growth MoM</h2>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#9CA3AF" />
            <YAxis yAxisId="left" stroke="#9CA3AF" />
            <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
              labelStyle={{ color: '#E5E7EB' }}
              itemStyle={{ color: '#9CA3AF' }}
            />
            <Legend wrapperStyle={{ color: '#9CA3AF' }} />
            <Bar
              yAxisId="left"
              dataKey="operatorAmount"
              fill="#3B82F6"
              radius={[4, 4, 0, 0]}
              onMouseEnter={(_, index) => setHoveredBar(index)}
              onMouseLeave={() => setHoveredBar(null)}
            >
              {data.map((_, index) => (
                <motion.rect
                  key={`bar-${index}`} // Corrected template literal usage
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: hoveredBar === index ? 1.05 : 1 }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </Bar>
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="momGrowth"
              stroke="#EF4444"
              strokeWidth={2}
              dot={{ fill: '#EF4444', r: 4 }}
              activeDot={{ r: 6, fill: '#FCA5A5' }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </motion.div>
    </main>
  );
}
