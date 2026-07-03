import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';

const CARD_DATA = [
  {
    id: 1,
    title: "3+ Full-Stack Production Apps",
    subtitle: "Built, scaled, and deployed.",
    color: "#8b5cf6" // Purple
  },
  {
    id: 2,
    title: "AI-Powered Study System",
    subtitle: "Orbit: Advanced LLM Integration",
    color: "#f97316" // Orange
  },
  {
    id: 3,
    title: "REST + DB Architectures",
    subtitle: "PostgreSQL, Express, Node.js",
    color: "#10b981" // Emerald
  },
  {
    id: 4,
    title: "React + Node + Java Systems",
    subtitle: "Hybrid system engineering.",
    color: "#3b82f6" // Blue
  }
];

const Card = ({ data, isFront, setCards, index }) => {
  const x = useMotionValue(0);
  // Rotate slightly based on drag distance
  const rotate = useTransform(x, [-150, 0, 150], [-5, 0, 5]);
  // Fade out as it gets further away
  const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0]);

  const handleDragEnd = (event, info) => {
    if (info.offset.x > 100 || info.offset.x < -100) {
      // Swiped far enough, send to back
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
      className="absolute w-full h-full rounded-2xl shadow-xl flex flex-col justify-center items-center p-8 text-center cursor-grab active:cursor-grabbing border border-white/10"
      style={{
        x,
        rotate,
        opacity: isFront ? opacity : 1,
        backgroundColor: data.color,
        zIndex: CARD_DATA.length - index,
        y: index * 15,
        scale: 1 - index * 0.05,
        transformOrigin: "bottom center"
      }}
      drag={isFront ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={{
        y: index * 15,
        scale: 1 - index * 0.05,
        zIndex: CARD_DATA.length - index,
      }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: isFront ? 1.02 : 1 - index * 0.05 }}
    >
      <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">{data.title}</h3>
      <p className="text-white/80 font-mono text-sm tracking-widest uppercase">{data.subtitle}</p>
    </motion.div>
  );
};

const ProofStack = () => {
  const [cards, setCards] = useState(CARD_DATA);

  return (
    <section className="py-20 bg-background relative overflow-hidden flex flex-col items-center border-t border-white/5">
      <div className="container mx-auto px-6 mb-12 text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
          Proof <span className="text-accent-primary">Stack.</span>
        </h2>
        <p className="text-text-muted font-light tracking-widest text-sm uppercase">
          Swipe to explore system capabilities
        </p>
      </div>

      <div className="relative w-full max-w-sm h-80 perspective-1000">
        <AnimatePresence>
          {cards.map((card, index) => (
            <Card
              key={card.id}
              data={card}
              isFront={index === 0}
              setCards={setCards}
              index={index}
            />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProofStack;
