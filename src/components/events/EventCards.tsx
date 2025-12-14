"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

interface Event {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
  category:
    | "ideathon"
    | "seminar"
    | "quiz"
    | "debate"
    | "visit"
    | "competition";
}

const categoryColors: Record<string, string> = {
  ideathon: "from-purple-400 to-pink-400",
  seminar: "from-blue-400 to-purple-400",
  quiz: "from-pink-400 to-orange-400",
  debate: "from-orange-400 to-yellow-400",
  visit: "from-green-400 to-teal-400",
  competition: "from-teal-400 to-blue-400",
};

const mockEvents: Event[] = [
  {
    id: 1,
    title: "QuantumSpark Ideathon",
    date: "2024-10-15",
    description:
      "A 24-hour ideathon focused on quantum computing and photonics innovations.",
    image: "/images/events/quantumspark.jpg",
    category: "ideathon",
  },
  {
    id: 2,
    title: "AI & ML in Optics Seminar",
    date: "2024-09-22",
    description:
      "Expert speakers discussing the intersection of artificial intelligence and optical systems.",
    image: "/images/events/ai-seminar.jpg",
    category: "seminar",
  },
  {
    id: 3,
    title: "Quantum Quotient Quiz",
    date: "2024-08-10",
    description:
      "Test your knowledge in quantum mechanics, optics, and photonics.",
    image: "/images/events/quiz.jpg",
    category: "quiz",
  },
  {
    id: 4,
    title: "Silicon Valley Showdown Debate",
    date: "2024-07-18",
    description: "Debate competition on cutting-edge technology topics.",
    image: "/images/events/debate.jpg",
    category: "debate",
  },
  {
    id: 5,
    title: "ARIES Nainital Visit",
    date: "2024-06-05",
    description:
      "Educational visit to the Aryabhatta Research Institute of Observational Sciences.",
    image: "/images/events/aries.jpg",
    category: "visit",
  },
  {
    id: 6,
    title: "Roboleague Competition",
    date: "2024-05-12",
    description:
      "Robotics competition featuring autonomous and remote-controlled challenges.",
    image: "/images/events/roboleague.jpg",
    category: "competition",
  },
];

const categories = [
  { value: "all", label: "All Events" },
  { value: "ideathon", label: "Ideathons" },
  { value: "seminar", label: "Seminars" },
  { value: "quiz", label: "Quizzes" },
  { value: "debate", label: "Debates" },
  { value: "visit", label: "Visits" },
  { value: "competition", label: "Competitions" },
];

export default function EventCards() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredEvents =
    selectedCategory === "all"
      ? mockEvents
      : mockEvents.filter((event) => event.category === selectedCategory);

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
          {filteredEvents.map((event) => (
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
              <div className="relative h-full bg-gradient-to-br from-purple-900/30 via-black/40 to-purple-900/20 backdrop-blur-sm rounded-xl border border-purple-500/20 overflow-hidden hover:border-purple-400/40 transition-all duration-300">
                {/* Subtle glow on hover */}
                <div className="absolute -inset-1 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 rounded-xl blur-lg transition-all duration-300 -z-10" />

                {/* Event Image */}
                <div className="relative h-40 sm:h-44 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    priority={event.id === 1}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${
                        categoryColors[event.category]
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
                      categoryColors[event.category]
                    } bg-clip-text text-transparent`}
                  >
                    {event.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {event.description}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div
                  className={`h-0.5 bg-gradient-to-r ${
                    categoryColors[event.category]
                  } transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                />
              </div>
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
