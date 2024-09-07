"use client";
import { useState, useEffect } from "react";
import {
  CheckCircleIcon,
  CopyIcon,
  CheckIcon,
  XCircleIcon,
} from "lucide-react";
import copy from "clipboard-copy";

export default function DataTable() {
  const [operators, setOperators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedStates, setCopiedStates] = useState({});

  useEffect(() => {
    fetchOperators();
  }, []);

  const fetchOperators = async () => {
    try {
      const response = await fetch("/api/get-data-operators");
      if (!response.ok) {
        throw new Error("Failed to fetch operators");
      }
      const data = await response.json();
      // Extracting only relevant fields: name, owner_address, validators, status
      const formattedData = data.operators.map((operator) => ({
        name: operator.name,
        owner_address: operator.owner_address,
        validators: operator.validators_count,
        status: operator.status === "Active" ? "Active" : "Inactive",
        logo: operator.logo,
      }));
      setOperators(formattedData);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleCopy = (text, field, index) => {
    copy(text);
    setCopiedStates({ ...copiedStates, [`${field}-${index}`]: true });
    setTimeout(() => {
      setCopiedStates({ ...copiedStates, [`${field}-${index}`]: false });
    }, 2000);
  };

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

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
            {operators.map((operator, index) => (
              <tr
                key={index}
                className="border-b border-gray-800 hover:bg-gray-800"
              >
                <td className="py-3 px-4 text-sm">
                  {" "}
                  <div className="flex items-center space-x-2">
                    {/* Image before the operator name */}
                    <img
                      src={operator.logo || '/icons/logo.png'} // Assuming the operator object has a logo URL
                      alt={`${operator.name} logo`}
                      className="w-6 h-6 rounded-full"
                    />
                    {/* Operator name */}
                    <span >{operator.name}</span>
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
                <td className="py-3 px-4 text-sm">
                  {operator.validators}
                </td>
                <td className="py-3 px-4">
                  {operator.status === "Active" ? (
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
  );
}
