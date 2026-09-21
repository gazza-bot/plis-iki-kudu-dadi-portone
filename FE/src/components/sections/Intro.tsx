"use client";

import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { Logo } from "../ui/Logo";

const SESSION_KEY = "hasSeenIntro";

function hasSeenIntroSession(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "true";
  } catch {
    return false;
  }
}

function saveIntroSeen() {
  try {
    sessionStorage.setItem(SESSION_KEY, "true");
  } catch {
    // sessionStorage unavailable in some private browsing modes
  }
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function resetBodyStyles() {
  document.body.style.overflow = "";
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.width = "";
}

function shouldShowIntro(): boolean {
  // Always show intro in development for easier testing
  if (import.meta.env.DEV) return true;
  if (hasSeenIntroSession()) return false;
  if (prefersReducedMotion()) return false;
  return true;
}

export function Intro() {
  const containerRef = useRef(null);
  const screen1Ref = useRef(null);
  const screen2Ref = useRef(null);
  const screen3Ref = useRef(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [showIntro, setShowIntro] = useState(shouldShowIntro);

  // Force scroll to top on mount, prevent browser scroll restoration
  useLayoutEffect(() => {
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  useLayoutEffect(() => {
    if (!showIntro) {
      resetBodyStyles();
      window.scrollTo(0, 0);
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(screen2Ref.current, { xPercent: 100 });
      gsap.set(screen3Ref.current, { yPercent: 100 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => {
          saveIntroSeen();
          setShowIntro(false);
        },
      });

      timelineRef.current = tl;

      tl.addLabel("toScreen2", "+=1.5")
        .to(screen1Ref.current, { xPercent: -100, duration: 1 }, "toScreen2")
        .to(screen2Ref.current, { xPercent: 0, duration: 2 }, "toScreen2")
        .to(
          screen2Ref.current,
          { yPercent: -100, duration: 2 },
          "toScreen3+=0.6",
        )
        .to(screen3Ref.current, { yPercent: 0, duration: 1 }, "toScreen3+=0.6")
        // Use opacity + transform instead of height to avoid layout recalculation
        .to(containerRef.current, {
          opacity: 0,
          yPercent: -100,
          duration: 0.8,
          ease: "power2.inOut",
          delay: 0.8,
        });
    }, containerRef);

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      ctx.revert();
      resetBodyStyles();
    };
  }, [showIntro]);

  // Lock scroll while intro is visible, clean up on unmount
  useLayoutEffect(() => {
    if (showIntro) {
      document.body.style.overflow = "hidden";
    } else {
      resetBodyStyles();
    }

    return () => {
      resetBodyStyles();
    };
  }, [showIntro]);

  if (!showIntro) return null;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-dvh overflow-hidden bg-white-bg z-50"
    >
      {/* Screen 1 - Nama */}
      <div
        ref={screen1Ref}
        className="bg-blue-main absolute top-0 left-0 w-full h-dvh flex justify-center items-center"
        style={{ willChange: "transform" }}
      >
        <h1 className="text-4xl md:text-9xl font-heading tracking-wide text-white font-bold">
          Adil Nibras Gazza
        </h1>
      </div>

      {/* Screen 2 - Role */}
      <div
        ref={screen2Ref}
        className="bg-white-bg absolute top-0 left-0 w-full h-dvh flex flex-col justify-center items-center gap-4"
        style={{ willChange: "transform" }}
      >
        <h1 className="text-3xl md:text-9xl font-heading tracking-wide text-blue-main font-bold">
          Tech Enthusiast
        </h1>
        <h1 className="text-3xl md:text-9xl font-heading tracking-wide text-blue-main font-bold">
          Frontend Developer
        </h1>
        <h1 className="text-3xl md:text-9xl font-heading tracking-wide text-blue-main font-bold">
          UI/UX Designer
        </h1>
      </div>

      {/* Screen 3 - Logo */}
      <div
        ref={screen3Ref}
        className="bg-white-bg absolute top-0 left-0 w-full h-dvh flex justify-center items-center"
        style={{ willChange: "transform" }}
      >
        <Logo
          variant="LogoText"
          classLogo="size-24 md:size-48 lg:size-72 text-blue-main"
          classText="text-blue-main text-8xl md:text-[192px] lg:text-[248px]"
        />
      </div>
    </div>
  );
}
