"use client";

import { RevealElement } from "@/lib/animations/ScrollAnimations";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main
      id="main-content"
      className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-300 pt-24 pb-20"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <RevealElement direction="up">
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-center mb-6 text-optica-blue dark:text-quantum-violet">
            About BVP Optica
          </h1>
        </RevealElement>

        <RevealElement direction="up" delay={0.2}>
          <p className="font-body text-lg text-text-secondary dark:text-gray-300 max-w-3xl mx-auto text-center mb-16 leading-relaxed">
            Igniting passion for optics and photonics through education,
            innovation, and global collaboration.
          </p>
        </RevealElement>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <RevealElement direction="left" delay={0.3}>
            <div className="bg-white dark:bg-background-dark/80 rounded-card shadow-card p-8 border border-transparent dark:border-quantum-violet/20">
              <h2 className="font-heading text-3xl font-bold mb-4 text-optica-blue dark:text-quantum-violet">
                Our Mission
              </h2>
              <p className="font-body text-text-secondary dark:text-gray-300 leading-relaxed">
                To advance the fields of optics and photonics by providing
                students with opportunities for learning, research, and
                collaboration. We strive to create a community where innovation
                thrives and members can explore cutting-edge technologies.
              </p>
            </div>
          </RevealElement>

          <RevealElement direction="right" delay={0.3}>
            <div className="bg-white dark:bg-background-dark/80 rounded-card shadow-card p-8 border border-transparent dark:border-quantum-violet/20">
              <h2 className="font-heading text-3xl font-bold mb-4 text-quantum-violet dark:text-photon-gold">
                Our Vision
              </h2>
              <p className="font-body text-text-secondary dark:text-gray-300 leading-relaxed">
                To establish BVP Optica as a leading student chapter that
                empowers the next generation of scientists and engineers. We
                envision a future where our members contribute significantly to
                technological advancements in optics and photonics globally.
              </p>
            </div>
          </RevealElement>
        </div>

        {/* What We Do */}
        <RevealElement direction="up" delay={0.4}>
          <h2 className="font-heading text-4xl font-bold text-center mb-12 text-optica-blue dark:text-quantum-violet">
            What We Do
          </h2>
        </RevealElement>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            {
              title: "Workshops & Seminars",
              description:
                "Interactive sessions with industry experts and researchers covering the latest advancements in optics and photonics.",
              icon: "🎓",
            },
            {
              title: "Research Opportunities",
              description:
                "Access to cutting-edge research projects and collaborations with leading institutions worldwide.",
              icon: "🔬",
            },
            {
              title: "Networking Events",
              description:
                "Connect with professionals, alumni, and peers through our extensive global network.",
              icon: "🌐",
            },
            {
              title: "Competitions",
              description:
                "Participate in ideathons, quizzes, and technical competitions to showcase your skills.",
              icon: "🏆",
            },
            {
              title: "Publications",
              description:
                "Exclusive access to journals, magazines, and research papers in the field.",
              icon: "📚",
            },
            {
              title: "Community",
              description:
                "Join a close-knit community of passionate individuals driving innovation together.",
              icon: "🤝",
            },
          ].map((item, index) => (
            <RevealElement key={index} direction="up" delay={0.5 + index * 0.1}>
              <div className="bg-white dark:bg-background-dark/80 rounded-card shadow-card p-6 border border-transparent dark:border-quantum-violet/20 hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="font-heading text-xl font-bold mb-3 text-text-primary dark:text-white group-hover:text-optica-blue dark:group-hover:text-quantum-violet transition-colors">
                  {item.title}
                </h3>
                <p className="font-body text-text-secondary dark:text-gray-300 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </RevealElement>
          ))}
        </div>

        {/* Faculty Advisor */}
        <RevealElement direction="up" delay={0.8}>
          <h2 className="font-heading text-4xl font-bold text-center mb-12 text-optica-blue dark:text-quantum-violet">
            Our Faculty Advisor
          </h2>
        </RevealElement>

        <RevealElement direction="up" delay={0.9}>
          <div className="max-w-4xl mx-auto bg-white dark:bg-background-dark/80 rounded-card shadow-card p-8 border border-transparent dark:border-quantum-violet/20">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-optica-blue to-quantum-violet flex items-center justify-center text-white font-heading text-6xl">
                Dr. P
              </div>
              <div className="flex-1">
                <h3 className="font-heading text-3xl font-bold mb-4 text-quantum-violet dark:text-photon-gold">
                  Dr. Yugnanda Puri
                </h3>
                <p className="font-body text-text-secondary dark:text-gray-300 leading-relaxed mb-4">
                  Having founded this club in 2019, Dr. Puri has been key in
                  establishing and nurturing it ever since. With a Ph.D. in
                  Optical Communication from Thapar Institute of Engineering &
                  Technology, and both a Master's and bachelor's degree in
                  Electronics & Communication Engineering, Dr. Puri has been a
                  driving force behind BVP Optica's growth and success.
                </p>
                <p className="font-body text-text-secondary dark:text-gray-300 leading-relaxed">
                  Currently serving as the Dean of Research and Development and
                  an Associate Professor at BVCOE, Dr. Puri ensures that the
                  subchapter thrives by providing valuable resources, guidance,
                  and encouragement to our members.
                </p>
              </div>
            </div>
          </div>
        </RevealElement>
      </div>
    </main>
  );
}
