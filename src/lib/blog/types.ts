export interface BlogAuthor {
  name: string;
  role: string;
  image?: string;
  linkedin?: string;
  instagram?: string;
  github?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Raw markdown/MDX content (serialized to MDX at page level)
  coverImage?: string;
  author: BlogAuthor;
  publishedAt: string; // ISO date string
  updatedAt?: string;
  category: BlogCategory;
  tags: string[];
  readingTime?: number; // in minutes (auto-calculated if not set)
  featured?: boolean;
  pinned?: boolean;
  draft?: boolean;
}

export type BlogCategory =
  | "Optics & Photonics"
  | "Events & Recaps"
  | "Tutorials"
  | "Research"
  | "Announcements"
  | "Student Life"
  | "Industry Insights"
  | "General";

export const BLOG_CATEGORIES: BlogCategory[] = [
  "Optics & Photonics",
  "Events & Recaps",
  "Tutorials",
  "Research",
  "Announcements",
  "Student Life",
  "Industry Insights",
  "General",
];

export const CATEGORY_COLORS: Record<BlogCategory, string> = {
  "Optics & Photonics": "from-purple-400 to-violet-400",
  "Events & Recaps": "from-pink-400 to-rose-400",
  Tutorials: "from-blue-400 to-cyan-400",
  Research: "from-green-400 to-emerald-400",
  Announcements: "from-amber-400 to-orange-400",
  "Student Life": "from-rose-400 to-pink-400",
  "Industry Insights": "from-teal-400 to-cyan-400",
  General: "from-gray-400 to-slate-400",
};

// Category icons are React components — import from @/components/blog/Icons
