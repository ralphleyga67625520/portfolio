import { getCertifications } from "@/lib/data";
import Certifications from "@/components/Certifications";

export default async function CertificationsSection() {
  try {
    const data = await getCertifications();
    return <Certifications data={data?.length ? data : undefined} />;
  } catch {
    return <Certifications />;
  }
}
