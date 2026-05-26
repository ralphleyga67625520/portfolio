export interface Certification {
  name: string;
  image: string; // path or URL to the certificate image
  link?: string; // optional verification/credential link
}

const dummyImageUrl =
  "https://ik.imagekit.io/lmpthl5suv/ScreenShot-2025-3-9_0-49-21_bqgprKot3.png?updatedAt=1745244201053";
  
export const Certifications: Certification[] = [
  // Add your Certifications here. Example:
  {
    name:"Notre Dame of Midsayap College",
    image: "/education/college.jpg",
    link: "https://drive.google.com/file/d/1un2PymsO93PIhpEJ282hbBf86b-CCnIG/view"
  }
];
