import { act, useState } from 'react';
import { cn } from '@/lib/utils';

const skills = [
    { name: 'JavaScript', level: 65, category: 'frontend' },
    { name: 'React', level: 25, category: 'frontend' },
    { name: 'CSS', level: 50, category: 'frontend' },
    { name: 'HTML', level: 80, category: 'frontend' },
    { name: 'Tailwind CSS', level: 50, category: 'frontend' },
    { name: 'TypeScript', level: 20, category: 'frontend' },

    { name: 'Node.js', level: 25, category: 'backend' },
    { name: 'Python', level: 95, category: 'backend' },
    { name: 'Java', level: 95, category: 'backend' },
    { name: 'SQL', level: 70, category: 'backend' },

    { name: 'Gradle', level: 30, category: 'tools' },
    { name: 'Git', level: 70, category: 'tools' },
    { name: 'Maven', level: 90, category: 'tools' },
    { name: 'Google Cloud', level: 30, category: 'tools' },
    { name: 'Docker', level: 50, category: 'tools' },
    { name: 'CI/CD', level: 80, category: 'tools' },
    { name: 'Agile Methodologies', level: 100, category: 'tools' },

    { name: 'Kotlin', level: 40,  category: 'mobile' },
    { name: 'Android Development', level: 35, category: 'mobile' },
    
    { name: 'Artificial Intelligence', level: 50, category: 'AI' },
    { name: 'Machine Learning', level: 40, category: 'AI' },

    { name: 'Data Analysis', level: 60, category: 'development' },
    { name: 'UI/UX Design', level: 30, category: 'development' },
    { name: 'Full-Stack Development', level: 50, category: 'development' },
    
    { name: 'Algorithm Design', level: 85, category: 'softskills' },
    { name: 'Problem Solving', level: 100, category: 'softskills' },
    { name: 'Communication Skills', level: 95, category: 'softskills' },
    { name: 'Team Collaboration', level: 100, category: 'softskills' },
    { name: 'Project Management', level: 75, category: 'softskills' },
];

const categories = [
    'all',
    'frontend',
    'backend',
    'tools',
    'mobile',
    'AI',
    'development',
    'softskills',
];

export const SkillsSection = () => {
    const [activeCategory, setActiveCategory] = useState('all');

    const filteredSkills = skills.filter((skill) => activeCategory === 'all' || skill.category === activeCategory);
    return (
        <section id="skills" className="py-24 px-4 relative bg/secondary/30 flex flex-col items-center">
        
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-4xl md:text-4xl font-bold mb-12 text-center">
                    My 
                    <span className="text-primary"> Skills</span>
                </h2>

                <div className="flex flex-wrap justify-center mb-12 gap-4">
                    {categories.map((category, key) => (
                        <button
                            key={key}
                            onClick={() => setActiveCategory(category)}
                            className={cn('px-5 py-2 rounded-full transition-colors duration-300 capitalize',
                                activeCategory === category ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground hover:bg-secondary/70',
                            )}>
                                {category}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSkills.map((skill, index) => (
                        <div key={index} className="bg-card p-6 rounded-lg shadow-xs card-hover">
                            <div className="text-left mb-4">
                                <h3 className=" font-semibold text-lg">{skill.name}</h3>
                            </div>
                            <div className="w-full bg-secondary/50 h-2 rounded-full outflow-hidden">
                                <div
                                    className="bg-primary h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${skill.level}%` }}
                                ></div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        
        </section>
    )
}