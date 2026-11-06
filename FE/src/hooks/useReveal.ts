import { useEffect, useRef } from "react";

export function useReveal<T extends HTMLElement>(delay = 0) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    element.style.opacity = "0";
    element.style.transform = "translateY(24px)";
    element.style.transition = `opacity 700ms ease ${delay}ms, transform 700ms ease ${delay}ms`;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;

        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
        observer.disconnect();
      },
      { threshold: 0.14, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [delay]);

  return ref;
}
