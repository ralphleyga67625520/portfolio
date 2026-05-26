export interface Experience {
  role: string;
  company: string;
  companyUrl?: string;
  companyLogo?: string;
  duration: string;
  description: string[];
  upcoming?: boolean;
  accentColor: string;
}

export const experiences: Experience[] = [
  {
    role: "Full Stack Engineer Intern",
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
    role: "CEO",
    company: "Swiftkind",
    companyLogo: "/company_logos/swiftkind_logo.jpg",
    duration: "June 2019 - September 2024",
    description: [
      "Spearheaded engineering initiatives that scaled SaaS infrastructure to support thousands of concurrent users across cloud-based environments.",
      "Directed cross-functional teams of 10+ engineers, designers, and operations staff to deliver high-availability SaaS applications, improving deployment efficiency by 45%.",
      "Reduced deployment turnaround time by 45% through CI/​CD optimization and infrastructure automation",
      "Architected backend systems that strengthened platform stability, scalability, and long-term maintainability.",
      "Increased engineering productivity by 35% through agile workflow optimization, sprint automation, and standardized development practices.",
    ],
    accentColor: "#34D399",
  },
  {
    role: "COO",
    company: "Swiftkind",
    companyLogo: "/company_logos/swiftkind_logo.jpg",
    duration: "January 2016 — June 2019",
    description: [
      "Coordinated engineering operations for 5+ production-grade web platforms supporting high-volume business automation workflows.",
      "Improved API response performance by 35% through backend optimization and database restructuring.",
      "Reduced software release cycles by 30% through agile sprint optimization and deployment standardization initiatives.",
      "Reduced operational downtime by 25% by implementing automated monitoring, debugging workflows, and infrastructure reliability enhancements.",
    ],
    accentColor: "#F472B6",
  },
  {
    role: "Python Developer",
    company: "VectorScient",
    companyLogo: "/company_logos/vectorscient_llc_logo.jpg",
    duration: "December 2015 — August 2016",
    description: [
      "Developed enterprise backend applications handling thousands of automated reporting and analytics transactions daily.",
      "Streamlined third-party reporting integrations, reducing manual processing workloads by 60%.",
      "Optimized database queries and backend processing pipelines, reducing reporting execution time by 50%.",
    ],
    accentColor: "#8572f4",
  },
  {
    role: "Lead Developer",
    company: "DealRoom",
    companyLogo: "/company_logos/dealroom_logo.jpg",
    duration: "June 2015 – April 2016",
    description: [
      "Engineered secure M&A transaction systems handling 0.5K+ confidential financial documents across high-security production environments.",
      "Implemented authentication and document security systems that reduced unauthorized access incidents by 30%.",
      "Increased application reliability by reducing deployment-related issues by 35% across production environments.",
    ],
    accentColor: "#72f4d8",
  },
  {
    role: "Lead Developer",
    company: "Fundology",
    companyLogo: "/company_logos/foundology_logo.jpg",
    duration: "January 2012 – June 2015",
    description: [
      "Developed backend and frontend application features that streamlined internal workflows and accelerated platform usability across web applications.",
      "Resolved debugging and performance bottlenecks that stabilized application reliability and strengthened backend performance.",
      "Delivered 10+ web and mobile application features across frontend and backend systems within agile development cycles.",
    ],
    accentColor: "#de72f4",
  },
];
