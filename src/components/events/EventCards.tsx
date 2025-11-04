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
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 justify-center mb-12">
        {categories.map((category) => (
          <motion.button
            key={category.value}
            onClick={() => setSelectedCategory(category.value)}
            className={`px-6 py-2 rounded-button font-accent transition-all ${
              selectedCategory === category.value
                ? "bg-gradient-to-r from-optica-blue to-quantum-violet text-white shadow-lg"
                : "bg-white dark:bg-background-dark/80 text-text-secondary dark:text-gray-300 border border-gray-300 dark:border-quantum-violet/20 hover:border-optica-blue dark:hover:border-quantum-violet"
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
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredEvents.map((event) => (
            <motion.div
              key={event.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="group"
            >
              <div className="bg-white dark:bg-background-dark/80 rounded-card shadow-card overflow-hidden border border-transparent dark:border-quantum-violet/20 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                {/* Event Image */}
                <div className="relative h-48 bg-gradient-to-br from-optica-blue to-quantum-violet overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-heading text-2xl">
                      {event.category.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Event Content */}
                <div className="p-6">
                  <div className="text-sm font-accent text-quantum-violet dark:text-photon-gold mb-2">
                    {new Date(event.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <h3 className="font-heading text-xl font-bold text-text-primary dark:text-white mb-3 group-hover:text-optica-blue dark:group-hover:text-quantum-violet transition-colors">
                    {event.title}
                  </h3>
                  <p className="font-body text-text-secondary dark:text-gray-300 text-sm leading-relaxed">
                    {event.description}
                  </p>
                </div>

                {/* Hover Accent */}
                <div className="h-1 bg-gradient-to-r from-optica-blue via-quantum-violet to-photon-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
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
          <p className="font-body text-xl text-text-secondary dark:text-gray-300">
            No events found in this category.
          </p>
        </motion.div>
      )}
    </div>
  );
}
