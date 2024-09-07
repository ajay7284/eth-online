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

// Define types for the data
interface DataPoint {
  date: string;
  operators: number;
  added: number;
  removed: number;
}

export default function OperatorsOverTime({data,title}:{data:any,title:string}): JSX.Element {
  const chartData = {
    labels: data.map((d:any) => d.event_date),
    datasets: [
      {
        label: 'Amount Of Operators',
        data: data.map((d:any) => d.cumulative_net_additions),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.1,
        
      },
      {
        label: 'Added',
        data: data.map((d:any) => d.added_count),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        tension: 0.1,
      },
      {
        label: 'Removed',
        data: data.map((d:any) => d.removed_count),
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
      },
      y: {
        ticks: {
          color: 'rgb(156, 163, 175)',
        },
        grid: {
          color: 'rgba(55, 65, 81, 0.5)',
        },
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
        enabled: true,
      },
    },
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart' as const,
    },
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-900 p-6 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-blue-400 mb-4">Amount of {title} Over Time</h2>
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
