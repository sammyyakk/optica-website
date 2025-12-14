"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Image from "next/image";

export default function FacultyAdvisorSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const achievements = [
    { label: "Ph.D. in Optical Communication", icon: "🎓" },
    { label: "Dean of R&D", icon: "👔" },
    { label: "Associate Professor", icon: "📚" },
    { label: "Founded BVP Optica in 2019", icon: "🌟" },
  ];

  return (
    <section
      id="team"
      ref={ref}
      className="relative w-full min-h-screen flex items-center justify-center py-10 sm:py-12 md:py-20 overflow-hidden"
    >
      <div className="relative z-20 mx-auto w-full max-w-5xl px-4 sm:px-6 md:px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-purple-400 bg-clip-text text-transparent">
            OUR FACULTY ADVISOR
          </h2>
        </motion.div>

        {/* Main Content - Centered Card Layout */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto max-w-4xl"
        >
          {/* Subtle background glow */}
          <div className="absolute inset-0 -m-4 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-purple-600/10 rounded-3xl blur-2xl" />

          {/* Card Container */}
          <div className="relative bg-gradient-to-br from-purple-900/30 via-black/40 to-purple-900/20 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-4 sm:p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-center">
              {/* Photo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.9 }
                }
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative flex-shrink-0"
              >
                {/* Glow behind image */}
                <div className="absolute -inset-3 bg-gradient-to-br from-purple-500/30 to-pink-500/20 rounded-2xl blur-xl" />

                <div className="relative w-40 h-52 sm:w-48 sm:h-64 md:w-56 md:h-72 rounded-xl overflow-hidden border-2 border-purple-400/30">
                  <Image
                    src="/yugnanda_mam.jpg"
                    alt="Dr. Yugnanda Puri"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-transparent to-transparent" />
                </div>
              </motion.div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                {/* Name */}
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4"
                >
                  Dr. Yugnanda Puri
                </motion.h3>

                {/* Achievements Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4 sm:mb-5">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={
                        isInView
                          ? { opacity: 1, scale: 1 }
                          : { opacity: 0, scale: 0.9 }
                      }
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                      className="flex items-center gap-2 bg-purple-900/30 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 border border-purple-500/20"
                    >
                      <span className="text-base sm:text-lg">
                        {achievement.icon}
                      </span>
                      <span className="text-gray-300 text-[10px] sm:text-xs font-medium leading-tight">
                        {achievement.label}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4"
                >
                  Having founded this club in 2019, Dr. Puri has been key in
                  establishing and nurturing it ever since. With a Ph.D. in
                  Optical Communication and extensive experience in academia,
                  Dr. Puri has been a driving force behind BVP Optica&apos;s
                  growth and success.
                </motion.p>

                {/* Quote */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                  }
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="border-l-2 border-purple-400 pl-3 sm:pl-4 py-1.5 sm:py-2"
                >
                  <p className="text-purple-200/90 italic text-xs sm:text-sm">
                    &ldquo;Empowering students to explore the fascinating world
                    of optics and photonics through innovation and
                    collaboration.&rdquo;
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
