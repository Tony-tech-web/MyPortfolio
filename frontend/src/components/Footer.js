import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Mail, Instagram, ArrowUp } from 'lucide-react';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const socialLinks = [
        { icon: <Github size={16} />, href: 'https://github.com/tony-tech-web', label: 'GitHub' },
        { icon: <Twitter size={16} />, href: 'https://x.com/AliduTony', label: 'Twitter' },
        { icon: <Mail size={16} />, href: 'mailto:tonyalidu@gmail.com', label: 'Email' },
        { icon: <Instagram size={16} />, href: 'https://www.instagram.com/immnot_tony/', label: 'Instagram' }
    ];

    return (
        <footer className="relative py-20 bg-background border-t border-white/5 overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start gap-20">
                    
                    <div className="flex flex-col items-start group max-w-sm">
                        <motion.a 
                            href="#home"
                            className="flex items-center gap-4 mb-8"
                        >
                            <div className="w-12 h-12 border border-white/10 overflow-hidden flex items-center justify-center grayscale group-hover:grayscale-0 transition-all">
                                <img src="/logo.png" alt="Logo" className="w-full h-full object-cover scale-150" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-bold tracking-tighter uppercase italic">Anthony.</span>
                                <span className="terminal-label text-[8px] text-accent-primary font-bold tracking-widest uppercase">AUTH :: SYSTEM_END</span>
                            </div>
                        </motion.a>
                        <p className="text-text-muted text-sm font-light leading-relaxed mb-8">
                            Architecting high-performance digital systems for the next era of technical excellence.
                        </p>
                        <div className="flex gap-6">
                            {socialLinks.map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-zinc-500 hover:text-accent-primary transition-colors duration-300"
                                    title={social.label}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    <div className="grid grid-cols-2 gap-20">
                        <div className="flex flex-col gap-4">
                            <span className="terminal-label text-zinc-600 mb-2">Navigation</span>
                            <a href="#about" className="text-xs font-mono text-zinc-400 hover:text-fg transition-colors">About_Me</a>
                            <a href="#skills" className="text-xs font-mono text-zinc-400 hover:text-fg transition-colors">Technical_Stack</a>
                            <a href="#projects" className="text-xs font-mono text-zinc-400 hover:text-fg transition-colors">Case_Studies</a>
                        </div>
                        <div className="flex flex-col gap-4">
                            <span className="terminal-label text-zinc-600 mb-2">Connect</span>
                            <a href="#blog" className="text-xs font-mono text-zinc-400 hover:text-fg transition-colors">System_Updates</a>
                            <a href="#contact" className="text-xs font-mono text-zinc-400 hover:text-fg transition-colors">Uplink_Channel</a>
                            <button onClick={scrollToTop} className="text-xs font-mono text-accent-primary hover:text-fg transition-colors flex items-center gap-2">
                                <ArrowUp size={12} /> Return_Home
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col md:flex-row items-center gap-4 text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-600">
                        <span>© {new Date().getFullYear()} Alidu Anthony</span>
                        <span className="hidden md:block opacity-20">{"//"}</span>
                        <span>Designed_for_Performance</span>
                    </div>
                    
                    <div className="flex items-center gap-6 text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-600">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
                            <span>System_Online</span>
                        </div>
                        <span className="opacity-20">{"//"}</span>
                        <span>V2.0.42</span>
                    </div>
                </div>
            </div>

            {/* Background Texture Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none" />
        </footer>
    );
};

export default Footer;