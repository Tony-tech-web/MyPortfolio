import React from 'react';
import { motion } from 'framer-motion';

const Timeline = () => {
    const events = [
        {
            year: "2024",
            title: "Portfolio API & Dynamic Ecosystem",
            built: "Architected a fully decoupled, dynamic portfolio driven entirely by live GitHub and Blogger APIs with advanced Framer Motion UI mechanics.",
            learned: "Mastered API rate-limiting, complex state synchronization, and building resilient async data pipelines in React."
        },
        {
            year: "2023",
            title: "Project Orbit",
            built: "Engineered an AI-powered study and planning system connecting LLM responses to a structured PostgreSQL database.",
            learned: "Learned deep system design, prompt engineering pipelines, and handling non-deterministic AI outputs in a production environment."
        },
        {
            year: "2022",
            title: "Foundation & Academics",
            built: "Built core algorithmic fundamentals, low-level data structures, and baseline object-oriented applications.",
            learned: "Grasped the importance of time complexity, memory management, and why robust architecture matters before writing code."
        }
    ];

    return (
        <section className="section-padding bg-background relative">
            <div className="container mx-auto px-6 max-w-4xl">
                
                <div className="flex items-center gap-3 mb-16 justify-center">
                    <div className="w-8 h-px bg-accent-primary" />
                    <span className="terminal-label">Execution_Timeline</span>
                    <div className="w-8 h-px bg-accent-primary" />
                </div>

                <div className="relative border-l border-white/10 ml-4 md:ml-0 md:pl-0">
                    {events.map((event, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.15 }}
                            className="mb-12 relative pl-8 md:pl-0"
                        >
                            {/* Node Point */}
                            <div className="absolute left-[-5px] md:left-[-4px] top-1 w-2.5 h-2.5 rounded-full bg-accent-primary shadow-[0_0_10px_rgba(255,85,0,0.5)]" />
                            
                            <div className="md:pl-10">
                                <span className="font-mono text-xs text-accent-primary tracking-widest block mb-2">{event.year}</span>
                                <h3 className="text-xl font-bold mb-4 text-white">{event.title}</h3>
                                <div className="space-y-3">
                                    <div>
                                        <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block mb-1">What I Built</span>
                                        <p className="text-sm font-light text-text-muted leading-relaxed max-w-xl border-l border-white/10 pl-3">
                                            {event.built}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block mb-1 mt-4">What I Learned</span>
                                        <p className="text-sm font-light text-accent-primary/80 leading-relaxed max-w-xl border-l border-accent-primary/30 pl-3">
                                            {event.learned}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    {/* Fading line at bottom */}
                    <div className="absolute bottom-0 left-[-1px] w-[2px] h-32 bg-gradient-to-t from-background to-transparent" />
                </div>

            </div>
        </section>
    );
};

export default Timeline;
