import { Event } from "./types";
import { promises as fs } from "fs";
import path from "path";

// Cache for event data
let _cachedEvents: Event[] | null = null;

/**
 * Get all events from JSON files
 */
export async function getAllEvents(): Promise<Event[]> {
  // Return cached events if available (except in development for hot reloading)
  if (_cachedEvents && process.env.NODE_ENV === "production") {
    return _cachedEvents;
  }

  const eventsDirectory = path.join(process.cwd(), "data/events");
  
  try {
    const filenames = await fs.readdir(eventsDirectory);
    const jsonFiles = filenames.filter((name) => name.endsWith(".json"));

    const events = await Promise.all(
      jsonFiles.map(async (filename) => {
        const filePath = path.join(eventsDirectory, filename);
        const fileContents = await fs.readFile(filePath, "utf8");
        const event: Event = JSON.parse(fileContents);
        return event;
      })
    );

    // Sort by date (most recent first)
    events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    _cachedEvents = events;
    return events;
  } catch (error) {
    console.error("Error loading events:", error);
    return [];
  }
}

/**
 * Get a single event by slug
 */
export async function getEventBySlug(slug: string): Promise<Event | null> {
  const events = await getAllEvents();
  return events.find((event) => event.slug === slug) || null;
}

/**
 * Get upcoming events (status=upcoming or date in future)
 */
export async function getUpcomingEvents(): Promise<Event[]> {
  const events = await getAllEvents();
  const now = new Date();
  
  return events.filter((event) => {
    const eventDate = new Date(event.date);
    return event.status === "upcoming" || (event.status !== "completed" && eventDate > now);
  });
}

/**
 * Get past/completed events
 */
export async function getPastEvents(): Promise<Event[]> {
  const events = await getAllEvents();
  const now = new Date();
  
  return events.filter((event) => {
    const eventDate = new Date(event.date);
    return event.status === "completed" || eventDate < now;
  });
}

/**
 * Get featured events (for carousel)
 */
export async function getFeaturedEvents(): Promise<Event[]> {
  const events = await getAllEvents();
  return events.filter((event) => event.featured === true);
}

/**
 * Get events by category
 */
export async function getEventsByCategory(category: string): Promise<Event[]> {
  const events = await getAllEvents();
  return events.filter((event) => event.category === category);
}

/**
 * Search events by query (searches title, description, and tags)
 */
export async function searchEvents(query: string): Promise<Event[]> {
  const events = await getAllEvents();
  const lowerQuery = query.toLowerCase();

  return events.filter((event) => {
    const titleMatch = event.title.toLowerCase().includes(lowerQuery);
    const descriptionMatch = event.description.toLowerCase().includes(lowerQuery);
    const tagsMatch = event.tags.some((tag) => tag.toLowerCase().includes(lowerQuery));
    const categoryMatch = event.category.toLowerCase().includes(lowerQuery);

    return titleMatch || descriptionMatch || tagsMatch || categoryMatch;
  });
}

/**
 * Get related events based on category and tags
 */
export async function getRelatedEvents(slug: string, limit: number = 3): Promise<Event[]> {
  const events = await getAllEvents();
  const currentEvent = await getEventBySlug(slug);

  if (!currentEvent) {
    return [];
  }

  // Score events based on similarity
  const scoredEvents = events
    .filter((event) => event.slug !== slug) // Exclude current event
    .map((event) => {
      let score = 0;

      // Same category gets high score
      if (event.category === currentEvent.category) {
        score += 10;
      }

      // Shared tags increase score
      const sharedTags = event.tags.filter((tag) =>
        currentEvent.tags.includes(tag)
      );
      score += sharedTags.length * 2;

      // Same status gets bonus
      if (event.status === currentEvent.status) {
        score += 1;
      }

      return { event, score };
    })
    .filter((item) => item.score > 0) // Only include events with some similarity
    .sort((a, b) => b.score - a.score) // Sort by score
    .slice(0, limit) // Limit results
    .map((item) => item.event);

  return scoredEvents;
}

/**
 * Get all unique tags from all events
 */
export async function getAllTags(): Promise<string[]> {
  const events = await getAllEvents();
  const tagsSet = new Set<string>();

  events.forEach((event) => {
    event.tags.forEach((tag) => tagsSet.add(tag));
  });

  return Array.from(tagsSet).sort();
}

/**
 * Get events by tag
 */
export async function getEventsByTag(tag: string): Promise<Event[]> {
  const events = await getAllEvents();
  return events.filter((event) =>
    event.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

/**
 * Clear cache (useful for development)
 */
export function clearEventsCache(): void {
  _cachedEvents = null;
}
