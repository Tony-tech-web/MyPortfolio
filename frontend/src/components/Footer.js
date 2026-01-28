import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Mail, Instagram, ArrowUp } from 'lucide-react';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const socialLinks = [
        { icon: <Github size={20} />, href: 'https://github.com/tony-tech-web', label: 'GitHub' },
        { icon: <Twitter size={20} />, href: 'https://x.com/AliduTony', label: 'Twitter' },
        { icon: <Mail size={20} />, href: 'mailto:tonyalidu@gmail.com', label: 'Email' },
        { icon: <Instagram size={20} />, href: 'https://www.instagram.com/immnot_tony/', label: 'Instagram' }
    ];

    return (
        <footer className="relative py-20 bg-background overflow-hidden border-t border-white/5">
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                    
                    <div className="flex flex-col items-center md:items-start group">
                        <motion.a 
                            href="#home"
                            className="flex items-center gap-3 mb-4"
                        >
                            <div className="w-16 h-16 glass-surface rounded-full flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:border-accent-blue/30 group-hover:shadow-[0_0_25px_rgba(59,130,246,0.2)] border border-white/10">
                                <img src="/logo.png" alt="Logo" className="w-full h-full object-cover scale-[1.3] transition-transform duration-500 group-hover:scale-[1.4]" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold tracking-tighter text-foreground group-hover:text-accent-blue transition-colors">ANTHONY</span>
                                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-text-muted opacity-50">Main Office</span>
                            </div>
                        </motion.a>
                        <p className="text-text-muted text-sm font-mono tracking-widest uppercase opacity-50">
                            Digital Craftsman / Engineer
                        </p>
                    </div>

                    {/* Navigation */}
                    <nav className="flex flex-wrap justify-center gap-8 text-xs font-mono tracking-[0.2em] uppercase text-text-muted">
                        <a href="#about" className="hover:text-foreground transition-colors">About</a>
                        <a href="#skills" className="hover:text-foreground transition-colors">Skills</a>
                        <a href="#projects" className="hover:text-foreground transition-colors">Projects</a>
                        <a href="#blog" className="hover:text-foreground transition-colors">Blog</a>
                        <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
                    </nav>

                    {/* Socials & Scroll */}
                    <div className="flex items-center gap-6">
                        <div className="flex gap-4">
                            {socialLinks.map((social, i) => (
                                <motion.a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    whileHover={{ y: -3, scale: 1.1 }}
                                    className="p-3 rounded-full glass-surface text-text-muted hover:text-accent-blue transition-colors"
                                    title={social.label}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                        
                        <motion.button
                            onClick={scrollToTop}
                            whileHover={{ y: -5 }}
                            className="p-4 rounded-full bg-foreground text-background hover:bg-accent-blue hover:text-white transition-all duration-300"
                        >
                            <ArrowUp size={20} />
                        </motion.button>
                    </div>
                </div>

                <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-text-muted/40 text-center">
                        © {new Date().getFullYear()} Alidu Anthony. All rights reserved.
                    </p>
                    <div className="flex items-center gap-3 text-[10px] font-mono tracking-[0.3em] uppercase text-text-muted/40">
                        <span>Built with Precision</span>
                        <div className="w-6 h-px bg-current" />
                        <span>V1.0.0</span>
                    </div>
                </div>
            </div>

            {/* Background Texture Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none" />
        </footer>
    );
};

export default Footer;