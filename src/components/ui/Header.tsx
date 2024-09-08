import React from 'react';

const Header = ({ title }:any) => {
  return (
    <div className="bg-blue-600 p-3 mb-6 text-center w-[500px] mx-auto  rounded-full shadow-md  "
    style={{
      boxShadow: "0 0 15px 5px rgba(12, 1, 77, 0.6), 0 0 30px 15px rgba(12, 1, 77, 0.4)"
    }}
    >
      <h1 className="text-3xl font-bold text-white">{title}</h1>
    </div>
  );
};

export default Header;