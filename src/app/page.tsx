import Image from "next/image";
import Hero from "@/components/Hero";
import Navbar from "@/components/ui/Navbar";
import DataTable from "@/components/DataTable";
import ValidatorsTable from "@/components/ValidatorsTable";

export default function Home() {
  return (
   <div
    style={{
   backgroundColor:"#1D1454",
   width:"100%",
   height:"100%"
  }}
  >
    <Navbar/>
    <Hero/>
    <div className='flex mt-[20px]'>
      <DataTable/>
      <ValidatorsTable/>
      </div>
   </div>
  );
}
