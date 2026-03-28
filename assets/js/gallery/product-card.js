/**
 * Product Card Component
 * Renders gallery product cards with hover overlay
 */

import { getMinPrice } from './gallery-data.js';

/**
 * Create a product card element
 * @param {Object} product - Product data
 * @param {string} product.id - Product ID
 * @param {string} product.name - Product name
 * @param {string} product.image - Product image URL
 * @param {string} product.category - Product category
 * @param {string} product.detailUrl - URL to detail page
 * @returns {HTMLElement}
 */
export function createProductCard(product) {
    const card = document.createElement('a');
    card.href = product.detailUrl || `/product/${product.id}.html`;
    card.className = 'product-card';

    card.innerHTML = `
        <div class="product-card__image-container">
            <img
                src="${product.image}"
                alt="${product.name}"
                class="product-card__image"
                loading="lazy"
            />
            <div class="product-card__overlay">
                <h3 class="product-card__title">${product.name}</h3>
                <p class="product-card__category">${product.category || ''}</p>
                <span class="product-card__price">From ${getMinPrice()}</span>
                <span class="product-card__link accent-link-arrow">Details &rarr;</span>
            </div>
        </div>
    `;

    return card;
}

/**
 * Render product cards into a container
 * @param {Array} products - Array of product data
 * @param {HTMLElement} container - Container element
 */
export function renderProductCards(products, container) {
    container.innerHTML = '';

    products.forEach(product => {
        const card = createProductCard(product);
        container.appendChild(card);
    });
}

/**
 * Create product card HTML string (for server-side or template use)
 * @param {Object} product
 * @returns {string}
 */
export function getProductCardHTML(product) {
    const detailUrl = product.detailUrl || `/product/${product.id}.html`;

    return `
        <a href="${detailUrl}" class="product-card">
            <div class="product-card__image-container">
                <img
                    src="${product.image}"
                    alt="${product.name}"
                    class="product-card__image"
                    loading="lazy"
                />
                <div class="product-card__overlay">
                    <h3 class="product-card__title">${product.name}</h3>
                    <p class="product-card__category">${product.category || ''}</p>
                    <span class="product-card__price">From ${getMinPrice()}</span>
                    <span class="product-card__link accent-link-arrow">Details &rarr;</span>
                </div>
            </div>
        </a>
    `;
}
