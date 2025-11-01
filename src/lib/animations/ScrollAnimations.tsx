'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAnimationContext } from './AnimationProvider';

gsap.registerPlugin(ScrollTrigger);

interface RevealElementProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  delay?: number;
  duration?: number;
  className?: string;
}

export function RevealElement({
  children,
  direction = 'up',
  delay = 0,
  duration = 1,
  className = '',
}: RevealElementProps) {
  const { shouldAnimate } = useAnimationContext();
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shouldAnimate || !elementRef.current) return;

    const element = elementRef.current;

    // Set initial state based on direction
    const initialState: gsap.TweenVars = {
      opacity: 0,
    };

    switch (direction) {
      case 'up':
        initialState.y = 60;
        break;
      case 'down':
        initialState.y = -60;
        break;
      case 'left':
        initialState.x = 60;
        break;
      case 'right':
        initialState.x = -60;
        break;
      case 'fade':
        // Only opacity
        break;
    }

    gsap.set(element, initialState);

    // Create reveal animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        end: 'top 50%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.to(element, {
      opacity: 1,
      x: 0,
      y: 0,
      duration,
      delay,
      ease: 'power3.out',
    });

    return () => {
      tl.kill();
    };
  }, [shouldAnimate, direction, delay, duration]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}

interface StaggerRevealProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

export function StaggerReveal({
  children,
  staggerDelay = 0.1,
  className = '',
}: StaggerRevealProps) {
  const { shouldAnimate } = useAnimationContext();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shouldAnimate || !containerRef.current) return;

    const items = containerRef.current.children;

    gsap.set(items, {
      opacity: 0,
      y: 30,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'top 40%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: staggerDelay,
      ease: 'power3.out',
    });

    return () => {
      tl.kill();
    };
  }, [shouldAnimate, staggerDelay]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

interface ParallaxElementProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxElement({
  children,
  speed = 0.5,
  className = '',
}: ParallaxElementProps) {
  const { shouldAnimate } = useAnimationContext();
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shouldAnimate || !elementRef.current) return;

    const element = elementRef.current;

    gsap.to(element, {
      yPercent: -50 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [shouldAnimate, speed]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}

interface ScrollProgressProps {
  className?: string;
}

export function ScrollProgress({ className = '' }: ScrollProgressProps) {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!progressRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    });

    tl.to(progressRef.current, {
      scaleX: 1,
      transformOrigin: 'left',
      ease: 'none',
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-optica-blue via-quantum-violet to-photon-gold z-50 origin-left scale-x-0 ${className}`}
      ref={progressRef}
    />
  );
}

// Hook for custom scroll-triggered animations
export function useScrollAnimation(
  callback: (progress: number) => void,
  trigger: string | HTMLElement,
  options?: ScrollTrigger.Vars
) {
  const { shouldAnimate } = useAnimationContext();

  useEffect(() => {
    if (!shouldAnimate) return;

    const scrollTrigger = ScrollTrigger.create({
      trigger,
      onUpdate: (self) => callback(self.progress),
      ...options,
    });

    return () => {
      scrollTrigger.kill();
    };
  }, [shouldAnimate, callback, trigger, options]);
}
