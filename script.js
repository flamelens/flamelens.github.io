// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

// Enhanced mobile menu management
function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
    document.body.classList.remove('menu-open');
}

function openMobileMenu() {
    hamburger.classList.add('active');
    navMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
    document.body.classList.add('menu-open');
}

// Update active nav link function
function updateActiveNavLink() {
    const currentSection = getCurrentSection();
    if (currentSection) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
}

function getCurrentSection() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    return current;
}

// Enhanced hamburger click handler
hamburger.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (navMenu.classList.contains('active')) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Allow the link to work normally for navigation
        setTimeout(() => {
            closeMobileMenu();
        }, 100);
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !hamburger.contains(e.target)) {
        closeMobileMenu();
    }
});

// Close mobile menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMobileMenu();
        hamburger.focus(); // Return focus to hamburger for accessibility
    }
});

// Close mobile menu on resize to desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Enhanced navbar background on scroll with better performance
let lastScrollY = window.scrollY;
let ticking = false;

function updateNavbar() {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Don't hide navbar on mobile when menu is open
    if (!navMenu.classList.contains('active')) {
        // Hide/show navbar on scroll direction (optional)
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
    }
    
    // Update active nav link
    updateActiveNavLink();
    
    lastScrollY = currentScrollY;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
    }
});

// Portfolio Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
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

// Enhanced counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-item h3');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const suffix = counter.textContent.includes('%') ? '%' : 
                      counter.textContent.includes('+') ? '+' : 
                      counter.textContent.includes('/') ? '/7' : '';
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        let startTime = null;
        
        function animate(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            
            // Easing function for smooth animation
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            current = Math.floor(target * easeOutCubic);
            
            if (progress < 1) {
                counter.textContent = current + suffix;
                requestAnimationFrame(animate);
            } else {
                counter.textContent = target + suffix;
            }
        }
        
        requestAnimationFrame(animate);
    });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-grid');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Smooth scrolling for navigation links
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

// Form Submission
const contactForm = document.querySelector('.contact-form');
const newsletterForm = document.querySelector('.newsletter-form');

// Create and add scroll to top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
function toggleScrollToTop() {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
}

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Update scroll to top button visibility
window.addEventListener('scroll', toggleScrollToTop);

// Fix mobile touch events
document.addEventListener('touchstart', () => {}, { passive: true });

// Enhanced form validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Improved form submissions with better UX
if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value.trim() === '' && input.hasAttribute('required')) {
                input.style.borderColor = '#ef4444';
            } else {
                input.style.borderColor = 'var(--border-light)';
            }
        });
        
        input.addEventListener('focus', () => {
            input.style.borderColor = 'var(--primary-color)';
        });
    });
}

if (newsletterForm) {
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    if (emailInput) {
        emailInput.addEventListener('input', () => {
            const email = emailInput.value;
            if (email && !validateEmail(email)) {
                emailInput.style.borderColor = '#ef4444';
            } else {
                emailInput.style.borderColor = 'var(--border-light)';
            }
        });
    }
}

// Performance optimization: Throttle resize events
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Close mobile menu on resize
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        
        // Update any layout calculations here
        updateActiveNavLink();
    }, 150);
});

// Intersection Observer for better performance
const observerOptions = {
    root: null,
    rootMargin: '-10% 0px -80% 0px',
    threshold: 0.1
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

// Observe all sections with IDs
sections.forEach(section => {
    sectionObserver.observe(section);
});

// Error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => {
        img.style.display = 'none';
        console.warn(`Failed to load image: ${img.src}`);
    });
});

console.log('🚀 FlameLens website loaded successfully with modern enhancements!');

// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu on escape
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Footer newsletter functionality
const footerNewsletterForm = document.querySelector('.footer-newsletter');
if (footerNewsletterForm) {
    footerNewsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = footerNewsletterForm.querySelector('input[type="email"]');
        const button = footerNewsletterForm.querySelector('button');
        const email = emailInput.value.trim();
        
        if (!email || !validateEmail(email)) {
            emailInput.style.borderColor = '#ef4444';
            emailInput.focus();
            return;
        }
        
        // Simulate newsletter subscription
        const originalIcon = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        button.disabled = true;
        
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-check"></i>';
            emailInput.value = '';
            emailInput.style.borderColor = 'transparent';
            
            setTimeout(() => {
                button.innerHTML = originalIcon;
                button.disabled = false;
            }, 2000);
        }, 1500);
    });
}

// Smooth scroll for footer links
document.querySelectorAll('.footer a[href^="#"]').forEach(anchor => {
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

// Add scroll indicator update to include footer newsletter progress
function updateScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-progress');
    if (scrollIndicator) {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        scrollIndicator.style.width = `${Math.min(scrollPercent, 100)}%`;
    }
}

window.addEventListener('scroll', updateScrollIndicator);

// Fix Font Awesome icons if they don't load properly
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for Font Awesome to load
    setTimeout(() => {
        const iconMappings = {
            'fa-facebook-f': '📘',
            'fa-instagram': '📷', 
            'fa-linkedin-in': '💼',
            'fa-tiktok': '🎵',
            'fa-envelope': '✉️',
            'fa-phone': '📞',
            'fa-map-marker-alt': '📍',
            'fa-clock': '🕐',
            'fa-paper-plane': '✈️',
            'fa-check': '✓',
            'fa-spinner': '⟳'
        };
        
        // Check if Font Awesome loaded properly
        const testIcon = document.createElement('i');
        testIcon.className = 'fas fa-home';
        testIcon.style.opacity = '0';
        testIcon.style.position = 'absolute';
        document.body.appendChild(testIcon);
        
        const computedStyle = window.getComputedStyle(testIcon, '::before');
        const content = computedStyle.getPropertyValue('content');
        
        // If Font Awesome didn't load, use emoji fallbacks
        if (!content || content === 'none' || content === '""') {
            document.querySelectorAll('i[class*="fa-"]').forEach(icon => {
                const classes = icon.className.split(' ');
                for (const cls of classes) {
                    if (cls.startsWith('fa-') && iconMappings[cls]) {
                        icon.textContent = iconMappings[cls];
                        icon.style.fontFamily = 'inherit';
                        icon.style.fontSize = '1.2em';
                        break;
                    }
                }
            });
        }
        
        document.body.removeChild(testIcon);
    }, 500);
});
