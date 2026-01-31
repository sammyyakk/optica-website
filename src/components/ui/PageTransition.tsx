"use client";

import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";
import { ReactNode, useState, useEffect } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

// Crazy spectrum-colored transition overlay
const TransitionOverlay = () => {
  return (
    <>
      {/* First wave - Purple */}
      <motion.div
        className="fixed inset-0 z-[9999] bg-gradient-to-br from-purple-600 via-purple-800 to-purple-900"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        exit={{ scaleY: 0 }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ originY: 0 }}
      />

      {/* Second wave - Pink (delayed) */}
      <motion.div
        className="fixed inset-0 z-[9998] bg-gradient-to-br from-pink-500 via-pink-700 to-purple-800"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        exit={{ scaleY: 0 }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.1,
        }}
        style={{ originY: 0 }}
      />

      {/* Third wave - Deep blue (most delayed) */}
      <motion.div
        className="fixed inset-0 z-[9997] bg-gradient-to-br from-[#0E1A2B] via-purple-950 to-[#0E1A2B]"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        exit={{ scaleY: 0 }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.2,
        }}
        style={{ originY: 0 }}
      />

      {/* Glowing particles during transition */}
      <motion.div
        className="fixed inset-0 z-[10000] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${10 + (i % 4) * 25}%`,
              top: `${20 + Math.floor(i / 4) * 30}%`,
              background:
                i % 3 === 0
                  ? "#a48ff5"
                  : i % 3 === 1
                    ? "#e91e63"
                    : "#6f4cff",
              boxShadow: `0 0 20px ${i % 3 === 0 ? "#a48ff5" : i % 3 === 1 ? "#e91e63" : "#6f4cff"}`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 1, 0],
              y: [0, -30, -60],
            }}
            transition={{
              duration: 0.8,
              delay: 0.1 + i * 0.05,
              ease: "easeOut",
            }}
          />
        ))}
      </motion.div>

      {/* Center logo/glow burst */}
      <motion.div
        className="fixed inset-0 z-[10001] flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-purple-600"
          initial={{ scale: 0, rotate: 0 }}
          animate={{
            scale: [0, 1.2, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.15,
          }}
          style={{
            boxShadow:
              "0 0 60px rgba(164, 143, 245, 0.8), 0 0 100px rgba(233, 30, 99, 0.5)",
          }}
        />
      </motion.div>
    </>
  );
};

// Page content animation variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
    filter: "blur(10px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      delay: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 1.02,
    filter: "blur(10px)",
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);
  const [currentPath, setCurrentPath] = useState(pathname);

  useEffect(() => {
    if (pathname !== currentPath) {
      setIsTransitioning(true);

      // After transition animation, update the content
      const timer = setTimeout(() => {
        setDisplayChildren(children);
        setCurrentPath(pathname);
        setIsTransitioning(false);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setDisplayChildren(children);
    }
  }, [pathname, children, currentPath]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isTransitioning && <TransitionOverlay key="transition" />}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPath}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {displayChildren}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
