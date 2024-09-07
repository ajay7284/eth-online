"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { IoIosHome } from "react-icons/io";

export default function Navbar() {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
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
      className={`px-8 fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolling ? 'bg-white shadow-xl' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto">
        <div className="flex items-center">
          <Link href="/">
            <div className="flex   rounded-full bg-white cursor-pointer">
                <Image
                  className="rounded-full shadow-lg   transform hover:scale-110 transition-transform duration-200"
                  src="/icons/log.jpg"
                  alt="Logo"
                  width={70}
                  height={70}
                />
            </div>
          </Link>

          <div className="flex items-center space-x-4 ml-[35%] bg-white shadow-lg rounded-full py-2 px-4 w-[320px]">
            <motion.div
              whileTap={{ scale: 0.9, rotate: -10 }}
              className="cursor-pointer"
            >
              <Link href="/" className="flex gap-1 items-center justify-center">
                <IoIosHome />
                Home
              </Link>
            </motion.div>

            <motion.div
              whileTap={{ scale: 0.9, rotate: -10 }}
              className="cursor-pointer"
            >
              <Link href="/explore-daos">Explore DAOs</Link>
            </motion.div>

            <motion.div
              whileTap={{ scale: 0.9, rotate: -10 }}
              className="cursor-pointer"
            >
              <Link href="/dashboard">Dashboard</Link>
            </motion.div>
          </div>
        </div>
      </div>
    </nav>
  );
}
