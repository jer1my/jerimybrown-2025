/**
 * Gallery Grid Component
 * Renders a responsive grid of product cards
 */

import { createProductCard, renderProductCards } from './product-card.js';

/**
 * Initialize gallery grid
 * @param {HTMLElement} container - Grid container element
 * @param {Array} products - Array of product data
 * @param {Object} options - Configuration options
 */
export function initGalleryGrid(container, products, options = {}) {
    const {
        columns = 3,
        gap = 24,
        filterCategory = null
    } = options;

    // Filter products if category specified
    let displayProducts = products;
    if (filterCategory) {
        displayProducts = products.filter(p => p.category === filterCategory);
    }

    // Add grid classes
    container.classList.add('gallery-grid');
    container.style.setProperty('--gallery-columns', columns);
    container.style.setProperty('--gallery-gap', `${gap}px`);

    // Render cards
    renderProductCards(displayProducts, container);
}

/**
 * Filter gallery by category
 * @param {HTMLElement} container - Grid container
 * @param {Array} products - Full product array
 * @param {string|null} category - Category to filter by, or null for all
 */
export function filterGallery(container, products, category) {
    const filtered = category
        ? products.filter(p => p.category === category)
        : products;

    renderProductCards(filtered, container);
}

/**
 * Get unique categories from products
 * @param {Array} products
 * @returns {Array} Array of category strings
 */
export function getCategories(products) {
    const categories = new Set();
    products.forEach(p => {
        if (p.category) {
            categories.add(p.category);
        }
    });
    return Array.from(categories).sort();
}

/**
 * Create category filter buttons
 * @param {Array} categories
 * @param {Function} onFilter - Callback when filter is selected
 * @returns {HTMLElement}
 */
export function createCategoryFilter(categories, onFilter) {
    const container = document.createElement('div');
    container.className = 'gallery-filter';

    // All button
    const allBtn = document.createElement('button');
    allBtn.className = 'gallery-filter__btn gallery-filter__btn--active';
    allBtn.textContent = 'All';
    allBtn.addEventListener('click', () => {
        setActiveFilter(container, allBtn);
        onFilter(null);
    });
    container.appendChild(allBtn);

    // Category buttons
    categories.forEach(category => {
        const btn = document.createElement('button');
        btn.className = 'gallery-filter__btn';
        btn.textContent = category;
        btn.addEventListener('click', () => {
            setActiveFilter(container, btn);
            onFilter(category);
        });
        container.appendChild(btn);
    });

    return container;
}

/**
 * Set active filter button
 * @param {HTMLElement} container
 * @param {HTMLElement} activeBtn
 */
function setActiveFilter(container, activeBtn) {
    container.querySelectorAll('.gallery-filter__btn').forEach(btn => {
        btn.classList.remove('gallery-filter__btn--active');
    });
    activeBtn.classList.add('gallery-filter__btn--active');
}
