import Image from "next/image";
import Hero from "@/components/Hero";
import Navbar from "@/components/ui/Navbar";
import DataTable from "@/components/DataTable";
import ValidatorsTable from "@/components/ValidatorsTable";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1D1454] text-black">
      <Navbar />
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2">
            <DataTable />
          </div>
          <div className="w-full lg:w-1/2">
            <ValidatorsTable />
          </div>
        </div>
      </div>
    </div>
  );
}