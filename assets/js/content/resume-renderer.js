/**
 * Resume Content Rendering
 *
 * Generates experience timeline, skills grid, and accolades
 *
 * Dependencies: core/data-loader.js
 * Exports: Resume rendering functions
 */

// Generate experience items for resume page
function initExperienceTimeline() {
    // Only run on resume page
    const timeline = document.querySelector('.experience-timeline');
    if (!timeline) return;

    // Clear existing content
    timeline.innerHTML = '';

    // Get experience data
    const experience = dataLoader.getExperience();
    if (experience.length === 0) return;

    // Separate featured and compact items
    const featured = experience.filter(exp => exp.featured);
    const compact = experience.filter(exp => !exp.featured);

    // Generate featured items
    featured.forEach(exp => {
        const div = document.createElement('div');
        div.className = 'experience-item experience-detailed';
        div.innerHTML = `
            <div class="experience-header">
                <div class="experience-dates">${exp.dates}</div>
                <div class="experience-company">${exp.company}</div>
                <div class="experience-location">${exp.location}</div>
                <h3 class="experience-title">${exp.title}</h3>
            </div>
            <p class="experience-description">${exp.description}</p>
        `;
        timeline.appendChild(div);
    });

    // Generate compact items grid
    if (compact.length > 0) {
        const gridDiv = document.createElement('div');
        gridDiv.className = 'experience-compact-grid';

        compact.forEach(exp => {
            const div = document.createElement('div');
            div.className = 'experience-item experience-compact';
            div.innerHTML = `
                <div class="experience-header">
                    <div class="experience-dates">${exp.dates}</div>
                    <div class="experience-company">${exp.company}</div>
                    <div class="experience-location">${exp.location}</div>
                    <h3 class="experience-title">${exp.title}</h3>
                </div>
            `;
            gridDiv.appendChild(div);
        });

        timeline.appendChild(gridDiv);
    }
}

// Generate skills grid for resume page
function initSkillsGrid() {
    // Only run on resume page
    const skillsGrid = document.querySelector('.skills-grid');
    if (!skillsGrid) return;

    // Clear existing content
    skillsGrid.innerHTML = '';

    // Get skills data
    const skills = dataLoader.getSkills();
    if (skills.length === 0) return;

    // Generate skill categories
    skills.forEach(category => {
        const div = document.createElement('div');
        div.className = 'skill-category';

        let skillsHTML = '';

        // Check if this category has skill levels (Development category)
        if (category.skillLevels) {
            const levels = Object.keys(category.skillLevels);
            skillsHTML = levels.map(level => {
                const skillsList = category.skillLevels[level].join(' / ');
                return `<span class="skill-level">${level}:</span> ${skillsList}`;
            }).join('<br>\n                        ');
        } else if (category.skills) {
            // Regular skills list
            skillsHTML = category.skills.join(' / ');
            if (category.description) {
                skillsHTML += `<br><br>\n                        ${category.description}`;
            }
        }

        div.innerHTML = `
            <h3 class="skill-category-title">${category.title}</h3>
            <div class="skill-list">
                ${skillsHTML}
            </div>
        `;

        skillsGrid.appendChild(div);
    });
}

// Generate accolades for resume page
function initAccolades() {
    // Only run on resume page
    const accoladesGrid = document.querySelector('.accolades-grid');
    if (!accoladesGrid) return;

    // Clear existing content
    accoladesGrid.innerHTML = '';

    // Get accolades data
    const accolades = dataLoader.getAccolades();
    if (!accolades.awards && !accolades.features) return;

    // Generate Awards section
    if (accolades.awards && accolades.awards.length > 0) {
        const awardsDiv = document.createElement('div');
        awardsDiv.className = 'accolade-category';
        awardsDiv.innerHTML = '<h3 class="accolade-category-title">Awards</h3>';

        accolades.awards.forEach(award => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'accolade-item';
            itemDiv.innerHTML = `
                <div class="accolade-date">${award.date}</div>
                <div class="accolade-title"><span class="accolade-award-name">${award.name}</span> - ${award.description}</div>
            `;
            awardsDiv.appendChild(itemDiv);
        });

        accoladesGrid.appendChild(awardsDiv);
    }

    // Generate Features section
    if (accolades.features && accolades.features.length > 0) {
        const featuresDiv = document.createElement('div');
        featuresDiv.className = 'accolade-category';
        featuresDiv.innerHTML = '<h3 class="accolade-category-title">Features</h3>';

        accolades.features.forEach(feature => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'accolade-item';
            itemDiv.innerHTML = `
                <div class="accolade-date">${feature.date}</div>
                <div class="accolade-title">${feature.title}</div>
            `;
            featuresDiv.appendChild(itemDiv);
        });

        accoladesGrid.appendChild(featuresDiv);
    }
}

// ==========================================
