"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import NetworkGrowth from "../dashboard/NetworkGrowth";
import FailedTransaction from "../dashboard/FailedTransaction";
import NetworkDistribution from "../dashboard/NetworkDistribution";
import Liquidation from "../dashboard/Liquidation";

// Define the type for the option objects
interface Option {
  id: number;
  name: string;
}

export default function Options() {
  // Sample options array with id and name
  const optionsArray: Option[] = [
    { id: 1, name: "Network Growth" },
    { id: 2, name: "Failed Transaction" },
    { id: 3, name: "Network Distribution" },
    { id: 4, name: "Liquidation" },
  ];

  const [selectedOption, setSelectedOption] = useState<number>(optionsArray[0].id);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [dropdownHeight, setDropdownHeight] = useState<number>(0);

  // Update the dropdown height when it opens/closes
  useEffect(() => {
    if (dropdownRef.current) {
      setDropdownHeight(dropdownRef.current.scrollHeight);
    }
  }, [isOpen]);

  // Handle option click event
  const handleOptionClick = (id: number) => {
    setSelectedOption(id);
    setIsOpen(false);
  };

  // Toggle the dropdown menu
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Conditionally render the selected component
  const renderSelectedComponent = () => {
    switch (selectedOption) {
      case 1:
        return <NetworkGrowth />;
      case 2:
        return <FailedTransaction />;
      case 3:
        return <NetworkDistribution />;
      case 4:
        return <Liquidation />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="w-full flex justify-end p-4"> {/* Added container for right alignment */}
        <div className="relative inline-block text-left w-64">
          <div
            className="w-full py-2 px-4 bg-white border border-gray-300 rounded-lg shadow focus:outline-none focus:ring focus:border-blue-300 transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer flex justify-between items-center"
            onClick={toggleDropdown}
          >
            <span>{optionsArray.find(option => option.id === selectedOption)?.name}</span>
            <ChevronDown className={`ml-2 h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
          </div>
          <div 
            ref={dropdownRef}
            className={`absolute z-10 right-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0'}`}
            style={{ maxHeight: isOpen ? `${dropdownHeight}px` : '0px' }}
          >
            {optionsArray.map((option) => (
              <div
                key={option.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                onClick={() => handleOptionClick(option.id)}
              >
                {option.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Render the selected component */}
      <div className="mt-8">
        {renderSelectedComponent()}
      </div>
    </>
  );
}
