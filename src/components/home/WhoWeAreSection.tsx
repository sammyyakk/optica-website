"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

export default function WhoWeAreSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const features = [
    {
      icon: "🌍",
      title: "Global Network",
      description: "Connect with international researchers and students",
    },
    {
      icon: "📚",
      title: "Exclusive Access",
      description: "Journals, magazines, and cutting-edge research",
    },
    {
      icon: "💡",
      title: "Innovation Hub",
      description: "Collaborate on groundbreaking projects",
    },
    {
      icon: "🎓",
      title: "Learning Opportunities",
      description: "Workshops, seminars, and expert-led sessions",
    },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="relative z-20 mx-auto w-full max-w-5xl px-4 sm:px-6 md:px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-3 sm:mb-6 md:mb-8"
        >
          <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-purple-400 bg-clip-text text-transparent">
            WHO WE ARE
          </h2>
        </motion.div>

        {/* Main Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-body text-xs sm:text-sm md:text-base text-gray-300 max-w-3xl mx-auto text-center leading-relaxed mb-4 sm:mb-8 md:mb-10 px-2"
        >
          BVP-OPTICA is a vibrant student chapter at Bharati Vidyapeeth&apos;s
          College of Engineering, committed to advancing optics and photonics.
          By joining us, you become part of a global network with international
          research opportunities, exclusive access to journals, and exciting
          events. Our mission is to ignite a passion for these fields through
          education, innovation, and global collaboration.
        </motion.p>

        {/* Feature Cards */}
        <div className="grid w-full max-w-4xl mx-auto grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 30 }
              }
              transition={{
                duration: 0.5,
                delay: 0.25 + index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group"
            >
              <div className="relative h-full bg-gradient-to-br from-purple-900/30 via-black/40 to-purple-900/20 backdrop-blur-sm p-3 sm:p-4 md:p-5 rounded-xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 flex flex-col">
                {/* Subtle glow on hover */}
                <div className="absolute -inset-1 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 rounded-xl blur-lg transition-all duration-300 -z-10" />

                {/* Icon */}
                <motion.div
                  className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3"
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.3 }}
                >
                  {feature.icon}
                </motion.div>

                {/* Title */}
                <h3 className="font-heading text-sm sm:text-base font-semibold text-white mb-1 sm:mb-2">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-[10px] sm:text-xs leading-relaxed flex-1">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
