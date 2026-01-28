import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { User, Quote, MapPin, GraduationCap, Briefcase, Zap } from 'lucide-react';

const About = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const stats = [
    { label: 'Location', value: 'Abuja, Nigeria', icon: <MapPin size={16} /> },
    { label: 'Degree', value: 'B.Sc. Computer Science', icon: <GraduationCap size={16} /> },
    { label: 'Experience', value: '3+ Years Crafting', icon: <Briefcase size={16} /> },
    { label: 'Passion', value: 'Creative Engineering', icon: <Zap size={16} /> }
  ];

  return (
    <section id="about" className="section-padding bg-background relative overflow-hidden">
      {/* Parallax Elements */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-20 right-[10%] w-64 h-64 bg-accent-blue/5 rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-20 left-[5%] w-96 h-96 bg-accent-violet/5 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-start">
          
          {/* Visual Side / Identity Card */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-1/3 sticky top-32"
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-accent-blue/20 to-accent-violet/20 rounded-[40px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative glass-surface rounded-[32px] overflow-hidden p-2">
                <div className="aspect-[4/5] bg-surface-900 rounded-[28px] overflow-hidden flex items-center justify-center relative">
                   {/* Placeholder for real image or avatar - Using a stylized character/icon for now */}
                   <User size={120} className="text-white/10" />
                   <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                   <div className="absolute bottom-8 left-8 right-8 text-center lg:text-left">
                     <p className="text-xs font-mono tracking-widest text-accent-blue uppercase mb-2">Principal</p>
                     <h4 className="text-2xl font-bold tracking-tight">Alidu Anthony</h4>
                   </div>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4">
              {stats.map((stat, i) => (
                <motion.div 
                   key={stat.label}
                   initial={{ opacity: 0, y: 10 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.5 + (i * 0.1) }}
                   className="flex items-center gap-4 px-6 py-4 glass-surface rounded-2xl"
                >
                  <div className="text-accent-blue">{stat.icon}</div>
                  <div>
                    <p className="text-[10px] font-mono tracking-widest text-text-muted uppercase">{stat.label}</p>
                    <p className="text-sm font-semibold">{stat.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Narrative Side */}
          <div className="w-full lg:w-2/3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-px bg-accent-blue" />
                <span className="text-accent-blue font-mono text-xs tracking-widest uppercase">The Perspective</span>
              </div>

              <h3 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight leading-tight">
                Architecting interfaces that <span className="gradient-heading">breathe</span> and logic that <span className="gradient-heading">scales.</span>
              </h3>

              <div className="space-y-8 text-lg text-text-muted leading-relaxed font-light">
                <p>
                  I am a software engineer driven by the philosophy that technical excellence and aesthetic minimalism are not mutually exclusive. Currently specializing in high-performance web systems and Java environments at Elizade University.
                </p>
                <p>
                  My approach is fundamentally rooted in "Digital Craftsmanship"—treating every line of code as a part of a larger structural statement. I navigate the space between complex backend orchestration and high-end frontend ڈیزائن with a focus on intentionality.
                </p>
                
                <div className="relative p-10 glass-surface rounded-3xl border-l-4 border-l-accent-blue my-12 overflow-hidden group">
                  <Quote size={80} className="absolute -top-4 -right-4 text-white/5 group-hover:text-accent-blue/10 transition-colors" />
                  <p className="relative z-10 text-xl italic font-serif text-foreground leading-relaxed">
                    "I don't just solve problems; I design systems that prevent them while making the user feel empowered by simplicity."
                  </p>
                </div>

                <p>
                  When I'm not architecting digital solutions, I immerse myself in the evolving tech landscape — from exploring blockchain primitives to refining UI/UX motion curves. I believe the future of technology belongs to those who can make the complex feel invisible.
                </p>
              </div>

              <div className="mt-16 pt-16 border-t border-white/5">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
                   <div>
                     <p className="text-4xl font-bold mb-2">3+</p>
                     <p className="text-xs font-mono tracking-widest text-text-muted uppercase">Years Experience</p>
                   </div>
                   <div>
                     <p className="text-4xl font-bold mb-2">20+</p>
                     <p className="text-xs font-mono tracking-widest text-text-muted uppercase">Successful Pilots</p>
                   </div>
                   <div>
                     <p className="text-4xl font-bold mb-2">100%</p>
                     <p className="text-xs font-mono tracking-widest text-text-muted uppercase">Commitment Rate</p>
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