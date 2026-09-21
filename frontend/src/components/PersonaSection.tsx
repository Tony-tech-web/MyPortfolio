import React from 'react';
import { motion } from 'framer-motion';
import { Server, Zap, Layout } from 'lucide-react';
import { Pillar } from '../types/portfolio';

const PersonaCard: React.FC<Pillar> = ({ 
    name, 
    role, 
    statusColor, 
    description, 
    directives, 
    specs, 
    tags 
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex flex-col justify-between rounded-[2rem] border border-white/5 bg-zinc-950/80 backdrop-blur-xl p-8 transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden min-h-[580px]"
        >
            {/* Ambient Radial Accent Glow */}
            <div 
                className="absolute -top-32 -right-32 w-80 h-80 rounded-full blur-[100px] opacity-20 pointer-events-none group-hover:opacity-35 transition-opacity duration-700"
                style={{ backgroundColor: statusColor }}
            />
            
            {/* Top Corner Mechanical Markers */}
            <div className="absolute top-4 left-4 w-2 h-2 border-l border-t border-white/20" />
            <div className="absolute top-4 right-4 w-2 h-2 border-r border-t border-white/20" />

            <div>
                {/* Identity Titles */}
                <div className="mb-6">
                    <h3 className="text-3xl font-bold tracking-tighter text-white uppercase italic mb-2">
                        {name}
                    </h3>
                    <p 
                        className="text-xs font-mono uppercase tracking-widest pl-3 border-l-2 mb-4"
                        style={{ borderColor: statusColor, color: statusColor }}
                    >
                        {role}
                    </p>
                    <p className="text-sm text-text-muted font-light leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Directives Section */}
                <div className="space-y-2 mb-8">
                    <span className="terminal-label text-[9px] text-zinc-500 uppercase block tracking-widest">
                        Core_Directives
                    </span>
                    <ul className="space-y-2">
                        {directives.map((directive, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs font-mono text-zinc-300">
                                <span className="text-zinc-500 select-none">›</span>
                                <span>{directive}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Bottom Section: Specifications & Stack */}
            <div>
                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-xl border border-white/5 bg-white/[0.01]">
                    {specs.map((spec, i) => (
                        <div key={i} className="flex flex-col">
                            <span className="text-[9px] font-mono uppercase text-zinc-500 tracking-wider">
                                {spec.label}
                            </span>
                            <span className="text-xs font-mono font-bold text-zinc-200">
                                {spec.value}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Technical Stack Tags */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                    {tags.map((tag, i) => (
                        <span 
                            key={i} 
                            className="px-2.5 py-1 rounded-md text-[10px] font-mono tracking-tight text-zinc-400 bg-white/5 border border-white/5 group-hover:border-white/10 transition-colors"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const PersonaSection: React.FC = () => {
    const pillars: Pillar[] = [
        {
            id: 'PILLAR::01',
            code: 'ARCH-01',
            name: 'Systems Architect.',
            role: 'BACKEND & CLOUD INFRASTRUCTURE',
            statusColor: '#ff5500',
            icon: Server,
            description: 'Engineering resilient, scalable backends with contract-first APIs, decoupled database layers, and strict zero-trust security postures.',
            directives: [
                'Contract-first API validation with Zod schemas',
                'Controller-Service-Repository decoupling',
                'ACID-compliant transactional multi-table writes'
            ],
            specs: [
                { label: 'Security Model', value: 'Zero-Trust RBAC' },
                { label: 'Data Integrity', value: 'Strict Normalization' },
                { label: 'API Governance', value: 'OpenAPI 3.1 Specs' },
                { label: 'Infra Design', value: 'Stateless / Docker' }
            ],
            tags: ['Node.js', 'Express', 'Java / Spring', 'PostgreSQL', 'Docker']
        },
        {
            id: 'PILLAR::02',
            code: 'ENGINE-02',
            name: 'Real-Time Engine.',
            role: 'DATA ORCHESTRATION & STATE SYNC',
            statusColor: '#10b981',
            icon: Zap,
            description: 'Architecting high-throughput event loops, WebSocket synchronization managers, and decoupled event-reducing state architectures.',
            directives: [
                'Bi-directional WebSockets with connection resilience',
                'Decoupled event reducers for deterministic state',
                'Low-latency edge caching with Redis architectures'
            ],
            specs: [
                { label: 'Sync Protocol', value: 'Native WebSockets' },
                { label: 'State Reducer', value: 'Deterministic Event' },
                { label: 'Cache Strategy', value: 'Sub-ms In-Memory' },
                { label: 'Throughput', value: 'Non-Blocking I/O' }
            ],
            tags: ['WebSockets', 'Redis', 'Zustand', 'React Query', 'Python']
        },
        {
            id: 'PILLAR::03',
            code: 'CRAFT-03',
            name: 'Interface Artisan.',
            role: 'HIGH-FIDELITY CLIENT CRAFT',
            statusColor: '#3b82f6',
            icon: Layout,
            description: 'Crafting command-level interfaces that eliminate layout shifts, orchestrate kinetic spring physics, and bridge complex logic with beauty.',
            directives: [
                'Strict 60fps kinetic motion via Framer Motion springs',
                'Zero Cumulative Layout Shifts (CLS) across viewports',
                'Tokenized design system with custom HSL dark modes'
            ],
            specs: [
                { label: 'Frame Target', value: '60 FPS Smooth' },
                { label: 'Layout Shift', value: '0.00 CLS Metric' },
                { label: 'Design System', value: 'Tokenized Vanilla' },
                { label: 'Accessibility', value: 'Semantic Strict' }
            ],
            tags: ['React 18', 'Framer Motion', 'Tailwind CSS', 'SVG Canvas', 'JetBrains Mono']
        }
    ];

    return (
        <section id="identity-matrix" className="section-padding bg-background relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
                    {pillars.map(pillar => (
                        <PersonaCard key={pillar.id} {...pillar} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PersonaSection;
