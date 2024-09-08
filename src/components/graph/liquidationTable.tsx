import React, { useState, useMemo } from 'react'

type Liquidation = {
  liquidatorAddress: string
  amountOfLiquidations: number
  totalSSV: number
}

const mockData: Liquidation[] = [
  { liquidatorAddress: "0xd683b81c2608980db90a6fd730153e04629ff1a3", amountOfLiquidations: 69, totalSSV: 110.38677943622001 },
  { liquidatorAddress: "0x5bc2a9ad00cf026d515766344b7155220def5ff", amountOfLiquidations: 20, totalSSV: 31.99992814175 },
  { liquidatorAddress: "0x4dfec6459664e69adc8714c8358eb15ebe823a0a", amountOfLiquidations: 10, totalSSV: 15.99996719866 },
  { liquidatorAddress: "0x00980c7e1a0029d7a1d51400b100a1d548430000", amountOfLiquidations: 6, totalSSV: 49.39554759348 },
  { liquidatorAddress: "0x82761dc889b1ecff804dcf56aa8f9854624fbd7", amountOfLiquidations: 4, totalSSV: 6.3999794979 },
  { liquidatorAddress: "0xe3b31a6cd0f9f630bbe26cca9283943e87d1a8d2", amountOfLiquidations: 2, totalSSV: 3.19999250043 },
  { liquidatorAddress: "0x3aa228a80f50763045bdfc45012da124bd0a6809", amountOfLiquidations: 1, totalSSV: 48.82841995891004 },
  { liquidatorAddress: "0x6980a47bee930a4584b09ee79ebe46484fbdbd0", amountOfLiquidations: 1, totalSSV: 1.59999645049 },
]

export default function LiquidationTable() {
  const [data] = useState(mockData)
  const [sortColumn, setSortColumn] = useState<keyof Liquidation | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const handleSort = (column: keyof Liquidation) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const sortedData = useMemo(() => {
    if (!sortColumn) return data
    return [...data].sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1
      if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1
      return 0
    })
  }, [data, sortColumn, sortDirection])

  const filteredData = useMemo(() => {
    return sortedData.filter(item => 
      item.liquidatorAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.amountOfLiquidations.toString().includes(searchTerm) ||
      item.totalSSV.toString().includes(searchTerm)
    )
  }, [sortedData, searchTerm])

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredData.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredData, currentPage])

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  return (
    <div className="p-4 bg-gray-900 text-gray-100 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-2">Liquidations by liquidator</h2>
      <p className="text-sm text-gray-400 mb-4">Accounts for all liquidation events where the receiver is not the owner</p>
      
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full mb-4 p-2 bg-gray-800 text-gray-100 border border-gray-700 rounded"
      />

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {['liquidatorAddress', 'amountOfLiquidations', 'totalSSV'].map((column) => (
                <th
                  key={column}
                  className="p-2 text-left border-b border-gray-700 cursor-pointer"
                  onClick={() => handleSort(column as keyof Liquidation)}
                >
                  {column === 'liquidatorAddress' ? 'Liquidator Address' : 
                   column === 'amountOfLiquidations' ? 'Amount of Liquidations' : 'Total SSV'}
                  {sortColumn === column && (
                    <span className="ml-1">
                      {sortDirection === 'asc' ? '▲' : '▼'}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-800">
                <td className="p-2 border-b border-gray-700 font-mono">{item.liquidatorAddress}</td>
                <td className="p-2 border-b border-gray-700">{item.amountOfLiquidations}</td>
                <td className="p-2 border-b border-gray-700">{item.totalSSV.toFixed(8)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-400">
          Showing {paginatedData.length} of {filteredData.length} results
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-800 text-gray-100 rounded disabled:opacity-50"
          >
            ←
          </button>
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-800 text-gray-100 rounded disabled:opacity-50"
          >
            →
          </button>
        </div>
      </div>
    </div>
  )
}