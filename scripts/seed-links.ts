import { getSql } from "../src/lib/db";
import { ensureLinksTable } from "../src/lib/links/db";

const seed = [
  {
    slug: "lazer-maze",
    label: "Lazer Maze Registration",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSd65N3rEaPaZKJas9eW_ezDgEUlOzgRiENDufrnFMhoT_IviQ/viewform?usp=sharing&ouid=111037891284471367457",
    description: "Join the fun!",
    icon: "google-forms",
    featured: true,
    hidden: false,
  },
  {
    slug: "support-group",
    label: "Support Group",
    url: "https://chat.whatsapp.com/Edfa3llf0vP1NaFQdKRsrr",
    description: "Join the WhatsApp group",
    icon: "whatsapp",
    featured: true,
    hidden: false,
  },
  {
    slug: "recruit-form",
    label: "Registration Form",
    url: "https://docs.google.com/forms/d/e/1FAIpQLScopA6u4GDd47GlrxpV23GnJG_TyR6i_1YNSv4wWxelPb3KPw/viewform?usp=publish-editor",
    description: "Fill out the form",
    icon: "google-forms",
    featured: true,
    hidden: false,
  },
  {
    slug: "website",
    label: "Official Website",
    url: "https://www.bvpoptica.com",
    description: "Explore everything BVP Optica",
    icon: "globe",
    featured: false,
    hidden: false,
  },
  {
    slug: "instagram",
    label: "Instagram",
    url: "https://www.instagram.com/bvpoptica",
    description: "Photos, reels & event highlights",
    icon: "instagram",
    featured: false,
    hidden: false,
  },
  {
    slug: "linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/company/bvp-optica/",
    description: "Follow our journey & opportunities",
    icon: "linkedin",
    featured: false,
    hidden: false,
  },
  {
    slug: "twitter",
    label: "Twitter / X",
    url: "https://twitter.com/bvpoptica",
    description: "Updates & announcements",
    icon: "x",
    featured: false,
    hidden: false,
  },
  {
    slug: "email",
    label: "Email Us",
    url: "mailto:bvpoptica@gmail.com",
    description: "bvpoptica@gmail.com",
    icon: "mail",
    featured: false,
    hidden: false,
  },
  {
    slug: "continuation-form",
    label: "Continuation Form",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSdvd8cgANpHcN5NO_t7EkmrejkuorWY2i1y3RU7T8PHcDrXzg/viewform?usp=publish-editor",
    description: "Fill out the form",
    icon: "google-forms",
    featured: false,
    hidden: true,
  },
  {
    slug: "exe-group",
    label: "Executive Group 26",
    url: "https://chat.whatsapp.com/KnsdZEtgSTd6YOFaFIdRYj",
    description: "Join the WhatsApp group",
    icon: "whatsapp",
    featured: false,
    hidden: true,
  },
];

async function main() {
  await ensureLinksTable();
  const sql = getSql();

  const existing = await sql`SELECT COUNT(*)::int AS count FROM links`;
  if (existing[0].count > 0) {
    console.log(`links table already has ${existing[0].count} rows — skipping seed.`);
    return;
  }

  for (let i = 0; i < seed.length; i++) {
    const link = seed[i];
    await sql`
      INSERT INTO links (slug, label, url, description, icon, featured, hidden, sort_order)
      VALUES (${link.slug}, ${link.label}, ${link.url}, ${link.description}, ${link.icon}, ${link.featured}, ${link.hidden}, ${i})
    `;
  }
  console.log(`Seeded ${seed.length} links.`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
