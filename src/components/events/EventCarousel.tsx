"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Event, categoryGradients } from "@/lib/events/types";
import EventStatusBadge from "./EventStatusBadge";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface EventCarouselProps {
  events: Event[];
  autoAdvanceInterval?: number; // in milliseconds
  className?: string;
}

export default function EventCarousel({
  events,
  autoAdvanceInterval = 5000,
  className = "",
}: EventCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev
  const autoAdvanceRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-advance logic
  useEffect(() => {
    if (events.length <= 1 || isPaused) return;

    autoAdvanceRef.current = setInterval(() => {
      nextSlide();
    }, autoAdvanceInterval);

    return () => {
      if (autoAdvanceRef.current) {
        clearInterval(autoAdvanceRef.current);
      }
    };
  }, [currentIndex, isPaused, events.length, autoAdvanceInterval]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % events.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  if (events.length === 0) {
    return null;
  }

  const currentEvent = events[currentIndex];

  // Variants for slide animation
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div
      className={`relative w-full ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main Carousel */}
      <div className="relative overflow-hidden rounded-2xl">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="relative"
          >
            <Link
              href={`/events/${currentEvent.slug}`}
              className="block group"
            >
              <div className="relative h-[400px] sm:h-[450px] lg:h-[500px] bg-gradient-to-br from-purple-900/30 via-black/40 to-purple-900/20 backdrop-blur-sm rounded-2xl border border-purple-500/20 overflow-hidden transition-all duration-300 group-hover:border-purple-400/40">
                {/* Background Image or Gradient Fallback */}
                <div className="absolute inset-0">
                  {currentEvent.coverImage ? (
                    <Image
                      src={currentEvent.coverImage}
                      alt={currentEvent.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1200px"
                      priority
                    />
                  ) : (
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${categoryGradients[currentEvent.category]} opacity-40`}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                          className="w-24 h-24 text-white/15"
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="relative h-full flex flex-col justify-end p-6 sm:p-8 lg:p-10">
                  {/* Badges */}
                  <div className="absolute top-6 sm:top-8 left-6 sm:left-8 flex gap-2">
                    <EventStatusBadge status={currentEvent.status} />
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${
                        categoryGradients[currentEvent.category]
                      } text-white shadow-lg`}
                    >
                      {currentEvent.category.charAt(0).toUpperCase() +
                        currentEvent.category.slice(1)}
                    </span>
                  </div>

                  {/* Event Info */}
                  <div className="max-w-3xl">
                    <h2
                      className={`font-heading text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 bg-gradient-to-r ${
                        categoryGradients[currentEvent.category]
                      } bg-clip-text text-transparent`}
                    >
                      {currentEvent.title}
                    </h2>
                    <p className="text-gray-300 text-sm sm:text-base lg:text-lg mb-3 sm:mb-4">
                      {currentEvent.subtitle}
                    </p>
                    <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-gray-400 mb-4 sm:mb-5">
                      <span className="flex items-center gap-1">
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
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {new Date(currentEvent.date).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                      <span className="flex items-center gap-1">
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
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {currentEvent.location}
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-2 text-white font-semibold text-sm sm:text-base group-hover:gap-3 transition-all duration-300">
                      Learn More
                      <svg
                        className="w-5 h-5"
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
                </div>

                {/* Subtle glow on hover */}
                <div className="absolute -inset-1 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 rounded-2xl blur-lg transition-all duration-300 -z-10" />
              </div>
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {events.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white hover:bg-black/70 hover:border-white/20 transition-all duration-300 group"
              aria-label="Previous event"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white hover:bg-black/70 hover:border-white/20 transition-all duration-300 group"
              aria-label="Next event"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </>
        )}
      </div>

      {/* Dot Indicators */}
      {events.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {events.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? "w-8 h-2 bg-gradient-to-r from-purple-500 to-pink-500"
                  : "w-2 h-2 bg-gray-600 hover:bg-gray-500"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
