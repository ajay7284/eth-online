import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
   <div
    style={{
   backgroundColor:"black",
   width:"100%",
   height:"100vh"
  }}
  >
    <Sidebar/>
    <Hero/>
   </div>
  );
}
