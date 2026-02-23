import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DockDemo } from "@/components/Dock";
import { Particles } from "@/components/ui/particles";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ayush Kumar Gupta | Full Stack Developer",
  description:
    "Portfolio of a full stack developer and a strong problem-solver with keen interest in coding and building stuff. Experienced in competitive programming and has a good grasp of data structures and algorithms. Skilled in JavaScript, TypeScript, React, Node.js, Next.js,etc. Passionate about learning new technologies and improving coding skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        {/* Universal particles background */}
        <Particles
          className="fixed inset-0 -z-10"
          variant="snow"
        />

        {children}

        {/* Fixed dock — always visible at the bottom */}
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
          <DockDemo />
        </div>
      </body>
    </html>
  );
}
