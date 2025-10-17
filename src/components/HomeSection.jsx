import { useTheme } from "./ThemeContext";

export const HomeSection = () => {
    const { isDarkMode } = useTheme();
    return (
        <section id="home" className="relative min-h-screen flex flex-col items-center justify-center px-4">
            <div className="container max-w-4xl text-center mx-auto z-10">
                <div className="space-y-6">
                    <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
                        <span className="opacity-0 animate-fade-in">Hi, I'm </span>
                        <span className="text-glow text-primary opacity-0 animate-fade-in-delay-1">Jude </span>
                        <span className="text-glow text-gradient ml-2 opacity-0 animate-fade-in-delay-1">Rose</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-foreground/80 opacity-0 animate-fade-in-delay-2">
                        {isDarkMode ? ("A Jack of all trades, master of none but still always better than a master of one. ") : ("Your future ace engineer, ready to tackle challenges with creativity and passion. ")}
                    </p>

                    <div>
                        <a href="#projects" className="buttons">
                            View My Work
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}