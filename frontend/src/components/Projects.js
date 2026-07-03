import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Star, GitFork, Terminal, FileText, ChevronDown } from 'lucide-react';

const GITHUB_USER = 'tony-tech-web';

// Strip markdown to clean readable text
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

// ─── Individual Project Card ────────────────────────────────────────────────
const ProjectCard = ({ repo, index }) => {
  const [expanded, setExpanded]       = useState(false);
  const [readme, setReadme]           = useState(null);
  const [readmeLoading, setLoading]   = useState(false);

  const toggle = async () => {
    const next = !expanded;
    setExpanded(next);

    if (next && readme === null) {
      setLoading(true);
      try {
        // Try main → master branch for README
        let res = await fetch(
          `https://raw.githubusercontent.com/${GITHUB_USER}/${repo.name}/main/README.md`
        );
        if (!res.ok) {
          res = await fetch(
            `https://raw.githubusercontent.com/${GITHUB_USER}/${repo.name}/master/README.md`
          );
        }
        setReadme(res.ok ? stripMarkdown(await res.text()) : '');
      } catch {
        setReadme('');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="relative border border-white/5 bg-white/[0.02] hover:border-accent-primary/20 transition-colors duration-500 cursor-pointer select-none"
      onClick={toggle}
    >
      {/* ── Corner accents ─────────────────────────────────── */}
      <div className="absolute top-0 right-0 w-8 h-px bg-gradient-to-l from-accent-primary/30 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 h-8 w-px bg-gradient-to-b from-accent-primary/30 to-transparent pointer-events-none" />

      {/* ── Collapsed header — always visible ──────────────── */}
      <div className="p-5 flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="terminal-label text-[9px] text-zinc-600 tracking-[0.2em]">
              PROJ-{String(index + 1).padStart(2, '0')}
            </span>
          </div>

          <h3 className="text-sm font-bold tracking-tight truncate mb-3 group-hover:text-accent-primary transition-colors">
            {repo.name.replace(/-/g, '_')}
          </h3>

          {/* Meta — stars · forks · language */}
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

        {/* Right — icon links + chevron */}
        <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-1.5 border border-white/5 hover:border-accent-primary/40 hover:text-accent-primary transition-all"
            title="View on GitHub"
          >
            <Github size={11} />
          </a>
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 border border-white/5 hover:border-accent-primary/40 hover:text-accent-primary transition-all"
              title="Live Demo"
            >
              <ExternalLink size={11} />
            </a>
          )}
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="p-1.5 text-zinc-700"
          >
            <ChevronDown size={11} />
          </motion.div>
        </div>
      </div>

      {/* ── Expanded README panel ──────────────────────────── */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="readme"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-white/5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5">
              {/* README label */}
              <div className="flex items-center gap-2 mb-4">
                <FileText size={11} className="text-accent-primary" />
                <span className="terminal-label text-[9px] text-accent-primary tracking-widest">
                  README.md
                </span>
              </div>

              {readmeLoading ? (
                /* Skeleton shimmer */
                <div className="space-y-2">
                  {[75, 55, 85, 45, 65].map((w, i) => (
                    <div
                      key={i}
                      className="h-1.5 bg-white/5 animate-pulse rounded"
                      style={{ width: `${w}%` }}
                    />
                  ))}
                </div>
              ) : (
                <pre className="text-[10.5px] font-mono text-zinc-400 leading-relaxed whitespace-pre-wrap break-words max-h-56 overflow-y-auto pr-1">
                  {readme || '// No README found — repository undocumented.'}
                </pre>
              )}

              {/* GitHub description as footer if available */}
              {repo.description && (
                <p className="mt-4 pt-4 border-t border-white/5 text-[10px] font-mono text-zinc-600 italic">
                  {repo.description}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─── Projects Section ────────────────────────────────────────────────────────
const Projects = () => {
  const [repos, setRepos]     = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USER}/repos?sort=pushed&per_page=100`
        );
        if (!res.ok) throw new Error('GitHub API unavailable');

        const data = await res.json();

        const ninetyDaysAgo = new Date();
        ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

        const byInteractions = (a, b) =>
          (b.stargazers_count + b.forks_count) - (a.stargazers_count + a.forks_count);

        // Filter to last 90 days first
        let filtered = data
          .filter((r) => !r.fork && !r.archived)
          .filter((r) => new Date(r.pushed_at) > ninetyDaysAgo)
          .sort(byInteractions);

        // Fallback: no activity in 90 days → show most interacted all-time
        if (filtered.length === 0) {
          filtered = data
            .filter((r) => !r.fork && !r.archived)
            .sort(byInteractions);
        }

        setRepos(filtered.slice(0, 6));
      } catch {
        // Static fallback if GitHub API is down or rate-limited
        setRepos([
          { id: 1,  name: 'VirtualStylist',        html_url: 'https://github.com/tony-tech-web/VirtualStylist',        stargazers_count: 12, forks_count: 3, language: 'Java',       homepage: null, description: 'AI-powered outfit recommender built with JavaFX.' },
          { id: 2,  name: 'Dropshop-website',       html_url: 'https://github.com/tony-tech-web/Dropshop-website',       stargazers_count: 6,  forks_count: 1, language: 'JavaScript', homepage: null, description: 'High-performance e-commerce storefront.' },
          { id: 3,  name: 'advanced-news-website',  html_url: 'https://github.com/tony-tech-web/advanced-news-website',  stargazers_count: 7,  forks_count: 3, language: 'JavaScript', homepage: null, description: 'Real-time news aggregation engine.' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return (
    <section id="projects" className="section-padding bg-background relative border-y border-white/5">
      <div className="container mx-auto px-6">

        {/* ── Section header ────────────────────────────────── */}
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
            Live repositories — sorted by interactions. Click any card to expand and read its README.
          </p>
        </div>

        {/* ── Cards ─────────────────────────────────────────── */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-28 border border-white/5 bg-white/[0.02] animate-pulse" />
            ))}
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {repos.map((repo, i) => (
              <ProjectCard key={repo.id} repo={repo} index={i} />
            ))}
          </motion.div>
        )}

        {/* ── Footer link ───────────────────────────────────── */}
        <div className="mt-12 flex justify-center">
          <a
            href={`https://github.com/${GITHUB_USER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline group"
          >
            <Terminal size={14} className="group-hover:text-accent-primary" />
            Access Repository Archive
          </a>
        </div>

      </div>
    </section>
  );
};

export default Projects;