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


export const projects: Project[] = [
  {
    title: "Unified Travel Booking",
    subtitle: "A fully-featured video streaming platform",
    description:
      "The front-end is built with ReactJS and NextJS, providing a fast and responsive user experience. The backend uses NodeJS and ExpressJS to handle API integrations and manage booking data stored in MongoDB.",
    image: "/projects/MERN Stack/Unified Travel Booking.png",
    githubUrl: "#",
    liveUrl: "https://brokr-three.vercel.app",
    tags: ["TypeScript", "ReactJS", "NextJS", "TailwindCSS", "NodeJS", "ExpressJS", "Supabase", "PostgreSQL", "Stripe", "GitHub"],
    accentColor: "#FF4040",
  },
  {
    title: "Easy Clothes – Online Women’s Fashion Retail Store",
    subtitle: "a full-stack developer portfolio builder",
    description:
      "Easy Clothes is an online fashion store offering European and French-style women’s clothing to customers in the US and Canada.",
    image: "/projects/Shopify/Easy Clothes – Online Women’s Fashion Retail Store.png",
    githubUrl: "#",
    liveUrl: "https://easy-clothes.us",
    tags: ["Shopify", "Web Hosting", "eCommerce Platform", "SSL/HTTPS"],
    accentColor: "#3B82F6",
  },
  {
    title: "KavarSa",
    description:
      "Easy Clothes is an online fashion store offering European and French-style women’s clothing to customers in the US and Canada.",
    image: "/projects/Shopify/KavarSa.png",
    githubUrl: "#",
    liveUrl: "https://kavarsa.com",
    tags: ["Shopify", "Web Hosting", "eCommerce Platform", "SSL/HTTPS"],
    accentColor: "#FF8C00"
  },
  {
    title: "Crypto King Checkmate",
    subtitle: "AI sound Designer",
    description: "Crypto King Checkmate is a full-featured cryptocurrency trading platform built to provide users with a seamless experience for managing and trading digital assets. The platform integrates with cryptocurrency APIs to provide real-time market data and enable secure trading operations.",
    image: "/projects/BlockChain/Crypto King Checkmate.png",
    githubUrl: "#",
    liveUrl: "https://crypto-checkmate.vercel.app",
    tags: ["HTML5", "CSS3", "JavaScript", "ReactJS", "NextJS", "TailwindCSS", "NodeJS", "ExpressJS", "MongoDB", "Git", "Github"],
    accentColor: "#8B5CF6"
  },
  {
    title: "Game Hub",
    subtitle: "AI sound Designer",
    description: "Crypto King Checkmate is a full-featured cryptocurrency trading platform built to provide users with a seamless experience for managing and trading digital assets. The platform integrates with cryptocurrency APIs to provide real-time market data and enable secure trading operations.",
    image: "/projects/BlockChain/Game Hub.png",
    githubUrl: "#",
    liveUrl: "https://game-hub-jet-three.vercel.app",
    tags: ["HTML5", "CSS3", "JavaScript", "ReactJS", "NextJS", "TailwindCSS", "NodeJS", "ExpressJS", "MongoDB", "Git", "Github"],
    accentColor: "#5cf6a9"
  },
  {
    title: "Apple Phone",
    subtitle: "AI sound Designer",
    description: "The architecture prioritizes performance through code splitting, lazy loading of 3D assets, and efficient rendering techniques. The responsive design ensures the experience remains smooth and visually impressive across desktop, tablet, and mobile devices.",
    image: "/projects/MERN Stack/Apple Phone.png",
    githubUrl: "#",
    liveUrl: "https://app-iphone.netlify.app",
    tags: ["TypeScript", "ReactJS", "NextJS", "TailwindCSS", "JavaScript", "CSS3", "HTML5", "PostgreSQL", "GitHub"],
    accentColor: "#975cf6"
  },
  {
    title: "Whop Deal Challenge",
    subtitle: "AI sound Designer",
    description: "The Whop Deal Challenge page is built as a focused funnel, combining a bold hero, a simple explanation of the 7 days, and a frictionless signup form.",
    image: "/projects/MERN Stack/Whop Deal Challenge.png",
    githubUrl: "#",
    liveUrl: "https://3challenge-whop-deal.vercel.app/",
    tags: ["TypeScript", "ReactJS", "NextJS", "TailwindCSS", "JavaScript", "CSS3", "HTML5", "PostgreSQL", "GitHub"],
    accentColor: "#975cf6"
  }
  ,
  {
    title: "patientflowsolutions.com",
    description: "Patient Flow Solutions — WordPress site migration and optimisation.",
    image: "/projects/WordPress/patientflowsolutions.com.png",
    githubUrl: "#",
    liveUrl: "https://patientflowsolutions.com",
    tags: ["WordPress", "PHP", "MySQL", "Hosting"],
    accentColor: "#1E90FF"
  },
  {
    title: "sobioproperties.com",
    description: "Sobioproperties — Real estate listing site built on WordPress.",
    image: "/projects/WordPress/sobioproperties.com.png",
    githubUrl: "#",
    liveUrl: "https://sobioproperties.com",
    tags: ["WordPress", "Real Estate", "PHP"],
    accentColor: "#10B981"
  },
  {
    title: "www.360capgroup.com",
    description: "360 Cap Group — corporate WordPress site and content management.",
    image: "/projects/WordPress/www.360capgroup.com.png",
    githubUrl: "#",
    liveUrl: "https://www.360capgroup.com",
    tags: ["WordPress", "Corporate", "SEO"],
    accentColor: "#F59E0B"
  },
  {
    title: "www.silvertimelegal.co.uk",
    description: "Silver Time Legal — law firm site built and maintained on WordPress.",
    image: "/projects/WordPress/www.silvertimelegal.co.uk.png",
    githubUrl: "#",
    liveUrl: "https://www.silvertimelegal.co.uk",
    tags: ["WordPress", "Legal", "Accessibility"],
    accentColor: "#6B7280"
  }
  
];
