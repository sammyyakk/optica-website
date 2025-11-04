"use client";

import { RevealElement } from "@/lib/animations/ScrollAnimations";
import EventCards from "@/components/events/EventCards";

export default function EventsPage() {
  return (
    <main
      id="main-content"
      className="min-h-screen bg-optica-black transition-colors duration-300 pt-24 pb-20"
    >
      <div className="container mx-auto px-4">
        <RevealElement direction="up">
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-center mb-6 text-quantum-violet">
            Our Events
          </h1>
        </RevealElement>

        <RevealElement direction="up" delay={0.2}>
          <p className="font-body text-lg text-text-secondary max-w-3xl mx-auto text-center mb-16 leading-relaxed">
            "Perfect execution? Check. Awesome time? Double check."
            <br />
            Explore our diverse range of events from ideathons to research
            visits.
          </p>
        </RevealElement>

        <RevealElement direction="up" delay={0.4}>
          <EventCards />
        </RevealElement>
      </div>
    </main>
  );
}
