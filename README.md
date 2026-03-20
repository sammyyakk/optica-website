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
├── content/
│   └── blog/                        # MDX blog posts (filename = URL slug)
│       ├── welcome-to-bvp-optica-blog.mdx
│       ├── understanding-fiber-optics.mdx
│       └── ai-conclave-hackathon-2026.mdx
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout with fonts, providers, metadata
│   │   ├── page.tsx                # Home page with SectionSnapScroll
│   │   ├── globals.css             # Tailwind imports, custom CSS
│   │   ├── about/page.tsx          # About page with mission/vision
│   │   ├── events/page.tsx         # Events listing with filtering
│   │   ├── events/ai-conclave/     # AI Conclave hackathon event page
│   │   ├── blog/page.tsx           # Blog listing page
│   │   ├── blog/[slug]/page.tsx    # Individual blog post page
│   │   ├── blog/embed/[slug]/      # Embeddable iframe version
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
│   │   ├── blog/
│   │   │   ├── MDXComponents.tsx        # Custom MDX components + element overrides
│   │   │   ├── MDXClientComponents.tsx  # Client-only components (Tabs)
│   │   │   ├── BlogPostMDXContent.tsx   # Server-side MDX renderer
│   │   │   ├── BlogPostClient.tsx       # Blog post layout (client)
│   │   │   ├── BlogListClient.tsx       # Blog listing UI (client)
│   │   │   └── Icons.tsx                # Category SVG icons
│   │   ├── events/
│   │   │   └── EventCards.tsx
│   │   └── three/
│   │       └── Hero3D.tsx (3D WebGL hero scene)
│   └── lib/
│       ├── blog/
│       │   ├── posts.ts            # Blog post reading, parsing & API
│       │   ├── types.ts            # BlogPost, BlogCategory types
│       │   └── mdx.ts             # MDX config & heading extraction
│       ├── accessibility/
│       ├── animations/
│       ├── theme/
│       └── utils.ts
├── public/
│   └── blog/                       # Blog cover images
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
└── package.json
```

---

## � Blog System — Complete Guide

The BVP Optica website has a fully-featured blog powered by **MDX** (Markdown + JSX). Blog posts are simple `.mdx` files — no database, no CMS, no admin panel. Just write a file, commit, and it's live.

### How It Works

```
content/blog/
├── welcome-to-bvp-optica-blog.mdx      → /blog/welcome-to-bvp-optica-blog
├── understanding-fiber-optics.mdx       → /blog/understanding-fiber-optics
├── ai-conclave-hackathon-2026.mdx       → /blog/ai-conclave-hackathon-2026
└── your-new-post.mdx                    → /blog/your-new-post
```

Each `.mdx` file in `content/blog/` automatically becomes a blog post. The filename becomes the URL slug.

---

### Creating a New Blog Post

#### Step 1: Create the file

Create a new `.mdx` file in `content/blog/`. Use kebab-case for the filename:

```
content/blog/my-awesome-article.mdx
```

This will be available at `https://www.bvpoptica.com/blog/my-awesome-article`.

#### Step 2: Add frontmatter

Every post **must** start with YAML frontmatter between `---` fences. Here's the full template with all fields:

```yaml
---
# ═══════════════════════════════════════════════
# REQUIRED FIELDS
# ═══════════════════════════════════════════════

title: "Your Post Title Here"
excerpt: "A short 1-2 sentence summary shown on blog cards and in SEO descriptions."
publishedAt: "2026-02-06T12:00:00+05:30"   # ISO 8601 date with timezone
category: "Tutorials"                        # Must be one of the allowed categories (see below)

tags:                                        # Array of lowercase tags for filtering
  - optics
  - tutorial
  - beginner

author:
  name: "Your Name"
  role: "Your Role / Department"
  image: "/team/your-photo.png"              # Optional — path in /public
  linkedin: "https://linkedin.com/in/you"    # Optional
  instagram: "https://instagram.com/you"     # Optional
  github: "https://github.com/you"           # Optional

# ═══════════════════════════════════════════════
# OPTIONAL FIELDS
# ═══════════════════════════════════════════════

coverImage: "/blog/my-cover.jpg"             # Cover image — put the file in /public/blog/
featured: true                               # Show in the "Featured" section on /blog
pinned: true                                 # Pin to the top of the blog listing
draft: false                                 # Set to true to hide from public (won't appear anywhere)
updatedAt: "2026-03-01T10:00:00+05:30"       # Last updated date (shown if set)
readingTime: 5                               # Override auto-calculated reading time (in minutes)
---
```

#### Allowed Categories

Use **exactly** one of these values for the `category` field:

| Category              | Use For                                        |
| --------------------- | ---------------------------------------------- |
| `Optics & Photonics`  | Core optics concepts, physics, research topics |
| `Events & Recaps`     | Event coverage, hackathons, workshop recaps    |
| `Tutorials`           | Step-by-step guides, how-tos, experiments      |
| `Research`            | Research highlights, paper summaries            |
| `Announcements`       | Chapter news, launches, updates                |
| `Student Life`        | Member stories, experiences, day-in-the-life   |
| `Industry Insights`   | Trends, innovations, career advice             |
| `General`             | Everything else                                |

#### Step 3: Write your content

Below the frontmatter `---`, write your content using standard Markdown **and/or** MDX components:

```mdx
---
title: "Getting Started with Lasers"
excerpt: "A beginner-friendly introduction to laser physics."
publishedAt: "2026-02-15T10:00:00+05:30"
category: "Tutorials"
tags:
  - lasers
  - optics basics
author:
  name: "Samyak Jain"
  role: "Head of Technology"
---

Lasers are everywhere — from barcode scanners to fiber optic communication.
Let's break down how they work.

## How Lasers Work

A laser produces light through **stimulated emission of radiation**.
The key components are:

- **Gain medium** — The material that amplifies light
- **Energy pump** — Provides energy to excite atoms
- **Optical resonator** — Two mirrors that bounce light back and forth

### The Three Steps

1. **Absorption** — Atoms absorb energy and move to an excited state
2. **Spontaneous Emission** — Some atoms release photons randomly
3. **Stimulated Emission** — A photon triggers another atom to release an identical photon

<Callout type="info" title="Fun Fact">
  LASER stands for **L**ight **A**mplification by **S**timulated **E**mission of **R**adiation.
</Callout>

> "The laser is a solution seeking a problem." — Theodore Maiman

## Applications

<StatGrid>
  <Stat value="60+" label="Years since invention" />
  <Stat value="$18B" label="Global laser market" />
  <Stat value="100+" label="Gbps fiber speeds" />
</StatGrid>

Check out our events page to learn more:

<LinkCard
  href="/events"
  title="BVP Optica Events"
  description="Workshops, seminars, and hands-on laser demos"
/>
```

#### Step 4: Add cover image (optional)

If you want a cover image:

1. Place the image in `public/blog/` (e.g., `public/blog/my-cover.jpg`)
2. Reference it in frontmatter: `coverImage: "/blog/my-cover.jpg"`

Recommended: **1200×630px**, JPEG or PNG, keep file size under 500KB.

#### Step 5: Preview locally

```bash
npm run dev
```

Navigate to `http://localhost:3000/blog/your-post-slug` to preview.

#### Step 6: Commit and push

```bash
git add content/blog/your-new-post.mdx public/blog/your-cover.jpg
git commit -m "feat: add blog post — Your Post Title"
git push
```

The post will be live after deployment.

---

### Markdown Basics

All standard Markdown syntax is supported and automatically styled to match the site theme:

| Syntax                    | Result                                    |
| ------------------------- | ----------------------------------------- |
| `# Heading 1`            | Large gradient heading (purple→pink)      |
| `## Heading 2`            | Medium gradient heading with bottom border |
| `### Heading 3`           | Pink-colored heading                       |
| `#### Heading 4`          | Purple-colored heading                     |
| `**bold text**`           | **Bold** (white on dark)                  |
| `*italic text*`           | *Italic* (light gray)                     |
| `` `inline code` ``      | Pink code with subtle background          |
| `[link](url)`            | Purple link with hover effect             |
| `> blockquote`           | Purple left border + subtle background    |
| `- list item`            | Purple bullet markers                     |
| `1. numbered item`       | Purple numbered markers                   |
| `---`                     | Decorative divider with center dot        |
| `![alt](image.jpg)`      | Rounded image with purple border          |

#### Code Blocks

Fenced code blocks are fully supported with syntax highlighting:

````mdx
```python
import numpy as np

wavelength = 632.8e-9  # HeNe laser wavelength in meters
frequency = 3e8 / wavelength
print(f"Frequency: {frequency:.2e} Hz")
```
````

#### Tables

```mdx
| Property    | Value       |
| ----------- | ----------- |
| Wavelength  | 632.8 nm    |
| Type        | Gas laser   |
| Color       | Red         |
```

Tables are styled with purple headers, hover effects, and proper borders.

---

### MDX Custom Components

MDX lets you use **React components directly inside your blog posts**. These are pre-built, styled to match the site, and ready to use — no imports needed.

---

#### `<Callout>` — Alert / Info Boxes

Highlight important information with colored callout boxes.

```mdx
<Callout type="info" title="Did You Know?">
  Light travels at approximately 299,792,458 meters per second in a vacuum.
</Callout>

<Callout type="warning" title="Safety Warning">
  Never look directly into a laser beam. Always wear appropriate eye protection.
</Callout>

<Callout type="success" title="Experiment Complete">
  You've successfully measured the refractive index of glass!
</Callout>

<Callout type="danger" title="High Voltage">
  This experiment involves high-voltage power supplies. Faculty supervision required.
</Callout>

<Callout type="tip" title="Pro Tip">
  Use a spectrometer to verify your wavelength measurements.
</Callout>
```

**Props:**

| Prop     | Type                                                | Default  | Description              |
| -------- | --------------------------------------------------- | -------- | ------------------------ |
| `type`   | `"info"` \| `"warning"` \| `"success"` \| `"danger"` \| `"tip"` | `"info"` | Color theme of the box   |
| `title`  | `string`                                            | —        | Optional title text      |
| `children`| MDX content                                        | —        | The body content         |

---

#### `<StatGrid>` + `<Stat>` — Statistics Cards

Display key numbers or metrics in a responsive grid.

```mdx
<StatGrid>
  <Stat value="500+" label="Members" />
  <Stat value="50+" label="Events held" />
  <Stat value="15+" label="Workshops" />
</StatGrid>
```

**`<StatGrid>` Props:** Wraps `<Stat>` children in a 2–3 column grid. No extra props needed.

**`<Stat>` Props:**

| Prop    | Type     | Description                       |
| ------- | -------- | --------------------------------- |
| `value` | `string` | The big number/text (e.g. "500+") |
| `label` | `string` | Small label below the value       |

---

#### `<Badge>` — Inline Labels

Small colored labels for tagging or highlighting words inline.

```mdx
This experiment is <Badge>New</Badge> and covers <Badge color="pink">Advanced</Badge> topics.
```

**Props:**

| Prop      | Type                                                   | Default    | Description      |
| --------- | ------------------------------------------------------ | ---------- | ---------------- |
| `color`   | `"purple"` \| `"pink"` \| `"blue"` \| `"amber"` \| `"green"` | `"purple"` | Badge color      |
| `children`| text                                                   | —          | The label text   |

---

#### `<YouTube>` — Embed YouTube Videos

Embed a responsive YouTube video player.

```mdx
<YouTube id="dQw4w9WgXcQ" />
```

**Props:**

| Prop | Type     | Description                                                  |
| ---- | -------- | ------------------------------------------------------------ |
| `id` | `string` | The YouTube video ID (the part after `v=` in the URL)        |

---

#### `<BlogImage>` — Images with Captions

Display images with optional captions, optimized via Next.js Image.

```mdx
<BlogImage
  src="/blog/experiment-setup.jpg"
  alt="Experimental setup for measuring diffraction patterns"
  caption="Figure 1: Our diffraction grating experiment setup in the optics lab"
  width={800}
  height={450}
/>
```

**Props:**

| Prop      | Type     | Default | Description                     |
| --------- | -------- | ------- | ------------------------------- |
| `src`     | `string` | —       | Image path (in `/public`)       |
| `alt`     | `string` | —       | Alt text for accessibility      |
| `caption` | `string` | —       | Caption shown below the image   |
| `width`   | `number` | `800`   | Image width in pixels           |
| `height`  | `number` | `450`   | Image height in pixels          |

---

#### `<LinkCard>` — Rich Link Previews

Create card-style links to internal pages or external sites.

```mdx
<LinkCard
  href="/events"
  title="Upcoming Events"
  description="Check out what's happening at BVP Optica"
/>

<LinkCard
  href="https://www.optica.org"
  title="Optica (formerly OSA)"
  description="The global society for optics and photonics professionals"
/>
```

**Props:**

| Prop          | Type     | Description                                  |
| ------------- | -------- | -------------------------------------------- |
| `href`        | `string` | URL (internal path or external URL)          |
| `title`       | `string` | Card title                                   |
| `description` | `string` | Optional subtitle text                       |

External links automatically open in a new tab with an external-link icon.

---

#### `<Steps>` + `<Step>` — Step-by-Step Instructions

Create numbered step sequences with a visual timeline.

```mdx
<Steps>
  <Step number={1} title="Gather Materials">
    You'll need a laser pointer, diffraction grating, and a screen.
  </Step>
  <Step number={2} title="Set Up the Experiment">
    Mount the laser so it shines through the grating onto the screen.
  </Step>
  <Step number={3} title="Measure the Pattern">
    Record the distances between the bright spots (maxima) on the screen.
  </Step>
</Steps>
```

**`<Step>` Props:**

| Prop       | Type          | Description                    |
| ---------- | ------------- | ------------------------------ |
| `number`   | `number`      | The step number (shown in circle) |
| `title`    | `string`      | Step heading                   |
| `children` | MDX content   | Step body text                 |

---

#### `<Tabs>` + `<Tab>` — Tabbed Content

Show content in switchable tabs (e.g., different approaches or comparisons).

```mdx
<Tabs items={["Theory", "Experiment", "Results"]}>
  <Tab>
    Snell's law describes how light bends when passing between media:
    $n_1 \sin\theta_1 = n_2 \sin\theta_2$
  </Tab>
  <Tab>
    We used a semicircular glass block and a ray box to measure
    angles of incidence and refraction.
  </Tab>
  <Tab>
    Our measured refractive index of glass was **1.52 ± 0.03**,
    consistent with the accepted value of 1.50.
  </Tab>
</Tabs>
```

**`<Tabs>` Props:**

| Prop     | Type       | Description                           |
| -------- | ---------- | ------------------------------------- |
| `items`  | `string[]` | Array of tab labels                   |
| `children`| `<Tab>` elements | One `<Tab>` per item            |

---

#### `<Divider>` — Decorative Section Break

A gradient line with a center dot. Also triggered by `---` in Markdown.

```mdx
<Divider />
```

No props needed.

---

### Full Example Post

Here's a complete example combining multiple features:

```mdx
---
title: "Building a Simple Spectrometer"
excerpt: "Learn how to build a working spectrometer from household materials and understand the science behind it."
coverImage: "/blog/spectrometer-cover.jpg"
publishedAt: "2026-03-15T10:00:00+05:30"
category: "Tutorials"
tags:
  - spectrometer
  - DIY
  - optics
  - tutorial
featured: true
author:
  name: "Samyak Jain"
  role: "Head of Technology"
  image: "/team/samyak.png"
  github: "https://github.com/sammyyakk"
---

Ever wondered how scientists analyze the composition of distant stars?
The answer is **spectroscopy** — and you can build your own spectrometer
at home!

<Callout type="tip" title="What You'll Learn">
  By the end of this tutorial, you'll understand how diffraction
  gratings separate white light into its component wavelengths.
</Callout>

## Materials Needed

- An old CD or DVD (acts as a diffraction grating)
- A cardboard box (cereal box works great)
- A razor blade or craft knife
- Tape and scissors

<Callout type="warning" title="Safety First">
  Be careful when cutting with the razor blade.
  Ask for adult supervision if needed.
</Callout>

## Building Steps

<Steps>
  <Step number={1} title="Prepare the Box">
    Cut a narrow slit (about 1mm wide) on one end of the box using
    the razor blade. This is where light enters.
  </Step>
  <Step number={2} title="Mount the CD">
    Cut a viewing window on the other end and tape the CD fragment
    at a 60° angle inside the box, facing the slit.
  </Step>
  <Step number={3} title="Observe the Spectrum">
    Point the slit at a light source and look through the viewing window.
    You should see the light split into a rainbow of colors!
  </Step>
</Steps>

## How It Works

When white light passes through the slit and hits the CD's surface,
the tiny grooves act as a **diffraction grating**, separating the light
into its component wavelengths.

<StatGrid>
  <Stat value="400nm" label="Violet light" />
  <Stat value="550nm" label="Green light" />
  <Stat value="700nm" label="Red light" />
</StatGrid>

> "If you want to find the secrets of the universe,
> think in terms of energy, frequency and vibration." — Nikola Tesla

## What's Next?

Try observing different light sources — LEDs, fluorescent bulbs, sunlight.
Each produces a unique spectrum!

<LinkCard
  href="/blog/understanding-fiber-optics"
  title="Understanding Fiber Optics"
  description="Learn how fiber optics use total internal reflection"
/>

---

*Have questions? Reach out to us on Instagram or drop by the optics lab!*
```

---

### Post Visibility Controls

| Frontmatter Field | Effect                                                        |
| ----------------- | ------------------------------------------------------------- |
| `draft: true`     | Post is **completely hidden** — won't appear anywhere on site |
| `draft: false`    | Post is **live and public** (this is the default)             |
| `featured: true`  | Post appears in the **Featured section** on `/blog`           |
| `pinned: true`    | Post is **pinned to the top** of the blog listing             |

### How Reading Time Works

Reading time is **automatically calculated** at ~200 words per minute. If you want to override it (e.g., for image-heavy posts), set `readingTime: 8` in frontmatter.

### Table of Contents

The Table of Contents sidebar (visible on desktop at `xl:` breakpoint) is **automatically generated** from your `##` and `###` headings. Heading IDs are created via `rehype-slug`, so anchor links and TOC navigation work out of the box.

### Blog File Architecture

```
content/blog/
└── your-post-slug.mdx              ← Your blog post (filename = URL slug)

public/blog/
└── your-cover-image.jpg             ← Cover images go here

src/
├── components/blog/
│   ├── MDXComponents.tsx            ← All custom components + element overrides
│   ├── MDXClientComponents.tsx      ← Client-only interactive components (Tabs)
│   ├── BlogPostMDXContent.tsx       ← Server component that renders MDX
│   ├── BlogPostClient.tsx           ← Client component for post layout/UI
│   ├── BlogListClient.tsx           ← Client component for /blog listing page
│   └── Icons.tsx                    ← SVG icon components for categories
├── lib/blog/
│   ├── posts.ts                     ← File reading, parsing, caching, API functions
│   ├── types.ts                     ← BlogPost, BlogCategory, BlogAuthor types
│   └── mdx.ts                      ← MDX config, heading extraction for TOC
└── app/blog/
    ├── page.tsx                     ← /blog listing (server component)
    ├── [slug]/page.tsx              ← /blog/:slug post page (server component)
    └── embed/[slug]/page.tsx        ← Embeddable iframe version of posts
```

### Quick-Start Checklist

```
✅  Create file:           content/blog/my-post.mdx
✅  Add frontmatter:        title, excerpt, publishedAt, category, tags, author
✅  Write content:          Markdown + optional MDX components
✅  Add cover image:        public/blog/my-cover.jpg (optional)
✅  Preview locally:        npm run dev → http://localhost:3000/blog/my-post
✅  Commit & push:          git add . && git commit -m "feat: add blog post" && git push
```

---

## 📅 Event System — Complete Guide

The BVP Optica website features a comprehensive event showcase powered by **JSON data files**. Events are stored as individual JSON files — no database, no CMS. Just create a file, add images, and it's live.

### How It Works

```
data/events/
├── inauguration-of-bvp-osa-student-chapter.json   → /events/inauguration-of-bvp-osa-student-chapter
├── quantumspark-quantum-photonics-ideathon.json   → /events/quantumspark-quantum-photonics-ideathon
├── aries-observatory-visit-nainital.json           → /events/aries-observatory-visit-nainital
└── your-new-event.json                             → /events/your-new-event
```

Each `.json` file in `data/events/` automatically becomes an event page. The `slug` field in the JSON determines the URL.

---

### Creating a New Event

#### Step 1: Create the JSON file

Create a new `.json` file in `data/events/`. Use kebab-case for the filename:

```
data/events/my-awesome-event.json
```

#### Step 2: Fill in the event data

Here's the complete template with all fields:

```json
{
  "id": "my-awesome-event",
  "slug": "my-awesome-event",
  "title": "My Awesome Event",
  "subtitle": "A short tagline for the event (1-2 sentences)",
  "description": "Full description of the event. This appears on the event detail page. You can include multiple paragraphs and detailed information about what happened, objectives, outcomes, etc.",
  "category": "seminar",
  "date": "2026-03-15",
  "endDate": "2026-03-16",
  "time": "10:00 AM - 4:00 PM",
  "location": "Bharati Vidyapeeth's College of Engineering, New Delhi",
  "coverImage": "/events/covers/my-awesome-event-cover.jpg",
  "gallery": [
    "/events/galleries/my-awesome-event-1.jpg",
    "/events/galleries/my-awesome-event-2.jpg"
  ],
  "highlights": [
    "Key point or activity #1",
    "Key point or activity #2",
    "Key point or activity #3",
    "Notable achievement or outcome"
  ],
  "status": "completed",
  "featured": false,
  "registrationLink": null,
  "registrationOpen": false,
  "maxParticipants": null,
  "currentParticipants": 50,
  "organizers": [
    {
      "name": "BVP Optica Team",
      "role": "Event Organizers"
    }
  ],
  "tags": [
    "seminar",
    "optica",
    "bvp",
    "2025-26"
  ]
}
```

#### Field Reference

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | ✅ | Unique identifier (same as filename without .json) |
| `slug` | string | ✅ | URL path (use same value as id) |
| `title` | string | ✅ | Event name |
| `subtitle` | string | ✅ | Short tagline (shown on cards) |
| `description` | string | ✅ | Full description (shown on detail page) |
| `category` | string | ✅ | One of: `ideathon`, `seminar`, `quiz`, `debate`, `visit`, `competition` |
| `date` | string | ✅ | ISO date format: `YYYY-MM-DD` |
| `endDate` | string | ❌ | For multi-day events |
| `time` | string | ✅ | Human-readable time (e.g., "10:00 AM - 4:00 PM") |
| `location` | string | ✅ | Venue name or "Online" |
| `coverImage` | string | ❌ | Path to cover image (leave empty `""` for gradient fallback) |
| `gallery` | array | ❌ | Array of image paths for event gallery |
| `highlights` | array | ✅ | Key points/features (shown as bullet cards) |
| `status` | string | ✅ | One of: `upcoming`, `ongoing`, `completed` |
| `featured` | boolean | ✅ | Show in featured carousel (`true`/`false`) |
| `registrationLink` | string | ❌ | Registration URL (only for upcoming events) |
| `registrationOpen` | boolean | ❌ | Is registration currently open |
| `maxParticipants` | number | ❌ | Maximum capacity (if applicable) |
| `currentParticipants` | number | ❌ | Number of attendees |
| `organizers` | array | ❌ | Array of organizer objects |
| `tags` | array | ✅ | Searchable tags (include year like "2025-26") |

#### Allowed Categories

| Category | Use For | Gradient Colors |
|----------|---------|-----------------|
| `ideathon` | Innovation challenges, hackathons | Purple → Pink |
| `seminar` | Talks, webinars, workshops, lectures | Blue → Purple |
| `quiz` | Quiz competitions, trivia events | Pink → Orange |
| `debate` | Debate competitions, panel discussions | Orange → Yellow |
| `visit` | Industrial visits, lab tours, field trips | Green → Teal |
| `competition` | Robotics, coding, photography contests | Teal → Blue |

---

### Adding Event Images

#### Cover Images

1. Place the image in `public/events/covers/`
2. Name it: `{slug}-cover.{jpg|png|jpeg}`
3. Reference in JSON: `"/events/covers/my-event-cover.jpg"`

**Recommended:** 1200×630px, JPEG or PNG, under 500KB

#### Gallery Images

1. Place images in `public/events/galleries/`
2. Name them: `{slug}-1.jpg`, `{slug}-2.jpg`, etc.
3. Reference in JSON array:
   ```json
   "gallery": [
     "/events/galleries/my-event-1.jpg",
     "/events/galleries/my-event-2.jpg"
   ]
   ```

#### Events Without Images

If you don't have images for an event, leave `coverImage` as an empty string:
```json
"coverImage": ""
```

The website will display a gradient background based on the event category.

---

### Event Status Guidelines

| Status | When to Use | Registration |
|--------|-------------|--------------|
| `upcoming` | Event hasn't happened yet | Can have registration link |
| `ongoing` | Currently happening (multi-day) | Registration may be closed |
| `completed` | Event has finished | No registration (set to `null`) |

**Important:** For past events, always set:
```json
"status": "completed",
"registrationLink": null,
"registrationOpen": false
```

---

### Featured Events & Carousel

Events with `"featured": true` appear in the carousel on the Events page. Use this for:
- Upcoming major events you want to highlight
- Recent significant events

The carousel auto-advances every 5 seconds and pauses on hover.

---

### Event File Architecture

```
data/events/
└── your-event-slug.json             ← Event data file

public/events/
├── covers/                          ← Cover images
│   └── your-event-slug-cover.jpg
└── galleries/                       ← Gallery images
    ├── your-event-slug-1.jpg
    └── your-event-slug-2.jpg

src/
├── components/events/
│   ├── EventCards.tsx               ← Event grid with filtering
│   ├── EventCarousel.tsx            ← Featured events carousel
│   ├── EventStatusBadge.tsx         ← Status indicator (upcoming/ongoing/completed)
│   └── EventRegistrationButton.tsx  ← Registration CTA button
├── lib/events/
│   ├── events.ts                    ← Data loading & filtering functions
│   └── types.ts                     ← Event, EventCategory, EventStatus types
└── app/events/
    ├── page.tsx                     ← /events listing (server component)
    └── [slug]/
        ├── page.tsx                 ← /events/:slug detail page
        └── EventDetailClient.tsx    ← Event detail UI (client component)
```

---

### Quick-Start Checklist

```
✅  Create file:           data/events/my-event.json
✅  Add required fields:    id, slug, title, subtitle, description, category, date, time, location, highlights, status, featured, tags
✅  Add cover image:        public/events/covers/my-event-cover.jpg (optional)
✅  Set correct status:     "completed" for past events, "upcoming" for future
✅  Preview locally:        npm run dev → http://localhost:3000/events/my-event
✅  Commit & push:          git add . && git commit -m "feat: add event — Event Title" && git push
```

---

### Example: Adding a New Event

**1. Create the JSON file:**
```bash
touch data/events/optical-invasion-2026.json
```

**2. Add event data:**
```json
{
  "id": "optical-invasion-2026",
  "slug": "optical-invasion-2026",
  "title": "Optical Invasion 2026",
  "subtitle": "The annual flagship event of BVP Optica featuring workshops, competitions, and expert talks",
  "description": "Optical Invasion is BVP Optica's flagship annual event bringing together students, researchers, and industry experts. This year's edition featured hands-on workshops on photonics, a robotics competition, ideathon, quiz, and guest lectures from leading optical scientists.",
  "category": "competition",
  "date": "2026-04-15",
  "endDate": "2026-04-17",
  "time": "9:00 AM - 6:00 PM",
  "location": "BVCOE Campus, New Delhi",
  "coverImage": "/events/covers/optical-invasion-2026-cover.jpg",
  "gallery": [
    "/events/galleries/optical-invasion-2026-1.jpg",
    "/events/galleries/optical-invasion-2026-2.jpg"
  ],
  "highlights": [
    "3-day flagship event with 500+ participants",
    "Hands-on photonics workshop by industry experts",
    "Robotics and drone competitions",
    "Ideathon with cash prizes worth ₹50,000",
    "Guest lecture by IIT Delhi professor"
  ],
  "status": "upcoming",
  "featured": true,
  "registrationLink": "https://unstop.com/optical-invasion-2026",
  "registrationOpen": true,
  "maxParticipants": 500,
  "currentParticipants": 324,
  "organizers": [
    {
      "name": "BVP Optica",
      "role": "Lead Organizer"
    },
    {
      "name": "IEEE Student Branch",
      "role": "Co-Organizer"
    }
  ],
  "tags": [
    "optical-invasion",
    "flagship",
    "competition",
    "2025-26"
  ]
}
```

**3. Add cover image:**
```bash
cp my-image.jpg public/events/covers/optical-invasion-2026-cover.jpg
```

**4. Preview and commit:**
```bash
npm run dev
# Check http://localhost:3000/events/optical-invasion-2026
git add data/events/optical-invasion-2026.json public/events/covers/
git commit -m "feat: add Optical Invasion 2026 event"
git push
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
