import { getHero } from "@/lib/data";
import Hero from "@/components/Hero";

export default async function HeroSection() {
  try {
    const data = await getHero();
    return <Hero data={data ?? undefined} />;
  } catch {
    return <Hero />;
  }
}
