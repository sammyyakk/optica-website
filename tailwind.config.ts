import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
  "optica-purple": "#A890FF",
  "quantum-violet": "#A890FF",
        "optica-black": "#05040A",
        "surface-deep": "#0B0A14",
        "surface": "#121123",
        "text-primary": "#F5F5F8",
        "text-secondary": "#ACAFCA",
        "white-elements": "#FFFFFF",
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
