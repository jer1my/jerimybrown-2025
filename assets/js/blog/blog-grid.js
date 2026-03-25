/**
 * Blog Grid Module
 * Renders and manages the blog listing with filtering and sorting
 */

import { blogPosts, blogCategories } from './blog-data.js';
import { createBlogCard } from './blog-card.js';

// State
let currentCategory = 'all';
let currentSort = 'newest';

// DOM Elements
let blogGrid = null;
let categoryFilter = null;
let sortSelect = null;
let clearButton = null;

/**
 * Initialize the blog grid
 */
export function init() {
    blogGrid = document.getElementById('blog-grid');
    categoryFilter = document.getElementById('category-filter');
    sortSelect = document.getElementById('sort-select');
    clearButton = document.getElementById('clear-filters');

    if (!blogGrid) {
        console.error('Blog grid element not found');
        return;
    }

    // Populate category filter from data
    if (categoryFilter) {
        blogCategories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
            categoryFilter.appendChild(option);
        });
    }

    // Restore state from sessionStorage
    restoreState();

    // Set up event listeners
    if (categoryFilter) {
        categoryFilter.addEventListener('change', handleCategoryChange);
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
    const savedCategory = sessionStorage.getItem('blog-filter-category');
    const savedSort = sessionStorage.getItem('blog-sort');

    if (savedCategory) {
        currentCategory = savedCategory;
        if (categoryFilter) categoryFilter.value = savedCategory;
    }
    if (savedSort) {
        currentSort = savedSort;
        if (sortSelect) sortSelect.value = savedSort;
    }
}

function saveState() {
    sessionStorage.setItem('blog-filter-category', currentCategory);
    sessionStorage.setItem('blog-sort', currentSort);
}

function handleCategoryChange(e) {
    currentCategory = e.target.value;
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
    currentCategory = 'all';
    currentSort = 'newest';

    if (categoryFilter) categoryFilter.value = 'all';
    if (sortSelect) sortSelect.value = 'newest';

    saveState();
    renderGrid();
    updateClearButtonVisibility();
}

function updateClearButtonVisibility() {
    if (!clearButton) return;
    const hasActiveFilters = currentCategory !== 'all' || currentSort !== 'newest';
    clearButton.style.display = hasActiveFilters ? 'inline-block' : 'none';
}

function filterPosts(posts) {
    if (currentCategory === 'all') return posts;
    return posts.filter(p => p.category === currentCategory);
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

function renderGrid() {
    if (!blogGrid) return;

    let posts = filterPosts(blogPosts);
    posts = sortPosts(posts);

    blogGrid.innerHTML = '';

    if (posts.length === 0) {
        blogGrid.innerHTML = `
            <div class="blog-empty">
                <h3>No posts found</h3>
                <p>Try adjusting your filters to see more results.</p>
                <button class="button btn-accent" onclick="window.blogGrid.clearFilters()">
                    Clear Filters
                </button>
            </div>
        `;
        return;
    }

    posts.forEach(post => {
        const card = createBlogCard(post);
        blogGrid.appendChild(card);
    });
}

// Expose clearFilters globally for the empty state button
window.blogGrid = { clearFilters };

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
