"use client";

import { motion } from "motion/react";
import { Event } from "@/lib/events/types";
import EventCards from "@/components/events/EventCards";
import EventCarousel from "@/components/events/EventCarousel";
import { FixedParticleBackground } from "@/components/ui/FixedParticleBackground";
import { FooterSection } from "@/components/home/FooterSection";

interface EventsPageClientProps {
  allEvents: Event[];
  upcomingEvents: Event[];
  featuredEvents: Event[];
}

function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function EventsPageClient({
  allEvents,
  upcomingEvents,
  featuredEvents,
}: EventsPageClientProps) {
  // Fallback to latest events if no featured upcoming events exist so the carousel is always visible
  let carouselEvents = featuredEvents.filter((event) =>
    upcomingEvents.some((upcoming) => upcoming.id === event.id)
  );

  if (carouselEvents.length === 0) {
    carouselEvents = featuredEvents.length > 0 ? featuredEvents : allEvents.slice(0, 5);
  }

  return (
    <main className="min-h-screen bg-transparent text-white overflow-hidden">
      {/* Fixed particle background */}
      <FixedParticleBackground />

      <div className="relative z-10 pt-20 sm:pt-24 pb-8 sm:pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          {/* Header */}
          <AnimatedSection className="text-center mb-4 sm:mb-6">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-300 via-pink-300 to-purple-400 bg-clip-text text-transparent">
              Our Events
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.15} className="text-center mb-8 sm:mb-12">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-gray-400 text-sm sm:text-base">
              <p className="max-w-2xl mx-auto px-2">
                Explore our diverse range of events from ideathons to research
                visits.
              </p>
              <span className="px-3 py-1 bg-purple-900/30 border border-purple-500/20 rounded-full text-sm font-semibold">
                {allEvents.length} Events
              </span>
            </div>
          </AnimatedSection>

          {/* Featured Upcoming Events Carousel */}
          {carouselEvents.length > 0 && (
            <AnimatedSection delay={0.25} className="mb-12 sm:mb-16">
              <div className="mb-6">
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-center bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                  Featured Upcoming Events
                </h2>
              </div>
              <EventCarousel events={carouselEvents} autoAdvanceInterval={5000} />
            </AnimatedSection>
          )}

          {/* All Events Grid */}
          <AnimatedSection delay={0.3}>
            <div className="mb-6">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-center bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                All Events
              </h2>
              <p className="text-center text-gray-400 text-sm mt-2">
                Browse all our past and upcoming events
              </p>
            </div>
            <EventCards events={allEvents} />
          </AnimatedSection>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <FooterSection />
      </div>
    </main>
  );
}
