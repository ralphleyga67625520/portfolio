import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import CompetitiveProgramming from '@/components/CP';
import Projects from '@/components/Projects';
import { Button } from '@/components/ui/button';

export default async function Home() {
  return (
    <main className="w-full pb-24">
      <Button variant="secondary" className="mb-6 text-cyan-500 mx-auto w-full sticky top-2 z-50">
        This portfolio is a work in progress. Some sections may be incomplete or missing. Check back soon for updates!
      </Button>
      <Hero />
      <About />
      <Skills />
      <CompetitiveProgramming />
      <Projects />

      {/* Add more sections here — e.g. Contact */}
    </main>
  );
}
