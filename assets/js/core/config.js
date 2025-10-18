/**
 * Project Configuration
 *
 * Centralized project data and image mappings
 *
 * Dependencies: core/data-loader.js
 * Exports: PROJECTS array, PROJECT_FEATURED_IMAGES object, helper functions
 */

// ==========================================
// Centralized Project Configuration
// ==========================================
// All project data now loaded from data/projects.json
// This file maintains image mappings and helper functions only

// Mapping of project IDs to their featured carousel images
const PROJECT_FEATURED_IMAGES = {
    'ai-strategy': ['ai-1', 'ai-2', 'ai-3'],
    'design-system': ['design-system-featured-1', 'design-system-featured-2', 'design-system-featured-3', 'design-system-featured-4', 'design-system-featured-5', 'design-system-featured-6', 'design-system-featured-7'],
    'product-suite': ['product-feature-1', 'product-feature-2', 'product-feature-3', 'product-feature-4'],
    'research-strategy': ['research-1', 'research-2', 'research-3']
};

// ==========================================
// Helper Functions
// ==========================================

// Helper function to get project by ID or URL
// Uses dataLoader as single source of truth
function getProject(identifier) {
    return dataLoader.getProject(identifier);
}

// Helper function to get previous/next projects
// Uses dataLoader as single source of truth
function getAdjacentProjects(identifier) {
    return dataLoader.getAdjacentProjects(identifier);
}
