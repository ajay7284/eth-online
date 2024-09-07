"use client";
import Image from "next/image";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  ComposedChart,
  ResponsiveContainer,
} from 'recharts';

// Define the data structure
interface DataPoint {
  month: string;
  operatorAmount: number;
  momGrowth: number;
}


export default function MomGraph({data,title}:{data:any[],title:string}): JSX.Element {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const dataKey = title === 'Operators' ? 'cumulative_validators' : 'total_net_additions';
  const formattedData = data.map((item) => ({
    ...item,
    mom_growth_percentage : Number(item.mom_growth_percentage).toFixed(2),
    month: title === 'Operators' ? item.month.split(' ')[0] : item.month // Only keep date part
  }));  return (
    <main>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-900 p-6 rounded-lg max-w-4xl mx-auto"
      >
        <h2 className="text-blue-400 text-2xl font-bold mb-4">{title} Growth MoM</h2>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={formattedData}>
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
              dataKey={dataKey}
              fill="#3B82F6"
              radius={[4, 4, 0, 0]}
              onMouseEnter={(_, index) => setHoveredBar(index)}
              onMouseLeave={() => setHoveredBar(null)}
            >
              {data.map((_, index) => (
                <motion.rect
                  key={`bar-${index}`}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: hoveredBar === index ? 1.05 : 1 }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </Bar>
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="mom_growth_percentage"
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
