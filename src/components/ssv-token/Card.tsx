"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// PriceCard Component
const PriceCard = ({ productName, price }: any) => {
  const [animatedPrice, setAnimatedPrice] = useState(0);

  useEffect(() => {
    const animation = setInterval(() => {
      setAnimatedPrice(prevPrice => {
        if (prevPrice < price) {
          return prevPrice + Math.ceil((price - prevPrice) / 10);
        } else {
          clearInterval(animation);
          return price;
        }
      });
    }, 50);

    return () => clearInterval(animation);
  }, [price]);

  return (
    <div className="p-4 bg-[rgba(249,250,251,0.1)] rounded-lg shadow-lg flex h-[120px] min-w-[250px] flex-col items-center">
      <h2 className="text-md font-bold text-white mb-2">{productName}</h2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-4xl text-white font-semibold"
      >
        {productName === "SSV Holders" 
          ? animatedPrice.toLocaleString() 
          : `$${animatedPrice.toLocaleString()}`}
      </motion.div>
    </div>
  );
};

const Card = () => {
  const products = [
    { name: "SSV Price On Uniswap", price: 2999.99 },
    { name: "SSV Fully Diluted Valuation", price: 1599.49 },
    { name: "SSV Uniswap Volume 7d", price: 549.99 },
    { name: "SSV Holders", price: 549.99 },
  ];

  return (
    <div className="flex gap-[10px] h-[150px] w-full max-w-[500px] ml-[17%] mt-[50px] card-container">
      {products.map((product, index) => (
        <PriceCard
          key={index}
          productName={product.name}
          price={product.price}
        />
      ))}
    </div>
  );
};

export default Card;
