/**
 * Featured Image Carousel System
 *
 * Featured carousel with metadata updates
 *
 * Dependencies: components/carousel-base.js, core/config.js, core/data-loader.js
 * Exports: Featured carousel functions
 */

// DEPRECATED: Featured carousel slide content data
// This object is now loaded from data/projects.json (carouselMetadata property)
// Keeping for backwards compatibility during transition
const featuredSlideContent = {
    'ai-strategy': [
        {
            label1: 'Role', value1: 'UX Director / Designer',
            label2: 'Timeline', value2: '3 months',
            label3: 'Team', value3: '3 UX, 4 Dev, 3 PO'
        },
        {
            label1: 'AI Patterns', value1: 'Lots of new patterns emerging with AI. Consider the above for building trust'
        },
        {
            label1: 'Trust Building Release Cycle', value1: 'We introduced AI iteratively, starting with low-risk features'
        }
    ],
    'product-suite': [
        {
            label1: 'Role', value1: 'UX Director / Designer',
            label2: 'Timeline', value2: '36 months',
            label3: 'Team', value3: '16 UX, 20 Dev, 8 PO'
        },
        {
            label1: 'Component System', value1: 'Unified system harmonizing patterns into modern, reusable components'
        },
        {
            label1: 'AI Integration', value1: 'Earning trust through gradual AI adoption—starting with writing assistance, advancing to automation'
        },
        {
            label1: 'Progressive Disclosure', value1: 'Progressive disclosure and application modalities reduce cognitive load by selectively hiding unneeded UI when user is focused on a task'
        }
    ],
    'research-strategy': [
        {
            label1: 'Role', value1: 'UX Director / Designer',
            label2: 'Timeline', value2: '2 Weeks',
            label3: 'Team', value3: 'Me'
        },
        {
            label1: 'Methodology', value1: 'Rapid pattern validation through strategic use of unmoderated testing'
        },
        {
            label1: 'Impact', value1: 'Showing research can deliver value quickly and efficiently.'
        }
    ],
    'design-system': [
        {
            label1: 'Role', value1: 'UX Director / Designer',
            label2: 'Timeline', value2: '18 months',
            label3: 'Team', value3: '2 UX, 2 Devs'
        },
        {
            label1: 'Methodology', value1: 'Atomic design approach with component-based architecture'
        },
        {
            label1: 'Tokens', value1: 'Cross-platform design tokens for unified brand experience'
        },
        {
            label1: 'Icons', value1: '500+ consistent visual elements giving our organization total ownership over the set'
        },
        {
            label1: 'Responsive Components', value1: '136 documented UI elements used by 29 teams'
        },
        {
            label1: 'Templates', value1: 'Templates streamline the UX design process across teams'
        },
        {
            label1: 'Accessibility', value1: 'Accessibility in our system ensures inclusive, high-quality experiences for our entire user base'
        }
    ]
};

// Featured image carousel function
function goToFeaturedSlide(slideIndex, animate = false) {
    const track = document.getElementById('featuredCarouselTrack');
    const indicators = document.querySelectorAll('.featured-carousel-indicators .indicator');

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

    // Update featured carousel meta content
    updateFeaturedSlideContent(slideIndex);

    // Update drag instance when slide changes externally
    if (window.featuredCarouselDrag) {
        window.featuredCarouselDrag.updateCurrentSlide(slideIndex);
    }
}

// Function to update featured carousel meta content
function updateFeaturedSlideContent(slideIndex) {
    const metaContainer = document.querySelector('.project-meta');
    if (!metaContainer) return;

    // Determine which project we're on based on the page URL
    const currentPage = window.location.pathname;
    let projectKey = '';

    if (currentPage.includes('ai-strategy')) {
        projectKey = 'ai-strategy';
    } else if (currentPage.includes('product-suite')) {
        projectKey = 'product-suite';
    } else if (currentPage.includes('research-strategy')) {
        projectKey = 'research-strategy';
    } else if (currentPage.includes('design-system')) {
        projectKey = 'design-system';
    }

    // Get the project data from dataLoader (with fallback to hardcoded content)
    const project = dataLoader.getProject(projectKey);
    const content = project?.carouselMetadata || featuredSlideContent[projectKey];

    if (content && content[slideIndex]) {
        const metaItems = metaContainer.querySelectorAll('.meta-item');
        const slideContent = content[slideIndex];

        // Slide out current content
        metaItems.forEach(item => {
            item.classList.add('slide-out');
            item.classList.remove('slide-in');
        });

        // Wait for slide-out animation, then update content and slide in
        setTimeout(() => {
            // Check if this is a 3-field slide (has label2 and label3) or 2-field slide
            const isThreeField = slideContent.label2 && slideContent.label3;

            if (isThreeField) {
                // Show all 3 meta items for slide 1
                metaItems.forEach((item, index) => {
                    item.style.display = 'flex';
                    const label = item.querySelector('.meta-label');
                    const value = item.querySelector('.meta-value');

                    if (index === 0 && label && value) {
                        label.textContent = slideContent.label1;
                        value.textContent = slideContent.value1;
                    } else if (index === 1 && label && value) {
                        label.textContent = slideContent.label2;
                        value.textContent = slideContent.value2;
                    } else if (index === 2 && label && value) {
                        label.textContent = slideContent.label3;
                        value.textContent = slideContent.value3;
                    }

                    // Slide in with slight delay for each item
                    setTimeout(() => {
                        item.classList.remove('slide-out');
                        item.classList.add('slide-in');
                    }, index * 50);
                });
            } else {
                // Show only first meta item for slides 2+, hide others
                metaItems.forEach((item, index) => {
                    const label = item.querySelector('.meta-label');
                    const value = item.querySelector('.meta-value');

                    if (index === 0) {
                        item.style.display = 'flex';
                        if (label && value) {
                            label.textContent = slideContent.label1;
                            value.textContent = slideContent.value1;
                        }
                        // Slide in
                        item.classList.remove('slide-out');
                        item.classList.add('slide-in');
                    } else {
                        item.style.display = 'none';
                    }
                });
            }
        }, 300); // Match slide-out transition duration
    }
}

