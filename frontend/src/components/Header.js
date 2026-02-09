import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, Terminal } from 'lucide-react';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        
        const storedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(storedTheme);
        document.documentElement.setAttribute('data-theme', storedTheme);
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Blog', href: '#blog' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <header 
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
                isScrolled ? 'py-4' : 'py-8'
            }`}
        >
            <nav className="container mx-auto px-6">
                <div className={`flex items-center justify-between px-8 py-4 transition-all duration-500 border-x border-white/5 ${
                    isScrolled ? 'bg-background/80 backdrop-blur-md border-y' : 'bg-transparent'
                }`}>
                    {/* Brand */}
                    <motion.a 
                        href="#home"
                        className="flex items-center gap-4 group"
                    >
                        <div className="relative w-10 h-10 border border-white/10 overflow-hidden flex items-center justify-center transition-all">
                            <img src="/logo.png" alt="Logo" className="w-full h-full object-cover scale-150" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-bold tracking-tighter uppercase italic">Anthony.</span>
                            <span className="terminal-label text-[8px] text-accent-primary font-bold tracking-widest uppercase">AUTH :: REGISTRY</span>
                        </div>
                    </motion.a>

                    {/* Desktop Command Center */}
                    <div className="hidden md:flex items-center space-x-12">
                        {navLinks.map((link, i) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-[10px] font-mono tracking-[0.2em] uppercase text-zinc-500 hover:text-accent-primary transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent-primary transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        ))}
                    </div>

                    {/* Interface Controls */}
                    <div className="flex items-center space-x-6">
                        <button onClick={toggleTheme} className="text-zinc-500 hover:text-fg transition-colors">
                            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
                        </button>
                        
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-fg">
                            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                        </button>
                        
                        <a href="#contact" className="hidden md:flex items-center gap-2 terminal-label text-fg hover:text-accent-primary transition-colors">
                            <Terminal size={12} />
                            Init_Session
                        </a>
                    </div>
                </div>

                {/* Mobile Comms Overlay */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="fixed inset-y-0 right-0 w-full max-w-sm bg-background border-l border-white/5 z-[110] p-12 flex flex-col justify-center"
                        >
                            <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-12 right-12 text-zinc-500">
                                <X size={24} />
                            </button>
                            
                            <div className="space-y-12">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block text-5xl font-bold tracking-tighter hover:text-accent-primary transition-colors"
                                    >
                                        {link.name}.
                                    </a>
                                ))}
                            </div>

                            <div className="mt-20 pt-12 border-t border-white/5">
                                <span className="terminal-label block mb-6">Active_Nodes</span>
                                <div className="flex gap-8 text-zinc-500 text-xs font-mono">
                                    <a href="https://github.com/tony-tech-web" target="_blank" rel="noreferrer" className="hover:text-fg transition-colors">GH</a>
                                    <a href="https://x.com/AliduTony" target="_blank" rel="noreferrer" className="hover:text-fg transition-colors">TW</a>
                                    <a href="https://www.instagram.com/immnot_tony/" target="_blank" rel="noreferrer" className="hover:text-fg transition-colors">IG</a>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    );
};

export default Header;