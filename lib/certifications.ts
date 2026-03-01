export interface Certification {
  name: string;
  image: string; // path or URL to the certificate image
  link?: string; // optional verification/credential link
}

const dummyImageUrl =
  "https://ik.imagekit.io/lmpthl5suv/ScreenShot-2025-3-9_0-49-21_bqgprKot3.png?updatedAt=1745244201053";
  
export const certifications: Certification[] = [
  // Add your certifications here. Example:
  {
    name: "Data Structures & Algorithms - Programming Pathshala",
    image: "https://ik.imagekit.io/lmpthl5suv/dsacerti.png",
    link: "https://drive.google.com/file/d/1un2PymsO93PIhpEJ282hbBf86b-CCnIG/view"
  },
  {
    name: "PostMan API Fundamentals Student Expert",
    image: "https://ik.imagekit.io/lmpthl5suv/posstmancerti.png",
    link: "https://drive.google.com/file/d/13eaG2KiXAzNi9rNhWeJNjKnOZycAA4uP/view?usp=sharing"
  }
];
