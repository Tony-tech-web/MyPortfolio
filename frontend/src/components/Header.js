import React, { useState, useEffect } from 'react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const storedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(storedTheme);
    document.documentElement.setAttribute('data-theme', storedTheme);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`glass-header fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
      <nav className="container mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="text-2xl font-bold gradient-text">
          Tony<span className="text-blue-400">.</span>
        </a>
        <div className="hidden md:flex space-x-8">
          <button onClick={() => scrollToSection('home')} className="hover:text-blue-400 transition-colors">Home</button>
          <button onClick={() => scrollToSection('about')} className="hover:text-blue-400 transition-colors">About</button>
          <button onClick={() => scrollToSection('skills')} className="hover:text-blue-400 transition-colors">Skills</button>
          <button onClick={() => scrollToSection('projects')} className="hover:text-blue-400 transition-colors">Projects</button>
          <button onClick={() => scrollToSection('blog')} className="hover:text-blue-400 transition-colors">Blog</button>
          <button onClick={() => scrollToSection('contact')} className="hover:text-blue-400 transition-colors">Contact</button>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="theme-toggle p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle theme"
          >
            <i className={theme === 'light' ? 'fa-regular fa-moon' : 'fa-regular fa-sun'}></i>
          </button>
          <a href="#contact" className="btn-primary btn-small hidden md:inline-block">Hire Me</a>
        </div>
      </nav>
    </header>
  );
};

export default Header;