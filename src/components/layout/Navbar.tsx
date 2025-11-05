"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const navItemsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;

    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "cubic-bezier(0.22, 1, 0.36, 1)",
        delay: 0.3,
      }
    );

    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    target: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(target);
    if (element) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: element, offsetY: 80 },
        ease: "expo.inOut",
      });
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { name: "Home", href: "/", isRoute: true },
    { name: "About", href: "/about", isRoute: true },
    { name: "Events", href: "/events", isRoute: true },
    { name: "Team", href: "/team", isRoute: true },
    { name: "Join", href: "#join", isRoute: false },
  ];

  return (
    <>
      <motion.nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-black/75 backdrop-blur-2xl border-b border-white/10 shadow-[0_24px_60px_-24px_rgba(168,144,255,0.4)]"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="transition-transform duration-300"
          >
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative">
                <Image
                  src="/navbar_logo_dark.png"
                  alt="BVP Optica Logo"
                  width={440}
                  height={116}
                  className="h-8 md:h-10 w-auto object-contain dark:hidden"
                  quality={100}
                  priority
                  unoptimized
                />
                <Image
                  src="/navbar_logo_light.png"
                  alt="BVP Optica Logo"
                  width={440}
                  height={116}
                  className="h-8 md:h-10 w-auto object-contain hidden dark:block"
                  quality={100}
                  priority
                  unoptimized
                />
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            {navItems.map((item, index) =>
              item.isRoute ? (
                <Link key={item.name} href={item.href}>
                  <motion.span
                    ref={(el) => {
                      navItemsRef.current[index] = el;
                    }}
                    className={`relative px-4 py-2 font-accent text-sm lg:text-base font-medium transition-all duration-300 cursor-pointer group ${
                      isScrolled
                        ? "text-white/80 hover:text-white"
                        : "text-white/70 hover:text-white"
                    }`}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.name}
                    <motion.div
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full"
                      initial={{ scaleX: 0, opacity: 0 }}
                      whileHover={{ scaleX: 1, opacity: 1 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      style={{ transformOrigin: "center" }}
                    />
                  </motion.span>
                </Link>
              ) : (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-4 py-2 font-accent text-sm lg:text-base font-medium transition-all duration-300 group ${
                    activeSection === item.href.slice(1)
                      ? "text-white"
                      : isScrolled
                      ? "text-white/80 hover:text-white"
                      : "text-white/70 hover:text-white"
                  }`}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                  {activeSection === item.href.slice(1) && (
                    <motion.div
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full"
                      layoutId="activeSection"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.a>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden relative w-12 h-12 flex items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <motion.div
              className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 ${
                isScrolled
                  ? "bg-white/15 hover:bg-white/25"
                  : "bg-white/20 hover:bg-white/30"
              }`}
              animate={isMenuOpen ? { scale: 1.15 } : { scale: 1 }}
            >
              <div className="relative w-6 h-5">
                <motion.span
                  className={`absolute left-0 w-full h-0.5 rounded-full ${
                    isScrolled ? "bg-white" : "bg-white"
                  }`}
                  animate={
                    isMenuOpen
                      ? { top: "50%", rotate: 45, y: "-50%" }
                      : { top: 0, rotate: 0, y: 0 }
                  }
                  transition={{
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
                <motion.span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 rounded-full ${
                    isScrolled ? "bg-white" : "bg-white"
                  }`}
                  animate={
                    isMenuOpen
                      ? { opacity: 0, scale: 0.8 }
                      : { opacity: 1, scale: 1 }
                  }
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className={`absolute left-0 bottom-0 w-full h-0.5 rounded-full ${
                    isScrolled ? "bg-white" : "bg-white"
                  }`}
                  animate={
                    isMenuOpen
                      ? { bottom: "50%", rotate: -45, y: "50%" }
                      : { bottom: 0, rotate: 0, y: 0 }
                  }
                  transition={{
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </div>
            </motion.div>
          </motion.button>
        </div>
      </div>
    </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="md:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Menu Panel */}
            <motion.div
              id="mobile-menu"
              className="md:hidden fixed top-0 right-0 bottom-0 z-50 w-[85%] max-w-sm bg-gradient-to-b from-[#0a0118] via-[#0d0320] to-[#050010] border-l border-white/10 shadow-2xl overflow-y-auto"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              role="dialog"
              aria-label="Mobile navigation menu"
            >
              {/* Close Button */}
              <div className="flex justify-end p-6">
                <motion.button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors"
                  whileHover={{ scale: 1.15, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close menu"
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>
              </div>

              {/* Logo */}
              <div className="px-8 mb-12">
                <Image
                  src="/navbar_logo_light.png"
                  alt="BVP Optica"
                  width={220}
                  height={58}
                  className="h-10 w-auto"
                  unoptimized
                />
              </div>

              {/* Menu Items */}
              <nav className="px-8 space-y-3">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 50, y: 20 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{
                      delay: index * 0.08,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {item.isRoute ? (
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <motion.div
                          className="group relative py-4 px-6 rounded-2xl bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 border border-white/20 hover:border-white/40 transition-all duration-300 cursor-pointer backdrop-blur-md"
                          whileHover={{
                            x: 12,
                            boxShadow:
                              "0 20px 40px -20px rgba(168,144,255,0.6)",
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-heading text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                              {item.name}
                            </span>
                            <motion.svg
                              className="w-5 h-5 text-white/60 group-hover:text-purple-300 transition-colors"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              initial={{ x: 0 }}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </motion.svg>
                          </div>
                        </motion.div>
                      </Link>
                    ) : (
                      <motion.a
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className="group relative block py-4 px-6 rounded-2xl bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 border border-white/20 hover:border-white/40 transition-all duration-300 cursor-pointer backdrop-blur-md"
                        whileHover={{
                          x: 12,
                          boxShadow: "0 20px 40px -20px rgba(168,144,255,0.6)",
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-heading text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                            {item.name}
                          </span>
                          <motion.svg
                            className="w-5 h-5 text-white/60 group-hover:text-purple-300 transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            initial={{ x: 0 }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </motion.svg>
                        </div>
                      </motion.a>
                    )}
                  </motion.div>
                ))}
              </nav>

              {/* Bottom Decoration */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent rounded-full" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
