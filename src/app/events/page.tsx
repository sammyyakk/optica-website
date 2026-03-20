import { getAllEvents, getUpcomingEvents, getFeaturedEvents } from "@/lib/events/events";
import EventsPageClient from "./EventsPageClient";

export const metadata = {
  title: "Events | BVP Optica",
  description: "Explore our diverse range of events from ideathons and seminars to research visits and competitions.",
};

export default async function EventsPage() {
  const [allEvents, upcomingEvents, featuredEvents] = await Promise.all([
    getAllEvents(),
    getUpcomingEvents(),
    getFeaturedEvents(),
  ]);

  return <EventsPageClient allEvents={allEvents} upcomingEvents={upcomingEvents} featuredEvents={featuredEvents} />;
}
