/**
 * Image Preloading System
 *
 * Preloads project images on hover for better UX
 *
 * Dependencies: core/config.js, core/theme-system.js
 * Exports: prefetchProjectImages(), initHoverPreloading()
 */

// Track which projects have been preloaded
const preloadedProjects = new Set();

// Prefetch images for a specific project
function prefetchProjectImages(projectId) {
    // Don't preload if already preloaded
    if (preloadedProjects.has(projectId)) {
        return;
    }

    const images = PROJECT_FEATURED_IMAGES[projectId];
    if (!images) return;

    // Get current theme to preload correct version
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    const theme = isDark ? 'dark' : 'light';

    // Use requestIdleCallback for non-blocking prefetch
    const prefetchImage = (imageName) => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.as = 'image';
        link.href = `assets/images/work/${imageName}-${theme}.png`;
        document.head.appendChild(link);
    };

    // Prefetch each image
    if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => {
            images.forEach(prefetchImage);
        });
    } else {
        // Fallback for browsers without requestIdleCallback
        setTimeout(() => {
            images.forEach(prefetchImage);
        }, 100);
    }

    // Mark as preloaded
    preloadedProjects.add(projectId);
}

// Initialize hover intent preloading for project cards
function initHoverPreloading() {
    // Only run on index page
    const projectsSection = document.getElementById('projects');
    if (!projectsSection) return;

    const projectCards = document.querySelectorAll('.project-card-link');

    projectCards.forEach(card => {
        let hoverTimeout = null;

        // Get project ID from the card
        const projectCard = card.querySelector('.project-card');
        const projectId = projectCard?.getAttribute('data-card');

        if (!projectId) return;

        // Start prefetch on hover (with 200ms delay to detect intent)
        card.addEventListener('mouseenter', () => {
            hoverTimeout = setTimeout(() => {
                prefetchProjectImages(projectId);
            }, 200);
        });

        // Cancel prefetch if user moves away quickly
        card.addEventListener('mouseleave', () => {
            if (hoverTimeout) {
                clearTimeout(hoverTimeout);
                hoverTimeout = null;
            }
        });
    });
}

