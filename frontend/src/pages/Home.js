import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, blogRes] = await Promise.all([
          axios.get('http://localhost:3001/api/projects'),
          axios.get('http://localhost:3001/api/blog')
        ]);
        setProjects(projectsRes.data.slice(0, 3));
        setBlogPosts(blogRes.data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Hi, I'm <span className="text-blue-400">Alidu Anthony</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Software Developer specializing in Web Development, Java, UI/UX, and innovative tech solutions.
          </p>
          <div className="space-x-4">
            <a href="#projects" className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold transition-colors">
              View My Work
            </a>
            <a href="#contact" className="border border-blue-400 hover:bg-blue-400 hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-colors">
              Get In Touch
            </a>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Projects</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map(project => (
              <div key={project.id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
                <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map(tech => (
                    <span key={tech} className="bg-blue-600 px-2 py-1 rounded text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  {project.github_url && (
                    <a href={project.github_url} className="text-blue-400 hover:text-blue-300">
                      GitHub
                    </a>
                  )}
                  {project.live_url && (
                    <a href={project.live_url} className="text-blue-400 hover:text-blue-300">
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Recent Blog Posts</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map(post => (
              <div key={post.id} className="bg-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
                <p className="text-gray-300 mb-4">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map(tag => (
                    <span key={tag} className="bg-green-600 px-2 py-1 rounded text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                <a href={`/blog/${post.id}`} className="text-blue-400 hover:text-blue-300">
                  Read More →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;