/**
 * Utility Helper Functions
 *
 * JSON-LD schemas, grid lines, donut charts, logo scroller
 *
 * Dependencies: core/data-loader.js
 * Exports: Multiple utility functions
 */

function generatePersonSchema(personData) {
    if (!personData) return null;

    return {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": personData.name,
        "jobTitle": personData.jobTitle,
        "description": personData.description,
        "url": personData.website,
        "image": personData.image,
        "email": personData.email,
        "telephone": personData.phone,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": personData.location.address,
            "addressLocality": personData.location.city,
            "addressRegion": personData.location.state,
            "postalCode": personData.location.zip,
            "addressCountry": personData.location.country
        },
        "sameAs": [
            personData.socialLinks.linkedin,
            personData.socialLinks.github,
            personData.socialLinks.dribbble,
            personData.socialLinks.instagram
        ],
        "knowsAbout": personData.skills
    };
}

function generateProjectSchema(projectData, personData) {
    if (!projectData || !personData) return null;

    return {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "name": projectData.title,
        "description": projectData.description,
        "author": {
            "@type": "Person",
            "name": personData.name,
            "url": personData.website
        },
        "datePublished": projectData.year?.toString(),
        "image": `https://jerimybrown.com/assets/images/work/${projectData.id}-light.png`,
        "keywords": projectData.tags?.join(', '),
        "genre": projectData.category
    };
}

function generateBreadcrumbSchema(items) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
        }))
    };
}

function generateWebSiteSchema(personData) {
    if (!personData) return null;

    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": `${personData.name} - Portfolio`,
        "url": personData.website,
        "description": personData.description,
        "author": {
            "@type": "Person",
            "name": personData.name
        }
    };
}

function injectJSONLD(schema) {
    if (!schema) return;

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema, null, 2);
    document.head.appendChild(script);
}

function initJSONLDSchemas() {
    const personData = dataLoader.getPerson();
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop();

    // Always inject Person schema on all pages
    injectJSONLD(generatePersonSchema(personData));

    // Inject appropriate schemas based on page
    if (currentPath.includes('/work/') || currentPath.includes('work/')) {
        // Project page
        const projectData = dataLoader.getProject(currentPage);
        if (projectData) {
            injectJSONLD(generateProjectSchema(projectData, personData));
            injectJSONLD(generateBreadcrumbSchema([
                { name: 'Home', url: 'https://jerimybrown.com' },
                { name: 'Work', url: 'https://jerimybrown.com#projects' },
                { name: projectData.title, url: `https://jerimybrown.com/work/${projectData.url}` }
            ]));
        }
    } else if (currentPage === 'index.html' || currentPath === '/' || currentPath === '') {
        // Homepage
        injectJSONLD(generateWebSiteSchema(personData));
    }
}

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


// Donut Chart Animations
// ==========================================

function initDonutCharts() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const chart = entry.target;
                const progress = parseInt(chart.dataset.progress) || 0;
                const radius = 25; // SVG circle radius
                const circumference = 2 * Math.PI * radius;
                const progressLength = (progress / 100) * circumference;

                // Add animate class to trigger CSS animation
                chart.classList.add('animate');

                // Set the CSS custom property for the progress
                chart.style.setProperty('--progress', progressLength);

                // Animate the percentage number
                const valueElement = chart.querySelector('.chart-value');
                if (valueElement) {
                    animateChartValue(valueElement, 0, progress, 1500);
                }

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

function animateChartValue(element, start, end, duration) {
    const startTime = performance.now();

    function updateValue(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.round(start + (end - start) * easeOutQuart);

        element.textContent = current + '%';

        if (progress < 1) {
            requestAnimationFrame(updateValue);
        }
    }

    requestAnimationFrame(updateValue);
}


// Logo Scroller - Seamless Infinite Scroll
// ==========================================

// Global variable for brands scroll duration (milliseconds)
// Default: 40% speed = 80s duration (120 - 40 = 80)
let brandScrollDuration = 80000;
let restartLogoScroller = null; // Function to restart animation
let updateLogoScrollSpeed = null; // Function to update speed without resetting position

function initLogoScroller() {
    const track = document.querySelector('.logo-scroller-track');
    const scroller = document.querySelector('.logo-scroller');
    if (!track || !scroller) return;

    // Animation state
    let animationId = null;
    let position = 0;
    let isPaused = false;
    let scrollWidth = 0;
    let speed = 0;

    // Calculate width of one complete set and scroll speed
    function calculateScrollParameters() {
        // Get all logos and filter for actually visible ones (not hidden by CSS)
        const allLogos = Array.from(track.querySelectorAll('.brand-logo'));
        const visibleLogos = allLogos.filter(logo => {
            return window.getComputedStyle(logo).display !== 'none';
        });

        if (visibleLogos.length === 0) {
            return; // No logos to scroll
        }

        // visibleLogos contains 2 sets (original + duplicate)
        // We need to calculate the width of exactly one set
        const oneSetCount = visibleLogos.length / 2;

        // Get computed gap between logos
        const trackStyles = window.getComputedStyle(track);
        const gap = parseInt(trackStyles.gap) || 64;

        // Calculate total width of one set
        let totalWidth = 0;
        for (let i = 0; i < oneSetCount; i++) {
            totalWidth += visibleLogos[i].offsetWidth + gap;
        }

        scrollWidth = totalWidth;

        // Calculate speed using global brandScrollDuration variable
        speed = scrollWidth / brandScrollDuration; // pixels per millisecond
    }

    // Animation loop
    function animate(timestamp) {
        if (!isPaused && scrollWidth > 0) {
            // Move position based on speed (pixels per frame at ~60fps)
            position += speed * 16.67; // Approximate 60fps frame time

            // Reset position when we've scrolled one complete set
            if (position >= scrollWidth) {
                position = position - scrollWidth; // Seamless reset
            }

            // Apply transform
            track.style.transform = `translateX(-${position}px)`;
        }

        // Continue animation loop
        animationId = requestAnimationFrame(animate);
    }

    // Pause on hover
    scroller.addEventListener('mouseenter', () => {
        isPaused = true;
    });

    scroller.addEventListener('mouseleave', () => {
        isPaused = false;
    });

    // Setup and start animation
    function start() {
        // Cancel existing animation
        if (animationId) {
            cancelAnimationFrame(animationId);
        }

        // Reset position
        position = 0;
        track.style.transform = 'translateX(0)';

        // Calculate parameters
        calculateScrollParameters();

        // Start animation
        if (scrollWidth > 0) {
            animationId = requestAnimationFrame(animate);
        }
    }

    // Update speed without resetting position (for smooth speed changes)
    function updateSpeed() {
        // Just recalculate the speed based on new duration
        // The animation loop will pick up the new speed automatically
        calculateScrollParameters();
    }

    // Expose functions globally
    restartLogoScroller = start;
    updateLogoScrollSpeed = updateSpeed;

    // Initial setup
    start();

    // Recalculate on theme change to ensure accuracy with different logo versions
    const observer = new MutationObserver(() => {
        start();
    });

    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['data-theme']
    });

    // Recalculate on window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(start, 150);
    });
}

// Brands Speed Control
// ==========================================

function initBrandsSpeedControl() {
    const slider = document.getElementById('brandsSpeedSlider');
    const valueDisplay = document.getElementById('brandsSpeedValue');

    if (!slider || !valueDisplay) return;

    // Load saved speed percentage from localStorage
    const savedSpeed = localStorage.getItem('brandsScrollSpeed');
    if (savedSpeed) {
        const speedPercent = parseInt(savedSpeed);
        slider.value = speedPercent;
        valueDisplay.textContent = `${speedPercent}%`;

        // Calculate duration: higher percentage = faster = shorter duration
        // Formula: duration = (120 - percentage) * 1000
        // 100% = 20s (fastest), 60% = 60s (default), 20% = 100s (slowest)
        brandScrollDuration = (120 - speedPercent) * 1000;

        // Update speed smoothly without resetting position
        if (updateLogoScrollSpeed) {
            updateLogoScrollSpeed();
        }
    }

    // Update speed when slider changes
    slider.addEventListener('input', function() {
        const speedPercent = parseInt(this.value);

        // Update display as percentage
        valueDisplay.textContent = `${speedPercent}%`;

        // Calculate duration: higher percentage = faster = shorter duration
        brandScrollDuration = (120 - speedPercent) * 1000;

        // Save to localStorage
        localStorage.setItem('brandsScrollSpeed', speedPercent);

        // Update speed smoothly without resetting position
        if (updateLogoScrollSpeed) {
            updateLogoScrollSpeed();
        }
    });
}
