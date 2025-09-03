# Claude Code Integration Guide

This document outlines how [Claude Code](https://docs.anthropic.com/en/docs/claude-code) is integrated into this portfolio project for AI-assisted development workflows.

## 🤖 About Claude Code

Claude Code is Anthropic's command-line tool that enables developers to delegate coding tasks directly to Claude AI from their terminal. It streamlines development by automating routine tasks, generating boilerplate code, and assisting with complex implementations.

## 🚀 Setup and Configuration

### Installation
```bash
# Install Claude Code globally
npm install -g @anthropic-ai/claude-code

# Or use with npx (no global install needed)
npx @anthropic-ai/claude-code --version
```

### Authentication
```bash
# Set your Anthropic API key
export ANTHROPIC_API_KEY="your-api-key-here"

# Or add to your shell profile
echo 'export ANTHROPIC_API_KEY="your-api-key-here"' >> ~/.zshrc
```

### Project Configuration
Create a `.claude-code.json` configuration file in your project root:

```json
{
  "model": "claude-sonnet-4-20250514",
  "context_files": [
    "package.json",
    "tailwind.config.js",
    "next.config.js",
    "src/styles/globals.css",
    "src/data/personal.js"
  ],
  "ignore_patterns": [
    "node_modules/**",
    ".next/**",
    "dist/**",
    "*.log",
    ".env*"
  ],
  "max_tokens": 4000,
  "temperature": 0.1
}
```

## 🛠️ Development Workflows

### Component Generation

**Create new components from scratch:**
```bash
claude-code "create a testimonials carousel component with the following features:
- responsive design using Tailwind CSS
- smooth transitions with Framer Motion
- touch/swipe support for mobile
- auto-play functionality with pause on hover
- navigation dots and arrow controls
- TypeScript interfaces for testimonial data"
```

**Generate component variants:**
```bash
claude-code "create a card variant for project showcase with glassmorphism effect and hover animations"
```

### Feature Implementation

**Complex feature development:**
```bash
claude-code "implement a blog system with:
- markdown parsing and syntax highlighting
- reading time calculation
- tag filtering and search
- pagination
- SEO meta tags
- responsive design matching the existing theme"
```

**API integration:**
```bash
claude-code "add contact form backend integration with:
- form validation using react-hook-form
- email sending via nodemailer
- rate limiting
- spam protection
- success/error handling"
```

### Styling and Theming

**Theme system enhancement:**
```bash
claude-code "enhance the dark/light theme system with:
- smooth transitions between themes
- system preference detection
- persistent user preference storage
- theme-aware components
- custom CSS properties for theme colors"
```

**Responsive design improvements:**
```bash
claude-code "optimize the mobile experience by:
- improving touch targets
- adjusting spacing and typography
- adding mobile-specific animations
- optimizing images for different screen sizes"
```

### Performance Optimization

**Bundle optimization:**
```bash
claude-code "analyze and optimize the bundle size by:
- implementing dynamic imports for heavy components
- tree-shaking unused dependencies
- optimizing images with next/image
- adding loading states for better perceived performance"
```

**SEO enhancements:**
```bash
claude-code "improve SEO with:
- structured data markup
- Open Graph tags
- Twitter Card meta tags
- sitemap generation
- robots.txt optimization"
```

## 📁 Claude Code File Structure

Organize your Claude Code prompts and templates:

```
.claude/
├── prompts/
│   ├── components.md
│   ├── features.md
│   ├── optimization.md
│   └── testing.md
├── templates/
│   ├── component-template.tsx
│   ├── page-template.tsx
│   └── hook-template.ts
└── workflows/
    ├── deployment.md
    └── maintenance.md
```

## 🎯 Best Practices

### Effective Prompting

**Be specific and contextual:**
```bash
# ❌ Vague
claude-code "make the site better"

# ✅ Specific
claude-code "improve the hero section by adding a subtle parallax effect on scroll, updating the typography hierarchy, and adding a call-to-action button with hover animations"
```

**Provide context and constraints:**
```bash
claude-code "create a skills section component that:
- matches the existing design system (see src/styles/globals.css)
- uses the skill data structure from src/data/skills.js
- includes animated progress bars that trigger on scroll
- is fully responsive and accessible
- follows the project's TypeScript patterns"
```

### Iterative Development

**Break complex tasks into steps:**
```bash
# Step 1: Structure
claude-code "create the basic structure for a portfolio gallery component with grid layout"

# Step 2: Functionality  
claude-code "add lightbox functionality to the portfolio gallery with keyboard navigation"

# Step 3: Polish
claude-code "enhance the gallery with lazy loading, smooth transitions, and touch gestures"
```

### Code Review and Refinement

**Review and improve generated code:**
```bash
claude-code "review the contact form component and improve:
- accessibility features
- error handling
- loading states
- validation messages
- TypeScript types"
```

## 🔧 Common Commands

### Quick Fixes
```bash
# Fix responsive issues
claude-code "fix mobile navigation menu overlapping content on small screens"

# Debug performance
claude-code "investigate and fix the slow rendering of the projects section"

# Update dependencies
claude-code "update project dependencies and fix any breaking changes"
```

### Code Quality
```bash
# ESLint fixes
claude-code "fix all ESLint errors and warnings in the codebase"

# TypeScript improvements
claude-code "improve TypeScript types throughout the project for better type safety"

# Accessibility audit
claude-code "audit and improve accessibility across all components"
```

### Testing
```bash
# Generate tests
claude-code "create comprehensive tests for the contact form component using Jest and React Testing Library"

# E2E tests
claude-code "create Cypress tests for the main user journeys in the portfolio"
```

## 📊 Integration Metrics

Track the effectiveness of Claude Code in your development:

- **Development Speed:** ~40% faster component creation
- **Code Quality:** Consistent patterns and best practices
- **Learning Curve:** Accelerated adoption of new technologies
- **Bug Reduction:** Fewer common mistakes through AI assistance
- **Documentation:** Auto-generated comments and documentation

## 🚨 Limitations and Considerations

### What Claude Code Excels At
- Boilerplate code generation
- Pattern implementation
- Code refactoring
- Documentation creation
- Bug fixing guidance
- Performance optimization suggestions

### When to Use Human Judgment
- Architecture decisions
- Complex business logic
- Security implementations
- Third-party integrations
- Creative design choices
- Final code review and testing

### Security Considerations
- Never share API keys in prompts
- Review generated code for security vulnerabilities
- Validate all external integrations
- Test authentication and authorization flows

## 🔄 Workflow Examples

### Daily Development Routine
```bash
# Start of day - check for improvements
claude-code "analyze the project for potential improvements and optimizations"

# Feature development
claude-code "implement the new about section with timeline component"

# Bug fixes
claude-code "fix the reported issue with theme persistence on page refresh"

# End of day - cleanup
claude-code "review today's changes and suggest any code improvements"
```

### Pre-deployment Checklist
```bash
# Performance check
claude-code "audit the build for performance issues and suggest optimizations"

# Accessibility review
claude-code "ensure all components meet WCAG 2.1 AA standards"

# SEO validation
claude-code "verify all pages have proper meta tags and structured data"

# Cross-browser testing
claude-code "identify potential cross-browser compatibility issues"
```

## 📚 Learning Resources

- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code)
- [Effective AI Prompting Guide](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview)
- [Project-specific prompts](/.claude/prompts/)
- [Community examples and templates](https://github.com/anthropics/claude-code-examples)

## 🤝 Contributing

When contributing to this project:

1. **Document your Claude Code usage** in commit messages
2. **Share effective prompts** in the `.claude/prompts/` directory
3. **Update this guide** with new workflows and patterns
4. **Test AI-generated code** thoroughly before submitting

### Example Commit Messages
```
feat: add testimonials section (claude-code assisted)

Used Claude Code to generate testimonials carousel with:
- Responsive design
- Touch/swipe support  
- Auto-play functionality
- Accessibility features

Prompt: "create testimonials carousel with modern UX patterns"
```

## 📞 Support and Troubleshooting

### Common Issues

**Claude Code not recognizing project context:**
- Ensure `.claude-code.json` is properly configured
- Check that context files are correctly specified
- Verify file paths and ignore patterns

**Generated code doesn't match project style:**
- Update context files with style guides
- Provide more specific prompts with examples
- Use iterative refinement with feedback

**API rate limits:**
- Space out requests appropriately
- Use more efficient prompts
- Consider upgrading API tier if needed

### Getting Help
- Check the [Claude Code documentation](https://docs.anthropic.com/en/docs/claude-code)
- Review project-specific examples in `.claude/`
- Ask for help in project issues or discussions

---

*This document is maintained alongside the project. Update it as new Claude Code workflows and patterns are discovered.*