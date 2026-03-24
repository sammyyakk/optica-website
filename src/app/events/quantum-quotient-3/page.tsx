"use client";

import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef, useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { FooterSection } from "@/components/home/FooterSection";

// SVG Icons
const Icons = {
  Atom: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="1" />
      <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
      <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
    </svg>
  ),
  Brain: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
    </svg>
  ),
  Zap: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </svg>
  ),
  Trophy: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  ),
  Calendar: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  ),
  Clock: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Users: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Target: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  Instagram: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  ),
  Mail: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  ArrowRight: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  ),
  Waves: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    </svg>
  ),
  ChevronDown: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),
};

// Quantum Particle Animation - Atoms with orbiting electrons
function QuantumAtom({ className = "" }: { className?: string }) {
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      orbitRadius: 100 + (i % 3) * 80,
      size: 3 + Math.random() * 4,
      duration: 8 + (i % 5) * 2,
      delay: (i * 0.5) % 3,
      color: ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981"][i % 4],
    }));
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Central nucleus */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-cyan-400"
          style={{
            boxShadow:
              "0 0 60px rgba(59, 130, 246, 0.8), 0 0 100px rgba(139, 92, 246, 0.6)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Inner glow pulses */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border-2 border-blue-400"
            animate={{
              scale: [1, 2.5, 1],
              opacity: [0.6, 0, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.7,
            }}
          />
        ))}
      </div>

      {/* Orbiting particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute top-1/2 left-1/2"
          style={{
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            x: [
              Math.cos(0) * particle.orbitRadius,
              Math.cos(Math.PI / 2) * particle.orbitRadius,
              Math.cos(Math.PI) * particle.orbitRadius,
              Math.cos((3 * Math.PI) / 2) * particle.orbitRadius,
              Math.cos(2 * Math.PI) * particle.orbitRadius,
            ],
            y: [
              Math.sin(0) * particle.orbitRadius,
              Math.sin(Math.PI / 2) * particle.orbitRadius,
              Math.sin(Math.PI) * particle.orbitRadius,
              Math.sin((3 * Math.PI) / 2) * particle.orbitRadius,
              Math.sin(2 * Math.PI) * particle.orbitRadius,
            ],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear",
            delay: particle.delay,
          }}
        >
          <motion.div
            className="rounded-full"
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: particle.color,
              boxShadow: `0 0 ${particle.size * 4}px ${particle.color}`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      ))}

      {/* Orbital rings */}
      {[1, 2, 3].map((ring) => (
        <motion.div
          key={ring}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-500/20"
          style={{
            width: 100 + ring * 80,
            height: 100 + ring * 80,
          }}
          animate={{
            rotate: ring % 2 === 0 ? [0, 360] : [360, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 15 + ring * 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

// Light Wave Background
function LightWaveBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/50 to-black" />

      {/* Animated light waves */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-0 right-0 h-[2px]"
          style={{
            top: `${20 + i * 15}%`,
            background: `linear-gradient(90deg, transparent, ${
              ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#6366f1"][i]
            }, transparent)`,
            opacity: 0.3,
          }}
          animate={{
            x: ["-100%", "100%"],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "linear",
          }}
        />
      ))}

      {/* Gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-600/20 blur-[100px]"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-600/20 blur-[100px]"
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
    </div>
  );
}

// Quantum Ripple Effect
function QuantumRipple({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      {children}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-blue-400/30"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

// Neon Card Component
function NeonCard({
  children,
  className = "",
  glowColor = "blue",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: "blue" | "purple" | "cyan" | "green";
  delay?: number;
}) {
  const colors = {
    blue: {
      border: "border-blue-500/30",
      bg: "from-blue-900/20",
      glow: "bg-blue-500/20",
    },
    purple: {
      border: "border-purple-500/30",
      bg: "from-purple-900/20",
      glow: "bg-purple-500/20",
    },
    cyan: {
      border: "border-cyan-500/30",
      bg: "from-cyan-900/20",
      glow: "bg-cyan-500/20",
    },
    green: {
      border: "border-green-500/30",
      bg: "from-green-900/20",
      glow: "bg-green-500/20",
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className={`relative group ${className}`}
    >
      <div
        className={`relative rounded-2xl bg-gradient-to-br ${colors[glowColor].bg} via-black/60 to-black/40 border ${colors[glowColor].border} overflow-hidden hover:border-opacity-70 transition-all duration-300`}
      >
        <div
          className={`absolute inset-0 ${colors[glowColor].glow} opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300`}
        />
        {children}
      </div>
    </motion.div>
  );
}

// Countdown Timer
function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!mounted) return null;

  const timeUnits = [
    { value: timeLeft.days, label: "DAYS" },
    { value: timeLeft.hours, label: "HRS" },
    { value: timeLeft.minutes, label: "MIN" },
    { value: timeLeft.seconds, label: "SEC" },
  ];

  return (
    <div className="flex justify-center gap-3 sm:gap-4">
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
          className="flex flex-col items-center"
        >
          <div className="relative">
            <motion.div
              className="absolute -inset-2 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-40 blur-lg"
              animate={{
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.2,
              }}
            />
            <div className="relative w-14 h-14 sm:w-20 sm:h-20 rounded-xl bg-black/80 border-2 border-blue-500/50 flex items-center justify-center overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-purple-600/20"
                animate={{ rotate: [0, 360] }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={unit.value}
                  initial={{ y: -30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 30, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="font-mono text-xl sm:text-4xl font-bold text-white relative z-10"
                  style={{ textShadow: "0 0 20px rgba(59, 130, 246, 0.8)" }}
                >
                  {String(unit.value).padStart(2, "0")}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
          <span className="text-[10px] sm:text-xs text-gray-400 mt-2 tracking-widest">
            {unit.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

// Animated Section Wrapper
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
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// FAQ Item Component
function FAQItem({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <NeonCard glowColor="blue">
      <button
        onClick={onClick}
        className="w-full text-left p-6 flex items-start justify-between gap-4"
      >
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white mb-2">{question}</h3>
          <AnimatePresence>
            {isOpen && (
              <motion.p
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-gray-400 text-sm leading-relaxed overflow-hidden"
              >
                {answer}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-blue-400"
        >
          <Icons.ChevronDown />
        </motion.div>
      </button>
    </NeonCard>
  );
}

export default function QuantumQuotient3() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const registrationDeadline = new Date("2026-03-25T00:30:00+05:30");
  const warmUpDate = new Date("2026-03-22T10:00:00+05:30");
  const quizDate = new Date("2026-03-27T19:00:00+05:30");

  const faqs = [
    {
      question: "Who can participate in Quantum Quotient 3.0?",
      answer:
        "The quiz is open to all engineering students (undergraduate and postgraduate), management students, and students from arts, commerce, and sciences backgrounds. Individual participation only.",
    },
    {
      question: "What topics will be covered in the quiz?",
      answer:
        "The quiz will cover various aspects of optics and photonics including light behavior, refraction, diffraction, interference, polarization, fiber optics, laser principles, and other fundamental and advanced concepts in the field.",
    },
    {
      question: "Can I use external resources during the quiz?",
      answer:
        "No, external resources, calculators, or internet searches are strictly prohibited during the quiz. The competition tests your knowledge under fair conditions.",
    },
    {
      question: "How will winners be determined?",
      answer:
        "Winners will be determined based on the highest scores in the quiz round. In case of a tie, the participant who completed the quiz faster will be ranked higher. Top scorers will be recognized and rewarded.",
    },
    {
      question: "What is the Warm-Up Round?",
      answer:
        "The Warm-Up Round on March 22, 2026 (10:00-10:30 AM IST) will be hosted exclusively on our Instagram page @bvpoptica. It's a practice session to help you get familiar with the quiz format and topics.",
    },
  ];

  return (
    <main className="min-h-screen text-white overflow-hidden relative">
      <LightWaveBackground />

      <div className="relative z-10">
        {/* Hero Section with Quantum Atom */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-28 pb-20 relative">
          {/* Quantum Atom Animation */}
          <div className="absolute inset-0 opacity-30">
            <QuantumAtom />
          </div>

          <div className="text-center max-w-5xl mx-auto relative z-10">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-blue-500/50 bg-blue-500/10 mb-6 backdrop-blur-sm"
            >
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="text-blue-400"
              >
                <Icons.Atom className="w-5 h-5" />
              </motion.span>
              <span className="text-sm font-bold text-blue-300 tracking-[0.2em]">
                BVP OPTICA PRESENTS
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-4"
            >
              <h1
                className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-none"
                style={{
                  background:
                    "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 30%, #06b6d4 70%, #10b981 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  textShadow: "0 0 80px rgba(59, 130, 246, 0.5)",
                }}
              >
                QUANTUM
              </h1>
              <h1
                className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-none mt-2"
                style={{
                  background:
                    "linear-gradient(135deg, #10b981 0%, #06b6d4 30%, #8b5cf6 70%, #3b82f6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  textShadow: "0 0 80px rgba(139, 92, 246, 0.5)",
                }}
              >
                QUOTIENT 3.0
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-lg sm:text-xl text-gray-300 mb-8 flex items-center justify-center gap-3 flex-wrap"
            >
              <span className="flex items-center gap-2">
                <Icons.Brain className="w-5 h-5 text-blue-400" />
                Test Your Knowledge
              </span>
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="flex items-center gap-2">
                <Icons.Waves className="w-5 h-5 text-purple-400" />
                Optics & Photonics
              </span>
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              <span className="flex items-center gap-2">
                <Icons.Zap className="w-5 h-5 text-cyan-400" />
                30 Minutes
              </span>
            </motion.p>

            {/* Countdown */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mb-12"
            >
              <p className="text-sm text-gray-400 mb-4 tracking-wider">
                REGISTRATION CLOSES IN
              </p>
              <CountdownTimer targetDate={registrationDeadline} />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.a
                href="https://unstop.com/quizzes/quantum-quotient-30-bharati-vidyapeeth-s-college-of-engineering-delhi-1303445"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-10 py-5 rounded-2xl font-bold text-lg overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  style={{ backgroundSize: "200% 100%" }}
                />
                <span className="relative z-10 flex items-center gap-2 text-white">
                  <Icons.Target className="w-5 h-5" />
                  Register Now
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >
                    <Icons.ArrowRight className="w-5 h-5" />
                  </motion.span>
                </span>
              </motion.a>

              <motion.a
                href="https://www.instagram.com/bvpoptica/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, borderColor: "rgba(59,130,246,0.8)" }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 rounded-2xl font-bold text-lg border-2 border-white/20 hover:bg-white/5 transition-all backdrop-blur-sm"
              >
                <span className="flex items-center gap-2">
                  <Icons.Instagram />
                  Follow for Warm-Up
                </span>
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* Event Overview */}
        <section className="py-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection className="text-center mb-16">
              <span className="inline-block px-4 py-1 rounded-full border border-blue-500/30 text-blue-400 text-sm mb-4 tracking-wider">
                ABOUT THE QUIZ
              </span>
              <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6">
                The Ultimate{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Optics Challenge
                </span>
              </h2>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
                Get ready for the next edition of Quantum Quotient, a thrilling
                quizzing competition designed to test your expertise in optics
                and photonics. This time, we are pushing the boundaries even
                further—challenging not just your knowledge, but your ability to
                apply it under pressure.
              </p>
            </AnimatedSection>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <NeonCard glowColor="blue" delay={0}>
                <div className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4">
                    <Icons.Users className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Individual
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Solo participation only
                  </p>
                </div>
              </NeonCard>

              <NeonCard glowColor="purple" delay={0.1}>
                <div className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4">
                    <Icons.Target className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    30 Questions
                  </h3>
                  <p className="text-gray-400 text-sm">Multiple choice format</p>
                </div>
              </NeonCard>

              <NeonCard glowColor="cyan" delay={0.2}>
                <div className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-4">
                    <Icons.Clock className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    30 Minutes
                  </h3>
                  <p className="text-gray-400 text-sm">Timed challenge</p>
                </div>
              </NeonCard>

              <NeonCard glowColor="green" delay={0.3}>
                <div className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mb-4">
                    <Icons.Trophy className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Top Scorers Win
                  </h3>
                  <p className="text-gray-400 text-sm">Recognition & rewards</p>
                </div>
              </NeonCard>
            </div>

            {/* Rules Section */}
            <NeonCard glowColor="blue" delay={0.4}>
              <div className="p-8">
                <h3 className="font-heading text-3xl font-black text-white mb-6">
                  Rules & Guidelines
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-400 font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-2">
                        Individual Participation Only
                      </h4>
                      <p className="text-gray-400 text-sm">
                        This is a solo challenge. Team participation is not
                        allowed.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-400 font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-2">
                        No External Resources
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Calculators, internet searches, or reference materials
                        are prohibited.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-cyan-400 font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-2">
                        Strict Deadline
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Registration closes on March 25, 2026 at 12:30 AM IST.
                        No extensions.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-400 font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-2">
                        Accuracy & Speed
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Both correct answers and completion time matter for
                        rankings.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </NeonCard>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection className="text-center mb-16">
              <h2 className="font-heading text-5xl sm:text-6xl font-black text-white mb-4">
                Event{" "}
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                  Timeline
                </span>
              </h2>
            </AnimatedSection>

            <div className="space-y-8">
              {/* Registration Starts */}
              <QuantumRipple>
                <NeonCard glowColor="blue">
                  <div className="p-6 sm:p-8 flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-xl bg-blue-500/20 flex items-center justify-center">
                        <Icons.Calendar className="w-8 h-8 text-blue-400" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-heading text-2xl font-black text-white">
                          Registration Opens
                        </h3>
                        <span className="text-sm text-blue-400 font-mono">
                          MAR 21
                        </span>
                      </div>
                      <p className="text-gray-300 mb-2">
                        March 21, 2026 | 12:00 AM IST
                      </p>
                      <p className="text-gray-400 text-sm">
                        Register on Unstop to secure your spot in the
                        competition.
                      </p>
                    </div>
                  </div>
                </NeonCard>
              </QuantumRipple>

              {/* Warm-Up Round */}
              <QuantumRipple>
                <NeonCard glowColor="purple">
                  <div className="p-6 sm:p-8 flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-xl bg-purple-500/20 flex items-center justify-center">
                        <Icons.Instagram className="w-8 h-8 text-purple-400" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-heading text-2xl font-black text-white">
                          Warm-Up Round
                        </h3>
                        <span className="text-sm text-purple-400 font-mono">
                          MAR 22
                        </span>
                      </div>
                      <p className="text-gray-300 mb-2">
                        March 22, 2026 | 10:00 AM - 10:30 AM IST
                      </p>
                      <p className="text-gray-400 text-sm mb-3">
                        Practice session exclusively on our Instagram page to
                        get familiar with the quiz format.
                      </p>
                      <a
                        href="https://www.instagram.com/bvpoptica/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors text-sm font-medium"
                      >
                        <Icons.Instagram className="w-4 h-4" />
                        @bvpoptica
                        <Icons.ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </NeonCard>
              </QuantumRipple>

              {/* Registration Deadline */}
              <QuantumRipple>
                <NeonCard glowColor="cyan">
                  <div className="p-6 sm:p-8 flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                        <Icons.Clock className="w-8 h-8 text-cyan-400" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-heading text-2xl font-black text-white">
                          Registration Deadline
                        </h3>
                        <span className="text-sm text-cyan-400 font-mono">
                          MAR 25
                        </span>
                      </div>
                      <p className="text-gray-300 mb-2">
                        March 25, 2026 | 12:30 AM IST
                      </p>
                      <p className="text-gray-400 text-sm">
                        Last chance to register! Don't miss out on this
                        electrifying quiz competition.
                      </p>
                    </div>
                  </div>
                </NeonCard>
              </QuantumRipple>

              {/* Quiz Round */}
              <QuantumRipple>
                <NeonCard glowColor="green">
                  <div className="p-6 sm:p-8 flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-xl bg-green-500/20 flex items-center justify-center">
                        <Icons.Zap className="w-8 h-8 text-green-400" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-heading text-2xl font-black text-white">
                          Final Quiz Round
                        </h3>
                        <span className="text-sm text-green-400 font-mono">
                          MAR 27
                        </span>
                      </div>
                      <p className="text-gray-300 mb-2">
                        March 27, 2026 | 7:00 PM - 7:30 PM IST
                      </p>
                      <p className="text-gray-400 text-sm">
                        The main event! 30 MCQs in 30 minutes covering optics
                        and photonics concepts from basics to advanced topics.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="px-3 py-1 rounded-full bg-green-500/20 border border-green-500/40 text-green-300 text-xs font-medium">
                          Online Quiz
                        </span>
                        <span className="px-3 py-1 rounded-full bg-green-500/20 border border-green-500/40 text-green-300 text-xs font-medium">
                          30 Questions
                        </span>
                        <span className="px-3 py-1 rounded-full bg-green-500/20 border border-green-500/40 text-green-300 text-xs font-medium">
                          30 Minutes
                        </span>
                      </div>
                    </div>
                  </div>
                </NeonCard>
              </QuantumRipple>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection className="text-center mb-12">
              <h2 className="font-heading text-4xl sm:text-5xl font-black text-white mb-4">
                Frequently Asked{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Questions
                </span>
              </h2>
            </AnimatedSection>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFaq === index}
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection className="text-center mb-12">
              <h2 className="font-heading text-4xl sm:text-5xl font-black text-white mb-4">
                Get In{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Touch
                </span>
              </h2>
              <p className="text-gray-400">
                Have questions? Reach out to our organizers
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <NeonCard glowColor="blue">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Akshat Arora
                  </h3>
                  <div className="space-y-3">
                    <a
                      href="mailto:akshat.ayaan5@gmail.com"
                      className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors"
                    >
                      <Icons.Mail className="w-5 h-5" />
                      <span className="text-sm">akshat.ayaan5@gmail.com</span>
                    </a>
                    <a
                      href="tel:+918470084661"
                      className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors"
                    >
                      <Icons.Zap className="w-5 h-5" />
                      <span className="text-sm">+91 84700 84661</span>
                    </a>
                  </div>
                </div>
              </NeonCard>

              <NeonCard glowColor="purple">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Anand Ambastha
                  </h3>
                  <div className="space-y-3">
                    <a
                      href="mailto:anand.kumar-coend@bvp.edu.in"
                      className="flex items-center gap-3 text-gray-300 hover:text-purple-400 transition-colors"
                    >
                      <Icons.Mail className="w-5 h-5" />
                      <span className="text-sm">
                        anand.kumar-coend@bvp.edu.in
                      </span>
                    </a>
                  </div>
                </div>
              </NeonCard>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <QuantumRipple>
              <NeonCard glowColor="blue">
                <div className="p-12">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="font-heading text-4xl sm:text-5xl font-black text-white mb-6">
                      Ready to Test Your{" "}
                      <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                        Quantum Knowledge?
                      </span>
                    </h2>
                    <p className="text-gray-300 text-lg mb-8">
                      Register now and prove your mastery of optics and
                      photonics!
                    </p>
                    <motion.a
                      href="https://unstop.com/quizzes/quantum-quotient-30-bharati-vidyapeeth-s-college-of-engineering-delhi-1303445"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 text-white"
                    >
                      <Icons.Atom className="w-6 h-6" />
                      Register on Unstop
                      <Icons.ArrowRight className="w-5 h-5" />
                    </motion.a>
                  </motion.div>
                </div>
              </NeonCard>
            </QuantumRipple>
          </div>
        </section>

        <FooterSection />
      </div>
    </main>
  );
}
