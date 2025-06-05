'use client'
import About from "@/components/About";
import { ContactForm } from "@/components/ContactForm";
import Education from "@/components/Education";
import Hero from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";




export default function Home() {
  return (
    <div id="top" className=" mx-auto py-2 px-4 flex flex-col gap-2 dark:bg-transparent bg-neutral-100">
      <Navbar/>
      <Hero />  
      <About/>
      <Skills/>
      <Projects/>
      <Education/>
      <ContactForm/>
    </div>
  );
}
