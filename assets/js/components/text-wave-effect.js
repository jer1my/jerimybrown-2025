/**
 * TextWaveEffect - A reusable text animation component that creates a wave effect
 * across text characters based on a slider/progress value.
 *
 * @class TextWaveEffect
 * @version 1.0.0
 * @author Jerimy Brown
 *
 * @example
 * const effect = new TextWaveEffect('#myTitle', {
 *   weightRange: [300, 700],
 *   scaleRange: [1.0, 1.5],
 *   onChange: (value) => console.log('Wave position:', value)
 * });
 *
 * // Update wave position (0-100)
 * effect.setValue(50);
 */

class TextWaveEffect {
    /**
     * Default configuration options
     * @static
     */
    static defaultConfig = {
        // Animation ranges
        weightRange: [300, 700],        // Font weight range [min, max]
        scaleRange: [1.0, 1.5],         // Scale transformation range [min, max]
        spacingRange: [0.02, 0.15],     // Letter spacing range in em [min, max]

        // Wave behavior
        waveWidth: 11,                  // Width of the wave influence (higher = wider wave)
        deadZonePercent: 20,            // Dead zone percentage on each side (0-50)

        // Animation timing
        transitionDuration: 0.1,        // Transition duration in seconds
        transitionEasing: 'linear',     // CSS easing function

        // Transform origin
        transformOrigin: '50% 87%',     // Transform origin for scale (visual baseline)

        // Spacing
        baseLetterSpacing: '0.02em',    // Base letter spacing
        spaceWidth: '0.3em',            // Width of space characters

        // Callbacks
        onInit: null,                   // Called after initialization
        onChange: null,                 // Called when value changes
        onReset: null,                  // Called when reset
        onDestroy: null                 // Called before destruction
    };

    /**
     * Create a new TextWaveEffect instance
     * @param {string|HTMLElement} target - CSS selector or DOM element
     * @param {Object} config - Configuration options
     */
    constructor(target, config = {}) {
        // Get target element
        this.element = typeof target === 'string'
            ? document.querySelector(target)
            : target;

        if (!this.element) {
            throw new Error(`TextWaveEffect: Target element not found: ${target}`);
        }

        // Merge configuration
        this.config = { ...TextWaveEffect.defaultConfig, ...config };

        // State
        this.letterSpans = [];
        this.currentValue = 0;
        this.previousValue = 0;
        this.originalText = this.element.textContent;
        this.isDestroyed = false;

        // Initialize
        this.init();
    }

    /**
     * Initialize the effect
     * @private
     */
    init() {
        // Store original styles for potential restoration
        this.originalHTML = this.element.innerHTML;

        // Split text into letter spans
        this.splitTextIntoSpans();

        // Apply initial styles
        this.applyBaseStyles();

        // Call init callback
        if (typeof this.config.onInit === 'function') {
            this.config.onInit(this);
        }
    }

    /**
     * Split text into individual letter spans
     * @private
     */
    splitTextIntoSpans() {
        const text = this.originalText;
        this.element.innerHTML = '';
        this.letterSpans = [];

        for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span');
            span.textContent = text[i];

            // Apply base styles
            span.style.display = 'inline-block';
            span.style.verticalAlign = 'baseline';
            span.style.lineHeight = '1';
            span.style.transition = `font-weight ${this.config.transitionDuration}s ${this.config.transitionEasing}, transform ${this.config.transitionDuration}s ${this.config.transitionEasing}, letter-spacing ${this.config.transitionDuration}s ${this.config.transitionEasing}`;
            span.style.transformOrigin = this.config.transformOrigin;
            span.style.fontWeight = this.config.weightRange[0];
            span.style.letterSpacing = this.config.baseLetterSpacing;

            // Handle spaces
            if (text[i] === ' ') {
                span.style.width = this.config.spaceWidth;
            }

            this.element.appendChild(span);
            this.letterSpans.push(span);
        }
    }

    /**
     * Apply base styles to letter spans
     * @private
     */
    applyBaseStyles() {
        this.letterSpans.forEach(span => {
            span.style.fontWeight = this.config.weightRange[0];
            span.style.transform = `scale(${this.config.scaleRange[0]})`;
            span.style.letterSpacing = `${this.config.spacingRange[0]}em`;
        });
    }

    /**
     * Set the wave position (0-100)
     * @param {number} value - Position value between 0 and 100
     * @public
     */
    setValue(value) {
        if (this.isDestroyed) {
            console.warn('TextWaveEffect: Cannot set value on destroyed instance');
            return;
        }

        // Clamp value between 0-100
        value = Math.max(0, Math.min(100, parseFloat(value)));

        this.previousValue = this.currentValue;
        this.currentValue = value;

        this.updateWave(value);

        // Call onChange callback
        if (typeof this.config.onChange === 'function') {
            this.config.onChange(value, this);
        }
    }

    /**
     * Update the wave effect based on current value
     * @param {number} sliderValue - Current slider value (0-100)
     * @private
     */
    updateWave(sliderValue) {
        const totalLetters = this.letterSpans.length;
        const deadZone = this.config.deadZonePercent;
        const activeRange = 100 - (deadZone * 2);

        this.letterSpans.forEach((span, index) => {
            // Calculate letter position as percentage with dead zones
            const letterPosition = deadZone + (index / (totalLetters - 1)) * activeRange;

            // Calculate distance from current slider position
            const distance = Math.abs(letterPosition - sliderValue);

            // Check if letter is in the path traveled (for interpolation)
            const minPos = Math.min(this.previousValue, sliderValue);
            const maxPos = Math.max(this.previousValue, sliderValue);
            const isInPath = letterPosition >= minPos && letterPosition <= maxPos;

            // Calculate influence using cosine wave for smooth falloff
            let influence = 0;
            if (distance < this.config.waveWidth || isInPath) {
                const radians = (distance / this.config.waveWidth) * Math.PI;
                influence = (Math.cos(radians) + 1) / 2;
            }

            // Map influence to weight
            const [minWeight, maxWeight] = this.config.weightRange;
            const weight = minWeight + (influence * (maxWeight - minWeight));

            // Map influence to scale
            const [minScale, maxScale] = this.config.scaleRange;
            const scale = minScale + (influence * (maxScale - minScale));

            // Map influence to letter spacing
            const [minSpacing, maxSpacing] = this.config.spacingRange;
            const spacing = minSpacing + (influence * (maxSpacing - minSpacing));

            // Apply transformations
            span.style.fontWeight = weight.toFixed(0);
            span.style.transform = `scale(${scale.toFixed(3)})`;
            span.style.letterSpacing = `${spacing.toFixed(3)}em`;
        });
    }

    /**
     * Reset the effect to initial state
     * @public
     */
    reset() {
        if (this.isDestroyed) {
            console.warn('TextWaveEffect: Cannot reset destroyed instance');
            return;
        }

        this.currentValue = 0;
        this.previousValue = 0;
        this.applyBaseStyles();

        // Call reset callback
        if (typeof this.config.onReset === 'function') {
            this.config.onReset(this);
        }
    }

    /**
     * Update configuration options
     * @param {Object} newConfig - New configuration options to merge
     * @public
     */
    updateConfig(newConfig) {
        if (this.isDestroyed) {
            console.warn('TextWaveEffect: Cannot update config on destroyed instance');
            return;
        }

        this.config = { ...this.config, ...newConfig };

        // Reapply base styles with new config
        this.applyBaseStyles();

        // Update current wave with new config
        if (this.currentValue > 0) {
            this.updateWave(this.currentValue);
        }
    }

    /**
     * Get current configuration
     * @returns {Object} Current configuration
     * @public
     */
    getConfig() {
        return { ...this.config };
    }

    /**
     * Get current value
     * @returns {number} Current wave position (0-100)
     * @public
     */
    getValue() {
        return this.currentValue;
    }

    /**
     * Get original text
     * @returns {string} Original text content
     * @public
     */
    getOriginalText() {
        return this.originalText;
    }

    /**
     * Restore original HTML and destroy the effect
     * @public
     */
    destroy() {
        if (this.isDestroyed) {
            console.warn('TextWaveEffect: Instance already destroyed');
            return;
        }

        // Call destroy callback before cleanup
        if (typeof this.config.onDestroy === 'function') {
            this.config.onDestroy(this);
        }

        // Restore original HTML
        this.element.innerHTML = this.originalHTML;

        // Clear references
        this.letterSpans = [];
        this.isDestroyed = true;
    }
}

// Export for use in other modules (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TextWaveEffect;
}
