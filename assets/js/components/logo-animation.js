/**
 * Logo Animation System
 *
 * Logo color management and letter animations
 *
 * Dependencies: None
 * Exports: Logo animation functions
 */

// Logo Color Management
function initLogoColorChange() {
    // Only run on index page (pages with sections)
    const sections = document.querySelectorAll('section[id]');
    if (sections.length === 0) {
        return;
    }

    const logo = document.querySelector('.logo');
    const homeLink = document.querySelector('.nav-links a[href="#"]');

    if (!logo) {
        return;
    }

    function updateLogoColor() {
        // Only apply accent color logic on the index page (pages with hero sections)
        // Check if there's a hero section on the page
        const heroSection = document.querySelector('.hero');
        if (!heroSection) {
            // Not on index page, don't add accent color
            logo.classList.remove('accent-color');
            if (homeLink) {
                homeLink.classList.remove('accent-color');
            }
            return;
        }

        // Check if we're at the very top of the page
        // Use a small threshold to account for minor scroll variations
        if (window.scrollY <= 50) {
            logo.classList.add('accent-color');
            if (homeLink) {
                homeLink.classList.add('accent-color');
            }
        } else {
            logo.classList.remove('accent-color');
            if (homeLink) {
                homeLink.classList.remove('accent-color');
            }
        }
    }

    // Update on scroll
    window.addEventListener('scroll', updateLogoColor);

    // Update on page load
    updateLogoColor();
}

// Logo Letter Animation
function initLogoLetterAnimation() {
    const logoTexts = document.querySelectorAll('.logo-text');

    // Detect if we're on a work page
    const currentPath = window.location.pathname;
    if (currentPath.includes('/work/')) {
        document.body.classList.add('work-page');
    }

    logoTexts.forEach(logoText => {
        const text = logoText.textContent.trim();

        // Skip if already transformed
        if (logoText.querySelector('.logo-letter')) {
            return;
        }

        // Keep the space between first and last name
        const letters = text.split('');
        const totalLetters = letters.length;

        // Clear the original text
        logoText.innerHTML = '';

        // Create a span for each letter with REVERSED delay order
        // Animation goes from end (n) to beginning (J)
        letters.forEach((letter, index) => {
            const span = document.createElement('span');
            span.className = 'logo-letter';

            // If it's a space, use non-breaking space and add extra width
            if (letter === ' ') {
                span.innerHTML = '&nbsp;&nbsp;'; // Double space for better separation
            } else {
                span.textContent = letter;
            }

            // Reverse the delay: last letter (n) has 0ms, first letter (J) has max delay
            const reverseDelay = (totalLetters - 1 - index) * 30;
            span.style.transitionDelay = `${reverseDelay}ms`;
            logoText.appendChild(span);
        });

        // Mark as transformed to make it visible
        logoText.classList.add('transformed');
    });
}

