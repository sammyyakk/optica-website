/**
 * Event data types for BVP Optica events
 */

export type EventCategory = "ideathon" | "seminar" | "quiz" | "debate" | "visit" | "competition" | "exhibition";
export type EventStatus = "upcoming" | "ongoing" | "completed";

export interface EventOrganizer {
  name: string;
  role: string;
  image?: string;
}

export interface Event {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: EventCategory;
  date: string; // ISO format
  endDate?: string; // ISO format, for multi-day events
  time: string; // Human-readable time (e.g., "10:00 AM - 12:00 PM")
  location: string; // Venue or platform
  coverImage: string; // Path to cover image
  gallery?: string[]; // Optional array of gallery images
  highlights: string[]; // Key points or features
  status: EventStatus;
  featured: boolean; // Show in featured carousel
  registrationLink?: string; // RSVP or registration URL
  registrationOpen?: boolean; // Is registration currently open
  maxParticipants?: number;
  currentParticipants?: number;
  organizers?: EventOrganizer[];
  tags: string[]; // Searchable tags
}

/**
 * Category to gradient color mapping
 */
export const categoryGradients: Record<EventCategory, string> = {
  ideathon: "from-purple-400 to-pink-400",
  seminar: "from-blue-400 to-purple-400",
  quiz: "from-pink-400 to-orange-400",
  debate: "from-orange-400 to-yellow-400",
  visit: "from-green-400 to-teal-400",
  competition: "from-teal-400 to-blue-400",
  exhibition: "from-cyan-400 to-purple-400",
};

/**
 * Status to color mapping
 */
export const statusColors: Record<EventStatus, string> = {
  upcoming: "bg-green-500/20 text-green-300 border-green-500/30",
  ongoing: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  completed: "bg-gray-500/20 text-gray-300 border-gray-500/30",
};
