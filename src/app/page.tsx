import Image from "next/image";
import Hero from "@/components/Hero";
import Navbar from "@/components/ui/Navbar";
import DataTable from "@/components/DataTable";
import ValidatorsTable from "@/components/ValidatorsTable";
import MarqueeDemo from "@/components/magicui/MarqueeDemo";
import DaoSection from "@/components/ssv-token/DaoSection";
import ViewMoreBtn from "@/components/ssv-token/ViewMoreBtn";
import SsvAnalysis from "@/components/SsvAnalysis";

export default function Home() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <Navbar />
      <Hero />
      <DaoSection />
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

      <SsvAnalysis />
    </div>
  );
}