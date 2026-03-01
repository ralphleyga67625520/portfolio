import dbConnect from "@/lib/mongodb";
import ProjectModel from "@/models/Project";
import CertificationModel from "@/models/Certification";
import SocialModel from "@/models/Social";
import SkillCategoryModel from "@/models/SkillCategory";
import HeroModel from "@/models/Hero";
import AboutModel from "@/models/About";

// These functions are meant to be called from Server Components.
// They talk directly to MongoDB (no HTTP round-trip).

export async function getProjects() {
  await dbConnect();
  const docs = await ProjectModel.find().sort({ order: 1, createdAt: -1 }).lean();
  return docs.map((d) => ({
    title: d.title,
    subtitle: d.subtitle,
    description: d.description,
    image: d.image,
    video: d.video,
    liveUrl: d.liveUrl,
    githubUrl: d.githubUrl,
    tags: d.tags,
    accentColor: d.accentColor,
  }));
}

export async function getCertifications() {
  await dbConnect();
  const docs = await CertificationModel.find().sort({ order: 1, createdAt: -1 }).lean();
  return docs.map((d) => ({
    name: d.name,
    image: d.image,
    link: d.link,
  }));
}

export async function getSocials() {
  await dbConnect();
  const docs = await SocialModel.find().sort({ order: 1 }).lean();
  // Return as a Record<string, string> keyed by platform name
  const result: Record<string, string> = {};
  for (const d of docs) {
    result[d.platform] = d.url;
  }
  return result;
}

export async function getSkillCategories() {
  await dbConnect();
  const docs = await SkillCategoryModel.find().sort({ order: 1 }).lean();
  return docs.map((d) => ({
    title: d.title,
    categoryIconKey: d.categoryIconKey,
    color: d.color,
    gradientFrom: d.gradientFrom,
    gradientTo: d.gradientTo,
    gradientColor: d.gradientColor,
    span: d.span,
    skills: d.skills.map((s) => ({ name: s.name, iconKey: s.iconKey })),
  }));
}

export async function getHero() {
  await dbConnect();
  const doc = await HeroModel.findOne().lean();
  if (!doc) return null;
  return {
    greeting: doc.greeting,
    name: doc.name,
    tagline: doc.tagline,
    splineUrl: doc.splineUrl,
  };
}

export async function getAbout() {
  await dbConnect();
  const doc = await AboutModel.findOne().lean();
  if (!doc) return null;
  return {
    heading: doc.heading,
    paragraphs: doc.paragraphs,
  };
}
