import { ArrowRight, ExternalLink, Github } from "lucide-react";

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
        description: "A ambitious project that aims to translate spoken word into sign language using AI for Android XR",
        image: "/projects/sign-language.png",
        tags: ["Java", "Android", "AI", "Kotlin"],
        demoUrl: "#",
        githubUrl: "https://github.com/QuantumEMP/sign-language-glass",
    },
];

export const ProjectsSection = () => {
    return (
        <section id="projects" className="py-24 px-4 relative flex flex-col items-center">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-4xl font-bold mb-12 text-center">
                    {" "}
                    Featured <span className="text-primary">Projects</span>
                </h2>

                <p className="text-center mb-12 text-lg text-muted-foreground max-w-3xl mx-auto">
                    Here are some of the projects I've worked on recently. Feel free to explore them and check out the code on GitHub!
                </p>

                <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="group bg-card rounded-lg shadow-xs card-hover overflow-hidden transform transition-transform duration-300 hover:scale-105"
                        >
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-2xl font-semibold mb-2">
                                    {project.title}
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    {project.description}
                                </p>
                                <div className="mb-4">
                                    {project.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="inline-block bg-primary text-white text-sm px-2 py-1 rounded-full mr-2 mb-2"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex space-x-4">
                                    <a
                                        href={project.demoUrl}
                                        className="text-foreground hover:underline hover:text-primary"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <ExternalLink />
                                    </a>
                                    <a
                                        href={project.githubUrl}
                                        className="text-foreground hover:underline hover:text-primary"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Github />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-12 bg-primary text-foreground text-sm px-2 py-1 rounded-full w-fit mx-auto">
                    <a
                        href="https://github.com/quantumemp"
                        className="button w-fit flex items-center mx-auto gap-2"
                        target="_blank"
                        >
                            Check Out My GitHub <ArrowRight size={16} />
                        </a>
                </div>
            </div>
        </section>
    )
}