"use client";

import { Icons, type IconProps } from "@/components/icons";
import { BlurFade } from "@/components/ui/blur-fade";
import { BentoGrid } from "@/components/ui/bento-grid";
import { MagicCard } from "@/components/ui/magic-card";
import {
  Code2,
  Monitor,
  Server,
  Database,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type IconRenderer = (props: IconProps) => React.ReactNode;

interface Skill {
  name: string;
  icon: IconRenderer;
}

interface SkillCategory {
  title: string;
  categoryIcon: LucideIcon;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  gradientColor: string;
  span: string;
  skills: Skill[];
}

/* ------------------------------------------------------------------ */
/*  Data — 5 categories                                                */
/* ------------------------------------------------------------------ */

const skillCategories: SkillCategory[] = [
  {
    title: "Programming Languages",
    categoryIcon: Code2,
    color: "#F472B6",
    gradientFrom: "#F472B6",
    gradientTo: "#FBBF24",
    gradientColor: "#F472B6",
    span: "col-span-2 lg:col-span-2",
    skills: [
      { name: "TypeScript", icon: Icons.typescript },
      { name: "Python", icon: Icons.python },
      { name: "JavaScript", icon: Icons.javascript },
      {name: "C++", icon: Icons.cpp },
    ],
  },
  {
    title: "Frontend",
    categoryIcon: Monitor,
    color: "#60A5FA",
    gradientFrom: "#60A5FA",
    gradientTo: "#A78BFA",
    gradientColor: "#60A5FA",
    span: "col-span-3 lg:col-span-1",
    skills: [
      { name: "React", icon: Icons.react },
      { name: "Next.js", icon: Icons.nextjs },
      { name: "Tailwind CSS", icon: Icons.tailwindcss },
      { name: "ShadCN", icon: Icons.shadcn },
    ],
  },
  {
    title: "Backend",
    categoryIcon: Server,
    color: "#34D399",
    gradientFrom: "#34D399",
    gradientTo: "#FBBF24",
    gradientColor: "#34D399",
    span: "col-span-3 lg:col-span-1",
    skills: [
      { name: "Node.js", icon: Icons.nodejs },
      { name: "Express", icon: Icons.express },
    //   { name: "GraphQL", icon: Icons.graphql },
      { name: "REST API", icon: Icons.restapi },
    ],
  },
  {
    title: "Database",
    categoryIcon: Database,
    color: "#A78BFA",
    gradientFrom: "#A78BFA",
    gradientTo: "#FB923C",
    gradientColor: "#A78BFA",
    span: "col-span-3 lg:col-span-1",
    skills: [
      { name: "PostgreSQL", icon: Icons.postgresql },
      { name: "MongoDB", icon: Icons.mongodb },
      { name: "Redis", icon: Icons.redis },
      { name: "Prisma", icon: Icons.prisma },
    ],
  },
  {
    title: "Others",
    categoryIcon: Wrench,
    color: "#FB923C",
    gradientFrom: "#FB923C",
    gradientTo: "#F472B6",
    gradientColor: "#FB923C",
    span: "col-span-3 lg:col-span-1",
    skills: [{ name: "GitHub", icon: Icons.github }],
  },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function SkillItem({ skill }: { skill: Skill }) {
  return (
    <div className="group/skill flex flex-col items-center gap-2.5 rounded-xl border border-white/6 bg-white/3 px-3 py-3.5 transition-all duration-300 ease-out hover:border-white/15 hover:bg-white/6 hover:scale-[1.04]">
      <span className="flex h-7 w-7 items-center justify-center text-neutral-400 transition-all duration-300 ease-out group-hover/skill:scale-110 group-hover/skill:text-white">
        {skill.icon({ className: "h-5 w-5" })}
      </span>
      <span className="text-[11px] font-medium leading-tight text-neutral-500 transition-colors duration-300 group-hover/skill:text-neutral-300">
        {skill.name}
      </span>
    </div>
  );
}

function SkillCategoryCard({
  category,
  index,
}: {
  category: SkillCategory;
  index: number;
}) {
  const CategoryIcon = category.categoryIcon;

  return (
    <div className={`${category.span} h-full`}>
      <BlurFade delay={0.1 + index * 0.12} inView className="h-full">
        <MagicCard
          className="h-full rounded-2xl"
          gradientSize={300}
          gradientColor={category.gradientColor}
          gradientOpacity={0.15}
          gradientFrom={category.gradientFrom}
          gradientTo={category.gradientTo}
        >
          <div className="flex h-full min-h-0 flex-col p-6">
            {/* Header */}
            <div className="mb-5 flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl border backdrop-blur-md"
                style={{
                  borderColor: `${category.color}30`,
                  backgroundColor: `${category.color}12`,
                }}
              >
                <CategoryIcon
                  className="h-5 w-5"
                  style={{ color: category.color }}
                />
              </div>
              <h3
                className="text-sm font-semibold uppercase tracking-wider"
                style={{ color: category.color }}
              >
                {category.title}
              </h3>
            </div>

            {/* Divider */}
            <div className="mb-5 h-px w-full bg-white/8" />

            {/* Skills grid */}
            <div className="grid grid-cols-3 gap-2">
              {category.skills.map((skill) => (
                <SkillItem key={skill.name} skill={skill} />
              ))}
            </div>
          </div>
        </MagicCard>
      </BlurFade>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function Skills() {
  return (
    <section id="skills" className="relative w-full py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-16">
        {/* Section heading */}
        <div className="mb-16 text-center">
          <BlurFade delay={0.04} inView>
            <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              <span className="bg-linear-to-r from-white to-neutral-500 bg-clip-text text-transparent">
                Technical Skills
              </span>
            </h2>
          </BlurFade>

          <BlurFade delay={0.12} inView>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              A snapshot of the tools, languages, and frameworks I work with
              day to day.
            </p>
          </BlurFade>
        </div>

        {/* Bento grid with MagicCard items */}
        <BentoGrid className="auto-rows-auto items-stretch grid-cols-1 lg:grid-cols-3">
          {skillCategories.map((category, idx) => (
            <SkillCategoryCard
              key={category.title}
              category={category}
              index={idx}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
