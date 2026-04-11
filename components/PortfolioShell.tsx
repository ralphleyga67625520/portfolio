"use client";

import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { Particles } from "@/components/ui/particles";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function PortfolioShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isAdmin) return null;

  return (
    <>
      {isDesktop && (
        <Particles className="fixed inset-0 -z-10" variant="snow"  />
      )}
      <Suspense>{children}</Suspense>
    </>
  );
}
