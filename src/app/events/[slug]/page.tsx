import { notFound } from "next/navigation";
import { getAllEvents, getEventBySlug, getRelatedEvents } from "@/lib/events/events";
import EventDetailClient from "./EventDetailClient";
import type { Metadata } from "next";

interface EventDetailPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all events
export async function generateStaticParams() {
  const events = await getAllEvents();
  return events.map((event) => ({
    slug: event.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: EventDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return {
      title: "Event Not Found | BVP Optica",
    };
  }

  return {
    title: `${event.title} | BVP Optica Events`,
    description: event.description,
    openGraph: {
      title: event.title,
      description: event.subtitle,
      images: [event.coverImage],
    },
  };
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const relatedEvents = await getRelatedEvents(slug, 3);

  return <EventDetailClient event={event} relatedEvents={relatedEvents} />;
}
