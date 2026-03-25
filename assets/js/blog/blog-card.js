/**
 * Blog Card Module
 * Creates blog post cards for the listing page.
 */

import { getThumbCoverPath, formatDate } from './blog-data.js';

function getCurrentTheme() {
    return document.body.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

// Update all blog card images when theme changes
window.addEventListener('themechange', (e) => {
    document.querySelectorAll('.blog-card__image[data-slug]').forEach(el => {
        const slug = el.dataset.slug;
        const newPath = getThumbCoverPath(slug, e.detail.theme);
        if (newPath) {
            el.style.backgroundImage = `url('${newPath}')`;
        }
    });
});

/**
 * Capitalize a category name for display
 */
function formatCategory(category) {
    return category.charAt(0).toUpperCase() + category.slice(1);
}

/**
 * Create a blog card element
 * @param {Object} post - Blog post from blog-data.js
 * @returns {HTMLElement} The blog card element
 */
export function createBlogCard(post) {
    const coverPath = getThumbCoverPath(post.slug, getCurrentTheme());

    const card = document.createElement('a');
    card.href = `blog/${post.slug}.html`;
    card.className = 'blog-card';
    card.setAttribute('aria-label', `Read: ${post.title}`);
    card.dataset.slug = post.slug;

    const posStyle = post.coverPosition && post.coverPosition !== 'center'
        ? `; background-position: ${post.coverPosition}`
        : '';
    const imageHTML = coverPath
        ? `<div class="blog-card__image" data-slug="${post.slug}" style="background-image: url('${coverPath}')${posStyle};"></div>`
        : '';

    card.innerHTML = `
        ${imageHTML}
        <div class="blog-card__content">
            <span class="blog-card__category">${formatCategory(post.category)}</span>
            <h3 class="blog-card__title">${post.title}</h3>
            <p class="blog-card__excerpt">${post.excerpt}</p>
            <time class="blog-card__date" datetime="${post.datePublished}">${formatDate(post.datePublished)}</time>
        </div>
    `;

    return card;
}
