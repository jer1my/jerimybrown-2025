/**
 * Brand Logo Rendering
 *
 * Generates brand logo scroller
 *
 * Dependencies: core/data-loader.js
 * Exports: Brand rendering functions
 */

// Generate brand logos for brands section
function initBrandLogos() {
    // Only run on index page
    const logoScrollerTrack = document.querySelector('.logo-scroller-track');
    if (!logoScrollerTrack) return;

    // Clear existing logos
    logoScrollerTrack.innerHTML = '';

    // Get brands from dataLoader
    const brands = dataLoader.getBrands();
    if (brands.length === 0) return;

    // Generate first set of logos
    brands.forEach(brand => {
        const lightImg = document.createElement('img');
        lightImg.src = brand.lightLogo;
        lightImg.alt = brand.alt;
        lightImg.className = 'brand-logo logo-light';
        logoScrollerTrack.appendChild(lightImg);

        const darkImg = document.createElement('img');
        darkImg.src = brand.darkLogo;
        darkImg.alt = brand.alt;
        darkImg.className = 'brand-logo logo-dark';
        logoScrollerTrack.appendChild(darkImg);
    });

    // Duplicate set for seamless infinite loop
    brands.forEach(brand => {
        const lightImg = document.createElement('img');
        lightImg.src = brand.lightLogo;
        lightImg.alt = brand.alt;
        lightImg.className = 'brand-logo logo-light';
        logoScrollerTrack.appendChild(lightImg);

        const darkImg = document.createElement('img');
        darkImg.src = brand.darkLogo;
        darkImg.alt = brand.alt;
        darkImg.className = 'brand-logo logo-dark';
        logoScrollerTrack.appendChild(darkImg);
    });
}

