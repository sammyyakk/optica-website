"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "@/lib/theme/ThemeProvider";
import ThemeToggle from "@/components/ui/ThemeToggle";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    // Glass morphism on scroll
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;

    // Animate navbar entrance
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        delay: 0.5,
      }
    );

    // Section highlighting
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
    <motion.nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/80 dark:bg-background-dark/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo with particle animation */}
          <Link href="/" className="relative group">
            <motion.div
              className="relative h-12 w-auto flex items-center"
              onHoverStart={() => setIsLogoHovered(true)}
              onHoverEnd={() => setIsLogoHovered(false)}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {/* Logo Image - switches based on scroll state and theme */}
              <Image
                src={
                  theme === "dark" || !isScrolled
                    ? "/navbar_logo_light.png"
                    : "/navbar_logo_dark.png"
                }
                alt="BVP Optica Logo"
                width={180}
                height={48}
                className="h-12 w-auto object-contain transition-opacity duration-300"
                priority
              />

              {/* Particle effect on hover */}
              {isLogoHovered && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-photon-gold rounded-full"
                      initial={{
                        x: "50%",
                        y: "50%",
                      }}
                      animate={{
                        x: `${50 + Math.cos((i * Math.PI) / 6) * 100}%`,
                        y: `${50 + Math.sin((i * Math.PI) / 6) * 100}%`,
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.05,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) =>
              item.isRoute ? (
                <Link key={item.name} href={item.href}>
                  <motion.span
                    className={`relative px-4 py-2 font-accent text-sm lg:text-base transition-colors cursor-pointer ${
                      isScrolled
                        ? "text-text-primary dark:text-white hover:text-optica-blue dark:hover:text-quantum-violet"
                        : "text-white hover:text-photon-gold"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.name}
                  </motion.span>
                </Link>
              ) : (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-4 py-2 font-accent text-sm lg:text-base transition-colors ${
                    activeSection === item.href.slice(1)
                      ? "text-photon-gold"
                      : isScrolled
                      ? "text-text-primary dark:text-white hover:text-optica-blue dark:hover:text-quantum-violet"
                      : "text-white hover:text-photon-gold"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                  {activeSection === item.href.slice(1) && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-photon-gold to-laser-magenta"
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

            {/* Theme Toggle */}
            <div className="ml-4">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Button - Circular Radial */}
          <motion.button
            className="md:hidden relative w-12 h-12 flex items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <motion.div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isScrolled
                  ? "bg-optica-blue/20 dark:bg-quantum-violet/20"
                  : "bg-white/20"
              } backdrop-blur-md`}
              animate={isMenuOpen ? { scale: 1.1 } : { scale: 1 }}
            >
              <div className="relative w-6 h-5">
                <motion.span
                  className={`absolute left-0 w-full h-0.5 rounded-full ${
                    isScrolled
                      ? "bg-optica-blue dark:bg-quantum-violet"
                      : "bg-white"
                  }`}
                  animate={
                    isMenuOpen
                      ? { top: "50%", rotate: 45, y: "-50%" }
                      : { top: 0, rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 rounded-full ${
                    isScrolled
                      ? "bg-optica-blue dark:bg-quantum-violet"
                      : "bg-white"
                  }`}
                  animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className={`absolute left-0 bottom-0 w-full h-0.5 rounded-full ${
                    isScrolled
                      ? "bg-optica-blue dark:bg-quantum-violet"
                      : "bg-white"
                  }`}
                  animate={
                    isMenuOpen
                      ? { bottom: "50%", rotate: -45, y: "50%" }
                      : { bottom: 0, rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu - Radial Expansion */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            className="md:hidden fixed inset-0 z-40 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            role="dialog"
            aria-label="Mobile navigation menu"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-optica-blue/95 via-quantum-violet/95 to-background-dark/95 backdrop-blur-2xl"
              initial={{ scale: 0, borderRadius: "100%" }}
              animate={{ scale: 2, borderRadius: "0%" }}
              exit={{ scale: 0, borderRadius: "100%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{ transformOrigin: "top right" }}
            />

            {/* Menu Items */}
            <motion.div
              className="relative z-10 flex flex-col items-center space-y-8"
              initial="closed"
              animate="open"
              exit="closed"
            >
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="font-heading text-4xl font-bold text-white hover:text-photon-gold transition-colors"
                  variants={{
                    closed: { opacity: 0, y: 20, scale: 0.8 },
                    open: { opacity: 1, y: 0, scale: 1 },
                  }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                  whileHover={{ scale: 1.1, x: 10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
