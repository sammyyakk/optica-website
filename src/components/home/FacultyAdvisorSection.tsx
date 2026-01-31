"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Image from "next/image";

// SVG Icons
const GraduationCapIcon = () => (
  <svg
    className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
    />
  </svg>
);

const BriefcaseIcon = () => (
  <svg
    className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
    />
  </svg>
);

const BookOpenIcon = () => (
  <svg
    className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
    />
  </svg>
);

const SparklesIcon = () => (
  <svg
    className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
    />
  </svg>
);

export default function FacultyAdvisorSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const achievements = [
    { label: "Ph.D. in Optical Communication", icon: <GraduationCapIcon /> },
    { label: "Dean of R&D", icon: <BriefcaseIcon /> },
    { label: "Associate Professor", icon: <BookOpenIcon /> },
    { label: "Founded BVP Optica in 2019", icon: <SparklesIcon /> },
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
                      <span className="flex-shrink-0">{achievement.icon}</span>
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
