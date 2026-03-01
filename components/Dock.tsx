"use client";

import React from "react";
import Link from "next/link";
import {
  HomeIcon,
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
import { socials } from "@/lib/socials";


const DATA = {
  navbar: [
    { href: "#hero", icon: ArrowUp, label: "To the top" },
    { href: "#about", icon: UserIcon, label: "About" },
    { href: "#skills", icon: WrenchIcon, label: "Skills" },
    { href: "#competitive", icon: SwordsIcon, label: "Competitive Programming" },
    { href: "#projects", icon: FolderOpenIcon, label: "Projects" },
    { href: "#certifications", icon: AwardIcon, label: "Certifications" },
  ],
  contact: {
    social: {
      GitHub: {
        name: "GitHub",
        url: socials.GitHub,
        icon: Icons.github
      },
      LinkedIn: {
        name: "LinkedIn",
        url: socials.LinkedIn,
        icon: Icons.linkedin
      },
      X: {
        name: "X",
        url: socials.X,
        icon: Icons.x
      },
      LeetCode: {
        name: "LeetCode",
        url: socials.LeetCode,
        icon: Icons.leetcode
      }
    }
  },
};

export function DockDemo() {
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
          {Object.entries(DATA.contact.social).map(([name, social]) => (
            <DockIcon key={name}>
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
                  <p>{name}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
        </Dock>
      </TooltipProvider>
    </div>
  );
}
