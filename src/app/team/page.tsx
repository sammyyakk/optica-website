"use client";

import { motion } from "motion/react";
import {
  RevealElement,
  StaggerReveal,
} from "@/lib/animations/ScrollAnimations";

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
  { name: "Content Head", role: "Content Department", linkedin: "#" },
  { name: "Design Head", role: "Design Department", linkedin: "#" },
  { name: "Logistics Head", role: "Logistics Department", linkedin: "#" },
  { name: "Outreach Head", role: "Outreach Department", linkedin: "#" },
  { name: "Social Media Head", role: "Social Media Department", linkedin: "#" },
];

function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="group"
    >
      <div className="bg-surface rounded-card shadow-card p-6 border border-optica-purple/15 hover:border-quantum-violet/40 hover:shadow-2xl transition-all duration-300">
        {/* Avatar Placeholder */}
        <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-optica-purple to-quantum-violet flex items-center justify-center overflow-hidden">
          <div className="w-full h-full flex items-center justify-center text-white font-heading text-4xl">
            {member.name.charAt(0)}
          </div>
        </div>

        {/* Member Info */}
        <h3 className="font-heading text-xl font-bold text-center text-text-primary mb-2 group-hover:text-quantum-violet transition-colors">
          {member.name}
        </h3>
        <p className="font-accent text-sm text-center text-quantum-violet mb-4">
          {member.role}
        </p>

        {/* Social Links */}
        <div className="flex gap-4 justify-center">
          {member.linkedin && (
            <motion.a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-optica-purple flex items-center justify-center text-white hover:bg-quantum-violet transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </motion.a>
          )}
          {member.instagram && (
            <motion.a
              href={member.instagram}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-quantum-violet flex items-center justify-center text-white hover:bg-optica-purple transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </motion.a>
          )}
        </div>

        {/* Bottom Accent */}
        <div className="mt-6 h-1 bg-gradient-to-r from-optica-purple via-quantum-violet to-optica-purple transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>
    </motion.div>
  );
}

export default function TeamPage() {
  return (
    <main
      id="main-content"
      className="min-h-screen bg-optica-black transition-colors duration-300 pt-24 pb-20"
    >
      <div className="container mx-auto px-4">
        <RevealElement direction="up">
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-center mb-6 text-quantum-violet">
            Meet Our Team
          </h1>
        </RevealElement>

        <RevealElement direction="up" delay={0.2}>
          <p className="font-body text-lg text-text-secondary max-w-3xl mx-auto text-center mb-16 leading-relaxed">
            The passionate individuals driving BVP Optica forward through
            innovation and collaboration.
          </p>
        </RevealElement>

        {/* Core Team */}
        <RevealElement direction="up" delay={0.3}>
          <h2 className="font-heading text-3xl font-bold text-center mb-10 text-quantum-violet">
            Core Team
          </h2>
        </RevealElement>

        <StaggerReveal
          staggerDelay={0.15}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {coreTeam.map((member, index) => (
            <TeamMemberCard key={index} member={member} />
          ))}
        </StaggerReveal>

        {/* Department Heads */}
        <RevealElement direction="up">
          <h2 className="font-heading text-3xl font-bold text-center mb-10 text-quantum-violet">
            Department Heads
          </h2>
        </RevealElement>

        <StaggerReveal
          staggerDelay={0.1}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {departmentHeads.map((member, index) => (
            <TeamMemberCard key={index} member={member} />
          ))}
        </StaggerReveal>
      </div>
    </main>
  );
}
