import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Cpu, 
  Database, 
  Layout, 
  ShieldCheck,
  Activity,
  Code,
  X,
  Layers
} from 'lucide-react';

const TechnicalRadar = ({ stats, color }) => {
    return (
        <div className="relative w-full aspect-square flex items-center justify-center p-4">
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                {/* Background Grid */}
                {[20, 40, 60, 80, 100].map((radius) => (
                    <circle
                        key={radius}
                        cx="50"
                        cy="50"
                        r={radius / 2}
                        fill="none"
                        stroke="currentColor"
                        className="text-white/5"
                        strokeWidth="0.5"
                    />
                ))}
                {/* Axis Lines */}
                {stats.map((_, i) => {
                    const angle = (i * 2 * Math.PI) / stats.length - Math.PI / 2;
                    return (
                        <line
                            key={i}
                            x1="50"
                            y1="50"
                            x2={50 + 50 * Math.cos(angle)}
                            y2={50 + 50 * Math.sin(angle)}
                            stroke="currentColor"
                            className="text-white/5"
                            strokeWidth="0.5"
                        />
                    );
                })}
                {/* Data Polygon */}
                <motion.polygon
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.2 }}
                    points={stats.map((s, i) => {
                        const angle = (i * 2 * Math.PI) / stats.length - Math.PI / 2;
                        const r = (s.value / 100) * 50;
                        return `${50 + r * Math.cos(angle)},${50 + r * Math.sin(angle)}`;
                    }).join(' ')}
                    fill={color}
                    stroke={color}
                    strokeWidth="1"
                    className="transition-all duration-1000"
                />
                {/* Data Points */}
                {stats.map((s, i) => {
                    const angle = (i * 2 * Math.PI) / stats.length - Math.PI / 2;
                    const r = (s.value / 100) * 50;
                    return (
                        <motion.circle
                            key={i}
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            cx={50 + r * Math.cos(angle)}
                            cy={50 + r * Math.sin(angle)}
                            r="1.5"
                            fill={color}
                            className="shadow-[0_0_10px_rgba(255,85,0,0.5)]"
                        />
                    );
                })}
            </svg>
            <div className="absolute inset-x-0 -bottom-4 flex justify-between px-1">
                {stats.map((s, i) => (
                    <span key={i} className="text-[5px] font-mono text-zinc-500 uppercase tracking-tighter w-4 text-center">
                        {s.label}
                    </span>
                ))}
            </div>
        </div>
    );
};

const Skills = () => {
    const { scrollYProgress } = useScroll();
    const yShift = useTransform(scrollYProgress, [0, 1], [0, -100]);

    const skillGroups = [
        {
            category: 'Frontend_Architecture',
            icon: <Layout size={20} />,
            id: 'RSRC-ORCH::0101',
            skills: ['React', 'TypeScript', 'Tailwind CSS', 'JavaFX'],
            description: 'Component-driven, state-aware UI focusing on modularity and declarative state reconciliation.',
            stats: [
                { label: 'React', value: 92 },
                { label: 'TS/JS', value: 88 },
                { label: 'Tailwind', value: 95 },
                { label: 'State', value: 85 },
                { label: 'JavaFX', value: 78 }
            ],
            color: 'var(--accent-primary)',
            manifest: {
                architecture: 'Component-driven, state-aware UI',
                stack: ['React', 'TypeScript / JavaScript', 'Tailwind CSS'],
                approach: ['Functional components', 'Props/state-based rendering', 'Separation of UI and data-fetching logic'],
                desktop: 'JavaFX (MVC / MVVM patterns)',
                workflow: ['Responsive layouts', 'API-driven UI updates', 'JSON-based data exchange'],
                strength: 'Practical project-based frontend (strong fundamentals, not UI-heavy focus)'
            }
        },
        {
            category: 'Backend_Orchestration',
            icon: <Database size={20} />,
            id: 'PRF-ENG::1010',
            skills: ['Node.js', 'Java', 'PostgreSQL', 'Prisma', 'Redis'],
            description: 'Scalable service orchestration with robust database synchronization and caching layers.',
            stats: [
                { label: 'Logic', value: 94 },
                { label: 'DBMS', value: 90 },
                { label: 'Prisma', value: 88 },
                { label: 'API', value: 92 },
                { label: 'Redis', value: 82 }
            ],
            color: '#10b981',
            manifest: {
                runtimes: ['Node.js', 'Java'],
                patterns: ['Monolithic service architecture', 'Controller–service–data access separation'],
                databases: ['MongoDB', 'PostgreSQL', 'MySQL', 'Supabase', 'Firebase'],
                orm: 'Prisma',
                caching: 'Redis',
                api: ['REST-style APIs', 'JSON serialization', 'External API consumption'],
                realtime: 'WebSockets (Conceptual + Usage-level)'
            }
        },
        {
            category: 'DevOps_Infrastructure',
            icon: <ShieldCheck size={20} />,
            id: 'OPS-DPL::1100',
            skills: ['Docker', 'Cloudflare R2', 'Git', 'GitHub'],
            description: 'Local-first development workflows with containerized isolation and cloud-managed services.',
            stats: [
                { label: 'Docker', value: 82 },
                { label: 'Cloud', value: 85 },
                { label: 'Git', value: 96 },
                { label: 'Dpl', value: 65 },
                { label: 'Config', value: 75 }
            ],
            color: '#3b82f6',
            manifest: {
                containerization: 'Docker (Local isolation, service separation)',
                storage: 'Cloudflare R2 (Object storage)',
                platform: ['Firebase', 'Supabase managed services'],
                scm: ['Git', 'GitHub'],
                environment: ['Local-first workflows', 'Manual deployments'],
                maturity: 'Early–intermediate (focus on container symmetry)'
            }
        },
        {
            category: 'Technical_Stack',
            icon: <Cpu size={20} />,
            id: 'TKN-STL::0011',
            skills: ['Python', 'SQL', 'Assembly', 'API Design'],
            description: 'A multi-paradigm technical toolkit spanning low-level logic to high-level orchestrations.',
            stats: [
                { label: 'Logic', value: 90 },
                { label: 'Paradigm', value: 85 },
                { label: 'Efficiency', value: 88 },
                { label: 'Versatility', value: 92 },
                { label: 'Innovation', value: 80 }
            ],
            color: '#e879f9',
            manifest: {
                languages: ['Java', 'JavaScript', 'TypeScript', 'Python', 'SQL', 'Assembly (Academic)', 'JSON'],
                frameworks: ['React', 'Node.js', 'JavaFX', 'Prisma', 'Tailwind CSS'],
                databases: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase', 'Supabase', 'Cloudflare R2'],
                ai: ['Applied AI/ML concepts', 'Model usage and integration'],
                tooling: ['VS Code', 'IntelliJ IDEA / NetBeans', 'Trae IDEs', 'Antigravity', 'GitHub', 'Docker']
            }
        }
    ];

    const [expandedGroup, setExpandedGroup] = useState(null);

    return (
        <section id="skills" className="section-padding bg-background relative overflow-hidden">
            {/* Minimal Grid Parallax */}
            <motion.div 
                style={{ y: yShift }}
                className="absolute top-0 right-0 w-1/2 h-full border-r border-white/5 opacity-50 pointer-events-none"
            />
            
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row gap-20 items-center">
                    
                    {/* Narrative Side */}
                    <div className="w-full lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-8 h-px bg-accent-primary" />
                                <span className="terminal-label">Capabilities</span>
                            </div>
                            
                            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 max-w-xl leading-[0.9]">
                                A Minimal Stack. <br />
                                <span className="text-accent-primary">Maximum Performance.</span>
                            </h2>
                            
                            <p className="text-text-muted text-lg leading-relaxed mb-12 max-w-lg font-light">
                                From architectural orchestration to final deployment, my stack is engineered for friction-less excellence and technical precision.
                            </p>

                            <div className="space-y-6">
                                {skillGroups.map((group, i) => (
                                    <motion.div 
                                        key={group.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-center gap-6 group cursor-default"
                                    >
                                        <div className="p-3 terminal-panel text-accent-primary group-hover:scale-110 transition-transform">
                                            {group.icon}
                                        </div>
                                        <div>
                                            <p className="terminal-label text-[10px] text-zinc-500 mb-1">{group.category}</p>
                                            <p className="text-sm font-medium group-hover:text-accent-primary transition-colors">{group.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    <div className="w-full lg:w-1/2 relative flex justify-center py-20 lg:py-0">
                        <div className="relative w-full max-w-[450px] flex flex-col justify-center gap-6">
                            {skillGroups.map((group, i) => (
                                <motion.div
                                    layout
                                    key={group.id}
                                    initial={{ opacity: 0, rotateX: 45, rotateZ: -10, y: 50 }}
                                    whileInView={{ 
                                        opacity: 1, 
                                        rotateX: expandedGroup === group.id ? 0 : 30, 
                                        rotateZ: expandedGroup === group.id ? 0 : -15, 
                                        y: 0 
                                    }}
                                    viewport={{ once: true }}
                                    transition={{ 
                                        duration: 0.8, 
                                        delay: expandedGroup === group.id ? 0 : i * 0.1, 
                                        ease: [0.16, 1, 0.3, 1] 
                                    }}
                                    className={`relative terminal-panel rounded-2xl p-8 group transition-all duration-500 ${
                                        expandedGroup === group.id 
                                        ? 'z-[50] border-accent-primary bg-background/95 shadow-2xl scale-105' 
                                        : 'hover:border-accent-primary/50 cursor-pointer'
                                    }`}
                                    style={{
                                        transformStyle: 'preserve-3d',
                                        zIndex: expandedGroup === group.id ? 50 : 30 - (i * 10)
                                    }}
                                    onClick={() => expandedGroup !== group.id && setExpandedGroup(group.id)}
                                >
                                    {/* Orange Pulse Line */}
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-accent-primary shadow-[0_0_15px_rgba(255,85,0,0.5)] opacity-80" />
                                    
                                    <div className="flex justify-between items-start mb-6">
                                        <motion.span 
                                            animate={{ x: [0, 5, 0] }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                            className="terminal-label text-[12px] opacity-100 text-accent-primary"
                                        >
                                            {group.id}
                                        </motion.span>
                                        <Layers size={16} className="text-zinc-800" />
                                    </div>
                                    
                                    <motion.h3 layout="position" className="text-xl font-bold tracking-tight mb-4">{group.category}</motion.h3>
                                    
                                    <div className={`transition-all duration-500 overflow-hidden ${expandedGroup === group.id ? 'max-h-[800px] opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
                                        <div className="grid gap-6 pt-4 border-t border-white/5">
                                            <div className="w-full max-w-[250px] mx-auto">
                                                <TechnicalRadar stats={group.stats} color={group.color} />
                                            </div>
                                            
                                            <div className="space-y-4">
                                                {Object.entries(group.manifest).map(([key, value]) => (
                                                    <div key={key} className="space-y-2">
                                                        <div className="flex items-center gap-2">
                                                            <Code size={12} className="text-accent-primary" />
                                                            <span className="terminal-label text-[9px] text-zinc-500 uppercase">{key}</span>
                                                        </div>
                                                        {Array.isArray(value) ? (
                                                            <div className="pl-4 border-l border-white/5 space-y-1">
                                                                {value.map((item, idx) => (
                                                                    <p key={idx} className="text-[10px] font-mono text-zinc-400">• {item}</p>
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            <p className="pl-4 border-l border-white/5 text-[10px] font-mono text-zinc-400">{value}</p>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {group.skills.map(skill => (
                                            <motion.span 
                                                layout="position"
                                                key={skill} 
                                                className="px-3 py-1 bg-white/5 border border-white/5 text-[9px] font-mono tracking-widest text-zinc-500 uppercase"
                                            >
                                                {skill}
                                            </motion.span>
                                        ))}
                                    </div>

                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setExpandedGroup(expandedGroup === group.id ? null : group.id);
                                        }}
                                        className="w-full flex items-center justify-between terminal-label text-[10px] text-zinc-600 hover:text-accent-primary transition-colors py-2 border-t border-white/5 group/btn"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Activity size={12} className={`${expandedGroup === group.id ? 'animate-pulse text-accent-primary' : 'group-hover/btn:animate-pulse'} transition-colors`} />
                                            <span>{expandedGroup === group.id ? 'Close_Manifest' : 'Access_Manifest'}</span>
                                        </div>
                                        {expandedGroup === group.id && <X size={12} />}
                                    </button>


                                    <div className="absolute inset-x-0 -bottom-2 h-2 bg-black/40 blur-sm transform-gpu -rotate-x-90 origin-bottom" />
                                </motion.div>
                            ))}
                        </div>

                        
                        {/* Vertical Status Line Decoration */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-2/3 w-px bg-gradient-to-b from-transparent via-white/5 to-transparent flex flex-col items-center gap-20 py-10">
                            {[1,2,3].map(n => <div key={n} className="w-1 h-1 rounded-full bg-accent-primary animate-pulse" style={{ animationDelay: `${n * 0.5}s` }} />)}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Skills;