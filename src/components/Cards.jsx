import { useTheme } from "./ThemeContext";
import AnimatedContent from "./reactbits/AnimatedContent";

export const Cards = () => {
  const { isDarkMode } = useTheme();
  return (
    <AnimatedContent
      distance={150}
      direction="vertical"
      reverse={true}
      duration={2}
      ease="power3.out"
      initialOpacity={0.2}
      animateOpacity
      scale={1}
      threshold={0.2}
      delay={0.3}
    >
      <div className="absolute inset-0 flex max-h-screen flex-col items-center justify-center">
        <img
          src={isDarkMode ? "/backgrounds/Aces.png" : "/backgrounds/Jacks.png"}
          alt="Background"
          className="object-contain"
        />
      </div>
    </AnimatedContent>
  );
};
