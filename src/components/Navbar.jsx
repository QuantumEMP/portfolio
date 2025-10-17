import {cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
    { name: 'Home', link: '#home' },
    { name: 'About', link: '#about' },
    { name: 'Skills', link: '#skills' },
    { name: 'Projects', link: '#projects' },
    { name: 'Contact', link: '#contact' },
];

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [])

    return (
        <nav className={cn("fixed w-full z-40 transition-all duration-300", isScrolled ? "py-3 bg-background/80 backdrop-blur-md shadow-xs" : "py-5 ")}>
            <div className="container flex justify-between items-center">
                <a className="text-xl font-bold text-primary flex items-center" href="#home">
                    <span className="relative z-10">
                    <span className="text-glow text-foreground"> Jude Rose</span> Portfolio
                    </span>
                </a>

                {/* desktop nav */}
                <div className="hidden md:flex items-center space-x-8">
                    {navItems.map((item) => (
                        <a 
                            key={item.name}
                            href={item.link}
                            className="mx-4 text-md font-medium text-foreground/80 hover:text-primary transition-colors duration-300"
                        >
                            {item.name}
                        </a>
                    ))}
                </div>

                {/* mobile nav */}
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                    className="md:hidden p-2 text-foreground z-50 hover:text-primary transition-colors duration-300"
                    aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}>
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <div className={cn("fixed inset-0 bg-background/90 backdrop-blur-md z-40 flex flex-col items-center justify-center",
                    "transition-all duration-300 md-hidden", 
                    isMobileMenuOpen ? "visible opacity-100 pointer-events-auto" : "invisible opacity-0 pointer-events-none"
                )}>
                    <div className="flex flex-col items-center space-y-8 text-xl">
                        {navItems.map((item) => (
                            <a 
                                key={item.name}
                                href={item.link}
                                className="text-foreground/80 hover:text-primary transition-colors duration-300"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    )
};