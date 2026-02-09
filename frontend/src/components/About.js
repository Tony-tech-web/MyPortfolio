import React from 'react';
import { motion } from 'framer-motion';
import { Quote, MapPin, GraduationCap, Briefcase, Shield } from 'lucide-react';

const About = () => {
  const stats = [
    { label: 'Location', value: 'Abuja, Nigeria', icon: <MapPin size={16} /> },
    { label: 'Degree', value: 'B.Sc. Computer Science', icon: <GraduationCap size={16} /> },
    { label: 'Experience', value: '3+ Years Engineering', icon: <Briefcase size={16} /> },
    { label: 'Security', value: 'Audit-Ready Patterns', icon: <Shield size={16} /> }
  ];

  return (
    <section id="about" className="section-padding bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-start">
          
          {/* Identity/Profile Side */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/3 sticky top-32"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-accent-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative terminal-panel p-2">
                <div className="aspect-[4/5] bg-zinc-900 overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-700">
                   <img 
                     src="/profile.jpg" 
                     alt="Alidu Anthony" 
                     className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                     style={{ objectPosition: 'center 15%' }}
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                   
                   {/* Mechanical Corners */}
                   <div className="absolute top-4 left-4 w-4 h-4 border-l border-t border-accent-primary" />
                   <div className="absolute bottom-4 right-4 w-4 h-4 border-r border-b border-accent-primary" />
                   
                   <div className="absolute bottom-8 left-8">
                     <p className="terminal-label text-accent-primary mb-1">Status: Active</p>
                     <h4 className="text-2xl font-bold tracking-tighter uppercase italic">Registry_01</h4>
                   </div>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              {stats.map((stat, i) => (
                <div 
                   key={stat.label}
                   className="flex items-center gap-4 px-6 py-4 terminal-panel hover:border-zinc-700 transition-colors"
                >
                  <div className="text-accent-primary opacity-80">{stat.icon}</div>
                  <div>
                    <p className="terminal-label text-[9px] text-zinc-500">{stat.label}</p>
                    <p className="text-sm font-mono">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Narrative/Technical Manifesto Side */}
          <div className="w-full lg:w-2/3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-px bg-accent-primary" />
                <span className="terminal-label">Technical Manifesto</span>
              </div>

              <h3 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight leading-[1.15]">
                Architecting logic that <span className="text-accent-primary italic">endures</span> and interfaces that <span className="text-accent-primary italic">command.</span>
              </h3>

              <div className="space-y-8 text-lg text-text-muted leading-relaxed font-light">
                <p>
                  I am a software engineer specializing in high-performance web systems and robust Java environments. My philosophy is rooted in technical minimalism: if it doesn't add value, it's noise.
                </p>
                <p>
                  At Elizade University, I've honed the ability to navigate complex backend orchestration while maintaining a high-fidelity frontend experience. Every line of code I write is intentional—a building block for scalable, audit-ready systems.
                </p>
                
                <div className="relative p-10 terminal-panel border-l-2 border-l-accent-primary my-12 overflow-hidden group">
                  <Quote size={40} className="absolute -top-4 -right-4 text-white/5" />
                  <p className="relative z-10 text-xl font-mono text-zinc-200 leading-relaxed italic">
                    "Friction is the enemy of progress. I design systems to eliminate it."
                  </p>
                </div>

                <p>
                  Beyond the editor, I explore the intersections of blockchain primitives and automated system reliability. I believe the future of technology belongs to those who prioritize structural integrity over ephemeral trends.
                </p>
              </div>

              <div className="mt-16 pt-16 border-t border-white/5">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
                   <div>
                     <p className="text-4xl font-bold mb-2 tracking-tighter">03 <span className="text-xs font-mono text-zinc-500 uppercase">YRS</span></p>
                     <p className="terminal-label text-zinc-600">Active_Engineering</p>
                   </div>
                   <div>
                     <p className="text-4xl font-bold mb-2 tracking-tighter">20 <span className="text-xs font-mono text-zinc-500 uppercase">EXE</span></p>
                     <p className="terminal-label text-zinc-600">Production_Deploys</p>
                   </div>
                   <div>
                     <p className="text-4xl font-bold mb-2 tracking-tighter">1.0 <span className="text-xs font-mono text-zinc-500 uppercase">RTG</span></p>
                     <p className="terminal-label text-zinc-600">Reliability_Index</p>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;