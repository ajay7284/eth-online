'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
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
} from 'recharts'

interface DataPoint {
  formatted_quarter: string
  cumulative_operators?: number
  cumulative_validators?: number
  qoq_growth_percentage: number
}

interface CustomTooltipProps {
  active?: boolean
  payload?: any[]
  label?: string
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="bg-opacity-80 bg-gray-800 p-4 rounded-lg shadow-lg backdrop-blur-sm"
      >
        <p className="text-teal-300 font-bold">{label}</p>
        <p className="text-purple-300">
          {payload[0].name}: {payload[0].value}
        </p>
        <p className="text-cyan-300">
          QoQ Growth %: {payload[1] && !isNaN(Number(payload[1].value)) ? Number(payload[1].value).toFixed(2) : 'N/A'}
        </p>
      </motion.div>
    )
  }
  return null
}

export default function QoqGraph({ data, title }: { data: DataPoint[], title: string }): JSX.Element {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null)
  const dataKey = title === 'Operators' ? 'cumulative_operators' : 'cumulative_validators'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-opacity-30 bg-purple-900 p-6 rounded-lg max-w-4xl mx-auto backdrop-blur-sm"
    >
      <h2 className="text-teal-300 text-2xl font-bold mb-4">{title} Growth QoQ</h2>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
          <XAxis 
            dataKey="formatted_quarter" 
            stroke="#8884d8" 
            tick={{ fill: '#8884d8' }} 
            axisLine={{ stroke: '#8884d8' }}
          />
          <YAxis 
            yAxisId="left" 
            stroke="#8884d8" 
            tick={{ fill: '#8884d8' }} 
            axisLine={{ stroke: '#8884d8' }}
          />
          <YAxis 
            yAxisId="right" 
            orientation="right" 
            stroke="#82ca9d" 
            tick={{ fill: '#82ca9d' }} 
            axisLine={{ stroke: '#82ca9d' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ color: '#e2e8f0' }} 
            iconType="circle"
          />
          <Bar
            yAxisId="left"
            dataKey={dataKey}
            fill="#4f46e5"
            radius={[4, 4, 0, 0]}
            onMouseEnter={(_, index) => setHoveredBar(index)}
            onMouseLeave={() => setHoveredBar(null)}
          >
            {data.map((_, index) => (
              <motion.rect
                key={`bar-${index}`}
                initial={{ scaleY: 0 }}
                animate={{
                  scaleY: 1,
                  fill: hoveredBar === index ? '#6366f1' : '#4f46e5',
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              />
            ))}
          </Bar>
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="qoq_growth_percentage"
            stroke="#06b6d4"
            strokeWidth={2}
            dot={{ fill: '#06b6d4', r: 4 }}
            activeDot={{ r: 6, fill: '#22d3ee' }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </motion.div>
  )
}