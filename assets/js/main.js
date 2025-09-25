// UX Portfolio JavaScript
// Main functionality for theme system, navigation, and interactive elements

// ==========================================
// Theme System
// ==========================================

function updateThemeIcon(toggle, iconType) {
    const moonSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.98038 2.73135C9.79117 2.67374 9.59078 2.67397 9.40415 2.72944C7.79045 3.18158 6.32264 4.04719 5.14599 5.24078C3.96517 6.4386 3.11882 7.92491 2.69124 9.55165C2.26365 11.1784 2.26977 12.8888 2.70898 14.5124C3.14819 16.136 4.00515 17.6163 5.19451 18.8056C6.38386 19.995 7.86409 20.8519 9.48773 21.2911C11.1114 21.7303 12.8218 21.7364 14.4485 21.3088C16.0752 20.8812 17.5615 20.0348 18.7593 18.854C19.9525 17.6778 20.8179 16.2106 21.2702 14.5976C21.324 14.4177 21.3265 14.2247 21.275 14.041C21.1538 13.6089 20.7597 13.3102 20.311 13.3106C20.2099 13.3107 20.1116 13.326 20.0186 13.3546C18.7246 13.7093 17.3598 13.7164 16.0619 13.3751C14.7554 13.0314 13.5636 12.347 12.6083 11.3918C11.6531 10.4365 10.9686 9.24468 10.625 7.93818C10.2834 6.63949 10.2908 5.27379 10.6461 3.9791C10.6732 3.89024 10.6881 3.79655 10.6893 3.70018C10.6947 3.25564 10.4057 2.86084 9.98038 2.73135ZM6.57028 6.64485C7.11058 6.09677 7.72838 5.63598 8.40126 5.27566C8.32141 6.33717 8.41781 7.40898 8.69079 8.44689C9.12451 10.096 9.98839 11.6003 11.1941 12.806C12.3998 14.0117 13.9041 14.8756 15.5532 15.3093C16.5911 15.5822 17.6629 15.6786 18.7244 15.5988C18.3641 16.2717 17.9033 16.8894 17.3553 17.4297C16.4063 18.3652 15.2288 19.0357 13.9401 19.3745C12.6513 19.7133 11.2963 19.7084 10.01 19.3605C8.72365 19.0125 7.55096 18.3336 6.60871 17.3914C5.66647 16.4492 4.98755 15.2765 4.63959 13.9902C4.29163 12.7039 4.28679 11.3488 4.62553 10.0601C4.96428 8.77132 5.63479 7.59381 6.57028 6.64485Z" fill="currentColor"/>
    </svg>`;
    
    const sunSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0.5C12.5523 0.5 13 0.947715 13 1.5V3.375C13 3.92728 12.5523 4.375 12 4.375C11.4477 4.375 11 3.92728 11 3.375V1.5C11 0.947715 11.4477 0.5 12 0.5Z" fill="currentColor"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.375 12C5.375 8.34111 8.34111 5.375 12 5.375C15.6589 5.375 18.625 8.34111 18.625 12C18.625 15.6589 15.6589 18.625 12 18.625C8.34111 18.625 5.375 15.6589 5.375 12ZM12 7.375C9.44568 7.375 7.375 9.44568 7.375 12C7.375 14.5543 9.44568 16.625 12 16.625C14.5543 16.625 16.625 14.5543 16.625 12C16.625 9.44568 14.5543 7.375 12 7.375Z" fill="currentColor"/>
        <path d="M5.28249 3.86827C4.89196 3.47775 4.2588 3.47775 3.86827 3.86827C3.47775 4.2588 3.47775 4.89196 3.86827 5.28249L5.1941 6.60831C5.58462 6.99884 6.21779 6.99884 6.60831 6.60831C6.99884 6.21779 6.99884 5.58462 6.60831 5.1941L5.28249 3.86827Z" fill="currentColor"/>
        <path d="M0.5 12C0.5 11.4477 0.947715 11 1.5 11H3.375C3.92728 11 4.375 11.4477 4.375 12C4.375 12.5523 3.92728 13 3.375 13H1.5C0.947715 13 0.5 12.5523 0.5 12Z" fill="currentColor"/>
        <path d="M6.60831 18.8059C6.99884 18.4154 6.99884 17.7822 6.60831 17.3917C6.21779 17.0012 5.58462 17.0012 5.1941 17.3917L3.86827 18.7175C3.47775 19.1081 3.47775 19.7412 3.86827 20.1318C4.2588 20.5223 4.89196 20.5223 5.28249 20.1317L6.60831 18.8059Z" fill="currentColor"/>
        <path d="M12 19.625C12.5523 19.625 13 20.0727 13 20.625V22.5C13 23.0523 12.5523 23.5 12 23.5C11.4477 23.5 11 23.0523 11 22.5V20.625C11 20.0727 11.4477 19.625 12 19.625Z" fill="currentColor"/>
        <path d="M18.8059 17.3917C18.4154 17.0012 17.7822 17.0012 17.3917 17.3917C17.0012 17.7822 17.0012 18.4154 17.3917 18.8059L18.7175 20.1318C19.108 20.5223 19.7412 20.5223 20.1317 20.1318C20.5223 19.7412 20.5223 19.1081 20.1317 18.7175L18.8059 17.3917Z" fill="currentColor"/>
        <path d="M19.625 12C19.625 11.4477 20.0727 11 20.625 11H22.5C23.0523 11 23.5 11.4477 23.5 12C23.5 12.5523 23.0523 13 22.5 13H20.625C20.0727 13 19.625 12.5523 19.625 12Z" fill="currentColor"/>
        <path d="M20.1317 5.28249C20.5223 4.89196 20.5223 4.2588 20.1317 3.86827C19.7412 3.47775 19.108 3.47775 18.7175 3.86827L17.3917 5.1941C17.0012 5.58462 17.0012 6.21779 17.3917 6.60831C17.7822 6.99884 18.4154 6.99884 18.8059 6.60831L20.1317 5.28249Z" fill="currentColor"/>
    </svg>`;
    
    if (toggle) {
        toggle.innerHTML = iconType === 'moon' ? moonSvg : sunSvg;
    }
}

function updateThemeResponsiveImages() {
    const images = document.querySelectorAll('.theme-responsive-image');
    const isDark = document.body.getAttribute('data-theme') === 'dark';

    images.forEach(img => {
        const src = img.src;
        if (isDark) {
            // Switch to dark version
            img.src = src.replace('-light.png', '-dark.png').replace('placeholder-light.png', 'placeholder-dark.png');
        } else {
            // Switch to light version
            img.src = src.replace('-dark.png', '-light.png').replace('placeholder-dark.png', 'placeholder-light.png');
        }
    });
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    
    // Get all theme toggle buttons
    const navToggle = document.querySelector('nav .nav-theme-toggle');
    const styleGuideToggle = document.querySelector('#styleGuideThemeToggle');
    const mobileToggle = document.querySelector('.mobile-theme-toggle');

    // Check for saved theme or default to dark
    if (savedTheme === 'light') {
        body.removeAttribute('data-theme');
        updateThemeIcon(navToggle, 'moon');
        updateThemeIcon(styleGuideToggle, 'moon');
        updateThemeIcon(mobileToggle, 'moon');
    } else {
        body.setAttribute('data-theme', 'dark');
        updateThemeIcon(navToggle, 'sun');
        updateThemeIcon(styleGuideToggle, 'sun');
        updateThemeIcon(mobileToggle, 'sun');
    }

    // Update theme responsive images
    updateThemeResponsiveImages();
}

function toggleTheme() {
    const body = document.body;
    
    // Get all theme toggle buttons
    const navToggle = document.querySelector('nav .nav-theme-toggle');
    const styleGuideToggle = document.querySelector('#styleGuideThemeToggle');
    const mobileToggle = document.querySelector('.mobile-theme-toggle');

    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        updateThemeIcon(navToggle, 'moon');
        updateThemeIcon(styleGuideToggle, 'moon');
        updateThemeIcon(mobileToggle, 'moon');
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        updateThemeIcon(navToggle, 'sun');
        updateThemeIcon(styleGuideToggle, 'sun');
        updateThemeIcon(mobileToggle, 'sun');
    }

    // Update theme responsive images
    updateThemeResponsiveImages();
}

// ==========================================
// Navigation & Scrolling
// ==========================================

function scrollToProjects() {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
        const targetPosition = projectsSection.offsetTop - 76;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function toggleBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    const heroSection = document.querySelector('.hero');
    const scrollPosition = window.scrollY;
    
    if (backToTopButton) {
        // Different logic for index page (with hero) vs style guide
        if (heroSection) {
            // Index page: show after 20% of hero height
            const heroHeight = heroSection.offsetHeight;
            const heroTwentyPercent = heroSection.offsetTop + (heroHeight * 0.2);
            
            if (scrollPosition > heroTwentyPercent) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        } else {
            // Style guide: show after 200px scroll
            if (scrollPosition > 200) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        }
    }
}

// ==========================================
// Grid Lines System
// ==========================================

function toggleGridLines() {
    const overlay = document.getElementById('gridLinesOverlay');
    const toggle = document.getElementById('gridToggle');
    const toggleLocal = document.getElementById('gridToggleLocal');
    
    if (overlay) {
        overlay.classList.toggle('visible');
        
        // Update all grid toggles to stay in sync
        if (toggle) toggle.classList.toggle('active');
        if (toggleLocal) toggleLocal.classList.toggle('active');
        
        // Save state to localStorage
        const isVisible = overlay.classList.contains('visible');
        localStorage.setItem('gridLinesVisible', isVisible);
    }
}

function initGridLines() {
    const savedState = localStorage.getItem('gridLinesVisible');
    const overlay = document.getElementById('gridLinesOverlay');
    const toggle = document.getElementById('gridToggle');
    const toggleLocal = document.getElementById('gridToggleLocal');
    
    if (savedState === 'true' && overlay) {
        overlay.classList.add('visible');
        if (toggle) toggle.classList.add('active');
        if (toggleLocal) toggleLocal.classList.add('active');
    }
}

// ==========================================
// Animation & Interaction Observers
// ==========================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe project cards (only on index page)
    document.querySelectorAll('.project-card').forEach(card => {
        observer.observe(card);
    });
}

function initSmoothScrolling() {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const targetPosition = target.offsetTop - 76;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================
// Mobile Menu System
// ==========================================

function toggleMobileMenu() {
    const overlay = document.getElementById('mobileMenuOverlay');
    const body = document.body;

    if (overlay) {
        const isActive = overlay.classList.contains('active');

        if (isActive) {
            // Close menu
            overlay.classList.remove('active');
            body.classList.remove('mobile-menu-open');
        } else {
            // Open menu
            overlay.classList.add('active');
            body.classList.add('mobile-menu-open');
        }
    }
}

// Close mobile menu when clicking on overlay background
function initMobileMenuClose() {
    const overlay = document.getElementById('mobileMenuOverlay');

    if (overlay) {
        overlay.addEventListener('click', function(e) {
            // Close if clicking on the overlay itself (not the content)
            if (e.target === overlay) {
                toggleMobileMenu();
            }
        });
    }
}

// ==========================================
// Event Listeners & Initialization
// ==========================================

// Listen for scroll events
window.addEventListener('scroll', toggleBackToTop);

// ==========================================
// Rotating Word Animation
// ==========================================

function initRotatingWord() {
    const words = ['connects', 'inspires', 'empowers', 'transforms', 'delights'];
    const rotatingWordElement = document.getElementById('rotatingWord');
    let currentIndex = 0;
    let cycleCount = 0;
    
    if (!rotatingWordElement) return;
    
    function typeWriter(text, element, callback) {
        let i = 0;
        element.classList.add('typing');
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, 100);
            } else {
                element.classList.remove('typing');
                if (callback) callback();
            }
        }
        type();
    }
    
    function deleteText(element, callback) {
        const text = element.textContent;
        let i = text.length;
        element.classList.add('typing');
        
        function deleteChar() {
            if (i > 0) {
                element.textContent = text.substring(0, i - 1);
                i--;
                setTimeout(deleteChar, 50);
            } else {
                if (callback) callback();
            }
        }
        deleteChar();
    }
    
    function rotateWord() {
        // Start deleting current word
        deleteText(rotatingWordElement, () => {
            // Move to next word and type it
            currentIndex = (currentIndex + 1) % words.length;
            typeWriter(words[currentIndex], rotatingWordElement, () => {
                // If we just typed "connects", handle cycle counting and longer pause
                if (words[currentIndex] === 'connects') {
                    cycleCount++;
                    // After 2 cycles, stop on "connects"
                    if (cycleCount >= 2) {
                        return; // Stop the animation
                    }
                    // Longer pause on "connects" - increases each cycle
                    const pauseTime = 8000 + (cycleCount * 2000); // 8s, 10s, 12s
                    setTimeout(rotateWord, pauseTime);
                } else {
                    setTimeout(rotateWord, 4000); // Normal 4 second delay for other words
                }
            });
        });
    }
    
    // Start the rotation after initial page load
    setTimeout(() => {
        rotateWord();
    }, 3000);
}

// ==========================================
// About Carousel System
// ==========================================

let currentSlide = 0;
const totalSlides = 4;
let autoRotateInterval;
let isUserInteracting = false;

function goToSlide(slideIndex, userTriggered = false) {
    currentSlide = slideIndex;

    const track = document.getElementById('aboutCarouselTrack');
    const indicators = document.querySelectorAll('.indicator');

    if (track) {
        track.setAttribute('data-position', slideIndex);
    }

    // Update indicators
    indicators.forEach((indicator, index) => {
        if (index === slideIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });

    // If user clicked a dot, reset the auto-rotation with slower timing
    if (userTriggered) {
        isUserInteracting = true;
        if (autoRotateInterval) {
            clearInterval(autoRotateInterval);
        }

        // Restart auto-rotation with slower 12-second intervals
        autoRotateInterval = setInterval(nextSlide, 12000);
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    goToSlide(currentSlide);
}

// Project detail carousel function
function goToProjectSlide(slideIndex) {
    const track = document.getElementById('projectCarouselTrack');
    const indicators = document.querySelectorAll('.project-carousel .indicator');

    if (track) {
        track.setAttribute('data-position', slideIndex);
    }

    // Update indicators
    indicators.forEach((indicator, index) => {
        if (index === slideIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// Featured image carousel function
function goToFeaturedSlide(slideIndex) {
    const track = document.getElementById('featuredCarouselTrack');
    const indicators = document.querySelectorAll('.featured-carousel-indicators .indicator');

    if (track) {
        track.setAttribute('data-position', slideIndex);
    }

    // Update indicators
    indicators.forEach((indicator, index) => {
        if (index === slideIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// Initialize project page carousels
function initProjectCarousels() {
    // Initialize project carousel if it exists
    const projectCarouselTrack = document.getElementById('projectCarouselTrack');
    if (projectCarouselTrack) {
        goToProjectSlide(0);
    }

    // Initialize featured carousel if it exists
    const featuredCarouselTrack = document.getElementById('featuredCarouselTrack');
    if (featuredCarouselTrack) {
        goToFeaturedSlide(0);
    }
}

function initCarousel() {
    // Set initial position
    goToSlide(0);

    // Use Intersection Observer to start auto-rotation when about section is visible
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !autoRotateInterval) {
                    // Start auto-rotation when section comes into view
                    autoRotateInterval = setInterval(nextSlide, 8000);
                } else if (!entry.isIntersecting && autoRotateInterval) {
                    // Stop auto-rotation when section leaves view
                    clearInterval(autoRotateInterval);
                    autoRotateInterval = null;
                }
            });
        }, {
            threshold: 0.3 // Start when 30% of the section is visible
        });

        observer.observe(aboutSection);
    }
}

// Logo Color Management
function initLogoColorChange() {
    // Only run on index page (pages with sections)
    const sections = document.querySelectorAll('section[id]');
    if (sections.length === 0) {
        return;
    }

    const logo = document.querySelector('.logo');
    if (!logo) {
        return;
    }

    function updateLogoColor() {
        // Only apply accent color logic on the index page (pages with hero sections)
        // Check if there's a hero section on the page
        const heroSection = document.querySelector('.hero');
        if (!heroSection) {
            // Not on index page, don't add accent color
            logo.classList.remove('accent-color');
            return;
        }

        // Check if we're at the very top of the page
        // Use a small threshold to account for minor scroll variations
        if (window.scrollY <= 50) {
            logo.classList.add('accent-color');
        } else {
            logo.classList.remove('accent-color');
        }
    }

    // Update on scroll
    window.addEventListener('scroll', updateLogoColor);

    // Update on page load
    updateLogoColor();
}

// Navigation Active State Management
function initNavigationActiveState() {
    // Only run on pages with sections (like index.html)
    const sections = document.querySelectorAll('section[id]');

    // If no sections found, don't run the active state management
    // This preserves manually set active classes on other pages
    if (sections.length === 0) {
        return;
    }

    const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');

    function updateActiveNavigation() {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= (sectionTop - 150)) {
                currentSection = section.getAttribute('id');
            }
        });

        // Remove active class only from section-based links (those with href starting with #)
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                link.classList.remove('active');
            }
        });

        // Add active class to current section's links
        if (currentSection) {
            const currentLinks = document.querySelectorAll(`a[href="#${currentSection}"]`);
            currentLinks.forEach(link => {
                link.classList.add('active');
            });
        }
    }

    // Update on scroll
    window.addEventListener('scroll', updateActiveNavigation);

    // Update on page load
    updateActiveNavigation();
}

// Project Page Contents Navigation Active State
function initProjectNavigationActiveState() {
    // Only run on project pages with contents navigation
    const projectNav = document.querySelector('.project-nav');
    if (!projectNav) {
        return;
    }

    const projectNavLinks = projectNav.querySelectorAll('a[href^="#"]');
    const contentSections = document.querySelectorAll('.content-section[id]');

    if (projectNavLinks.length === 0 || contentSections.length === 0) {
        return;
    }

    function updateProjectActiveNavigation() {
        let currentSection = '';

        // Find the current section based on scroll position
        contentSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            // Account for the fixed navigation height (120px) plus some buffer
            if (window.scrollY >= (sectionTop - 150)) {
                currentSection = section.getAttribute('id');
            }
        });

        // Update active states
        projectNavLinks.forEach(link => {
            link.classList.remove('active');

            // Extract the hash from the href attribute
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                if (targetId === currentSection) {
                    link.classList.add('active');
                }
            }
        });
    }

    // Update on scroll
    window.addEventListener('scroll', updateProjectActiveNavigation);

    // Update on page load
    updateProjectActiveNavigation();
}

// ==========================================
// Page Transitions
// ==========================================

function initPageTransitions() {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        return; // Skip transitions if user prefers reduced motion
    }

    // Fade in the page on load
    document.body.classList.add('page-transition-in');

    // Get all links that navigate to other HTML pages
    const pageLinks = document.querySelectorAll('a[href$=".html"], a[href*=".html#"], a[href*="/"][href*=".html"]');

    pageLinks.forEach(link => {
        // Skip external links
        const href = link.getAttribute('href');
        if (href.startsWith('http') || href.startsWith('//')) {
            return;
        }

        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetUrl = this.href;

            // Add fade out class
            document.body.classList.add('page-transition-out');

            // Navigate after transition completes
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 300); // Match CSS transition duration
        });
    });
}

// ==========================================
// Donut Chart Animations
// ==========================================

function initDonutCharts() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const chart = entry.target;
                const progress = parseInt(chart.dataset.progress) || 0;
                const circumference = 2 * Math.PI * 25; // radius is 25
                const progressLength = (progress / 100) * circumference;

                // Add animate class to trigger CSS animation
                chart.classList.add('animate');

                // Set the CSS custom property for the progress
                chart.style.setProperty('--progress', progressLength);

                // Stop observing this chart
                observer.unobserve(chart);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -20px 0px'
    });

    // Observe all donut charts
    const charts = document.querySelectorAll('.donut-chart');
    charts.forEach(chart => {
        observer.observe(chart);
    });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initGridLines();
    initScrollAnimations();
    initSmoothScrolling();
    initRotatingWord();
    initMobileMenuClose();
    initCarousel();
    initProjectCarousels();
    initLogoColorChange();
    initNavigationActiveState();
    initProjectNavigationActiveState();
    initPageTransitions();
    initDonutCharts();
});