/**
 * Universal Carousel Drag/Swipe Functionality
 *
 * Provides drag and swipe interactions for all carousel types
 *
 * Dependencies: None
 * Exports: CarouselDrag class
 */

// Universal Drag/Swipe Functionality for Carousels
class CarouselDrag {
    constructor(container, options = {}) {
        this.container = container;
        this.track = container.querySelector('.carousel-track, .featured-image-carousel-track');
        this.slides = this.track ? this.track.children : [];
        this.currentSlide = this.track ? parseInt(this.track.getAttribute('data-position')) || 0 : 0;
        this.totalSlides = this.slides.length;

        // Configuration
        this.threshold = options.threshold || 30; // Minimum drag distance
        this.sensitivity = options.sensitivity || 0.3; // Drag sensitivity

        // Drag state
        this.isDragging = false;
        this.startX = 0;
        this.currentX = 0;
        this.dragDistance = 0;
        this.startTime = 0;

        // Transition guard to prevent drag during slide changes
        this.isTransitioning = false;
        this.lastTransitionTime = 0;

        // Navigation functions
        this.goToSlide = options.goToSlide || this.defaultGoToSlide.bind(this);

        this.init();
    }

    init() {
        if (!this.track) return;

        // Add touch event listeners
        this.container.addEventListener('touchstart', this.handleStart.bind(this), { passive: false });
        this.container.addEventListener('touchmove', this.handleMove.bind(this), { passive: false });
        this.container.addEventListener('touchend', this.handleEnd.bind(this), { passive: false });

        // Add mouse event listeners for desktop
        this.container.addEventListener('mousedown', this.handleStart.bind(this), { passive: false });
        this.container.addEventListener('mousemove', this.handleMove.bind(this), { passive: false });
        this.container.addEventListener('mouseup', this.handleEnd.bind(this), { passive: false });
        this.container.addEventListener('mouseleave', this.handleEnd.bind(this), { passive: false });

        // Prevent image dragging and text selection
        this.container.addEventListener('dragstart', (e) => e.preventDefault());
        this.container.style.userSelect = 'none';
        this.container.style.touchAction = 'pan-y'; // Allow vertical scrolling
    }

    getEventX(e) {
        return e.touches ? e.touches[0].clientX : e.clientX;
    }

    handleStart(e) {
        // Only handle primary touch/click
        if (e.touches && e.touches.length > 1) return;

        // Don't allow drag to start if a transition is in progress
        const timeSinceLastTransition = Date.now() - this.lastTransitionTime;
        if (this.isTransitioning || timeSinceLastTransition < 100) {
            return;
        }

        this.isDragging = true;
        this.startX = this.getEventX(e);
        this.currentX = this.startX;
        this.startTime = Date.now();

        // Disable transition during drag
        this.track.style.transition = 'none';

        // Prevent default to avoid scrolling issues
        if (e.type === 'mousedown') {
            e.preventDefault();
        }
    }

    handleMove(e) {
        if (!this.isDragging) return;

        this.currentX = this.getEventX(e);
        this.dragDistance = this.currentX - this.startX;

        // Calculate the base position for current slide
        const slideWidth = this.container.offsetWidth;
        const baseTransform = -this.currentSlide * slideWidth;

        // Apply drag offset with sensitivity
        const dragOffset = this.dragDistance * this.sensitivity;
        this.track.style.transform = `translateX(${baseTransform + dragOffset}px)`;

        // Prevent vertical scrolling during horizontal drag
        if (Math.abs(this.dragDistance) > 10) {
            e.preventDefault();
        }
    }

    handleEnd(e) {
        if (!this.isDragging) return;

        this.isDragging = false;

        // Calculate drag velocity and direction
        const dragTime = Date.now() - this.startTime;
        const velocity = Math.abs(this.dragDistance) / dragTime;
        const dragDirection = this.dragDistance > 0 ? 'right' : 'left';

        // Determine if we should change slides
        const shouldChangeSlide = Math.abs(this.dragDistance) > this.threshold || velocity > 0.5;

        if (shouldChangeSlide) {
            if (dragDirection === 'left') {
                // Dragged left, go to next slide
                this.nextSlide();
            } else {
                // Dragged right, go to previous slide
                this.prevSlide();
            }
        } else {
            // Snap back to current slide by restoring CSS-based positioning
            this.isTransitioning = true;
            this.lastTransitionTime = Date.now();
            this.track.style.transform = '';
            this.track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            this.goToSlide(this.currentSlide);

            // Clear transition flag after animation completes
            setTimeout(() => {
                this.isTransitioning = false;
            }, 500);
        }

        // Reset drag state
        this.dragDistance = 0;
    }


    nextSlide() {
        // Mark transition as starting
        this.isTransitioning = true;
        this.lastTransitionTime = Date.now();

        // Wrap around from last to first
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;

        // Clear inline transform and restore CSS-based positioning
        this.track.style.transform = '';
        this.track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        this.goToSlide(this.currentSlide);

        // Clear transition flag after animation completes
        setTimeout(() => {
            this.isTransitioning = false;
        }, 500);
    }

    prevSlide() {
        // Mark transition as starting
        this.isTransitioning = true;
        this.lastTransitionTime = Date.now();

        // Wrap around from first to last
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;

        // Clear inline transform and restore CSS-based positioning
        this.track.style.transform = '';
        this.track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        this.goToSlide(this.currentSlide);

        // Clear transition flag after animation completes
        setTimeout(() => {
            this.isTransitioning = false;
        }, 500);
    }

    defaultGoToSlide(slideIndex) {
        // Default slide navigation - can be overridden
        this.currentSlide = slideIndex;
        if (this.track) {
            this.track.setAttribute('data-position', slideIndex);
        }
    }

    updateCurrentSlide(slideIndex) {
        this.currentSlide = slideIndex;
    }
}
