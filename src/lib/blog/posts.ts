import type { BlogPost } from "./types";

// ============================================================
// 📝 BLOG POSTS - Add new posts here!
// ============================================================
// To add a new blog post:
// 1. Copy a post object below
// 2. Give it a unique "slug" (URL-friendly, lowercase, hyphens)
// 3. Fill in the fields
// 4. Content supports HTML tags for rich formatting
// 5. Set draft: true to hide from public view
// ============================================================

export const blogPosts: BlogPost[] = [
  {
    slug: "welcome-to-bvp-optica-blog",
    title: "Welcome to the BVP Optica Blog!",
    excerpt:
      "We're excited to launch our official blog — your new hub for optics, photonics, event recaps, tutorials, and everything happening at BVP Optica.",
    content: `
      <p>We're thrilled to announce the launch of the official <strong>BVP Optica Blog</strong>! This space is designed to be your go-to resource for everything related to optics, photonics, and our vibrant student community.</p>

      <h2>What to Expect</h2>
      <p>Our blog will feature a variety of content including:</p>
      <ul>
        <li><strong>Event Recaps</strong> — Detailed coverage of our workshops, seminars, and competitions</li>
        <li><strong>Tutorials</strong> — Step-by-step guides on optics concepts, lab experiments, and more</li>
        <li><strong>Research Highlights</strong> — Showcasing groundbreaking work by our members</li>
        <li><strong>Industry Insights</strong> — Trends and innovations in the world of optics & photonics</li>
        <li><strong>Student Stories</strong> — Experiences and journeys of our community members</li>
      </ul>

      <h2>Join the Conversation</h2>
      <p>We believe knowledge grows when shared. Whether you're a student, researcher, or enthusiast, this blog is for you. Stay tuned for regular updates, and don't hesitate to reach out if you'd like to contribute!</p>

      <blockquote>
        "The important thing in science is not so much to obtain new facts as to discover new ways of thinking about them." — William Lawrence Bragg
      </blockquote>

      <h2>Stay Connected</h2>
      <p>Follow us on our social media channels and bookmark this page. We have exciting content lined up that you won't want to miss!</p>
    `,
    coverImage: "/blog/welcome-cover.jpg",
    author: {
      name: "BVP Optica",
      role: "Editorial Team",
      image: "/glow_accent_logo.png",
    },
    publishedAt: "2026-02-06T10:00:00+05:30",
    category: "Announcements",
    tags: ["welcome", "announcement", "blog launch"],
    featured: true,
    pinned: true,
  },
  {
    slug: "understanding-fiber-optics",
    title: "Understanding Fiber Optics: A Beginner's Guide",
    excerpt:
      "Dive into the fundamentals of fiber optics — learn how light travels through glass and revolutionizes modern communication.",
    content: `
      <p>Fiber optics is one of the most transformative technologies of the modern era. From high-speed internet to medical imaging, optical fibers have changed the way we live and communicate.</p>

      <h2>What Are Optical Fibers?</h2>
      <p>An optical fiber is a thin, flexible strand of glass or plastic that transmits data as pulses of light. These fibers are incredibly thin — about the diameter of a human hair — yet capable of carrying vast amounts of information over long distances with minimal loss.</p>

      <h2>How Do They Work?</h2>
      <p>The principle behind fiber optics is <strong>total internal reflection (TIR)</strong>. Light enters the fiber core (which has a higher refractive index) and bounces along the fiber, guided by the cladding (with a lower refractive index). This ensures the light signal stays within the fiber as it travels.</p>

      <h3>Key Components</h3>
      <ul>
        <li><strong>Core</strong> — The central part where light travels</li>
        <li><strong>Cladding</strong> — Surrounds the core and reflects light back inward</li>
        <li><strong>Buffer Coating</strong> — Protective layer against moisture and damage</li>
      </ul>

      <h2>Types of Optical Fibers</h2>
      <p>There are two main types:</p>
      <ol>
        <li><strong>Single-mode fiber (SMF)</strong> — Small core (~9µm), one light path, used for long-distance telecom</li>
        <li><strong>Multi-mode fiber (MMF)</strong> — Larger core (~50-62.5µm), multiple light paths, used for short distances</li>
      </ol>

      <h2>Applications</h2>
      <p>Fiber optics are used in telecommunications, medical instruments (endoscopes), military and defense, industrial sensors, and even decorative lighting. The technology continues to evolve with developments in photonic crystal fibers and hollow-core fibers.</p>

      <blockquote>
        "Fiber optics is the nervous system of the information age."
      </blockquote>

      <h2>What's Next?</h2>
      <p>In our next article, we'll explore how fiber optic sensors work and their applications in structural health monitoring. Stay tuned!</p>
    `,
    coverImage: "/blog/fiber-optics-cover.jpg",
    author: {
      name: "Samyak Jain",
      role: "Head of Technology",
      image: "/team/samyak.png",
      linkedin: "https://www.linkedin.com/in/sammyyakk/",
      github: "https://github.com/sammyyakk",
    },
    publishedAt: "2026-02-06T12:00:00+05:30",
    category: "Optics & Photonics",
    tags: ["fiber optics", "optics basics", "photonics", "tutorial"],
    featured: true,
  },
  {
    slug: "ai-conclave-hackathon-2026",
    title: "AI Conclave 2026: Our First-Ever Hackathon",
    excerpt:
      "BVP Optica is hosting AI Conclave — a national-level AI/ML hackathon bringing together India's brightest student minds to solve real-world problems.",
    content: `
      <p>We are beyond excited to announce <strong>AI Conclave 2026</strong> — BVP Optica's first-ever national-level hackathon focused on Artificial Intelligence and Machine Learning!</p>

      <h2>Event Overview</h2>
      <p>AI Conclave brings together student innovators from across India for an intensive hackathon experience. Participants will tackle real-world problem statements spanning healthcare, education, finance, sustainability, and smart city infrastructure.</p>

      <h2>Why AI Conclave?</h2>
      <p>As the intersection of optics and artificial intelligence continues to grow — from computer vision to AI-powered optical systems — we wanted to create a platform where students can explore these cutting-edge technologies hands-on.</p>

      <h2>Key Details</h2>
      <ul>
        <li><strong>Date</strong> — February 15, 2026</li>
        <li><strong>Mode</strong> — Hybrid (Online + On-campus)</li>
        <li><strong>Team Size</strong> — 2-4 members</li>
        <li><strong>Registration Deadline</strong> — February 14, 2026</li>
        <li><strong>Prize Pool</strong> — ₹15,000+</li>
      </ul>

      <h2>Problem Statements</h2>
      <p>We've curated problem statements across multiple domains to ensure there's something for everyone, whether you're into NLP, computer vision, data science, or generative AI.</p>

      <h2>How to Register</h2>
      <p>Head over to our <a href="/events/ai-conclave">AI Conclave page</a> for full details and the registration form. Don't miss out — spots are filling fast!</p>
    `,
    coverImage: "/blog/ai-conclave-cover.jpg",
    author: {
      name: "Akshat Arora",
      role: "President",
      image: "/team/akshat.png",
      linkedin: "https://www.linkedin.com/in/akshat-a-72a772324/",
    },
    publishedAt: "2026-02-05T09:00:00+05:30",
    category: "Events & Recaps",
    tags: ["hackathon", "AI", "machine learning", "event"],
    featured: true,
  },
];

// ============================================================
// 📌 Helper Functions — DO NOT MODIFY BELOW
// ============================================================

function calculateReadingTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, "");
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function getAllPosts(): BlogPost[] {
  return blogPosts
    .filter((p) => !p.draft)
    .map((p) => ({
      ...p,
      readingTime: p.readingTime || calculateReadingTime(p.content),
    }))
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const post = blogPosts.find((p) => p.slug === slug && !p.draft);
  if (!post) return undefined;
  return {
    ...post,
    readingTime: post.readingTime || calculateReadingTime(post.content),
  };
}

export function getFeaturedPosts(): BlogPost[] {
  return getAllPosts().filter((p) => p.featured);
}

export function getPinnedPosts(): BlogPost[] {
  return getAllPosts().filter((p) => p.pinned);
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter((p) => p.category === category);
}

export function getPostsByTag(tag: string): BlogPost[] {
  return getAllPosts().filter((p) =>
    p.tags.some((t) => t.toLowerCase() === tag.toLowerCase()),
  );
}

export function searchPosts(query: string): BlogPost[] {
  const q = query.toLowerCase();
  return getAllPosts().filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)) ||
      p.category.toLowerCase().includes(q) ||
      p.author.name.toLowerCase().includes(q),
  );
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  getAllPosts().forEach((p) => p.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const post = getPostBySlug(slug);
  if (!post) return [];
  const scored = getAllPosts()
    .filter((p) => p.slug !== slug)
    .map((p) => {
      let score = 0;
      if (p.category === post.category) score += 3;
      p.tags.forEach((t) => {
        if (post.tags.includes(t)) score += 1;
      });
      return { post: p, score };
    })
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.post);
}
