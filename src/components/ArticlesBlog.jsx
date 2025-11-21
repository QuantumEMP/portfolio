
    
const filteredSkills = [
    { name: "Sample Article 1", blurb: "An introduction to my blog.", image: "https://via.placeholder.com/150" },
];

export const ArticlesBlog = () => {
    return (
        <section
            id="articles"
            className="py-24 px-4 relative flex flex-col items-center"
        >
        <div className="container mx-auto max-w-5xl">
            <h2 className="text-4xl font-bold mb-12 text-center">
            My <span className="text-secondary">Hand</span>
            </h2>
            
            <p className="text-center mb-12 text-lg text-muted-foreground max-w-3xl mx-auto">
                Welcome to my blog! Here, I share my thoughts, experiences, and
                knowledge on technology and beyond. Dive into a world of tech
                insights, tutorials, and personal reflections.
            </p>
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
            <div
                className="h-48 w-full "
                style={{ height: "600px", position: "center" }}
            >
                {filteredSkills.map((skill, index) => (
                        <div key={index} className="bg-card p-6 rounded-lg shadow-xs card-hover" onClick={() => window.location.href = "#"+skill.name.replace(/\s+/g, '-').toLowerCase()}>
                            <img src={skill.image} alt={skill.name} className="w-full h-32 object-cover mb-4 rounded" />
                            <div className="text-center mb-4">
                                <h3 className=" font-semibold text-lg">{skill.name}</h3>
                            </div>
                            <div className="text-sm text-muted-foreground">
                                <p>{skill.blurb}</p>
                            </div>

                        </div>
                    ))}
            </div>
            </div>
        </div>
        </section>
    );
}