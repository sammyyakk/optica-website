"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import EventCards from "@/components/events/EventCards";

function AnimatedSection({ 
  children, 
  className = "",
  delay = 0 
}: { 
  children: React.ReactNode; 
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-[#0E1A2B] pt-20 sm:pt-24 pb-16 sm:pb-20 overflow-hidden">
      {/* Background effects - smaller on mobile */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/10 rounded-full blur-[80px] sm:blur-[128px]" />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-pink-500/10 rounded-full blur-[80px] sm:blur-[128px]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-4 sm:mb-6">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-300 via-pink-300 to-purple-400 bg-clip-text text-transparent">
            Our Events
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={0.15} className="text-center mb-8 sm:mb-12">
          <p className="text-purple-200/80 italic text-base sm:text-lg mb-2">
            &ldquo;Perfect execution? Check. Awesome time? Double check.&rdquo;
          </p>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto px-2">
            Explore our diverse range of events from ideathons to research visits.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <EventCards />
        </AnimatedSection>
      </div>
    </main>
  );
}
