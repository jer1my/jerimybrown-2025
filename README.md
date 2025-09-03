# Modern Portfolio Website

A sleek, responsive portfolio website built with modern web technologies and enhanced by AI-powered development using Claude Code.

![Portfolio Preview](./assets/preview.png)

## ✨ Features

- **Responsive Design** - Seamless experience across all devices
- **Modern UI/UX** - Clean, minimalist design with smooth animations
- **Dark/Light Theme** - Toggle between themes with persistent preference
- **Interactive Components** - Engaging hover effects and transitions
- **Performance Optimized** - Fast loading times and optimized assets
- **SEO Friendly** - Meta tags, structured data, and semantic HTML
- **Contact Form** - Functional contact form with validation
- **Project Showcase** - Interactive project cards with live demos
- **Skills Visualization** - Animated skill bars and technology icons
- **Blog Integration** - Optional blog section for articles and thoughts

## 🛠️ Built With

- **Frontend Framework:** React 18 / Next.js 14
- **Styling:** Tailwind CSS / CSS Modules
- **Animations:** Framer Motion
- **Icons:** Lucide React / React Icons
- **Form Handling:** React Hook Form
- **Email Service:** EmailJS / Nodemailer
- **Deployment:** Vercel / Netlify
- **AI Development:** Claude Code for automated coding tasks

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git
- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) (optional, for AI-assisted development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/modern-portfolio.git
   cd modern-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   EMAILJS_SERVICE_ID=your_service_id
   EMAILJS_TEMPLATE_ID=your_template_id
   EMAILJS_PUBLIC_KEY=your_public_key
   GOOGLE_ANALYTICS_ID=your_ga_id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🤖 Claude Code Integration

This project leverages [Claude Code](https://docs.anthropic.com/en/docs/claude-code) for AI-assisted development. Here are some example commands you can use:

### Component Generation
```bash
claude-code "create a testimonials section component with carousel functionality"
```

### Feature Implementation
```bash
claude-code "add a blog section with markdown support and syntax highlighting"
```

### Optimization Tasks
```bash
claude-code "optimize images and implement lazy loading for better performance"
```

### Bug Fixes
```bash
claude-code "fix the mobile navigation menu not closing on route change"
```

## 📁 Project Structure

```
modern-portfolio/
├── public/
│   ├── images/
│   ├── icons/
│   └── resume.pdf
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── sections/
│   │   └── ui/
│   ├── pages/
│   ├── styles/
│   ├── utils/
│   ├── hooks/
│   └── data/
├── docs/
├── .env.example
├── package.json
└── README.md
```

## 🎨 Customization

### Personal Information
Update your personal information in `src/data/personal.js`:

```javascript
export const personalData = {
  name: "Your Name",
  title: "Your Professional Title",
  email: "your.email@example.com",
  phone: "+1 (555) 123-4567",
  location: "City, Country",
  // ... more fields
};
```

### Projects
Add your projects in `src/data/projects.js`:

```javascript
export const projects = [
  {
    id: 1,
    title: "Project Name",
    description: "Brief description",
    technologies: ["React", "Node.js", "MongoDB"],
    liveUrl: "https://project-demo.com",
    githubUrl: "https://github.com/username/project",
    image: "/images/project1.png"
  },
  // ... more projects
];
```

### Styling
- **Colors:** Modify the color palette in `tailwind.config.js`
- **Typography:** Update font settings in `src/styles/globals.css`
- **Components:** Customize individual components in `src/components/`

## 📧 Contact Form Setup

This portfolio includes a functional contact form. To set it up:

1. **Create an EmailJS account** at [emailjs.com](https://www.emailjs.com/)
2. **Create a service** (Gmail, Outlook, etc.)
3. **Create an email template**
4. **Add your credentials** to `.env.local`

Example template variables:
- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email
- `{{message}}` - Message content

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy with one click

### Netlify
1. Build the project: `npm run build`
2. Drag and drop the `build` folder to [Netlify](https://netlify.com)
3. Configure environment variables

### Manual Deployment
```bash
npm run build
npm run export  # for static export
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run test` - Run tests
- `npm run analyze` - Analyze bundle size

## 📊 Performance

This portfolio is optimized for performance:

- **Lighthouse Score:** 95+ across all metrics
- **Core Web Vitals:** All metrics in green
- **Bundle Size:** < 200KB gzipped
- **Load Time:** < 2s on 3G networks

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Test thoroughly**
5. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Using Claude Code for Contributions
You can use Claude Code to help with development:

```bash
claude-code "implement the feature requested in issue #123"
claude-code "write tests for the new contact form validation"
claude-code "optimize the image loading performance"
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Claude Code** - AI-powered development assistance
- **Vercel** - Deployment platform
- **Unsplash** - Stock photography
- **Lucide** - Beautiful icons
- **Framer Motion** - Animation library

## 📞 Support

If you have any questions or need help:

- **Email:** your.email@example.com
- **LinkedIn:** [Your LinkedIn Profile](https://linkedin.com/in/yourprofile)
- **Twitter:** [@yourusername](https://twitter.com/yourusername)
- **Issues:** [GitHub Issues](https://github.com/yourusername/modern-portfolio/issues)

## 🗺️ Roadmap

- [ ] Add blog functionality
- [ ] Implement CMS integration
- [ ] Add multi-language support
- [ ] Create mobile app version
- [ ] Add analytics dashboard
- [ ] Implement PWA features

---

**⭐ If you found this project helpful, please consider giving it a star!**

Built with ❤️ and enhanced by Claude Code