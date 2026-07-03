import React from 'react';
import { motion } from 'framer-motion';

const Timeline = () => {
    const events = [
        {
            year: "2024",
            title: "Engineering Portfolio V2.1",
            desc: "Architected a fully decoupled, dynamic portfolio driven entirely by live GitHub and Blogger APIs. Implemented advanced framer-motion UI mechanics."
        },
        {
            year: "2023",
            title: "Project Orbit",
            desc: "Engineered an AI-powered study and planning system. Built the full-stack architecture mapping logic to optimized schedules."
        },
        {
            year: "2022",
            title: "Foundation & Academics",
            desc: "Began deep-dive into software engineering principles, algorithms, and system design concepts. Built core fundamentals."
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
                                <h3 className="text-xl font-bold mb-2 text-white">{event.title}</h3>
                                <p className="text-sm font-light text-text-muted leading-relaxed max-w-xl">
                                    {event.desc}
                                </p>
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
