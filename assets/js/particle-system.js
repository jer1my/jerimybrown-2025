// Particle Network System
// Interactive particle animation for hero section background

class ParticleSystem {
    constructor(canvasId, options = {}) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.animationId = null;
        this.isActive = false;

        // Default configuration
        this.config = {
            particleCount: 150,
            connectionDistance: 150,
            mouseRadius: 150,
            colorScheme: 'greys', // 'accent' or 'greys'
            colorStrength: 1.0, // 0.3 to 1.5
            interactionMode: 'attract', // 'attract', 'repel', or 'static'
            speed: 1.0,
            ...this.loadPreferences()
        };

        // Color palettes
        this.colors = {
            light: {
                accent: { particle: 'rgba(21, 181, 255, 0.8)', connection: 'rgba(21, 181, 255, 0.5)' },
                greys: { particle: 'rgba(150, 150, 150, 0.85)', connection: 'rgba(150, 150, 150, 0.55)' }
            },
            dark: {
                accent: { particle: 'rgba(234, 88, 12, 0.8)', connection: 'rgba(234, 88, 12, 0.5)' },
                greys: { particle: 'rgba(64, 64, 64, 0.8)', connection: 'rgba(64, 64, 64, 0.5)' }
            }
        };

        this.init();
    }

    init() {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            this.canvas.style.display = 'none';
            return;
        }

        // Set canvas size
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        // Mouse tracking
        window.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY - rect.top;
        });

        // Set up "connects" word boundary circle
        this.updateConnectsCircle();

        // Initialize particles
        this.createParticles();

        // Start animation
        this.start();
    }

    updateConnectsCircle() {
        const connectsWord = document.getElementById('rotatingWord');
        if (connectsWord) {
            const rect = connectsWord.getBoundingClientRect();
            const canvasRect = this.canvas.getBoundingClientRect();

            this.connectsCircle = {
                x: rect.left + rect.width / 2 - canvasRect.left,
                y: rect.top + rect.height / 2 - canvasRect.top,
                radius: Math.max(rect.width, rect.height) * 0.8
            };
        }
    }

    resizeCanvas() {
        const heroSection = this.canvas.closest('.hero');
        if (heroSection) {
            this.canvas.width = window.innerWidth;
            this.canvas.height = heroSection.offsetHeight;
            this.updateConnectsCircle();
            this.createParticles(); // Reset particles on resize
        }
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.config.particleCount; i++) {
            this.particles.push(new Particle(this.canvas, this.config.speed));
        }
    }

    updateParticleCount(count) {
        this.config.particleCount = count;
        const diff = count - this.particles.length;

        if (diff > 0) {
            // Add particles
            for (let i = 0; i < diff; i++) {
                this.particles.push(new Particle(this.canvas, this.config.speed));
            }
        } else if (diff < 0) {
            // Remove particles
            this.particles = this.particles.slice(0, count);
        }

        this.savePreferences();
    }

    updateColorScheme(scheme) {
        this.config.colorScheme = scheme;
        this.savePreferences();
    }

    updateColorStrength(strength) {
        this.config.colorStrength = strength;
        this.savePreferences();
    }

    updateInteractionMode(mode) {
        this.config.interactionMode = mode;
        this.savePreferences();
    }

    updateConnectionDistance(distance) {
        this.config.connectionDistance = distance;
        this.savePreferences();
    }

    updateSpeed(speed) {
        this.config.speed = speed;
        this.particles.forEach(p => p.speedMultiplier = speed);
        this.savePreferences();
    }

    getCurrentColors() {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        const theme = isDark ? 'dark' : 'light';
        const baseColors = this.colors[theme][this.config.colorScheme];

        // Apply color strength multiplier
        const strength = this.config.colorStrength;

        return {
            particle: this.adjustColorOpacity(baseColors.particle, strength),
            connection: this.adjustColorOpacity(baseColors.connection, strength)
        };
    }

    adjustColorOpacity(colorString, multiplier) {
        // Extract the opacity value from rgba() string and multiply it
        const match = colorString.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
        if (match) {
            const [, r, g, b, a] = match;
            const newOpacity = Math.min(1, parseFloat(a) * multiplier);
            return `rgba(${r}, ${g}, ${b}, ${newOpacity})`;
        }
        return colorString;
    }

    drawConnections() {
        const colors = this.getCurrentColors();

        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const p1 = this.particles[i];
                const p2 = this.particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.config.connectionDistance) {
                    // Get base opacity from the color string and multiply by distance factor
                    const baseOpacity = this.extractOpacity(colors.connection);
                    const distanceFactor = (1 - distance / this.config.connectionDistance);
                    const finalOpacity = baseOpacity * distanceFactor;

                    this.ctx.beginPath();
                    this.ctx.strokeStyle = this.replaceOpacity(colors.connection, finalOpacity);
                    this.ctx.lineWidth = 1;
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            }
        }
    }

    extractOpacity(colorString) {
        const match = colorString.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
        return match ? parseFloat(match[4]) : 1;
    }

    replaceOpacity(colorString, newOpacity) {
        return colorString.replace(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/,
            (match, r, g, b) => `rgba(${r}, ${g}, ${b}, ${newOpacity})`);
    }

    drawConnectsCircleConnections(colors) {
        if (!this.connectsCircle) return;

        const circle = this.connectsCircle;

        this.particles.forEach(particle => {
            const dx = circle.x - particle.x;
            const dy = circle.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Only draw connections to particles within connection distance from circle edge
            const distanceFromEdge = Math.abs(distance - circle.radius);

            if (distanceFromEdge < this.config.connectionDistance && distance > circle.radius) {
                // Get base opacity from the color string and multiply by distance factor
                const baseOpacity = this.extractOpacity(colors.connection);
                const distanceFactor = (1 - distanceFromEdge / this.config.connectionDistance);
                const finalOpacity = baseOpacity * distanceFactor;

                // Calculate point on circle edge closest to particle
                const angle = Math.atan2(dy, dx);
                const edgeX = circle.x - Math.cos(angle) * circle.radius;
                const edgeY = circle.y - Math.sin(angle) * circle.radius;

                this.ctx.beginPath();
                this.ctx.strokeStyle = this.replaceOpacity(colors.connection, finalOpacity);
                this.ctx.lineWidth = 1;
                this.ctx.moveTo(particle.x, particle.y);
                this.ctx.lineTo(edgeX, edgeY);
                this.ctx.stroke();
            }
        });
    }

    animate() {
        if (!this.isActive) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const colors = this.getCurrentColors();

        // Update and draw particles
        this.particles.forEach(particle => {
            // Handle mouse interaction
            if (this.config.interactionMode !== 'static') {
                const dx = this.mouse.x - particle.x;
                const dy = this.mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.config.mouseRadius) {
                    const force = (this.config.mouseRadius - distance) / this.config.mouseRadius;
                    const angle = Math.atan2(dy, dx);
                    const multiplier = this.config.interactionMode === 'attract' ? 0.2 : -0.2;

                    particle.vx += Math.cos(angle) * force * multiplier;
                    particle.vy += Math.sin(angle) * force * multiplier;
                }
            }

            // Handle "connects" word circle repulsion
            if (this.connectsCircle) {
                const dx = this.connectsCircle.x - particle.x;
                const dy = this.connectsCircle.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.connectsCircle.radius) {
                    // Repel particles from inside the circle
                    const force = (this.connectsCircle.radius - distance) / this.connectsCircle.radius;
                    const angle = Math.atan2(dy, dx);

                    particle.vx -= Math.cos(angle) * force * 0.5;
                    particle.vy -= Math.sin(angle) * force * 0.5;
                }
            }

            particle.update();
            particle.draw(this.ctx, colors.particle);
        });

        // Draw connections
        this.drawConnections();

        // Draw connections to "connects" word circle
        this.drawConnectsCircleConnections(colors);

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    start() {
        this.isActive = true;
        this.animate();
    }

    stop() {
        this.isActive = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }

    reset() {
        this.config = {
            particleCount: 150,
            connectionDistance: 150,
            mouseRadius: 150,
            colorScheme: 'greys',
            colorStrength: 1.0,
            interactionMode: 'attract',
            speed: 1.0
        };
        this.createParticles();
        this.savePreferences();
    }

    savePreferences() {
        localStorage.setItem('particlePreferences', JSON.stringify({
            particleCount: this.config.particleCount,
            connectionDistance: this.config.connectionDistance,
            colorScheme: this.config.colorScheme,
            colorStrength: this.config.colorStrength,
            interactionMode: this.config.interactionMode,
            speed: this.config.speed
        }));
    }

    loadPreferences() {
        const saved = localStorage.getItem('particlePreferences');
        return saved ? JSON.parse(saved) : {};
    }
}

// Particle class
class Particle {
    constructor(canvas, speedMultiplier = 1.0) {
        this.canvas = canvas;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
        this.speedMultiplier = speedMultiplier;
    }

    update() {
        // Move particle
        this.x += this.vx * this.speedMultiplier;
        this.y += this.vy * this.speedMultiplier;

        // Friction
        this.vx *= 0.99;
        this.vy *= 0.99;

        // Boundary bounce
        if (this.x < 0 || this.x > this.canvas.width) {
            this.vx *= -1;
            this.x = Math.max(0, Math.min(this.canvas.width, this.x));
        }
        if (this.y < 0 || this.y > this.canvas.height) {
            this.vy *= -1;
            this.y = Math.max(0, Math.min(this.canvas.height, this.y));
        }
    }

    draw(ctx, color) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
    }
}

// Control Panel class
class ParticleControlPanel {
    constructor(particleSystem) {
        this.particleSystem = particleSystem;

        // Check if user has a saved preference
        const savedPreference = localStorage.getItem('particleControlsExpanded');

        if (savedPreference === null) {
            // First time visitor - open on desktop, closed on mobile
            this.isExpanded = window.innerWidth > 768;
        } else {
            // Returning visitor - use their saved preference
            this.isExpanded = savedPreference === 'true';
        }

        this.init();
    }

    init() {
        const panel = document.getElementById('particleControls');
        if (!panel) return;

        const closeBtn = document.getElementById('particleControlsClose');

        // Set initial expanded state
        if (this.isExpanded) {
            panel.classList.add('expanded');
        }

        // Save initial state for first-time visitors
        if (localStorage.getItem('particleControlsExpanded') === null) {
            localStorage.setItem('particleControlsExpanded', this.isExpanded.toString());
        }

        // Set initial button icon
        if (closeBtn) {
            if (this.isExpanded) {
                closeBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 5L5 15M5 5L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
                closeBtn.setAttribute('aria-label', 'Close particle controls');
            } else {
                closeBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 15L10 5M5 10L10 5L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
                closeBtn.setAttribute('aria-label', 'Open particle controls');
            }
        }

        // Toggle panel - header click to expand
        const header = document.getElementById('particleControlsHeader');
        if (header) {
            header.addEventListener('click', (e) => {
                // Don't toggle if clicking the close button
                if (!e.target.closest('.particle-controls-close')) {
                    this.togglePanel();
                }
            });
        }

        // Close button - now always toggles
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent header click
                this.togglePanel();
            });
        }

        // Particle count slider
        const countSlider = document.getElementById('particleCount');
        const countValue = document.getElementById('particleCountValue');
        if (countSlider && countValue) {
            countSlider.value = this.particleSystem.config.particleCount;
            countValue.textContent = this.particleSystem.config.particleCount;

            countSlider.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                countValue.textContent = value;
                this.particleSystem.updateParticleCount(value);
            });
        }

        // Color scheme toggle
        const colorBtns = document.querySelectorAll('[name="colorScheme"]');
        colorBtns.forEach(btn => {
            if (btn.value === this.particleSystem.config.colorScheme) {
                btn.checked = true;
            }

            btn.addEventListener('change', (e) => {
                if (e.target.checked) {
                    this.particleSystem.updateColorScheme(e.target.value);
                }
            });
        });

        // Color strength slider
        const strengthSlider = document.getElementById('colorStrength');
        const strengthValue = document.getElementById('colorStrengthValue');
        if (strengthSlider && strengthValue) {
            strengthSlider.value = this.particleSystem.config.colorStrength;
            strengthValue.textContent = this.particleSystem.config.colorStrength.toFixed(1);

            strengthSlider.addEventListener('input', (e) => {
                const value = parseFloat(e.target.value);
                strengthValue.textContent = value.toFixed(1);
                this.particleSystem.updateColorStrength(value);
            });
        }

        // Interaction mode
        const interactionBtns = document.querySelectorAll('[name="interactionMode"]');
        interactionBtns.forEach((btn, index) => {
            if (btn.value === this.particleSystem.config.interactionMode) {
                btn.checked = true;
                this.updateSliderPillPosition(index);
            }

            btn.addEventListener('change', (e) => {
                if (e.target.checked) {
                    this.particleSystem.updateInteractionMode(e.target.value);
                    // Find index of checked button
                    const checkedIndex = Array.from(interactionBtns).findIndex(b => b.checked);
                    this.updateSliderPillPosition(checkedIndex);
                }
            });
        });

        // Connection distance slider
        const distanceSlider = document.getElementById('connectionDistance');
        const distanceValue = document.getElementById('connectionDistanceValue');
        if (distanceSlider && distanceValue) {
            distanceSlider.value = this.particleSystem.config.connectionDistance;
            distanceValue.textContent = this.particleSystem.config.connectionDistance;

            distanceSlider.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                distanceValue.textContent = value;
                this.particleSystem.updateConnectionDistance(value);
            });
        }

        // Speed slider
        const speedSlider = document.getElementById('particleSpeed');
        const speedValue = document.getElementById('particleSpeedValue');
        if (speedSlider && speedValue) {
            speedSlider.value = this.particleSystem.config.speed;
            speedValue.textContent = this.particleSystem.config.speed.toFixed(1);

            speedSlider.addEventListener('input', (e) => {
                const value = parseFloat(e.target.value);
                speedValue.textContent = value.toFixed(1);
                this.particleSystem.updateSpeed(value);
            });
        }

        // Reset button
        const resetBtn = document.getElementById('particleReset');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetControls());
        }
    }

    togglePanel() {
        const panel = document.getElementById('particleControls');
        const closeBtn = document.getElementById('particleControlsClose');
        if (!panel) return;

        this.isExpanded = !this.isExpanded;
        panel.classList.toggle('expanded');
        localStorage.setItem('particleControlsExpanded', this.isExpanded.toString());

        // Update button icon
        if (closeBtn) {
            if (this.isExpanded) {
                // Show X icon when expanded
                closeBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 5L5 15M5 5L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
                closeBtn.setAttribute('aria-label', 'Close particle controls');
            } else {
                // Show up arrow when closed
                closeBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 15L10 5M5 10L10 5L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
                closeBtn.setAttribute('aria-label', 'Open particle controls');
            }
        }
    }

    updateSliderPillPosition(index) {
        const pill = document.querySelector('.slider-toggle-pill');
        if (!pill) return;

        // Calculate position based on index (0=attract, 1=repel, 2=static)
        // Each option is 33.333% width with 2px padding and 2px gaps
        const totalOptions = 3;
        const optionWidthPercent = 100 / totalOptions;
        const pillLeft = 2 + (index * (optionWidthPercent + 0.2)); // 2px initial padding + option width

        pill.style.left = `calc(${pillLeft}% - ${index * 1}px)`;
    }

    resetControls() {
        this.particleSystem.reset();

        // Update all control values
        const countSlider = document.getElementById('particleCount');
        const countValue = document.getElementById('particleCountValue');
        if (countSlider && countValue) {
            countSlider.value = 150;
            countValue.textContent = '150';
        }

        const distanceSlider = document.getElementById('connectionDistance');
        const distanceValue = document.getElementById('connectionDistanceValue');
        if (distanceSlider && distanceValue) {
            distanceSlider.value = 150;
            distanceValue.textContent = '150';
        }

        const speedSlider = document.getElementById('particleSpeed');
        const speedValue = document.getElementById('particleSpeedValue');
        if (speedSlider && speedValue) {
            speedSlider.value = 1.0;
            speedValue.textContent = '1.0';
        }

        const strengthSlider = document.getElementById('colorStrength');
        const strengthValue = document.getElementById('colorStrengthValue');
        if (strengthSlider && strengthValue) {
            strengthSlider.value = 1.0;
            strengthValue.textContent = '1.0';
        }

        // Reset radio buttons
        document.querySelectorAll('[name="colorScheme"]').forEach(btn => {
            btn.checked = btn.value === 'greys';
        });

        document.querySelectorAll('[name="interactionMode"]').forEach((btn, index) => {
            btn.checked = btn.value === 'attract';
            if (btn.checked) {
                this.updateSliderPillPosition(index);
            }
        });
    }
}

// Initialize particle system
function initParticleSystem() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return null;

    const system = new ParticleSystem('particleCanvas');
    const controls = new ParticleControlPanel(system);

    // Re-render when theme changes
    const originalToggleTheme = window.toggleTheme;
    window.toggleTheme = function() {
        originalToggleTheme();
        // Particle colors will update on next frame automatically
    };

    return system;
}

// Make available globally
window.initParticleSystem = initParticleSystem;
