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
// DEPRECATED: This array is now loaded from data/projects.json
// Keeping for backwards compatibility during transition

const PROJECTS = [
    {
        id: 'design-system',
        title: 'Building an Enterprise Design System',
        subtitle: 'Creating unified experiences across a complex product ecosystem',
        description: 'Building a comprehensive design system that covers a suite of products from SaaS to on-prem, unifying product, UX and Dev teams while embedding accessibility standards throughout the organization.',
        url: 'design-system.html',
        ariaLabel: 'View Enterprise Design System Case Study'
    },
    {
        id: 'product-suite',
        title: 'Designing a Hybrid Product Suite',
        subtitle: 'Building foundational UX patterns for scalable growth',
        description: 'Leading the end-to-end design of a new product ecosystem from concept to launch, establishing foundational UX patterns and information architecture for scalable growth.',
        url: 'product-suite.html',
        ariaLabel: 'View hybrid Product Suite Case Study'
    },
    {
        id: 'ai-strategy',
        title: 'AI Product Design Strategy',
        subtitle: 'Making complex automation feel intuitive and trustworthy',
        description: 'Designing intelligent user experiences that seamlessly integrate AI capabilities into existing workflows, making complex automation feel intuitive and trustworthy.',
        url: 'ai-strategy.html',
        ariaLabel: 'View AI Product Design Strategy Case Study'
    },
    {
        id: 'research-strategy',
        title: 'User Research Strategy',
        subtitle: 'Validating designs through rigorous research',
        description: 'Validating innovative interaction patterns through rigorous user research, turning insights into design decisions that improve usability and reduce cognitive load.',
        url: 'research-strategy.html',
        ariaLabel: 'View User Research Strategy Case Study'
    }
];

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
// Updated to use dataLoader with fallback to PROJECTS
function getProject(identifier) {
    return dataLoader.getProject(identifier) || PROJECTS.find(p => p.id === identifier || p.url === identifier);
}

// Helper function to get previous/next projects
// Updated to use dataLoader with fallback to PROJECTS
function getAdjacentProjects(identifier) {
    const adjacent = dataLoader.getAdjacentProjects(identifier);
    if (adjacent.prev || adjacent.next) return adjacent;

    // Fallback to PROJECTS array
    const currentIndex = PROJECTS.findIndex(p => p.id === identifier || p.url === identifier);
    if (currentIndex === -1) return { prev: null, next: null };

    const prevIndex = (currentIndex - 1 + PROJECTS.length) % PROJECTS.length;
    const nextIndex = (currentIndex + 1) % PROJECTS.length;

    return {
        prev: PROJECTS[prevIndex],
        next: PROJECTS[nextIndex]
    };
}
