import React from 'react';
import { motion } from 'framer-motion';
import { Server, Database, BrainCircuit, Layout, ArrowRight, Code2 } from 'lucide-react';

const OrbitCaseStudy = () => {
    const modules = [
        {
            title: "Study Assistant",
            icon: <BrainCircuit size={18} className="text-accent-primary" />,
            desc: "AI-driven logic mapping user inputs to optimized study schedules."
        },
        {
            title: "Planner Engine",
            icon: <Server size={18} className="text-accent-primary" />,
            desc: "State synchronization ensuring real-time cross-device updates."
        },
        {
            title: "Notes System",
            icon: <Database size={18} className="text-accent-primary" />,
            desc: "Structured data storage optimized for rapid retrieval and indexing."
        },
        {
            title: "Interface Layer",
            icon: <Layout size={18} className="text-accent-primary" />,
            desc: "React-powered declarative UI with seamless Framer Motion transitions."
        }
    ];

    return (
        <section id="orbit" className="section-padding bg-background relative">
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16">
                    
                    {/* Narrative & Architecture */}
                    <div className="w-full lg:w-1/2">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-8 h-px bg-accent-primary" />
                            <span className="terminal-label">System_Case_Study</span>
                        </div>
                        
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 uppercase italic">
                            Project <span className="text-accent-primary">Orbit.</span>
                        </h2>
                        
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl font-bold mb-3 border-b border-white/10 pb-2">1. Overview</h3>
                                <p className="text-text-muted font-light leading-relaxed">
                                    Orbit was engineered to solve the friction in academic planning. Instead of a manual checklist, it acts as an intelligent system that ingests syllabus data, models a study timeline, and adapts to user velocity.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold mb-3 border-b border-white/10 pb-2">2. Architecture & Data Flow</h3>
                                <p className="text-text-muted font-light leading-relaxed mb-4">
                                    The system decouples the presentation layer from the heavy processing logic, utilizing an API-driven architecture.
                                </p>
                                <div className="p-4 terminal-panel font-mono text-xs text-zinc-400 leading-loose">
                                    <span className="text-accent-primary">User</span> → <span className="text-blue-400">React UI</span> → <span className="text-emerald-400">REST API</span> → <span className="text-purple-400">AI Service</span><br/>
                                    <span className="text-purple-400">AI Service</span> → <span className="text-emerald-400">PostgreSQL DB</span> → <span className="text-accent-primary">JSON Payload</span> → <span className="text-blue-400">UI State</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Modules & Engineering Decisions */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-8">
                        
                        {/* Key Modules Grid */}
                        <div className="terminal-panel p-8">
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <Code2 size={16} className="text-accent-primary" />
                                3. Key Modules
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {modules.map((mod, idx) => (
                                    <motion.div 
                                        key={idx}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="p-4 border border-white/5 bg-white/5 rounded-xl hover:border-accent-primary/30 transition-colors"
                                    >
                                        <div className="mb-3">{mod.icon}</div>
                                        <h4 className="font-bold text-sm mb-2">{mod.title}</h4>
                                        <p className="text-xs text-zinc-500 font-mono">{mod.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Engineering Decisions */}
                        <div className="terminal-panel p-8 border-l-2 border-accent-primary">
                            <h3 className="text-lg font-bold mb-4">4. Engineering Decisions</h3>
                            <ul className="space-y-4">
                                <li className="text-sm text-text-muted">
                                    <strong className="text-white block mb-1">Database Selection (PostgreSQL):</strong> 
                                    Chosen over NoSQL for strict schema validation on user schedules and relational integrity between notes and subjects.
                                </li>
                                <li className="text-sm text-text-muted">
                                    <strong className="text-white block mb-1">State Management:</strong> 
                                    Implemented granular React state to prevent full-tree re-renders during high-frequency AI chat updates.
                                </li>
                                <li className="text-sm text-text-muted">
                                    <strong className="text-white block mb-1">Theoretical Scaling:</strong> 
                                    Designed with decoupled services to allow future integration of Redis caching for high-volume syllabus queries.
                                </li>
                            </ul>
                            
                            <a href="https://github.com/tony-tech-web" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-mono text-accent-primary hover:text-white transition-colors mt-6 uppercase tracking-widest">
                                View Repository <ArrowRight size={12} />
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default OrbitCaseStudy;
