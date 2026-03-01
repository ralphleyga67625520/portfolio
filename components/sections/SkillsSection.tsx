import { getSkillCategories } from "@/lib/data";
import Skills from "@/components/Skills";

export default async function SkillsSection() {
  try {
    const data = await getSkillCategories();
    return <Skills data={data?.length ? data : undefined} />;
  } catch {
    return <Skills />;
  }
}
