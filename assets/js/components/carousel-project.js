/**
 * Project Detail Carousel System
 *
 * Project page carousel functionality
 *
 * Dependencies: components/carousel-base.js
 * Exports: Project carousel functions
 */

// Project detail carousel function
function goToProjectSlide(slideIndex, animate = false) {
    const track = document.getElementById('projectCarouselTrack');
    const indicators = document.querySelectorAll('.project-carousel .indicator');

    if (track) {
        // Ensure transition is enabled for animation
        if (animate) {
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

    // Update drag instance when slide changes externally
    if (window.projectCarouselDrag) {
        window.projectCarouselDrag.updateCurrentSlide(slideIndex);
    }
}


// Initialize project page carousels
function initProjectCarousels() {
    // Initialize project carousel if it exists
    const projectCarouselContainer = document.getElementById('projectCarouselContainer');
    const projectCarouselTrack = document.getElementById('projectCarouselTrack');
    if (projectCarouselTrack) {
        goToProjectSlide(0);

        // Initialize drag functionality for project carousel
        if (projectCarouselContainer) {
            const projectDrag = new CarouselDrag(projectCarouselContainer, {
                goToSlide: (slideIndex) => goToProjectSlide(slideIndex, true),
                threshold: 50,
                sensitivity: 1.0
            });

            // Store reference for external updates
            window.projectCarouselDrag = projectDrag;
        }
    }

    // Initialize featured carousel if it exists
    const featuredCarouselContainer = document.getElementById('featuredCarouselContainer');
    const featuredCarouselTrack = document.getElementById('featuredCarouselTrack');
    if (featuredCarouselTrack) {
        goToFeaturedSlide(0);

        // Initialize drag functionality for featured carousel
        if (featuredCarouselContainer) {
            const featuredDrag = new CarouselDrag(featuredCarouselContainer, {
                goToSlide: (slideIndex) => goToFeaturedSlide(slideIndex, true),
                threshold: 50,
                sensitivity: 1.0
            });

            // Store reference for external updates
            window.featuredCarouselDrag = featuredDrag;

            // Show drag hint on first visit
            initDragHint(featuredCarouselContainer);
        }
    }
}
// First-visit drag gesture hint functionality
function initDragHint(carouselContainer) {
    // Use global storage for gesture usage count across all project pages
    const gestureUseCount = parseInt(localStorage.getItem('gestureHintUseCount') || '0');

    // Only show hint if user hasn't used gestures 3 times yet
    if (gestureUseCount < 3 && carouselContainer) {
        // Create drag hint elements
        const dragHint = document.createElement('div');
        dragHint.className = 'drag-hint';

        const dragCursor = document.createElement('div');
        dragCursor.className = 'drag-hint-cursor';

        const dragText = document.createElement('div');
        dragText.className = 'drag-hint-text';
        dragText.textContent = 'Drag to explore';

        dragHint.appendChild(dragCursor);
        dragHint.appendChild(dragText);
        carouselContainer.appendChild(dragHint);

        // Show the hint after a short delay
        setTimeout(() => {
            carouselContainer.classList.add('show-drag-hint');
        }, 1000);

        // Hide the hint after animation completes (extended duration for better readability)
        setTimeout(() => {
            carouselContainer.classList.remove('show-drag-hint');
            setTimeout(() => {
                if (dragHint.parentNode) {
                    dragHint.parentNode.removeChild(dragHint);
                }
            }, 300); // Wait for fade transition
        }, 6500); // Extended from 4000ms to 6500ms

        // Also hide hint immediately if user starts interacting
        let hasInteracted = false;
        const hideOnInteraction = () => {
            if (!hasInteracted) {
                hasInteracted = true;
                carouselContainer.classList.remove('show-drag-hint');
                setTimeout(() => {
                    if (dragHint.parentNode) {
                        dragHint.parentNode.removeChild(dragHint);
                    }
                }, 300);

                // Increment gesture use count when user interacts
                const currentCount = parseInt(localStorage.getItem('gestureHintUseCount') || '0');
                localStorage.setItem('gestureHintUseCount', (currentCount + 1).toString());
            }
        };

        carouselContainer.addEventListener('mousedown', hideOnInteraction);
        carouselContainer.addEventListener('touchstart', hideOnInteraction);

        // Also hide on any carousel indicator click
        const indicators = carouselContainer.parentNode.querySelectorAll('.featured-carousel-indicators .indicator');
        indicators.forEach(indicator => {
            indicator.addEventListener('click', hideOnInteraction);
        });
    }
}

// Reset gesture hints function (called by user control)
function resetGestureHints() {
    // Reset the gesture use count to 0
    localStorage.setItem('gestureHintUseCount', '0');

    // Optionally reload the page to show the hint immediately
    location.reload();
}

// Testing function to force show drag hint (for debugging)
function testDragHint() {
    const featuredCarouselContainer = document.getElementById('featuredCarouselContainer');
    if (featuredCarouselContainer) {
        // Reset the gesture use count and show hint
        localStorage.setItem('gestureHintUseCount', '0');
        initDragHint(featuredCarouselContainer);
    }
}

