import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const words = ["Software Developer", "Tech Innovator", "UI/UX Enthusiast", "Java Specialist"];

  useEffect(() => {
    const type = () => {
      const currentWord = words[currentWordIndex];

      if (isDeleting) {
        setCurrentText(currentWord.substring(0, currentText.length - 1));
      } else {
        setCurrentText(currentWord.substring(0, currentText.length + 1));
      }

      let typeSpeed = 100;

      if (!isDeleting && currentText === currentWord) {
        typeSpeed = 2000; // Pause at end of word
        setIsDeleting(true);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        typeSpeed = 500; // Pause before new word
      } else if (isDeleting) {
        typeSpeed = 50;
      }

      setTimeout(type, typeSpeed);
    };

    const timeout = setTimeout(type, 100);
    return () => clearTimeout(timeout);
  }, [currentText, currentWordIndex, isDeleting]);

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
        </div>
      </div>
    </section>
  );
};

export default Hero;