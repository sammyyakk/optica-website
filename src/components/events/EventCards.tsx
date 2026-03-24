"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Event, categoryGradients } from "@/lib/events/types";
import EventStatusBadge from "./EventStatusBadge";

const categories = [
  { value: "all", label: "All Events" },
  { value: "ideathon", label: "Ideathons" },
  { value: "seminar", label: "Seminars" },
  { value: "quiz", label: "Quizzes" },
  { value: "debate", label: "Debates" },
  { value: "visit", label: "Visits" },
  { value: "competition", label: "Competitions" },
  { value: "exhibition", label: "Exhibitions" },
];

interface EventCardsProps {
  events: Event[];
}

export default function EventCards({ events }: EventCardsProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredEvents =
    selectedCategory === "all"
      ? events
      : events.filter((event) => event.category === selectedCategory);

  return (
    <div className="w-full">
      {/* Filter Buttons - scrollable on mobile */}
      <div className="flex flex-wrap gap-2 sm:gap-2 justify-center mb-8 sm:mb-10 px-1">
        {categories.map((category) => (
          <motion.button
            key={category.value}
            onClick={() => setSelectedCategory(category.value)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
              selectedCategory === category.value
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30"
                : "bg-purple-900/30 text-gray-300 border border-purple-500/20 hover:border-purple-400/40 hover:text-white"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.label}
          </motion.button>
        ))}
      </div>

      {/* Event Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
      >
        <AnimatePresence mode="popLayout">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="group"
            >
              <Link
                href={`/events/${event.slug}`}
                className="block h-full"
              >
                <div className="relative h-full bg-gradient-to-br from-purple-900/30 via-black/40 to-purple-900/20 backdrop-blur-sm rounded-xl border border-purple-500/20 overflow-hidden hover:border-purple-400/40 transition-all duration-300">
                  {/* Subtle glow on hover */}
                  <div className="absolute -inset-1 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 rounded-xl blur-lg transition-all duration-300 -z-10" />

                  {/* Event Image or Gradient Fallback */}
                  <div className="relative h-40 sm:h-44 overflow-hidden">
                    {event.coverImage ? (
                      <Image
                        src={event.coverImage}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        priority={index === 0}
                      />
                    ) : (
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${categoryGradients[event.category]} opacity-30`}
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg
                            className="w-16 h-16 text-white/20"
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

                    {/* Status and Category Badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      <EventStatusBadge status={event.status} />
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${
                          categoryGradients[event.category]
                        } text-white shadow-lg`}
                      >
                        {event.category.charAt(0).toUpperCase() +
                          event.category.slice(1)}
                      </span>
                    </div>

                    {/* Date on image */}
                    <div className="absolute bottom-3 left-3">
                      <span className="text-white/90 text-xs font-medium">
                        {new Date(event.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Event Content */}
                  <div className="p-4 sm:p-5">
                    <h3
                      className={`font-heading text-base sm:text-lg font-bold mb-2 bg-gradient-to-r ${
                        categoryGradients[event.category]
                      } bg-clip-text text-transparent`}
                    >
                      {event.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-3 line-clamp-2">
                      {event.subtitle || event.description}
                    </p>

                    {/* Location and Time */}
                    <div className="flex flex-col gap-1.5 text-xs text-gray-500 mb-3">
                      <span className="flex items-center gap-1.5">
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {event.location}
                      </span>
                    </div>

                    {/* Learn More Link */}
                    <div className="flex items-center gap-2 text-purple-400 text-sm font-semibold group-hover:gap-3 transition-all duration-300">
                      Learn More
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div
                    className={`h-0.5 bg-gradient-to-r ${
                      categoryGradients[event.category]
                    } transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* No Results */}
      {filteredEvents.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <p className="text-gray-400 text-lg">
            No events found in this category.
          </p>
        </motion.div>
      )}
    </div>
  );
}
