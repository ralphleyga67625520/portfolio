import { getAbout } from "@/lib/data";
import About from "@/components/About";

export default async function AboutSection() {
  try {
    const data = await getAbout();
    return <About data={data ?? undefined} />;
  } catch {
    return <About />;
  }
}
