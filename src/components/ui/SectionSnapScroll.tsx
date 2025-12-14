"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

interface SectionSnapScrollProps {
  sections: React.ReactNode[];
  sectionNames: string[];
}

export function SectionSnapScroll({ sections, sectionNames }: SectionSnapScrollProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [direction, setDirection] = useState<"up" | "down">("down");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const isScrollingRef = useRef(false);
  const cooldownRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const deltaAccumulatorRef = useRef(0);
  const touchStartRef = useRef<number | null>(null);
  const currentSectionRef = useRef(0);
  const frameRef = useRef<number | null>(null);
  const queuedDeltaRef = useRef(0);

  useEffect(() => {
    currentSectionRef.current = currentSection;
  }, [currentSection]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = (event: MediaQueryListEvent | MediaQueryList) => {
      setPrefersReducedMotion(event.matches);
    };
    updatePreference(media);
    const handler = (event: MediaQueryListEvent) => updatePreference(event);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  const processScroll = useCallback(
    (delta: number) => {
      if (isScrollingRef.current) return;

      const minDeltaBoost = Math.abs(delta) < 12 ? 3 : 1;
      const adjustedDelta = delta * minDeltaBoost;
      deltaAccumulatorRef.current += adjustedDelta;

      const threshold = 40;
      if (Math.abs(deltaAccumulatorRef.current) < threshold) {
        return;
      }

      const goingDown = deltaAccumulatorRef.current > 0;
      deltaAccumulatorRef.current = 0;

      const current = currentSectionRef.current;
      if (goingDown && current >= sections.length - 1) {
        return;
      }

      if (!goingDown && current <= 0) {
        return;
      }

      isScrollingRef.current = true;
      setDirection(goingDown ? "down" : "up");
      setCurrentSection((prev) => prev + (goingDown ? 1 : -1));

      if (cooldownRef.current) {
        clearTimeout(cooldownRef.current);
      }
      cooldownRef.current = setTimeout(() => {
        isScrollingRef.current = false;
        cooldownRef.current = null;
      }, 900);
    },
    [sections.length]
  );

  const scheduleScroll = useCallback(
    (delta: number) => {
      queuedDeltaRef.current += delta;
      if (frameRef.current !== null) return;
      frameRef.current = requestAnimationFrame(() => {
        processScroll(queuedDeltaRef.current);
        queuedDeltaRef.current = 0;
        frameRef.current = null;
      });
    },
    [processScroll]
  );

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      scheduleScroll(e.deltaY);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        scheduleScroll(100);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        scheduleScroll(-100);
      } else if (e.key === "Home") {
        e.preventDefault();
        setCurrentSection(0);
        setDirection("up");
      } else if (e.key === "End") {
        e.preventDefault();
        setCurrentSection(sections.length - 1);
        setDirection("down");
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartRef.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartRef.current === null) return;
      
      const touchEnd = e.changedTouches[0].clientY;
      const delta = touchStartRef.current - touchEnd;
      
      if (Math.abs(delta) > 40) {
        const amplifiedDelta = delta * 2.5;
        scheduleScroll(amplifiedDelta);
      }
      
      touchStartRef.current = null;
    };

    // Prevent default scroll behavior
    document.body.style.overflow = "hidden";
    
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      if (cooldownRef.current) {
        clearTimeout(cooldownRef.current);
        cooldownRef.current = null;
      }
    };
  }, [scheduleScroll, sections.length]);

  const variants = {
    enter: (direction: string) => ({
      y: direction === "down" ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
    },
    exit: (direction: string) => ({
      y: direction === "down" ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  const shouldAnimate = !prefersReducedMotion;

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {shouldAnimate ? (
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSection}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              y: { type: "spring", stiffness: 200, damping: 25 },
              opacity: { duration: 0.3 },
            }}
            className="absolute inset-0 w-full h-full"
          >
            <div className="w-full h-full">
              {sections[currentSection]}
            </div>
          </motion.div>
        </AnimatePresence>
      ) : (
        <div className="absolute inset-0 w-full h-full">
          {sections[currentSection]}
        </div>
      )}

  {/* Enhanced Section Navigation - Hidden on very small screens */}
  <div className="pointer-events-none fixed right-3 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-50 flex items-center gap-2 sm:gap-4">
        {/* Progress bar - hidden on mobile */}
  <div className="pointer-events-auto relative w-0.5 sm:w-1 h-40 sm:h-64 bg-gradient-to-b from-purple-500/10 via-pink-500/10 to-purple-500/10 rounded-full backdrop-blur-sm border border-purple-500/20 hidden sm:block">
          <motion.div
            className="absolute top-0 left-0 right-0 bg-gradient-to-b from-purple-400 via-pink-400 to-purple-500 rounded-full shadow-lg shadow-purple-500/50"
            animate={{
              height: `${((currentSection + 1) / sections.length) * 100}%`,
            }}
            transition={{ 
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1]
            }}
          />
        </div>

        {/* Section dots */}
  <div className="pointer-events-auto flex flex-col items-center gap-3 sm:gap-6">
          {sections.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isScrollingRef.current) {
                  setDirection(index > currentSection ? "down" : "up");
                  setCurrentSection(index);
                  isScrollingRef.current = true;
                  deltaAccumulatorRef.current = 0;
                  if (cooldownRef.current) {
                    clearTimeout(cooldownRef.current);
                  }
                  cooldownRef.current = setTimeout(() => {
                    isScrollingRef.current = false;
                    cooldownRef.current = null;
                    deltaAccumulatorRef.current = 0;
                  }, 1400);
                }
              }}
              className="group relative flex items-center"
              aria-label={`Go to ${sectionNames[index]}`}
            >
              {/* Tooltip - hidden on mobile */}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="absolute right-full mr-4 sm:mr-6 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-purple-900/90 to-pink-900/90 backdrop-blur-xl rounded-lg sm:rounded-xl text-white text-xs sm:text-sm font-semibold border border-purple-500/30 shadow-xl whitespace-nowrap hidden sm:block"
              >
                {sectionNames[index]}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-0 h-0 border-8 border-transparent border-l-purple-900/90" />
              </motion.div>

              {/* Dot indicator with better sizing */}
              <motion.div
                className={`relative rounded-full transition-all duration-300 cursor-pointer ${
                  currentSection === index
                    ? "w-3 h-3 sm:w-4 sm:h-4"
                    : "w-2 h-2 sm:w-2.5 sm:h-2.5"
                }`}
                whileHover={{ scale: 1.3 }}
              >
                <div
                  className={`w-full h-full rounded-full transition-all duration-300 ${
                    currentSection === index
                      ? "bg-gradient-to-r from-purple-400 to-pink-400 shadow-[0_0_20px_rgba(168,85,247,0.8)]"
                      : "bg-white/40 hover:bg-white/60"
                  }`}
                />

                {/* Pulsing ring for active section */}
                {currentSection === index && (
                  <>
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-purple-400"
                      initial={{ scale: 1, opacity: 1 }}
                      animate={{ scale: 2.5, opacity: 0 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-pink-400"
                      initial={{ scale: 1, opacity: 1 }}
                      animate={{ scale: 2.5, opacity: 0 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: 0.5,
                      }}
                    />
                  </>
                )}
              </motion.div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
