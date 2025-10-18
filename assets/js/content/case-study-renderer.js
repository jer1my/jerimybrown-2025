/**
 * Case Study Content Rendering
 *
 * Loads and renders case study content from JSON
 *
 * Dependencies: core/data-loader.js (uses marked.js for markdown)
 * Exports: Case study rendering functions
 */

// Case Study Content Rendering
// ==========================================

// Main initialization function for case study pages
async function initCaseStudyContent() {
    // Detect which case study page we're on
    const currentPath = window.location.pathname;
    let caseStudyId = null;

    if (currentPath.includes('design-system')) {
        caseStudyId = 'design-system';
    } else if (currentPath.includes('product-suite')) {
        caseStudyId = 'product-suite';
    } else if (currentPath.includes('ai-strategy')) {
        caseStudyId = 'ai-strategy';
    } else if (currentPath.includes('research-strategy')) {
        caseStudyId = 'research-strategy';
    }

    // Only run on case study pages
    if (!caseStudyId) return;

    // Load case study data
    try {
        // Load all data first (needed for project info)
        await dataLoader.loadAll();

        const caseStudy = await dataLoader.loadCaseStudy(caseStudyId);
        if (!caseStudy || !caseStudy.sections) {
            console.error('Failed to load case study data');
            return;
        }

        // Update page title and meta tags from project data
        const project = dataLoader.getProject(caseStudyId);
        if (project) {
            updatePageMeta(project);
        }

        // Render each section
        renderOverview(caseStudy.sections.overview);
        renderChallenge(caseStudy.sections.challenge);
        renderSolution(caseStudy.sections.solution);
        renderProcess(caseStudy.sections.process);
        renderResults(caseStudy.sections.results);

    } catch (error) {
        console.error('Error loading case study content:', error);
    }
}

// Update page title and meta tags from project data
function updatePageMeta(project) {
    if (!project) return;

    const pageTitle = `Building ${project.title.startsWith('a') || project.title.startsWith('an') ? project.title : 'a ' + project.title} - Jerimy Brown`;

    // Update document title
    document.title = pageTitle;

    // Update Open Graph title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', pageTitle);

    // Update Twitter title
    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', pageTitle);

    // Update JSON-LD structured data
    const jsonLd = document.querySelector('script[type="application/ld+json"]');
    if (jsonLd) {
        try {
            const data = JSON.parse(jsonLd.textContent);
            data.name = `Building ${project.title.startsWith('a') || project.title.startsWith('an') ? project.title : 'a ' + project.title}`;
            data.about.name = `${project.title} Development`;
            jsonLd.textContent = JSON.stringify(data, null, 2);
        } catch (e) {
            console.error('Error updating JSON-LD:', e);
        }
    }
}

// Render overview section
function renderOverview(data) {
    if (!data) return;

    const section = document.getElementById('overview');
    if (!section) return;

    const heading = section.querySelector('h2');
    const contentDiv = section.querySelector('.section-content');

    if (heading) heading.textContent = data.heading;
    if (contentDiv && data.content) {
        contentDiv.innerHTML = marked.parse(data.content);
    }
}

// Render challenge section
function renderChallenge(data) {
    if (!data) return;

    const section = document.getElementById('challenge');
    if (!section) return;

    const heading = section.querySelector('h2');
    const contentDiv = section.querySelector('.section-content');

    if (heading) heading.textContent = data.heading;

    if (contentDiv) {
        let html = '';

        // Add intro if present
        if (data.intro) {
            html += `<p>${marked.parseInline(data.intro)}</p>`;
        }

        // Add subheadings if present (research-strategy format)
        if (data.subheadings && data.subheadings.length > 0) {
            data.subheadings.forEach(subheading => {
                html += `
                    <h3>${subheading.title}</h3>
                    <p>${marked.parseInline(subheading.content)}</p>
                `;
            });
        }

        // Add highlight box with key points
        if (data.highlightTitle && data.keyPoints && data.keyPoints.length > 0) {
            html += `
                <div class="challenge-highlight">
                    <h3>${data.highlightTitle}</h3>
                    <ul>
                        ${data.keyPoints.map(point => `<li>${marked.parseInline(point)}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        contentDiv.innerHTML = html;
    }
}

// Render solution section
function renderSolution(data) {
    if (!data) return;

    const section = document.getElementById('solution');
    if (!section) return;

    const heading = section.querySelector('h2');
    const contentDiv = section.querySelector('.section-content');

    if (heading) heading.textContent = data.heading;

    if (contentDiv) {
        let html = '';

        // Add intro
        if (data.intro) {
            html += `<p>${marked.parseInline(data.intro)}</p>`;
        }

        // Add approaches if present (design-system format)
        if (data.approaches && data.approaches.length > 0) {
            html += '<div class="solution-approaches">';
            data.approaches.forEach(approach => {
                html += `
                    <div class="approach-item">
                        <h3>${approach.title}</h3>
                        <p>${marked.parseInline(approach.description)}</p>
                    </div>
                `;
            });
            html += '</div>';
        }

        contentDiv.innerHTML = html;
    }
}

// Render process section
function renderProcess(data) {
    if (!data) return;

    const section = document.getElementById('process');
    if (!section) return;

    const heading = section.querySelector('h2');
    const contentDiv = section.querySelector('.section-content');

    if (heading) heading.textContent = data.heading;

    if (contentDiv) {
        let html = '';

        // Add intro
        if (data.intro) {
            html += `<p class="process-intro">${marked.parseInline(data.intro)}</p>`;
        }

        // Add process steps
        if (data.steps && data.steps.length > 0) {
            html += '<div class="process-steps">';
            data.steps.forEach(step => {
                html += `
                    <div class="process-step">
                        <div class="step-number">${step.number}</div>
                        <div class="step-content">
                            <h3>${step.title}</h3>
                            <p>${marked.parseInline(step.description)}</p>
                        </div>
                    </div>
                `;
            });
            html += '</div>';
        }

        contentDiv.innerHTML = html;
    }
}

// Render results section
function renderResults(data) {
    if (!data) return;

    const section = document.getElementById('results');
    if (!section) return;

    const heading = section.querySelector('h2');
    const contentDiv = section.querySelector('.section-content');

    if (heading) heading.textContent = data.heading;

    if (contentDiv) {
        let html = '';

        // Add intro
        if (data.intro) {
            html += `<p class="results-intro">${marked.parseInline(data.intro)}</p>`;
        }

        // Add metrics based on type
        if (data.metrics && data.metrics.length > 0) {
            const metricsType = data.metricsType || 'chart';

            if (metricsType === 'simple') {
                // Simple metrics without charts
                html += '<div class="results-grid">';
                data.metrics.forEach(metric => {
                    html += `
                        <div class="result-metric">
                            <div class="metric-value">${metric.value}</div>
                            <div class="metric-label">${metric.label}</div>
                        </div>
                    `;
                });
                html += '</div>';
            } else if (metricsType === 'mixed') {
                // Mixed metrics with both charts and simple
                html += '<div class="results-grid">';
                data.metrics.forEach(metric => {
                    if (metric.type === 'simple' || !metric.chartProgress) {
                        html += `
                            <div class="result-metric">
                                <div class="metric-value">${metric.value}</div>
                                <div class="metric-label">${metric.label}</div>
                            </div>
                        `;
                    } else {
                        html += `
                            <div class="result-metric-chart">
                                <div class="donut-chart" data-progress="${metric.chartProgress}">
                                    <svg viewBox="0 0 60 60">
                                        <circle class="donut-track" cx="30" cy="30" r="25"></circle>
                                        <circle class="donut-fill" cx="30" cy="30" r="25"></circle>
                                    </svg>
                                    <div class="chart-center">
                                        <div class="chart-value">${metric.value}</div>
                                    </div>
                                </div>
                                <div class="chart-label">${metric.label}</div>
                            </div>
                        `;
                    }
                });
                html += '</div>';
            } else {
                // Standard donut chart metrics
                html += '<div class="results-grid">';
                data.metrics.forEach(metric => {
                    html += `
                        <div class="result-metric-chart">
                            <div class="donut-chart" data-progress="${metric.chartProgress}">
                                <svg viewBox="0 0 60 60">
                                    <circle class="donut-track" cx="30" cy="30" r="25"></circle>
                                    <circle class="donut-fill" cx="30" cy="30" r="25"></circle>
                                </svg>
                                <div class="chart-center">
                                    <div class="chart-value">${metric.value}</div>
                                </div>
                            </div>
                            <div class="chart-label">${metric.label}</div>
                        </div>
                    `;
                });
                html += '</div>';
            }
        }

        // Add outcome groups (research-strategy format)
        if (data.outcomeGroups && data.outcomeGroups.length > 0) {
            html += '<div class="outcome-groups">';
            data.outcomeGroups.forEach(group => {
                html += `
                    <div class="outcome-group">
                        <h3>${group.title}</h3>
                        <ul>
                            ${group.outcomes.map(outcome => `<li>${marked.parseInline(outcome)}</li>`).join('')}
                        </ul>
                    </div>
                `;
            });
            html += '</div>';
        }

        // Add additional outcomes (design-system format)
        if (data.additionalOutcomesTitle && data.additionalOutcomes && data.additionalOutcomes.length > 0) {
            html += `
                <div class="additional-outcomes">
                    <h3>${data.additionalOutcomesTitle}</h3>
                    <ul>
                        ${data.additionalOutcomes.map(outcome => `<li>${marked.parseInline(outcome)}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        contentDiv.innerHTML = html;

        // Re-initialize donut charts after rendering
        if (typeof initDonutCharts === 'function') {
            initDonutCharts();
        }
    }
}

