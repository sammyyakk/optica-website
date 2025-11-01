import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Initialize GSAP defaults for the entire site
 */
export function initGSAP() {
  gsap.defaults({
    ease: 'power3.out',
    duration: 0.8,
  });

  ScrollTrigger.defaults({
    toggleActions: 'play none none reverse',
    markers: process.env.NODE_ENV === 'development' ? false : false,
  });
}

/**
 * Create a reveal animation for elements entering viewport
 */
export function createRevealAnimation(
  element: gsap.TweenTarget,
  options?: {
    delay?: number;
    y?: number;
    scale?: number;
    duration?: number;
  }
) {
  const { delay = 0, y = 60, scale = 0.95, duration = 1 } = options || {};

  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y,
      scale,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration,
      delay,
      ease: 'power3.out',
    }
  );
}

/**
 * Create staggered reveal for multiple elements
 */
export function createStaggerReveal(
  elements: gsap.TweenTarget,
  options?: {
    stagger?: number;
    y?: number;
    trigger?: string;
    start?: string;
  }
) {
  const { stagger = 0.1, y = 60, trigger, start = 'top 80%' } = options || {};

  const animation = gsap.fromTo(
    elements,
    {
      opacity: 0,
      y,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger,
      ease: 'power3.out',
    }
  );

  if (trigger) {
    ScrollTrigger.create({
      trigger,
      start,
      animation,
    });
  }

  return animation;
}

/**
 * Create hero morph animation driven by scroll
 */
export function createHeroScrollMorph(
  heroRef: HTMLElement,
  options?: {
    endHeight?: string;
    scrub?: boolean | number;
  }
) {
  const { endHeight = '40vh', scrub = 1 } = options || {};

  return gsap.to(heroRef, {
    height: endHeight,
    scrollTrigger: {
      trigger: heroRef,
      start: 'top top',
      end: 'bottom+=200 top',
      scrub,
      invalidateOnRefresh: true,
    },
  });
}

/**
 * Smooth scroll to element with GSAP
 */
export function smoothScrollTo(target: string | HTMLElement, offset = 0) {
  gsap.to(window, {
    duration: 1.2,
    scrollTo: {
      y: target,
      offsetY: offset,
    },
    ease: 'expo.inOut',
  });
}

/**
 * Create parallax effect for background elements
 */
export function createParallax(
  element: gsap.TweenTarget,
  speed: number = 0.5,
  trigger?: string | gsap.DOMTarget
) {
  return gsap.to(element, {
    y: () => window.innerHeight * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: (trigger || element) as gsap.DOMTarget,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
}

/**
 * Create entrance animation timeline for sections
 */
export function createSectionTimeline(
  trigger: string,
  elements: {
    heading?: gsap.TweenTarget;
    content?: gsap.TweenTarget;
    cards?: gsap.TweenTarget;
  }
) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start: 'top 70%',
      toggleActions: 'play none none reverse',
    },
  });

  if (elements.heading) {
    tl.fromTo(
      elements.heading,
      { opacity: 0, y: -40 },
      { opacity: 1, y: 0, duration: 0.6 }
    );
  }

  if (elements.content) {
    tl.fromTo(
      elements.content,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.3'
    );
  }

  if (elements.cards) {
    tl.fromTo(
      elements.cards,
      { opacity: 0, y: 50, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1 },
      '-=0.4'
    );
  }

  return tl;
}

/**
 * Kill all ScrollTrigger instances
 */
export function killAllScrollTriggers() {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}

/**
 * Refresh all ScrollTrigger instances
 */
export function refreshScrollTriggers() {
  ScrollTrigger.refresh();
}
