"use client";

import { motion } from "motion/react";
import { useMemo } from "react";

export function FixedParticleBackground() {
  // Generate multiple layers of stars with different properties
  const starLayers = useMemo(() => {
    // Layer 1: Large bright stars (20 stars)
    const largStars = Array.from({ length: 20 }, (_, i) => ({
      id: `large-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 3 + Math.random() * 2,
      opacity: 0.8 + Math.random() * 0.2,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }));

    // Layer 2: Medium stars (50 stars)
    const mediumStars = Array.from({ length: 50 }, (_, i) => ({
      id: `medium-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 1,
      opacity: 0.5 + Math.random() * 0.3,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 3,
    }));

    // Layer 3: Small distant stars (100 stars)
    const smallStars = Array.from({ length: 100 }, (_, i) => ({
      id: `small-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 0.5,
      opacity: 0.3 + Math.random() * 0.4,
      duration: 1.5 + Math.random() * 2.5,
      delay: Math.random() * 4,
    }));

    return { largStars, mediumStars, smallStars };
  }, []);

  // Generate nebula clouds
  const nebulaClouds = useMemo(
    () =>
      Array.from({ length: 3 }, (_, i) => ({
        id: `nebula-${i}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        scale: 0.8 + Math.random() * 0.4,
        rotation: Math.random() * 360,
        duration: 15 + Math.random() * 10,
      })),
    []
  );

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-gradient-to-b from-background-dark via-[#0a0e1a] to-background-dark">
      {/* Nebula clouds - large glowing areas */}
      {nebulaClouds.map((cloud) => (
        <motion.div
          key={cloud.id}
          className="absolute blur-[100px]"
          style={{
            left: `${cloud.x}%`,
            top: `${cloud.y}%`,
            width: "500px",
            height: "500px",
            background: `radial-gradient(circle, rgba(108, 99, 255, 0.15) 0%, rgba(233, 30, 99, 0.1) 50%, transparent 70%)`,
          }}
          animate={{
            scale: [cloud.scale, cloud.scale * 1.2, cloud.scale],
            rotate: [cloud.rotation, cloud.rotation + 30, cloud.rotation],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: cloud.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Large stars */}
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
            }px rgba(108, 99, 255, 0.4)`,
          }}
          animate={{
            opacity: [star.opacity, star.opacity * 0.3, star.opacity],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Medium stars */}
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
            opacity: [star.opacity, star.opacity * 0.4, star.opacity],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Small stars */}
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
            opacity: [star.opacity, star.opacity * 0.5, star.opacity],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Shooting stars */}
      <motion.div
        className="absolute w-1 h-1 bg-white rounded-full"
        style={{
          boxShadow:
            "0 0 10px rgba(255, 255, 255, 1), 0 0 20px rgba(108, 99, 255, 0.8)",
        }}
        animate={{
          x: ["-10%", "110%"],
          y: ["-10%", "40%"],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 5,
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
          repeatDelay: 8,
          ease: "easeOut",
        }}
      />

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background-dark/50" />
    </div>
  );
}
