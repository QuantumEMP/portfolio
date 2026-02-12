import { ThemeToggle } from "@/components/ThemeToggle";
import { Navbar } from "../components/Navbar";
import { HomeSection } from "../components/HomeSection";
import { AboutSection } from "../components/AboutSection";
import { SkillsSection } from "../components/SkillsSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { ContactSection } from "../components/ContactSection";
import Aurora from "../components/reactbits/Background";

export const Home = () => {
  return (
      <div className="min-h-screen text-foreground overflow-x-hidden">
        {/* Theme Toggle */}
        <ThemeToggle />
        {/* Background effects */}

        {/* Navigation */}
        <Navbar />
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={1}
          amplitude={1.0}
          speed={0.5}
        />
        {/* Main */}
        <main>
          {/* Sections */}
          <HomeSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </main>

        {/* Footer */}
      </div>
  );
};
