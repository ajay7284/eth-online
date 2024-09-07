"use client";
import React, { useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import 'aos/dist/aos.css'; // Import AOS styles
import AOS from 'aos';

const validators = [
  { publicKey: "0x849d44...fd8f2a", operators: ["SSV Labs", "SSV Labs 2", "SSV Labs 3", "SSV Labs 4"] },
  { publicKey: "0xaf4e0b...8806b9", operators: ["SSV Labs", "SSV Labs 2", "SSV Labs 3", "SSV Labs 4"] },
  { publicKey: "0x84d4f2...833388", operators: ["SSV Labs", "SSV Labs 2", "SSV Labs 3", "SSV Labs 4"] },
  { publicKey: "0xaf89b5...63c484", operators: ["SSV Labs", "SSV Labs 2", "SSV Labs 3", "SSV Labs 4"] },
  { publicKey: "0xb8aa5e...7ecb8d", operators: ["SSV Labs", "SSV Labs 2", "SSV Labs 3", "SSV Labs 4"] },
  { publicKey: "0xb561ed...9134da", operators: ["SSV Labs", "SSV Labs 2", "SSV Labs 3", "SSV Labs 4"] },
  { publicKey: "0x8975f4...108cb6", operators: ["SSV Labs", "SSV Labs 2", "SSV Labs 3", "SSV Labs 4"] },
];

export default function ValidatorsTable() {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with desired options
  }, []);

  return (
    <div
      className="bg-[rgba(249,250,251,0.1)] p-4 w-[45%] ml-[2%] rounded-lg overflow-hidden"
      data-aos="fade-left" // Apply AOS fade-left animation
      data-aos-duration="1000" // Optional: Adjust the duration of the animation
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Validators</h2>
        <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 active:bg-blue-700 active:scale-95">
          View More
        </button>
      </div>
      
      <Table
        aria-label="Validators table"
        css={{
          height: "auto",
          minWidth: "100%",
          backgroundColor: "#0D1A2D",
        }}
        selectionMode="none"
      >
        <TableHeader>
          <TableColumn>
            <span className="text-gray-400">Public Key</span>
          </TableColumn>
          <TableColumn>
            <span className="text-gray-400">Operators</span>
          </TableColumn>
        </TableHeader>
        <TableBody items={validators}>
          {(item) => (
            <TableRow
              key={item.publicKey}
              className="border-b border-[#1A2A3D] hover:bg-[#1A2A3D] cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              data-aos="fade-left" // Apply AOS fade-left animation
              data-aos-duration="1000" // Optional: Adjust the duration of the animation
            >
              <TableCell className="py-3">
                <span className="text-[#3694FF]">{item.publicKey}</span>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-2">
                  {item.operators.map((operator, index) => (
                    <span key={index} className="text-white">{operator}</span>
                  ))}
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
