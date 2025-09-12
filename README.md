# Modern UX Portfolio Style Guide

A comprehensive design system featuring glassmorphism effects, responsive typography, and intelligent theming for modern UX portfolios.

## ✨ Features

- **Modern Glassmorphism** - Sophisticated glass effects with backdrop blur and transparency
- **Temperature-based Theming** - Cool blues for light mode, warm oranges for dark mode
- **Responsive Typography** - IBM Plex Sans with fluid scaling across breakpoints
- **Comprehensive Color System** - 10-step neutral scale with carefully crafted accent colors
- **Interactive Components** - Hover effects, smooth transitions, and micro-interactions
- **Modular Spacing** - Consistent spacing scale with utility classes
- **Flexible Grid System** - CSS Grid with responsive breakpoints and utilities

## 🎨 Design System

### Typography
- **Font:** IBM Plex Sans (Google Fonts)
- **Weights:** 300, 400, 500, 600, 700
- **Responsive scaling** from mobile (12px body) to desktop (16px body)

### Color Palette
- **Primary:** `#0f0f0f` (Ultra-dark primary)
- **Accent Cool:** `#2563eb` (Light mode)
- **Accent Warm:** `#ea580c` (Dark mode)
- **Neutrals:** 10-step scale from `#ffffff` to `#171717`

### Glass Effects
- Backdrop blur filters
- Semi-transparent backgrounds
- Enhanced shadow systems
- Smooth cubic-bezier transitions

## 🚀 Live Demo

[View the Style Guide](https://jer1my.github.io/jerimybrown-2025/style-guide.html)

## 📁 Project Structure

```
├── style-guide.html          # Main style guide showcase
├── CLAUDE.md                 # Design system documentation for AI assistance
├── README.md                 # Project documentation
└── .DS_Store                 # System file (ignored in production)
```

## 🛠️ Technologies Used

- **HTML5** - Semantic markup structure
- **CSS3** - Modern CSS with Grid, Flexbox, and advanced effects
- **Vanilla JavaScript** - Theme switching functionality
- **Google Fonts** - IBM Plex Sans typography
- **Glassmorphism** - Modern UI design trend implementation

## ⚡ Key Components

### Buttons
- Pill-shaped design (`border-radius: 50px`)
- Glass effect with backdrop blur
- Responsive hover states
- Primary and secondary variants

### Cards
- Multiple card types (`.card`, `.glass-card`, `.interactive-card`)
- Subtle transparency and blur effects
- Hover animations with lift and scale effects

### Theme Toggle
- Circular sun/moon icon button
- Fixed positioning with glass backdrop
- Smooth theme transitions

### Grid System
- CSS Grid-based layout system
- Responsive columns and spanning
- Flexible gap controls

## 🎯 Use Cases

Perfect for:
- **UX/UI Portfolios** - Showcase design work with modern aesthetics
- **Design Systems** - Reference implementation for glassmorphism
- **Frontend Learning** - Study modern CSS techniques and effects
- **Component Libraries** - Base for building design system components

## 🔧 Customization

### Changing Colors
Update CSS custom properties in the `:root` selector:
```css
:root {
  --accent-cool: #2563eb;
  --accent-warm: #ea580c;
  --primary: #0f0f0f;
}
```

### Typography
Swap IBM Plex Sans for another font:
```html
<link href="https://fonts.googleapis.com/css2?family=Your+Font:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### Glass Effects
Adjust backdrop blur intensity:
```css
backdrop-filter: blur(20px); /* Increase for more blur */
```

## 🌐 Browser Support

- **Chrome** 76+ (Full support)
- **Firefox** 103+ (Full support)  
- **Safari** 14+ (Full support)
- **Edge** 79+ (Full support)

*Note: Backdrop filters require modern browser support*

## 📱 Responsive Design

- **Mobile First** - Optimized for small screens
- **Breakpoints:**
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- **Flexible layouts** that adapt to any screen size

## 🎨 Design Philosophy

This style guide embodies:
- **Minimalism** - Clean, uncluttered interfaces
- **Sophistication** - Modern glass effects and typography
- **Accessibility** - High contrast ratios and readable fonts
- **Performance** - Optimized CSS and smooth animations
- **Adaptability** - Themes that respond to user preferences

## 🔄 Development Workflow

Built with a branch-based workflow:
- `main` - Production-ready code
- `style-exploration` - Experimental features and iterations

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/jer1my/jerimybrown-2025/issues).

## 🙏 Acknowledgments

- **IBM Plex Sans** - IBM's excellent open-source typeface
- **Glassmorphism** - Modern design trend inspiration
- **CSS Grid** - Powerful layout system enabling flexible designs

---

**Built with ❤️ for the design community**

*This style guide serves as both a showcase of modern web design techniques and a practical foundation for building sophisticated user interfaces.*