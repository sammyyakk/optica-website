"use client";

import dynamic from "next/dynamic";
import {
  RevealElement,
  ScrollProgress,
} from "@/lib/animations/ScrollAnimations";

const Hero3D = dynamic(() => import("@/components/three/Hero3D"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-br from-optica-purple via-quantum-violet to-optica-black" />
  ),
});

export default function HomePage() {
  return (
    <main
      id="main-content"
      className="min-h-screen bg-optica-black transition-colors duration-300"
    >
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-optica-purple via-quantum-violet to-optica-black overflow-hidden"
      >
        {/* 3D Background */}
        <Hero3D />

        <div className="container mx-auto px-4 text-center text-white z-10 relative">
          <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
            BVP OPTICA
          </h1>
          <p className="font-body text-xl md:text-2xl mb-8 max-w-3xl mx-auto drop-shadow-md">
            Igniting passion for optics and photonics through innovation,
            education, and global collaboration
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="#about"
              className="px-8 py-3 bg-quantum-violet text-white font-accent rounded-button hover:bg-optica-purple hover:scale-105 transition-all shadow-lg hover:shadow-xl"
            >
              Learn More
            </a>
            <a
              href="#join"
              className="px-8 py-3 border-2 border-white text-white font-accent rounded-button hover:bg-white hover:text-optica-purple hover:scale-105 transition-all shadow-lg"
            >
              Join Us
            </a>
          </div>
        </div>
      </section>

      {/* WHO WE ARE Section */}
      <section id="about" className="py-20 bg-surface">
        <div className="container mx-auto px-4">
          <RevealElement direction="up">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-center mb-12 text-quantum-violet">
              WHO WE ARE
            </h2>
          </RevealElement>
          <RevealElement direction="up" delay={0.2}>
            <p className="font-body text-lg text-text-secondary max-w-4xl mx-auto text-center leading-relaxed">
              BVP-OPTICA is a vibrant student chapter at Bharati Vidyapeeth's
              College of Engineering, committed to advancing optics and
              photonics. By joining us, you become part of a global network with
              international research opportunities, exclusive access to
              journals, and exciting events. Our mission is to ignite a passion
              for these fields through education, innovation, and global
              collaboration. We offer unique chances for scholarships, travel
              grants, and engaging activities like quizzes and ideathons. At BVP
              Optica, we nurture a close-knit community where collaboration
              drives both personal and collective growth.
            </p>
          </RevealElement>
        </div>
      </section>

      {/* LIFE AS A MEMBER Section */}
      <section id="events" className="py-20 bg-optica-black">
        <div className="container mx-auto px-4">
          <RevealElement direction="up">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-center mb-12 text-quantum-violet">
              LIFE AS A MEMBER
            </h2>
          </RevealElement>
          <RevealElement direction="up" delay={0.2}>
            <p className="font-body text-lg text-text-secondary max-w-4xl mx-auto text-center leading-relaxed mb-12">
              Joining BVP-OPTICA means becoming part of a global network with a
              strong international presence, offering exciting research
              opportunities and exclusive access to journals and monthly
              magazines. Members can benefit from scholarships and travel grants
              for international conferences and participate in webinars led by
              global experts. Beyond academics, the community thrives through
              close-knit interactions, lab visits, and engaging activities like
              quizzes, photography competitions and ideathons.
            </p>
          </RevealElement>
        </div>
      </section>

      {/* Faculty Advisor Section */}
      <section id="team" className="py-20 bg-surface">
        <div className="container mx-auto px-4">
          <RevealElement direction="up">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-center mb-12 text-quantum-violet">
              OUR FACULTY ADVISOR
            </h2>
          </RevealElement>
          <RevealElement direction="up" delay={0.2}>
            <div className="max-w-4xl mx-auto bg-surface rounded-card shadow-card p-8 border border-optica-purple/15">
              <h3 className="font-heading text-3xl font-bold text-center mb-4 text-quantum-violet">
                Dr. Yugnanda Puri
              </h3>
              <p className="font-body text-text-secondary leading-relaxed">
                Having founded this club in 2019, Dr. Puri has been key in
                establishing and nurturing it ever since. With a Ph.D. in
                Optical Communication from Thapar Institute of Engineering &
                Technology, and both a Master's and bachelor's degree in
                Electronics & Communication Engineering, Dr. Puri has been a
                driving force behind BVP Optica's growth and success.
              </p>
              <p className="font-body text-text-secondary leading-relaxed mt-4">
                Currently serving as the Dean of Research and Development and an
                Associate Professor at BVCOE, Dr. Puri ensures that the
                subchapter thrives by providing valuable resources, guidance,
                and encouragement to our members.
              </p>
            </div>
          </RevealElement>
        </div>
      </section>

      {/* Footer */}
      <footer id="join" className="bg-optica-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-heading text-xl font-bold mb-4 text-quantum-violet">
                BVP OPTICA
              </h3>
              <p className="font-body text-sm text-gray-300">
                Bharati Vidyapeeth's College of Engineering
                <br />
                A-4, Paschim Vihar, New Delhi - 110063
              </p>
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold mb-4 text-quantum-violet">
                Contact
              </h3>
              <p className="font-body text-sm text-gray-300">
                Email:{" "}
                <a
                  href="mailto:bvpoptica@gmail.com"
                  className="hover:text-quantum-violet transition-colors"
                >
                  bvpoptica@gmail.com
                </a>
              </p>
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold mb-4 text-quantum-violet">
                Follow Us
              </h3>
              <div className="flex gap-4 flex-wrap">
                <a
                  href="https://instagram.com/bvpoptica"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-quantum-violet transition-colors text-gray-300"
                >
                  Instagram
                </a>
                <a
                  href="https://www.linkedin.com/company/bvp-optica/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-quantum-violet transition-colors text-gray-300"
                >
                  LinkedIn
                </a>
                <a
                  href="https://twitter.com/bvpoptica"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-quantum-violet transition-colors text-gray-300"
                >
                  Twitter
                </a>
              </div>
            </div>
          </div>
          <div className="text-center text-sm border-t border-gray-700 pt-8">
            <p className="text-gray-400">
              &copy; 2025 BVP Optica. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
