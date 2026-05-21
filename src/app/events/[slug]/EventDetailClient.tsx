"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Event, categoryGradients } from "@/lib/events/types";
import EventStatusBadge from "@/components/events/EventStatusBadge";
import EventRegistrationButton from "@/components/events/EventRegistrationButton";
import { FixedParticleBackground } from "@/components/ui/FixedParticleBackground";
import { ArrowLeft, Calendar, MapPin, Users } from "lucide-react";

interface EventDetailClientProps {
  event: Event;
  relatedEvents: Event[];
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

export default function EventDetailClient({ event, relatedEvents }: EventDetailClientProps) {
  const eventDate = new Date(event.date);
  const isPastEvent = eventDate < new Date();

  return (
    <main className="min-h-screen bg-transparent text-white overflow-hidden">
      <FixedParticleBackground />

      <div className="relative z-10 pt-20 sm:pt-24 pb-12">
        {/* Hero Section */}
        <div className="relative h-[400px] sm:h-[500px] md:h-[600px] mb-8 sm:mb-12">
          {/* Background Image or Gradient Fallback */}
          <div className="absolute inset-0">
            {event.coverImage ? (
              <Image
                src={event.coverImage}
                alt={event.title}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
            ) : (
              <div
                className={`absolute inset-0 bg-gradient-to-br ${categoryGradients[event.category]} opacity-30`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="w-32 h-32 text-white/10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E1A2B] via-[#0E1A2B]/80 to-[#0E1A2B]/30" />
          </div>

          {/* Content */}
          <div className="relative h-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col justify-end pb-8 sm:pb-12">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <Link
                href="/events"
                className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-200 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Events</span>
              </Link>
            </motion.div>

            {/* Category & Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 mb-4"
            >
              <span
                className={`px-4 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r ${
                  categoryGradients[event.category]
                } text-white shadow-lg`}
              >
                {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
              </span>
              <EventStatusBadge status={event.status} />
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 bg-gradient-to-r ${
                categoryGradients[event.category]
              } bg-clip-text text-transparent max-w-4xl`}
            >
              {event.title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-gray-300 text-lg sm:text-xl mb-6 max-w-3xl"
            >
              {event.subtitle}
            </motion.p>

            {/* Quick Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 sm:gap-6 text-sm sm:text-base text-gray-300"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-400" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-purple-400" />
                <span>{event.location}</span>
              </div>
              {event.maxParticipants && (
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-400" />
                  <span>
                    {event.currentParticipants || 0} / {event.maxParticipants} participants
                  </span>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <AnimatedSection delay={0.2}>
                <div className="bg-gradient-to-br from-purple-900/20 via-black/40 to-purple-900/10 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-6 sm:p-8">
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                    About This Event
                  </h2>
                  <p className="text-gray-300 text-base sm:text-lg leading-relaxed whitespace-pre-line">
                    {event.description}
                  </p>
                </div>
              </AnimatedSection>

              {/* Highlights */}
              {event.highlights && event.highlights.length > 0 && (
                <AnimatedSection delay={0.3}>
                  <div className="bg-gradient-to-br from-purple-900/20 via-black/40 to-purple-900/10 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-6 sm:p-8">
                    <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                      Highlights
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {event.highlights.map((highlight, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                          className="flex items-start gap-3 p-4 rounded-lg bg-purple-900/20 border border-purple-500/10 hover:border-purple-400/30 transition-colors"
                        >
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 mt-2 flex-shrink-0" />
                          <p className="text-gray-300 text-sm sm:text-base">{highlight}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              )}

              {/* Organizers */}
              {event.organizers && event.organizers.length > 0 && (
                <AnimatedSection delay={0.4}>
                  <div className="bg-gradient-to-br from-purple-900/20 via-black/40 to-purple-900/10 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-6 sm:p-8">
                    <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                      Organized By
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {event.organizers.map((organizer, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-4 p-4 rounded-lg bg-purple-900/20 border border-purple-500/10"
                        >
                          {organizer.image && (
                            <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                              <Image
                                src={organizer.image}
                                alt={organizer.name}
                                fill
                                sizes="48px"
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-white">{organizer.name}</p>
                            <p className="text-sm text-gray-400">{organizer.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Registration Card */}
              {!isPastEvent && event.registrationLink && (
                <AnimatedSection delay={0.2}>
                  <div className="bg-gradient-to-br from-purple-900/30 via-black/40 to-pink-900/20 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-6 sticky top-24">
                    <h3 className="font-heading text-xl font-bold mb-4 text-white">
                      Register Now
                    </h3>
                    <EventRegistrationButton
                      registrationLink={event.registrationLink}
                      registrationOpen={event.registrationOpen}
                      maxParticipants={event.maxParticipants}
                      currentParticipants={event.currentParticipants}
                    />
                    <div className="mt-4 pt-4 border-t border-purple-500/20">
                      <p className="text-xs text-gray-400 text-center">
                        Secure your spot now. Limited seats available!
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              )}

              {/* Event Details Card */}
              <AnimatedSection delay={0.3}>
                <div className="bg-gradient-to-br from-purple-900/20 via-black/40 to-purple-900/10 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-6">
                  <h3 className="font-heading text-xl font-bold mb-4 text-white">
                    Event Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Date & Time</p>
                      <p className="text-white">{event.time}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Location</p>
                      <p className="text-white">{event.location}</p>
                    </div>
                    {event.tags && event.tags.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-400 mb-2">Tags</p>
                        <div className="flex flex-wrap gap-2">
                          {event.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 rounded-full text-xs bg-purple-900/30 border border-purple-500/20 text-purple-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>

          {/* Related Events */}
          {relatedEvents.length > 0 && (
            <AnimatedSection delay={0.5} className="mt-12 sm:mt-16">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                Related Events
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedEvents.map((relatedEvent, index) => (
                  <motion.div
                    key={relatedEvent.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <Link
                      href={`/events/${relatedEvent.slug}`}
                      className="block group h-full"
                    >
                      <div className="h-full bg-gradient-to-br from-purple-900/30 via-black/40 to-purple-900/20 backdrop-blur-sm rounded-xl border border-purple-500/20 overflow-hidden hover:border-purple-400/40 transition-all duration-300">
                        <div className="relative h-40 overflow-hidden">
                          {relatedEvent.coverImage ? (
                            <Image
                              src={relatedEvent.coverImage}
                              alt={relatedEvent.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                            />
                          ) : (
                            <div
                              className={`absolute inset-0 bg-gradient-to-br ${categoryGradients[relatedEvent.category]} opacity-30`}
                            >
                              <div className="absolute inset-0 flex items-center justify-center">
                                <svg
                                  className="w-12 h-12 text-white/20"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  />
                                </svg>
                              </div>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                          <div className="absolute top-3 left-3">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${
                                categoryGradients[relatedEvent.category]
                              } text-white shadow-lg`}
                            >
                              {relatedEvent.category.charAt(0).toUpperCase() +
                                relatedEvent.category.slice(1)}
                            </span>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3
                            className={`font-heading text-base font-bold mb-2 bg-gradient-to-r ${
                              categoryGradients[relatedEvent.category]
                            } bg-clip-text text-transparent line-clamp-2`}
                          >
                            {relatedEvent.title}
                          </h3>
                          <p className="text-gray-400 text-sm line-clamp-2">
                            {relatedEvent.subtitle}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          )}
        </div>
      </div>
    </main>
  );
}
