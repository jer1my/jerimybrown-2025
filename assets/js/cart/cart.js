/**
 * Cart Module
 * Handles shopping cart operations with localStorage persistence
 */

import { productTypes, sizeOptions, getPrice, formatPrice } from '../gallery/gallery-data.js';

const CART_STORAGE_KEY = 'gallery_cart';

/**
 * Cart item structure:
 * {
 *   id: string,           // unique cart item id
 *   productId: string,    // gallery item id
 *   productName: string,  // display name
 *   productImage: string, // thumbnail URL
 *   productType: 'digital' | 'print' | 'framed',
 *   size: 'square' | 'portrait' | 'landscape' | null,
 *   price: number,        // price in cents
 *   quantity: number
 * }
 */

/**
 * Get cart from localStorage
 * @returns {Array} Cart items array
 */
export function getCart() {
    try {
        const cart = localStorage.getItem(CART_STORAGE_KEY);
        return cart ? JSON.parse(cart) : [];
    } catch (e) {
        console.error('Error reading cart:', e);
        return [];
    }
}

/**
 * Save cart to localStorage
 * @param {Array} cart
 */
function saveCart(cart) {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        dispatchCartUpdate(cart);
    } catch (e) {
        console.error('Error saving cart:', e);
    }
}

/**
 * Dispatch custom event when cart updates
 * @param {Array} cart
 */
function dispatchCartUpdate(cart) {
    const event = new CustomEvent('cartUpdate', {
        detail: {
            cart,
            itemCount: getCartItemCount(cart),
            total: getCartTotal(cart)
        }
    });
    window.dispatchEvent(event);
}

/**
 * Generate unique cart item ID
 * @returns {string}
 */
function generateCartItemId() {
    return `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Add item to cart
 * @param {Object} item - Item to add
 * @param {string} item.productId - Gallery item ID
 * @param {string} item.productName - Display name
 * @param {string} item.productImage - Thumbnail URL
 * @param {string} item.productType - 'digital', 'print', or 'framed'
 * @param {string|null} item.size - 'square', 'portrait', 'landscape', or null for digital
 * @returns {Object} The added cart item
 */
export function addToCart({ productId, productName, productImage, productType, size }) {
    const cart = getCart();

    // Calculate price based on type and size
    const price = getPrice(productType, size);

    // Check if same item already exists (same product, type, and size)
    const existingIndex = cart.findIndex(item =>
        item.productId === productId &&
        item.productType === productType &&
        item.size === size
    );

    if (existingIndex > -1) {
        // Increment quantity
        cart[existingIndex].quantity += 1;
        saveCart(cart);
        return cart[existingIndex];
    }

    // Create new cart item
    const cartItem = {
        id: generateCartItemId(),
        productId,
        productName,
        productImage,
        productType,
        size,
        price,
        quantity: 1
    };

    cart.push(cartItem);
    saveCart(cart);

    return cartItem;
}

/**
 * Remove item from cart
 * @param {string} cartItemId
 */
export function removeFromCart(cartItemId) {
    const cart = getCart();
    const filteredCart = cart.filter(item => item.id !== cartItemId);
    saveCart(filteredCart);
}

/**
 * Update item quantity
 * @param {string} cartItemId
 * @param {number} quantity
 */
export function updateQuantity(cartItemId, quantity) {
    const cart = getCart();
    const item = cart.find(item => item.id === cartItemId);

    if (item) {
        if (quantity <= 0) {
            removeFromCart(cartItemId);
        } else {
            item.quantity = quantity;
            saveCart(cart);
        }
    }
}

/**
 * Clear entire cart
 */
export function clearCart() {
    saveCart([]);
}

/**
 * Get total number of items in cart
 * @param {Array} cart - Optional cart array (uses getCart if not provided)
 * @returns {number}
 */
export function getCartItemCount(cart = null) {
    const items = cart || getCart();
    return items.reduce((count, item) => count + item.quantity, 0);
}

/**
 * Get cart total in cents
 * @param {Array} cart - Optional cart array
 * @returns {number}
 */
export function getCartTotal(cart = null) {
    const items = cart || getCart();
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
}

/**
 * Get formatted cart total
 * @returns {string}
 */
export function getFormattedCartTotal() {
    return formatPrice(getCartTotal());
}

/**
 * Get product type display info
 * @param {string} productTypeId
 * @returns {Object|null}
 */
export function getProductTypeInfo(productTypeId) {
    return productTypes.find(p => p.id === productTypeId) || null;
}

/**
 * Get size display info
 * @param {string} sizeId
 * @returns {Object|null}
 */
export function getSizeInfo(sizeId) {
    return sizeOptions.find(s => s.id === sizeId) || null;
}

/**
 * Format cart item for display
 * @param {Object} cartItem
 * @returns {Object} Formatted item with display strings
 */
export function formatCartItem(cartItem) {
    const typeInfo = getProductTypeInfo(cartItem.productType);
    const sizeInfo = cartItem.size ? getSizeInfo(cartItem.size) : null;

    return {
        ...cartItem,
        typeName: typeInfo ? typeInfo.name : cartItem.productType,
        typeDescription: typeInfo ? typeInfo.description : '',
        sizeName: sizeInfo ? sizeInfo.name : '',
        sizeDimensions: sizeInfo ? sizeInfo.dimensions : '',
        formattedPrice: formatPrice(cartItem.price),
        formattedSubtotal: formatPrice(cartItem.price * cartItem.quantity)
    };
}
