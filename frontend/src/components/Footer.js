import React from 'react';

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="glass-card py-12 mt-20">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <a href="#home" className="text-2xl font-bold gradient-text mb-6 inline-block">
            Tony<span className="text-blue-400">.</span>
          </a>

          <nav className="mb-8">
            <div className="flex flex-wrap justify-center gap-6 mb-6">
              <button onClick={() => scrollToSection('home')} className="text-gray-300 hover:text-blue-400 transition-colors">Home</button>
              <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-blue-400 transition-colors">About</button>
              <button onClick={() => scrollToSection('skills')} className="text-gray-300 hover:text-blue-400 transition-colors">Skills</button>
              <button onClick={() => scrollToSection('projects')} className="text-gray-300 hover:text-blue-400 transition-colors">Projects</button>
              <button onClick={() => scrollToSection('blog')} className="text-gray-300 hover:text-blue-400 transition-colors">Blog</button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-blue-400 transition-colors">Contact</button>
            </div>
          </nav>

          <div className="flex justify-center space-x-6 mb-8">
            <a
              href="https://github.com/tony-tech-web"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors text-2xl"
              aria-label="GitHub"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              href="https://linkedin.com/in/alidu-anthony"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors text-2xl"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a
              href="mailto:tonyalidu@gmail.com"
              className="text-gray-400 hover:text-blue-400 transition-colors text-2xl"
              aria-label="Email"
            >
              <i className="fas fa-envelope"></i>
            </a>
            <a
              href="https://twitter.com/tony_tech_web"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors text-2xl"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter"></i>
            </a>
          </div>

          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Alidu Anthony. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Built with ❤️ using React, Node.js, and PostgreSQL
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;