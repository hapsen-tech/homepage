// ==================== INTERNATIONALIZATION ====================

// Get user's preferred language
function getPreferredLanguage() {
    // Check localStorage first
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
        return savedLang;
    }

    // Check browser language
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('ko')) {
        return 'ko';
    }

    // Default to English
    return 'en';
}

// Get nested translation value
function getTranslation(lang, key) {
    const keys = key.split('.');
    let value = translations[lang];

    for (const k of keys) {
        if (value && value[k]) {
            value = value[k];
        } else {
            return null;
        }
    }

    return value;
}

// Apply translations to the page
function applyTranslations(lang) {
    // Update text content for elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getTranslation(lang, key);
        if (translation) {
            element.textContent = translation;
        }
    });

    // Update placeholders for form inputs
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        const translation = getTranslation(lang, key);
        if (translation) {
            element.placeholder = translation;
        }
    });

    // Update language button
    const langButton = document.querySelector('.current-lang');
    if (langButton) {
        langButton.textContent = lang.toUpperCase();
    }

    // Update HTML lang attribute
    document.documentElement.lang = lang;

    // Save preference
    localStorage.setItem('preferredLanguage', lang);
}

// Toggle between languages
function toggleLanguage() {
    const currentLang = localStorage.getItem('preferredLanguage') || getPreferredLanguage();
    const newLang = currentLang === 'en' ? 'ko' : 'en';
    applyTranslations(newLang);
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    const preferredLang = getPreferredLanguage();
    applyTranslations(preferredLang);

    // Setup language toggle button
    const languageToggle = document.getElementById('languageToggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', toggleLanguage);
    }
});

// ==================== NAVIGATION ====================

// Smooth scroll for navigation links
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

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Form submission handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);

    // Show success message (in a real app, this would send to a backend)
    const button = contactForm.querySelector('button');
    const originalText = button.textContent;

    button.textContent = 'Sending...';
    button.disabled = true;

    // Simulate form submission
    setTimeout(() => {
        button.textContent = 'Demo Request Sent!';
        button.style.background = 'var(--success-green)';

        // Reset form
        contactForm.reset();

        // Reset button after 3 seconds
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            button.style.background = '';
        }, 3000);
    }, 1500);
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards
document.querySelectorAll('.feature-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observe sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add mobile menu toggle (for future mobile menu implementation)
const createMobileMenu = () => {
    const navLinks = document.querySelector('.nav-links');
    const isMobile = window.innerWidth <= 640;

    if (isMobile && !document.querySelector('.mobile-menu-toggle')) {
        const toggleButton = document.createElement('button');
        toggleButton.classList.add('mobile-menu-toggle');
        toggleButton.innerHTML = '☰';
        toggleButton.style.cssText = `
            display: block;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: var(--text-dark);
            cursor: pointer;
        `;

        toggleButton.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.background = 'white';
                navLinks.style.padding = '1rem';
                navLinks.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            }
        });

        navbar.querySelector('.container').appendChild(toggleButton);
    }
};

// Initialize mobile menu on load and resize
window.addEventListener('load', createMobileMenu);
window.addEventListener('resize', () => {
    if (window.innerWidth > 640) {
        const toggle = document.querySelector('.mobile-menu-toggle');
        if (toggle) toggle.remove();
        document.querySelector('.nav-links').style = '';
    } else {
        createMobileMenu();
    }
});
