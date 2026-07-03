import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';

const CARD_DATA = [
  {
    id: 1,
    title: "3+ Full-Stack Production Apps",
    subtitle: "Built, scaled, and deployed.",
    gradient: "from-purple-500/20 to-purple-500/5"
  },
  {
    id: 2,
    title: "AI-Powered Study System",
    subtitle: "Orbit: Advanced LLM Integration",
    gradient: "from-orange-500/20 to-orange-500/5"
  },
  {
    id: 3,
    title: "REST + DB Architectures",
    subtitle: "PostgreSQL, Express, Node.js",
    gradient: "from-emerald-500/20 to-emerald-500/5"
  },
  {
    id: 4,
    title: "React + Node + Java Systems",
    subtitle: "Hybrid system engineering.",
    gradient: "from-blue-500/20 to-blue-500/5"
  }
];

const Card = ({ data, isFront, setCards, index, isMobile }) => {
  const x = useMotionValue(0);
  
  // Mobile: stack vertically. Desktop: Fan horizontally.
  // When mobile, the visual offset is purely Y based on index.
  // When desktop, the offset is X based on index, creating a fan effect.
  
  const desktopXOffset = index * 80;
  const desktopYOffset = index * 10;
  
  const mobileYOffset = index * 15;
  const mobileScale = 1 - index * 0.05;
  
  const rotate = useTransform(x, [-150, 0, 150], [-5, isMobile ? 0 : (index * 2), 5]);
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
      className={`absolute w-full h-full rounded-2xl flex flex-col justify-center items-start p-8 text-left cursor-grab active:cursor-grabbing border border-white/10 backdrop-blur-xl bg-gradient-to-br ${data.gradient} shadow-2xl`}
      style={{
        x,
        rotate,
        opacity: isFront ? opacity : 1,
        zIndex: CARD_DATA.length - index,
        y: isMobile ? mobileYOffset : desktopYOffset,
        left: isMobile ? 0 : desktopXOffset,
        scale: isMobile ? mobileScale : 1,
        transformOrigin: "bottom left"
      }}
      drag={isFront ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={{
        y: isMobile ? mobileYOffset : desktopYOffset,
        left: isMobile ? 0 : desktopXOffset,
        scale: isMobile ? mobileScale : 1,
        zIndex: CARD_DATA.length - index,
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: isFront ? (isMobile ? 1.02 : 1.05) : (isMobile ? mobileScale : 1), y: isFront ? -5 : (isMobile ? mobileYOffset : desktopYOffset) }}
    >
      {/* Glossy highlight effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/5 to-white/20 pointer-events-none" />
      
      <div className="relative z-10">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight leading-tight">{data.title}</h3>
        <p className="text-zinc-400 font-mono text-xs md:text-sm tracking-widest uppercase">{data.subtitle}</p>
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

  return (
    <section className="py-32 bg-background relative overflow-hidden flex flex-col items-center">
      {/* Remove border-t and use a seamless gradient transition from the Hero section */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-background via-background to-transparent z-10" />

      <div className="container mx-auto px-6 mb-16 md:mb-24 flex flex-col md:flex-row items-center md:items-end justify-between relative z-20 gap-6 text-center md:text-left">
        <div>
          <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
            <div className="w-8 h-px bg-accent-primary" />
            <span className="terminal-label">Verification_Layer</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase italic">
            Proof <span className="text-accent-primary">Stack.</span>
          </h2>
        </div>
        <p className="text-zinc-500 font-mono tracking-widest text-xs uppercase hidden md:block">
          [ Swipe_To_Verify_Capabilities ]
        </p>
      </div>

      <div className="relative w-full max-w-sm md:max-w-4xl h-80 perspective-1000 z-20 flex justify-center md:justify-start md:pl-20">
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
    </section>
  );
};

export default ProofStack;
