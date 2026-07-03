import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Star, GitFork, Terminal, FileText, X } from 'lucide-react';

const GITHUB_USER = 'tony-tech-web';

const stripMarkdown = (md) => {
  if (!md) return '';
  return md
    .replace(/```[\s\S]*?```/g, '[code block]')
    .replace(/`[^`]+`/g, (m) => m.replace(/`/g, ''))
    .replace(/#{1,6}\s+/g, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^[-*+]\s+/gm, '• ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};

const LANG_COLORS = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Java:       '#b07219',
  Python:     '#3572A5',
  HTML:       '#e34c26',
  CSS:        '#563d7c',
  Kotlin:     '#A97BFF',
  Go:         '#00ADD8',
  Rust:       '#dea584',
};

const Projects = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [readme, setReadme] = useState('');
  const [readmeLoading, setReadmeLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=pushed&per_page=100`);
        if (!res.ok) throw new Error('GitHub API unavailable');
        const data = await res.json();
        const ninetyDaysAgo = new Date();
        ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
        const byInteractions = (a, b) => (b.stargazers_count + b.forks_count) - (a.stargazers_count + a.forks_count);
        let filtered = data.filter((r) => !r.fork && !r.archived).filter((r) => new Date(r.pushed_at) > ninetyDaysAgo).sort(byInteractions);
        if (filtered.length === 0) {
          filtered = data.filter((r) => !r.fork && !r.archived).sort(byInteractions);
        }
        setRepos(filtered.slice(0, 6));
      } catch {
        setRepos([
          { id: 1, name: 'VirtualStylist', html_url: '#', stargazers_count: 12, forks_count: 3, language: 'Java' },
          { id: 2, name: 'Dropshop-website', html_url: '#', stargazers_count: 6, forks_count: 1, language: 'JavaScript' },
          { id: 3, name: 'advanced-news-website', html_url: '#', stargazers_count: 7, forks_count: 3, language: 'JavaScript' },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  const handleSelectRepo = async (repo) => {
    if (selectedRepo?.id === repo.id) {
      if (isMobile) setSelectedRepo(null); // Toggle off on mobile
      return;
    }
    
    setSelectedRepo(repo);
    setReadmeLoading(true);
    setReadme('');
    
    try {
      let res = await fetch(`https://raw.githubusercontent.com/${GITHUB_USER}/${repo.name}/main/README.md`);
      if (!res.ok) {
        res = await fetch(`https://raw.githubusercontent.com/${GITHUB_USER}/${repo.name}/master/README.md`);
      }
      setReadme(res.ok ? stripMarkdown(await res.text()) : '');
    } catch {
      setReadme('');
    } finally {
      setReadmeLoading(false);
    }
  };

  return (
    <section id="projects" className="section-padding bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-accent-primary" />
              <span className="terminal-label">Case_Studies</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[0.9]">
              Engineering <br />
              <span className="text-accent-primary">Digital Products.</span>
            </h2>
          </div>
          <p className="text-text-muted max-w-xs text-base font-light leading-relaxed">
            Live repositories — sorted by interactions. Select a project to view its architecture.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 min-h-[600px] relative">
          
          {/* Left Side: Vertical List of Cards */}
          <div className={`flex flex-col gap-4 transition-all duration-500 ease-in-out ${selectedRepo && !isMobile ? 'lg:w-1/3' : 'w-full lg:w-1/2'}`}>
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-28 border border-white/5 bg-white/[0.02] animate-pulse rounded-xl" />
              ))
            ) : (
              repos.map((repo, i) => {
                const isSelected = selectedRepo?.id === repo.id;
                
                return (
                  <motion.div
                    key={repo.id}
                    layout="position"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    onClick={() => handleSelectRepo(repo)}
                    className={`relative p-6 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                      isSelected 
                        ? 'border-accent-primary bg-accent-primary/5 shadow-[0_0_30px_rgba(255,85,0,0.1)] scale-[1.02] z-10' 
                        : 'border-white/5 bg-zinc-950/50 hover:bg-white/[0.02] hover:border-white/20'
                    }`}
                  >
                    {isSelected && (
                        <motion.div 
                            layoutId="active-project-highlight"
                            className="absolute left-0 top-0 bottom-0 w-1 bg-accent-primary shadow-[0_0_15px_rgba(255,85,0,0.8)]"
                        />
                    )}
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                                <span className={`terminal-label text-[9px] tracking-[0.2em] ${isSelected ? 'text-accent-primary' : 'text-zinc-600'}`}>
                                    PROJ-{String(i + 1).padStart(2, '0')}
                                </span>
                            </div>
                            <h3 className={`font-bold tracking-tight truncate transition-colors duration-300 ${isSelected ? 'text-white text-xl' : 'text-zinc-300 text-lg'}`}>
                                {repo.name.replace(/-/g, '_')}
                            </h3>
                            <div className="flex items-center gap-4 text-zinc-500 flex-wrap mt-3">
                                {repo.language && (
                                <span className="flex items-center gap-1.5 text-[10px] font-mono">
                                    <span
                                    className="w-1.5 h-1.5 rounded-full inline-block flex-shrink-0"
                                    style={{ background: LANG_COLORS[repo.language] || '#555' }}
                                    />
                                    {repo.language}
                                </span>
                                )}
                                <span className="flex items-center gap-1 text-[10px] font-mono">
                                <Star size={9} /> {repo.stargazers_count}
                                </span>
                            </div>
                        </div>
                    </div>
                  </motion.div>
                );
              })
            )}

            <div className="mt-8 flex justify-start">
                <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noopener noreferrer" className="btn-outline group text-sm py-3 px-6">
                    <Terminal size={14} className="group-hover:text-accent-primary" />
                    Access Repository Archive
                </a>
            </div>
          </div>

          {/* Right Side: Bubble Info Expansion */}
          <AnimatePresence mode="wait">
            {selectedRepo && (
                <motion.div
                    key={selectedRepo.id}
                    initial={{ opacity: 0, scale: 0.95, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95, x: 20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className={`fixed inset-4 z-50 lg:static lg:inset-auto lg:z-auto ${isMobile ? 'flex items-center justify-center' : 'flex-1 lg:w-2/3 lg:block'}`}
                >
                    {/* Mobile Backdrop */}
                    {isMobile && (
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-background/90 backdrop-blur-sm -z-10"
                            onClick={() => setSelectedRepo(null)}
                        />
                    )}

                    <div className="w-full h-full lg:h-auto max-h-[85vh] lg:max-h-none overflow-hidden flex flex-col bg-zinc-950/90 backdrop-blur-2xl border border-accent-primary/20 rounded-[32px] shadow-2xl lg:sticky lg:top-32 relative">
                        {/* Header */}
                        <div className="p-8 border-b border-white/5 bg-white/[0.01] flex justify-between items-start gap-4">
                            <div>
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">
                                    {selectedRepo.name}
                                </h3>
                                {selectedRepo.description && (
                                    <p className="text-sm font-mono text-zinc-400 italic">
                                        {selectedRepo.description}
                                    </p>
                                )}
                            </div>
                            
                            <div className="flex items-center gap-2 shrink-0">
                                <a href={selectedRepo.html_url} target="_blank" rel="noopener noreferrer" className="p-3 border border-white/5 hover:border-accent-primary/40 hover:text-accent-primary hover:bg-accent-primary/10 transition-all rounded-xl">
                                    <Github size={18} />
                                </a>
                                {selectedRepo.homepage && (
                                    <a href={selectedRepo.homepage} target="_blank" rel="noopener noreferrer" className="p-3 border border-white/5 hover:border-accent-primary/40 hover:text-accent-primary hover:bg-accent-primary/10 transition-all rounded-xl">
                                        <ExternalLink size={18} />
                                    </a>
                                )}
                                {isMobile && (
                                    <button onClick={() => setSelectedRepo(null)} className="p-3 text-zinc-400 hover:text-white rounded-xl bg-white/5">
                                        <X size={18} />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Body (README) */}
                        <div className="p-8 overflow-y-auto custom-scrollbar flex-1 lg:max-h-[600px] relative">
                            <div className="flex items-center gap-2 mb-6 sticky top-0 bg-zinc-950/90 backdrop-blur pb-4 z-10 border-b border-white/5">
                                <FileText size={14} className="text-accent-primary" />
                                <span className="terminal-label text-xs text-accent-primary tracking-widest">SYSTEM_README.md</span>
                            </div>
                            
                            {readmeLoading ? (
                                <div className="space-y-4">
                                    {[75, 55, 85, 45, 65, 80, 40].map((w, i) => (
                                        <div key={i} className="h-2 bg-white/5 animate-pulse rounded-full" style={{ width: `${w}%` }} />
                                    ))}
                                </div>
                            ) : (
                                <pre className="text-xs md:text-sm font-mono text-zinc-400 leading-relaxed whitespace-pre-wrap break-words">
                                    {readme || '// No documentation found for this module.'}
                                </pre>
                            )}
                            
                            {/* Decorative Grid */}
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none" />
                        </div>
                    </div>
                </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
};

export default Projects;