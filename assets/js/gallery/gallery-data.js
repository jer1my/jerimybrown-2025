/**
 * Gallery Product Data
 * Pricing and options for digital and print products
 */

// Prices in cents for accurate calculations
export const productTypes = [
    {
        id: 'digital',
        name: 'Digital File',
        description: 'High-resolution download',
        price: 2000
    },
    {
        id: 'print',
        name: 'Print',
        description: 'Museum-quality giclée print',
        price: 5000
    },
    {
        id: 'framed',
        name: 'Framed Print',
        description: 'Ready to hang, conservation glass with 99% UV protection',
        priceSquare: 17500,
        priceRect: 22500
    }
];

export const sizeOptions = [
    { id: 'square', name: 'Square', dimensions: '13" × 13"', aspectRatio: '1:1' },
    { id: 'portrait', name: 'Portrait', dimensions: '13" × 19"', aspectRatio: '13:19' },
    { id: 'landscape', name: 'Landscape', dimensions: '19" × 13"', aspectRatio: '19:13' }
];

/**
 * Get price for a product based on type and size
 * @param {string} productTypeId - 'digital', 'print', or 'framed'
 * @param {string} sizeId - 'square', 'portrait', or 'landscape'
 * @returns {number} Price in cents
 */
export function getPrice(productTypeId, sizeId = null) {
    const productType = productTypes.find(p => p.id === productTypeId);
    if (!productType) return 0;

    // Digital has a flat price
    if (productTypeId === 'digital') {
        return productType.price;
    }

    // Print has a flat price
    if (productTypeId === 'print') {
        return productType.price;
    }

    // Framed has different prices for square vs rectangular
    if (productTypeId === 'framed') {
        return sizeId === 'square' ? productType.priceSquare : productType.priceRect;
    }

    return 0;
}

/**
 * Format price in cents to display string
 * @param {number} priceInCents
 * @returns {string} Formatted price like "$20"
 */
export function formatPrice(priceInCents) {
    const dollars = priceInCents / 100;
    return `$${dollars.toFixed(0)}`;
}

/**
 * Get display price string for a product type (for cards/listings)
 * @param {string} productTypeId
 * @returns {string} Price display like "$20" or "$175+"
 */
export function getDisplayPrice(productTypeId) {
    const productType = productTypes.find(p => p.id === productTypeId);
    if (!productType) return '';

    if (productTypeId === 'framed') {
        return formatPrice(productType.priceSquare) + '+';
    }

    return formatPrice(productType.price);
}

/**
 * Get minimum price across all products (for "From $X" display)
 * @returns {string} Formatted minimum price
 */
export function getMinPrice() {
    const digitalPrice = productTypes.find(p => p.id === 'digital').price;
    return formatPrice(digitalPrice);
}
