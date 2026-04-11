export interface Experience {
  role: string;
  company: string;
  companyUrl?: string;
  duration: string;
  description: string[];
  upcoming?: boolean;
  accentColor: string;
}

export const experiences: Experience[] = [
  {
    role: "Full Stack Developer Intern",
    company: "Upcoming",
    duration: "Starting Soon",
    description: [
      "Preparing to contribute to production-grade applications",
      "Building on strong foundations in React, Node.js, and system design",
    ],
    upcoming: true,
    accentColor: "#FBBF24",
  },
  {
    role: "Open Source Contributor",
    company: "Various Projects",
    companyUrl: "https://github.com/ayyush08",
    duration: "2024 — Present",
    description: [
      "Shipped 4+ full-stack projects used by real users — CuraTube, CuraVibe, Inkognito, HarmoniQ",
      "Designed scalable APIs handling video streaming, AI sound generation, and anonymous messaging",
      "Implemented authentication flows, cloud media pipelines, and real-time data fetching",
    ],
    accentColor: "#34D399",
  },
  {
    role: "Competitive Programmer",
    company: "LeetCode / Codeforces",
    companyUrl: "https://leetcode.com/u/ayyush_08/",
    duration: "2023 — Present",
    description: [
      "Solved 400+ problems across platforms, focusing on graphs, DP, and greedy algorithms",
      "Achieved consistent contest ratings demonstrating strong algorithmic thinking",
      "Applied DSA knowledge to optimize real-world application performance",
    ],
    accentColor: "#F472B6",
  },
];
