import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

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
        "primary-purple": "#A48FF5",
        "dark-purple": "#120339",
        "black": "#000000",
        "white": "#FFFFFF",
        "text-primary": "#FFFFFF",
        "text-secondary": "#A48FF5",
        "background-primary": "#120339",
        "background-secondary": "#000000",
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
  plugins: [typography],
};
export default config;
