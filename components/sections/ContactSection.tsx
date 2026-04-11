import { getSocials } from "@/lib/data";
import Contact from "@/components/Contact";

export default async function ContactSection() {
  try {
    const socials = await getSocials();
    const hasSocials = Object.keys(socials).length > 0;
    return <Contact socials={hasSocials ? socials : undefined} />;
  } catch {
    return <Contact />;
  }
}
