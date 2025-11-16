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

    // Match browser language to supported languages
    if (browserLang.startsWith('ko')) {
        return 'ko';
    } else if (browserLang.startsWith('ja')) {
        return 'ja';
    } else if (browserLang.startsWith('zh')) {
        return 'zh';
    } else if (browserLang.startsWith('es')) {
        return 'es';
    } else if (browserLang.startsWith('ar')) {
        return 'ar';
    } else if (browserLang.startsWith('pt')) {
        return 'pt';
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

    // Update text direction for RTL languages (e.g., Arabic, Hebrew)
    const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
    if (rtlLanguages.includes(lang)) {
        document.documentElement.setAttribute('dir', 'rtl');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
    }

    // Save preference
    localStorage.setItem('preferredLanguage', lang);
}

// Toggle language dropdown
function toggleLanguageDropdown() {
    const dropdown = document.getElementById('languageDropdown');
    const toggle = document.getElementById('languageToggle');
    const isOpen = dropdown.classList.contains('open');

    if (isOpen) {
        dropdown.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
    } else {
        dropdown.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
        // Focus first menu item for keyboard navigation
        const firstButton = dropdown.querySelector('button');
        if (firstButton) firstButton.focus();
    }
}

// Change language
function changeLanguage(lang) {
    applyTranslations(lang);

    // Close dropdown
    const dropdown = document.getElementById('languageDropdown');
    const toggle = document.getElementById('languageToggle');
    dropdown.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');

    // Update active state
    updateActiveLanguage(lang);
}

// Update active language in dropdown
function updateActiveLanguage(lang) {
    const buttons = document.querySelectorAll('.language-dropdown button');
    buttons.forEach(button => {
        if (button.getAttribute('data-lang') === lang) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    const preferredLang = getPreferredLanguage();
    applyTranslations(preferredLang);
    updateActiveLanguage(preferredLang);

    // Setup language toggle button
    const languageToggle = document.getElementById('languageToggle');
    const languageDropdown = document.getElementById('languageDropdown');

    if (languageToggle && languageDropdown) {
        // Toggle dropdown on button click
        languageToggle.addEventListener('click', toggleLanguageDropdown);

        // Language selection
        const languageButtons = languageDropdown.querySelectorAll('button');
        languageButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const lang = button.getAttribute('data-lang');
                changeLanguage(lang);
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!languageToggle.contains(e.target) && !languageDropdown.contains(e.target)) {
                languageDropdown.classList.remove('open');
                languageToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Keyboard navigation
        languageToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && languageDropdown.classList.contains('open')) {
                languageDropdown.classList.remove('open');
                languageToggle.setAttribute('aria-expanded', 'false');
                languageToggle.focus();
            }
        });

        languageDropdown.addEventListener('keydown', (e) => {
            const buttons = Array.from(languageDropdown.querySelectorAll('button'));
            const currentIndex = buttons.indexOf(document.activeElement);

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                const nextIndex = (currentIndex + 1) % buttons.length;
                buttons[nextIndex].focus();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                const prevIndex = (currentIndex - 1 + buttons.length) % buttons.length;
                buttons[prevIndex].focus();
            } else if (e.key === 'Escape') {
                languageDropdown.classList.remove('open');
                languageToggle.setAttribute('aria-expanded', 'false');
                languageToggle.focus();
            }
        });
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

// Form submission handling with Formspree
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const button = contactForm.querySelector('button');
    const originalText = button.textContent;
    const formData = new FormData(contactForm);
    const currentLang = localStorage.getItem('preferredLanguage') || 'en';
    const formStatus = document.getElementById('formStatus');

    // Show sending state
    const sendingText = getTranslation(currentLang, 'contact.form.sending');
    button.textContent = sendingText;
    button.disabled = true;
    formStatus.textContent = sendingText;

    try {
        // Submit to Formspree
        const response = await fetch(contactForm.action, {
            method: contactForm.method,
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            // Success - show success message
            const successText = getTranslation(currentLang, 'contact.form.success');
            button.textContent = successText;
            button.style.background = 'var(--success-green)';
            formStatus.textContent = successText;

            // Reset form
            contactForm.reset();

            // Reset button after 3 seconds
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
                button.style.background = '';
                formStatus.textContent = '';
            }, 3000);
        } else {
            // Error from Formspree
            const data = await response.json();
            let errorMessage = getTranslation(currentLang, 'contact.form.error');

            if (data.errors) {
                errorMessage = data.errors.map(error => error.message).join(', ');
            }

            button.textContent = errorMessage;
            button.disabled = false;
            formStatus.textContent = errorMessage;

            // Reset button after 5 seconds
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
                formStatus.textContent = '';
            }, 5000);
        }
    } catch (error) {
        // Network error
        const networkErrorText = getTranslation(currentLang, 'contact.form.networkError');
        button.textContent = networkErrorText;
        button.disabled = false;
        formStatus.textContent = networkErrorText;

        // Reset button after 5 seconds
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
            formStatus.textContent = '';
        }, 5000);
    }
});

// Intersection Observer for fade-in animations
// Check if user prefers reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
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
}

// Mobile menu implementation
const createMobileMenu = () => {
    const navLinks = document.querySelector('.nav-links');
    const container = navbar.querySelector('.container');
    const isMobile = window.innerWidth <= 640;

    if (isMobile && !document.querySelector('.mobile-menu-toggle')) {
        const toggleButton = document.createElement('button');
        toggleButton.classList.add('mobile-menu-toggle');
        toggleButton.setAttribute('aria-label', 'Toggle navigation menu');
        toggleButton.setAttribute('aria-expanded', 'false');
        toggleButton.setAttribute('aria-controls', 'nav-links');
        toggleButton.innerHTML = '<span aria-hidden="true">☰</span>';

        navLinks.setAttribute('id', 'nav-links');
        navLinks.classList.add('mobile-hidden');

        toggleButton.addEventListener('click', () => {
            const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
            toggleButton.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('mobile-visible');
            navLinks.classList.toggle('mobile-hidden');
            toggleButton.innerHTML = isExpanded ? '<span aria-hidden="true">☰</span>' : '<span aria-hidden="true">✕</span>';
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('mobile-visible');
                navLinks.classList.add('mobile-hidden');
                toggleButton.setAttribute('aria-expanded', 'false');
                toggleButton.innerHTML = '<span aria-hidden="true">☰</span>';
            });
        });

        container.appendChild(toggleButton);
    }
};

// Initialize mobile menu on load and resize
window.addEventListener('load', createMobileMenu);
window.addEventListener('resize', () => {
    if (window.innerWidth > 640) {
        const toggle = document.querySelector('.mobile-menu-toggle');
        if (toggle) toggle.remove();
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.remove('mobile-visible', 'mobile-hidden');
    } else {
        createMobileMenu();
    }
});
