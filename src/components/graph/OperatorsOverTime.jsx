'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { format, parseISO, addDays } from 'date-fns'

// Register the required components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

// Generate dummy data for the chart
const generateData = (startDate, days) => {
  let data = []
  let operators = 0
  for (let i = 0; i < days; i++) {
    const date = addDays(startDate, i)
    const added = Math.floor(Math.random() * 3)
    const removed = Math.random() < 0.1 ? 1 : 0
    operators += added - removed
    data.push({
      date: format(date, 'yyyy-MM-dd'),
      operators,
      added,
      removed
    })
  }
  return data
}

const startDate = parseISO('2023-06-01')
const graphData = generateData(startDate, 365)

export default function OperatorsOverTime() {
  const chartData = {
    labels: graphData.map(d => d.date),
    datasets: [
      {
        label: 'Amount Of Operators',
        data: graphData.map(d => d.operators),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.1,
      },
      {
        label: 'Added',
        data: graphData.map(d => d.added),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        tension: 0.1,
      },
      {
        label: 'Removed',
        data: graphData.map(d => d.removed),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        tension: 0.1,
      },
    ],
  }

  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      x: {
        ticks: {
          color: 'rgb(156, 163, 175)',
        },
        grid: {
          color: 'rgba(55, 65, 81, 0.5)',
        },
        // Disable zoom/pan on x-axis
        // (if using plugins like chartjs-plugin-zoom)
      },
      y: {
        ticks: {
          color: 'rgb(156, 163, 175)',
        },
        grid: {
          color: 'rgba(55, 65, 81, 0.5)',
        },
        // Disable zoom/pan on y-axis
        // (if using plugins like chartjs-plugin-zoom)
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'rgb(156, 163, 175)',
        },
      },
      tooltip: {
        enabled: true,  // Enable tooltips if needed
      },
      zoom: {
        // If using chartjs-plugin-zoom, make sure zoom and pan are disabled
        zoom: {
          enabled: false,
        },
        pan: {
          enabled: false,
        },
      },
    },
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart',
    },
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-900 p-6 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-blue-400 mb-4">Amount of Operators Over Time</h2>
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Line
            data={chartData}
            options={options}
          />
        </motion.div>
      </div>
    </div>
  )
}
