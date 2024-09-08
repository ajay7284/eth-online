"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { IoIosHome } from "react-icons/io";
import { usePathname } from 'next/navigation'; // Import usePathname
import { BiSolidDashboard } from "react-icons/bi";



export default function Navbar() {
  const [scrolling, setScrolling] = useState(false);
  const pathname = usePathname(); // Use usePathname

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`px-8 py-4 fixed top-0 left-0 w-full  transition-all duration-300 z-1111 ${
        scrolling ? "bg-[#1D1454] shadow-xl" : "bg-transparent"
      }`}
      style={{ zIndex: 1111 }}

    >
      <div className="container mx-auto  ">
        <div className="flex items-center">
          <Link href="/">
            <div className="flex rounded-full bg-white cursor-pointer ">
              <Image
                className="rounded-full shadow-lg transform hover:scale-110 transition-transform duration-200"
                src="/icons/log.jpg"
                alt="Logo"
                width={60}
                height={60}
              />
            </div>
          </Link>

          <div className="flex items-center justify-between space-x-4 ml-[35%] bg-white shadow-lg rounded-full py-2 px-4 w-[300px]">
            <Link href="/" passHref>
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={`cursor-pointer w-[70px] flex items-center gap-[3px] ${pathname === "/" ? "font-bold" : ""}`}
              >
                <IoIosHome />
                Home
              </motion.div>
            </Link>

            <Link href="/dashboard" passHref>
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={`cursor-pointer w-[90px] flex items-center gap-[3px]  ${pathname === "/dashboard" ? "font-bold" : ""}`}
              >
                Dashboard
              </motion.div>
            </Link>

            <Link href="/dao" passHref>
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={`cursor-pointer  w-[90px] flex items-center gap-[3px]  ${pathname === "/dao" ? "font-bold" : ""}`}
              >
                DAO
              </motion.div>
            </Link>
          
          </div>
        </div>
      </div>
    </nav>
  );
}
