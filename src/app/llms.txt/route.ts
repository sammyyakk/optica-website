import { getAllEvents, getUpcomingEvents, getFeaturedEvents } from "@/lib/events/events";
import { getAllPosts } from "@/lib/blog/posts";
import { links as shortLinks } from "@/lib/links/links";
import { getBaseUrl } from "@/lib/utils";

export const revalidate = 3600;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export async function GET() {
  const siteUrl = getBaseUrl();
  const [allEvents, upcomingEvents, featuredEvents, posts] = await Promise.all([
    getAllEvents(),
    getUpcomingEvents(),
    getFeaturedEvents(),
    Promise.resolve(getAllPosts()),
  ]);

  // Upcoming events take priority; fill remaining slots with featured past
  // events so the section isn't empty during quiet periods between events.
  const upcomingSlugs = new Set(upcomingEvents.map((e) => e.slug));
  const highlightEvents = [
    ...upcomingEvents,
    ...featuredEvents.filter((e) => !upcomingSlugs.has(e.slug)),
  ].slice(0, 8);

  const recentPosts = posts.slice(0, 8);

  const socialBySlug = Object.fromEntries(shortLinks.map((link) => [link.slug, link]));

  const lines: string[] = [];

  lines.push("# BVP Optica");
  lines.push("");
  lines.push(
    "> Student tech chapter at Bharati Vidyapeeth's College of Engineering (BVCOE), New Delhi, and Optica's (formerly OSA — the Optical Society of America) chapter on campus. Builds and innovates across AI, machine learning, MLOps, cybersecurity, robotics, blockchain, cloud computing, AR/VR, IoT, and optics through workshops, seminars, research, ideathons, and community events, as part of Optica's global network of student chapters.",
  );
  lines.push("");
  lines.push(
    "BVP Optica is a non-profit, student-run technical society. This file is provided for LLMs and AI agents to quickly understand the site's structure and content — see the linked pages for full detail.",
  );
  lines.push("");

  lines.push("## Site");
  lines.push(`- [Home](${siteUrl}/): Landing page — overview of the chapter, highlights, and calls to action.`);
  lines.push(`- [About](${siteUrl}/about): The chapter's mission, activities, and what BVP Optica does.`);
  lines.push(`- [Events](${siteUrl}/events): Ideathons, seminars, quizzes, debates, visits, competitions, and exhibitions — ${allEvents.length} events listed, past and upcoming.`);
  lines.push(`- [Team](${siteUrl}/team): Current student leadership and core team members.`);
  lines.push(`- [OptiArchitects](${siteUrl}/optiarchitects): The developers and designers who built and maintain this website.`);
  lines.push(`- [Blog](${siteUrl}/blog): Articles, tutorials, and event recaps — ${posts.length} posts published.`);
  lines.push(`- [Links](${siteUrl}/links): All BVP Optica links (socials, forms, groups) in one place.`);
  lines.push("");

  if (highlightEvents.length > 0) {
    lines.push("## Upcoming & Featured Events");
    for (const event of highlightEvents) {
      const when = event.status === "upcoming" ? formatDate(event.date) : `${formatDate(event.date)}, past`;
      lines.push(`- [${event.title}](${siteUrl}/events/${event.slug}): ${event.subtitle} (${when})`);
    }
    lines.push(`- See [/events](${siteUrl}/events) for the full list.`);
    lines.push("");
  }

  if (recentPosts.length > 0) {
    lines.push("## Recent Blog Posts");
    for (const post of recentPosts) {
      lines.push(`- [${post.title}](${siteUrl}/blog/${post.slug}): ${post.excerpt}`);
    }
    if (posts.length > recentPosts.length) {
      lines.push(`- See [/blog](${siteUrl}/blog) for all posts.`);
    }
    lines.push("");
  }

  lines.push("## Contact & Social");
  lines.push("- Email: bvpoptica@gmail.com");
  if (socialBySlug.instagram) lines.push(`- Instagram: ${socialBySlug.instagram.url}`);
  if (socialBySlug.linkedin) lines.push(`- LinkedIn: ${socialBySlug.linkedin.url}`);
  if (socialBySlug.twitter) lines.push(`- Twitter / X: ${socialBySlug.twitter.url}`);
  if (socialBySlug["support-group"]) {
    lines.push(`- WhatsApp support group: ${socialBySlug["support-group"].url}`);
  }
  lines.push(`- Address: A-4, Paschim Vihar, New Delhi, 110063, India`);
  lines.push("");

  lines.push("## Optional");
  lines.push(`- [Sitemap](${siteUrl}/sitemap.xml): Full machine-readable list of indexed URLs.`);
  lines.push(`- [Optica (parent organization)](https://www.optica.org): The global professional society this chapter belongs to.`);

  const body = lines.join("\n") + "\n";

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
