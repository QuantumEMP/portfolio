
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
        image: "/projects/sign-language-glass.avif",
        tags: ["Java", "Android", "AI", "Kotlin"],
        demoUrl: "#",
        githubUrl: "https://github.com/QuantumEMP/sign-language-glass",
    },
];

export const ProjectsSection = () => {
    return (
        <section id="projects" className="py-24 px-4 relative flex flex-col items-center">
        </section>
    )
}