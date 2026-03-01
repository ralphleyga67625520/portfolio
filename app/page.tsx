import { Suspense } from "react";
import { Button } from "@/components/ui/button";

import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import CertificationsSection from "@/components/sections/CertificationsSection";
import CompetitiveProgramming from "@/components/CP";

import {
  HeroSkeleton,
  AboutSkeleton,
  SkillsSkeleton,
  ProjectsSkeleton,
  CertificationsSkeleton,
} from "@/components/skeletons";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="w-full pb-24">
      <Button
        variant="secondary"
        className="mb-6 text-cyan-500 mx-auto w-full sticky top-2 z-50 flex text-[10px] sm:text-xs md:text-sm px-2 py-1 sm:px-4 sm:py-2 h-auto whitespace-normal text-center leading-snug"
      >
        This portfolio is a work in progress. Some sections may be incomplete or
        missing. Check back soon for updates!
      </Button>

      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection />
      </Suspense>

      <Suspense fallback={<AboutSkeleton />}>
        <AboutSection />
      </Suspense>

      <Suspense fallback={<SkillsSkeleton />}>
        <SkillsSection />
      </Suspense>

      <CompetitiveProgramming />

      <Suspense fallback={<ProjectsSkeleton />}>
        <ProjectsSection />
      </Suspense>

      <Suspense fallback={<CertificationsSkeleton />}>
        <CertificationsSection />
      </Suspense>
    </main>
  );
}
