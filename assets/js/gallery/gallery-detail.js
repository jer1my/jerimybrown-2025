/**
 * Gallery Detail Page
 * Renders product detail pages with purchase form
 */

import { productTypes, sizeOptions, getPrice, formatPrice, getDisplayPrice } from './gallery-data.js';
import { addToCart, getCartItemCount } from '../cart/cart.js';

/**
 * Purchase Form State
 */
let currentState = {
    productId: null,
    productName: '',
    productImage: '',
    selectedType: 'digital',
    selectedSize: 'square'
};

/**
 * Initialize purchase form on a detail page
 * @param {Object} product - Product data
 * @param {string} product.id - Product ID
 * @param {string} product.name - Product name
 * @param {string} product.image - Product image URL
 * @param {HTMLElement} container - Container element for the form
 */
export function initPurchaseForm(product, container) {
    currentState.productId = product.id;
    currentState.productName = product.name;
    currentState.productImage = product.image;

    renderPurchaseForm(container);
    attachEventListeners(container);
    updatePrice();
}

/**
 * Render the purchase form HTML
 * @param {HTMLElement} container
 */
function renderPurchaseForm(container) {
    const html = `
        <div class="purchase-form">
            <div class="purchase-section">
                <h4 class="purchase-section-title">Choose Format</h4>
                <div class="purchase-options purchase-options--type">
                    ${productTypes.map(type => `
                        <button
                            type="button"
                            class="purchase-option ${type.id === currentState.selectedType ? 'purchase-option--selected' : ''}"
                            data-type="${type.id}"
                        >
                            <span class="purchase-option-name">${type.name}</span>
                            <span class="purchase-option-price">${getDisplayPrice(type.id)}</span>
                        </button>
                    `).join('')}
                </div>
            </div>

            <div class="purchase-section purchase-section--size" id="sizeSection">
                <h4 class="purchase-section-title">Choose Size</h4>
                <div class="purchase-options purchase-options--size">
                    ${sizeOptions.map(size => `
                        <button
                            type="button"
                            class="purchase-option ${size.id === currentState.selectedSize ? 'purchase-option--selected' : ''}"
                            data-size="${size.id}"
                        >
                            <span class="purchase-option-name">${size.name}</span>
                            <span class="purchase-option-dimensions">${size.dimensions}</span>
                        </button>
                    `).join('')}
                </div>
            </div>

            <div class="purchase-total">
                <span class="purchase-total-label">Total:</span>
                <span class="purchase-total-price" id="purchasePrice">$20</span>
            </div>

            <button type="button" class="purchase-add-btn" id="addToCartBtn">
                Add to Cart
            </button>

            <p class="purchase-note" id="purchaseNote"></p>
        </div>
    `;

    container.innerHTML = html;
}

/**
 * Attach event listeners to purchase form
 * @param {HTMLElement} container
 */
function attachEventListeners(container) {
    // Type selection
    const typeButtons = container.querySelectorAll('[data-type]');
    typeButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentState.selectedType = button.dataset.type;
            updateTypeSelection(container);
            updateSizeVisibility(container);
            updatePrice();
        });
    });

    // Size selection
    const sizeButtons = container.querySelectorAll('[data-size]');
    sizeButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentState.selectedSize = button.dataset.size;
            updateSizeSelection(container);
            updatePrice();
        });
    });

    // Add to cart
    const addBtn = container.querySelector('#addToCartBtn');
    addBtn.addEventListener('click', handleAddToCart);
}

/**
 * Update type button selection state
 * @param {HTMLElement} container
 */
function updateTypeSelection(container) {
    const buttons = container.querySelectorAll('[data-type]');
    buttons.forEach(button => {
        button.classList.toggle(
            'purchase-option--selected',
            button.dataset.type === currentState.selectedType
        );
    });
}

/**
 * Update size button selection state
 * @param {HTMLElement} container
 */
function updateSizeSelection(container) {
    const buttons = container.querySelectorAll('[data-size]');
    buttons.forEach(button => {
        button.classList.toggle(
            'purchase-option--selected',
            button.dataset.size === currentState.selectedSize
        );
    });
}

/**
 * Show/hide size section based on product type
 * @param {HTMLElement} container
 */
function updateSizeVisibility(container) {
    const sizeSection = container.querySelector('#sizeSection');
    const note = container.querySelector('#purchaseNote');

    if (currentState.selectedType === 'digital') {
        sizeSection.classList.add('purchase-section--hidden');
        note.textContent = 'You will select the aspect ratio after purchase.';
    } else {
        sizeSection.classList.remove('purchase-section--hidden');
        note.textContent = '';
    }
}

/**
 * Update displayed price
 */
function updatePrice() {
    const priceEl = document.querySelector('#purchasePrice');
    if (!priceEl) return;

    const size = currentState.selectedType === 'digital' ? null : currentState.selectedSize;
    const price = getPrice(currentState.selectedType, size);
    priceEl.textContent = formatPrice(price);
}

/**
 * Handle add to cart click
 */
function handleAddToCart() {
    const size = currentState.selectedType === 'digital' ? null : currentState.selectedSize;

    const item = addToCart({
        productId: currentState.productId,
        productName: currentState.productName,
        productImage: currentState.productImage,
        productType: currentState.selectedType,
        size
    });

    // Show feedback
    showAddedFeedback();

    // Update cart count in header if exists
    updateCartCount();
}

/**
 * Show visual feedback when item is added
 */
function showAddedFeedback() {
    const btn = document.querySelector('#addToCartBtn');
    if (!btn) return;

    const originalText = btn.textContent;
    btn.textContent = 'Added!';
    btn.classList.add('purchase-add-btn--success');

    setTimeout(() => {
        btn.textContent = originalText;
        btn.classList.remove('purchase-add-btn--success');
    }, 1500);
}

/**
 * Update cart count display in header
 */
function updateCartCount() {
    const countEl = document.querySelector('.cart-count');
    if (countEl) {
        const count = getCartItemCount();
        countEl.textContent = count;
        countEl.classList.toggle('cart-count--visible', count > 0);
    }
}

/**
 * Create a standalone purchase form element
 * @param {Object} product - Product data
 * @returns {HTMLElement}
 */
export function createPurchaseForm(product) {
    const container = document.createElement('div');
    container.className = 'purchase-form-container';
    initPurchaseForm(product, container);
    return container;
}
