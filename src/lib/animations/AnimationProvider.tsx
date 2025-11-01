'use client';

import { createContext, useContext, useEffect, ReactNode } from 'react';
import { initGSAP } from './gsap';

const AnimationContext = createContext<{ reducedMotion: boolean }>({
  reducedMotion: false,
});

export function useAnimationContext() {
  return useContext(AnimationContext);
}

export function AnimationProvider({ children }: { children: ReactNode }) {
  const reducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  useEffect(() => {
    initGSAP();
  }, []);

  return (
    <AnimationContext.Provider value={{ reducedMotion }}>
      {children}
    </AnimationContext.Provider>
  );
}
