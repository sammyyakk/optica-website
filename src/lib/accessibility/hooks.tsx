"use client";

import { useEffect } from "react";
import { useAnimationContext } from "@/lib/animations/AnimationProvider";

/**
 * Hook to announce route changes to screen readers
 */
export function useRouteAnnouncer() {
  useEffect(() => {
    const announcer = document.createElement("div");
    announcer.setAttribute("aria-live", "polite");
    announcer.setAttribute("aria-atomic", "true");
    announcer.className = "sr-only";
    document.body.appendChild(announcer);

    const handleRouteChange = () => {
      const pageTitle = document.title;
      announcer.textContent = `Navigated to ${pageTitle}`;
    };

    // Listen for Next.js route changes
    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
      if (document.body.contains(announcer)) {
        document.body.removeChild(announcer);
      }
    };
  }, []);
}

/**
 * Hook to manage focus trap for modals
 */
export function useFocusTrap(
  isOpen: boolean,
  containerRef: React.RefObject<HTMLElement>
) {
  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus();
          e.preventDefault();
        }
      }
    };

    // Focus first element when opened
    firstElement?.focus();

    document.addEventListener("keydown", handleTabKey);

    return () => {
      document.removeEventListener("keydown", handleTabKey);
    };
  }, [isOpen, containerRef]);
}

/**
 * Hook to handle escape key for closing modals
 */
export function useEscapeKey(callback: () => void, isActive: boolean = true) {
  useEffect(() => {
    if (!isActive) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        callback();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [callback, isActive]);
}

/**
 * Hook to announce dynamic content changes to screen readers
 */
export function useAriaLiveAnnouncer() {
  useEffect(() => {
    const announcer = document.createElement("div");
    announcer.setAttribute("role", "status");
    announcer.setAttribute("aria-live", "polite");
    announcer.setAttribute("aria-atomic", "true");
    announcer.className = "sr-only";
    announcer.id = "aria-live-announcer";
    document.body.appendChild(announcer);

    return () => {
      const existingAnnouncer = document.getElementById("aria-live-announcer");
      if (existingAnnouncer) {
        document.body.removeChild(existingAnnouncer);
      }
    };
  }, []);

  const announce = (message: string) => {
    const announcer = document.getElementById("aria-live-announcer");
    if (announcer) {
      announcer.textContent = message;
      setTimeout(() => {
        announcer.textContent = "";
      }, 1000);
    }
  };

  return { announce };
}

/**
 * Hook to manage skip links visibility
 */
export function useSkipLink() {
  useEffect(() => {
    const skipLink = document.getElementById("skip-to-main");
    if (!skipLink) return;

    const handleFocus = () => {
      skipLink.classList.add("focus:not-sr-only");
    };

    const handleBlur = () => {
      skipLink.classList.remove("focus:not-sr-only");
    };

    skipLink.addEventListener("focus", handleFocus);
    skipLink.addEventListener("blur", handleBlur);

    return () => {
      skipLink.removeEventListener("focus", handleFocus);
      skipLink.removeEventListener("blur", handleBlur);
    };
  }, []);
}

/**
 * Component for skip navigation link
 */
export function SkipLink() {
  return (
    <a
      id="skip-to-main"
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-optica-blue focus:text-white focus:rounded-button focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-photon-gold"
    >
      Skip to main content
    </a>
  );
}

/**
 * Hook to detect reduced motion preference
 */
export function useReducedMotion() {
  const { reducedMotion } = useAnimationContext();
  return reducedMotion;
}

/**
 * Accessible button with loading and disabled states
 */
interface AccessibleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

export function AccessibleButton({
  loading = false,
  loadingText = "Loading...",
  children,
  disabled,
  ...props
}: AccessibleButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      aria-busy={loading}
      aria-disabled={disabled || loading}
    >
      {loading ? loadingText : children}
    </button>
  );
}

/**
 * Visually hidden component for screen reader only content
 */
export function VisuallyHidden({ children }: { children: React.ReactNode }) {
  return <span className="sr-only">{children}</span>;
}
