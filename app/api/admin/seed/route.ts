import { NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import Admin from "@/models/Admin";
import Project from "@/models/Project";
import Certification from "@/models/Certification";
import Social from "@/models/Social";
import SkillCategory from "@/models/SkillCategory";
import HeroModel from "@/models/Hero";
import AboutModel from "@/models/About";

/**
 * POST /api/admin/seed
 *
 * Seeds the database with the current static data from the codebase.
 * Requires a secret key in the request body to prevent accidental runs.
 * Only creates data if collections are empty (safe to re-run).
 */
export async function POST(req: NextRequest) {
  const { secret, adminUsername, adminPassword } = await req.json();

  if (secret !== process.env.SEED_SECRET) {
    return Response.json({ error: "Invalid seed secret" }, { status: 403 });
  }

  await dbConnect();

  const results: Record<string, string> = {};

  // 1. Seed admin (only if none exist)
  const adminCount = await Admin.countDocuments();
  if (adminCount === 0 && adminUsername && adminPassword) {
    await Admin.create({ username: adminUsername, password: adminPassword });
    results.admin = "Created";
  } else {
    results.admin = adminCount > 0 ? "Already exists" : "Skipped (no credentials)";
  }

  // 2. Seed hero
  const heroCount = await HeroModel.countDocuments();
  if (heroCount === 0) {
    await HeroModel.create({
      greeting: "Hey, I'm",
      name: "Ayush",
      tagline:
        "Full-stack developer who turns ideas into fast, polished products — one clean commit at a time.",
      splineUrl:
        "https://prod.spline.design/AeryvEqWxr2qjINc/scene.splinecode",
    });
    results.hero = "Created";
  } else {
    results.hero = "Already exists";
  }

  // 3. Seed about
  const aboutCount = await AboutModel.countDocuments();
  if (aboutCount === 0) {
    await AboutModel.create({
      heading: "Who I am & What I offer",
      paragraphs: [
        "I'm Ayush Kumar Gupta — a full-stack developer with a sharp eye for clean architecture and a deep love for solving hard problems. From crafting intuitive UIs to designing scalable backends, I build products that are fast, reliable, and a joy to use.",
        "Competitive programmer at heart, builder by habit — I thrive at the intersection of performance, design, and developer experience.",
      ],
    });
    results.about = "Created";
  } else {
    results.about = "Already exists";
  }

  // 4. Seed projects
  const projectCount = await Project.countDocuments();
  if (projectCount === 0) {
    await Project.insertMany([
      {
        title: "CuraTube",
        subtitle: "A fully-featured video streaming platform",
        description:
          "A full-stack video streaming platform that supports a handful of cool features similar to any other video streaming application out there.",
        image: "https://ik.imagekit.io/lmpthl5suv/curatube-dummy.png",
        githubUrl: "https://github.com/ayyush08/CuraTube",
        liveUrl: "https://curatube.vercel.app",
        tags: ["MERN", "TanStack Query", "TanStack Router", "Cloudinary", "MongoDB", "Signed uploads"],
        accentColor: "#FF4040",
        order: 0,
      },
      {
        title: "CuraVibe",
        subtitle: "a full-stack developer portfolio builder",
        description:
          "A browser-based IDE that brings a professional development environment with AI directly to your browser.",
        image: "https://ik.imagekit.io/lmpthl5suv/curavibe-dummy.png",
        githubUrl: "https://github.com/ayyush08/CuraVibe",
        liveUrl: "https://curavibe.vercel.app",
        tags: ["Next.js", "NextAuth", "Prisma", "MongoDB", "MonacoEditor", "AI", "Github Integration"],
        accentColor: "#3B82F6",
        order: 1,
      },
      {
        title: "Inkognito",
        description:
          "A web application that allows users to send messages anonymously.",
        image: "https://ik.imagekit.io/lmpthl5suv/ink.jpg?updatedAt=1748963140186",
        githubUrl: "https://github.com/ayyush08/Inkognito",
        tags: ["Next.js", "NextAuth", "MongoDB", "Zod", "Resend", "Gemini API", "Shadcn UI"],
        accentColor: "#FF8C00",
        order: 2,
      },
      {
        title: "HarmoniQ",
        subtitle: "AI sound Designer",
        description:
          "A web application that provides an interface for users to generate sounds of their choice using a simple prompt and save them to their profile.",
        image: "https://ik.imagekit.io/lmpthl5suv/harmoniq-dummy.png",
        githubUrl: "https://github.com/ayyush08/HarmoniQ",
        tags: ["Next.js", "MongoDB", "FastAPI", "Python", "Gemini API", "HuggingFace Models"],
        accentColor: "#8B5CF6",
        order: 3,
      },
    ]);
    results.projects = `Created 4`;
  } else {
    results.projects = `Already has ${projectCount}`;
  }

  // 5. Seed certifications
  const certCount = await Certification.countDocuments();
  if (certCount === 0) {
    await Certification.insertMany([
      {
        name: "Data Structures & Algorithms - Programming Pathshala",
        image: "https://ik.imagekit.io/lmpthl5suv/dsacerti.png",
        link: "https://drive.google.com/file/d/1un2PymsO93PIhpEJ282hbBf86b-CCnIG/view",
        order: 0,
      },
      {
        name: "PostMan API Fundamentals Student Expert",
        image: "https://ik.imagekit.io/lmpthl5suv/posstmancerti.png",
        link: "https://drive.google.com/file/d/13eaG2KiXAzNi9rNhWeJNjKnOZycAA4uP/view?usp=sharing",
        order: 1,
      },
    ]);
    results.certifications = `Created 2`;
  } else {
    results.certifications = `Already has ${certCount}`;
  }

  // 6. Seed socials
  const socialCount = await Social.countDocuments();
  if (socialCount === 0) {
    await Social.insertMany([
      { platform: "GitHub", url: "https://github.com/ayyush08", order: 0 },
      { platform: "LinkedIn", url: "https://www.linkedin.com/in/ayush2908/", order: 1 },
      { platform: "LeetCode", url: "https://leetcode.com/u/ayyush_08/", order: 2 },
      { platform: "Codeforces", url: "https://codeforces.com/profile/ayushkumargupta2908", order: 3 },
      { platform: "X", url: "https://x.com/Ayush29081", order: 4 },
    ]);
    results.socials = `Created 5`;
  } else {
    results.socials = `Already has ${socialCount}`;
  }

  // 7. Seed skill categories
  const skillCount = await SkillCategory.countDocuments();
  if (skillCount === 0) {
    await SkillCategory.insertMany([
      {
        title: "Programming Languages",
        categoryIconKey: "Code2",
        color: "#F472B5",
        gradientFrom: "#F472B6",
        gradientTo: "#FBBF24",
        gradientColor: "#F472B6",
        span: "col-span-2 lg:col-span-2",
        skills: [
          { name: "TypeScript", iconKey: "typescript" },
          { name: "Python", iconKey: "python" },
          { name: "JavaScript", iconKey: "javascript" },
          { name: "C++", iconKey: "cpp" },
        ],
        order: 0,
      },
      {
        title: "Frontend",
        categoryIconKey: "Monitor",
        color: "#60A5FA",
        gradientFrom: "#60A5FA",
        gradientTo: "#A78BFA",
        gradientColor: "#60A5FA",
        span: "col-span-3 lg:col-span-1",
        skills: [
          { name: "React", iconKey: "react" },
          { name: "Next.js", iconKey: "nextjs" },
          { name: "Tailwind CSS", iconKey: "tailwindcss" },
          { name: "ShadCN", iconKey: "shadcn" },
        ],
        order: 1,
      },
      {
        title: "Backend",
        categoryIconKey: "Server",
        color: "#34D399",
        gradientFrom: "#34D399",
        gradientTo: "#FBBF24",
        gradientColor: "#34D399",
        span: "col-span-3 lg:col-span-1",
        skills: [
          { name: "Node.js", iconKey: "nodejs" },
          { name: "Express", iconKey: "express" },
          { name: "REST API", iconKey: "restapi" },
        ],
        order: 2,
      },
      {
        title: "Database",
        categoryIconKey: "Database",
        color: "#A78BFA",
        gradientFrom: "#A78BFA",
        gradientTo: "#FB923C",
        gradientColor: "#A78BFA",
        span: "col-span-3 lg:col-span-1",
        skills: [
          { name: "PostgreSQL", iconKey: "postgresql" },
          { name: "MongoDB", iconKey: "mongodb" },
          { name: "Redis", iconKey: "redis" },
          { name: "Prisma", iconKey: "prisma" },
        ],
        order: 3,
      },
      {
        title: "Others",
        categoryIconKey: "Wrench",
        color: "#FB923C",
        gradientFrom: "#FB923C",
        gradientTo: "#F472B6",
        gradientColor: "#FB923C",
        span: "col-span-3 lg:col-span-1",
        skills: [{ name: "GitHub", iconKey: "github" }],
        order: 4,
      },
    ]);
    results.skills = `Created 5 categories`;
  } else {
    results.skills = `Already has ${skillCount} categories`;
  }

  return Response.json({ success: true, results });
}
