# TextWaveEffect Component

A lightweight, customizable vanilla JavaScript component that creates an interactive wave animation effect across text characters. Perfect for adding dynamic, engaging typography to your web projects.

## Features

- ✨ **Zero Dependencies** - Pure vanilla JavaScript
- 🎨 **Highly Customizable** - Control weight, scale, spacing, and wave behavior
- 🔤 **Font Agnostic** - Works with any font family
- ⚡ **Performant** - Smooth 60fps animations
- 🎯 **Simple API** - Easy to integrate and use
- 📱 **Responsive** - Works across all device sizes
- 🔧 **Event Callbacks** - Hook into initialization, changes, and destruction
- 🧹 **Memory Safe** - Proper cleanup with destroy method

## Installation

### Option 1: Direct Include

Copy `text-wave-effect.js` to your project and include it:

```html
<script src="path/to/text-wave-effect.js"></script>
```

### Option 2: ES Module

```javascript
import TextWaveEffect from './text-wave-effect.js';
```

## Quick Start

```html
<!-- Your HTML -->
<h1 id="myTitle">Hello World</h1>
<input type="range" id="waveSlider" min="0" max="100" value="0">

<!-- Include the component -->
<script src="text-wave-effect.js"></script>

<script>
  // Initialize the effect
  const wave = new TextWaveEffect('#myTitle');

  // Connect to a slider
  document.getElementById('waveSlider').addEventListener('input', function() {
    wave.setValue(this.value);
  });
</script>
```

## Configuration Options

### Constructor

```javascript
new TextWaveEffect(target, config)
```

**Parameters:**
- `target` (String|HTMLElement) - CSS selector or DOM element
- `config` (Object) - Configuration options (all optional)

### Configuration Object

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `weightRange` | Array | `[300, 700]` | Font weight range `[min, max]` |
| `scaleRange` | Array | `[1.0, 1.5]` | Scale transformation range `[min, max]` |
| `spacingRange` | Array | `[0.02, 0.15]` | Letter spacing range in em `[min, max]` |
| `waveWidth` | Number | `11` | Width of wave influence (higher = wider) |
| `deadZonePercent` | Number | `20` | Dead zone percentage on each side (0-50) |
| `transitionDuration` | Number | `0.1` | Transition duration in seconds |
| `transitionEasing` | String | `'linear'` | CSS easing function |
| `transformOrigin` | String | `'50% 87%'` | Transform origin for scale |
| `baseLetterSpacing` | String | `'0.02em'` | Base letter spacing |
| `spaceWidth` | String | `'0.3em'` | Width of space characters |
| `onInit` | Function | `null` | Called after initialization |
| `onChange` | Function | `null` | Called when value changes |
| `onReset` | Function | `null` | Called when reset |
| `onDestroy` | Function | `null` | Called before destruction |

### Configuration Examples

#### Subtle Effect
```javascript
const subtleWave = new TextWaveEffect('#title', {
  weightRange: [300, 500],
  scaleRange: [1.0, 1.15],
  spacingRange: [0.02, 0.08],
  waveWidth: 15
});
```

#### Dramatic Effect
```javascript
const dramaticWave = new TextWaveEffect('#title', {
  weightRange: [100, 900],
  scaleRange: [0.8, 2.0],
  spacingRange: [0.0, 0.25],
  waveWidth: 7
});
```

#### Custom Font Weights
```javascript
const customWave = new TextWaveEffect('#title', {
  weightRange: [200, 800],  // Match your font's available weights
  scaleRange: [1.0, 1.3],
  deadZonePercent: 15       // Adjust active area
});
```

## API Methods

### setValue(value)
Set the wave position (0-100).

```javascript
wave.setValue(50);  // Position wave at 50%
```

### reset()
Reset the effect to initial state.

```javascript
wave.reset();
```

### updateConfig(newConfig)
Update configuration options dynamically.

```javascript
wave.updateConfig({
  weightRange: [400, 800],
  waveWidth: 15
});
```

### getConfig()
Get current configuration.

```javascript
const config = wave.getConfig();
console.log(config.weightRange);  // [300, 700]
```

### getValue()
Get current wave position.

```javascript
const position = wave.getValue();
console.log(position);  // 50
```

### getOriginalText()
Get the original text content.

```javascript
const text = wave.getOriginalText();
console.log(text);  // "Hello World"
```

### destroy()
Clean up and restore original HTML.

```javascript
wave.destroy();
```

## Event Callbacks

### onInit
Called after the effect is initialized.

```javascript
new TextWaveEffect('#title', {
  onInit: (instance) => {
    console.log('Effect initialized!', instance);
  }
});
```

### onChange
Called whenever the wave position changes.

```javascript
new TextWaveEffect('#title', {
  onChange: (value, instance) => {
    console.log('Wave at position:', value);
    document.getElementById('display').textContent = value;
  }
});
```

### onReset
Called when the effect is reset.

```javascript
new TextWaveEffect('#title', {
  onReset: (instance) => {
    console.log('Effect reset!');
  }
});
```

### onDestroy
Called before the effect is destroyed.

```javascript
new TextWaveEffect('#title', {
  onDestroy: (instance) => {
    console.log('Cleaning up...');
  }
});
```

## Usage Examples

### Basic Slider Integration

```javascript
const wave = new TextWaveEffect('#myTitle');
const slider = document.getElementById('mySlider');

slider.addEventListener('input', (e) => {
  wave.setValue(e.target.value);
});
```

### Programmatic Animation

```javascript
const wave = new TextWaveEffect('#myTitle');

function animateWave(duration = 3000) {
  const startTime = Date.now();

  function animate() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease in-out
    const eased = progress < 0.5
      ? 2 * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    wave.setValue(eased * 100);

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  animate();
}

// Trigger animation
animateWave();
```

### Mouse/Touch Interaction

```javascript
const wave = new TextWaveEffect('#myTitle');
const container = document.getElementById('container');

container.addEventListener('mousemove', (e) => {
  const rect = container.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const percentage = (x / rect.width) * 100;
  wave.setValue(percentage);
});

container.addEventListener('mouseleave', () => {
  wave.reset();
});
```

### Scroll-Based Effect

```javascript
const wave = new TextWaveEffect('#myTitle');

window.addEventListener('scroll', () => {
  const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  wave.setValue(scrollPercent);
});
```

### Multiple Instances

```javascript
const titles = document.querySelectorAll('.wave-title');

const waves = Array.from(titles).map(title => {
  return new TextWaveEffect(title, {
    weightRange: [300, 700],
    onChange: (value) => {
      console.log(`${title.id} at ${value}`);
    }
  });
});

// Sync all instances
function syncWaves(value) {
  waves.forEach(wave => wave.setValue(value));
}
```

### Dynamic Configuration

```javascript
const wave = new TextWaveEffect('#myTitle');

// Change effect based on user preference
document.getElementById('effectSelect').addEventListener('change', (e) => {
  const presets = {
    subtle: { weightRange: [300, 500], scaleRange: [1.0, 1.15] },
    balanced: { weightRange: [300, 700], scaleRange: [1.0, 1.5] },
    dramatic: { weightRange: [100, 900], scaleRange: [0.8, 2.0] }
  };

  wave.updateConfig(presets[e.target.value]);
});
```

## Font Compatibility

The component works with any font family that supports variable weights. For best results:

1. **Use fonts with wide weight ranges** (e.g., 100-900)
2. **Match `weightRange` to available font weights**
3. **Test with your specific font** - some fonts have non-linear weight scaling

### Recommended Fonts

- **IBM Plex Sans** - 100-900 weights
- **Inter** - 100-900 weights
- **Roboto** - 100-900 weights
- **Playfair Display** - 300-900 weights (serif)
- **Space Grotesk** - 300-700 weights

## Styling Considerations

### CSS Requirements

The component inherits font-family from the target element:

```css
#myTitle {
  font-family: 'IBM Plex Sans', sans-serif;
  /* Font family is inherited by letter spans */
}
```

### Responsive Typography

```css
@media (max-width: 768px) {
  #myTitle {
    font-size: 36px;  /* Component automatically adapts */
  }
}
```

### Color and Themes

```css
/* Light mode */
#myTitle {
  color: #1a1a1a;
}

/* Dark mode */
[data-theme="dark"] #myTitle {
  color: #ffffff;
}
```

## Performance Tips

1. **Limit instances** - Each instance processes characters independently
2. **Use appropriate `transitionDuration`** - Faster transitions (0.1s) perform better
3. **Debounce rapid updates** - When connecting to scroll or resize events
4. **Destroy unused instances** - Call `destroy()` when effect is no longer needed

```javascript
// Debounce scroll updates
let scrollTimeout;
window.addEventListener('scroll', () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    wave.setValue(calculateScrollPercent());
  }, 16); // ~60fps
});
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

**Note:** Uses modern JavaScript features (ES6+). Transpile if targeting older browsers.

## Demos

Three demo files are included:

1. **text-wave-basic.html** - Simple single-instance demo with slider control
2. **text-wave-advanced.html** - Multiple instances with different configurations
3. **text-wave-custom-fonts.html** - Showcase with various font families

Open any demo file in your browser to see the effect in action.

## License

MIT License - Feel free to use in personal and commercial projects.

## Credits

Created by **Jerimy Brown**
- Website: [jerimybrown.com](https://jerimybrown.com)
- Portfolio component extracted and generalized for reuse

## Support

For issues, questions, or contributions, please visit the project repository.

---

**Version:** 1.0.0
**Last Updated:** October 2025
