import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Code2, Database, Layout, Server, BrainCircuit, Activity } from 'lucide-react';

const CASE_STUDIES = [
    {
        id: "proj-01",
        name: "VirtualStylist Core",
        type: "case-study",
        problem: "Users needed a highly scalable way to map digital wardrobes to localized weather patterns in real-time.",
        solution: "Engineered a decoupled backend system that ingests weather APIs and computes combinatorial clothing logic.",
        stack: ["Java", "Spring Boot", "React", "PostgreSQL"],
        architecture: {
            frontend: "React with declarative state and custom hooks.",
            backend: "Java Spring Boot MVC architecture.",
            database: "PostgreSQL for relational clothing constraints.",
            ai: "Algorithmic weather-matching engine (rules-based)."
        },
        impact: "Reduced outfit generation latency by 40% and established a strict relational schema.",
        github: "https://github.com/tony-tech-web/VirtualStylist",
        demo: "#"
    },
    {
        id: "proj-02",
        name: "Advanced News System",
        type: "case-study",
        problem: "Content aggregators suffered from blocking IO and slow client-side rendering under heavy payload.",
        solution: "Built a fully SSR-capable aggregation engine that pre-fetches and caches global news nodes.",
        stack: ["Node.js", "Express", "JavaScript", "Redis"],
        architecture: {
            frontend: "Vanilla JavaScript with imperative DOM manipulation.",
            backend: "Node.js/Express non-blocking event loop.",
            database: "MongoDB for flexible document storage.",
            ai: "N/A"
        },
        impact: "Achieved near-instant payload delivery utilizing Edge-caching principles.",
        github: "https://github.com/tony-tech-web/advanced-news-website",
        demo: "#"
    },
    {
        id: "proj-03",
        name: "Dropshop E-Commerce",
        type: "case-study",
        problem: "Monolithic e-commerce platforms were too rigid for rapid feature iteration and complex state changes.",
        solution: "Architected a headless commerce frontend with strict component boundaries and Redux-like state.",
        stack: ["React", "Tailwind CSS", "Supabase", "Stripe"],
        architecture: {
            frontend: "React component trees optimized for minimal re-renders.",
            backend: "Supabase BaaS endpoints.",
            database: "Postgres (via Supabase) with Row Level Security.",
            ai: "N/A"
        },
        impact: "Streamlined the checkout state machine, preventing dropped cart sessions.",
        github: "https://github.com/tony-tech-web/Dropshop-website",
        demo: "#"
    }
];



const Projects = () => {
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="projects" className="section-padding bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-accent-primary" />
              <span className="terminal-label">Case_Studies</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[0.9]">
              Engineering <br />
              <span className="text-accent-primary">Digital Products.</span>
            </h2>
          </div>
          <p className="text-text-muted max-w-xs text-base font-light leading-relaxed">
            Deep dive into architectural logic, stack choices, and engineering outcomes.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 min-h-[600px] relative">
          
          {/* Left Side: Vertical List of Cards */}
          <div className={`flex flex-col gap-4 transition-all duration-500 ease-in-out ${selectedRepo && !isMobile ? 'lg:w-1/3' : 'w-full lg:w-1/2'}`}>
            {CASE_STUDIES.map((repo, i) => {
                const isSelected = selectedRepo?.id === repo.id;
                
                return (
                  <motion.div
                    key={repo.id}
                    layout="position"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    onClick={() => {
                        if (isSelected && isMobile) setSelectedRepo(null);
                        else setSelectedRepo(repo);
                    }}
                    className={`relative p-6 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                      isSelected 
                        ? 'border-accent-primary bg-accent-primary/5 shadow-[0_0_30px_rgba(255,85,0,0.1)] scale-[1.02] z-10' 
                        : 'border-white/5 bg-zinc-950/50 hover:bg-white/[0.02] hover:border-white/20'
                    }`}
                  >
                    {isSelected && (
                        <motion.div 
                            layoutId="active-project-highlight"
                            className="absolute left-0 top-0 bottom-0 w-1 bg-accent-primary shadow-[0_0_15px_rgba(255,85,0,0.8)]"
                        />
                    )}
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                                <span className={`terminal-label text-[9px] tracking-[0.2em] ${isSelected ? 'text-accent-primary' : 'text-zinc-600'}`}>
                                    {repo.id.toUpperCase()}
                                </span>
                            </div>
                            <h3 className={`font-bold tracking-tight truncate transition-colors duration-300 ${isSelected ? 'text-white text-xl' : 'text-zinc-300 text-lg'}`}>
                                {repo.name}
                            </h3>
                            <div className="flex flex-wrap gap-2 mt-4">
                                {repo.stack.slice(0,3).map(s => (
                                    <span key={s} className="px-2 py-0.5 bg-white/5 rounded text-[9px] font-mono text-zinc-400">
                                        {s}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                  </motion.div>
                );
              })}
          </div>

          {/* Right Side: Bubble Info Expansion */}
          <AnimatePresence mode="wait">
            {selectedRepo && (
                <motion.div
                    key={selectedRepo.id}
                    initial={{ opacity: 0, scale: 0.95, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95, x: 20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className={`fixed inset-4 z-50 lg:static lg:inset-auto lg:z-auto ${isMobile ? 'flex items-center justify-center' : 'flex-1 lg:w-2/3 lg:block'}`}
                >
                    {/* Mobile Backdrop */}
                    {isMobile && (
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-background/90 backdrop-blur-sm -z-10"
                            onClick={() => setSelectedRepo(null)}
                        />
                    )}

                    <div className="w-full h-full lg:h-auto max-h-[85vh] lg:max-h-none overflow-hidden flex flex-col bg-zinc-950/90 backdrop-blur-2xl border border-accent-primary/20 rounded-[32px] shadow-2xl lg:sticky lg:top-32 relative">
                        {/* Header */}
                        <div className="p-8 border-b border-white/5 bg-white/[0.01] flex justify-between items-start gap-4">
                            <div>
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">
                                    {selectedRepo.name}
                                </h3>
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {selectedRepo.stack.map(s => (
                                        <span key={s} className="px-2 py-1 bg-accent-primary/10 text-accent-primary rounded-md text-[10px] font-mono uppercase tracking-widest border border-accent-primary/20">
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-2 shrink-0">
                                <a href={selectedRepo.github} target="_blank" rel="noopener noreferrer" className="p-3 border border-white/5 hover:border-accent-primary/40 hover:text-accent-primary hover:bg-accent-primary/10 transition-all rounded-xl">
                                    <Github size={18} />
                                </a>
                                {selectedRepo.demo !== "#" && (
                                    <a href={selectedRepo.demo} target="_blank" rel="noopener noreferrer" className="p-3 border border-white/5 hover:border-accent-primary/40 hover:text-accent-primary hover:bg-accent-primary/10 transition-all rounded-xl">
                                        <ExternalLink size={18} />
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Body (Case Study Template) */}
                        <div className="p-8 overflow-y-auto custom-scrollbar flex-1 lg:max-h-[600px] relative space-y-10">
                            
                            {/* Decorative Grid */}
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none" />

                            <div className="relative z-10">
                                <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <Activity size={14} className="text-accent-primary"/> Problem Statement
                                </h4>
                                <p className="text-zinc-300 text-sm md:text-base leading-relaxed border-l-2 border-white/10 pl-4">
                                    {selectedRepo.problem}
                                </p>
                            </div>

                            <div className="relative z-10">
                                <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <Code2 size={14} className="text-accent-primary"/> Solution
                                </h4>
                                <p className="text-zinc-300 text-sm md:text-base leading-relaxed border-l-2 border-white/10 pl-4">
                                    {selectedRepo.solution}
                                </p>
                            </div>

                            <div className="relative z-10">
                                <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <Server size={14} className="text-accent-primary"/> Architecture
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Layout size={12} className="text-blue-400"/>
                                            <span className="text-[10px] font-mono text-zinc-400">FRONTEND</span>
                                        </div>
                                        <p className="text-xs text-zinc-300">{selectedRepo.architecture.frontend}</p>
                                    </div>
                                    <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Server size={12} className="text-emerald-400"/>
                                            <span className="text-[10px] font-mono text-zinc-400">BACKEND</span>
                                        </div>
                                        <p className="text-xs text-zinc-300">{selectedRepo.architecture.backend}</p>
                                    </div>
                                    <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Database size={12} className="text-rose-400"/>
                                            <span className="text-[10px] font-mono text-zinc-400">DATABASE</span>
                                        </div>
                                        <p className="text-xs text-zinc-300">{selectedRepo.architecture.database}</p>
                                    </div>
                                    {selectedRepo.architecture.ai !== "N/A" && (
                                        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                                            <div className="flex items-center gap-2 mb-2">
                                                <BrainCircuit size={12} className="text-purple-400"/>
                                                <span className="text-[10px] font-mono text-zinc-400">AI LAYER</span>
                                            </div>
                                            <p className="text-xs text-zinc-300">{selectedRepo.architecture.ai}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="relative z-10 border-t border-white/5 pt-8">
                                <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3">Outcome / Impact</h4>
                                <div className="p-4 border-l-2 border-accent-primary bg-accent-primary/5 text-accent-primary/90 text-sm leading-relaxed">
                                    {selectedRepo.impact}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
};

export default Projects;