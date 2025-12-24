import React, { useEffect, useRef } from 'react';

const About = () => {
  const sectionRef = useRef(null);

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

  return (
    <section id="about" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 reveal">
            About <span className="gradient-text">Me</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <h3 className="text-2xl font-semibold mb-6">Who I Am</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                I'm Alidu Anthony, a Computer Science student at Elizade University and a passionate Software Developer.
                My journey in tech started with a curiosity about how things work behind the scenes, which led me to
                explore programming, web development, and software architecture.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                I specialize in creating innovative solutions that make a difference. Whether it's building robust
                backend systems, designing intuitive user interfaces, or developing secure APIs, I approach each
                project with dedication and attention to detail.
              </p>
              <p className="text-gray-300 leading-relaxed">
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
                or sharing knowledge with the developer community.
              </p>
            </div>

            <div className="reveal">
              <div className="glass-card p-8">
                <h3 className="text-2xl font-semibold mb-6">Quick Facts</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Location</span>
                    <span className="text-white">Nigeria</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Education</span>
                    <span className="text-white">Elizade University</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Experience</span>
                    <span className="text-white">3+ Years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Specialization</span>
                    <span className="text-white">Full-Stack Development</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;