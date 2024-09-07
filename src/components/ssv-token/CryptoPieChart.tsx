"use client"

import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

const data = [
  { name: 'USDC', value: 30 },
  { name: 'SSV', value: 20 },
  { name: 'LDO', value: 15 },
  { name: 'ETH', value: 25 },
  { name: 'SSV-ETH LP', value: 10 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export default function CryptoPieChart() {
  return (
    <div className="mr-[26px] p-6 bg-[rgba(249,250,251,0.1)] h-[500px] w-[600px] rounded-lg shadow-lg ">
      <h2 className="text-2xl font-bold text-center text-white mb-4">Crypto Distribution</h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}