"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [trails, setTrails] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const outlineX = useSpring(cursorX, { damping: 20, stiffness: 150 });
  const outlineY = useSpring(cursorY, { damping: 20, stiffness: 150 });

  useEffect(() => {
    // Check if mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    let trailId = 0;
    let lastTrailTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Create trail particles
      const now = Date.now();
      if (now - lastTrailTime > 50) {
        setTrails((prev) => {
          const newTrail = { id: trailId++, x: e.clientX, y: e.clientY };
          const updated = [...prev, newTrail];
          return updated.slice(-15); // Keep last 15 trails
        });
        lastTrailTime = now;
      }

      // Check if hovering over clickable elements
      const target = e.target as HTMLElement;
      const isClickable =
        target.closest("a") ||
        target.closest("button") ||
        target.closest('input[type="button"]') ||
        target.closest('input[type="submit"]') ||
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        window.getComputedStyle(target).cursor === "pointer";

      setIsPointer(!!isClickable);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("resize", checkMobile);
    };
  }, [cursorX, cursorY]);

  // Remove trails after animation
  useEffect(() => {
    if (trails.length > 0) {
      const timeout = setTimeout(() => {
        setTrails((prev) => prev.slice(1));
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [trails]);

  // Don't render cursor on mobile
  if (isMobile) {
    return null;
  }

  return (
    <>
      {/* Trail particles */}
      {trails.map((trail, index) => (
        <motion.div
          key={trail.id}
          className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-screen"
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            left: trail.x,
            top: trail.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            className="h-2 w-2 rounded-full"
            style={{
              background: `radial-gradient(circle, ${
                index % 2 === 0 ? "#A48FF5" : "#E91E63"
              } 0%, transparent 70%)`,
            }}
          />
        </motion.div>
      ))}

      {/* Main cursor dot */}
      <motion.div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            scale: isClicking ? 0.5 : isPointer ? 0.3 : 1,
            opacity: isPointer ? 0.5 : 1,
          }}
          transition={{ duration: 0.15 }}
          className="relative h-3 w-3"
        >
          <div className="absolute inset-0 rounded-full bg-white" />
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.8, 0, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 rounded-full bg-primary-purple"
          />
        </motion.div>
      </motion.div>

      {/* Cursor outline ring */}
      <motion.div
        ref={cursorOutlineRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998]"
        style={{
          x: outlineX,
          y: outlineY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width: isClicking ? 20 : isPointer ? 60 : 40,
            height: isClicking ? 20 : isPointer ? 60 : 40,
            borderColor: isPointer ? "#E91E63" : "#A48FF5",
          }}
          transition={{ duration: 0.2 }}
          className="rounded-full border-2"
          style={{
            borderStyle: "solid",
            mixBlendMode: "screen",
          }}
        >
          {/* Rotating gradient overlay */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
            className="h-full w-full rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, #A48FF5 0deg, #E91E63 120deg, #6F4CFF 240deg, #A48FF5 360deg)",
              opacity: 0.3,
              filter: "blur(8px)",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Sparkle particles on click */}
      {isClicking && (
        <>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="pointer-events-none fixed left-0 top-0 z-[9997]"
              style={{
                x: cursorXSpring,
                y: cursorYSpring,
                translateX: "-50%",
                translateY: "-50%",
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{
                scale: [0, 1.5, 0],
                opacity: [1, 0.5, 0],
                x: Math.cos((i * Math.PI * 2) / 8) * 30,
                y: Math.sin((i * Math.PI * 2) / 8) * 30,
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="h-1.5 w-1.5 rounded-full bg-white" />
            </motion.div>
          ))}
        </>
      )}
    </>
  );
}
