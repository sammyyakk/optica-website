"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Event, categoryGradients } from "@/lib/events/types";
import EventStatusBadge from "./EventStatusBadge";
import { ChevronRight } from "lucide-react";

interface EventHorizontalScrollProps {
  title: string;
  events: Event[];
}

export default function EventHorizontalScroll({ title, events }: EventHorizontalScrollProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  if (events.length === 0) return null;

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="mb-12 w-full max-w-[100vw]"
    >
      <div className="flex items-center justify-between mb-4 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        <h2 className="font-heading text-xl sm:text-2xl font-bold uppercase tracking-wider text-white flex items-center">
          {title} <ChevronRight className="ml-1 w-5 h-5 text-purple-400" />
        </h2>
      </div>
      
      {/* Horizontal scroll container */}
      <div className="flex overflow-x-auto gap-4 sm:gap-6 pb-6 px-4 sm:px-6 md:px-8 hide-scrollbar snap-x snap-mandatory max-w-7xl mx-auto">
        {events.map((event) => (
          <Link 
            key={event.id}
            href={`/events/${event.slug}`} 
            className="flex-none w-[280px] sm:w-[320px] aspect-[4/3] relative rounded-2xl overflow-hidden group snap-start bg-purple-900/20 border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300"
          >
            {event.coverImage ? (
              <Image
                src={event.coverImage}
                alt={event.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 300px, 350px"
              />
            ) : (
              <div className={`absolute inset-0 bg-gradient-to-br ${categoryGradients[event.category] || "from-purple-900 to-black"} opacity-40`} />
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            
            <div className="absolute inset-0 p-4 flex flex-col justify-end">
              <div className="mb-2">
                <EventStatusBadge status={event.status} />
              </div>
              <h3 className="font-heading text-lg font-bold text-white mb-1 line-clamp-2">
                {event.title}
              </h3>
              <p className="text-purple-200/80 text-xs">
                 {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
