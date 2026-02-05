# BVP Optica Website

**BVP Optica** is the official student chapter of **Optica (formerly OSA)** at **Bharati Vidyapeeth's College of Engineering, Delhi**. This modern, fully responsive website showcases the chapter's mission, activities, events, and team.

---

## ✨ Features

- **Cinematic 3D Hero**: WebGL-powered hero with quantum foam, crystal clusters, particle swarms, and rotating spectrum rings
- **Snap Scroll Home Page**: Custom section-based snap scrolling with animated navigation rail
- **Fully Responsive Design**: Optimized for mobile, tablet, and desktop with adaptive quality
- **Dark Theme**: Consistent background with purple/pink gradient accents
- **Performance Optimized**: Adaptive rendering quality based on device capabilities
- **Team Page**: Core team + Department heads with detailed social links
- **Events Page**: Comprehensive event listing with filtering
- **About Page**: Mission, vision, faculty advisor details
- **Mouse-Reactive Effects**: Interactive background elements that follow cursor movement
- **Smooth Animations**: Framer Motion & GSAP-powered transitions and interactions

---

## 🎨 Design System

### Color Palette

```css
--background-dark: #0e1a2b;
--spectrum-purple: #a48ff5;
--spectrum-violet: #6f4cff;
--spectrum-pink: #e91e63;
--gradient-primary: from-purple-400 to-pink-400;
--gradient-accent: from-purple-600 to-pink-600;
```

### Typography

- **Headings**: Poppins 600/700 (`font-heading`)
- **Body**: Inter 400 (`font-body`)
- **Accent**: Montserrat 500 (`font-accent`)

All fonts loaded from `next/font/google` for optimal performance.

### Component Patterns

**Card Style** (gradient background with backdrop blur):
```tsx
className="bg-gradient-to-br from-purple-900/30 via-black/40 to-purple-900/20
  backdrop-blur-sm rounded-xl border border-purple-500/20
  hover:border-purple-400/40 transition-all duration-300"
```

**Gradient Text**:
```tsx
className="bg-gradient-to-r from-purple-300 via-pink-300 to-purple-400
  bg-clip-text text-transparent"
```

---

## 📱 Responsive Design

| Breakpoint | Width    | Usage          |
| ---------- | -------- | -------------- |
| Default    | < 640px  | Mobile         |
| `sm:`      | ≥ 640px  | Small tablets  |
| `md:`      | ≥ 768px  | Tablets        |
| `lg:`      | ≥ 1024px | Laptops        |
| `xl:`      | ≥ 1280px | Desktops       |

### Adaptive Quality (3D Performance)

The Hero3D component adapts rendering quality based on device:

| Setting | Mobile | Tablet | Desktop |
| ------- | ------ | ------ | ------- |
| DPR     | 1      | 1.5    | 2       |
| Particles | 300  | 800    | 1500    |
| Bloom   | ❌     | ❌     | ✅      |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm 11.9.0+

### Installation

```bash
# Clone repository
git clone https://github.com/sammyyakk/optica-website.git
cd optica-website

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view in browser.

### Build for Production

```bash
npm run build
npm start
```

### Lint Code

```bash
npm run lint
```

---

## 🛠️ Tech Stack

| Category        | Technology                    | Version |
| --------------- | ----------------------------- | ------- |
| Framework       | Next.js (App Router)          | 15.5.12 |
| React           | React + React DOM             | 19.2.4  |
| Styling         | Tailwind CSS                  | 3.4.17  |
| Animation       | Framer Motion (motion)        | 12.33.0 |
| Animation       | GSAP                          | 3.14.2  |
| 3D/WebGL        | Three.js + @react-three/fiber | 0.182.0 |
| 3D Helpers      | @react-three/drei             | 10.7.7  |
| Post-processing | @react-three/postprocessing   | 3.0.4   |
| State Management| Zustand                       | 5.0.11  |
| Type Safety     | TypeScript                    | 5.9.3   |
| Email Service   | @emailjs/browser              | 4.4.1   |
| UI Components   | Radix UI                      | Latest  |
| Code Quality    | ESLint                        | 9.26.0  |

## 📁 Project Structure

```
optica-website/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout with fonts, providers, metadata
│   │   ├── page.tsx                # Home page with SectionSnapScroll
│   │   ├── globals.css             # Tailwind imports, custom CSS
│   │   ├── about/page.tsx          # About page with mission/vision
│   │   ├── events/page.tsx         # Events listing with filtering
│   │   ├── events/ai-conclave/     # AI Conclave hackathon event page
│   │   └── team/page.tsx           # Team members with social links
│   ├── components/
│   │   ├── ui/
│   │   │   ├── SectionSnapScroll.tsx    # Custom snap scroll with nav rail
│   │   │   ├── FixedParticleBackground.tsx
│   │   │   ├── CustomCursor.tsx
│   │   │   └── ThemeToggle.tsx
│   │   ├── layout/
│   │   │   └── Navbar.tsx
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── WhoWeAreSection.tsx
│   │   │   ├── LifeAsMemberSection.tsx
│   │   │   ├── FacultyAdvisorSection.tsx
│   │   │   └── FooterSection.tsx
│   │   ├── events/
│   │   │   └── EventCards.tsx
│   │   └── three/
│   │       └── Hero3D.tsx (3D WebGL hero scene)
│   └── lib/
│       ├── accessibility/
│       ├── animations/
│       ├── theme/
│       └── utils.ts
├── public/
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
└── package.json
```

---

## 📧 Contact & Social

**Email:** [bvpoptica@gmail.com](mailto:bvpoptica@gmail.com)  
**Address:** A-4, Paschim Vihar, New Delhi – 110063  
**Social:** Instagram [@bvpoptica](https://instagram.com/bvpoptica), LinkedIn

---

## 👥 Development Team

**Website Developer & Maintainer:** [Samyak Jain](https://github.com/sammyyakk)

---

## 📝 Git Workflow

### Branch Naming
- Feature branches: `feature/feature-name`
- Bug fixes: `fix/bug-name`
- Documentation: `docs/description`

### Commit Messages
Use conventional commits format:
```
feat: Add new component
fix: Resolve mobile layout issue
style: Update color scheme
perf: Optimize 3D rendering
docs: Update README
refactor: Restructure component
chore: Update dependencies
```

### Process

1. **Create branch from main**:
   ```bash
   git checkout -b feature/your-feature
   ```

2. **Make changes and commit**:
   ```bash
   git add .
   git commit -m "feat: Add feature description"
   ```

3. **Pull before push**:
   ```bash
   git pull origin main
   git push origin feature/your-feature
   ```

4. **Create Pull Request** with clear description

5. **Code Review** before merging to main

---

## 📄 Contact

**Email:** [bvpoptica@gmail.com](mailto:bvpoptica@gmail.com)  
**Address:** A-4, Paschim Vihar, New Delhi – 110063  
**Socials:** Instagram & LinkedIn

---

## Contribution & Git Guidelines

To maintain a clean and organized repository, please follow these steps:

1. **Branching**

   - Always create a new branch for your work:  
     `git checkout -b feature/your-feature`
   - Use descriptive names like `feature/event-page` or `fix/navbar-bug`.

2. **Pull Before You Push**

   - Sync with the main branch before starting:  
     `git pull origin main`
   - This prevents conflicts and keeps your branch up to date.

3. **Commit Best Practices**

   - Make small, focused commits.
   - Use clear messages in the format:  
     `Add feature: description` or `Fix bug: description`.

4. **Push Changes**

   - Push your branch to your fork:  
     `git push origin feature/your-feature`

5. **Pull Requests**

   - Open a Pull Request to the main repository.
   - Include a brief description of what your changes do.
   - Attach screenshots or demos if UI changes are involved.

6. **Code Review & Cleanup**
   - Review your code for formatting and responsiveness.
   - Remove any unnecessary console logs or commented code.

Following these steps ensures smooth collaboration and keeps the repository organized.
