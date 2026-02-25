export interface Project {
  title: string;
  subtitle?: string;
  description: string;
  image?: string; // path to screenshot / preview image
  video?: string; // path to video preview (takes precedence over image)
  liveUrl?: string; // live demo link (optional)
  githubUrl: string; // GitHub repo link
  tags: string[]; // tech stack tags
  accentColor: string; // accent colour used for the card
}

const dummyImageUrl =
  "https://ik.imagekit.io/lmpthl5suv/ScreenShot-2025-3-9_0-49-21_bqgprKot3.png?updatedAt=1745244201053";
export const projects: Project[] = [
  {
    title: "CuraTube ",
    subtitle: "a fully-featured video streaming platform",
    description:
      "a full-stack video streaming platform that supports a handful of cool features similar to any other video streaming application out there.",
    image: "https://ik.imagekit.io/lmpthl5suv/curatube-dummy.png",
    githubUrl: "https://github.com/ayyush08/CuraTube",
    liveUrl: "https://curatube.vercel.app",
    tags: [
      "MERN",
      "TanStack Query",
      "TanStack Router",
      "Cloudinary",
      "MongoDB",
      "Signed uploads",
    ],
    accentColor: "#FF4040"
  },
  {
    title: "CuraVibe",
    subtitle: "a full-stack developer portfolio builder",
    description:
      "A browser-based IDE that brings a professional development environment with AI directly to your browser.",
    image: "https://ik.imagekit.io/lmpthl5suv/curavibe-dummy.png",
    githubUrl: "https://github.com/ayyush08/CuraVibe",
    liveUrl: "https://curavibe.vercel.app",
    tags: ["Next.js","NextAuth","Prisma", "MongoDB","MonacoEditor","AI","Github Integration"],
    accentColor: "#3B82F6"
  },
  {
    title: "Inkognito",
    description:
      "A web application that allows users to send messages anonymously.",
    image: "https://ik.imagekit.io/lmpthl5suv/ink.jpg?updatedAt=1748963140186",
    githubUrl: "https://github.com/ayyush08/Inkognito",
    tags: ["Next.js", "NextAuth","MongoDB","Zod","Resend","Gemini API","Shadcn UI"],
    accentColor: "#FF8C00"
  },
  {
    title: "HarmoniQ",
    subtitle: "AI sound Designer",
    description: "A web application that provides an interface for users to generate sounds of their choice using a simple prompt and save them to their profile.",
    image: "https://ik.imagekit.io/lmpthl5suv/harmoniq-dummy.png",
    githubUrl: "https://github.com/ayyush08/HarmoniQ",
    tags: ["Next.js", "MongoDB", "FastAPI", "Python","Gemini API","HuggingFace Models"],
    accentColor: "#8B5CF6"
  }
];
