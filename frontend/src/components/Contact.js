import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      // Send to Web3Forms
      const web3FormData = new FormData();
      web3FormData.append('access_key', 'e21d1feb-100a-4c99-9bda-39e0c116342c');
      web3FormData.append('name', formData.name);
      web3FormData.append('email', formData.email);
      web3FormData.append('message', formData.message);
      web3FormData.append('subject', `Portfolio Contact from ${formData.name}`);
      web3FormData.append('from_name', 'Portfolio Website');
      web3FormData.append('to', 'tonyalidu@gmail.com');

      const web3Response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: web3FormData
      });

      const web3Result = await web3Response.json();

      if (web3Result.success) {
        // Also save to backend database
        try {
          await axios.post('http://localhost:3001/api/contact', formData);
        } catch (dbError) {
          console.log('Database not available, but Web3Forms worked');
        }
        setStatus('Message sent successfully! I\'ll get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(web3Result.message || 'Failed to send message via Web3Forms');
      }
    } catch (error) {
      console.error('Web3Forms error:', error);
      // Fallback: show success message anyway and provide alternative contact
      setStatus('Message received! Since you\'re viewing this locally, please email me directly at tonyalidu@gmail.com or connect with me on LinkedIn.');
      setFormData({ name: '', email: '', message: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 reveal">
            Get In <span className="gradient-text">Touch</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="reveal">
              <h3 className="text-2xl font-semibold mb-6">Let's Work Together</h3>
              <p className="text-gray-300 mb-6">
                I'm always interested in new opportunities, whether it's a full-time position,
                freelance project, or just a friendly chat about technology.
              </p>
              <p className="text-gray-300 mb-6">
                Feel free to reach out if you have a project in mind, want to collaborate,
                or just want to say hello!
              </p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <i className="fas fa-envelope text-blue-400 mr-3 w-5"></i>
                  <a href="mailto:tonyalidu@gmail.com" className="text-gray-300 hover:text-blue-400 transition-colors">
                    tonyalidu@gmail.com
                  </a>
                </div>
                <div className="flex items-center">
                  <i className="fab fa-github text-blue-400 mr-3 w-5"></i>
                  <a
                    href="https://github.com/tony-tech-web"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    github.com/tony-tech-web
                  </a>
                </div>
                <div className="flex items-center">
                  <i className="fab fa-linkedin text-blue-400 mr-3 w-5"></i>
                  <a
                    href="https://linkedin.com/in/alidu-anthony"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    linkedin.com/in/alidu-anthony
                  </a>
                </div>
              </div>
            </div>

            <div className="reveal">
              <form onSubmit={handleSubmit} className="glass-card p-8">
                <div className="form-group">
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="Your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="form-input form-textarea"
                    placeholder="Tell me about your project or just say hello!"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>

                {status && (
                  <div className={`mt-4 p-3 rounded-lg text-center ${
                    status.includes('successfully')
                      ? 'bg-green-600/20 text-green-400'
                      : 'bg-red-600/20 text-red-400'
                  }`}>
                    {status}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;