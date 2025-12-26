import React, { useState, useEffect, useMemo } from 'react';

const Hero = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const words = useMemo(
    () => ["Software Developer", "Tech Innovator", "UI/UX Enthusiast", "Java Specialist"],
    []
  );

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    let delay = 100;
 
    if (!isDeleting && currentText === currentWord) {
      delay = 2000;
    } else if (isDeleting) {
      delay = 50;
    }
 
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        const next = currentWord.substring(0, currentText.length + 1);
        setCurrentText(next);
        if (next === currentWord) {
          setIsDeleting(true);
        }
      } else {
        const prev = currentWord.substring(0, currentText.length - 1);
        setCurrentText(prev);
        if (prev.length === 0) {
          setIsDeleting(false);
          setCurrentWordIndex((idx) => (idx + 1) % words.length);
          delay = 500;
        }
      }
    }, delay);
 
    return () => clearTimeout(timeout);
  }, [currentText, currentWordIndex, isDeleting, words]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero min-h-screen flex items-center justify-center relative">
      <div className="container mx-auto px-6 text-center">
        <span className="badge inline-block px-4 py-2 bg-blue-600/20 text-blue-400 rounded-full text-sm font-medium mb-6">
          Welcome to my world
        </span>
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Hi, I'm <span className="gradient-text">Alidu Anthony</span>
        </h1>
        <h2 className="text-2xl md:text-3xl mb-8 text-gray-300">
          <span className="typing-text">{currentText}</span>
          <span className="cursor">|</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
          Specializing in Web Development, Java Projects, UI/UX, Blockchain Basics, and Creative Tech Solutions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => scrollToSection('projects')} className="btn-primary">
            View My Work
          </button>
          <button onClick={() => scrollToSection('contact')} className="btn-secondary">
            Hire Me
          </button>
          <a
            href={process.env.REACT_APP_CV_URL || ((process.env.PUBLIC_URL || '') + '/Alidu Anthony - Curriculum Vitae.pdf')}
            download
            className="btn-secondary"
          >
            Download CV
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
