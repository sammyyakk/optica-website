"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface TemplateProps {
  children: ReactNode;
}

export default function Template({ children }: TemplateProps) {
  return (
    <motion.div
      initial={{ 
        opacity: 0,
        filter: "blur(8px)",
      }}
      animate={{ 
        opacity: 1,
        filter: "blur(0px)",
      }}
      transition={{
        duration: 0.35,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
