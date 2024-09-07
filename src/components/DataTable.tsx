"use client"
import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import { useEffect } from "react";
import AOS from 'aos';

const operators = [
  {
    id: 990,
    name: "P2P_org Bitge...",
    logo: "https://link.to.logo/p2p.png",
    validators: 500,
  },
  {
    id: 991,
    name: "P2P_org Bitge...",
    logo: "https://link.to.logo/p2p.png",
    validators: 500,
  },
  {
    id: 992,
    name: "P2P_org Bitge...",
    logo: "https://link.to.logo/p2p.png",
    validators: 500,
  },
  {
    id: 993,
    name: "P2P_org Bitge...",
    logo: "https://link.to.logo/p2p.png",
    validators: 500,
  },
  {
    id: 817,
    name: "Swell X Kiln ...",
    logo: "https://link.to.logo/swell.png",
    validators: 500,
  },
  {
    id: 818,
    name: "Swell X Kiln ...",
    logo: "https://link.to.logo/swell.png",
    validators: 500,
  },
];

export default function DataTable() {
    useEffect(() => {
        AOS.init({ duration: 1000 }); // Initialize AOS with desired options
      }, []);
  return (
    <div className="bg-[rgba(249,250,251,0.1)] p-4 w-[40%] ml-[10%] rounded-lg"
    data-aos="fade-right" // Apply AOS fade-left animation
    data-aos-duration="1000" // Optional: Adjust the duration of the animation
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Operators</h2>
        <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 active:bg-blue-700 active:scale-95">
          View More
        </button>
      </div>
      
      <Table
        aria-label="Operators table"
        css={{
          height: "auto",
          minWidth: "100%",
          backgroundColor: "#0D1A2D",
        }}
        selectionMode="none"
      >
        <TableHeader>
          <TableColumn>
            <span className="text-white mr-[250px]">Name Operator</span>
          </TableColumn>
          <TableColumn>
            <span className="text-white">Validators</span>
          </TableColumn>
        </TableHeader>
        <TableBody items={operators}>
          {(item) => (
            <TableRow key={item.id} 
            className="hover:bg-[rgba(255,255,255,0.05)] cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
              <TableCell className="py-2">
                <div className="flex items-center space-x-4">
                  <div className="w-[40px] h-[40px] overflow-hidden rounded-md shadow-lg transition-transform duration-300 hover:scale-110">
                    <img
                      src='/image/bg3.jpg'
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-white font-semibold">{item.name}</p>
                    <p className="text-gray-400">ID: {item.id}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-white ml-[30px]">{item.validators}</span>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}