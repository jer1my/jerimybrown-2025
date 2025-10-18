/**
 * Project Content Rendering
 *
 * Generates project cards, page content, and navigation
 *
 * Dependencies: core/data-loader.js, core/config.js
 * Exports: Project rendering functions
 */

// Generate project cards on index page
function initProjectCards() {
    // Only run on index page - check for projects section
    const projectsSection = document.getElementById('projects');
    if (!projectsSection) return;

    const projectsGrid = projectsSection.querySelector('.projects-grid');
    if (!projectsGrid) return;

    // Clear existing cards
    projectsGrid.innerHTML = '';

    // Generate cards from dataLoader (with fallback to PROJECTS)
    const projects = dataLoader.getProjects().length > 0 ? dataLoader.getProjects() : PROJECTS;
    projects.forEach(project => {
        const cardHTML = `
            <a href="work/${project.url}" class="project-card-link" aria-label="${project.ariaLabel}">
                <article class="project-card project-card-featured" data-card="${project.id}">
                    <div class="project-bg-image"></div>
                    <div class="project-content-overlay">
                        <h3 class="project-title">${project.title}</h3>
                        <p class="project-description">${project.description}</p>
                        <span class="project-link-text">View Case Study →</span>
                    </div>
                </article>
            </a>
        `;
        projectsGrid.insertAdjacentHTML('beforeend', cardHTML);
    });
}

// Update project page title and subtitle
function initProjectPageContent() {
    const projectTitle = document.querySelector('.project-hero .project-title');
    const projectSubtitle = document.querySelector('.project-hero .project-subtitle');

    if (!projectTitle || !projectSubtitle) return;

    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop();
    const project = getProject(currentPage);

    if (project) {
        projectTitle.textContent = project.title;
        projectSubtitle.textContent = project.subtitle;

        // Also update browser title if needed
        const titleTag = document.querySelector('title');
        if (titleTag && titleTag.textContent.includes('-')) {
            titleTag.textContent = `${project.title} - Jerimy Brown`;
        }
    }
}

// Update project navigation (prev/next links)
function initProjectNavigation() {
    const navPrev = document.querySelector('.project-navigation .nav-item.prev a');
    const navNext = document.querySelector('.project-navigation .nav-item.next a');

    if (!navPrev && !navNext) return;

    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop();
    const { prev, next } = getAdjacentProjects(currentPage);

    // Update previous link
    if (navPrev && prev) {
        navPrev.href = prev.url;
        const prevTitle = navPrev.querySelector('.nav-title');
        if (prevTitle) prevTitle.textContent = prev.title;
    }

    // Update next link
    if (navNext && next) {
        navNext.href = next.url;
        const nextTitle = navNext.querySelector('.nav-title');
        if (nextTitle) nextTitle.textContent = next.title;
    }
}

