// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);

if (currentTheme === 'dark') {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    themeToggle.innerHTML = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// Mobile Navigation
const navToggle = document.getElementById('nav-toggle');
const navList = document.querySelector('.nav-list');

navToggle.addEventListener('click', () => {
    navList.classList.toggle('show');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('show');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active Navigation Link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNavLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Header Scroll Effect
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = document.documentElement.getAttribute('data-theme') === 'dark' 
            ? 'rgba(26, 32, 44, 0.98)' 
            : 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = document.documentElement.getAttribute('data-theme') === 'dark' 
            ? 'rgba(26, 32, 44, 0.95)' 
            : 'rgba(255, 255, 255, 0.95)';
    }
});

// Projects Carousel
let currentProject = 0;
const projectCards = document.querySelectorAll('.project-card');
const prevBtn = document.getElementById('prev-project');
const nextBtn = document.getElementById('next-project');

function showProject(index) {
    projectCards.forEach((card, i) => {
        card.classList.toggle('active', i === index);
    });
}

prevBtn.addEventListener('click', () => {
    currentProject = currentProject === 0 ? projectCards.length - 1 : currentProject - 1;
    showProject(currentProject);
});

nextBtn.addEventListener('click', () => {
    currentProject = currentProject === projectCards.length - 1 ? 0 : currentProject + 1;
    showProject(currentProject);
});

// Auto-advance projects every 5 seconds
setInterval(() => {
    currentProject = currentProject === projectCards.length - 1 ? 0 : currentProject + 1;
    showProject(currentProject);
}, 5000);

// Testimonials Slider
let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');

function showTestimonial(index) {
    testimonialCards.forEach((card, i) => {
        card.classList.toggle('active', i === index);
    });
    
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
    });
});

// Auto-advance testimonials every 6 seconds
setInterval(() => {
    currentTestimonial = currentTestimonial === testimonialCards.length - 1 ? 0 : currentTestimonial + 1;
    showTestimonial(currentTestimonial);
}, 6000);

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Animate skill bars
            if (entry.target.classList.contains('skill-progress')) {
                const width = entry.target.style.width;
                entry.target.style.width = '0%';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 100);
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .skill-progress').forEach(el => {
    observer.observe(el);
});

// Add animation classes to elements
document.querySelectorAll('.section-title, .section-subtitle').forEach(el => {
    el.classList.add('fade-in');
});

document.querySelectorAll('.about-text, .contact-info').forEach(el => {
    el.classList.add('slide-in-left');
});

document.querySelectorAll('.about-image, .contact-form').forEach(el => {
    el.classList.add('slide-in-right');
});

document.querySelectorAll('.service-card, .timeline-item, .project-card').forEach(el => {
    el.classList.add('fade-in');
});

// Contact Form
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('.btn');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.innerHTML = '<span class="loading"></span> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        submitBtn.textContent = 'Message Sent!';
        submitBtn.style.background = '#22c55e';
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
            contactForm.reset();
        }, 2000);
    }, 2000);
});

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Typing Animation for Hero Title
const typedTextElement = document.querySelector('.typed-text');
if (typedTextElement) {
    const textArray = ['Sushant Shidurkar', 'Full Stack Developer', 'Cloud Architect', 'Tech Enthusiast'];
    let textIndex = 0;
    let charIndex = 0;
    let currentText = '';
    let isDeleting = false;

    function typeEffect() {
        if (textIndex < textArray.length) {
            if (!isDeleting && charIndex < textArray[textIndex].length) {
                currentText += textArray[textIndex].charAt(charIndex);
                typedTextElement.textContent = currentText;
                charIndex++;
                setTimeout(typeEffect, 100);
            } else if (isDeleting && charIndex > 0) {
                currentText = textArray[textIndex].substring(0, charIndex - 1);
                typedTextElement.textContent = currentText;
                charIndex--;
                setTimeout(typeEffect, 50);
            } else {
                isDeleting = !isDeleting;
                if (!isDeleting) {
                    textIndex++;
                    if (textIndex >= textArray.length) {
                        textIndex = 0;
                    }
                }
                setTimeout(typeEffect, 1000);
            }
        }
    }

    // Start typing effect after page load
    setTimeout(typeEffect, 1000);
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Initialize AOS (Animate On Scroll) alternative
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    
    const checkVisibility = () => {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    };
    
    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Check on load
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    updateActiveNavLink();
});

// Performance optimization: Debounce scroll events
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(() => {
    updateActiveNavLink();
}));
