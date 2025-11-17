import { ArrowRight} from "lucide-react";
import Carousel from "./reactbits/Carousel";

const projects = [
  {
    id: 1,
    title: "Hangman Game",
    description: "A simple game of Hangman built in python.",
    image: "/projects/hangman.png",
    tags: ["Python", "Terminal"],
    demoUrl: "#",
    githubUrl: "https://github.com/QuantumEMP/Hangman",
  },
  {
    id: 2,
    title: "Sign language Translator",
    description:
      "A ambitious project that aims to translate spoken word into sign language using AI for Android XR",
    image: "/projects/sign-language.png",
    tags: ["Java", "Android", "AI", "Kotlin"],
    demoUrl: "#",
    githubUrl: "https://github.com/QuantumEMP/sign-language-glass",
  },
];

export const ProjectsSection = () => {
  return (
    <section
      id="projects"
      className="py-24 px-4 relative flex flex-col items-center"
    >
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-4xl font-bold mb-12 text-center">
          {" "}
          Winning <span className="text-secondary">Hands</span>
        </h2>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
          <p className="text-center mb-12 text-lg text-muted-foreground max-w-3xl mx-auto">
            Here are some of the projects I've worked on recently. Feel free to
            explore them and check out the code on GitHub!
            <div className="text-center mt-12 bg-primary text-foreground text-sm px-2 py-1 rounded-full w-fit mx-auto">
              <a
                href="https://github.com/quantumemp"
                className="button w-fit flex items-center mx-auto gap-2"
                target="_blank"
              >
                Check Out My GitHub <ArrowRight size={16} />
              </a>
            </div>
          </p>
          <div
            className="h-48 w-full "
            style={{ height: "600px", position: "center" }}
          >
            <Carousel
              baseWidth={300}
              autoplay={true}
              autoplayDelay={3000}
              pauseOnHover={true}
              loop={true}
              round={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
