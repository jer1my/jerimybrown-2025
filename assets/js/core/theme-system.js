/**
 * Theme System
 *
 * Handles light/dark theme switching and responsive image updates
 *
 * Dependencies: None
 * Exports: initTheme(), toggleTheme()
 */

// ==========================================
// Theme Icon Management
// ==========================================

function updateThemeIcon(toggle, iconType) {
    const moonSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.98038 2.73135C9.79117 2.67374 9.59078 2.67397 9.40415 2.72944C7.79045 3.18158 6.32264 4.04719 5.14599 5.24078C3.96517 6.4386 3.11882 7.92491 2.69124 9.55165C2.26365 11.1784 2.26977 12.8888 2.70898 14.5124C3.14819 16.136 4.00515 17.6163 5.19451 18.8056C6.38386 19.995 7.86409 20.8519 9.48773 21.2911C11.1114 21.7303 12.8218 21.7364 14.4485 21.3088C16.0752 20.8812 17.5615 20.0348 18.7593 18.854C19.9525 17.6778 20.8179 16.2106 21.2702 14.5976C21.324 14.4177 21.3265 14.2247 21.275 14.041C21.1538 13.6089 20.7597 13.3102 20.311 13.3106C20.2099 13.3107 20.1116 13.326 20.0186 13.3546C18.7246 13.7093 17.3598 13.7164 16.0619 13.3751C14.7554 13.0314 13.5636 12.347 12.6083 11.3918C11.6531 10.4365 10.9686 9.24468 10.625 7.93818C10.2834 6.63949 10.2908 5.27379 10.6461 3.9791C10.6732 3.89024 10.6881 3.79655 10.6893 3.70018C10.6947 3.25564 10.4057 2.86084 9.98038 2.73135ZM6.57028 6.64485C7.11058 6.09677 7.72838 5.63598 8.40126 5.27566C8.32141 6.33717 8.41781 7.40898 8.69079 8.44689C9.12451 10.096 9.98839 11.6003 11.1941 12.806C12.3998 14.0117 13.9041 14.8756 15.5532 15.3093C16.5911 15.5822 17.6629 15.6786 18.7244 15.5988C18.3641 16.2717 17.9033 16.8894 17.3553 17.4297C16.4063 18.3652 15.2288 19.0357 13.9401 19.3745C12.6513 19.7133 11.2963 19.7084 10.01 19.3605C8.72365 19.0125 7.55096 18.3336 6.60871 17.3914C5.66647 16.4492 4.98755 15.2765 4.63959 13.9902C4.29163 12.7039 4.28679 11.3488 4.62553 10.0601C4.96428 8.77132 5.63479 7.59381 6.57028 6.64485Z" fill="currentColor"/>
    </svg>`;

    const sunSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0.5C12.5523 0.5 13 0.947715 13 1.5V3.375C13 3.92728 12.5523 4.375 12 4.375C11.4477 4.375 11 3.92728 11 3.375V1.5C11 0.947715 11.4477 0.5 12 0.5Z" fill="currentColor"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.375 12C5.375 8.34111 8.34111 5.375 12 5.375C15.6589 5.375 18.625 8.34111 18.625 12C18.625 15.6589 15.6589 18.625 12 18.625C8.34111 18.625 5.375 15.6589 5.375 12ZM12 7.375C9.44568 7.375 7.375 9.44568 7.375 12C7.375 14.5543 9.44568 16.625 12 16.625C14.5543 16.625 16.625 14.5543 16.625 12C16.625 9.44568 14.5543 7.375 12 7.375Z" fill="currentColor"/>
        <path d="M5.28249 3.86827C4.89196 3.47775 4.2588 3.47775 3.86827 3.86827C3.47775 4.2588 3.47775 4.89196 3.86827 5.28249L5.1941 6.60831C5.58462 6.99884 6.21779 6.99884 6.60831 6.60831C6.99884 6.21779 6.99884 5.58462 6.60831 5.1941L5.28249 3.86827Z" fill="currentColor"/>
        <path d="M0.5 12C0.5 11.4477 0.947715 11 1.5 11H3.375C3.92728 11 4.375 11.4477 4.375 12C4.375 12.5523 3.92728 13 3.375 13H1.5C0.947715 13 0.5 12.5523 0.5 12Z" fill="currentColor"/>
        <path d="M6.60831 18.8059C6.99884 18.4154 6.99884 17.7822 6.60831 17.3917C6.21779 17.0012 5.58462 17.0012 5.1941 17.3917L3.86827 18.7175C3.47775 19.1081 3.47775 19.7412 3.86827 20.1318C4.2588 20.5223 4.89196 20.5223 5.28249 20.1317L6.60831 18.8059Z" fill="currentColor"/>
        <path d="M12 19.625C12.5523 19.625 13 20.0727 13 20.625V22.5C13 23.0523 12.5523 23.5 12 23.5C11.4477 23.5 11 23.0523 11 22.5V20.625C11 20.0727 11.4477 19.625 12 19.625Z" fill="currentColor"/>
        <path d="M18.8059 17.3917C18.4154 17.0012 17.7822 17.0012 17.3917 17.3917C17.0012 17.7822 17.0012 18.4154 17.3917 18.8059L18.7175 20.1318C19.108 20.5223 19.7412 20.5223 20.1317 20.1318C20.5223 19.7412 20.5223 19.1081 20.1317 18.7175L18.8059 17.3917Z" fill="currentColor"/>
        <path d="M19.625 12C19.625 11.4477 20.0727 11 20.625 11H22.5C23.0523 11 23.5 11.4477 23.5 12C23.5 12.5523 23.0523 13 22.5 13H20.625C20.0727 13 19.625 12.5523 19.625 12Z" fill="currentColor"/>
        <path d="M20.1317 5.28249C20.5223 4.89196 20.5223 4.2588 20.1317 3.86827C19.7412 3.47775 19.108 3.47775 18.7175 3.86827L17.3917 5.1941C17.0012 5.58462 17.0012 6.21779 17.3917 6.60831C17.7822 6.99884 18.4154 6.99884 18.8059 6.60831L20.1317 5.28249Z" fill="currentColor"/>
    </svg>`;

    if (toggle) {
        toggle.innerHTML = iconType === 'moon' ? moonSvg : sunSvg;
    }
}

function updateThemeResponsiveImages() {
    const images = document.querySelectorAll('.theme-responsive-image');
    const isDark = document.body.getAttribute('data-theme') === 'dark';

    images.forEach(img => {
        const src = img.src;
        let newSrc;

        if (isDark) {
            // Switch to dark version
            newSrc = src.replace('-light.png', '-dark.png').replace('placeholder-light.png', 'placeholder-dark.png');
        } else {
            // Switch to light version
            newSrc = src.replace('-dark.png', '-light.png').replace('placeholder-dark.png', 'placeholder-light.png');
        }

        // Only change src if it's different to prevent unnecessary reloads
        if (img.src !== newSrc) {
            // Remove loaded class temporarily
            img.classList.remove('loaded');

            // Set new source
            img.src = newSrc;

            // Add loaded class when image loads
            img.onload = function() {
                img.classList.add('loaded');
            };

            // Handle error case
            img.onerror = function() {
                img.classList.add('loaded'); // Still show even if error
            };
        } else {
            // Image is already correct, ensure it's marked as loaded
            img.classList.add('loaded');
        }
    });
}

// ==========================================
// Theme Initialization and Toggling
// ==========================================

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;

    // Get all theme toggle buttons
    const navToggle = document.querySelector('nav .nav-theme-toggle');
    const styleGuideToggle = document.querySelector('#styleGuideThemeToggle');
    const mobileToggle = document.querySelector('.mobile-theme-toggle');

    // Check for saved theme or default to dark
    if (savedTheme === 'light') {
        body.removeAttribute('data-theme');
        updateThemeIcon(navToggle, 'moon');
        updateThemeIcon(styleGuideToggle, 'moon');
        updateThemeIcon(mobileToggle, 'moon');
    } else {
        body.setAttribute('data-theme', 'dark');
        updateThemeIcon(navToggle, 'sun');
        updateThemeIcon(styleGuideToggle, 'sun');
        updateThemeIcon(mobileToggle, 'sun');
    }

    // Update theme responsive images
    updateThemeResponsiveImages();
}

function toggleTheme() {
    const body = document.body;

    // Get all theme toggle buttons
    const navToggle = document.querySelector('nav .nav-theme-toggle');
    const styleGuideToggle = document.querySelector('#styleGuideThemeToggle');
    const mobileToggle = document.querySelector('.mobile-theme-toggle');

    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        updateThemeIcon(navToggle, 'moon');
        updateThemeIcon(styleGuideToggle, 'moon');
        updateThemeIcon(mobileToggle, 'moon');
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        updateThemeIcon(navToggle, 'sun');
        updateThemeIcon(styleGuideToggle, 'sun');
        updateThemeIcon(mobileToggle, 'sun');
    }

    // Update theme responsive images
    updateThemeResponsiveImages();
}
