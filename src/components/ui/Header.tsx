import React from 'react';

const Header = ({ title }:any) => {
  return (
    <div className="bg-blue-600 p-3 mb-6 text-center w-[500px] mx-auto  rounded-full shadow-md">
      <h1 className="text-3xl font-bold text-white">{title}</h1>
    </div>
  );
};

export default Header;