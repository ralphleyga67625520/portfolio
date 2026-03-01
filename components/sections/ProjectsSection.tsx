import { getProjects } from "@/lib/data";
import Projects from "@/components/Projects";

export default async function ProjectsSection() {
  try {
    const data = await getProjects();
    return <Projects data={data?.length ? data : undefined} />;
  } catch {
    return <Projects />;
  }
}
