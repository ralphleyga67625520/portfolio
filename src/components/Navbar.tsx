"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useMediaQuery } from "@/hooks/use-media-query"
import { ModeToggle } from "./ModeToggle"

export function Navbar() {
    const isDesktop = useMediaQuery("(min-width: 768px)")
    const [open, setOpen] = React.useState(false)

    // Close sheet when switching to desktop view
    React.useEffect(() => {
        if (isDesktop) {
            setOpen(false)
        }
    }, [isDesktop])

    const navItems = [
        { name: "Home", href: "/" },
        { name: "About", href: "#about" },
        { name: "Skills", href: "#skills" },
    ]

    return (
        <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                {/* Company Name */}
                <div className="flex items-center">
                    <Link href="/" className="font-bold text-2xl font-sans">
                        Ayush Kumar Gupta
                    </Link>
                </div>

                {/* Desktop Navigation */}
                {isDesktop ? (
                    <nav className="mx-auto flex items-center space-x-4">
                        {navItems.map((item) => (
                            <Button key={item.name} variant="secondary" asChild className="p-5 font-semibold font-mono">
                                <Link href={item.href}>{item.name}</Link>
                            </Button>
                        ))}
                    </nav>
                ) : null}

                {/* Right side - Theme Toggle and Mobile Menu */}
                <div className="flex items-center space-x-4">
                    {/* Theme Toggle */}
                    <ModeToggle/>

                    {/* Mobile Menu */}
                    {!isDesktop && (
                        <Sheet open={open} onOpenChange={setOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" aria-label="Menu">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right">
                                <SheetHeader>
                                    <SheetTitle className="text-xl">Ayush Kumar Gupta</SheetTitle>
                                    <SheetDescription>Software Engineer & Developer</SheetDescription>
                                </SheetHeader>
                                <nav className="flex flex-col space-y-4 items-center justify-center p-5 mt-8">
                                    {navItems.map((item) => (
                                        <Button
                                            key={item.name}
                                            variant="secondary"
                                            className="w-1/2 text-center "
                                            asChild
                                            onClick={() => setOpen(false)}
                                        >
                                            <Link href={item.href}>{item.name}</Link>
                                        </Button>
                                    ))}
                                </nav>
                            </SheetContent>
                        </Sheet>
                    )}
                </div>
            </div>
        </header>
    )
}
