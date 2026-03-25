/**
 * Blog Detail Module
 * Renders blog post header, carousel (if images exist), and related item link.
 * The article body content is already inlined at build time.
 */

import {
    getPostBySlug,
    formatDate,
    getSlidePathsForTheme,
    getThumbSlidePathsForTheme
} from './blog-data.js';

const IMAGE_BASE_PATH = '../assets/content/blog';

function getCurrentTheme() {
    return document.body.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

function init() {
    const article = document.querySelector('.blog-article');
    if (!article) return;

    const slug = article.dataset.postSlug;
    if (!slug) return;

    const post = getPostBySlug(slug);
    if (!post) return;

    const categoryLabel = post.category.charAt(0).toUpperCase() + post.category.slice(1);

    // Render article header
    const header = document.getElementById('blog-header');
    if (header) {
        header.innerHTML = `
            <h1 class="blog-article__title">${post.title}</h1>
            <div class="blog-article__meta">
                <span class="blog-article__category">${categoryLabel}</span>
                <time datetime="${post.datePublished}">${formatDate(post.datePublished)}</time>
            </div>
        `;
    }

    // Render carousel if images exist
    const allSlides = getSlidePathsForTheme(slug, getCurrentTheme(), IMAGE_BASE_PATH);
    const allThumbs = getThumbSlidePathsForTheme(slug, getCurrentTheme(), IMAGE_BASE_PATH);
    const carouselContainer = document.getElementById('blog-carousel');

    if (carouselContainer && allSlides.length > 0) {
        const prevArrowSVG = `<svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg>`;
        const nextArrowSVG = `<svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>`;

        carouselContainer.innerHTML = `
            <div class="product-carousel">
                <div class="product-carousel__container">
                    <div class="product-carousel__track">
                        ${allSlides.map(src => `
                            <div class="product-carousel__slide">
                                <div class="product-carousel__slide-bg" style="background-image: url('${src}');"></div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ${allSlides.length > 1 ? `<button class="product-carousel__arrow product-carousel__arrow--prev" aria-label="Previous image">${prevArrowSVG}</button>
                <button class="product-carousel__arrow product-carousel__arrow--next" aria-label="Next image">${nextArrowSVG}</button>` : ''}
            </div>
            ${allSlides.length > 1 ? `
            <div class="product-thumbnail-strip">
                <button class="product-thumbnail-strip__arrow product-thumbnail-strip__arrow--prev" aria-label="Previous thumbnails">${prevArrowSVG}</button>
                <div class="product-thumbnail-strip__viewport">
                    <div class="product-thumbnail-strip__track">
                        ${allThumbs.map((src, i) => `
                            <div class="product-thumbnail-strip__item${i === 0 ? ' product-thumbnail-strip__item--active' : ''}" data-slide="${i}">
                                <div class="product-thumbnail-strip__bg" style="background-image: url('${src}');"></div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <button class="product-thumbnail-strip__arrow product-thumbnail-strip__arrow--next" aria-label="Next thumbnails">${nextArrowSVG}</button>
            </div>
            ` : ''}
        `;

        // Show the carousel column
        carouselContainer.closest('.blog-article__images').classList.add('blog-article__images--active');

        initCarousel();

        // Theme change: update carousel images
        window.addEventListener('themechange', (e) => {
            const themeSrcs = getSlidePathsForTheme(slug, e.detail.theme, IMAGE_BASE_PATH);
            const themeThumbSrcs = getThumbSlidePathsForTheme(slug, e.detail.theme, IMAGE_BASE_PATH);

            const slideBgs = carouselContainer.querySelectorAll('.product-carousel__slide-bg');
            const thumbBgs = carouselContainer.querySelectorAll('.product-thumbnail-strip__bg');

            const imagesCol = carouselContainer.closest('.blog-article__images');
            if (imagesCol) {
                imagesCol.style.transition = 'opacity 0.25s ease';
                imagesCol.style.opacity = '0';
                setTimeout(() => {
                    slideBgs.forEach((el, i) => {
                        if (themeSrcs[i]) el.style.backgroundImage = `url('${themeSrcs[i]}')`;
                    });
                    thumbBgs.forEach((el, i) => {
                        if (themeThumbSrcs[i]) el.style.backgroundImage = `url('${themeThumbSrcs[i]}')`;
                    });
                    imagesCol.style.opacity = '1';
                }, 250);
            }
        });
    }

    // Render related item link in content column only if no carousel is showing
    const related = document.getElementById('blog-related');
    if (related && post.relatedItem && allSlides.length === 0) {
        related.innerHTML = `
            <div class="blog-article__related-card">
                <p class="blog-article__related-label">Featured in this post</p>
                <a href="../work/${post.relatedItem}.html" class="accent-link-arrow">View project →</a>
            </div>
        `;
    }
}

/**
 * Initialize carousel behavior
 */
function initCarousel() {
    const track = document.querySelector('.product-carousel__track');
    const container = document.querySelector('.product-carousel__container');
    const thumbs = document.querySelectorAll('.product-thumbnail-strip__item');
    const prevBtn = document.querySelector('.product-carousel__arrow--prev');
    const nextBtn = document.querySelector('.product-carousel__arrow--next');

    const thumbTrack = document.querySelector('.product-thumbnail-strip__track');
    const thumbViewport = document.querySelector('.product-thumbnail-strip__viewport');
    const thumbPrevBtn = document.querySelector('.product-thumbnail-strip__arrow--prev');
    const thumbNextBtn = document.querySelector('.product-thumbnail-strip__arrow--next');

    if (!track || !container) return;

    const totalSlides = Math.max(thumbs.length, track.children.length);
    let currentSlide = 0;
    let autoAdvanceTimer = null;
    let resumeTimer = null;

    const VISIBLE_THUMBS = 5;
    const GAP_PX = 8;

    function getThumbMetrics() {
        if (!thumbViewport) return { thumbWidth: 0, step: 0, viewportWidth: 0 };
        const viewportWidth = thumbViewport.offsetWidth;
        const visibleCount = Math.min(totalSlides, VISIBLE_THUMBS);
        const thumbWidth = (viewportWidth - (visibleCount - 1) * GAP_PX) / visibleCount;
        return { thumbWidth, step: thumbWidth + GAP_PX, viewportWidth };
    }

    function sizeThumbItems() {
        if (!thumbTrack || !thumbViewport || totalSlides === 0) return;
        const { thumbWidth } = getThumbMetrics();
        thumbs.forEach(t => { t.style.width = `${thumbWidth}px`; });
    }

    function goToSlide(index) {
        currentSlide = ((index % totalSlides) + totalSlides) % totalSlides;
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        thumbs.forEach((t, i) => {
            t.classList.toggle('product-thumbnail-strip__item--active', i === currentSlide);
        });
        centerThumbOnActive();
    }

    function centerThumbOnActive() {
        if (!thumbTrack || !thumbViewport || totalSlides <= VISIBLE_THUMBS) return;
        const { thumbWidth, step, viewportWidth } = getThumbMetrics();
        const activeCenter = currentSlide * step + thumbWidth / 2;
        let shift = activeCenter - viewportWidth / 2;
        const maxShift = (totalSlides * step - GAP_PX) - viewportWidth;
        shift = Math.max(0, Math.min(shift, maxShift));
        thumbTrack.style.transform = `translateX(-${shift}px)`;
    }

    function nextSlide() { goToSlide(currentSlide + 1); }
    function prevSlide() { goToSlide(currentSlide - 1); }

    function startAutoAdvance() {
        stopAutoAdvance();
        autoAdvanceTimer = setInterval(nextSlide, 4500);
    }

    function stopAutoAdvance() {
        if (autoAdvanceTimer) { clearInterval(autoAdvanceTimer); autoAdvanceTimer = null; }
    }

    function pauseAndResume() {
        stopAutoAdvance();
        if (resumeTimer) clearTimeout(resumeTimer);
        resumeTimer = setTimeout(startAutoAdvance, 8000);
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); pauseAndResume(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); pauseAndResume(); });
    if (thumbPrevBtn) thumbPrevBtn.addEventListener('click', () => { prevSlide(); pauseAndResume(); });
    if (thumbNextBtn) thumbNextBtn.addEventListener('click', () => { nextSlide(); pauseAndResume(); });

    thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            goToSlide(parseInt(thumb.dataset.slide, 10));
            pauseAndResume();
        });
    });

    // Touch swipe
    let touchStartX = 0, touchDeltaX = 0, isSwiping = false;
    container.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX; touchDeltaX = 0; isSwiping = true;
        track.classList.add('product-carousel__track--no-transition');
    }, { passive: true });
    container.addEventListener('touchmove', (e) => {
        if (isSwiping) touchDeltaX = e.touches[0].clientX - touchStartX;
    }, { passive: true });
    container.addEventListener('touchend', () => {
        if (!isSwiping) return; isSwiping = false;
        track.classList.remove('product-carousel__track--no-transition');
        if (Math.abs(touchDeltaX) > 30) {
            if (touchDeltaX < 0) nextSlide(); else prevSlide();
            pauseAndResume();
        }
    });

    // Visibility API
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) stopAutoAdvance(); else startAutoAdvance();
    });

    sizeThumbItems();
    let resizeTimer = null;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => { sizeThumbItems(); centerThumbOnActive(); }, 100);
    });

    startAutoAdvance();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
