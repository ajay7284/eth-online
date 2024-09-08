'use client'

import React, { useState, useEffect } from 'react'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'

interface Transaction {
  transaction_type: string
  failed_in_last_30_days: number
}

const FailTxRadarGraph: React.FC = () => {
  const [chartData, setChartData] = useState<Transaction[]>([])
  const [sortColumn, setSortColumn] = useState<keyof Transaction>('failed_in_last_30_days')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [searchTerm, setSearchTerm] = useState('')

  const handleSort = (column: keyof Transaction) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('desc')
    }
  }

  const sortedAndFilteredTransactions = chartData
    .filter(transaction =>
      transaction.transaction_type.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1
      if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1
      return 0
    })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch('/api/get-fail-tx')
        const response = await data.json()
        setChartData(response.failTx.result.rows)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const transformData = (data: Transaction[]) => {
    return data.map(item => ({
      subject: item.transaction_type,
      A: item.failed_in_last_30_days,
      fullMark: Math.max(...data.map(d => d.failed_in_last_30_days))
    })).slice(0, 7)
  }

  const radarChartData = transformData(chartData)

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-[800px] p-4 bg-opacity-30 bg-purple-900 rounded-lg shadow-xl flex backdrop-blur-sm"
    >
      <div className="w-[900px] rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-teal-300 mb-4">Failed transaction in 30 days</h2>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarChartData}>
            <PolarGrid stroke="rgba(255, 255, 255, 0.2)" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#e2e8f0' }} />
            <PolarRadiusAxis angle={30} domain={[0, 'dataMax']} tick={{ fill: '#e2e8f0' }} />
            <Radar name="Failed Transactions" dataKey="A" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.6} />
            <Legend wrapperStyle={{ color: '#e2e8f0' }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="p-4 bg-opacity-50 bg-gray-800 w-full rounded-lg shadow ml-4">
        <h2 className="text-2xl font-bold mb-4 text-teal-300">Failed TXNS 30d</h2>
        <input
          type="text"
          placeholder="Search transaction types..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 mb-4 border rounded bg-gray-700 text-white placeholder-gray-400"
        />
        <div className="overflow-x-auto">
          <table className="w-full bg-opacity-50 bg-gray-900 rounded-lg overflow-hidden">
            <thead className="bg-opacity-50 bg-gray-800">
              <tr>
                <th
                  className="p-3 text-left cursor-pointer text-teal-300"
                  onClick={() => handleSort('transaction_type')}
                >
                  Transaction Type
                  {sortColumn === 'transaction_type' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                </th>
                <th
                  className="p-3 text-left cursor-pointer text-teal-300"
                  onClick={() => handleSort('failed_in_last_30_days')}
                >
                  Failed in Last 30 Days
                  {sortColumn === 'failed_in_last_30_days' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedAndFilteredTransactions.map((transaction, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-opacity-25 bg-gray-800' : 'bg-opacity-25 bg-gray-700'}>
                  <td className="p-3 border-t border-gray-700 text-gray-300">{transaction.transaction_type}</td>
                  <td className="p-3 border-t border-gray-700 text-center text-gray-300">{transaction.failed_in_last_30_days}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  )
}

export default FailTxRadarGraph