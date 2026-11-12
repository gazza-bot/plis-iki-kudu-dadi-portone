import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../ui/Logo";

const launcherItems = [
  {
    label: "About Me",
    eyebrow: "Frontend developer / UI designer",
    description:
      "I design and build web interfaces with a close eye on structure, motion, and the details people feel while using them.",
    href: "/about",
    icon: "profile",
    image: "/aboutme.webp",
    imagePosition: "center",
    mobileImagePosition: "80% center",
  },
  {
    label: "Projects",
    eyebrow: "Selected work",
    description:
      "Browse real projects, from interface explorations to web experiences built with React and TypeScript.",
    href: "/projects",
    icon: "projects",
    image: "/projects.webp",
    imagePosition: "center",
    mobileImagePosition: "70% center",
  },
  {
    label: "Contact",
    eyebrow: "Start a conversation",
    description:
      "Have a role, collaboration, or project in mind? Send me a message.",
    href: "/contact",
    icon: "contact",
    image: "/message.webp",
    imagePosition: "center",
    mobileImagePosition: "68% center",
  },
  {
    label: "Chatbot",
    eyebrow: "Ask Nimo",
    description:
      "Ask about my work, skills, or the way I approach a project.",
    href: "/chatbot",
    icon: "chat",
    image: "/chatbot.webp",
    imagePosition: "center",
    mobileImagePosition: "66% center",
  },
] as const;

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const navigate = useNavigate();
  const activeItem = launcherItems[activeIndex];

  const moveLauncher = (direction: 1 | -1) => {
    setActiveIndex((current) => {
      const next = (current + direction + launcherItems.length) % launcherItems.length;
      itemRefs.current[next]?.focus();
      return next;
    });
  };

  const openActiveLauncher = () => {
    navigate(activeItem.href);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
      const target = event.target as HTMLElement | null;
      if (
        target?.closest(
          "input, textarea, select, [contenteditable='true'], [role='dialog']",
        )
      ) {
        return;
      }

      event.preventDefault();
      setActiveIndex((current) => {
        const next =
          event.key === "ArrowRight"
            ? (current + 1) % launcherItems.length
            : (current - 1 + launcherItems.length) % launcherItems.length;
        itemRefs.current[next]?.focus();
        return next;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section
      id="about"
      className="relative isolate flex h-dvh min-h-dvh overflow-hidden border-b border-white/10 bg-[#080611] text-white"
    >
      <img
        key={activeItem.image}
        src={activeItem.image}
        alt=""
        width={1376}
        height={768}
        fetchPriority="high"
        decoding="async"
        className="hero-background absolute inset-0 -z-20 h-full w-full animate-hero-image-enter object-cover opacity-90"
        style={
          {
            "--hero-image-position": activeItem.imagePosition,
            "--hero-image-position-mobile": activeItem.mobileImagePosition,
            filter: "brightness(1.15) contrast(1.03)",
          } as CSSProperties
        }
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-[19] opacity-75 blur-2xl"
        style={{
          background:
            "radial-gradient(ellipse 48% 66% at 76% 50%, rgba(33,133,213,0.55) 0%, rgba(33,133,213,0.22) 42%, rgba(33,133,213,0) 72%)",
        }}
      />

      <img
        key={`${activeItem.image}-aura`}
        src={activeItem.image}
        alt=""
        width={1376}
        height={768}
        decoding="async"
        aria-hidden="true"
        className="hero-background animate-aura-breathe pointer-events-none absolute inset-0 -z-[18] h-full w-full object-cover"
        style={
          {
            "--hero-image-position": activeItem.imagePosition,
            "--hero-image-position-mobile": activeItem.mobileImagePosition,
            filter: "blur(20px) brightness(2.1) saturate(1.15)",
            maskImage:
              "radial-gradient(ellipse 34% 58% at 76% 50%, black 0%, black 42%, transparent 76%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 34% 58% at 76% 50%, black 0%, black 42%, transparent 76%)",
            mixBlendMode: "screen",
            opacity: 0.45,
          } as CSSProperties
        }
      />

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,6,17,0.78)_0%,rgba(8,6,17,0.42)_45%,rgba(8,6,17,0.14)_72%,rgba(8,6,17,0.32)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(8,6,17,0.55)_0%,rgba(8,6,17,0.04)_48%,rgba(8,6,17,0.30)_100%)]" />

      <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-between px-5 pb-8 pt-8 md:px-10 md:pb-10 md:pt-10 lg:px-14">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <Link
            to="/"
            aria-label="Adildev home"
            className="flex size-[84px] shrink-0 items-center justify-center border border-transparent"
          >
            <Logo
              variant="LogoText"
              classLogo="size-10 text-white"
              classText="text-xl text-white"
            />
          </Link>

          <div
            className="grid w-full max-w-[360px] grid-cols-4 gap-2 sm:w-[360px]"
            aria-label="Home launcher items"
          >
            {launcherItems.map((item, index) => (
              <button
                key={item.label}
                ref={(element) => {
                  itemRefs.current[index] = element;
                }}
                type="button"
                onClick={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    navigate(item.href);
                  }
                }}
                className={`group grid aspect-square w-full place-items-center border transition-all duration-200 ${
                  activeIndex === index
                    ? "scale-105 border-white bg-white text-ink shadow-[0_0_0_2px_rgba(255,255,255,0.25)]"
                    : "border-white/10 bg-black/35 text-white/65 backdrop-blur-sm hover:border-white/60 hover:text-white"
                }`}
                aria-label={`Select ${item.label}`}
                aria-pressed={activeIndex === index}
              >
                <LauncherIcon name={item.icon} />
                <span className="sr-only">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid min-h-[360px] gap-8 lg:grid-cols-[minmax(0,900px)_1fr] lg:items-end">
          <div className="max-w-4xl self-end">
            <p className="font-p text-xs uppercase tracking-[0.2em] text-white/55">
              {activeItem.eyebrow}
            </p>
            <h1 className="mt-3 font-p text-[clamp(2.8rem,5vw,6rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-white lg:whitespace-nowrap">
              {activeItem.label === "About Me" ? (
                <>
                  Adil Nibras
                  {" "}
                  <span className="text-blue-light">Gazza</span>
                </>
              ) : (
                activeItem.label
              )}
            </h1>
            <p className="mt-8 max-w-xl font-p text-sm leading-relaxed text-white/72 md:mt-10 md:text-base">
              {activeItem.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3 md:mt-9">
              {activeItem.label === "Chatbot" ? (
                  <Link
                    to="/chatbot"
                    className="inline-flex min-h-11 items-center justify-center rounded-sm bg-white px-6 py-3 font-p text-xs font-semibold text-ink transition-colors hover:bg-blue-light"
                  >
                    Open chatbot
                  </Link>
              ) : (
                  <Link
                    to={activeItem.href}
                    className="inline-flex min-h-11 items-center justify-center rounded-sm bg-white px-6 py-3 font-p text-xs font-semibold text-ink transition-colors hover:bg-blue-light"
                  >
                    {activeItem.label === "Contact"
                      ? "Open contact"
                      : `Open ${activeItem.label}`}
                  </Link>
              )}
              <span className="inline-flex min-h-11 items-center rounded-sm border border-white/20 bg-black/25 px-5 py-3 font-p text-xs text-white/65 backdrop-blur-sm">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(launcherItems.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 border-t border-white/15 pt-4 font-p text-[11px] text-white/55 md:mt-6">
          <div className="hidden flex-wrap items-center gap-x-6 gap-y-3 sm:flex">
            <span>
              <kbd className="mr-2 rounded border border-white/20 px-2 py-1 text-white">
                ←
              </kbd>
              <kbd className="mr-2 rounded border border-white/20 px-2 py-1 text-white">
                →
              </kbd>
              Navigate
            </span>
            <span>
              <kbd className="mr-2 rounded border border-white/20 px-2 py-1 text-white">
                Enter
              </kbd>
              Open selection
            </span>
          </div>

          <div className="flex items-center gap-2 sm:hidden">
            <button
              type="button"
              onClick={() => moveLauncher(-1)}
              className="grid min-h-11 min-w-11 place-items-center rounded-sm border border-white/20 bg-white/10 px-3 text-lg text-white transition-colors hover:bg-white hover:text-ink"
              aria-label="Previous launcher"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => moveLauncher(1)}
              className="grid min-h-11 min-w-11 place-items-center rounded-sm border border-white/20 bg-white/10 px-3 text-lg text-white transition-colors hover:bg-white hover:text-ink"
              aria-label="Next launcher"
            >
              →
            </button>
            <button
              type="button"
              onClick={openActiveLauncher}
              className="ml-5 min-h-11 rounded-sm border border-white/20 bg-white/10 px-5 font-semibold text-white transition-colors hover:bg-white hover:text-ink"
            >
              Enter
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function LauncherIcon({ name }: { name: (typeof launcherItems)[number]["icon"] }) {
  if (name === "profile") {
    return (
      <svg viewBox="0 0 24 24" className="size-8" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20c.8-3.3 3.1-5 7-5s6.2 1.7 7 5" />
      </svg>
    );
  }

  if (name === "projects") {
    return (
      <svg viewBox="0 0 24 24" className="size-8" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="4" y="4" width="6" height="6" />
        <rect x="14" y="4" width="6" height="6" />
        <rect x="4" y="14" width="6" height="6" />
        <rect x="14" y="14" width="6" height="6" />
      </svg>
    );
  }

  if (name === "chat") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="size-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v6a2.5 2.5 0 0 1-2.5 2.5H11l-4.5 4v-4.2A2.5 2.5 0 0 1 5 12.5v-6Z" />
        <path d="M9 9.5h6M9 12h3" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="size-8" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M4 6.5 12 12l8-5.5" />
      <rect x="4" y="5" width="16" height="14" rx="1.5" />
    </svg>
  );
}
