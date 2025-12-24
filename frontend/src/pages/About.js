import React from 'react';

const About = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-12">About Me</h1>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-semibold mb-6">Who I Am</h2>
              <p className="text-gray-300 mb-6">
                I'm Alidu Anthony, a passionate software developer with expertise in full-stack development,
                Java programming, and modern web technologies. I love creating innovative solutions that
                make a difference.
              </p>
              <p className="text-gray-300 mb-6">
                My journey in tech started with a curiosity about how things work behind the scenes.
                This led me to explore programming, web development, and software architecture.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-6">Skills & Technologies</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Frontend</h3>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>React</li>
                    <li>JavaScript/TypeScript</li>
                    <li>HTML/CSS</li>
                    <li>Tailwind CSS</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Backend</h3>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>Node.js</li>
                    <li>Express</li>
                    <li>Java</li>
                    <li>PostgreSQL</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Tools</h3>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>Git</li>
                    <li>Docker</li>
                    <li>VS Code</li>
                    <li>Postman</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Other</h3>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>UI/UX Design</li>
                    <li>Agile/Scrum</li>
                    <li>REST APIs</li>
                    <li>Testing</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;