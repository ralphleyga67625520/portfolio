"use client";

import { useEffect, useState } from "react";
import { FolderOpen, Award, Share2, Wrench } from "lucide-react";

interface Counts {
  projects: number;
  certifications: number;
  skills: number;
  socials: number;
}

export default function DashboardOverview() {
  const [counts, setCounts] = useState<Counts>({
    projects: 0,
    certifications: 0,
    skills: 0,
    socials: 0,
  });

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/projects").then((r) => r.json()),
      fetch("/api/admin/certifications").then((r) => r.json()),
      fetch("/api/admin/skills").then((r) => r.json()),
      fetch("/api/admin/socials").then((r) => r.json()),
    ]).then(([projects, certs, skills, socials]) => {
      setCounts({
        projects: projects.length ?? 0,
        certifications: certs.length ?? 0,
        skills: skills.length ?? 0,
        socials: socials.length ?? 0,
      });
    });
  }, []);

  const cards = [
    { label: "Projects", count: counts.projects, icon: FolderOpen, color: "text-blue-400" },
    { label: "Certifications", count: counts.certifications, icon: Award, color: "text-amber-400" },
    { label: "Skill Categories", count: counts.skills, icon: Wrench, color: "text-green-400" },
    { label: "Socials", count: counts.socials, icon: Share2, color: "text-purple-400" },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-white/10 bg-white/5 p-5"
          >
            <div className="flex items-center gap-3">
              <card.icon className={`h-5 w-5 ${card.color}`} />
              <span className="text-sm text-neutral-400">{card.label}</span>
            </div>
            <p className="mt-2 text-3xl font-bold">{card.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
