'use client'
import About from "@/components/About";
import Hero from "@/components/Hero";
import { Navbar } from "@/components/Navbar";




export default function Home() {
  return (
    <div id="#top" className=" mx-auto py-2 px-4 flex flex-col">
      <Navbar/>
      <Hero />  
      <About/>
    </div>
  );
}
