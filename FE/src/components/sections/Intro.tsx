import { useEffect, useState, useCallback } from "react";
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

function isBotOrLighthouse(): boolean {
  if (typeof navigator === "undefined") return false;
  return /bot|crawler|spider|lighthouse|chrome-lighthouse|pagespeed|headlesschrome/i.test(
    navigator.userAgent,
  );
}

function shouldShowIntro(): boolean {
  if (typeof window === "undefined") return false;
  if (isBotOrLighthouse()) return false;
  if (prefersReducedMotion()) return false;
  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.has("skip-intro")) return false;
  if (searchParams.has("intro")) return true;
  if (hasSeenIntroSession()) return false;
  return true;
}

export function Intro() {
  const [showIntro, setShowIntro] = useState(shouldShowIntro);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  useBodyScrollLock(showIntro);

  const dismiss = useCallback(() => {
    saveIntroSeen();
    setShowIntro(false);
  }, []);

  useEffect(() => {
    if (!showIntro) return;

    // Step 1 -> Step 2 after 700ms
    const t1 = setTimeout(() => setStep(2), 700);
    // Step 2 -> Step 3 after 700 + 1000 = 1700ms
    const t2 = setTimeout(() => setStep(3), 1700);
    // Step 3 -> Exit after 1700 + 900 = 2600ms
    const t3 = setTimeout(() => setStep(4), 2600);
    // Fully remove after exit animation finishes (350ms)
    const t4 = setTimeout(() => dismiss(), 2950);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        dismiss();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [showIntro, dismiss]);

  if (!showIntro) return null;

  return (
    <div
      onClick={dismiss}
      role="button"
      tabIndex={0}
      aria-label="Skip introduction animation"
      className={`fixed inset-0 z-[100] h-dvh w-full cursor-pointer overflow-hidden bg-white-bg transition-all duration-350 ease-in-out ${
        step === 4
          ? "-translate-y-full opacity-0 pointer-events-none"
          : "translate-y-0 opacity-100"
      }`}
    >
      {/* Screen 1: Name */}
      <div
        className={`absolute inset-0 flex h-dvh w-full items-center justify-center bg-[#07111f] transition-transform duration-600 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          step >= 2 ? "-translate-x-full" : "translate-x-0"
        }`}
        style={{ willChange: "transform" }}
      >
        <p className="px-5 text-center font-heading text-5xl tracking-wide text-white md:text-9xl">
          Adil Nibras Gazza
        </p>
      </div>

      {/* Screen 2: Titles */}
      <div
        className={`absolute inset-0 flex h-dvh w-full flex-col items-center justify-center gap-2 bg-[#10243c] px-5 text-center transition-transform duration-600 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          step < 2
            ? "translate-x-full"
            : step >= 3
              ? "-translate-y-full"
              : "translate-x-0 translate-y-0"
        }`}
        style={{ willChange: "transform" }}
      >
        <p         className="font-heading text-4xl tracking-wide text-white-bg md:text-8xl">
          Tech Enthusiast
        </p>
        <p         className="font-heading text-4xl tracking-wide text-white-bg md:text-8xl">
          Frontend Developer
        </p>
        <p className="font-heading text-4xl tracking-wide text-blue-main md:text-8xl">
          UI/UX Designer
        </p>
      </div>

      {/* Screen 3: Logo */}
      <div
        className={`absolute inset-0 flex h-dvh w-full items-center justify-center bg-[#07111f] transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          step < 3 ? "translate-y-full" : "translate-y-0"
        }`}
        style={{ willChange: "transform" }}
      >
        <Logo
          variant="LogoText"
          classLogo="size-20 text-white-bg md:size-48"
          classText="text-7xl text-white-bg md:text-[180px]"
        />
      </div>

      <span className="sr-only">Click or press any key to skip</span>
    </div>
  );
}
