import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { motion, useScroll, useSpring } from 'framer-motion';

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="bg-background text-foreground min-h-screen selection:bg-accent-blue/30 overflow-x-hidden">
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent-blue origin-left z-[110]"
        style={{ scaleX }}
      />

      {/* Global Background Layer */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="bg-glow bg-glow-1 opacity-20" />
        <div className="bg-glow bg-glow-2 opacity-20" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="relative z-10">
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
      </div>

      {/* High-end corner aesthetics */}
      <div className="fixed bottom-10 left-10 z-[100] hidden lg:block">
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] uppercase text-text-muted/40">
          <div className="w-8 h-px bg-current" />
          <span>Identity / V1.0</span>
        </div>
      </div>
      
      <div className="fixed bottom-10 right-10 z-[100] hidden lg:block">
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] uppercase text-text-muted/40 rotate-180 [writing-mode:vertical-lr]">
          <span>Crafted with Precision</span>
        </div>
      </div>
    </div>
  );
}

export default App;
