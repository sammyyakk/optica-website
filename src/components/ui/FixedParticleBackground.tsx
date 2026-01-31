"use client";

import { motion } from "motion/react";
import { useMemo, useState, useEffect } from "react";

export function FixedParticleBackground() {
  const [isMobile, setIsMobile] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkDevice();
    setIsReady(true);
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // Generate multiple layers of stars with different properties
  // Mobile: ~40% of desktop stars, Desktop: 70% of original
  const starLayers = useMemo(() => {
    // Desktop counts (70% of original: 20->14, 50->35, 100->70)
    // Mobile counts (~40% of desktop: 14->6, 35->14, 70->28)
    const largeCount = isMobile ? 6 : 14;
    const mediumCount = isMobile ? 14 : 35;
    const smallCount = isMobile ? 28 : 70;

    // Slower twinkling - mobile: 3x slower, desktop: 1.5x slower
    const durationMultiplier = isMobile ? 3 : 1.5;

    // Layer 1: Large bright stars - slower twinkling
    const largStars = Array.from({ length: largeCount }, (_, i) => ({
      id: `large-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 3 + Math.random() * 2,
      opacity: 0.8 + Math.random() * 0.2,
      minOpacity: 0.1 + Math.random() * 0.2,
      duration: (0.8 + Math.random() * 1.2) * durationMultiplier,
      delay: Math.random() * 1,
    }));

    // Layer 2: Medium stars - slower twinkling
    const mediumStars = Array.from({ length: mediumCount }, (_, i) => ({
      id: `medium-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 1,
      opacity: 0.5 + Math.random() * 0.3,
      minOpacity: 0.05 + Math.random() * 0.15,
      duration: (0.5 + Math.random() * 1.5) * durationMultiplier,
      delay: Math.random() * 2,
    }));

    // Layer 3: Small distant stars - slower twinkling
    const smallStars = Array.from({ length: smallCount }, (_, i) => ({
      id: `small-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 0.5,
      opacity: 0.3 + Math.random() * 0.4,
      minOpacity: 0.02 + Math.random() * 0.1,
      duration: (0.3 + Math.random() * 1.2) * durationMultiplier,
      delay: Math.random() * 2,
    }));

    return { largStars, mediumStars, smallStars };
  }, [isMobile]);

  // Generate nebula clouds - fewer on mobile
  const nebulaClouds = useMemo(
    () =>
      Array.from({ length: isMobile ? 2 : 3 }, (_, i) => ({
        id: `nebula-${i}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        scale: 0.8 + Math.random() * 0.4,
        rotation: Math.random() * 360,
        duration: (15 + Math.random() * 10) * (isMobile ? 1.5 : 1),
      })),
    [isMobile],
  );

  if (!isReady) return null;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-gradient-to-b from-background-dark via-[#0a0e1a] to-background-dark">
      {/* Nebula clouds - purple/pink only */}
      {nebulaClouds.map((cloud) => (
        <motion.div
          key={cloud.id}
          className="absolute blur-[100px]"
          style={{
            left: `${cloud.x}%`,
            top: `${cloud.y}%`,
            width: isMobile ? "300px" : "500px",
            height: isMobile ? "300px" : "500px",
            background: `radial-gradient(circle, rgba(164, 143, 245, 0.12) 0%, rgba(233, 30, 99, 0.08) 50%, transparent 70%)`,
          }}
          animate={{
            scale: [cloud.scale, cloud.scale * 1.2, cloud.scale],
            rotate: [cloud.rotation, cloud.rotation + 30, cloud.rotation],
            opacity: [0.25, 0.4, 0.25],
          }}
          transition={{
            duration: cloud.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Large stars - slower twinkling */}
      {starLayers.largStars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.8), 0 0 ${
              star.size * 4
            }px rgba(164, 143, 245, 0.4)`,
          }}
          animate={{
            opacity: [
              star.opacity,
              star.minOpacity,
              star.opacity * 0.6,
              star.minOpacity * 1.5,
              star.opacity,
            ],
            scale: [1, 1.3, 0.9, 1.2, 1],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.25, 0.5, 0.75, 1],
          }}
        />
      ))}

      {/* Medium stars - slower twinkling */}
      {starLayers.mediumStars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.6)`,
          }}
          animate={{
            opacity: [
              star.opacity,
              star.minOpacity,
              star.opacity * 0.7,
              star.minOpacity * 2,
              star.opacity,
            ],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.3, 0.5, 0.8, 1],
          }}
        />
      ))}

      {/* Small stars - slower twinkling */}
      {starLayers.smallStars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{
            opacity: [
              star.opacity,
              star.minOpacity,
              star.opacity * 0.5,
              star.minOpacity * 3,
              star.opacity,
            ],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.2, 0.6, 0.85, 1],
          }}
        />
      ))}

      {/* Shooting stars - only on desktop */}
      {!isMobile && (
        <>
          <motion.div
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              boxShadow:
                "0 0 10px rgba(255, 255, 255, 1), 0 0 20px rgba(164, 143, 245, 0.8)",
            }}
            animate={{
              x: ["-10%", "110%"],
              y: ["-10%", "40%"],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 8,
              ease: "easeOut",
            }}
          />

          <motion.div
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              boxShadow:
                "0 0 10px rgba(255, 255, 255, 1), 0 0 20px rgba(233, 30, 99, 0.8)",
            }}
            animate={{
              x: ["110%", "-10%"],
              y: ["60%", "90%"],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatDelay: 12,
              ease: "easeOut",
            }}
          />
        </>
      )}

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background-dark/50" />
    </div>
  );
}
