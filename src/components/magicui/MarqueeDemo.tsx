import { cn } from "@/lib/utils";
import Marquee from "../lib/CardUtil";
import NumberTickerDemo from "./NumberTickerDemo";
import { url } from "inspector";

const data = [
  { type: "Registered Validators", value: 100 },
  { type: "7d Validators Growth", value: 100 },
  { type: "30d Validators Growth", value: 100 },
  { type: "Operators", value: 5000 },
  { type: "7d Operator  Growth", value: 50 },
  { type: "30d Operator Growth", value: 100 },
];

const DataCard = ({ type, value }: { type: string; value: number }) => {
  return (
    <figure
      className={cn(
        "relative w-64 h-[160px] cursor-pointer overflow-hidden rounded-xl border p-4 shadow-2xl",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <img
        src="/image/up.png"
        alt=""
        style={{
          height: "40px",
          width: "40px",
          position: "absolute",
          right: "15px",
          top:"5px"
        }}
      />

      <h1>
        <h1
          className="text-white shadow-xl text-bold text-md"
          style={{
            fontSize: "24x",
            fontWeight:"bold"
          }}
        >
          {type}
        </h1>
      </h1>
      <div className="flex flex-col justify-center ml-[30%] mt-[5px] h-[100px] w-[100px] rounded-full bg-[#000] shadow-2xl  items-center gap-2">
        <NumberTickerDemo value={value} />
      </div>
    </figure>
  );
};

export default function MarqueeDemo() {
  return (
    <div className="relative flex h-[250px] w-[80%] ml-[0%] items-center mt-[30px] overflow-hidden bg-background ">
      <Marquee pauseOnHover className="[--duration:20s]">
        {data.map((item) => (
          <DataCard key={item.type} {...item} />
        ))}
      </Marquee>
      {/* Uncomment if you want to add the second row */}
      {/* <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((item) => (
          <DataCard key={item.type} {...item} />
        ))}
      </Marquee> */}
      {/* <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div> */}
    </div>
  );
}
