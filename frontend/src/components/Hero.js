import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Command } from 'lucide-react';

const Hero = () => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    const words = useMemo(
        () => ["Software Engineer", "Systems Architect", "Java Specialist", "UI/UX Artisan"],
        []
    );

    useEffect(() => {
        const currentWord = words[currentWordIndex];
        let delay = isDeleting ? 30 : 60;

        if (!isDeleting && currentText === currentWord) {
            delay = 3000;
        } else if (isDeleting && currentText === '') {
            setIsDeleting(false);
            setCurrentWordIndex((idx) => (idx + 1) % words.length);
            delay = 500;
        }

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                setCurrentText(currentWord.substring(0, currentText.length + 1));
                if (currentText === currentWord) setIsDeleting(true);
            } else {
                setCurrentText(currentWord.substring(0, currentText.length - 1));
            }
        }, delay);

        return () => clearTimeout(timeout);
    }, [currentText, isDeleting, currentWordIndex, words]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Tech Glows */}
            <div className="tech-glow top-[-200px] left-[-200px]" />
            <div className="tech-glow bottom-[-200px] right-[-200px]" style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%)' }} />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-4xl mx-auto"
                >
                    {/* Status Bar */}
                    <motion.div 
                        variants={itemVariants}
                        className="flex items-center gap-4 mb-8 border-l-2 border-accent-primary pl-6"
                    >
                        <div className="flex flex-col">
                            <span className="terminal-label">System Status</span>
                            <span className="text-xs font-mono text-zinc-500">v2.0 // STABLE // PRODUCTION_READY</span>
                        </div>
                        <div className="h-8 w-px bg-white/5 mx-2" />
                        <div className="flex flex-col">
                            <span className="terminal-label">Last Upload</span>
                            <span className="text-xs font-mono text-zinc-500">2024.02.09.1934</span>
                        </div>
                    </motion.div>

                    {/* Main Identity */}
                    <div className="mb-12">
                        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4">
                            <span className="w-12 h-px bg-zinc-800" />
                            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Engineering Registry</span>
                        </motion.div>
                        
                        <motion.h1 
                            variants={itemVariants}
                            className="text-5xl md:text-8xl font-bold tracking-tighter mb-6 leading-[0.85]"
                        >
                            ALIDU <br />
                            <span className="text-accent-primary">ANTHONY.</span>
                        </motion.h1>

                        <motion.div variants={itemVariants} className="flex items-center gap-4 py-2 border-y border-white/5 mb-6">
                            <span className="terminal-label text-[12px]">{currentText}</span>
                            <div className="w-2 h-4 bg-accent-primary animate-pulse" />
                        </motion.div>

                        <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-8">
                            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-zinc-300">
                                AI-integrated systems
                            </span>
                            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-zinc-300">
                                Scalable backend design
                            </span>
                            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-zinc-300">
                                React + Node production apps
                            </span>
                        </motion.div>
                    </div>

                    {/* Descriptive Text & CTAs */}
                    <div className="flex flex-col md:flex-row items-end justify-between gap-12">
                        <motion.p 
                            variants={itemVariants}
                            className="max-w-md text-lg text-text-muted font-light leading-relaxed"
                        >
                            Full-stack / AI Software Engineer architecting high-performance digital systems where technical precision meets high-end minimalism. 
                        </motion.p>

                        <motion.div 
                            variants={itemVariants}
                            className="flex items-center gap-4"
                        >
                            <a href="#projects" className="btn-primary group h-12">
                                <Command size={14} />
                                View Work
                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                            
                            <a href="#contact" className="btn-outline h-12">
                                Start Session
                            </a>
                            
                            <a 
                                href={(process.env.PUBLIC_URL || '') + '/Alidu%20Anthony%20-%20Curriculum%20Vitae.pdf'}
                                download
                                className="w-12 h-12 terminal-panel flex items-center justify-center hover:bg-white/5 transition-all group"
                                title="Download Dossier"
                            >
                                <Download size={18} className="group-hover:-translate-y-0.5 transition-transform" />
                            </a>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Terminal Decorations */}
            <div className="absolute top-1/2 right-10 -translate-y-1/2 hidden xl:flex flex-col gap-8 opacity-20 pointer-events-none">
                <div className="flex flex-col items-end">
                    <span className="terminal-label">Core_Temp</span>
                    <span className="font-mono text-[10px]">32.4°C</span>
                </div>
                <div className="flex flex-col items-end">
                    <span className="terminal-label">Uptime</span>
                    <span className="font-mono text-[10px]">99.9%</span>
                </div>
                <div className="flex flex-col items-end">
                    <span className="terminal-label">Thread_Load</span>
                    <span className="font-mono text-[10px] text-accent-primary">OPTIMAL</span>
                </div>
            </div>

            {/* Bottom Coordinates */}
            <div className="absolute bottom-10 left-10 hidden md:block">
                <span className="text-[10px] font-mono opacity-20 uppercase tracking-[0.5em]">
                    LAT: 9.0765° N // LONG: 7.3986° E
                </span>
            </div>
        </section>
    );
};

export default Hero;