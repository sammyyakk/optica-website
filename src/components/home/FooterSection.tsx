"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

export function FooterSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const socialLinks = [
    {
      name: "Instagram",
      href: "https://instagram.com/bvpoptica",
      hoverColor: "hover:text-pink-400",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/bvp-optica/",
      hoverColor: "hover:text-blue-400",
    },
    {
      name: "Twitter",
      href: "https://twitter.com/bvpoptica",
      hoverColor: "hover:text-purple-400",
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

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center sm:text-left"
            >
              <h3 className="font-heading text-lg sm:text-xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
                BVP OPTICA
              </h3>
              <p className="font-body text-gray-400 text-sm leading-relaxed">
                Bharati Vidyapeeth&apos;s College of Engineering
                <br />
                A-4, Paschim Vihar, New Delhi - 110063
              </p>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center sm:text-left"
            >
              <h3 className="font-heading text-lg sm:text-xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
                Contact
              </h3>
              <p className="font-body text-gray-400 text-sm">
                Email:{" "}
                <a
                  href="mailto:bvpoptica@gmail.com"
                  className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
                >
                  bvpoptica@gmail.com
                </a>
              </p>
            </motion.div>

            {/* Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center sm:text-left sm:col-span-2 md:col-span-1"
            >
              <h3 className="font-heading text-lg sm:text-xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
                Follow Us
              </h3>
              <div className="flex gap-4 sm:gap-5 flex-wrap justify-center sm:justify-start">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-400 ${link.hoverColor} transition-all duration-300 text-sm font-medium hover:scale-105`}
                  >
                    {link.name}
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
            <p className="text-gray-500">
              © 2025 BVP Optica. All rights reserved.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
