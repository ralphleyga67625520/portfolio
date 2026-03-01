/**
 * Seed script — run once to populate MongoDB with all current portfolio data
 * and create your admin account.
 *
 * Usage:
 *   npm run seed
 *
 * Requires in .env.local:
 *   MONGODB_URI=...
 *   ADMIN_USERNAME=...
 *   ADMIN_PASSWORD=...
 */

import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

/* ------------------------------------------------------------------ */
/*  Inline Mongoose schemas (avoids path-alias issues outside Next)    */
/* ------------------------------------------------------------------ */

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

const HeroSchema = new mongoose.Schema({
  greeting: { type: String, default: "Hey, I'm" },
  name: { type: String, required: true },
  tagline: { type: String, required: true },
  splineUrl: { type: String },
}, { timestamps: true });

const AboutSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  paragraphs: [{ type: String }],
}, { timestamps: true });

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  description: { type: String, required: true },
  image: { type: String },
  video: { type: String },
  liveUrl: { type: String },
  githubUrl: { type: String, required: true },
  tags: [{ type: String }],
  accentColor: { type: String, default: "#3B82F6" },
  order: { type: Number, default: 0 },
}, { timestamps: true });

const CertificationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  link: { type: String },
  order: { type: Number, default: 0 },
}, { timestamps: true });

const SocialSchema = new mongoose.Schema({
  platform: { type: String, required: true, unique: true },
  url: { type: String, required: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

const SkillSchema = new mongoose.Schema({ name: String, iconKey: String }, { _id: false });
const SkillCategorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  categoryIconKey: { type: String, required: true },
  color: String,
  gradientFrom: String,
  gradientTo: String,
  gradientColor: String,
  span: { type: String, default: "col-span-3 lg:col-span-1" },
  skills: [SkillSchema],
  order: { type: Number, default: 0 },
}, { timestamps: true });

/* ------------------------------------------------------------------ */
/*  Models                                                             */
/* ------------------------------------------------------------------ */

const Admin          = mongoose.models.Admin          || mongoose.model("Admin", AdminSchema);
const Hero           = mongoose.models.Hero           || mongoose.model("Hero", HeroSchema);
const About          = mongoose.models.About          || mongoose.model("About", AboutSchema);
const Project        = mongoose.models.Project        || mongoose.model("Project", ProjectSchema);
const Certification  = mongoose.models.Certification  || mongoose.model("Certification", CertificationSchema);
const Social         = mongoose.models.Social         || mongoose.model("Social", SocialSchema);
const SkillCategory  = mongoose.models.SkillCategory  || mongoose.model("SkillCategory", SkillCategorySchema);

/* ------------------------------------------------------------------ */
/*  Main seed function                                                 */
/* ------------------------------------------------------------------ */

const heroData = {
  greeting: "Hey, I'm",
  name: "Ayush",
  tagline: "Full-stack developer who turns ideas into fast, polished products\u00A0\u2014 one clean commit at a time.",
  splineUrl: "https://prod.spline.design/AeryvEqWxr2qjINc/scene.splinecode",
};

const aboutData = {
  heading: "Who I am & What I offer",
  paragraphs: [
    "I'm Ayush Kumar Gupta \u2014 a full-stack developer with a sharp eye for clean architecture and a deep love for solving hard problems. From crafting intuitive UIs to designing scalable backends, I build products that are fast, reliable, and a joy to use.",
    "Competitive programmer at heart, builder by habit \u2014 I thrive at the intersection of performance, design, and developer experience.",
  ],
};

const projectsData = [
  {
    title: "CuraTube",
    subtitle: "A fully-featured video streaming platform",
    description: "A full-stack video streaming platform that supports a handful of cool features similar to any other video streaming application out there.",
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
    description: "A browser-based IDE that brings a professional development environment with AI directly to your browser.",
    image: "https://ik.imagekit.io/lmpthl5suv/curavibe-dummy.png",
    githubUrl: "https://github.com/ayyush08/CuraVibe",
    liveUrl: "https://curavibe.vercel.app",
    tags: ["Next.js", "NextAuth", "Prisma", "MongoDB", "MonacoEditor", "AI", "Github Integration"],
    accentColor: "#3B82F6",
    order: 1,
  },
  {
    title: "Inkognito",
    description: "A web application that allows users to send messages anonymously.",
    image: "https://ik.imagekit.io/lmpthl5suv/ink.jpg?updatedAt=1748963140186",
    githubUrl: "https://github.com/ayyush08/Inkognito",
    tags: ["Next.js", "NextAuth", "MongoDB", "Zod", "Resend", "Gemini API", "Shadcn UI"],
    accentColor: "#FF8C00",
    order: 2,
  },
  {
    title: "HarmoniQ",
    subtitle: "AI sound Designer",
    description: "A web application that provides an interface for users to generate sounds of their choice using a simple prompt and save them to their profile.",
    image: "https://ik.imagekit.io/lmpthl5suv/harmoniq-dummy.png",
    githubUrl: "https://github.com/ayyush08/HarmoniQ",
    tags: ["Next.js", "MongoDB", "FastAPI", "Python", "Gemini API", "HuggingFace Models"],
    accentColor: "#8B5CF6",
    order: 3,
  },
];

const certificationsData = [
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
];

const socialsData = [
  { platform: "GitHub", url: "https://github.com/ayyush08", order: 0 },
  { platform: "LinkedIn", url: "https://www.linkedin.com/in/ayush2908/", order: 1 },
  { platform: "LeetCode", url: "https://leetcode.com/u/ayyush_08/", order: 2 },
  { platform: "Codeforces", url: "https://codeforces.com/profile/ayushkumargupta2908", order: 3 },
  { platform: "X", url: "https://x.com/Ayush29081", order: 4 },
];

const skillCategoriesData = [
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
];

/* ------------------------------------------------------------------ */
/*  Main seed function                                                 */
/* ------------------------------------------------------------------ */

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("❌ MONGODB_URI is not set. Add it to your .env.local file.");
    process.exit(1);
  }

  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminUsername || !adminPassword) {
    console.error("❌ ADMIN_USERNAME and ADMIN_PASSWORD must be set in .env.local");
    process.exit(1);
  }

  console.log("\n🌱 Portfolio Database Seeder\n");
  console.log("⏳ Connecting to MongoDB…");
  await mongoose.connect(uri);
  console.log("✅ Connected\n");

  const results: Record<string, string> = {};

  // 1. Admin
  const adminCount = await Admin.countDocuments();
  if (adminCount === 0) {
    const salt = await bcrypt.genSalt(12);
    const hashed = await bcrypt.hash(adminPassword, salt);
    await Admin.create({ username: adminUsername, password: hashed });
    results["Admin"] = `✅ Created (${adminUsername})`;
  } else {
    results["Admin"] = "⏭️  Already exists — skipped";
  }

  // 2. Hero
  const heroCount = await Hero.countDocuments();
  if (heroCount === 0) {
    await Hero.create(heroData);
    results["Hero"] = "✅ Created";
  } else {
    results["Hero"] = "⏭️  Already exists — skipped";
  }

  // 3. About
  const aboutCount = await About.countDocuments();
  if (aboutCount === 0) {
    await About.create(aboutData);
    results["About"] = "✅ Created";
  } else {
    results["About"] = "⏭️  Already exists — skipped";
  }

  // 4. Projects
  const projectCount = await Project.countDocuments();
  if (projectCount === 0) {
    await Project.insertMany(projectsData);
    results["Projects"] = `✅ Created ${projectsData.length} projects`;
  } else {
    results["Projects"] = `⏭️  Already has ${projectCount} — skipped`;
  }

  // 5. Certifications
  const certCount = await Certification.countDocuments();
  if (certCount === 0) {
    await Certification.insertMany(certificationsData);
    results["Certifications"] = `✅ Created ${certificationsData.length} certifications`;
  } else {
    results["Certifications"] = `⏭️  Already has ${certCount} — skipped`;
  }

  // 6. Socials
  const socialCount = await Social.countDocuments();
  if (socialCount === 0) {
    await Social.insertMany(socialsData);
    results["Socials"] = `✅ Created ${socialsData.length} socials`;
  } else {
    results["Socials"] = `⏭️  Already has ${socialCount} — skipped`;
  }

  // 7. Skill Categories
  const skillCount = await SkillCategory.countDocuments();
  if (skillCount === 0) {
    await SkillCategory.insertMany(skillCategoriesData);
    results["Skills"] = `✅ Created ${skillCategoriesData.length} categories`;
  } else {
    results["Skills"] = `⏭️  Already has ${skillCount} — skipped`;
  }

  // Print summary
  console.log("─".repeat(45));
  for (const [key, val] of Object.entries(results)) {
    console.log(`  ${key.padEnd(18)} ${val}`);
  }
  console.log("─".repeat(45));
  console.log("\n🎉 Seed complete! Log in at /admin\n");

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
