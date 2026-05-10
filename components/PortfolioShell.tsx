"use client";

import { usePathname } from "next/navigation";
import { Particles } from "@/components/ui/particles";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function PortfolioShell() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isAdmin || !isDesktop) return null;

  return <Particles className="fixed inset-0 -z-10" variant="snow" />;
}
