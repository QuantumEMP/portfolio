import { ArrowDown } from "lucide-react";
import { useTheme } from "./ThemeContext";
import { Cards } from "./Cards";

export const HomeSection = () => {
    const { isDarkMode } = useTheme();
    return (
        <section id="home" className="relative min-h-screen flex flex-col items-center justify-center px-4">
            <Cards />
            <div
                className="container max-w-4xl text-center mx-auto z-10 p-6 dark:bg-background/90 backdrop-blur-xl transition-all duration-300"
            
            >
                
                <div className="space-y-6">
                    <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
                        <span className="opacity-0 animate-fade-in">Hi, I'm </span>
                        <span className="text-glow text-primary opacity-0 animate-fade-in-delay-1">Jude </span>
                        <span className="text-glow text-gradient ml-2 opacity-0 animate-fade-in-delay-2">Rose</span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground/80 opacity-0 animate-fade-in-delay-3">
                        {isDarkMode ?  ("Your future ace engineer, ready to tackle challenges with creativity and passion. ") : ("A Jack of all trades, master of none but still always better than a master of one. ")}
                    </p>

                    <div className="pt-4 opacity-0 animate-fade-in-delay-4">
                        <a href="#projects" className="buttons">
                            View My Work
                        </a>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col animate-bounce items-center">
                <span className="text-sm text-muted-foreground mb-2"> Scroll </span>
                <ArrowDown className="mt-2 h-6 w-6 text-primary/70" />
            </div>
        </section>
    )
}