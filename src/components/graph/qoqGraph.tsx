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

// Define types for the data structure
interface DataPoint {
  quarter: string
  operatorsAmount: number
  qoqGrowth: number
}

const data: DataPoint[] = [
  { quarter: 'Q2-23', operatorsAmount: 9, qoqGrowth: 0 },
  { quarter: 'Q3-23', operatorsAmount: 36, qoqGrowth: 800 },
  { quarter: 'Q4-23', operatorsAmount: 99, qoqGrowth: 175 },
  { quarter: 'Q1-24', operatorsAmount: 274, qoqGrowth: 177 },
  { quarter: 'Q2-24', operatorsAmount: 660, qoqGrowth: 141 },
  { quarter: 'Q3-24', operatorsAmount: 958, qoqGrowth: 45 },
]

// Define types for the tooltip props
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
        className="bg-gray-800 p-4 rounded-lg shadow-lg"
      >
        <p className="text-gray-300 font-bold">{label}</p>
        <p className="text-cyan-400">Operators Amount: {payload[0].value}</p>
        <p className="text-orange-400">QoQ Growth %: {payload[1].value}</p>
      </motion.div>
    )
  }
  return null
}

export default function QoqGraph(): JSX.Element {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 p-6 rounded-lg max-w-2xl mx-auto"
    >
      <h2 className="text-blue-400 text-2xl font-bold mb-4">Operators Growth QoQ</h2>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="quarter" stroke="#9CA3AF" />
          <YAxis yAxisId="left" stroke="#9CA3AF" />
          <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ color: '#9CA3AF' }} />
          <Bar
            yAxisId="left"
            dataKey="operatorsAmount"
            fill="#06B6D4"
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
                  fill: hoveredBar === index ? '#22D3EE' : '#06B6D4',
                }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              />
            ))}
          </Bar>
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="qoqGrowth"
            stroke="#F97316"
            strokeWidth={2}
            dot={{ fill: '#F97316', r: 4 }}
            activeDot={{ r: 6, fill: '#FDBA74' }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
