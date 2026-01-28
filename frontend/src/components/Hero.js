import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Terminal } from 'lucide-react';
import InteractiveBackground from './InteractiveBackground';

const Hero = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Subtle parallax calculation
    const parallaxX = (mousePos.x - window.innerWidth / 2) / 40;
    const parallaxY = (mousePos.y - window.innerHeight / 2) / 40;

    const words = useMemo(
        () => ["Software Engineer", "Frontend Designer", "Java Specialist", "Tech Thinker"],
        []
    );

    useEffect(() => {
        const currentWord = words[currentWordIndex];
        let delay = isDeleting ? 40 : 80;

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
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background Layer */}
            <div className="absolute inset-0 z-0">
                <InteractiveBackground
                    particleCount="auto"
                    primaryColor="var(--accent-blue)"
                    secondaryColor="var(--accent-violet)"
                    mouseGlowIntensity={0.4}
                    showFloatingShapes={false}
                    animationSpeed={0.5}
                />
            </div>
            
            {/* Ambient Background Elements */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent-blue/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent-violet/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    style={{ x: parallaxX, y: parallaxY }}
                    className="max-w-4xl mx-auto text-center"
                >
                    {/* Badge */}
                    <motion.div 
                        variants={itemVariants}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-surface border-white/5 text-xs font-mono tracking-widest text-accent-blue uppercase mb-8"
                    >
                        <Terminal size={12} />
                        <span>Ready to build the future</span>
                    </motion.div>

                    {/* Main Heading */}
                    <motion.h1 
                        variants={itemVariants}
                        className="text-5xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.1]"
                    >
                        Design. <span className="gradient-heading">Code.</span> <br />
                        Deploy <span className="text-accent-blue italic font-serif">Impact.</span>
                    </motion.h1>

                    {/* Subheading / Identity */}
                    <motion.div 
                        variants={itemVariants}
                        className="flex flex-col items-center gap-4 mb-12"
                    >
                        <p className="text-xl md:text-2xl text-text-muted font-medium">
                            I am Alidu Anthony — <span className="text-foreground">{currentText}</span>
                            <span className="cursor ml-1"></span>
                        </p>
                        <p className="max-w-xl text-lg text-text-muted leading-relaxed">
                            Crafting high-performance digital experiences where aesthetics meet technical excellence.
                        </p>
                    </motion.div>

                    {/* CTAs */}
                    <motion.div 
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6"
                    >
                        <a 
                            href="#projects" 
                            className="w-full sm:w-auto px-8 py-4 rounded-full bg-accent-blue text-white font-semibold flex items-center justify-center gap-2 group hover:bg-blue-600 transition-all duration-300 shadow-lg shadow-blue-500/20"
                        >
                            Explore Work
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                        
                        <div className="flex items-center gap-4">
                            <a 
                                href="#contact"
                                className="px-6 py-4 text-sm font-semibold text-foreground hover:text-accent-blue transition-colors"
                            >
                                Let's collaborate
                            </a>
                            <a 
                                href={(process.env.PUBLIC_URL || '') + '/Alidu Anthony - Curriculum Vitae.pdf'}
                                download
                                className="p-3 rounded-full glass-surface hover:bg-white/10 transition-colors group"
                                title="Download CV"
                            >
                                <Download size={20} className="group-hover:-translate-y-0.5 transition-transform" />
                            </a>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase opacity-30">Scroll</span>
                <div className="w-px h-12 bg-gradient-to-b from-accent-blue to-transparent" />
            </motion.div>
        </section>
    );
};

export default Hero;