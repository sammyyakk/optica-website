"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

export default function LifeAsMemberSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const benefits = [
    {
      title: "Scholarships & Grants",
      description:
        "Access travel grants for international conferences and scholarship opportunities",
      color: "from-purple-400 to-pink-400",
      icon: "💰",
    },
    {
      title: "Expert Webinars",
      description:
        "Participate in webinars led by global experts in optics and photonics",
      color: "from-pink-400 to-orange-400",
      icon: "🎤",
    },
    {
      title: "Research Access",
      description:
        "Exclusive access to cutting-edge journals and monthly research magazines",
      color: "from-blue-400 to-purple-400",
      icon: "📖",
    },
    {
      title: "Lab Visits",
      description:
        "Hands-on experience through organized laboratory visits and tours",
      color: "from-green-400 to-teal-400",
      icon: "🔬",
    },
    {
      title: "Competitions",
      description:
        "Engage in quizzes, photography competitions, and exciting ideathons",
      color: "from-orange-400 to-red-400",
      icon: "🏆",
    },
    {
      title: "Community",
      description:
        "Thrive through close-knit interactions and collaborative learning",
      color: "from-teal-400 to-blue-400",
      icon: "🤝",
    },
  ];

  return (
    <section
      id="events"
      ref={ref}
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="relative z-20 mx-auto w-full max-w-5xl px-4 sm:px-6 md:px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-2 sm:mb-3 md:mb-4"
        >
          <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-purple-400 bg-clip-text text-transparent">
            LIFE AS A MEMBER
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-gray-400 text-xs sm:text-sm md:text-base max-w-2xl mx-auto text-center mb-4 sm:mb-6 md:mb-10 px-2"
        >
          Unlock a world of opportunities, knowledge, and connections
        </motion.p>

        {/* Benefits Grid */}
        <div className="grid w-full max-w-4xl mx-auto grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
          {benefits.map((benefit, index) => (
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
                delay: 0.2 + index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group"
            >
              <div className="relative h-full bg-gradient-to-br from-purple-900/30 via-black/40 to-purple-900/20 backdrop-blur-sm p-3 sm:p-4 md:p-5 rounded-xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 flex flex-col overflow-hidden">
                {/* Subtle glow on hover */}
                <div className="absolute -inset-1 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 rounded-xl blur-lg transition-all duration-300 -z-10" />

                {/* Icon */}
                <motion.div
                  className="text-2xl sm:text-2xl md:text-3xl mb-2 sm:mb-2 md:mb-3"
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.3 }}
                >
                  {benefit.icon}
                </motion.div>

                {/* Title */}
                <h3
                  className={`font-heading text-sm sm:text-sm md:text-base font-semibold mb-1 sm:mb-1 md:mb-2 bg-gradient-to-r ${benefit.color} bg-clip-text text-transparent`}
                >
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-[10px] sm:text-xs leading-relaxed flex-1">
                  {benefit.description}
                </p>

                {/* Corner Accent */}
                <div
                  className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${benefit.color} opacity-5 blur-2xl`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
