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
import CustomCursor from './components/CustomCursor';
import GridBackground from './components/GridBackground';
import PersonaSection from './components/PersonaSection';

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="bg-background text-foreground min-h-screen selection:bg-accent-primary/30 overflow-x-hidden cursor-none font-main">
      <CustomCursor />
      
      {/* Technical Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-accent-primary origin-left z-[110]"
        style={{ scaleX }}
      />

      {/* Global Background Layer */}
      <GridBackground />

      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <PersonaSection />
          <About />
          <Skills />
          <Projects />
          <Blog />
          <Contact />
        </main>
        <Footer />
      </div>

      {/* High-end corner aesthetics - V2.0 */}
      <div className="fixed bottom-10 left-10 z-[100] hidden lg:block">
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-500">
          <div className="w-8 h-px bg-accent-primary" />
          <span>Engineering_Profile / V2.0</span>
        </div>
      </div>
      
      <div className="fixed bottom-10 right-10 z-[100] hidden lg:block">
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-500 rotate-180 [writing-mode:vertical-lr]">
          <span>Optimized_for_Production</span>
        </div>
      </div>
    </div>
  );
}

export default App;
