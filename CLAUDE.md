# UX Portfolio Design System & Guidelines

This document outlines the design system and guidelines for constructing a modern UX portfolio based on the established style guide.

## Design Principals

## Typography

**Primary Font:** IBM Plex Sans (Google Fonts)
- Weights: 300 (Light), 400 (Regular), 500 (Medium), 600 (Semi-Bold), 700 (Bold)
- Fallback: `-apple-system, BlinkMacSystemFont, sans-serif`
- Monospace: `'SF Mono', Monaco, monospace` (for code/technical content)
- Ligatures: Enabled site-wide for improved readability (fi, fl, ff, ffi, ffl)

**Typography System - CSS Variables:**

All typography is standardized using CSS custom properties in `_variables.css`. Each element has variables for size, weight, letter-spacing, and line-height.

```css
/* Hero Title */
--typo-hero-title-size: clamp(48px, 8vw, 96px)
--typo-hero-title-weight: 300 (Light)
--typo-hero-title-spacing: -0.02em
--typo-hero-title-line-height: 0.9

/* Subtitle */
--typo-subtitle-size: clamp(18px, 2.5vw, 32px)
--typo-subtitle-weight: 400 (Regular)
--typo-subtitle-line-height: 1.5

/* Section Title */
--typo-section-title-size: clamp(36px, 5vw, 48px)
--typo-section-title-weight: 300 (Light)
--typo-section-title-spacing: -0.02em
--typo-section-title-line-height: 1.2

/* Section Subtitle */
--typo-section-subtitle-size: 16px
--typo-section-subtitle-weight: 400 (Regular)
--typo-section-subtitle-line-height: 1.7

/* Heading 1 */
--typo-h1-size: clamp(32px, 5vw, 48px)
--typo-h1-weight: 300 (Light)
--typo-h1-spacing: -0.02em
--typo-h1-line-height: 1.2

/* Heading 2 */
--typo-h2-size: clamp(24px, 4vw, 32px)
--typo-h2-weight: 400 (Regular)
--typo-h2-spacing: -0.01em
--typo-h2-line-height: 1.3

/* Heading 3 */
--typo-h3-size: clamp(20px, 3vw, 24px)
--typo-h3-weight: 500 (Medium)
--typo-h3-line-height: 1.4

/* Heading 4 */
--typo-h4-size: clamp(18px, 2.5vw, 20px)
--typo-h4-weight: 500 (Medium)
--typo-h4-line-height: 1.4

/* Heading 5 */
--typo-h5-size: clamp(16px, 2vw, 18px)
--typo-h5-weight: 600 (Semi-Bold)
--typo-h5-line-height: 1.5

/* Heading 6 */
--typo-h6-size: clamp(14px, 1.5vw, 16px)
--typo-h6-weight: 600 (Semi-Bold)
--typo-h6-line-height: 1.5

/* Body Text */
--typo-body-size: 16px (desktop), 12px (mobile)
--typo-body-weight: 400 (Regular)
--typo-body-line-height: 1.7

/* Small Text */
--typo-small-size: 14px
--typo-small-weight: 400 (Regular)
--typo-small-line-height: 1.6
```

**Usage:**
All typography elements use these variables for consistency. To apply typography styles:
```css
.my-heading {
    font-size: var(--typo-h2-size);
    font-weight: var(--typo-h2-weight);
    letter-spacing: var(--typo-h2-spacing);
    line-height: var(--typo-h2-line-height);
}
```

## Color Palette

**Primary Colors:**
- Primary: `#0f0f0f` (darker than neutral 900)
- Secondary: `#525252`
- Tertiary: `#737373`

**Accent Colors (Temperature-based theming):**
- Accent Light: `#15B5FF` (cool blue for light mode)
- Accent Dark: `#ea580c` (warm orange for dark mode)

**Color Theory & Theming Strategy:**

The accent color system employs temperature-based theming to optimize visual comfort and hierarchy across both light and dark modes. This approach is grounded in color psychology and perceptual contrast principles:

**Cool Accents for Light Mode:**
- Cool blue (`#15B5FF`) provides strong chromatic contrast against warm white backgrounds
- Blue's shorter wavelength creates visual "recession," preventing eye strain on bright screens
- Psychologically associated with trust, clarity, and professionalism—ideal for light mode's clean aesthetic
- Lower perceptual weight prevents overwhelming the neutral palette

**Warm Accents for Dark Mode:**
- Warm orange (`#ea580c`) creates vibrant contrast against cool dark backgrounds without harsh glare
- Longer wavelength colors feel more comfortable in low-light environments
- Orange's energetic, approachable quality balances dark mode's serious tone
- Higher luminance value maintains accessibility while feeling intentional rather than harsh

This complementary temperature approach ensures:
- Consistent perceptual impact across themes (neither accent feels "louder")
- Reduced eye fatigue through wavelength distribution
- Clear visual hierarchy that adapts to ambient lighting contexts
- Semantic reinforcement: cool = clarity/focus (light), warm = energy/emphasis (dark)

By inverting color temperature relative to the background, each theme maintains optimal legibility, emotional resonance, and visual balance.

**Neutral Scale:**
- White: `#ffffff`
- Neutral 50: `#fafafa`
- Neutral 100: `#f5f5f5` 
- Neutral 200: `#e5e5e5`
- Neutral 300: `#d4d4d4`
- Neutral 400: `#a3a3a3`
- Neutral 500: `#737373`
- Neutral 600: `#525252`
- Neutral 700: `#404040`
- Neutral 800: `#262626`
- Neutral 900: `#171717`

## Layout & Spacing

**Container:**
- Max-width: 1200px
- Width: 100% (liquid until max-width)
- Padding: 120px 60px (desktop), 80px 24px (mobile)

**Modular Spacing Scale:**
- xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 48px, xxl: 80px
- Margin/padding utilities: `.m-{size}`, `.p-{size}`, `.mt-{size}`, etc.

**Grid System:**
- CSS Grid with `.grid`, `.grid-cols-{n}`, `.col-span-{n}`
- Responsive breakpoints: 768px (tablet), 1024px (desktop)
- Gap options: `.gap-1` (4px) to `.gap-16` (64px)

## Interactive Elements & Effects

**Glassmorphism Design Language:**
- Buttons: Semi-transparent backgrounds with backdrop blur
- Cards: Subtle transparency with enhanced shadows
- Theme toggle: Circular glass effect with blur
- No borders in dark mode for cleaner aesthetic

**Transitions & Animations:**
- Standard: `transition: all 0.3s ease`
- Fast: `transition: all 0.15s ease`  
- Slow: `transition: all 0.5s ease`
- Smooth cubic-bezier: `cubic-bezier(0.4, 0, 0.2, 1)`

**Hover States:**
- `.hover-lift`: translateY(-2px) with enhanced shadow
- `.hover-scale`: scale(1.02)
- `.hover-fade`: opacity(0.8)

## Theme System

**Light Mode:**
- Background: `#ffffff`
- Text: `#1a1a1a`
- Accent: Cool blue `#2563eb`

**Dark Mode:**
- Background: `#0a0a0a`
- Text: `#e0e0e0`
- Accent: Warm orange `#ea580c`
- Enhanced contrast with deeper shadows

**Theme Toggle:**
- 32pxx32px top-right fixed position
- Icons: `/assets/icons/moon-outlined.svg` (light mode), `/assets/icons/sun-outlined.svg` (dark mode)

## Component Library

**Buttons:**
```css
.btn-primary: Dark glass with white text (light), light glass (dark)
.btn-secondary: Light glass with dark text (light), subtle glass (dark)
Border-radius: 50px (pill-shaped)
Padding: 16px 32px
```

**Cards:**
```css
.card: Standard card with glass effect
.glass-card: Enhanced glass card with more blur
.interactive-card: Card with hover lift effect
Border-radius: 16-20px
Backdrop-filter: blur(10-20px)
```

**Interactive Text:**
```css
.interactive-text: Underline animation on hover
Color: Theme-appropriate accent color
Transition: width 0.3s ease
```

## Portfolio Construction Guidelines

**Page Structure:**
1. Header with navigation (glass effect)
2. Hero section with large typography
3. Project showcase grid
4. About section
5. Contact/footer

**Project Cards:**
- Use `.glass-card` with hover effects
- Include project thumbnails, titles, descriptions
- Maintain consistent spacing and alignment
- Responsive grid: 1 col (mobile) → 2-3 cols (desktop)

**Navigation:**
- Fixed or sticky header with glass effect
- Theme toggle in top-right corner
- Smooth scroll to sections
- Active state indicators using accent colors

**Performance Considerations:**
- Optimize backdrop-filter usage (can be expensive)
- Use CSS transforms for smooth animations
- Implement lazy loading for project images
- Maintain accessibility with proper contrast ratios

**Content Guidelines:**
- Use sentence case for most text
- Maintain consistent voice and tone
- Include case studies with problem/solution structure
- Showcase diverse project types and skills

## Implementation Notes

- All effects work cross-browser with `-webkit-` prefixes
- Mobile-first responsive approach
- Semantic HTML structure for accessibility  
- Test glass effects on various backgrounds
- Ensure sufficient color contrast in both themes
- Use `prefers-reduced-motion` for accessibility

## File Organization

```
/assets/
  /css/                      # Modular CSS architecture
    main.css                 # Main import file
    _variables.css           # CSS custom properties
    _base.css                # Reset & base styles
    _navigation.css          # Header & navigation
    _hero.css                # Hero section
    _particles.css           # Particle system
    _components.css          # Reusable components
    _carousels.css           # Carousel implementations
    _sections.css            # Page sections
    _project-pages.css       # Project detail pages
    _charts.css              # Data visualizations
    _utilities.css           # Helper classes & dark mode
  /js/                       # Interactive features
    main.js                  # Core functionality
    particles.js             # Particle system
    theme.js                 # Theme switching
  /images/                   # Image assets
/data/
  projects.json              # Project data
/work/                       # Case study pages
  design-system.html
  product-suite.html
  ai-strategy.html
  research-strategy.html
/.claude/                    # Claude Code configuration
  /commands/                 # Slash commands
  settings.local.json
index.html                   # Main portfolio page
lab.html                     # Interactive experiments
resume.html                  # Resume page
CLAUDE.md                    # This file - AI context
README.md                    # Public documentation
```

## Technical Architecture

### Modular CSS System
The stylesheet is organized as a series of CSS modules imported into `main.css`:
1. **Variables** - CSS custom properties and theme tokens (`--container-max-width`, colors, fonts)
2. **Base** - Reset, foundational styles, text selection
3. **Navigation** - Header, menu, theme toggle
4. **Hero** - Hero section, back-to-top button
5. **Particles** - Particle system and controls
6. **Components** - Reusable UI components (buttons, cards)
7. **Carousels** - Carousel implementations
8. **Sections** - Page sections (projects, about, brands, contact)
9. **Project Pages** - Case study layouts
10. **Charts** - Data visualizations
11. **Utilities** - Helper classes, dark mode, responsive overrides (must load last)

### Cache Busting Strategy
CSS and JavaScript files use query parameter versioning for browser cache control:
```html
<link rel="stylesheet" href="assets/css/main.css?v=1760841100">
<script src="assets/js/main.js?v=1760840700"></script>
```
Update version numbers after CSS/JS changes to force browser refresh.

### Container Strategy
Max-width containers prevent content from becoming excessively wide on large displays:
- **CSS Variable:** `--container-max-width: 1200px` (defined in `_variables.css`)
- **Applied to:** Hero content, navigation, sections
- **Behavior:** Content is fluid up to 1200px, then centers with whitespace on sides
- **Rationale:** Maintains readability and prevents "tiny elements spread out" on 4K+ displays

### Known Limitations & Best Practices

**Viewport Scaling on Large Displays:**
CSS cannot replicate browser zoom behavior when using `vh` (viewport height) units. Attempts to use `transform: scale()` or CSS `zoom` property will break layouts that depend on viewport units because:
- Browser zoom recalculates viewport dimensions **before** layout
- CSS scaling happens **after** layout (viewport units already computed)
- Result: Misaligned or broken `vh`-based elements

**Recommended Approaches for Large Displays:**
1. ✅ **Max-width containers** (current implementation) - Prevents excessive spread
2. ✅ **Targeted media queries** - Increase specific font sizes at 2K/4K if needed
3. ✅ **User-controlled zoom** - Let users apply browser zoom themselves
4. ❌ **Avoid** `transform: scale()` or `zoom` property with `vh` layouts

**Future Considerations:**
If elements feel too small on ultra-high-resolution displays, consider:
- Increasing `--container-max-width` to 1400-1600px
- Adding media queries for larger base font sizes at 2560px+ breakpoints
- Adjusting specific component sizes (nav, buttons) via targeted media queries

### Development Workflow
Slash commands available via `.claude/commands/`:
- `/quick-commit` - Commit changes on current branch
- `/deploy` - Commit, merge to main, push both branches
- `/status` - Show git status and recent commits

This design system provides a comprehensive foundation for building a modern, professional UX portfolio that stands out with sophisticated glassmorphism effects and intelligent theming.