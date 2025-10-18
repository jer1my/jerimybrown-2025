/**
 * About Carousel System
 *
 * About section carousel with auto-rotation
 *
 * Dependencies: components/carousel-base.js
 * Exports: About carousel functions
 */

// ==========================================

let currentSlide = 0;
let totalSlides = 4; // Will be updated dynamically based on loaded carousel data
let autoRotateInterval;
let isUserInteracting = false;

function goToSlide(slideIndex, userTriggered = false) {
    currentSlide = slideIndex;

    const track = document.getElementById('aboutCarouselTrack');
    const indicators = document.querySelectorAll('.indicator');

    if (track) {
        // Ensure transition is enabled for animation
        if (userTriggered) {
            track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        }
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

    // Keep CarouselDrag instance in sync
    if (window.aboutCarouselDrag) {
        window.aboutCarouselDrag.updateCurrentSlide(slideIndex);
    }

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


function initCarousel() {
    // Set initial position
    goToSlide(0);

    // Initialize drag functionality for about carousel
    const aboutCarouselContainer = document.querySelector('.carousel-container');
    if (aboutCarouselContainer) {
        const aboutDrag = new CarouselDrag(aboutCarouselContainer, {
            goToSlide: (slideIndex) => goToSlide(slideIndex, true),
            threshold: 50,
            sensitivity: 1.0
        });

        // Update drag instance when slide changes externally
        window.aboutCarouselDrag = aboutDrag;

        // Pause auto-rotation on hover
        aboutCarouselContainer.addEventListener('mouseenter', () => {
            if (autoRotateInterval) {
                clearInterval(autoRotateInterval);
                autoRotateInterval = null;
            }
        });

        // Resume auto-rotation on mouse leave
        aboutCarouselContainer.addEventListener('mouseleave', () => {
            if (!autoRotateInterval) {
                autoRotateInterval = setInterval(nextSlide, 8000);
            }
        });

        // Pause auto-rotation when drag starts
        aboutCarouselContainer.addEventListener('mousedown', () => {
            if (autoRotateInterval) {
                clearInterval(autoRotateInterval);
                autoRotateInterval = null;
            }
        });

        aboutCarouselContainer.addEventListener('touchstart', () => {
            if (autoRotateInterval) {
                clearInterval(autoRotateInterval);
                autoRotateInterval = null;
            }
        });

        // Resume auto-rotation when drag ends (with delay to check hover state)
        const resumeAutoRotation = () => {
            // Use a short delay to let hover state settle, then check if we should resume
            setTimeout(() => {
                const isHovering = aboutCarouselContainer.matches(':hover');
                if (!isHovering && !autoRotateInterval) {
                    autoRotateInterval = setInterval(nextSlide, 8000);
                }
            }, 100);
        };

        aboutCarouselContainer.addEventListener('mouseup', resumeAutoRotation);
        aboutCarouselContainer.addEventListener('touchend', resumeAutoRotation);
    }

    // Handle page visibility changes to prevent race conditions on refocus
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Page is hidden - pause auto-rotation and clear interval
            if (autoRotateInterval) {
                clearInterval(autoRotateInterval);
                autoRotateInterval = null;
            }
        } else {
            // Page is visible again - resume auto-rotation if carousel is in view
            const aboutSection = document.getElementById('about');
            const aboutCarouselContainer = document.querySelector('.carousel-container');

            if (aboutSection && aboutCarouselContainer) {
                const rect = aboutSection.getBoundingClientRect();
                const isInView = rect.top < window.innerHeight && rect.bottom > 0;

                // Only resume if section is in view and not currently hovering
                const isHovering = aboutCarouselContainer.matches(':hover');

                if (isInView && !isHovering && !autoRotateInterval) {
                    autoRotateInterval = setInterval(nextSlide, 8000);
                }
            }
        }
    });

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

