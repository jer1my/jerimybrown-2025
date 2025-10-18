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

function toggleMobileMenu(event) {
    const overlay = document.getElementById('mobileMenuOverlay');
    const body = document.body;
    const toggle = document.querySelector('.nav-mobile-toggle');

    if (overlay) {
        const isActive = overlay.classList.contains('active');

        if (isActive) {
            // Check if this was called from a link click
            if (event && event.target) {
                const link = event.target.closest('a');
                if (link) {
                    const href = link.getAttribute('href');
                    // If link navigates to another page (ends with .html), don't close - let page transition handle it
                    if (href && (href.endsWith('.html') || href.includes('.html#') || href.includes('.html?'))) {
                        return;
                    }
                }
            }

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

