import { useTheme } from "./ThemeContext";

export const Cards = () => {
    const { isDarkMode } = useTheme();
    return (
        <div className="absolute inset-0 flex max-h-screen flex-col items-center justify-center">
            <img
                    src={isDarkMode ? "/backgrounds/Aces.png" : "/backgrounds/Jacks.png"}
                    alt="Background"
                    className={isDarkMode ? " object-contain animate-fade-in w-max animate-float-down" : "object-contain animate-fade-in w-full h-max animate-float-down"}
                />
        </div>
    )
}