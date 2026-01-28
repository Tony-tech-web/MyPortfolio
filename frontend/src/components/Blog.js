import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BookOpen, Calendar, ArrowUpRight, ArrowRight } from 'lucide-react';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const blogId = '6323760128659666218';
        const apiKey = process.env.REACT_APP_BLOGGER_API_KEY;
        
        if (!apiKey) {
          console.warn('Blogger API key not found. Showing fallback posts.');
          setPosts(getFallbackPosts());
          setLoading(false);
          return;
        }

        const response = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}&maxResults=6`);
        const data = await response.json();
        
        if (data.items) {
          const formattedPosts = data.items.map(post => ({
            id: post.id,
            title: post.title,
            excerpt: post.content ? post.content.replace(/<[^>]*>/g, '').substring(0, 180) + '...' : '',
            tags: post.labels || [],
            created_at: post.published,
            url: post.url
          }));
          setPosts(formattedPosts);
        } else {
          setPosts(getFallbackPosts());
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
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
       title: 'Digital Minimalism in Engineering', 
       excerpt: 'Exploring the intersection of clean code and focused architecture in high-scale environments.', 
       tags: ['design', 'tech'], 
       created_at: new Date().toISOString(), 
       url: '#' 
    },
    { 
       id: 2, 
       title: 'The Future of Frontend Identity', 
       excerpt: 'Beyond resumes: how modern developers are crafting their digital presence through motion and craft.', 
       tags: ['identity', 'web'], 
       created_at: new Date().toISOString(), 
       url: '#' 
    },
    { 
       id: 3, 
       title: 'Spring Physics in UI Design', 
       excerpt: 'Why linear animations feel dead and how to bring interfaces to life using natural laws of motion.', 
       tags: ['motion', 'ux'], 
       created_at: new Date().toISOString(), 
       url: '#' 
    }
  ];

  return (
    <section id="blog" className="section-padding bg-background relative overflow-hidden">
      <motion.div 
        style={{ y: yParallax }}
        className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-accent-violet/5 rounded-full blur-[140px] pointer-events-none z-0"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mb-20">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-accent-blue font-mono text-xs tracking-widest uppercase mb-4 block"
          >
            Insights & Thoughts
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
          >
            The <span className="gradient-heading">Digital Atelier</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-text-muted max-w-xl text-lg leading-relaxed"
          >
            Exploring the overlap of software engineering, minimalist design, and technical creative direction. 
          </motion.p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="glass-surface h-[300px] rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative flex flex-col glass-surface p-8 rounded-3xl hover:border-white/20 transition-all duration-500 overflow-hidden h-full"
              >
                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-300">
                  <ArrowUpRight size={24} className="text-accent-blue" />
                </div>

                <div className="flex items-center gap-2 mb-6 text-xs font-mono text-accent-blue uppercase tracking-widest">
                  <BookOpen size={14} />
                  <span>Article</span>
                </div>

                <h3 className="text-2xl font-bold mb-4 tracking-tight leading-tight group-hover:text-accent-blue transition-colors duration-300">
                  {post.title}
                </h3>
                
                <p className="text-text-muted mb-8 line-clamp-3 leading-relaxed flex-grow">
                  {post.excerpt}
                </p>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-text-muted text-xs font-mono uppercase tracking-widest">
                    <Calendar size={12} />
                    <span>{new Date(post.created_at).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</span>
                  </div>
                  
                  <a 
                    href={post.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-accent-blue transition-colors"
                  >
                    Read
                    <ArrowRight size={14} />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 flex justify-center"
        >
          <a 
            href="https://www.blogger.com/blog/posts/6323760128659666218" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-3 text-sm font-mono tracking-widest uppercase text-text-muted hover:text-foreground transition-all"
          >
            <span>Explore all entries</span>
            <div className="w-8 h-px bg-text-muted group-hover:w-12 group-hover:bg-accent-blue transition-all" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;