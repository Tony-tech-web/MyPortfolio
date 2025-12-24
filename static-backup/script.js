/**
 * Portfolio Script - Simplified & Fixed
 */

// ===== TYPING ANIMATION =====
function initTyping() {
    const element = document.querySelector('.typing-text');
    if (!element) return;

    const words = ["Software Developer", "Tech Innovator", "UI/UX Enthusiast", "Java Specialist"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        element.textContent = currentWord.substring(0, charIndex);

        let speed = isDeleting ? 50 : 150;

        if (!isDeleting && charIndex === currentWord.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            speed = 500;
        }

        setTimeout(type, speed);
    }

    type();
}

// ===== DATA =====
const projects = [
    {
        title: "Virtual Personal Stylist",
        tag: "JavaFX",
        description: "Desktop app for outfit selection based on weather/preferences.",
        link: "#"
    },
    {
        title: "Blockchain Certificate Verifier",
        tag: "Java",
        description: "Secure system to authenticate academic certificates using blockchain.",
        link: "#"
    },
    {
        title: "Attendance System",
        tag: "Streamlit",
        description: "Automated tracking utilizing QR codes for efficient attendance.",
        link: "#"
    },
    {
        title: "Portfolio Website",
        tag: "Web Dev",
        description: "Modern, glassmorphism portfolio showcasing my skills.",
        link: "https://github.com/Tony-tech-web/My-Portfolio"
    }
];

const blogs = [
    {
        title: "Java 21 Features You Should Know",
        date: "Dec 2024",
        excerpt: "Deep dive into Virtual Threads and Pattern Matching.",
        link: "#"
    },
    {
        title: "Building Glassmorphism UIs",
        date: "Nov 2024",
        excerpt: "Perfect the frosted glass effect using CSS backdrop-filter.",
        link: "#"
    },
    {
        title: "Why I Use Streamlit",
        date: "Oct 2024",
        excerpt: "Rapidly build data apps without distinct frontend code.",
        link: "#"
    }
];

// ===== RENDER CONTENT =====
function renderProjects() {
    const container = document.getElementById('projects-container');
    if (!container) {
        console.error('Projects container not found!');
        return;
    }

    const html = projects.map(project => `
        <div class="project-card glass-card">
            <div class="project-info">
                <h3>${project.title}</h3>
                <span class="tag">${project.tag}</span>
                <p>${project.description}</p>
                <a href="${project.link}" ${project.link.startsWith('http') ? 'target="_blank"' : ''} class="btn-text">
                    View Project <i class="fa-solid fa-arrow-right"></i>
                </a>
            </div>
        </div>
    `).join('');

    container.innerHTML = html;
    console.log('✅ Projects rendered:', projects.length);
}

function renderBlogs() {
    const container = document.getElementById('blog-container');
    if (!container) {
        console.error('Blog container not found!');
        return;
    }

    const html = blogs.map(blog => `
        <div class="project-card glass-card">
            <div class="project-info">
                <h3>${blog.title}</h3>
                <span class="tag" style="border-color: var(--secondary-color); color: var(--secondary-color);">
                    ${blog.date}
                </span>
                <p>${blog.excerpt}</p>
                <a href="${blog.link}" class="btn-text">
                    Read More <i class="fa-solid fa-arrow-right"></i>
                </a>
            </div>
        </div>
    `).join('');

    container.innerHTML = html;
    console.log('✅ Blogs rendered:', blogs.length);
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    const header = document.querySelector('header');
    const reveals = document.querySelectorAll('.reveal');

    // Header
    window.addEventListener('scroll', () => {
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 50);
        }
    });

    // Reveal animations
    function checkReveal() {
        const triggerBottom = window.innerHeight * 0.85;
        reveals.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.classList.add('active');
                el.classList.remove('hidden');
            }
        });
    }

    window.addEventListener('scroll', checkReveal);
    setTimeout(checkReveal, 100);
    checkReveal();
}

// ===== THEME TOGGLE =====
function initTheme() {
    const toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        const icon = toggle.querySelector('i');
        if (icon) {
            icon.className = theme === 'light' ? 'fa-regular fa-moon' : 'fa-regular fa-sun';
        }
        localStorage.setItem('theme', theme);
    }

    const saved = localStorage.getItem('theme') || 'dark';
    setTheme(saved);

    toggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'dark';
        setTheme(current === 'dark' ? 'light' : 'dark');
    });
}

// ===== FORM =====
function initForm() {
    const form = document.getElementById('form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.textContent;

        btn.textContent = 'Sending...';
        btn.disabled = true;

        try {
            const formData = new FormData(form);
            formData.append("access_key", "e21d1feb-100a-4c99-9bda-39e0c116342c");

            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            if (res.ok) {
                alert("Message sent successfully!");
                form.reset();
            } else {
                alert("Failed to send message.");
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred.");
        } finally {
            btn.textContent = originalText;
            btn.disabled = false;
        }
    });
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Portfolio initializing...');
    
    initTyping();
    renderProjects();
    renderBlogs();
    initScrollEffects();
    initTheme();
    initForm();
    
    console.log('✅ Portfolio ready!');
});
