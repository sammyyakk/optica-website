"use client";

import { createContext, useContext, useEffect, ReactNode } from "react";

type Theme = "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const defaultContext: ThemeContextType = {
  theme: "dark",
  toggleTheme: () => {},
};

const ThemeContext = createContext<ThemeContextType>(defaultContext);

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.add("dark");
    return () => document.documentElement.classList.remove("dark");
  }, []);

  return (
    <ThemeContext.Provider value={defaultContext}>
      {children}
    </ThemeContext.Provider>
  );
}
