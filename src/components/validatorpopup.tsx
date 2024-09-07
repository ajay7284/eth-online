import React from 'react';

type Operator = {
  name: string;
  id: number;
  percentage: number;
};

type ValidatorProps = {
  publicKey?: string;
  cluster?: string;
  status?: string;
  owner?: string;
  balance?: string;
  operators?: Operator[];
};
function formatPerformance(value) {
    // Ensure value is a number and is not undefined or null
    return (typeof value === 'number' && !isNaN(value)) ? value.toFixed(2) : '0.00';
  }

export default function OperatorInfovalidator({ 
  publicKey = '', 
  cluster = '', 
  status = '', 
  owner = '', 
  balance = '', 
  operators = []
}: ValidatorProps) {
debugger;
  const truncateKey = (key: string) => {
    if (key.length > 10) {
      return `${key.slice(0, 6)}...${key.slice(-4)}`;
    }
    return key;
  };

  return (
    <div className="bg-gray-900 text-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">
          Validator {truncateKey(publicKey)}
        </h2>
      </div>
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-4 gap-4">
          <span className="font-medium text-gray-400">Public Key</span>
          <span className="col-span-3">{publicKey}</span>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <span className="font-medium text-gray-400">Cluster</span>
          <span className="col-span-3">{cluster}</span>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <span className="font-medium text-gray-400">Status</span>
          <span className="col-span-3">
            <span 
              className={`px-2 py-1 rounded text-sm ${status.toLowerCase() === 'active' ? 'bg-green-600' : 'bg-red-600'}`}
            >
              {status}
            </span>
            {status.toLowerCase() === 'active' && (
              <span className="ml-2 text-sm text-gray-400">
                , the validator performed at least one successful duty in the last two epochs
              </span>
            )}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <span className="font-medium text-gray-400">Owner</span>
          <span className="col-span-3">{owner}</span>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <span className="font-medium text-gray-400">Balance</span>
          <span className="col-span-3">{balance}</span>
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-bold mb-4">Operators</h3>
        <div className="grid grid-cols-4 gap-4">
          {operators.map((operator) => (
            <div key={operator.id} className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-400">ID: {operator.id}</span>
                </div>
                <h4 className="text-sm mb-2 truncate">{operator.name}</h4>
                <p className="text-2xl font-bold">{formatPerformance(operator.performance['24h'])}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
