import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "optica-blue": "#0072CE",
        "quantum-violet": "#6C63FF",
        "photon-gold": "#FFC300",
        "laser-magenta": "#E91E63",
        "background-light": "#F5F7FA",
        "background-dark": "#0E1A2B",
        "text-primary": "#1E1E1E",
        "text-secondary": "#4B5563",
      },
      fontFamily: {
        heading: ["var(--font-poppins)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        accent: ["var(--font-montserrat)", "sans-serif"],
      },
      borderRadius: {
        card: "12px",
        button: "16px",
      },
      boxShadow: {
        card: "0 4px 12px rgba(0,0,0,0.1)",
      },
    },
  },
  plugins: [],
};
export default config;
