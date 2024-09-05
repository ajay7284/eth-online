import React from "react";
import NumberTickerDemo from "./magicui/NumberTickerDemo";

export default function NumberData() {
  return (
    <div
      className="w-[80%] ml-[10%]  h-[110px]  bg-transparent rounded-lg shadow-[0_4px_30px_rgba(0,0,0,0.1)] 
    backdrop-blur-[7.4px] border border-white/50 py-[25px] px-[70px] flex gap-[60px] mt-[60px]"
    >
      <div>
        <NumberTickerDemo />
        <h1 className="text-white block">Validators</h1>
      </div>
      <div>
        <div className="ml-[40px]">
          <NumberTickerDemo />
        </div>
        <h1 className="text-white block">7d Validators Growth</h1>
      </div>{" "}
      <div>
        <div className="ml-[40px]">
          <NumberTickerDemo />
        </div>{" "}
        <h1 className="text-white block">30d Validators Growth</h1>
      </div>{" "}
      <div>
        <div>
          <NumberTickerDemo />
        </div>{" "}
        <h1 className="text-white block">Operators</h1>
      </div>{" "}
      <div>
        <div className="ml-[10px]">
          <NumberTickerDemo />
        </div>
        <h1 className="text-white block">7d Operatos</h1>
      </div>
      <div>
        <div className="ml-[10px]">
          <NumberTickerDemo />
        </div>
        <h1 className="text-white block ">30d Operator</h1>
      </div>
    </div>
  );
}
