// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const typingText = document.getElementById('typing-text');
const contactForm = document.getElementById('contact-form');
const navLinks = document.querySelectorAll('.nav-link');

// Typing Animation
const phrases = [
    "Hi, I'm Sushant Shidurkar",
    "Full Stack Developer",
    "Java & Spring Boot Expert",
    "Vue.js & Angular Specialist",
    "Cloud Solutions Architect"
];

let currentPhraseIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeAnimation() {
    const currentPhrase = phrases[currentPhraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentPhrase.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && currentCharIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pause before next phrase
    }

    setTimeout(typeAnimation, typingSpeed);
}

// Start typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeAnimation, 1000);
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling Navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for navbar height
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav-link[href="#${id}"]`);

        if (scrollPos >= top && scrollPos < top + height) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxBg = document.querySelector('.parallax-bg');
    
    if (parallaxBg) {
        const speed = scrolled * 0.5;
        parallaxBg.style.transform = `translateY(${speed}px)`;
    }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger skill bar animations
            if (entry.target.classList.contains('skills')) {
                animateSkillBars();
            }
        }
    });
}, observerOptions);

// Observe sections for fade-in animations
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Observe individual elements
const fadeElements = document.querySelectorAll('.skill-card, .timeline-item, .project-card, .highlight-card');
fadeElements.forEach(element => {
    element.classList.add('fade-in');
    observer.observe(element);
});

// Skill Bar Animation
function animateSkillBars() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach((card, index) => {
        setTimeout(() => {
            const progressBar = card.querySelector('.progress-bar');
            const percentage = progressBar.getAttribute('data-width');
            
            // Add animation class
            card.style.animationDelay = `${index * 0.1}s`;
            
            // Animate progress bar
            setTimeout(() => {
                progressBar.style.width = percentage;
            }, index * 100);
            
            // Animate percentage counter
            const percentageElement = card.querySelector('.skill-percentage');
            const targetPercentage = parseInt(percentage);
            animateCounter(percentageElement, targetPercentage, 2000);
            
        }, index * 150);
    });
}

// Counter Animation
function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '%';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '%';
        }
    }, 16);
}

// Form Validation Functions
function validateForm() {
    let isValid = true;
    
    // Get form elements by their specific IDs
    const nameField = document.getElementById('contact-name');
    const emailField = document.getElementById('contact-email');
    const subjectField = document.getElementById('contact-subject');
    const messageField = document.getElementById('contact-message');
    
    // Clear previous errors
    clearErrors();
    
    // Validate name
    if (!nameField.value.trim()) {
        showFieldError('name-error', 'Name is required');
        isValid = false;
    }
    
    // Validate email
    if (!emailField.value.trim()) {
        showFieldError('email-error', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(emailField.value.trim())) {
        showFieldError('email-error', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate subject
    if (!subjectField.value.trim()) {
        showFieldError('subject-error', 'Subject is required');
        isValid = false;
    }
    
    // Validate message
    if (!messageField.value.trim()) {
        showFieldError('message-error', 'Message is required');
        isValid = false;
    } else if (messageField.value.trim().length < 10) {
        showFieldError('message-error', 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    return isValid;
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
}

function showFieldError(errorId, message) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        errorElement.style.color = '#ff006e';
        errorElement.style.fontSize = '0.875rem';
        errorElement.style.marginTop = '0.5rem';
    }
}

// Contact Form Handling
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
        return;
    }
    
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    // Get form data
    const formData = {
        name: document.getElementById('contact-name').value.trim(),
        email: document.getElementById('contact-email').value.trim(),
        subject: document.getElementById('contact-subject').value.trim(),
        message: document.getElementById('contact-message').value.trim()
    };
    
    // Show loading state
    btnText.style.opacity = '0';
    btnLoader.classList.remove('hidden');
    submitBtn.disabled = true;
    
    try {
        // Simulate form submission (replace with actual form handling)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
        clearErrors();
        
    } catch (error) {
        showNotification('Failed to send message. Please try again.', 'error');
    } finally {
        // Reset button state
        btnText.style.opacity = '1';
        btnLoader.classList.add('hidden');
        submitBtn.disabled = false;
    }
});

// Email Validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">
                ${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}
            </span>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        z-index: 10000;
        background: ${type === 'success' ? '#00d9ff' : type === 'error' ? '#ff006e' : '#8338ec'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        transform: translateX(400px);
        transition: transform 0.3s ease-out;
        max-width: 400px;
        backdrop-filter: blur(20px);
        font-family: var(--font-family);
    `;
    
    // Style notification content
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.75rem;
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: auto;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    closeBtn.addEventListener('click', () => {
        hideNotification(notification);
    });
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        hideNotification(notification);
    }, 5000);
}

function hideNotification(notification) {
    if (notification && notification.parentNode) {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
}

// Download Resume Function
function downloadResume() {
    // Create a notification since we don't have an actual resume file
    showNotification('Resume download will be available soon. Please contact me directly for now.', 'info');
    
    // In a real implementation, you would link to an actual PDF file:
    // const link = document.createElement('a');
    // link.href = '/path/to/sushant-shidurkar-resume.pdf';
    // link.download = 'Sushant_Shidurkar_Resume.pdf';
    // link.click();
}

// Social Links Analytics
function trackSocialClick(platform) {
    console.log(`Social link clicked: ${platform}`);
    showNotification(`Opening ${platform} profile...`, 'info');
    // In a real implementation, you might track this with Google Analytics:
    // gtag('event', 'social_click', { platform: platform });
}

// Scroll to Top Function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--gradient-primary);
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: var(--shadow-primary);
    `;
    
    scrollBtn.addEventListener('click', scrollToTop);
    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.transform = 'translateY(-3px)';
    });
    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.transform = 'translateY(0)';
    });
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
}

// Project Card Hover Effects
function initializeProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Add subtle glow effect
            card.style.boxShadow = 'var(--shadow-primary)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '';
        });
    });
}

// Lazy Loading for Images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                
                img.onload = () => {
                    img.style.opacity = '1';
                };
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Keyboard Navigation Support
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Enter key on focused elements
    if (e.key === 'Enter') {
        const focused = document.activeElement;
        if (focused.classList.contains('nav-link')) {
            focused.click();
        }
    }
});

// Performance Optimization: Throttle Scroll Events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    updateActiveNavLink();
}, 100);

window.addEventListener('scroll', throttledScrollHandler);

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createScrollToTopButton();
    initializeProjectCards();
    initializeLazyLoading();
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // Initialize form input focus effects
    const formInputs = document.querySelectorAll('.form-control');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
        
        // Clear any field errors when user starts typing
        input.addEventListener('input', () => {
            const fieldId = input.id;
            const errorId = fieldId.replace('contact-', '') + '-error';
            const errorElement = document.getElementById(errorId);
            if (errorElement) {
                errorElement.style.display = 'none';
            }
        });
    });
});

// Preload critical images
function preloadImages() {
    const criticalImages = [
        'https://pplx-res.cloudinary.com/image/upload/v1755000352/pplx_project_search_images/17093d2c3ac9d83d866ff76fc119acaf651d465a.png',
        'https://pplx-res.cloudinary.com/image/upload/v1755106609/pplx_project_search_images/5ba129cfb40b51d28bff8e3a47a7613f97d5e14b.png'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

preloadImages();

// Console welcome message
console.log(`
🚀 Welcome to Sushant Shidurkar's Portfolio!
💼 Full Stack Developer | 9+ Years Experience
🛠️ Java, Spring Boot, Vue.js, Angular, Node.js
☁️ Azure Cloud Solutions
📧 Contact: sushantshidurkar@gmail.com
🔗 LinkedIn: https://www.linkedin.com/in/sushant-shidurkar

Built with passion and modern web technologies! 
`);

// Export functions for global access
window.downloadResume = downloadResume;
window.scrollToTop = scrollToTop;
window.trackSocialClick = trackSocialClick;