/**
 * Data Loading System
 *
 * Centralized data management - loads content from JSON files
 *
 * Dependencies: None
 * Exports: DataLoader class, dataLoader instance
 */

class DataLoader {
    constructor() {
        this.data = {
            person: null,
            projects: null,
            experience: null,
            skills: null,
            accolades: null,
            brands: null,
            aboutCarousel: null,
            caseStudy: null
        };
        this.loaded = false;
        this.loadPromise = null;

        // Auto-detect base path based on current location
        // If we're in a subdirectory (like work/), use '../data/', otherwise 'data/'
        const path = window.location.pathname;
        const isInSubdirectory = path.split('/').filter(p => p && p.includes('.html')).length > 0 &&
                                 path.split('/').slice(0, -1).some(p => p && p !== '');
        this.basePath = isInSubdirectory ? '../data/' : 'data/';
    }

    async fetchJSON(path) {
        try {
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${path}: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Error loading ${path}:`, error);
            return null;
        }
    }

    async loadAll() {
        if (this.loadPromise) return this.loadPromise;

        this.loadPromise = Promise.all([
            this.fetchJSON(`${this.basePath}person.json`),
            this.fetchJSON(`${this.basePath}projects.json`),
            this.fetchJSON(`${this.basePath}experience.json`),
            this.fetchJSON(`${this.basePath}skills.json`),
            this.fetchJSON(`${this.basePath}accolades.json`),
            this.fetchJSON(`${this.basePath}brands.json`),
            this.fetchJSON(`${this.basePath}about-carousel.json`)
        ]).then(([person, projects, experience, skills, accolades, brands, aboutCarousel]) => {
            this.data.person = person;
            this.data.projects = projects?.projects || [];
            this.data.experience = experience?.experience || [];
            this.data.skills = skills?.skillCategories || [];
            this.data.accolades = accolades || { awards: [], features: [] };
            this.data.brands = brands?.brands || [];
            this.data.aboutCarousel = aboutCarousel?.carouselCards || [];
            this.loaded = true;
            return this.data;
        });

        return this.loadPromise;
    }

    async loadCaseStudy(caseStudyId) {
        const path = `${this.basePath}case-studies/${caseStudyId}.json`;
        this.data.caseStudy = await this.fetchJSON(path);
        return this.data.caseStudy;
    }

    getProjects() {
        return this.data.projects || [];
    }

    getProject(identifier) {
        const projects = this.getProjects();
        return projects.find(p => p.id === identifier || p.url === identifier);
    }

    getAdjacentProjects(identifier) {
        const projects = this.getProjects();
        const currentIndex = projects.findIndex(p => p.id === identifier || p.url === identifier);
        if (currentIndex === -1) return { prev: null, next: null };

        const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
        const nextIndex = (currentIndex + 1) % projects.length;

        return {
            prev: projects[prevIndex],
            next: projects[nextIndex]
        };
    }

    getPerson() {
        return this.data.person;
    }

    getExperience() {
        return this.data.experience;
    }

    getSkills() {
        return this.data.skills;
    }

    getAccolades() {
        return this.data.accolades;
    }

    getBrands() {
        return this.data.brands;
    }

    getAboutCarousel() {
        return this.data.aboutCarousel;
    }

    getCaseStudy() {
        return this.data.caseStudy;
    }
}

// Create global instance
const dataLoader = new DataLoader();
