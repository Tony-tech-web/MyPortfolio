import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Code2, 
  Terminal, 
  Layers, 
  Zap, 
  Cpu, 
  Database, 
  Layout, 
  Workflow,
  Settings,
  ShieldCheck
} from 'lucide-react';

const Skills = () => {
    const { scrollYProgress } = useScroll();
    const yShift = useTransform(scrollYProgress, [0, 1], [0, -120]);

    const skillGroups = [
        {
            category: 'Frontend Architecture',
            icon: <Layout className="text-accent-blue" />,
            skills: ['React / Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js'],
            description: 'Building immersive, performant interfaces with modern rendering patterns.'
        },
        {
            category: 'Backend Orchestration',
            icon: <Database className="text-accent-violet" />,
            skills: ['Node.js / Express', 'Java / Spring', 'PostgreSQL', 'MongoDB', 'RESTful APIs'],
            description: 'Designing scalable microservices and robust data persistence layers.'
        },
        {
            category: 'Technical Stack',
            icon: <Cpu className="text-accent-emerald" />,
            skills: ['Python', 'Java', 'C++', 'SQL', 'Shell Scripting'],
            description: 'Fluent across multiple paradigms for diverse engineering challenges.'
        },
        {
            category: 'DevOps & Tools',
            icon: <ShieldCheck className="text-accent-amber" />,
            skills: ['Git / GitHub', 'Docker', 'AWS Basics', 'Linux Admin', 'Vercel / Heroku'],
            description: 'Ensuring seamless deployment pipelines and system reliability.'
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <section id="skills" className="section-padding bg-background relative overflow-hidden">
            {/* Background Parallax */}
            <motion.div 
                style={{ y: yShift }}
                className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-accent-emerald/5 rounded-full blur-[140px] pointer-events-none"
            />
            
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center text-center mb-24 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="p-3 rounded-2xl glass-surface mb-8"
                    >
                        <Zap size={24} className="text-accent-blue" />
                    </motion.div>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
                    >
                        Technical <span className="gradient-heading">Command.</span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-text-muted text-lg leading-relaxed"
                    >
                        A deep dive into the technologies I use to bridge the gap between creative vision and technical execution.
                    </motion.p>
                </div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    {skillGroups.map((group, i) => (
                        <motion.div
                            key={group.category}
                            variants={itemVariants}
                            className="group relative glass-surface p-10 rounded-[32px] hover:border-white/20 transition-all duration-500 overflow-hidden"
                        >
                            <div className="flex items-start justify-between mb-8">
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 group-hover:bg-white/10 transition-colors duration-300">
                                    {group.icon}
                                </div>
                                <div className="flex gap-1">
                                    {[1, 2, 3].map(dot => (
                                        <div key={dot} className="w-1 h-1 rounded-full bg-accent-blue/40" />
                                    ))}
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold mb-4 tracking-tight group-hover:text-foreground transition-colors">
                                {group.category}
                            </h3>
                            <p className="text-sm text-text-muted mb-8 group-hover:text-white transition-colors duration-300">
                                {group.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {group.skills.map((skill, si) => (
                                    <span 
                                        key={skill} 
                                        className="px-4 py-1.5 rounded-full bg-white/5 border border-white/5 text-[10px] font-mono tracking-widest text-text-muted uppercase hover:text-foreground hover:border-white/20 transition-all cursor-default"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            {/* Hover highlight line */}
                            <div className="absolute bottom-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-accent-blue/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Secondary Skills / Tools Section - Micro Icons */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-20 flex flex-wrap justify-center gap-12 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                >
                    <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em]">
                        <Code2 size={16} /> Git
                    </div>
                    <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em]">
                        <Settings size={16} /> VS Code
                    </div>
                    <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em]">
                        <Terminal size={16} /> Linux
                    </div>
                    <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em]">
                        <Workflow size={16} /> CI/CD
                    </div>
                    <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em]">
                        <Layers size={16} /> Docker
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;