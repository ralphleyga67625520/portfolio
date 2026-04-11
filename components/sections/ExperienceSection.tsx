import { getExperiences } from "@/lib/data";
import Experience from "@/components/Experience";

export default async function ExperienceSection() {
  try {
    const data = await getExperiences();
    return <Experience data={data?.length ? data : undefined} />;
  } catch {
    return <Experience />;
  }
}
