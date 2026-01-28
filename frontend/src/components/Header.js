import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, Github, Instagram, Mail, Twitter, MessageCircle } from 'lucide-react';

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

    const menuVariants = {
        closed: { opacity: 0, scale: 0.95, y: -20 },
        open: { opacity: 1, scale: 1, y: 0 }
    };

    return (
        <header 
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
                isScrolled ? 'py-4' : 'py-8'
            }`}
        >
            <nav className="container mx-auto px-6">
                <div className={`relative flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 ${
                    isScrolled ? 'glass-surface shadow-2xl' : 'bg-transparent'
                }`}>
                    {/* Logo */}
                    <motion.a 
                        href="#home"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xl font-bold tracking-tighter flex items-center gap-1 group"
                    >
                        <span className="text-foreground transition-colors duration-300 group-hover:text-accent-blue">ANTHONY</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse"></span>
                    </motion.a>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link, i) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="text-sm font-medium text-text-muted hover:text-foreground transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-blue transition-all duration-300 group-hover:w-full"></span>
                            </motion.a>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-3">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={toggleTheme}
                            className="p-2 rounded-full glass-surface hover:bg-white/10 text-foreground transition-colors"
                        >
                            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                        </motion.button>
                        
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 rounded-full glass-surface text-foreground"
                        >
                            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                        </motion.button>

                        <motion.a
                            href="#contact"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="hidden md:flex items-center justify-center px-5 py-2 rounded-full bg-foreground text-background text-sm font-semibold hover:bg-accent-blue hover:text-white transition-all duration-300"
                        >
                            Let's Talk
                        </motion.a>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={menuVariants}
                            className="absolute top-full left-6 right-6 mt-4 p-6 glass-surface rounded-3xl md:hidden overflow-hidden"
                        >
                            <div className="flex flex-col space-y-6">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-2xl font-semibold text-foreground hover:text-accent-blue transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                ))}
                                <div className="pt-6 border-t border-glass-border flex justify-between items-center text-text-muted">
                                    <div className="flex space-x-5 text-text-muted">
                                        <a href="https://github.com/tony-tech-web" target="_blank" rel="noreferrer"><Github size={20} className="hover:text-accent-blue transition-colors cursor-pointer" /></a>
                                        <a href="#" target="_blank" rel="noreferrer"><Instagram size={20} className="hover:text-accent-blue transition-colors cursor-pointer" /></a>
                                        <a href="#" target="_blank" rel="noreferrer"><Twitter size={20} className="hover:text-accent-blue transition-colors cursor-pointer" /></a>
                                        <a href="#" target="_blank" rel="noreferrer"><MessageCircle size={20} className="hover:text-accent-blue transition-colors cursor-pointer" /></a>
                                        <a href="mailto:tonyalidu@gmail.com"><Mail size={20} className="hover:text-accent-blue transition-colors cursor-pointer" /></a>
                                    </div>
                                    <p className="text-xs">© 2026 ANTHONY</p>
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