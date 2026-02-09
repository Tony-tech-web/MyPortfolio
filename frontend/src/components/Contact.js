import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Github, Twitter, Instagram, MapPin, CheckCircle2, Terminal } from 'lucide-react';
import axios from 'axios';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

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
        <section id="contact" className="section-padding bg-background relative border-t border-white/5">
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row gap-20">
                    
                    {/* Channel Info Side */}
                    <div className="w-full lg:w-1/2">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-8 h-px bg-accent-primary" />
                            <span className="terminal-label">Communication_Interface</span>
                        </div>
                        
                        <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-12 leading-[0.9]">
                            Let's start a <br />
                            <span className="text-accent-primary italic">Collaboration.</span>
                        </h2>
                        
                        <p className="text-text-muted text-lg font-light leading-relaxed mb-16 max-w-md">
                            Transmitting projects, ideas, or architectural inquiries. I respond to high-fidelity opportunities within 24 cycles.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {[
                                { icon: <Mail size={18} />, label: 'Standard_Email', value: 'tonyalidu@gmail.com', href: 'mailto:tonyalidu@gmail.com' },
                                { icon: <Github size={18} />, label: 'Source_Control', value: 'tony-tech-web', href: 'https://github.com/tony-tech-web' },
                                { icon: <Twitter size={18} />, label: 'Relay_X', value: '@AliduTony', href: 'https://x.com/AliduTony' },
                                { icon: <MapPin size={18} />, label: 'Node_Location', value: 'Abuja, Nigeria', href: null },
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col gap-2">
                                    <span className="terminal-label text-zinc-600 font-bold">{item.label}</span>
                                    {item.href ? (
                                        <a href={item.href} target="_blank" rel="noreferrer" className="text-sm font-mono text-zinc-400 hover:text-accent-primary transition-colors flex items-center gap-2">
                                            {item.icon} {item.value}
                                        </a>
                                    ) : (
                                        <p className="text-sm font-mono text-zinc-400 flex items-center gap-2">
                                            {item.icon} {item.value}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Uplink Form Side */}
                    <div className="w-full lg:w-1/2">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <form onSubmit={handleSubmit} className="terminal-panel p-8 md:p-12 space-y-8">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="terminal-label text-accent-primary">New_Transmission</span>
                                    <Terminal size={14} className="text-zinc-800" />
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-1">
                                        <label className="terminal-label text-zinc-600 block">Ident_Value</label>
                                        <input 
                                            type="text" 
                                            name="name" 
                                            required 
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="ENTER NAME"
                                            className="w-full terminal-panel px-6 py-4 font-mono text-sm text-fg outline-none focus:border-accent-primary/50 transition-all placeholder:text-text-muted/50"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="terminal-label text-zinc-600 block">Email_Address</label>
                                        <input 
                                            type="email" 
                                            name="email" 
                                            required 
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="USER@DOMAIN.COM"
                                            className="w-full terminal-panel px-6 py-4 font-mono text-sm text-fg outline-none focus:border-accent-primary/50 transition-all placeholder:text-text-muted/50"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="terminal-label text-zinc-600 block">Input_Message</label>
                                        <textarea 
                                            name="message" 
                                            required 
                                            rows="4"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="DESCRIBE_COLLABORATION_PARAMETERS..."
                                            className="w-full terminal-panel px-6 py-4 font-mono text-sm text-fg outline-none focus:border-accent-primary/50 transition-all placeholder:text-text-muted/50 resize-none uppercase"
                                        />
                                    </div>
                                </div>

                                <button
                                    disabled={loading || status === 'SUCCESS'}
                                    className={`btn-primary w-full ${
                                        status === 'SUCCESS' ? 'bg-emerald-600 hover:bg-emerald-600' : ''
                                    }`}
                                >
                                    {loading ? (
                                        <span className="animate-pulse">SYNCHRONIZING...</span>
                                    ) : status === 'SUCCESS' ? (
                                        <div className="flex items-center gap-2">
                                            <CheckCircle2 size={14} />
                                            <span>TRANSMISSION_COMPLETE</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <Send size={14} />
                                            <span>INITIATE_UPLINK</span>
                                        </div>
                                    )}
                                </button>

                                {status === 'ERROR' && (
                                    <p className="text-center font-mono text-[10px] text-rose-500 uppercase tracking-widest animate-pulse">
                                        Checksum fail. Connection lost.
                                    </p>
                                )}
                            </form>

                            {/* Decorative Grid Accent */}
                            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r border-b border-accent-primary/20 pointer-events-none" />
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Contact;