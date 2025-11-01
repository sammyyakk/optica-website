# BVP Optica Website - Development Guide

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit [http://localhost:3000](http://localhost:3000) to view the website.

## 📁 Project Structure

```
optica-website/
├── src/
│   ├── app/                          # Next.js App Router pages
│   │   ├── layout.tsx                # Root layout with providers
│   │   ├── page.tsx                  # Homepage
│   │   ├── about/page.tsx            # About page
│   │   ├── events/page.tsx           # Events listing
│   │   ├── team/page.tsx             # Team members
│   │   └── globals.css               # Global styles
│   ├── components/
│   │   ├── layout/
│   │   │   └── Navbar.tsx            # Animated navigation
│   │   ├── ui/
│   │   │   └── ThemeToggle.tsx       # Dark mode toggle
│   │   ├── events/
│   │   │   └── EventCards.tsx        # Event grid with filters
│   │   └── three/
│   │       └── Hero3D.tsx            # 3D particle background
│   └── lib/
│       ├── animations/
│       │   ├── gsap.ts               # GSAP utilities
│       │   ├── AnimationProvider.tsx # Animation context
│       │   └── ScrollAnimations.tsx  # Scroll-triggered animations
│       ├── theme/
│       │   └── ThemeProvider.tsx     # Theme management
│       └── accessibility/
│           └── hooks.tsx             # Accessibility utilities
├── public/                           # Static assets (logos, images)
├── tailwind.config.ts                # Tailwind configuration
└── next.config.js                    # Next.js configuration
```

## 🎨 Key Features Implemented

### ✅ Core Infrastructure
- **Next.js 15** with App Router and TypeScript
- **Tailwind CSS** with custom color palette
- **GSAP** for complex scroll-driven animations
- **Framer Motion** for micro-interactions
- **three.js** for 3D particle effects

### ✅ Animations
- **Hero3D**: 5000-particle field with custom shaders, floating wireframe geometries
- **Scroll Animations**: RevealElement, StaggerReveal, ParallaxElement components
- **Navbar**: Glass morphism, particle logo animation, radial mobile menu
- **Page Transitions**: Smooth reveal animations on all sections
- **Scroll Progress Bar**: Visual indicator at top of page

### ✅ Pages
- **Homepage**: Hero with 3D background, WHO WE ARE, LIFE AS A MEMBER, Faculty Advisor
- **About**: Mission, Vision, What We Do grid, Faculty Advisor profile
- **Events**: Filterable event grid with animated layout transitions
- **Team**: Core team and department heads with stagger animations

### ✅ Theme System
- **Dark/Light Mode**: Toggle with smooth transitions
- **Theme-aware Colors**: All components support both themes
- **Logo Switching**: Navbar logo changes based on scroll and theme
- **LocalStorage Persistence**: Theme preference saved

### ✅ Accessibility
- **Skip Link**: Keyboard navigation to main content
- **ARIA Labels**: All interactive elements properly labeled
- **Focus Management**: Focus traps for modals, keyboard navigation
- **Reduced Motion**: Respects `prefers-reduced-motion` preference
- **Semantic HTML**: Proper heading hierarchy and landmarks

### ✅ Performance & SEO
- **Static Generation**: All pages pre-rendered at build time
- **Image Optimization**: Next.js Image component with WebP
- **Font Optimization**: Google Fonts with Next.js font loading
- **Responsive Typography**: clamp() for fluid text sizing
- **Meta Tags**: OpenGraph, Twitter cards, robots directives
- **Production Build**: Successfully builds with zero errors

## 🎯 Animation System

### GSAP Utilities (`src/lib/animations/gsap.ts`)
```typescript
createRevealAnimation()      // Fade in from bottom
createStaggerReveal()         // Staggered child reveals
createHeroScrollMorph()       // Hero section parallax
smoothScrollTo()              // Smooth hash navigation
createParallax()              // Background parallax
createSectionTimeline()       // Complex section animations
```

### Scroll Animation Components (`src/lib/animations/ScrollAnimations.tsx`)
```typescript
<RevealElement direction="up">         // Scroll-triggered reveal
<StaggerReveal staggerDelay={0.1}>     // Staggered children
<ParallaxElement speed={0.5}>          // Parallax scrolling
<ScrollProgress />                      // Top progress bar
```

### Motion (Framer Motion)
- Layout animations for event filtering
- Micro-interactions on hover/tap
- Page transition animations
- Mobile menu radial expansion

## 🎨 Design System

### Colors
All colors from README.md are configured in `tailwind.config.ts`:
- **Optica Blue**: `#0072CE`
- **Quantum Violet**: `#6C63FF`
- **Photon Gold**: `#FFC300`
- **Laser Magenta**: `#E91E63`
- **Background Light**: `#F5F7FA`
- **Background Dark**: `#0E1A2B`

### Typography
- **Headings**: Poppins (600, 700)
- **Body**: Inter (400)
- **Accents**: Montserrat (500)
- **Responsive Scaling**: `clamp()` for all text sizes

### Components
- **Border Radius**: `card: 12px`, `button: 16px`
- **Shadows**: `shadow-card` for elevation
- **Glass Morphism**: `backdrop-blur-xl` with opacity
- **Gradients**: Multi-color gradients for CTA elements

## 🛠️ Development Commands

```bash
# Development
npm run dev              # Start dev server on localhost:3000

# Production
npm run build            # Build optimized production bundle
npm start                # Start production server

# Code Quality
npm run lint             # Run ESLint
npx tsc --noEmit         # Type checking without emitting files

# Clean Build
rm -rf .next && npm run build
```

## 📦 Dependencies

### Core
- `next@15.5.6` - React framework
- `react@18.3.1` - UI library
- `typescript@^5` - Type safety

### Styling
- `tailwindcss@^3.4.1` - Utility-first CSS
- `autoprefixer@^10.4.20` - CSS vendor prefixing

### Animation
- `gsap@^3.12.5` - Advanced animations
- `framer-motion@^11.18.1` - React animations
- `@react-three/fiber@^8.17.10` - React three.js renderer
- `@react-three/drei@^9.117.3` - three.js helpers
- `three@^0.171.0` - 3D library

### UI Components
- `@radix-ui/*` - Accessible primitives
- `motion@^11.19.1` - Motion library

### State & Data
- `zustand@^5.0.2` - State management
- `@tanstack/react-query@^5.62.8` - Server state

## 🚢 Deployment

The project is configured for **Vercel** deployment:

1. Push to GitHub
2. Connect repository to Vercel
3. Auto-deploys on push to main branch

Environment variables (if needed):
```env
NEXT_PUBLIC_API_URL=your_api_url
```

## 📝 Git Workflow

Current commits:
1. ✅ Theme switching with dark mode support
2. ✅ Hero3D, scroll animations, Events and Team pages
3. ✅ Comprehensive accessibility and SEO improvements

All changes committed and pushed to remote repository.

## 🎯 Performance Metrics

Build output:
- **Total Pages**: 7 static pages
- **First Load JS**: ~102 kB (shared)
- **Page-specific JS**: 1-4 kB per page
- **Build Time**: ~6-7 seconds
- **Optimization**: ✓ Compiled successfully

## 🔧 Troubleshooting

### Build Issues
- If build fails, run `rm -rf .next && npm run build`
- Ensure Node.js version >= 18
- Check TypeScript errors with `npx tsc --noEmit`

### Animation Issues
- Check browser support for `backdrop-filter`
- Verify GSAP registration in AnimationProvider
- Test with `prefers-reduced-motion` disabled

### Theme Issues
- Clear localStorage to reset theme
- Check ThemeProvider wraps entire app in layout.tsx
- Verify dark mode classes in Tailwind config

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [GSAP Documentation](https://gsap.com/docs/)
- [three.js Documentation](https://threejs.org/docs/)
- [Framer Motion API](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Test build (`npm run build`)
4. Commit with descriptive message
5. Push and create pull request

## 📄 License

© 2025 BVP Optica. All rights reserved.
