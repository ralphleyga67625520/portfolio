
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DockSection from "@/components/sections/DockSection";
import { PortfolioShell } from "@/components/PortfolioShell";
import DesktopHint from "@/components/DesktopHint";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`} suppressHydrationWarning
      >
        {/* Particles + Dock — hidden on /admin routes */}
        <PortfolioShell>
          <div className="fixed inset-x-0 bottom-6 z-50 flex justify-center pointer-events-none">
            <div className="pointer-events-auto">
              <DockSection />
            </div>
          </div>
          <DesktopHint />
        </PortfolioShell>

        {children}
      </body>
    </html>
  );
}

