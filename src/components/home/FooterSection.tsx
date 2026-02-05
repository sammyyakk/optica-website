"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Image from "next/image";

// SVG Icons for social platforms
const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg
    className="w-3.5 h-3.5 ml-1"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
);

export function FooterSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const socialLinks = [
    {
      name: "Instagram",
      href: "https://instagram.com/bvpoptica",
      icon: InstagramIcon,
      hoverColor: "hover:text-pink-400 hover:bg-pink-400/10",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/bvp-optica/",
      icon: LinkedInIcon,
      hoverColor: "hover:text-blue-400 hover:bg-blue-400/10",
    },
    {
      name: "Twitter",
      href: "https://twitter.com/bvpoptica",
      icon: TwitterIcon,
      hoverColor: "hover:text-purple-400 hover:bg-purple-400/10",
    },
  ];

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen flex items-center justify-center py-10 sm:py-12 md:py-20 overflow-hidden"
    >
      <div className="relative z-20 mx-auto w-full max-w-4xl px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-gradient-to-br from-purple-900/20 via-black/30 to-purple-900/15 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-5 sm:p-8 md:p-10"
        >
          {/* Subtle background glow */}
          <div className="absolute inset-0 -m-2 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-3xl blur-xl -z-10" />

          {/* Footer Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6 sm:mb-8"
          >
            <Image
              src="/footer_logo.png"
              alt="BVP Optica"
              width={200}
              height={60}
              className="h-12 sm:h-14 md:h-16 w-auto object-contain"
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
            {/* Brand & Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center sm:text-left"
            >
              <h3 className="font-heading text-lg sm:text-xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
                About Us
              </h3>
              <p className="font-body text-gray-400 text-sm leading-relaxed mb-4">
                Bharati Vidyapeeth&apos;s College of Engineering
                <br />
                A-4, Paschim Vihar, New Delhi - 110063
              </p>

              {/* Button-style links */}
              <div className="flex flex-col gap-2 sm:gap-3">
                <a
                  href="https://bvcoend.ac.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center sm:justify-start gap-2 px-4 py-2 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-300 hover:bg-purple-500/20 hover:border-purple-400/50 hover:text-purple-200 transition-all duration-300 text-sm font-medium group"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  <span>BVCOE Delhi</span>
                  <ExternalLinkIcon />
                </a>
                <a
                  href="https://www.optica.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center sm:justify-start gap-2 px-4 py-2 rounded-lg bg-pink-500/10 border border-pink-500/30 text-pink-300 hover:bg-pink-500/20 hover:border-pink-400/50 hover:text-pink-200 transition-all duration-300 text-sm font-medium group"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                  <span>Optica Official</span>
                  <ExternalLinkIcon />
                </a>
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center sm:text-left"
            >
              <h3 className="font-heading text-lg sm:text-xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
                Contact
              </h3>
              <div className="space-y-3">
                <a
                  href="mailto:bvpoptica@gmail.com"
                  className="inline-flex items-center justify-center sm:justify-start gap-2 text-gray-400 hover:text-purple-300 transition-colors group"
                >
                  <svg
                    className="w-4 h-4 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm font-medium">
                    bvpoptica@gmail.com
                  </span>
                </a>
              </div>
            </motion.div>

            {/* Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center sm:text-left sm:col-span-2 lg:col-span-1"
            >
              <h3 className="font-heading text-lg sm:text-xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
                Follow Us
              </h3>
              <div className="flex gap-3 flex-wrap justify-center sm:justify-start">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 ${link.hoverColor} transition-all duration-300 group`}
                    title={link.name}
                  >
                    <link.icon />
                    <span className="text-sm font-medium hidden sm:inline">
                      {link.name}
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Divider & Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center text-[10px] sm:text-xs border-t border-purple-500/20 pt-4 sm:pt-6"
          >
            <p className="text-gray-500 mb-2">
              © 2025 BVP Optica. All rights reserved.
            </p>
            <p className="text-gray-500 mb-2">
              Made with <span className="text-pink-400">❤</span> by{" "}
              <a
                href="https://www.github.com/sammyyakk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                Samyak Jain
              </a>
            </p>
            <p className="text-gray-500">
              <a
                href="/maintainers"
                className="text-amber-400 hover:text-amber-300 transition-colors"
              >
                Meet the Website Maintainers
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
