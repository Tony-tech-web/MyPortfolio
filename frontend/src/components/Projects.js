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

const ProjectCard = ({ repo, index, onClick }) => {
  return (
    <motion.div
      layoutId={`project-${repo.id}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="relative border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-accent-primary/20 transition-colors duration-500 cursor-pointer select-none h-32 flex flex-col justify-center"
      onClick={() => onClick(repo)}
      whileHover={{ y: -5, scale: 1.02 }}
    >
      <div className="absolute top-0 right-0 w-8 h-px bg-gradient-to-l from-accent-primary/30 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 h-8 w-px bg-gradient-to-b from-accent-primary/30 to-transparent pointer-events-none" />

      <div className="p-5 flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="terminal-label text-[9px] text-zinc-600 tracking-[0.2em]">
              PROJ-{String(index + 1).padStart(2, '0')}
            </span>
          </div>
          <motion.h3 layoutId={`title-${repo.id}`} className="text-sm md:text-base font-bold tracking-tight truncate mb-3 text-white">
            {repo.name.replace(/-/g, '_')}
          </motion.h3>
          <div className="flex items-center gap-4 text-zinc-600">
            <span className="flex items-center gap-1 text-[10px] font-mono">
              <Star size={9} className="text-zinc-500" /> {repo.stargazers_count}
            </span>
            <span className="flex items-center gap-1 text-[10px] font-mono">
              <GitFork size={9} className="text-zinc-500" /> {repo.forks_count}
            </span>
            {repo.language && (
              <span className="flex items-center gap-1.5 text-[10px] font-mono">
                <span
                  className="w-1.5 h-1.5 rounded-full inline-block flex-shrink-0"
                  style={{ background: LANG_COLORS[repo.language] || '#555' }}
                />
                {repo.language}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ExpandedCard = ({ repo, onClose }) => {
  const [readme, setReadme] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReadme = async () => {
      try {
        let res = await fetch(`https://raw.githubusercontent.com/${GITHUB_USER}/${repo.name}/main/README.md`);
        if (!res.ok) {
          res = await fetch(`https://raw.githubusercontent.com/${GITHUB_USER}/${repo.name}/master/README.md`);
        }
        setReadme(res.ok ? stripMarkdown(await res.text()) : '');
      } catch {
        setReadme('');
      } finally {
        setLoading(false);
      }
    };
    fetchReadme();
  }, [repo.name]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 pointer-events-none">
        <motion.div
          layoutId={`project-${repo.id}`}
          className="w-full max-w-2xl bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col max-h-full relative"
        >
          {/* Header */}
          <div className="p-6 md:p-8 border-b border-white/5 bg-white/[0.02] flex items-start justify-between">
            <div>
              <motion.h3 layoutId={`title-${repo.id}`} className="text-2xl font-bold text-white mb-2">
                {repo.name.replace(/-/g, '_')}
              </motion.h3>
              {repo.description && (
                <p className="text-sm font-mono text-zinc-400 italic mb-4">{repo.description}</p>
              )}
              <div className="flex items-center gap-4">
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="btn-primary py-2 px-4 text-xs h-auto">
                  <Github size={12} /> View Code
                </a>
                {repo.homepage && (
                  <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="btn-outline py-2 px-4 text-xs h-auto">
                    <ExternalLink size={12} /> Live Demo
                  </a>
                )}
              </div>
            </div>
            <button onClick={onClose} className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors">
              <X size={16} className="text-white" />
            </button>
          </div>

          {/* Readme Content */}
          <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-1">
            <div className="flex items-center gap-2 mb-6">
              <FileText size={14} className="text-accent-primary" />
              <span className="terminal-label text-accent-primary tracking-widest text-[10px]">README.md</span>
            </div>
            
            {loading ? (
              <div className="space-y-4">
                {[80, 60, 90, 40, 70, 85].map((w, i) => (
                  <div key={i} className="h-2 bg-white/5 animate-pulse rounded" style={{ width: `${w}%` }} />
                ))}
              </div>
            ) : (
              <pre className="text-xs md:text-sm font-mono text-zinc-300 leading-relaxed whitespace-pre-wrap break-words">
                {readme || '// No README found — repository undocumented.'}
              </pre>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
};

const Projects = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRepo, setSelectedRepo] = useState(null);

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

  return (
    <section id="projects" className="section-padding bg-background relative">
      <div className="container mx-auto px-6">
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
            Live repositories — sorted by interactions. Click any card to initiate focus mode.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-32 border border-white/5 bg-white/[0.02] animate-pulse rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {repos.map((repo, i) => (
              <ProjectCard key={repo.id} repo={repo} index={i} onClick={setSelectedRepo} />
            ))}
          </div>
        )}

        <AnimatePresence>
          {selectedRepo && (
            <ExpandedCard repo={selectedRepo} onClose={() => setSelectedRepo(null)} />
          )}
        </AnimatePresence>

        <div className="mt-12 flex justify-center">
          <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noopener noreferrer" className="btn-outline group">
            <Terminal size={14} className="group-hover:text-accent-primary" />
            Access Repository Archive
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;