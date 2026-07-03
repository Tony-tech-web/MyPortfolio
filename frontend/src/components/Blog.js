import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, ArrowUpRight, Terminal } from 'lucide-react';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const blogId = '6323760128659666218';
        const apiKey = process.env.REACT_APP_BLOGGER_API_KEY;
        
        if (!apiKey) {
          setPosts(getFallbackPosts());
          setLoading(false);
          return;
        }

        const response = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}&maxResults=6&orderBy=updated`);
        const data = await response.json();
        
        if (data.items) {
          const formattedPosts = data.items.map(post => ({
            id: post.id,
            title: post.title,
            excerpt: post.content ? post.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...' : '',
            created_at: post.published,
            url: post.url
          }));
          setPosts(formattedPosts);
        } else {
          setPosts(getFallbackPosts());
        }
      } catch (error) {
        setPosts(getFallbackPosts());
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const getFallbackPosts = () => [
    { 
       id: 1, 
       title: 'Architectural Minimalism', 
       excerpt: 'Decoupling noise from performance in high-scale Java systems.', 
       created_at: new Date().toISOString(), 
       url: '#' 
    },
    { 
       id: 2, 
       title: 'Digital Identity Frameworks', 
       excerpt: 'The evolution of professional engineering presence in 2024.', 
       created_at: new Date().toISOString(), 
       url: '#' 
    }
  ];

  return (
    <section id="blog" className="section-padding bg-background relative border-t border-white/5">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-accent-primary" />
              <span className="terminal-label">Transmission_Feed</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-8 leading-[0.9]">
              Technical <br />
              <span className="text-accent-primary">Insights.</span>
            </h2>
          </div>
          <p className="text-text-muted max-w-sm text-lg font-light leading-relaxed">
            Asynchronous updates on systems architecture, UI craft, and software engineering philosophy.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {loading ? (
            [1, 2].map(i => <div key={i} className="terminal-panel h-80 animate-pulse" />)
          ) : (
            posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col lg:flex-row rounded-[2rem] overflow-hidden border border-white/5 bg-white/[0.02] hover:border-accent-primary/20 transition-all duration-700 hover:shadow-[0_0_80px_rgba(0,0,0,0.4)]"
              >
                {/* Content Pane - Left Side */}
                <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col bg-white/[0.02]">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="flex items-center gap-2 text-zinc-600">
                      <BookOpen size={14} />
                      <span className="terminal-label text-[10px] tracking-[0.2em]">Transmission::{index + 1}</span>
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold tracking-tighter mb-8 group-hover:text-accent-primary transition-colors duration-500">
                    {post.title}
                  </h3>
                  
                  <p className="text-text-muted text-lg font-light leading-relaxed mb-10 max-w-2xl">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto pt-8 border-t border-white/5">
                    <a 
                      href={post.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-2 text-[11px] font-mono text-zinc-500 hover:text-accent-primary transition-colors group/link"
                    >
                      <span className="border-b border-zinc-800 group-hover/link:border-accent-primary transition-colors pb-0.5">Read_Full_Entry_</span>
                      <ArrowUpRight size={12} className="opacity-0 group-hover/link:opacity-100 transition-all" />
                    </a>
                  </div>
                </div>

                {/* Metadata Pane - Right Side */}
                <div className="w-full lg:w-[320px] p-8 md:p-12 bg-black/40 flex flex-col justify-between border-l border-white/5 relative">
                  {/* Accent Highlight */}
                  <div className="absolute top-0 right-0 w-20 h-px bg-gradient-to-l from-accent-primary/40 to-transparent" />
                  <div className="absolute top-0 right-0 h-20 w-px bg-gradient-to-b from-accent-primary/40 to-transparent" />

                  <div className="flex justify-between items-start mb-16">
                    <div className="p-4 terminal-panel rounded-2xl bg-white/[0.02]">
                      <Terminal size={24} className="text-zinc-600 group-hover:text-accent-primary transition-colors duration-500" />
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 text-zinc-500 justify-end mb-2">
                        <Calendar size={12} />
                        <span className="text-[10px] font-mono tracking-widest uppercase">published</span>
                      </div>
                      <span className="text-sm font-bold text-white tracking-tight">
                        {new Date(post.created_at).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }).toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 group/metric">
                      <span className="terminal-label text-[9px] text-zinc-600 uppercase block mb-3">registry_id</span>
                      <span className="text-[14px] font-mono text-zinc-400 break-all">{post.id}</span>
                    </div>

                    <div className="p-6 rounded-2xl bg-accent-primary/[0.03] border border-accent-primary/10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
                        <span className="text-xs font-medium tracking-tight text-zinc-300 uppercase">Live_Status</span>
                      </div>
                      <span className="terminal-label text-[10px] text-accent-primary">ACTIVE</span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))
          )}
        </div>

        <div className="mt-20 flex justify-center">
            <a 
                href="https://www.blogger.com/blog/posts/6323760128659666218" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-outline group"
            >
                Archive::Full_Logs
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
        </div>
      </div>
    </section>
  );
};

export default Blog;