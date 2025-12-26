import React, { useEffect, useRef, useState } from 'react';

const Projects = () => {
  const sectionRef = useRef(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    const reveals = sectionRef.current.querySelectorAll('.reveal');
    reveals.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Static project data for testing
    const staticProjects = [
      {
        id: 1,
        title: 'Virtual Personal Stylist',
        description: 'JavaFX desktop application with AI for outfit selection based on weather and preferences.',
        technologies: ['Java', 'JavaFX', 'AI', 'Weather API'],
        github_url: 'https://github.com/tony-tech-web/VirtualStylist',
        language: 'Java',
        stars: 12,
        forks: 3,
        isGitHub: false
      },
      {
        id: 2,
        title: 'Nexus - Product Order Manager',
        description: 'Full-stack web application for managing product orders and inventory.',
        technologies: ['TypeScript', 'Node.js', 'React', 'PostgreSQL'],
        github_url: 'https://github.com/tony-tech-web/Nexus',
        language: 'TypeScript',
        stars: 8,
        forks: 2,
        isGitHub: false
      },
      {
        id: 3,
        title: 'Dropshop E-commerce Website',
        description: 'Full-stack e-commerce platform with modern UI and payment integration.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'MongoDB'],
        github_url: 'https://github.com/tony-tech-web/Dropshop-website',
        language: 'JavaScript',
        stars: 6,
        forks: 1,
        isGitHub: false
      },
      {
        id: 4,
        title: 'News Website',
        description: 'Full-stack news aggregation website with user authentication and responsive design.',
        technologies: ['JavaScript', 'Node.js', 'Express', 'MongoDB'],
        github_url: 'https://github.com/Tony-tech-web/News-Website',
        language: 'JavaScript',
        stars: 5,
        forks: 2,
        isGitHub: false
      },
      {
        id: 5,
        title: 'Advanced News Website',
        description: 'Comprehensive full-stack news platform with real-time updates, user authentication, article management, and modern responsive design.',
        technologies: ['JavaScript', 'Node.js', 'Express', 'MongoDB', 'React'],
        github_url: 'https://github.com/tony-tech-web/advanced-news-website',
        language: 'JavaScript',
        stars: 7,
        forks: 3,
        isGitHub: false
      },
      {
        id: 6,
        title: 'Full-Stack React Website',
        description: 'Modern full-stack web application built with React, Vite, and Node.js.',
        technologies: ['React', 'Vite', 'Node.js', 'TypeScript'],
        github_url: 'https://github.com/Tony-tech-web/MyPortfolio',
        language: 'TypeScript',
        stars: 7,
        forks: 2,
        isGitHub: false
      },
    ];

    console.log('Projects loaded:', staticProjects);
    setProjects(staticProjects);
    setLoading(false);
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 reveal">
            Featured <span className="gradient-text">Projects</span>
          </h2>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
              <p className="mt-4 text-gray-400">Loading projects...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="glass-card p-6 hover:scale-105 transition-transform duration-300 reveal"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    {project.language && (
                      <span className="px-2 py-1 bg-gray-700 text-xs rounded text-gray-300">
                        {project.language}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-300 mb-4 line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map(tech => (
                      <span key={tech} className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center space-x-4 mb-4 text-sm text-gray-400">
                    {project.stars !== undefined && (
                      <span className="flex items-center">
                        <i className="fas fa-star mr-1 text-yellow-400"></i>
                        {project.stars}
                      </span>
                    )}
                    {project.forks !== undefined && (
                      <span className="flex items-center">
                        <i className="fas fa-code-branch mr-1"></i>
                        {project.forks}
                      </span>
                    )}
                  </div>
                  <div className="flex space-x-4">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <i className="fab fa-github mr-1"></i>Code
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12 reveal">
            <p className="text-gray-400">
              More projects available on{' '}
              <a
                href="https://github.com/tony-tech-web"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                GitHub
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;