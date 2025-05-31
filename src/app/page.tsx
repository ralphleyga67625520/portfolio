'use client'
import About from "@/components/About";
import Hero from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
// import Projects from "@/components/Projects";
import Skills from "@/components/Skills";




export default function Home() {
  return (
    <div id="#top" className=" mx-auto py-2 px-4 flex flex-col gap-2">
      <Navbar/>
      <Hero />  
      <About/>
      <Skills/>
      {/* <Projects/> */}
    </div>
  );
}
