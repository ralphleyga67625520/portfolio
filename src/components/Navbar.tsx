"use client"

import * as React from "react"
import { ModeToggle } from "./ModeToggle"
import {
    Navbar as Nav,
    NavBody,
    NavItems,
    MobileNav,
    NavbarButton,
    MobileNavHeader,
    MobileNavToggle,
    MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { Download } from "lucide-react";
export function Navbar() {


    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);


    const navItems = [
        { name: "About", link: "#about" },
        { name: "Skills", link: "#skills" },
        { name: "Projects", link: "#projects" },
        { name: "Education", link: "#education" },
        { name: "Contact", link: "#contact" },
    ]

    const handleDownloadResume = () => {
        
        const resumeUrl = "https://drive.google.com/uc?export=download&id=1WkP3YPsQ7706lFEmjcTLJJ12qZmc5sCa"
        const link = document.createElement("a")
        link.href = resumeUrl
        link.download = "AyushKumarGupta_Resume.pdf"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <main className="fixed w-full z-20">
            <Nav>
                {/* Desktop Navigation */}
                <NavBody>
                    {/* <NavbarLogo /> */}
                    <span className="font-bold   text-2xl  font-sans"> &lt;Ak/&gt;</span>
                    <NavItems items={navItems} />
                    <div className="flex items-center">
                        <NavbarButton
                            onClick={() => {
                                handleDownloadResume()
                                setIsMobileMenuOpen(false)
                            }}
                            variant="secondary"
                            className="flex items-center gap-2 w-full justify-center dark:bg-neutral-800 dark:text-white"
                        >
                            <Download className="h-4 w-4 dark:text-white" />Resume

                        </NavbarButton>
                        <NavbarButton variant="secondary">
                            <ModeToggle />
                        </NavbarButton>
                    </div>
                </NavBody>

                {/* Mobile Navigation */}
                <MobileNav>
                    <MobileNavHeader>
                        <span className="font-bold text-md font-sans">&lt;/&gt;</span>
                        <MobileNavToggle
                            isOpen={isMobileMenuOpen}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        />
                    </MobileNavHeader>

                    <MobileNavMenu
                        isOpen={isMobileMenuOpen}
                        onClose={() => setIsMobileMenuOpen(false)}
                    >
                        {navItems.map((item, idx) => (
                            <a
                                key={`mobile-link-${idx}`}
                                href={item.link}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="relative text-neutral-600 dark:text-neutral-300"
                            >
                                <span className="block">{item.name}</span>
                            </a>
                        ))}
                        <div className="flex w-full justify-center flex-col gap-4">
                            <NavbarButton
                                onClick={() => {
                                    handleDownloadResume()
                                    setIsMobileMenuOpen(false)
                                }}
                                variant="secondary"
                                className="flex items-center gap-2 w-full justify-center dark:bg-neutral-800 dark:text-white"
                            >
                                <Download className="h-4 w-4 dark:text-white" />Resume

                            </NavbarButton>
                            <NavbarButton
                                onClick={() => setIsMobileMenuOpen(false)}
                                variant="secondary"

                            >
                                <ModeToggle />
                            </NavbarButton>
                        </div>
                    </MobileNavMenu>
                </MobileNav>
            </Nav>
        </main>
    )
}
