import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Send, Github, Twitter, Instagram, MapPin, CheckCircle2 } from 'lucide-react';
import axios from 'axios';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { scrollYProgress } = useScroll();
    const yForm = useTransform(scrollYProgress, [0.8, 1], [0, -50]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus('');

        try {
            const web3Key = (process.env.REACT_APP_WEB3FORMS_KEY || '').trim();
            if (!web3Key) throw new Error('Configuration missing: Contact system key.');

            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    access_key: web3Key,
                    ...formData,
                    subject: `New Collaboration Inquiry from ${formData.name}`,
                })
            });

            const result = await response.json();

            if (result.success) {
                setStatus('SUCCESS');
                setFormData({ name: '', email: '', message: '' });
                
                const apiUrl = process.env.REACT_APP_API_URL;
                if (apiUrl) {
                    try {
                        await axios.post(`${apiUrl.replace(/\/$/, '')}/api/contact`, formData);
                    } catch (e) {
                        console.log('Database sync bypassed.');
                    }
                }
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            setStatus('ERROR');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="section-padding bg-background relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row gap-20">
                    
                    {/* Content Side */}
                    <div className="w-full lg:w-1/2">
                        <motion.span 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-accent-blue font-mono text-xs tracking-widest uppercase mb-4 block"
                        >
                            Connection
                        </motion.span>
                        <motion.h2 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-tight"
                        >
                            Let's start a <br />
                            <span className="gradient-heading">Collaboration.</span>
                        </motion.h2>
                        
                        <motion.p 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-text-muted text-lg leading-relaxed max-w-md mb-12"
                        >
                            Whether you have a specific project in mind or just want to explore technical possibilities, I’m always open to high-impact opportunities.
                        </motion.p>

                        <div className="space-y-8">
                            {[
                                { icon: <Mail size={20} />, label: 'Direct Email', value: 'tonyalidu@gmail.com', href: 'mailto:tonyalidu@gmail.com' },
                                { icon: <Github size={20} />, label: 'Source Control', value: 'github.com/tony-tech-web', href: 'https://github.com/tony-tech-web' },
                                { icon: <Twitter size={20} />, label: 'Twitter / X', value: '@AliduTony', href: 'https://x.com/AliduTony' },
                                { icon: <Instagram size={20} />, label: 'Instagram', value: '@immnot_tony', href: 'https://www.instagram.com/immnot_tony/' },
                                { icon: <MapPin size={20} />, label: 'Current Base', value: 'Abuja, Nigeria', href: null },
                            ].map((item, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-6"
                                >
                                    <div className="p-4 rounded-2xl glass-surface text-accent-blue">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-mono tracking-widest text-text-muted uppercase mb-1">{item.label}</p>
                                        {item.href ? (
                                            <a href={item.href} target="_blank" rel="noreferrer" className="text-lg font-semibold hover:text-accent-blue transition-colors">
                                                {item.value}
                                            </a>
                                        ) : (
                                            <p className="text-lg font-semibold">{item.value}</p>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="w-full lg:w-1/2">
                        <motion.div 
                            style={{ y: yForm }}
                            className="relative"
                        >
                            <div className="absolute -inset-10 bg-accent-blue/5 rounded-full blur-[100px] pointer-events-none" />
                            
                            <form onSubmit={handleSubmit} className="relative glass-surface p-8 md:p-12 rounded-[40px] border-white/5 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-mono tracking-widest text-text-muted uppercase ml-2">Identity</label>
                                        <input 
                                            type="text" 
                                            name="name" 
                                            required 
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Your Name"
                                            className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/5 focus:border-accent-blue/50 focus:bg-white/10 outline-none transition-all placeholder:text-white/20"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-mono tracking-widest text-text-muted uppercase ml-2">Email Address</label>
                                        <input 
                                            type="email" 
                                            name="email" 
                                            required 
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="email@example.com"
                                            className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/5 focus:border-accent-blue/50 focus:bg-white/10 outline-none transition-all placeholder:text-white/20"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-mono tracking-widest text-text-muted uppercase ml-2">Message</label>
                                    <textarea 
                                        name="message" 
                                        required 
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="How can we build together?"
                                        className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/5 focus:border-accent-blue/50 focus:bg-white/10 outline-none transition-all placeholder:text-white/20 resize-none"
                                    />
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={loading || status === 'SUCCESS'}
                                    className={`w-full py-5 rounded-2xl font-bold tracking-tight text-white transition-all flex items-center justify-center gap-3 overflow-hidden group ${
                                        status === 'SUCCESS' ? 'bg-emerald-500' : 'bg-accent-blue hover:bg-blue-600'
                                    }`}
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : status === 'SUCCESS' ? (
                                        <>
                                            <CheckCircle2 size={20} />
                                            <span>Inquiry Dispatched</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            <span>Send Inquiry</span>
                                        </>
                                    )}
                                </motion.button>

                                {status === 'ERROR' && (
                                    <p className="text-center text-xs text-rose-400 font-mono tracking-widest uppercase animate-pulse">
                                        Transmission failed. Please try again.
                                    </p>
                                )}
                            </form>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Contact;