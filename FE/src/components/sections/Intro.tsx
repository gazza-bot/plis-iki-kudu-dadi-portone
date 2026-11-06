import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Logo } from "../ui/Logo";
import { useBodyScrollLock } from "../../hooks/useBodyScrollLock";

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

function shouldShowIntro(): boolean {
  if (
    import.meta.env.DEV &&
    new URLSearchParams(window.location.search).has("skip-intro")
  ) {
    return false;
  }
  if (import.meta.env.DEV) return true;
  if (hasSeenIntroSession()) return false;
  if (prefersReducedMotion()) return false;
  return true;
}

export function Intro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const screen1Ref = useRef<HTMLDivElement>(null);
  const screen2Ref = useRef<HTMLDivElement>(null);
  const screen3Ref = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [showIntro, setShowIntro] = useState(shouldShowIntro);

  useBodyScrollLock(showIntro);

  useLayoutEffect(() => {
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  useLayoutEffect(() => {
    if (!showIntro) return;

    const ctx = gsap.context(() => {
      gsap.set(screen2Ref.current, { xPercent: 100 });
      gsap.set(screen3Ref.current, { yPercent: 100 });

      const timeline = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => {
          saveIntroSeen();
          setShowIntro(false);
        },
      });

      timelineRef.current = timeline;

      timeline
        .addLabel("toScreen2", "+=0.7")
        .to(screen1Ref.current, { xPercent: -100, duration: 0.6 }, "toScreen2")
        .to(screen2Ref.current, { xPercent: 0, duration: 0.6 }, "toScreen2")
        .addLabel("toScreen3", "+=0.4")
        .to(screen2Ref.current, { yPercent: -100, duration: 0.5 }, "toScreen3")
        .to(screen3Ref.current, { yPercent: 0, duration: 0.5 }, "toScreen3")
        .to(containerRef.current, {
          opacity: 0,
          yPercent: -100,
          duration: 0.35,
          ease: "power2.inOut",
        });
    }, containerRef);

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      ctx.revert();
    };
  }, [showIntro]);

  if (!showIntro) return null;

  return (
    <div
      ref={containerRef}
      className="relative z-[100] h-dvh w-full overflow-hidden bg-white-bg"
      aria-hidden="true"
    >
      <div
        ref={screen1Ref}
        className="absolute top-0 left-0 flex h-dvh w-full items-center justify-center bg-blue-deep"
        style={{ willChange: "transform" }}
      >
        <p className="px-5 text-center font-heading text-5xl tracking-wide text-white md:text-9xl">
          Adil Nibras Gazza
        </p>
      </div>

      <div
        ref={screen2Ref}
        className="absolute top-0 left-0 flex h-dvh w-full flex-col items-center justify-center gap-2 bg-white-bg px-5 text-center"
        style={{ willChange: "transform" }}
      >
        <p className="font-heading text-4xl tracking-wide text-ink md:text-8xl">
          Tech Enthusiast
        </p>
        <p className="font-heading text-4xl tracking-wide text-ink md:text-8xl">
          Frontend Developer
        </p>
        <p className="font-heading text-4xl tracking-wide text-blue-main md:text-8xl">
          UI/UX Designer
        </p>
      </div>

      <div
        ref={screen3Ref}
        className="absolute top-0 left-0 flex h-dvh w-full items-center justify-center bg-white-bg"
        style={{ willChange: "transform" }}
      >
        <Logo
          variant="LogoText"
          classLogo="size-20 text-ink md:size-48"
          classText="text-7xl text-ink md:text-[180px]"
        />
      </div>
    </div>
  );
}
