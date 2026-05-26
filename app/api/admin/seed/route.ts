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
      name: "Ralph",
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
      heading: "Who am I & What can I offer",
      paragraphs: [
        "I'm Ralph Leyga — Full-Stack Engineer with 8+ years of experience architecting and scaling SaaS platforms, web applications, and cloud-based systems. Specialized in Python, Django, JavaScript/​TypeScript, REST APIs, and database optimization. Delivered secure, high-performance SaaS applications supporting scalable cloud infrastructure, backend reliability, and modern software architecture across startup and agile environments.",
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
        title: "Unified Travel Booking",
        subtitle: "A fully-featured video streaming platform",
        description:
          "The front-end is built with ReactJS and NextJS, providing a fast and responsive user experience. The backend uses NodeJS and ExpressJS to handle API integrations and manage booking data stored in MongoDB.",
        image: "https://ik.imagekit.io/lmpthl5suv/curatube-dummy.png",
        githubUrl: "#",
        liveUrl: "https://brokr-three.vercel.app",
        tags: ["TypeScript", "ReactJS", "NextJS", "TailwindCSS", "NodeJS", "ExpressJS", "Supabase", "PostgreSQL", "Stripe", "GitHub"],
        accentColor: "#FF4040",
        order: 0,
      },
      {
        title: "Easy Clothes – Online Women’s Fashion Retail Store",
        subtitle: "a full-stack developer portfolio builder",
        description:
          "Easy Clothes is an online fashion store offering European and French-style women’s clothing to customers in the US and Canada.",
        image: "https://ik.imagekit.io/lmpthl5suv/curavibe-dummy.png",
        githubUrl: "#",
        liveUrl: "https://easy-clothes.us",
        tags: ["Shopify", "Web Hosting", "eCommerce Platform", "SSL/HTTPS"],
        accentColor: "#3B82F6",
        order: 1,
      },
      {
        title: "KavarSa",
        description:
          "Easy Clothes is an online fashion store offering European and French-style women’s clothing to customers in the US and Canada.",
        image: "https://ik.imagekit.io/lmpthl5suv/ink.jpg?updatedAt=1748963140186",
        githubUrl: "#",
        liveUrl: "https://kavarsa.com",
        tags: ["Shopify", "Web Hosting", "eCommerce Platform", "SSL/HTTPS"],
        accentColor: "#FF8C00",
        order: 2,
      },
      {
        title: "Crypto King Checkmate",
        subtitle: "AI sound Designer",
        description: "Crypto King Checkmate is a full-featured cryptocurrency trading platform built to provide users with a seamless experience for managing and trading digital assets. The platform integrates with cryptocurrency APIs to provide real-time market data and enable secure trading operations.",
        image: "https://ik.imagekit.io/lmpthl5suv/harmoniq-dummy.png",
        githubUrl: "#",
        liveUrl: "https://crypto-checkmate.vercel.app",
        tags: ["HTML5", "CSS3", "JavaScript", "ReactJS", "NextJS", "TailwindCSS", "NodeJS", "ExpressJS", "MongoDB", "Git", "Github"],
        accentColor: "#8B5CF6",
        order: 3,
      },
      {
        title: "Game Hub",
        subtitle: "AI sound Designer",
        description: "Crypto King Checkmate is a full-featured cryptocurrency trading platform built to provide users with a seamless experience for managing and trading digital assets. The platform integrates with cryptocurrency APIs to provide real-time market data and enable secure trading operations.",
        image: "https://ik.imagekit.io/lmpthl5suv/harmoniq-dummy.png",
        githubUrl: "#",
        liveUrl: "https://game-hub-jet-three.vercel.app",
        tags: ["HTML5", "CSS3", "JavaScript", "ReactJS", "NextJS", "TailwindCSS", "NodeJS", "ExpressJS", "MongoDB", "Git", "Github"],
        accentColor: "#5cf6a9",
        order: 4,
      },
      {
        title: "Apple Phone",
        subtitle: "AI sound Designer",
        description: "The architecture prioritizes performance through code splitting, lazy loading of 3D assets, and efficient rendering techniques. The responsive design ensures the experience remains smooth and visually impressive across desktop, tablet, and mobile devices.",
        image: "https://ik.imagekit.io/lmpthl5suv/harmoniq-dummy.png",
        githubUrl: "#",
        liveUrl: "https://app-iphone.netlify.app",
        tags: ["TypeScript", "ReactJS", "NextJS", "TailwindCSS", "JavaScript", "CSS3", "HTML5", "PostgreSQL", "GitHub"],
        accentColor: "#975cf6",
        order: 5,
      },
      {
        title: "Whop Deal Challenge",
        subtitle: "AI sound Designer",
        description: "The Whop Deal Challenge page is built as a focused funnel, combining a bold hero, a simple explanation of the 7 days, and a frictionless signup form.",
        image: "https://ik.imagekit.io/lmpthl5suv/harmoniq-dummy.png",
        githubUrl: "#",
        liveUrl: "https://3challenge-whop-deal.vercel.app/",
        tags: ["TypeScript", "ReactJS", "NextJS", "TailwindCSS", "JavaScript", "CSS3", "HTML5", "PostgreSQL", "GitHub"],
        accentColor: "#975cf6",
        order: 6,
      }
    ]);
    results.projects = `Created 4`;
  } else {
    results.projects = `Already has ${projectCount}`;
  }

  // 5. Seed Certifications
  const certCount = await Certification.countDocuments();
  if (certCount === 0) {
    await Certification.insertMany([
      {
        name: "Notre Dame of Midsayap College",
        image: "/education/college.jpg",
        link: "https://drive.google.com/file/d/1un2PymsO93PIhpEJ282hbBf86b-CCnIG/view",
        order: 0,
      },
    ]);
    results.Certifications = `Created 2`;
  } else {
    results.Certifications = `Already has ${certCount}`;
  }

  // 6. Seed socials
  const socialCount = await Social.countDocuments();
  if (socialCount === 0) {
    await Social.insertMany([
      { platform: "GitHub", url: "https://github.com/ralphleyga67625520", order: 0 },
      { platform: "LinkedIn", url: "https://www.linkedin.com/in/ralph-leyga-67625520/", order: 1 },
      { platform: "Codeforces", url: "https://codeforces.com/profile/Ralphkumargupta2908", order: 2 },
    ]);
    results.socials = `Created 3`;
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
