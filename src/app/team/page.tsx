"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

interface TeamMember {
  name: string;
  role: string;
  image?: string;
  linkedin?: string;
  instagram?: string;
}

const coreTeam: TeamMember[] = [
  { name: "President", role: "President", linkedin: "#" },
  { name: "Vice President", role: "Vice President", linkedin: "#" },
  { name: "Secretary", role: "Secretary", linkedin: "#" },
  { name: "Treasurer", role: "Treasurer", linkedin: "#" },
];

const departmentHeads: TeamMember[] = [
  // Content Department - 2 heads
  { name: "Content Head 1", role: "Content Department", linkedin: "#" },
  { name: "Content Head 2", role: "Content Department", linkedin: "#" },
  // Design Department - 2 heads
  { name: "Design Head 1", role: "Design Department", linkedin: "#" },
  { name: "Design Head 2", role: "Design Department", linkedin: "#" },
  // Logistics Department - 2 heads
  { name: "Logistics Head 1", role: "Logistics Department", linkedin: "#" },
  { name: "Logistics Head 2", role: "Logistics Department", linkedin: "#" },
  // Outreach Department - 2 heads
  { name: "Outreach Head 1", role: "Outreach Department", linkedin: "#" },
  { name: "Outreach Head 2", role: "Outreach Department", linkedin: "#" },
  // Social Media Department - 2 heads
  { name: "Social Media Head 1", role: "Social Media Department", linkedin: "#" },
  { name: "Social Media Head 2", role: "Social Media Department", linkedin: "#" },
  // Technical Department - 3 heads
  { name: "Technical Head 1", role: "Technical Department", linkedin: "#" },
  { name: "Technical Head 2", role: "Technical Department", linkedin: "#" },
  { name: "Technical Head 3", role: "Technical Department", linkedin: "#" },
];

const roleColors: Record<string, string> = {
  President: "from-purple-400 to-pink-400",
  "Vice President": "from-pink-400 to-rose-400",
  Secretary: "from-blue-400 to-purple-400",
  Treasurer: "from-green-400 to-teal-400",
  "Content Department": "from-orange-400 to-pink-400",
  "Design Department": "from-purple-400 to-blue-400",
  "Logistics Department": "from-teal-400 to-green-400",
  "Outreach Department": "from-yellow-400 to-orange-400",
  "Social Media Department": "from-pink-400 to-purple-400",
  "Technical Department": "from-cyan-400 to-blue-400",
};

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

function TeamMemberCard({
  member,
  index,
}: {
  member: TeamMember;
  index: number;
}) {
  const gradientColor =
    roleColors[member.role] || "from-purple-400 to-pink-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6 }}
      className="group"
    >
      <div className="relative h-full bg-gradient-to-br from-purple-900/30 via-black/40 to-purple-900/20 backdrop-blur-sm rounded-xl border border-purple-500/20 p-4 sm:p-6 hover:border-purple-400/40 transition-all duration-300">
        {/* Subtle glow on hover */}
        <div className="absolute -inset-1 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 rounded-xl blur-lg transition-all duration-300 -z-10" />

        {/* Avatar */}
        <div className="relative mx-auto mb-3 sm:mb-4">
          <div
            className={`w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full bg-gradient-to-br ${gradientColor} p-0.5`}
          >
            <div className="w-full h-full rounded-full bg-[#0E1A2B] flex items-center justify-center">
              <span
                className={`font-heading text-2xl sm:text-3xl font-bold bg-gradient-to-br ${gradientColor} bg-clip-text text-transparent`}
              >
                {member.name.charAt(0)}
              </span>
            </div>
          </div>
          {/* Glow behind avatar */}
          <div
            className={`absolute inset-0 w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full bg-gradient-to-br ${gradientColor} opacity-20 blur-xl -z-10`}
          />
        </div>

        {/* Member Info */}
        <h3 className="font-heading text-base sm:text-lg font-bold text-center text-white mb-1">
          {member.name}
        </h3>
        <p
          className={`font-accent text-[10px] sm:text-xs text-center bg-gradient-to-r ${gradientColor} bg-clip-text text-transparent font-medium mb-3 sm:mb-4`}
        >
          {member.role}
        </p>

        {/* Social Links */}
        <div className="flex gap-2 sm:gap-3 justify-center">
          {member.linkedin && (
            <motion.a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-purple-900/50 border border-purple-500/30 flex items-center justify-center text-gray-300 hover:text-white hover:bg-purple-500/50 hover:border-purple-400/50 transition-all duration-300"
            >
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </motion.a>
          )}
          {member.instagram && (
            <motion.a
              href={member.instagram}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-purple-900/50 border border-purple-500/30 flex items-center justify-center text-gray-300 hover:text-white hover:bg-pink-500/50 hover:border-pink-400/50 transition-all duration-300"
            >
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </motion.a>
          )}
        </div>

        {/* Bottom Accent */}
        <div
          className={`mt-4 sm:mt-5 h-0.5 bg-gradient-to-r ${gradientColor} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full`}
        />
      </div>
    </motion.div>
  );
}

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-[#0E1A2B] pt-20 sm:pt-24 pb-16 sm:pb-20 overflow-hidden">
      {/* Background effects - smaller on mobile */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/10 rounded-full blur-[80px] sm:blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 sm:w-96 sm:h-96 bg-pink-500/10 rounded-full blur-[80px] sm:blur-[128px]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-4 sm:mb-6">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-300 via-pink-300 to-purple-400 bg-clip-text text-transparent">
            Meet Our Team
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={0.15} className="text-center mb-10 sm:mb-16">
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed px-2">
            The passionate individuals driving BVP Optica forward through
            innovation and collaboration.
          </p>
        </AnimatedSection>

        {/* Core Team */}
        <AnimatedSection delay={0.25} className="mb-8 sm:mb-10">
          <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Core Team
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-12 sm:mb-16">
          {coreTeam.map((member, index) => (
            <TeamMemberCard key={index} member={member} index={index} />
          ))}
        </div>

        {/* Department Heads */}
        <AnimatedSection delay={0.3} className="mb-8 sm:mb-10">
          <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Department Heads
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {departmentHeads.map((member, index) => (
            <TeamMemberCard key={index} member={member} index={index} />
          ))}
        </div>
      </div>
    </main>
  );
}
