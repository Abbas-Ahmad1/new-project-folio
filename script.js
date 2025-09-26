// DOM elements
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('theme-toggle');
const typewriterText = document.getElementById('typewriter-text');
const contactForm = document.getElementById('contact-form');
const toast = document.getElementById('toast');
const toastClose = document.getElementById('toast-close');

// Typewriter effect for hero section
const typewriterPhrases = [
    'Computer Science Student',
    'Full-Stack Developer',
    'Problem Solver',
    'Tech Enthusiast'
];

let currentPhrase = 0;
let currentChar = 0;
let isDeleting = false;
let typewriterSpeed = 150;

function typeWriter() {
    const current = typewriterPhrases[currentPhrase];
    
    if (isDeleting) {
        // Remove characters
        typewriterText.textContent = current.substring(0, currentChar - 1);
        currentChar--;
        typewriterSpeed = 75;
    } else {
        // Add characters
        typewriterText.textContent = current.substring(0, currentChar + 1);
        currentChar++;
        typewriterSpeed = 150;
    }

    // Check if word is complete
    if (!isDeleting && currentChar === current.length) {
        // Pause at end of word
        typewriterSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && currentChar === 0) {
        isDeleting = false;
        currentPhrase = (currentPhrase + 1) % typewriterPhrases.length;
        typewriterSpeed = 500;
    }

    setTimeout(typeWriter, typewriterSpeed);
}

// Start typewriter effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    typeWriter();
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Intersection Observer for active nav links
const sections = document.querySelectorAll('section');
const navLinkMap = {
    'home': 'home',
    'about': 'about',
    'skills': 'skills',
    'projects': 'projects',
    'contact': 'contact'
};

const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -80% 0px',
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            
            // Remove active class from all nav links
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to current section's nav link
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}, observerOptions);

// Observe all sections
sections.forEach(section => {
    observer.observe(section);
});

// Theme toggle functionality
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark');
        themeToggle.textContent = '☀️';
    } else {
        document.body.classList.remove('dark');
        themeToggle.textContent = '🌙';
    }
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    
    if (document.body.classList.contains('dark')) {
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
});

// Initialize theme on page load
initTheme();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Form validation and submission
function validateForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    
    let isValid = true;
    
    // Reset error states
    [nameError, emailError, messageError].forEach(error => {
        error.classList.remove('show');
    });
    
    // Validate name
    if (!name.value.trim()) {
        nameError.textContent = 'Name is required';
        nameError.classList.add('show');
        isValid = false;
    } else if (name.value.trim().length < 2) {
        nameError.textContent = 'Name must be at least 2 characters';
        nameError.classList.add('show');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        emailError.textContent = 'Email is required';
        emailError.classList.add('show');
        isValid = false;
    } else if (!emailRegex.test(email.value.trim())) {
        emailError.textContent = 'Please enter a valid email address';
        emailError.classList.add('show');
        isValid = false;
    }
    
    // Validate message
    if (!message.value.trim()) {
        messageError.textContent = 'Message is required';
        messageError.classList.add('show');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        messageError.textContent = 'Message must be at least 10 characters';
        messageError.classList.add('show');
        isValid = false;
    }
    
    return isValid;
}

// Handle form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validateForm()) {
        // Show success toast
        showToast();
        
        // Reset form
        contactForm.reset();
        
        // Clear any remaining error messages
        document.querySelectorAll('.error-message').forEach(error => {
            error.classList.remove('show');
        });
    }
});

// Toast notification functions
function showToast() {
    toast.classList.add('show');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        hideToast();
    }, 5000);
}

function hideToast() {
    toast.classList.remove('show');
}

// Close toast when X is clicked
toastClose.addEventListener('click', hideToast);

// Add input event listeners for real-time validation
document.getElementById('name').addEventListener('input', function() {
    const nameError = document.getElementById('name-error');
    if (this.value.trim().length >= 2) {
        nameError.classList.remove('show');
    }
});

document.getElementById('email').addEventListener('input', function() {
    const emailError = document.getElementById('email-error');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(this.value.trim())) {
        emailError.classList.remove('show');
    }
});

document.getElementById('message').addEventListener('input', function() {
    const messageError = document.getElementById('message-error');
    if (this.value.trim().length >= 10) {
        messageError.classList.remove('show');
    }
});

// Add loading states and animations to enhance user experience
document.addEventListener('DOMContentLoaded', () => {
    // Add subtle entrance animations to elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Apply fade-in animation to skill cards and project cards
    const animatedElements = document.querySelectorAll('.skill-card, .project-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animationObserver.observe(el);
    });
});

// Performance optimization: Throttle scroll events
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

// Apply throttling to scroll event
window.addEventListener('scroll', throttle(() => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, 100));

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Close toast with Escape key
    if (e.key === 'Escape' && toast.classList.contains('show')) {
        hideToast();
    }
    
    // Toggle theme with Ctrl/Cmd + Shift + D
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        themeToggle.click();
    }
});

// Add focus management for accessibility
document.addEventListener('DOMContentLoaded', () => {
    // Ensure proper focus order and visibility
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid var(--primary-color)';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = '';
            element.style.outlineOffset = '';
        });
    });
});

// Handle reduced motion preferences
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable animations for users who prefer reduced motion
    document.documentElement.style.scrollBehavior = 'auto';
    
    // Reduce typewriter speed
    typewriterSpeed = 50;
}