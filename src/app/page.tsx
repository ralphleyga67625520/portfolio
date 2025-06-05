'use client'
import About from "@/components/About";
import { ContactForm } from "@/components/ContactForm";
import Education from "@/components/Education";
import Hero from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import { ChevronUpIcon } from "lucide-react";
import { useEffect, useState } from "react";





export default function Home() {
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <div id="top" className="relative mx-auto py-2 px-4 flex flex-col gap-2 dark:bg-transparent bg-neutral-100">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Education />
      <ContactForm />
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-110 bg-neutral-900 text-white dark:text-neutral-900 flex justify-center items-center cursor-pointer dark:bg-white z-50"
          aria-label="Scroll to top"
        >
          <ChevronUpIcon className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}
