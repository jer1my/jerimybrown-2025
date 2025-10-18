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

function initLogoScroller() {
    const track = document.querySelector('.logo-scroller-track');
    if (!track) return;

    // Function to setup seamless scroll
    function setupSeamlessScroll() {
        // Get all visible brand logos (either light or dark, depending on theme)
        const visibleLogos = track.querySelectorAll('.brand-logo:not([style*="display: none"])');

        if (visibleLogos.length === 0) {
            // Fallback: count all logos and divide by 2 (since half are hidden)
            const allLogos = track.querySelectorAll('.brand-logo');
            const logoCount = allLogos.length / 2; // Each brand has 2 versions

            // Calculate approximate width
            // Average logo width ~120px + 64px gap
            const approximateWidth = logoCount * 184;
            track.style.setProperty('--scroll-distance', `-${approximateWidth}px`);
        } else {
            // Calculate the exact width of one complete set (half of all visible logos)
            const totalLogos = visibleLogos.length;
            const oneSetCount = totalLogos / 2;

            // Get computed gap between logos
            const trackStyles = window.getComputedStyle(track);
            const gap = parseInt(trackStyles.gap) || 64;

            // Calculate total width of one set
            let totalWidth = 0;
            for (let i = 0; i < oneSetCount; i++) {
                totalWidth += visibleLogos[i].offsetWidth + gap;
            }

            // Set the scroll distance as a negative value
            track.style.setProperty('--scroll-distance', `-${totalWidth}px`);
        }

        // Apply the animation with responsive duration
        const isMobile = window.innerWidth <= 768;
        const duration = isMobile ? '40s' : '50s';
        track.style.animation = `scrollLogos ${duration} linear infinite`;
    }

    // Initial setup
    setupSeamlessScroll();

    // Recalculate on theme change to ensure accuracy with different logo versions
    const observer = new MutationObserver(() => {
        setupSeamlessScroll();
    });

    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['data-theme']
    });

    // Recalculate on window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(setupSeamlessScroll, 150);
    });
}
