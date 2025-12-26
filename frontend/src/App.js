import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Background Elements */}
      <div className="bg-glow bg-glow-1"></div>
      <div className="bg-glow bg-glow-2"></div>

      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <Analytics />
    </div>
  );
}

export default App;
