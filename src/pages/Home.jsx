import { ThemeToggle } from "@/components/ThemeToggle";
import { ThemeProvider } from "../components/ThemeContext";
import { Navbar } from "../components/Navbar";
import { HomeSection } from "../components/HomeSection";
import { AboutSection } from "../components/AboutSection";
import { SkillsSection } from "../components/SkillsSection";

export const Home = () => {
    return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

          {/* Theme Toggle */}
          <ThemeToggle />
          {/* Background effects */}
          
          {/* Navigation */}
          <Navbar />
          {/* Main */}
          <main>
              {/* Sections */}
              <HomeSection />
              <AboutSection />
              <SkillsSection />
          </main>

          {/* Footer */}
      </div>
    </ThemeProvider>
    )
};