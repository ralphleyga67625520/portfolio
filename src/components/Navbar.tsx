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
export function Navbar() {


    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);


    const navItems = [
        { name: "Home", link: "/" },
        { name: "About", link: "#about" },
        { name: "Skills", link: "#skills" },
    ]

    return (
        <div className="fixed w-full p-5 z-30">
            <Nav>
                {/* Desktop Navigation */}
                <NavBody>
                    {/* <NavbarLogo /> */}
                    <span className="font-bold   text-2xl  font-sans">Ayush Kumar Gupta</span>
                    <NavItems items={navItems} />
                    <div className="flex items-center gap-6">
                        <NavbarButton variant="secondary">
                            <ModeToggle />
                        </NavbarButton>
                    </div>
                </NavBody>

                {/* Mobile Navigation */}
                <MobileNav>
                    <MobileNavHeader>
                        <span className="font-bold text-md font-sans">Ayush Kumar Gupta</span>
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
                                onClick={() => setIsMobileMenuOpen(false)}
                                variant="secondary"

                            >
                                <ModeToggle/>
                            </NavbarButton>
                        </div>
                    </MobileNavMenu>
                </MobileNav>
            </Nav>
        </div>
    )
}
