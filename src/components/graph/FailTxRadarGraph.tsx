import React, { useState, useEffect } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from 'recharts';

interface Transaction {
    transaction_type: string
    failed_in_last_30_days: number
  }
  
  interface Props {
    transactions: Transaction[]
  }
const FailTxRadarGraph: React.FC = () => {
  const [chartData, setChartData] = useState<any[]>([]);
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
        const data = await fetch('/api/get-fail-tx');
        const response = await data.json();
        console.log(response);
        setChartData(response.failTx.result.rows);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Function to transform the data for the radar chart
  const transformData = (data: any[]) => {
    // const maxValidators = Math.max(...data.map(d => d.validators));
    return data.map(item => ({
      subject: item.transaction_type,
      fullMark: item.failed_in_last_30_days
    })).slice(0, 7);
  };

  const radarChartData = transformData(chartData);

  return (
    <div className="w-full h-[900px] p-4 bg-[rgba(249,250,251,0.1)] rounded-lg shadow-xl flex">
        <div className="w-[900px]  rounded-lg  ">
      <h2 className="text-2xl font-bold text-white mb-4">Failed transaction in 30 days</h2>
      <ResponsiveContainer width="90%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarChartData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 'dataMax']} />
          <Radar name="subject" dataKey="fullMark" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}  />
          <Legend wrapperStyle={{ bottom: 55 }} />        </RadarChart>
      </ResponsiveContainer>
      </div>
      <div className="p-4 bg-[rgba(249,250,251,0.1)] w-[80%] rounded-lg ">
      <h2 className="text-2xl font-bold mb-4 text-white">Failed TXNS 30d</h2>
      <input
        type="text"
        placeholder="Search transaction types..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border  text-white rounded bg-[rgba(249,250,251,0.1)]"
      />
      <table className="w-full bg-[rgba(249,250,251,0.1)] rounded-lg overflow-hidden">
        <thead className="bg-[rgba(249,250,251,0.1)]">
          <tr>
            <th
              className="p-3 text-left cursor-pointer text-gray-400"
              onClick={() => handleSort('transaction_type')}
            >
              Transaction Type
              {sortColumn === 'transaction_type' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
            </th>
            <th
              className="p-3 text-left cursor-pointer text-gray-400"
              onClick={() => handleSort('failed_in_last_30_days')}
            >
              Failed in Last 30 Days
              {sortColumn === 'failed_in_last_30_days' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedAndFilteredTransactions.map((transaction, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-[rgba(249,250,251,0.1)]' : 'bg-[rgba(249,250,251,0.1)]'}>
              <td className="p-3 border-t text-white">{transaction.transaction_type}</td>
              <td className="p-3 border-t text-center text-white">{transaction.failed_in_last_30_days}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default FailTxRadarGraph;