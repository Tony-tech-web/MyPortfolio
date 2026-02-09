import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Terminal, Star, GitBranch, Code } from 'lucide-react';

const Projects = () => {
    const projects = [
        {
            id: 'PROJ-01',
            title: 'Virtual Stylist',
            description: 'JavaFX engine leveraging telemetry and computer vision models to curate high-end style profiles.',
            metrics: { stars: 12, forks: 3, language: 'Java' },
            url: 'https://github.com/tony-tech-web/VirtualStylist',
            tags: ['Java', 'AI', 'OpenCV']
        },
        {
            id: 'PROJ-02',
            title: 'Nexus Core',
            description: 'Enterprise resource orchestrator with high-concurrency Node.js architecture for supply chain logistics.',
            metrics: { stars: 8, forks: 2, language: 'TypeScript' },
            url: 'https://github.com/tony-tech-web/Nexus',
            tags: ['Node.js', 'PostgreSQL', 'Auth']
        },
        {
            id: 'PROJ-03',
            title: 'Dropshop Architecture',
            description: 'High-performance e-commerce storefront optimized for core web vitals and instantaneous state reconciliation.',
            metrics: { stars: 6, forks: 1, language: 'React' },
            url: 'https://github.com/tony-tech-web/Dropshop-website',
            tags: ['React', 'MongoDB', 'Edge']
        },
        {
            id: 'PROJ-04',
            title: 'News Aggregation Engine',
            description: 'Real-time content delivery network featuring robust article management and technical SEO orchestration.',
            metrics: { stars: 7, forks: 3, language: 'JavaScript' },
            url: 'https://github.com/tony-tech-web/advanced-news-website',
            tags: ['Express', 'NodeJS', 'SEO']
        }
    ];

    return (
        <section id="projects" className="section-padding bg-background relative border-y border-white/5">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-12">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-px bg-accent-primary" />
                            <span className="terminal-label">Case Studies</span>
                        </div>
                        <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-8 leading-[0.9]">
                            Engineering <br />
                            <span className="text-accent-primary">Digital Products.</span>
                        </h2>
                    </div>
                    <p className="text-text-muted max-w-sm text-lg font-light leading-relaxed">
                        A verification of technical breadth across full-stack orchestration and system reliability.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-12">
                    {projects.map((project, i) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="group relative flex flex-col lg:flex-row rounded-[2rem] overflow-hidden border border-white/5 bg-white/[0.02] hover:border-accent-primary/20 transition-all duration-700 hover:shadow-[0_0_80px_rgba(0,0,0,0.4)]"
                        >
                            {/* Narrative Pane - Left Side */}
                            <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col bg-white/[0.02]">
                                <div className="flex items-center gap-4 mb-10">
                                    <span className="terminal-label text-zinc-600 text-[10px] tracking-[0.2em]">{project.id}</span>
                                    <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                                </div>

                                <motion.h3 
                                    className="text-4xl md:text-5xl font-bold tracking-tighter mb-8 leading-none"
                                >
                                    {project.title}
                                </motion.h3>
                                
                                <p className="text-text-muted text-lg font-light leading-relaxed mb-10 max-w-2xl">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-3 mb-12">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="px-4 py-1.5 bg-black/40 border border-white/5 rounded-full text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-auto pt-8 border-t border-white/5">
                                    <a 
                                        href={project.url}
                                        className="inline-flex items-center gap-2 text-[11px] font-mono text-zinc-500 hover:text-accent-primary transition-colors group/link"
                                    >
                                        <span className="border-b border-zinc-800 group-hover/link:border-accent-primary transition-colors pb-0.5">Read more_</span>
                                        <ExternalLink size={12} className="opacity-0 group-hover/link:opacity-100 transition-all" />
                                    </a>
                                </div>
                            </div>

                            {/* Technical Pane - Right Side */}
                            <div className="w-full lg:w-[380px] p-8 md:p-12 bg-black/40 flex flex-col justify-between border-l border-white/5 relative">
                                {/* Orange Accent Detail */}
                                <div className="absolute top-0 right-0 w-24 h-px bg-gradient-to-l from-accent-primary/40 to-transparent" />
                                <div className="absolute top-0 right-0 h-24 w-px bg-gradient-to-b from-accent-primary/40 to-transparent" />

                                <div className="flex justify-between items-start mb-16">
                                    <div className="p-4 terminal-panel rounded-2xl bg-white/[0.02]">
                                        <Terminal size={24} className="text-zinc-600 group-hover:text-accent-primary transition-colors duration-500" />
                                    </div>
                                    <div className="flex gap-4">
                                        <a 
                                            href={project.url} 
                                            className="p-3 rounded-full bg-white/5 hover:bg-accent-primary hover:text-black transition-all duration-500"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Github size={18} />
                                        </a>
                                        <a 
                                            href={project.url}
                                            className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-500"
                                        >
                                            <ExternalLink size={18} />
                                        </a>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 group/metric">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Star size={14} className="text-accent-primary group-hover/metric:animate-pulse" />
                                                <span className="text-[20px] font-bold text-white leading-none">{project.metrics.stars}</span>
                                            </div>
                                            <span className="terminal-label text-[9px] text-zinc-600 uppercase">stars</span>
                                        </div>
                                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 group/metric">
                                            <div className="flex items-center gap-2 mb-2">
                                                <GitBranch size={14} className="text-zinc-400 group-hover/metric:rotate-45 transition-transform" />
                                                <span className="text-[20px] font-bold text-white leading-none">{project.metrics.forks}</span>
                                            </div>
                                            <span className="terminal-label text-[9px] text-zinc-600 uppercase">forks</span>
                                        </div>
                                    </div>

                                    <div className="p-6 rounded-2xl bg-accent-primary/[0.03] border border-accent-primary/10">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Code size={16} className="text-accent-primary" />
                                                <span className="text-sm font-medium tracking-tight text-zinc-300">Stack_Lead</span>
                                            </div>
                                            <span className="terminal-label text-[10px] text-accent-primary">{project.metrics.language}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 flex justify-center">
                    <a 
                        href="https://github.com/tony-tech-web" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-outline group"
                    >
                        <Terminal size={14} className="group-hover:text-accent-primary" />
                        Access Repository Archive
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Projects;