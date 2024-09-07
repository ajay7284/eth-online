"use client"

import { useState, useEffect } from "react"
import {
  CheckCircleIcon,
  CopyIcon,
  CheckIcon,
  XCircleIcon,
  X,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"
import copy from "clipboard-copy"
import OperatorInfo from "./OperatorInfo"

export default function DataTable() {
  const [operators, setOperators] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [copiedStates, setCopiedStates] = useState({})
  const [hoveredOperator, setHoveredOperator] = useState(null)
  const [selectedOperator, setSelectedOperator] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    fetchOperators()
  }, [])

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeModal()
      }
    }

    window.addEventListener("keydown", handleEscape)

    return () => {
      window.removeEventListener("keydown", handleEscape)
    }
  }, [])

  const fetchOperators = async () => {
    try {
      const response = await fetch("/api/get-data-operators")
      if (!response.ok) {
        throw new Error("Failed to fetch operators")
      }
      const data = await response.json()
      const formattedData = data.operators.map((operator) => ({
        name: operator.name,
        owner_address: operator.owner_address,
        validators: operator.validators_count,
        status: operator.status === "Active" ? "Active" : "Inactive",
        logo: operator.logo,
        location: operator.location,
        eth1_node_client: operator.eth1_node_client,
        eth2_node_client: operator.eth2_node_client,
        mev_relays: operator.mev_relays,
        website_url: operator.website_url,
        twitter_url: operator.twitter_url,
        linkedin_url: operator.linkedin_url,
        public_key: operator.public_key,
        descrption: operator.descrption,
        performance: operator.performance,
        fee: operator.fee,
      }))
      setOperators(formattedData)
      setTotalPages(Math.ceil(formattedData.length / itemsPerPage))
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

  const openModal = (operator) => {
    setSelectedOperator(operator)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setSelectedOperator(null)
    setIsModalOpen(false)
  }

  const goToPage = (page) => {
    setCurrentPage(page)
  }

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return operators.slice(startIndex, endIndex)
  }

  if (loading) return <div className="text-white">Loading...</div>
  if (error) return <div className="text-red-500">Error: {error}</div>

  const paginatedOperators = getPaginatedData()

  return (
    <div className="bg-gray-900 text-gray-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Operators</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">
                Name
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">
                Owner
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">
                Validators
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedOperators.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-3 px-4 text-center text-gray-400">
                  No data available
                </td>
              </tr>
            ) : (
              paginatedOperators.map((operator, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-800 hover:bg-gray-800"
                >
                  <td className="py-3 px-4 text-sm">
                    <div className="flex items-center space-x-2 relative">
                      <img
                        src={operator.logo || "/icons/logo.png"}
                        alt={`${operator.name} logo`}
                        className="w-6 h-6 rounded-full"
                      />
                      <span
                        onMouseEnter={() => setHoveredOperator(operator)}
                        onMouseLeave={() => setHoveredOperator(null)}
                        onClick={() => openModal(operator)}
                        className="cursor-pointer hover:underline"
                      >
                        {operator.name.slice(0, 6)}...{operator.name.slice(-4)}
                      </span>
                      {hoveredOperator === operator && (
                        <div
                          className="absolute left-0 top-full mt-1 p-2 bg-gray-700 text-white rounded shadow-lg z-10 transition-opacity duration-300"
                          style={{ minWidth: "200px" }}
                        >
                          {operator.name}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="bg-blue-900 text-blue-300 py-1 px-2 rounded-full">
                        {operator.owner_address.slice(0, 6)}...
                        {operator.owner_address.slice(-4)}
                      </span>
                      <button
                        onClick={() =>
                          handleCopy(operator.owner_address, "owner", index)
                        }
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
                  <td className="py-3 px-4 text-sm">{operator.validators}</td>
                  <td className="py-3 px-4">
                    {operator.status === "Active" ? (
                      <CheckCircleIcon className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircleIcon className="w-5 h-5 text-red-500" />
                    )}
                  </td>
                </tr>
              ))
            )}
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

      {isModalOpen && selectedOperator && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="bg-gray-900 rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor:
                "rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.1)",
            }}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
            <OperatorInfo {...selectedOperator} />
          </div>
        </div>
      )}
    </div>
  )
}
