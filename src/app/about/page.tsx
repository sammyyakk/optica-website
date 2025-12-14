"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Image from "next/image";

function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  const activities = [
    {
      title: "Workshops & Seminars",
      description:
        "Interactive sessions with industry experts covering the latest in optics and photonics.",
      icon: "🎓",
      color: "from-purple-400 to-pink-400",
    },
    {
      title: "Research Opportunities",
      description:
        "Access to cutting-edge research projects and global collaborations.",
      icon: "🔬",
      color: "from-blue-400 to-purple-400",
    },
    {
      title: "Networking Events",
      description:
        "Connect with professionals, alumni, and peers through our global network.",
      icon: "🌐",
      color: "from-pink-400 to-orange-400",
    },
    {
      title: "Competitions",
      description:
        "Participate in ideathons, quizzes, and technical competitions.",
      icon: "🏆",
      color: "from-orange-400 to-yellow-400",
    },
    {
      title: "Publications",
      description:
        "Exclusive access to journals, magazines, and research papers.",
      icon: "📚",
      color: "from-green-400 to-teal-400",
    },
    {
      title: "Community",
      description: "Join a close-knit community driving innovation together.",
      icon: "🤝",
      color: "from-teal-400 to-blue-400",
    },
  ];

  const achievements = [
    { label: "Ph.D. in Optical Communication", icon: "🎓" },
    { label: "Dean of R&D", icon: "👔" },
    { label: "Associate Professor", icon: "📚" },
    { label: "Founded BVP Optica in 2019", icon: "🌟" },
  ];

  return (
    <main className="min-h-screen bg-[#0E1A2B] pt-20 sm:pt-24 pb-16 sm:pb-20 overflow-hidden">
      {/* Background effects - smaller on mobile */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/10 rounded-full blur-[80px] sm:blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-pink-500/10 rounded-full blur-[80px] sm:blur-[128px]" />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-10 sm:mb-16">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-300 via-pink-300 to-purple-400 bg-clip-text text-transparent">
            About BVP Optica
          </h1>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-2">
            Igniting passion for optics and photonics through education,
            innovation, and global collaboration.
          </p>
        </AnimatedSection>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-12 sm:mb-20">
          <AnimatedSection delay={0.1}>
            <div className="group relative h-full">
              <div className="absolute -inset-1 bg-gradient-to-br from-purple-500/20 to-pink-500/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative h-full bg-gradient-to-br from-purple-900/30 via-black/40 to-purple-900/20 backdrop-blur-sm rounded-xl border border-purple-500/20 p-5 sm:p-6 md:p-8">
                <h2 className="font-heading text-xl sm:text-2xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Our Mission
                </h2>
                <p className="text-gray-300 text-sm leading-relaxed">
                  To advance the fields of optics and photonics by providing
                  students with opportunities for learning, research, and
                  collaboration. We strive to create a community where
                  innovation thrives and members can explore cutting-edge
                  technologies.
                </p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="group relative h-full">
              <div className="absolute -inset-1 bg-gradient-to-br from-pink-500/20 to-purple-500/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative h-full bg-gradient-to-br from-purple-900/30 via-black/40 to-purple-900/20 backdrop-blur-sm rounded-xl border border-purple-500/20 p-5 sm:p-6 md:p-8">
                <h2 className="font-heading text-xl sm:text-2xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Our Vision
                </h2>
                <p className="text-gray-300 text-sm leading-relaxed">
                  To establish BVP Optica as a leading student chapter that
                  empowers the next generation of scientists and engineers. We
                  envision a future where our members contribute significantly
                  to technological advancements in optics and photonics
                  globally.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* What We Do */}
        <AnimatedSection delay={0.3} className="mb-8 sm:mb-10">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-purple-300 via-pink-300 to-purple-400 bg-clip-text text-transparent">
            What We Do
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-12 sm:mb-20">
          {activities.map((item, index) => (
            <AnimatedSection key={index} delay={0.35 + index * 0.08}>
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                className="group relative h-full"
              >
                <div className="absolute -inset-1 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 rounded-xl blur-lg transition-all duration-300" />
                <div className="relative h-full bg-gradient-to-br from-purple-900/30 via-black/40 to-purple-900/20 backdrop-blur-sm rounded-xl border border-purple-500/20 group-hover:border-purple-400/40 p-5 transition-all duration-300">
                  <motion.div
                    className="text-3xl mb-3"
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.icon}
                  </motion.div>
                  <h3
                    className={`font-heading text-base font-semibold mb-2 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}
                  >
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Faculty Advisor */}
        <AnimatedSection delay={0.6} className="mb-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-purple-300 via-pink-300 to-purple-400 bg-clip-text text-transparent">
            Our Faculty Advisor
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.7}>
          <div className="relative max-w-4xl mx-auto">
            {/* Subtle background glow */}
            <div className="absolute inset-0 -m-4 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-purple-600/10 rounded-3xl blur-2xl" />

            {/* Card Container */}
            <div className="relative bg-gradient-to-br from-purple-900/30 via-black/40 to-purple-900/20 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                {/* Photo */}
                <div className="relative flex-shrink-0">
                  {/* Glow behind image */}
                  <div className="absolute -inset-3 bg-gradient-to-br from-purple-500/30 to-pink-500/20 rounded-2xl blur-xl" />

                  <div className="relative w-48 h-64 md:w-56 md:h-72 rounded-xl overflow-hidden border-2 border-purple-400/30">
                    <Image
                      src="/yugnanda_mam.jpg"
                      alt="Dr. Yugnanda Puri"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-transparent to-transparent" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
                    Dr. Yugnanda Puri
                  </h3>

                  {/* Achievements Grid */}
                  <div className="grid grid-cols-2 gap-2 mb-5">
                    {achievements.map((achievement, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 bg-purple-900/30 rounded-lg px-3 py-2 border border-purple-500/20"
                      >
                        <span className="text-lg">{achievement.icon}</span>
                        <span className="text-gray-300 text-xs font-medium leading-tight">
                          {achievement.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    Having founded this club in 2019, Dr. Puri has been key in
                    establishing and nurturing it ever since. With a Ph.D. in
                    Optical Communication and extensive experience in academia,
                    Dr. Puri has been a driving force behind BVP Optica&apos;s
                    growth and success.
                  </p>

                  {/* Quote */}
                  <div className="border-l-2 border-purple-400 pl-4 py-2">
                    <p className="text-purple-200/90 italic text-sm">
                      &ldquo;Empowering students to explore the fascinating
                      world of optics and photonics through innovation and
                      collaboration.&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </main>
  );
}
