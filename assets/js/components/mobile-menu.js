/**
 * Mobile Menu System
 *
 * Mobile menu toggle and close functionality
 *
 * Dependencies: None
 * Exports: Mobile menu functions
 */

// Mobile Menu System
// ==========================================

function toggleMobileMenu() {
    const overlay = document.getElementById('mobileMenuOverlay');
    const body = document.body;
    const toggle = document.querySelector('.nav-mobile-toggle');

    if (overlay) {
        const isActive = overlay.classList.contains('active');

        if (isActive) {
            // Close menu
            overlay.classList.remove('active');
            body.classList.remove('mobile-menu-open');
            if (toggle) toggle.classList.remove('menu-active');
        } else {
            // Open menu
            overlay.classList.add('active');
            body.classList.add('mobile-menu-open');
            if (toggle) toggle.classList.add('menu-active');
        }
    }
}

// Close mobile menu when clicking on overlay background
function initMobileMenuClose() {
    const overlay = document.getElementById('mobileMenuOverlay');

    if (overlay) {
        overlay.addEventListener('click', function(e) {
            // Close if clicking on the overlay itself (not the content)
            if (e.target === overlay) {
                toggleMobileMenu();
            }
        });
    }

    // Close mobile menu immediately when resizing to desktop breakpoint
    window.addEventListener('resize', function() {
        // Check if mobile menu is open and window is now desktop size
        if (overlay && overlay.classList.contains('active') && window.innerWidth > 768) {
            toggleMobileMenu();
        }
    });
}

