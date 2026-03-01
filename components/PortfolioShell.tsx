"use client";

import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { Particles } from "@/components/ui/particles";

export function PortfolioShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) return null;

  return (
    <>
      <Particles className="fixed inset-0 -z-10" variant="snow" />
      <Suspense>{children}</Suspense>
    </>
  );
}
