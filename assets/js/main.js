/**
 * UX Portfolio - Main Initialization
 *
 * This is the main initialization file for the modular portfolio system.
 * All functionality has been split into organized modules for maintainability.
 *
 * Module Architecture:
 * - core/: Core systems (data loading, theme, config)
 * - components/: Interactive components (carousels, navigation, menus)
 * - content/: Content renderers (projects, brands, resume, case studies)
 * - utils/: Utility functions (animations, image preloading, helpers)
 *
 * Load Order (see HTML):
 * 1. Core modules (config, data-loader, theme-system)
 * 2. Utilities (helpers, animations, image-preloader)
 * 3. Components (navigation, mobile-menu, logo-animation, carousel-base)
 * 4. Specific implementations (carousel-about, carousel-project, carousel-featured)
 * 5. Content renderers (project, carousel, brand, resume, case-study)
 * 6. This file (main.js) - initialization orchestration
 */

// ==========================================
// Main Initialization Sequence
// ==========================================

document.addEventListener('DOMContentLoaded', async function() {
    // Load all data from JSON files first
    try {
        await dataLoader.loadAll();
        console.log('Data loaded successfully');

        // Inject JSON-LD schemas for SEO
        initJSONLDSchemas();
    } catch (error) {
        console.error('Error loading data:', error);
        // Continue with fallback data from PROJECTS array
    }

    // Core system initialization
    initTheme();
    initGridLines();
    initLogoLetterAnimation();

    // Dynamic content generation - must run BEFORE scroll animations
    initProjectCards(); // Generate project cards on index page
    initProjectPageContent(); // Update page title and subtitle on project pages
    initProjectNavigation(); // Update prev/next navigation on project pages
    initBrandLogos(); // Generate brand logos from JSON
    initAboutCarousel(); // Generate about carousel cards from JSON
    initAboutCarouselIndicators(); // Generate about carousel indicators from JSON
    initExperienceTimeline(); // Generate experience timeline for resume page
    initSkillsGrid(); // Generate skills grid for resume page
    initAccolades(); // Generate accolades for resume page
    initHoverPreloading(); // Initialize hover intent image preloading
    await initCaseStudyContent(); // Load and render case study content from JSON

    // Interactive features initialization
    initScrollAnimations(); // Now project cards exist and can be observed
    initSmoothScrolling();
    initBackToTop(); // Show/hide back-to-top buttons on scroll
    initMobileMenuClose();
    initCarousel(); // About carousel
    initProjectCarousels(); // Project and featured carousels
    initLogoColorChange();
    initNavigationActiveState();
    initProjectNavigationActiveState();
    initStickyProjectNav();
    initPageTransitions();
    initDonutCharts();

    // Initialize particle system (only on index page with hero section)
    if (typeof initParticleSystem === 'function') {
        initParticleSystem();
    }

    // Initialize logo scroller (must run AFTER initBrandLogos)
    initLogoScroller();

    // Initialize brands speed control
    initBrandsSpeedControl();

    // Handle hash navigation after everything is loaded and rendered
    if (window.location.hash) {
        // Wait for layout to fully settle
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                target.scrollIntoView({ behavior: 'instant', block: 'start' });
            }
        }, 300); // Longer delay ensures all content above is laid out
    }
});
