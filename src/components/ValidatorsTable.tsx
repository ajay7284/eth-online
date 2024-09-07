'use client'
import { useState, useEffect } from 'react'
import { CheckCircleIcon, CopyIcon, CheckIcon, XCircleIcon } from 'lucide-react'
import copy from 'clipboard-copy'

export default function ValidatorsTable() {
  const [validators, setValidators] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [copiedStates, setCopiedStates] = useState({})

  useEffect(() => {
    fetchValidators()
  }, [])

  const fetchValidators = async () => {
    try {
      const response = await fetch('/api/get-data-validators')
      if (!response.ok) {
        throw new Error('Failed to fetch validators')
      }
      const data = await response.json()
      setValidators(data.validators)
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  const handleCopy = (text, field, index) => {
    copy(text)
    setCopiedStates({ ...copiedStates, [`${field}-${index}`]: true })
    setTimeout(() => {
      setCopiedStates({ ...copiedStates, [`${field}-${index}`]: false })
    }, 2000)
  }

  if (loading) return <div className="text-white">Loading...</div>
  if (error) return <div className="text-red-500">Error: {error}</div>

  return (
    <div className="bg-gray-900 text-gray-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Validators</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">Public Key</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">Owner</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">Cluster</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">Status</th>
            </tr>
          </thead>
          <tbody>
            {validators.map((validator, index) => (
              <tr key={index} className="border-b border-gray-800 hover:bg-gray-800">
                <td className="py-3 px-4 text-sm">{validator.public_key.slice(0, 10)}...{validator.public_key.slice(-4)}</td>
                <td className="py-3 px-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="bg-blue-900 text-blue-300 py-1 px-2 rounded-full">
                      {validator.owner_address.slice(0, 6)}...{validator.owner_address.slice(-4)}
                    </span>
                    <button
                      onClick={() => handleCopy(validator.owner_address, 'owner', index)}
                      className="text-gray-400 hover:text-gray-200 transition-colors"
                    >
                      {copiedStates[`owner-${index}`] ? (
                        <CheckIcon className="w-4 h-4" />
                      ) : (
                        <CopyIcon className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <span>{validator.cluster.slice(0, 6)}...{validator.cluster.slice(-4)}</span>
                    <button
                      onClick={() => handleCopy(validator.cluster, 'cluster', index)}
                      className="text-gray-400 hover:text-gray-200 transition-colors"
                    >
                      {copiedStates[`cluster-${index}`] ? (
                        <CheckIcon className="w-4 h-4" />
                      ) : (
                        <CopyIcon className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </td>
                <td className="py-3 px-4">
                  {validator.status === 'Active' ? (
                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircleIcon className="w-5 h-5 text-red-500" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}