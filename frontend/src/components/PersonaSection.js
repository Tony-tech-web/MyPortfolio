import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Target } from 'lucide-react';

const PersonaCard = ({ id, name, role, statusColor, image, description, icon: Icon, progress }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="group relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-[40px] border border-white/5 bg-zinc-950 transition-all duration-700"
        >
            {/* Background Image / Action Layer */}
            <div className="absolute inset-0 z-0">
                <img 
                    src={image} 
                    alt={name} 
                    className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            </div>

            {/* Immersive Fluid Slider (Reference to User Image 1) */}
            <div className="absolute top-10 left-10 right-10 z-20">
                <div className="relative h-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${progress}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="absolute h-full left-0 top-0 bg-gradient-to-r from-accent-primary to-orange-400 rounded-full flex items-center justify-end px-4 group-hover:shadow-[0_0_20px_rgba(255,85,0,0.5)] transition-all"
                    >
                        <span className="text-[10px] font-bold text-white/80">{progress}%</span>
                    </motion.div>
                </div>
            </div>

            {/* Status Indicator */}
            <div className="absolute top-10 right-10 z-30">
                <div 
                    className={`w-3 h-3 rounded-full animate-pulse-slow shadow-[0_0_15px_${statusColor}]`}
                    style={{ backgroundColor: statusColor }}
                />
            </div>

            {/* Immersive UI Overlays */}
            <div className="absolute inset-0 p-10 z-10 flex flex-col justify-end">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 border border-white/10 rounded-xl bg-white/5 backdrop-blur-md">
                            <Icon size={16} className="text-accent-primary" />
                        </div>
                        <span className="terminal-label text-[10px] tracking-[0.4em]">{id}</span>
                    </div>

                    <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-white uppercase italic leading-none">
                        {name}
                    </h3>
                    
                    <p className="text-sm font-mono text-zinc-500 uppercase tracking-widest border-l border-accent-primary pl-4">
                        {role}
                    </p>

                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                            >
                                <p className="text-zinc-400 text-sm font-light leading-relaxed mt-4 max-w-[80%]">
                                    {description}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Interactive Grid Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
        </motion.div>
    );
};

const PersonaSection = () => {
    const personas = [
        {
            id: 'ARCH-01',
            name: 'ANTHONY.',
            role: 'STARK ARCHITECT',
            statusColor: '#ff5500',
            image: 'https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&q=80&w=800',
            icon: Shield,
            progress: 88,
            description: 'Engineering the future of technical architecture with high-fidelity systems.'
        },
        {
            id: 'ENGINE-02',
            name: 'CORE.',
            role: 'LOGIC ENGINE',
            statusColor: '#00ffaa',
            image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
            icon: Zap,
            progress: 92,
            description: 'High-performance data orchestration and real-time reconciliation systems.'
        },
        {
            id: 'UI-03',
            name: 'ZERO.',
            role: 'VISUAL CRAFT',
            statusColor: '#60a5fa',
            image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
            icon: Target,
            progress: 74,
            description: 'Crafting command-level interfaces that bridge technical complexity with beauty.'
        }
    ];

    return (
        <section className="section-padding bg-background relative border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between mb-20 gap-8">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-px bg-accent-primary" />
                            <span className="terminal-label">Action_Animation_Layers</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase italic">
                            The Identity <span className="text-accent-primary">Matrix.</span>
                        </h2>
                    </div>
                    <p className="max-w-xs text-zinc-500 text-sm font-mono tracking-widest uppercase">
                        [Immersive_Professional_Nodes::Enabled]
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {personas.map(persona => (
                        <PersonaCard key={persona.id} {...persona} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PersonaSection;
