import Hero from "@/components/Hero";
import { Navbar } from "@/components/Navbar";




export default function Home() {
  return (
    <div className="container mx-auto px-4 flex flex-col">
      <Navbar/>
      <Hero />  

    </div>
  );
}
