import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import CompetitiveProgramming from '@/components/CP';
import Projects from '@/components/Projects';
import Certifications from '@/components/Certifications';
import { Button } from '@/components/ui/button';
export default async function Home() {
  return (
    <main className="w-full pb-24">
      <Button variant="secondary" className="mb-6 text-cyan-500 mx-auto w-full sticky top-2 z-50 flex text-[10px] sm:text-xs md:text-sm px-2 py-1 sm:px-4 sm:py-2 h-auto whitespace-normal text-center leading-snug">
        This portfolio is a work in progress. Some sections may be incomplete or missing. Check back soon for updates!
      </Button>
      <Hero />
      <About />
      <Skills />
      <CompetitiveProgramming />
      <Projects />
      <Certifications />
      {/* Add more sections here — e.g. Contact */}
    </main>
  );
}
