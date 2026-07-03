import React from 'react';
import { motion } from 'framer-motion';
import { Network, DatabaseZap, Lock, Cpu, CloudCog } from 'lucide-react';

const SystemThinking = () => {
    const systems = [
        {
            title: "API Design Patterns",
            icon: <Network className="text-accent-primary mb-4" size={24} />,
            points: [
                "Strict RESTful resource structures",
                "Controller-Service-Data access separation",
                "Robust payload validation layers"
            ]
        },
        {
            title: "Database Architecture",
            icon: <DatabaseZap className="text-emerald-400 mb-4" size={24} />,
            points: [
                "Relational integrity for complex state",
                "Document modeling for flexible payloads",
                "Optimized schema normalization"
            ]
        },
        {
            title: "Authentication Flows",
            icon: <Lock className="text-blue-400 mb-4" size={24} />,
            points: [
                "Stateless JWT implementations",
                "Secure session management",
                "Role-based access control (RBAC)"
            ]
        },
        {
            title: "Performance Tactics",
            icon: <Cpu className="text-purple-400 mb-4" size={24} />,
            points: [
                "Strategic payload pagination",
                "Lazy loading asset pipelines",
                "Algorithmic complexity reduction"
            ]
        },
        {
            title: "Deployment & Infra",
            icon: <CloudCog className="text-rose-400 mb-4" size={24} />,
            points: [
                "Environment variable separation",
                "Automated Vercel deployment pipelines",
                "Edge-network static caching"
            ]
        }
    ];

    return (
        <section className="section-padding bg-zinc-950 relative overflow-hidden">
            {/* Background noise */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-px bg-accent-primary" />
                            <span className="terminal-label">Engineering_Depth</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase italic text-white">
                            System <span className="text-zinc-500">Thinking.</span>
                        </h2>
                    </div>
                    <p className="max-w-sm text-zinc-400 text-sm font-light leading-relaxed">
                        Moving beyond syntax to architectural logic. Every tool is a decision. Every architecture is a trade-off.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {systems.map((sys, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="terminal-panel p-6 border border-white/5 hover:border-white/20 transition-all group"
                        >
                            {sys.icon}
                            <h3 className="font-bold text-white mb-4 text-sm tracking-wide">{sys.title}</h3>
                            <ul className="space-y-3">
                                {sys.points.map((point, i) => (
                                    <li key={i} className="text-xs font-mono text-zinc-500 leading-relaxed flex items-start gap-2 group-hover:text-zinc-400 transition-colors">
                                        <span className="text-accent-primary mt-0.5">›</span> {point}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SystemThinking;
