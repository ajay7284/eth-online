import React, { useState, useEffect } from 'react';
import LiquidationEventsTable from './LiquidationEventTable';

interface LiquidationData {
  liquidation_event_count: number;
  liquidator_address: string;
  total_value_ssv: number;
}

export default function LiquidationTable() {
  const [data, setData] = useState<LiquidationData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getdata = async (retryCount = 3, delay = 2000) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/get-liquidation');
      if (response.status === 500) {
        if (retryCount > 0) {
          console.warn(`Rate limit hit, retrying after ${delay}ms...`);
          setTimeout(() => getdata(retryCount - 1, delay * 2), delay);
        } else {
          throw new Error('Exceeded retry limit. Please try again later.');
        }
        return;
      }
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log('Data:', data);
      setData(data.liquidationByLiquidator.result.rows);
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    getdata();
  }, []);

  if (isLoading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <>
    <div className="p-4 bg-gray-900 text-gray-100 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Liquidations by Liquidator</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-2 text-left border-b border-gray-700">Liquidator Address</th>
              <th className="p-2 text-left border-b border-gray-700">Liquidation Event Count</th>
              <th className="p-2 text-left border-b border-gray-700">Total Value SSV</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-800">
                <td className="p-2 border-b border-gray-700 font-mono">{item.liquidator_address}</td>
                <td className="p-2 border-b border-gray-700">{item.liquidation_event_count}</td>
                <td className="p-2 border-b border-gray-700">{item.total_value_ssv.toFixed(8)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <div className="mt-4">

      <LiquidationEventsTable/>
    </div>
      </>
  );
}