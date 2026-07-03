import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';

const CARD_DATA = [
  {
    id: 1,
    title: "3+ Full-Stack Production Apps",
    subtitle: "Built, scaled, and deployed.",
    gradient: "from-zinc-900 via-zinc-950 to-black",
    borderColor: "border-orange-500/30",
    description: "Engineering robust full-stack applications from scratch. Focusing on modular architecture, secure authentication flows, and seamless database integrations to deliver production-ready systems that scale elegantly."
  },
  {
    id: 2,
    title: "AI-Powered Study System",
    subtitle: "Orbit: Advanced LLM Integration",
    gradient: "from-orange-950/20 via-zinc-950 to-black",
    borderColor: "border-orange-400/20",
    description: "Integrating advanced Large Language Models into practical workflows. Project Orbit demonstrates complex prompt engineering, contextual state management, and real-time AI responses to augment human learning."
  },
  {
    id: 3,
    title: "REST + DB Architectures",
    subtitle: "PostgreSQL, Express, Node.js",
    gradient: "from-zinc-800/40 via-zinc-900 to-black",
    borderColor: "border-white/10",
    description: "Designing decoupled API layers and optimized relational schemas. Extensive experience in building RESTful endpoints, writing efficient SQL queries, and orchestrating data flow between client and server."
  },
  {
    id: 4,
    title: "React + Node + Java Systems",
    subtitle: "Hybrid system engineering.",
    gradient: "from-black via-zinc-950 to-orange-950/20",
    borderColor: "border-orange-500/10",
    description: "Bridging multiple runtimes and paradigms. Combining the fluid interactivity of React with the raw processing power of Java and Node.js to architect highly-performant, cross-disciplinary software solutions."
  }
];

const Card = ({ data, isFront, setCards, index, isMobile }) => {
  const x = useMotionValue(0);
  
  // Stacking offset. 
  // Desktop: Stacked on the right, slightly offset to show depth.
  // Mobile: Stacked vertically.
  
  const desktopXOffset = index * -20; // Fan slightly to the left so they stay on screen
  const desktopYOffset = index * -15; // Fan upwards slightly
  const desktopScale = 1 - index * 0.05;
  
  const mobileYOffset = index * 15;
  const mobileScale = 1 - index * 0.05;
  
  const rotate = useTransform(x, [-150, 0, 150], [-10, index === 0 ? 0 : (index * -2), 10]);
  const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0]);

  const handleDragEnd = (event, info) => {
    if (info.offset.x > 100 || info.offset.x < -100) {
      setCards((prev) => {
        const newCards = [...prev];
        const swipedCard = newCards.shift();
        newCards.push(swipedCard);
        return newCards;
      });
    }
  };

  return (
    <motion.div
      className={`absolute w-[300px] h-[400px] md:w-[340px] md:h-[440px] rounded-2xl flex flex-col justify-end p-8 text-left cursor-grab active:cursor-grabbing border ${data.borderColor} backdrop-blur-xl bg-gradient-to-br ${data.gradient} shadow-2xl`}
      style={{
        x,
        rotate,
        opacity: isFront ? opacity : 1,
        zIndex: CARD_DATA.length - index,
        y: isMobile ? mobileYOffset : desktopYOffset,
        left: isMobile ? 0 : desktopXOffset,
        scale: isMobile ? mobileScale : desktopScale,
        transformOrigin: "bottom right"
      }}
      drag={isFront ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={{
        y: isMobile ? mobileYOffset : desktopYOffset,
        left: isMobile ? 0 : desktopXOffset,
        scale: isMobile ? mobileScale : desktopScale,
        zIndex: CARD_DATA.length - index,
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ 
          scale: isFront ? (isMobile ? 1.02 : 1.05) : (isMobile ? mobileScale : desktopScale), 
          y: isFront ? -10 : (isMobile ? mobileYOffset : desktopYOffset) 
      }}
    >
      {/* Glossy highlight effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative z-10">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight leading-tight">{data.title}</h3>
        <p className="text-accent-primary font-mono text-[10px] md:text-xs tracking-widest uppercase">{data.subtitle}</p>
      </div>
    </motion.div>
  );
};

const ProofStack = () => {
  const [cards, setCards] = useState(CARD_DATA);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const activeCard = cards[0];

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden flex flex-col justify-center min-h-[80vh]">
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-background via-background to-transparent z-10" />

      <div className="container mx-auto px-6 relative z-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-16 md:gap-8">
            
          {/* Left Side: Dynamic Writeup */}
          <div className="w-full md:w-1/2 order-2 md:order-1 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-accent-primary" />
              <span className="terminal-label">Verification_Layer</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase italic mb-8">
              Proof <span className="text-accent-primary">Stack.</span>
            </h2>
            
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeCard.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="pl-4 md:pl-6 border-l-2 border-accent-primary/50"
                >
                    <h3 className="text-2xl font-bold text-white mb-4">{activeCard.title}</h3>
                    <p className="text-zinc-400 text-lg font-light leading-relaxed mb-6 max-w-md">
                        {activeCard.description}
                    </p>
                    <p className="text-accent-primary font-mono text-xs tracking-widest uppercase flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
                        Swipe Cards to Explore
                    </p>
                </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Side: Stacked Cards */}
          <div className="w-full md:w-1/2 order-1 md:order-2 relative h-[400px] md:h-[460px] flex justify-center md:justify-end md:pr-10 perspective-1000">
            <div className="relative w-[300px] md:w-[340px] h-full">
                <AnimatePresence>
                {cards.map((card, index) => (
                    <Card
                    key={card.id}
                    data={card}
                    isFront={index === 0}
                    setCards={setCards}
                    index={index}
                    isMobile={isMobile}
                    />
                ))}
                </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProofStack;
