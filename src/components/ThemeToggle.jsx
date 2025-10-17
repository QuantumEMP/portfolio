import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "./ThemeContext";

export const ThemeToggle = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const [isScrolled, setIsScrolled] = useState(false);

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
        <button onClick={toggleTheme} className={cn("fixed max-sm:hidden top-3 right-5 z-50 p-2 rounded-full transition-colors duration-300",
            "focus:outline-hidden",
            isScrolled ? "py-1" : "py-2 "
        )}> 
            {isDarkMode ? (
                <Sun className="h-6 w-6 text-yellow-300"/>
             ) : ( 
                <Moon className="h-6 w-6 text-blue-900"/>
            )}
        </button>
    )
}