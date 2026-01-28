import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Code, Star, GitBranch } from 'lucide-react';

const Projects = () => {
    const projects = [
        {
            id: 1,
            title: 'Virtual Personal Stylist',
            description: 'Next-generation JavaFX application leveraging AI to curate outfits based on real-time weather telemetry and personal style profiles.',
            technologies: ['Java', 'AI', 'Weather API', 'JavaFX'],
            github_url: 'https://github.com/tony-tech-web/VirtualStylist',
            language: 'Java',
            stars: 12,
            forks: 3,
            accent: '#3b82f6'
        },
        {
            id: 2,
            title: 'Nexus - Product Order Manager',
            description: 'Enterprise-grade supply chain solution managing inventory lifecycle with high-concurrency Node.js architecture.',
            technologies: ['TypeScript', 'Node.js', 'React', 'PostgreSQL'],
            github_url: 'https://github.com/tony-tech-web/Nexus',
            language: 'TypeScript',
            stars: 8,
            forks: 2,
            accent: '#8b5cf6'
        },
        {
            id: 3,
            title: 'Dropshop E-commerce Website',
            description: 'Modern storefront architecture focusing on core web vitals, featuring a custom React-based shopping cart and payment orchestration.',
            technologies: ['React', 'Node.js', 'MongoDB', 'Tailwind'],
            github_url: 'https://github.com/tony-tech-web/Dropshop-website',
            language: 'JavaScript',
            stars: 6,
            forks: 1,
            accent: '#10b981'
        },
        {
            id: 4,
            title: 'Advanced News Engine',
            description: 'Full-stack aggregation platform with real-time content delivery, featuring a robust article management system and SEO-optimized rendering.',
            technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
            github_url: 'https://github.com/tony-tech-web/advanced-news-website',
            language: 'JavaScript',
            stars: 7,
            forks: 3,
            accent: '#f59e0b'
        },
        {
            id: 5,
            title: 'Architecture Portfolio',
            description: 'High-end developer identity showcase (this project) built with absolute focus on motion design and layout excellence.',
            technologies: ['React', 'Framer Motion', 'Tailwind', 'Three.js'],
            github_url: 'https://github.com/Tony-tech-web/MyPortfolio',
            language: 'TypeScript',
            stars: 7,
            forks: 2,
            accent: '#ef4444'
        }
    ];

    return (
        <section id="projects" className="section-padding bg-background relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-glass-border to-transparent" />
            
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div className="max-w-2xl">
                        <motion.span 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-accent-blue font-mono text-xs tracking-widest uppercase mb-4 block"
                        >
                            Selected Works
                        </motion.span>
                        <motion.h2 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="text-4xl md:text-6xl font-bold tracking-tight"
                        >
                            Engineering <span className="gradient-heading">Digital Products</span>
                        </motion.h2>
                    </div>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-text-muted max-w-sm text-sm leading-relaxed"
                    >
                        A curation of projects defining my technical range across full-stack engineering and visual design.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: index % 2 * 0.2 }}
                            className="group relative"
                        >
                            <div className="relative z-10 glass-surface rounded-3xl p-8 md:p-12 h-full flex flex-col hover:border-white/20 transition-all duration-500 overflow-hidden">
                                {/* Glow Effect */}
                                <div 
                                    className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full blur-[100px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
                                    style={{ backgroundColor: project.accent }}
                                />

                                <div className="flex justify-between items-start mb-10">
                                    <div className="p-3 rounded-2xl bg-white/5 border border-white/5 group-hover:border-white/10 transition-colors">
                                        <Code size={24} className="text-foreground" />
                                    </div>
                                    <div className="flex gap-4">
                                        {project.github_url && (
                                            <a 
                                                href={project.github_url} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-text-muted hover:text-foreground transition-colors"
                                            >
                                                <Github size={20} />
                                            </a>
                                        )}
                                        <ExternalLink size={20} className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-foreground" />
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold mb-4 tracking-tight group-hover:text-accent-blue transition-colors duration-300">
                                    {project.title}
                                </h3>
                                <p className="text-text-muted mb-8 line-clamp-3 leading-relaxed">
                                    {project.description}
                                </p>

                                <div className="mt-auto pt-8 border-t border-white/5 flex flex-wrap gap-2 mb-8">
                                    {project.technologies.slice(0, 4).map(tech => (
                                        <span key={tech} className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-mono tracking-wider text-text-muted uppercase">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between text-xs font-mono tracking-widest uppercase">
                                    <div className="flex items-center gap-4 text-text-muted">
                                        <span className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                                            <Star size={12} className="text-yellow-500" />
                                            {project.stars}
                                        </span>
                                        <span className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                                            <GitBranch size={12} />
                                            {project.forks}
                                        </span>
                                    </div>
                                    <span className="text-accent-blue/60">{project.language}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-24 text-center"
                >
                    <a 
                        href="https://github.com/tony-tech-web" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-full glass-surface border-white/5 hover:border-white/20 hover:bg-white/5 transition-all duration-300 group"
                    >
                        <Github size={20} />
                        <span className="font-semibold tracking-tight">View Full Archive</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </motion.div>
            </div>
            
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-glass-border to-transparent" />
        </section>
    );
};

const ArrowRight = ({ size, className }) => (
    <svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
    </svg>
);

export default Projects;