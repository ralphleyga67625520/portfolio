import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';

export default async function Home() {
  return (
    <main className="w-full pb-24">
      
      <Hero />
      <About />
      <Skills />

      {/* Add more sections here — e.g. Projects, Contact */}
    </main>
  );
}
