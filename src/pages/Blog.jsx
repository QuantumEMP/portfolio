import { ThemeToggle } from "@/components/ThemeToggle";
import { ThemeProvider } from "../components/ThemeContext";
import { Navbar } from "../components/Navbar";
import Aurora from "../components/reactbits/Background";
import { HomeBlog } from "../components/HomeBlog";
import { ArticlesBlog } from "../components/ArticlesBlog";

export const Blog = () => {
  return (
    <ThemeProvider>
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
          <HomeBlog />
          <ArticlesBlog />
        </main>

        {/* Footer */}
      </div>
    </ThemeProvider>
  );
};