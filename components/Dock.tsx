"use client";

import React from "react";
import Link from "next/link";
import {
  UserIcon,
  WrenchIcon,
  SwordsIcon,
  FolderOpenIcon,
  AwardIcon,
  ArrowUp,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { Dock, DockIcon } from "@/components/ui/dock";
import { Icons } from "./icons";
import { socials as staticSocials } from "@/lib/socials";
import { socialIconMap } from "@/lib/iconMap";


const DATA = {
  navbar: [
    { href: "#hero", icon: ArrowUp, label: "To the top" },
    { href: "#about", icon: UserIcon, label: "About" },
    { href: "#skills", icon: WrenchIcon, label: "Skills" },
    { href: "#competitive", icon: SwordsIcon, label: "Competitive Programming" },
    { href: "#projects", icon: FolderOpenIcon, label: "Projects" },
    { href: "#certifications", icon: AwardIcon, label: "Certifications" },
  ],
};

function buildSocialEntries(socials: Record<string, string>) {
  return Object.entries(socials)
    .filter(([platform]) => socialIconMap[platform]) // only show platforms with icons
    .map(([platform, url]) => ({
      name: platform,
      url,
      icon: socialIconMap[platform],
    }));
}

export function DockDemo({ socials }: { socials?: Record<string, string> }) {
  const socialList = buildSocialEntries(socials ?? staticSocials);
  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <TooltipProvider>
        <Dock direction="middle">
          {DATA.navbar.map((item) => (
            <DockIcon key={item.label}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => scrollTo(item.href)}
                    aria-label={item.label}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12 rounded-full"
                    )}
                  >
                    <item.icon className="size-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
          <Separator orientation="vertical" className="h-full" />
          {socialList.map((social) => (
            <DockIcon key={social.name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={social.url}
                    target="_blank"
                    aria-label={social.name}
                    className={cn(
                      buttonVariants({ variant: "link", size: "icon" }),
                      "size-12 rounded-full"
                    )}
                  >
                    <social.icon className="size-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{social.name}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
        </Dock>
      </TooltipProvider>
    </div>
  );
}
