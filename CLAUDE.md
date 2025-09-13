# UX Portfolio Design System & Guidelines

This document outlines the design system and guidelines for constructing a modern UX portfolio based on the established style guide.

## Typography

**Primary Font:** IBM Plex Sans (Google Fonts)
- Weights: 300 (Light), 400 (Regular), 500 (Medium), 600 (Semi-Bold), 700 (Bold)
- Fallback: `-apple-system, BlinkMacSystemFont, sans-serif`
- Monospace: `'SF Mono', Monaco, monospace` (for code/technical content)

**Responsive Typography Scale:**
```css
/* Mobile (≤768px) */
- Title: 36px
- Subtitle: 14px  
- H1: 32px
- H2: 24px
- H3: 20px
- Body: 12px

/* Desktop (>768px) */
- Title: 56px
- Subtitle: 18px
- H1: 48px
- H2: 32px
- H3: 24px
- Body: 16px
```

## Color Palette

**Primary Colors:**
- Primary: `#0f0f0f` (darker than neutral 900)
- Secondary: `#525252` 
- Tertiary: `#737373`

**Accent Colors (Temperature-based theming):**
- Light Mode: Accent Cool `#15B5FF` (blue)
- Dark Mode: Accent Warm `#ea580c` (orange)

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
- 48x48px circular button, top-right fixed position
- Icons: 🌙 (light mode), ☀️ (dark mode)
- Glass effect with backdrop blur

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
  /fonts/ (if self-hosting)
  /images/
    /projects/
    /profile/
/css/
  style.css (main stylesheet)
/js/
  theme-toggle.js
  smooth-scroll.js
index.html
projects/
  project-1.html
  project-2.html
about.html
contact.html
```

This design system provides a comprehensive foundation for building a modern, professional UX portfolio that stands out with sophisticated glassmorphism effects and intelligent theming.