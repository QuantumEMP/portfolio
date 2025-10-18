import { Briefcase, Code, User } from "lucide-react"

export const AboutSection = () => {
    return (
        <section id="about" className="py-24 px-4 relative flex flex-col items-center">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-4xl md:text-4xl font-bold mb-12 text-center">
                    About
                    <span className="text-primary"> Me</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-8">
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold">Passionate developer, learning the ropes of technical knowledge</h3>

                        <p className="text-muted-foreground">
                            I am a dedicated and enthusiastic fullstack developer with a 
                            strong passion for creating dynamic and user-friendly applications.
                        </p>
                        <p className="text-muted-foreground">
                            I want to make the world a better place with the help of the many
                            technical tools that I have acquired over the years and will learn
                            as I continue my journey in the tech industry.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
                            <a
                                href="#contact"
                                className="buttons"> 
                                Get in Touch
                            </a>
                            <a
                                href=""
                                download
                                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary hover:text-background transition-colors text-center">
                                Download CV
                            </a>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        <div className="gradient-border p-6 card-hover">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Code className="w-6 h-6 text-primary" />
                                </div>
                                <div className="text=left">
                                    <h4 className="font-semi-bold text-lg">Web Development</h4>
                                    <p className="text-muted-foreground"></p>
                                </div>
                            </div>
                        </div>
                        <div className="gradient-border p-6 card-hover">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <User className="w-6 h-6 text-primary" />
                                </div>
                                <div className="text=left">
                                    <h4 className="font-semi-bold text-lg">Web Development</h4>
                                    <p className="text-muted-foreground"></p>
                                </div>
                            </div>
                        </div>
                        <div className="gradient-border p-6 card-hover">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Briefcase className="w-6 h-6 text-primary" />
                                </div>
                                <div className="text=left">
                                    <h4 className="font-semi-bold text-lg">Web Development</h4>
                                    <p className="text-muted-foreground"></p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            {/* <p className="max-w-3xl text-center text-lg leading-relaxed">
                Hello! I'm Juderose, a passionate web developer with a love for creating beautiful and functional websites.
                With a strong foundation in JavaScript, React, and CSS, I enjoy bringing ideas to life in the digital world.
                When I'm not coding, you can find me exploring new technologies, hiking in nature, or experimenting with photography.
                I'm always eager to learn and take on new challenges, so feel free to reach out if you'd like to collaborate!
            </p> */}
        </section>
    )
}