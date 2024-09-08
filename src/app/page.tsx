import Image from "next/image";
import Hero from "@/components/Hero";
import Navbar from "@/components/ui/Navbar";
import DataTable from "@/components/OperatorTable";
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
      <SsvAnalysis />
     
    </div>
  );
}