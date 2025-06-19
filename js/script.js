// ===== GLOBAL VARIABLES =====
let isMenuOpen = false;

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeGallery();
    initializeFAQ();
    initializeContactForm();
    initializeLightbox();
});

// ===== NAVIGATION =====
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                toggleMobileMenu();
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            toggleMobileMenu();
        }
    });

    // Handle navbar scroll effect
    window.addEventListener('scroll', handleNavbarScroll);
}

function toggleMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    isMenuOpen = !isMenuOpen;
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
}

function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 26, 26, 0.98)';
        navbar.style.backdropFilter = 'blur(15px)';
    } else {
        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    // Smooth reveal animations on scroll
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

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll(
        '.service-card, .pricing-card, .gallery-item, .stat-card, .contact-item, .faq-item'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Parallax effect for hero background
    window.addEventListener('scroll', () => {
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroImage.style.transform = `translateY(${rate}px)`;
        }
    });
}

// ===== GALLERY FUNCTIONALITY =====
function initializeGallery() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterBtns.length === 0) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                const categories = item.getAttribute('data-category');
                
                if (filter === 'all' || categories.includes(filter)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Initialize gallery items for smooth transitions
    galleryItems.forEach(item => {
        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });
}

// ===== FAQ FUNCTIONALITY =====
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (question && answer) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
                
                // Smooth height animation
                if (!isActive) {
                    const content = answer.querySelector('div') || answer;
                    answer.style.maxHeight = content.scrollHeight + 'px';
                } else {
                    answer.style.maxHeight = '0px';
                }
            });
        }
    });
}

// ===== CONTACT FORM =====
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    if (!contactForm) return;

    

    // Dynamic form behavior
    const serviceSelect = document.getElementById('service');
    const domicileCheckbox = document.getElementById('domicile');
    const adresseField = document.getElementById('adresse');

    if (domicileCheckbox && adresseField) {
        domicileCheckbox.addEventListener('change', () => {
            if (domicileCheckbox.checked) {
                adresseField.required = true;
                adresseField.parentElement.style.display = 'flex';
            } else {
                adresseField.required = false;
                adresseField.parentElement.style.display = 'none';
            }
        });
    }

    // Set minimum date to today
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const successMessage = document.getElementById('successMessage');

    // Show loading state
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';

    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        // Hide form and show success message
        form.style.display = 'none';
        successMessage.classList.add('show');
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Reset form after delay
        setTimeout(() => {
            form.reset();
            form.style.display = 'grid';
            successMessage.classList.remove('show');
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
        }, 5000);
        
    }, 2000);
}

// ===== LIGHTBOX =====
function initializeLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (!lightbox) return;

    // Add click handlers to gallery items
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const afterImage = item.querySelector('.after img');
            const title = item.querySelector('.gallery-info h3');
            const description = item.querySelector('.gallery-info p');

            if (afterImage && lightboxImage) {
                lightboxImage.src = afterImage.src;
                lightboxImage.alt = afterImage.alt;
                
                if (title && lightboxTitle) {
                    lightboxTitle.textContent = title.textContent;
                }
                
                if (description && lightboxDescription) {
                    lightboxDescription.textContent = description.textContent;
                }
                
                lightbox.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('show');
        document.body.style.overflow = '';
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('show')) {
            closeLightbox();
        }
    });
}

// ===== UTILITY FUNCTIONS =====

// Smooth scroll to element
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Format phone number for display
function formatPhoneNumber(phone) {
    return phone.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
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

// ===== PERFORMANCE OPTIMIZATIONS =====

// Optimize scroll events
const optimizedScrollHandler = throttle(handleNavbarScroll, 16);
window.addEventListener('scroll', optimizedScrollHandler);

// Lazy load images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if needed
document.addEventListener('DOMContentLoaded', initializeLazyLoading);

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // You could send error reports to a logging service here
});

// ===== ACCESSIBILITY ENHANCEMENTS =====

// Keyboard navigation for custom elements
document.addEventListener('keydown', (e) => {
    // Handle Enter key on clickable elements
    if (e.key === 'Enter') {
        const target = e.target;
        if (target.classList.contains('faq-question') || 
            target.classList.contains('filter-btn') ||
            target.classList.contains('gallery-item')) {
            target.click();
        }
    }
});

// Focus management for mobile menu
function manageFocus() {
    const navMenu = document.querySelector('.nav-menu');
    const firstLink = navMenu.querySelector('.nav-link');
    const lastLink = navMenu.querySelector('.nav-link:last-child');

    if (isMenuOpen && firstLink) {
        firstLink.focus();
    }
}

// ===== BROWSER COMPATIBILITY =====

// Polyfill for IntersectionObserver
if (!window.IntersectionObserver) {
    // Fallback for older browsers
    const animatedElements = document.querySelectorAll(
        '.service-card, .pricing-card, .gallery-item, .stat-card, .contact-item, .faq-item'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });
}

// ===== ANALYTICS & TRACKING =====

// Track user interactions (replace with your analytics solution)
function trackEvent(category, action, label) {
    // Example: Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
    
    // Example: Custom analytics
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
}

// Track form submissions
document.addEventListener('submit', (e) => {
    if (e.target.id === 'contactForm') {
        trackEvent('Form', 'Submit', 'Contact Form');
    }
});

// Track button clicks
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn')) {
        const buttonText = e.target.textContent.trim();
        trackEvent('Button', 'Click', buttonText);
    }
});

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        toggleMobileMenu,
        handleFormSubmit,
        isValidEmail,
        formatPhoneNumber,
        debounce,
        throttle
    };
}
