"use client";

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
          ? "bg-black/85 backdrop-blur-xl border-b border-primary-purple/20 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="relative group">
            <div className="relative h-16 w-auto flex items-center transition-transform duration-300 group-hover:scale-105">
              {/* Light mode logo */}
              <Image
                src="/navbar_logo_dark.png"
                alt="BVP Optica Logo"
                width={220}
                height={58}
                className="h-10 w-auto object-contain dark:hidden"
                quality={100}
                priority
              />
              {/* Dark mode logo */}
              <Image
                src="/navbar_logo_light.png"
                alt="BVP Optica Logo"
                width={220}
                height={58}
                className="h-10 w-auto object-contain hidden dark:block"
                quality={100}
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) =>
              item.isRoute ? (
                <Link key={item.name} href={item.href}>
                  <motion.span
                    className={`relative px-4 py-2 font-accent text-sm lg:text-base transition-colors cursor-pointer ${
                      isScrolled
                        ? "text-text-primary hover:text-primary-purple"
                        : "text-white hover:text-primary-purple"
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
                      ? "text-primary-purple"
                      : isScrolled
                      ? "text-text-primary hover:text-primary-purple"
                      : "text-white hover:text-primary-purple"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                  {activeSection === item.href.slice(1) && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-purple to-dark-purple"
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
                isScrolled ? "bg-primary-purple/30" : "bg-white/20"
              } backdrop-blur-md`}
              animate={isMenuOpen ? { scale: 1.1 } : { scale: 1 }}
            >
              <div className="relative w-6 h-5">
                <motion.span
                  className={`absolute left-0 w-full h-0.5 rounded-full ${
                    isScrolled ? "bg-primary-purple" : "bg-white"
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
                    isScrolled ? "bg-primary-purple" : "bg-white"
                  }`}
                  animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className={`absolute left-0 bottom-0 w-full h-0.5 rounded-full ${
                    isScrolled ? "bg-primary-purple" : "bg-white"
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
              className="absolute inset-0 bg-gradient-to-br from-primary-purple/95 via-dark-purple/95 to-black/95 backdrop-blur-2xl"
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
                  className="font-heading text-4xl font-bold text-white hover:text-primary-purple transition-colors"
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
