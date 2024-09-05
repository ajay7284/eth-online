import NumberTicker from "../lib/Count";

const NumberTickerDemo = () => {
  return (
    <p className="whitespace-pre-wrap ml-[20px] font-medium tracking-tighter text-black dark:text-white">
      <NumberTicker value={100} />
    </p>
  );
};

export default NumberTickerDemo;
