/**
 * About Carousel Content Rendering
 *
 * Generates about carousel cards and indicators
 *
 * Dependencies: core/data-loader.js
 * Exports: About carousel rendering functions
 */

// Generate about carousel cards
function initAboutCarousel() {
    // Only run on index page
    const carouselTrack = document.getElementById('aboutCarouselTrack');
    if (!carouselTrack) return;

    // Clear existing cards
    carouselTrack.innerHTML = '';

    // Get carousel cards from dataLoader
    const cards = dataLoader.getAboutCarousel();
    if (cards.length === 0) return;

    // Generate carousel cards
    cards.forEach((card, index) => {
        const article = document.createElement('article');
        article.className = `about-card project-card project-card-featured${index === 0 ? ' active' : ''}`;
        article.setAttribute('data-card', card.dataCard);

        article.innerHTML = `
            <div class="project-bg-image"></div>
            <div class="project-content-overlay">
                <h3 class="project-title">${card.title}</h3>
                <p class="project-description">${card.description}</p>
            </div>
        `;

        carouselTrack.appendChild(article);
    });

    // Update totalSlides to match loaded data
    totalSlides = cards.length;
}

// Generate about carousel indicators
function initAboutCarouselIndicators() {
    // Only run on index page
    const indicatorsContainer = document.querySelector('.about-carousel .carousel-indicators');
    if (!indicatorsContainer) return;

    // Clear existing indicators
    indicatorsContainer.innerHTML = '';

    // Get carousel cards from dataLoader
    const cards = dataLoader.getAboutCarousel();
    if (cards.length === 0) return;

    // Generate indicators
    cards.forEach((card, index) => {
        const button = document.createElement('button');
        button.className = `indicator${index === 0 ? ' active' : ''}`;
        button.setAttribute('data-slide', index);
        button.onclick = function() { goToSlide(index, true); };
        indicatorsContainer.appendChild(button);
    });
}

