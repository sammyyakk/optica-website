"use client";

import { FixedParticleBackground } from "@/components/ui/FixedParticleBackground";
import { SectionSnapScroll } from "@/components/ui/SectionSnapScroll";
import { HeroSection } from "@/components/home/HeroSection";
import WhoWeAreSection from "@/components/home/WhoWeAreSection";
import LifeAsMemberSection from "@/components/home/LifeAsMemberSection";
import FacultyAdvisorSection from "@/components/home/FacultyAdvisorSection";
import { FooterSection } from "@/components/home/FooterSection";

export default function HomePage() {
  const sections = [
    <HeroSection key="hero" />,
    <WhoWeAreSection key="about" />,
    <LifeAsMemberSection key="benefits" />,
    <FacultyAdvisorSection key="faculty" />,
    <FooterSection key="footer" />,
  ];

  const sectionNames = [
    "Home",
    "Who We Are",
    "Life as a Member",
    "Faculty Advisor",
    "Join Us",
  ];

  return (
    <main
      id="main-content"
      className="relative min-h-screen bg-transparent text-white"
    >
      {/* Fixed particle background - stays constant */}
      <FixedParticleBackground />

      {/* Section snap scroll system - handles all scrolling */}
      <div className="relative z-10">
        <SectionSnapScroll sections={sections} sectionNames={sectionNames} />
      </div>
    </main>
  );
}
