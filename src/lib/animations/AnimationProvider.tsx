'use client';

import { createContext, useContext, useEffect, ReactNode } from 'react';
import { initGSAP } from './gsap';

const AnimationContext = createContext<{ 
  reducedMotion: boolean;
  shouldAnimate: boolean;
}>({
  reducedMotion: false,
  shouldAnimate: true,
});

export function useAnimationContext() {
  return useContext(AnimationContext);
}

export function AnimationProvider({ children }: { children: ReactNode }) {
  const reducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  const shouldAnimate = !reducedMotion;

  useEffect(() => {
    initGSAP();
  }, []);

  return (
    <AnimationContext.Provider value={{ reducedMotion, shouldAnimate }}>
      {children}
    </AnimationContext.Provider>
  );
}
