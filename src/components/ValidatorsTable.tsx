'use client'

import { useState, useEffect } from 'react'
import { CheckCircleIcon, CopyIcon, CheckIcon, XCircleIcon, X, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import copy from 'clipboard-copy'
import OperatorInfovalidator from './validatorpopup' // Adjust according to your modal component

export default function ValidatorsTable() {
  const [validators, setValidators] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [copiedStates, setCopiedStates] = useState({})
  const [selectedValidator, setSelectedValidator] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const itemsPerPage = 10

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
      setTotalPages(Math.ceil(data.validators.length / itemsPerPage))
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

  const openModal = (validator) => {
    setSelectedValidator(validator)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setSelectedValidator(null)
    setIsModalOpen(false)
  }

  const goToPage = (page) => {
    setCurrentPage(page)
  }

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return validators.slice(startIndex, endIndex)
  }

  if (loading) return <div className="text-white">Loading...</div>
  if (error) return <div className="text-red-500">Error: {error}</div>

  const paginatedValidators = getPaginatedData()

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
            {paginatedValidators.map((validator, index) => (
              <tr key={index} className="border-b border-gray-800 hover:bg-gray-800">
                <td className="py-3 px-4 text-sm">{validator.public_key.slice(0, 10)}...{validator.public_key.slice(-4)}</td>
                <td className="py-3 px-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <span 
                      onClick={() => openModal(validator)}
                      className="bg-blue-900 text-blue-300 py-1 px-2 rounded-full cursor-pointer hover:bg-blue-700 hover:underline"
                    >
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
                <td className="py-3 px-4 text-sm">{validator.cluster.slice(0, 6)}...{validator.cluster.slice(-4)}</td>
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

      {totalPages > 1 && (
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
      )}

      {isModalOpen && selectedValidator && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
            <OperatorInfovalidator
              publicKey={selectedValidator.public_key}
              cluster={selectedValidator.cluster}
              status={selectedValidator.status}
              owner={selectedValidator.owner_address}
              operators={selectedValidator.operators}
            />
          </div>
        </div>
      )}
    </div>
  )
}