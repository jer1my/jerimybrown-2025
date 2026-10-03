/**
 * Blog Grid Module
 * Renders and manages the blog listing with filtering and sorting
 */

import { blogPosts, blogTags, getTagLabel } from './blog-data.js?v=1790999671';
import { createBlogCard } from './blog-card.js?v=1790999671';

// State
let activeTags = [];          // selected tag slugs; a post must carry every one
let currentSort = 'newest';

const STORAGE_TAGS = 'blog-filter-tags';
const STORAGE_SORT = 'blog-sort';

// DOM Elements
let blogGrid = null;
let tagFilter = null;
let sortSelect = null;
let clearButton = null;

/**
 * Initialize the blog grid
 */
export function init() {
    blogGrid = document.getElementById('blog-grid');
    tagFilter = document.getElementById('tag-filter');
    sortSelect = document.getElementById('sort-select');
    clearButton = document.getElementById('clear-filters');

    if (!blogGrid) {
        console.error('Blog grid element not found');
        return;
    }

    // Populate tag filter chips from data
    if (tagFilter) {
        blogTags.forEach(tag => {
            const chip = document.createElement('button');
            chip.type = 'button';
            chip.className = 'blog-tag-chip';
            chip.dataset.tag = tag;
            chip.setAttribute('aria-pressed', 'false');
            chip.textContent = getTagLabel(tag);
            // Chips go before the clear button so it always trails the last chip
            if (clearButton && clearButton.parentNode === tagFilter) {
                tagFilter.insertBefore(chip, clearButton);
            } else {
                tagFilter.appendChild(chip);
            }
        });
    }

    // Restore state from sessionStorage
    restoreState();

    // Set up event listeners
    if (tagFilter) {
        tagFilter.addEventListener('click', handleTagClick);
    }
    if (sortSelect) {
        sortSelect.addEventListener('change', handleSortChange);
    }
    if (clearButton) {
        clearButton.addEventListener('click', clearFilters);
    }

    // Render
    renderGrid();
    updateClearButtonVisibility();
}

function restoreState() {
    let savedTags = [];
    try {
        savedTags = JSON.parse(sessionStorage.getItem(STORAGE_TAGS) || '[]');
    } catch (e) {
        savedTags = [];
    }
    // Drop any tag that no longer exists in the data
    activeTags = Array.isArray(savedTags) ? savedTags.filter(t => blogTags.includes(t)) : [];
    syncChips();

    const savedSort = sessionStorage.getItem(STORAGE_SORT);
    if (savedSort) {
        currentSort = savedSort;
        if (sortSelect) sortSelect.value = savedSort;
    }
}

function saveState() {
    sessionStorage.setItem(STORAGE_TAGS, JSON.stringify(activeTags));
    sessionStorage.setItem(STORAGE_SORT, currentSort);
}

function syncChips() {
    if (!tagFilter) return;
    tagFilter.querySelectorAll('.blog-tag-chip').forEach(chip => {
        chip.setAttribute('aria-pressed', activeTags.includes(chip.dataset.tag) ? 'true' : 'false');
    });
}

function handleTagClick(e) {
    const chip = e.target.closest('.blog-tag-chip');
    if (!chip) return;
    const tag = chip.dataset.tag;
    activeTags = activeTags.includes(tag)
        ? activeTags.filter(t => t !== tag)
        : [...activeTags, tag];
    syncChips();
    saveState();
    renderGrid();
    updateClearButtonVisibility();
}

function handleSortChange(e) {
    currentSort = e.target.value;
    saveState();
    renderGrid();
    updateClearButtonVisibility();
}

function clearFilters() {
    activeTags = [];
    currentSort = 'newest';

    syncChips();
    if (sortSelect) sortSelect.value = 'newest';

    saveState();
    renderGrid();
    updateClearButtonVisibility();
}

function updateClearButtonVisibility() {
    if (!clearButton) return;
    const hasActiveFilters = activeTags.length > 0 || currentSort !== 'newest';
    clearButton.style.display = hasActiveFilters ? 'inline-block' : 'none';
}

function filterPosts(posts) {
    if (activeTags.length === 0) return posts;
    return posts.filter(p => activeTags.every(t => p.tags.includes(t)));
}

function sortPosts(posts) {
    const sorted = [...posts];
    if (currentSort === 'oldest') {
        sorted.sort((a, b) => {
            const dateDiff = new Date(a.datePublished) - new Date(b.datePublished);
            if (dateDiff !== 0) return dateDiff;
            return (a.order || 0) - (b.order || 0);
        });
    } else {
        sorted.sort((a, b) => {
            const dateDiff = new Date(b.datePublished) - new Date(a.datePublished);
            if (dateDiff !== 0) return dateDiff;
            return (b.order || 0) - (a.order || 0);
        });
    }
    return sorted;
}

// Persistent card elements keyed by slug so filtering can animate them
const cardCache = new Map();
const SLIDE_MS = 450;   // keep in sync with .blog-card--moving
const FADE_MS = 350;    // keep in sync with --leaving / --fading-in

function getCard(post) {
    let card = cardCache.get(post.slug);
    if (!card) {
        card = createBlogCard(post);
        cardCache.set(post.slug, card);
    }
    return card;
}

function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function clearMotionClasses(card) {
    card.classList.remove('blog-card--entering', 'blog-card--fading-in', 'blog-card--moving');
    card.style.transform = '';
}

/**
 * Render the grid with a FLIP transition:
 *   1. cards filtered out fade away in place (taken out of flow)
 *   2. remaining cards slide to their new positions
 *   3. newly matching cards fade in once the slide has made room
 */
function renderGrid() {
    if (!blogGrid) return;

    let posts = filterPosts(blogPosts);
    posts = sortPosts(posts);

    const animate = !prefersReducedMotion();
    const gridRect = blogGrid.getBoundingClientRect();

    // Current live cards (exclude ghosts, leaving cards and the empty state)
    const current = [...blogGrid.querySelectorAll('.blog-card:not(.blog-card--ghost):not(.blog-card--leaving)')];
    const currentBySlug = new Map(current.map(el => [el.dataset.slug, el]));
    const targetSlugs = new Set(posts.map(p => p.slug));

    // FIRST: snapshot positions (includes any in-flight transform)
    const first = new Map(current.map(el => [el.dataset.slug, el.getBoundingClientRect()]));

    // Ghosts and empty state are rebuilt each render
    blogGrid.querySelectorAll('.blog-card--ghost, .blog-empty').forEach(el => el.remove());

    // Cards leaving: pin them where they are, out of flow, and fade
    let leavingCount = 0;
    current.forEach(el => {
        if (targetSlugs.has(el.dataset.slug)) return;
        const r = first.get(el.dataset.slug);
        clearMotionClasses(el);
        if (animate) {
            el.style.left = `${r.left - gridRect.left}px`;
            el.style.top = `${r.top - gridRect.top}px`;
            el.style.width = `${r.width}px`;
            el.style.height = `${r.height}px`;
            el.classList.add('blog-card--leaving');
            setTimeout(() => {
                if (el.classList.contains('blog-card--leaving')) {
                    el.remove();
                    el.classList.remove('blog-card--leaving');
                    el.style.left = el.style.top = el.style.width = el.style.height = '';
                }
            }, FADE_MS + 50);
            leavingCount++;
        } else {
            el.remove();
        }
    });

    // Place cards in final order; entering cards start invisible
    const entering = [];
    posts.forEach(post => {
        const card = getCard(post);
        if (!currentBySlug.has(post.slug)) {
            clearMotionClasses(card);
            if (animate) card.classList.add('blog-card--entering');
            entering.push(card);
        } else {
            // Clear transforms so LAST is measured at the true final position
            card.classList.remove('blog-card--moving');
            card.style.transform = '';
        }
        blogGrid.appendChild(card);
    });

    if (posts.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'blog-empty';
        empty.innerHTML = `
            <h3>No posts found</h3>
            <p>Try adjusting your filters to see more results.</p>
            <button class="button btn-accent" onclick="window.blogGrid.clearFilters()">
                Clear Filters
            </button>
        `;
        if (animate) {
            empty.classList.add('blog-card--entering');
            entering.push(empty);
        }
        blogGrid.appendChild(empty);
    }

    // Ghost placeholders fade in alongside entering cards
    const ghosts = fillGhostCards(posts.length);
    if (animate) ghosts.forEach(g => { g.classList.add('blog-card--entering'); entering.push(g); });

    if (!animate) return;

    // LAST + INVERT: staying cards get a transform back to where they were
    let anyMoved = false;
    posts.forEach(post => {
        const card = cardCache.get(post.slug);
        const before = first.get(post.slug);
        if (!before) return;
        const after = card.getBoundingClientRect();
        const dx = before.left - after.left;
        const dy = before.top - after.top;
        if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) return;
        anyMoved = true;
        card.style.transform = `translate(${dx}px, ${dy}px)`;
    });

    // Force a reflow so the inverted transforms are committed before we release them
    void blogGrid.offsetWidth;

    // Phase timing: leaving cards fade first, then survivors slide, then newcomers fade in
    const slideStart = leavingCount > 0 ? FADE_MS : 20;
    const fadeInStart = slideStart + (anyMoved ? SLIDE_MS : 0);

    // PLAY: release the transforms so cards slide into place
    setTimeout(() => {
        posts.forEach(post => {
            const card = cardCache.get(post.slug);
            if (!card.style.transform) return;
            card.classList.add('blog-card--moving');
            card.style.transform = '';
            setTimeout(() => card.classList.remove('blog-card--moving'), SLIDE_MS + 50);
        });
    }, slideStart);

    // Entering cards fade in once the slide has made space
    setTimeout(() => {
        entering.forEach(el => {
            if (!el.isConnected) return;
            el.classList.remove('blog-card--entering');
            el.classList.add('blog-card--fading-in');
            setTimeout(() => el.classList.remove('blog-card--fading-in'), FADE_MS + 50);
        });
    }, fadeInStart);
}

function getColumnCount() {
    if (window.innerWidth <= 640) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
}

function fillGhostCards(postCount) {
    // Remove any existing ghosts
    blogGrid.querySelectorAll('.blog-card--ghost').forEach(g => g.remove());

    const cols = getColumnCount();
    if (cols <= 1 || postCount === 0) return []; // no widows on single column or empty grid
    const remainder = postCount % cols;
    if (remainder === 0) return []; // row is full

    const ghosts = [];
    const ghostsNeeded = cols - remainder;
    for (let i = 0; i < ghostsNeeded; i++) {
        const ghost = document.createElement('div');
        ghost.className = 'blog-card blog-card--ghost';
        ghost.setAttribute('aria-hidden', 'true');
        ghost.innerHTML = '<span class="blog-card--ghost__label">More coming soon</span>';
        blogGrid.appendChild(ghost);
        ghosts.push(ghost);
    }
    return ghosts;
}

// Recalculate ghosts on resize (column count may change)
window.addEventListener('resize', () => {
    if (!blogGrid) return;
    const realCount = blogGrid.querySelectorAll('.blog-card:not(.blog-card--ghost):not(.blog-card--leaving)').length;
    fillGhostCards(realCount);
});

// Expose clearFilters globally for the empty state button
window.blogGrid = { clearFilters };

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
