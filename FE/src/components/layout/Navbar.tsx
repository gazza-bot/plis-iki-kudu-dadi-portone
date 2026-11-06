import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Logo } from "../ui/Logo";
import { useBodyScrollLock } from "../../hooks/useBodyScrollLock";

const ConnectForm = lazy(() => import("../widgets/ConnectForm"));

const navItems = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isMenuOpened, setMenuOpen] = useState(false);
  const [isFormShowed, setFormShow] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);

  useBodyScrollLock(isMenuOpened);

  useEffect(() => {
    if (isMenuOpened) {
      wasOpenRef.current = true;
      closeButtonRef.current?.focus();

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setMenuOpen(false);
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }

    if (wasOpenRef.current) {
      wasOpenRef.current = false;
      menuButtonRef.current?.focus();
    }
  }, [isMenuOpened]);

  const openForm = () => {
    setMenuOpen(false);
    setFormShow(true);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-ink/10 bg-white-bg">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:h-24 md:px-8">
          <a
            href="#top"
            className="flex items-center gap-2"
            aria-label="Adildev, back to top"
          >
            <Logo
              variant="LogoText"
              classLogo="size-8 text-ink"
              classText="text-xl md:text-2xl text-ink"
            />
          </a>

          <nav className="hidden md:block" aria-label="Primary">
            <ul className="flex items-center gap-8">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="relative font-p text-xs uppercase tracking-[0.18em] text-ink/70 transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-blue-deep after:transition-all after:duration-300 hover:text-ink hover:after:w-full"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={openForm}
                  aria-haspopup="dialog"
                  className="inline-flex items-center border border-ink bg-ink px-4 py-2.5 font-p text-xs uppercase tracking-[0.18em] text-white-bg transition-colors hover:border-blue-deep hover:bg-blue-deep"
                >
                  Send a message
                </button>
              </li>
            </ul>
          </nav>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen(true)}
            className="grid size-11 place-items-center border border-ink/20 text-ink md:hidden"
            aria-expanded={isMenuOpened}
            aria-controls="mobile-menu"
            aria-label="Open menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>

        <div
          id="mobile-menu"
          className={`${isMenuOpened ? "fixed" : "hidden"} inset-0 z-50 bg-ink text-white-bg md:hidden`}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="flex h-20 items-center justify-between px-5">
            <Logo
              variant="LogoText"
              classLogo="size-8 text-white-bg"
              classText="text-xl text-white-bg"
            />
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setMenuOpen(false)}
              className="grid size-11 place-items-center border border-white/25 text-white-bg"
              aria-label="Close menu"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <nav
            className="flex h-[calc(100dvh-5rem)] flex-col justify-between px-5 pb-10"
            aria-label="Mobile"
          >
            <ul className="flex flex-col pt-4">
              {navItems.map((item, index) => (
                <li key={item.href} className="border-b border-white/15">
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-baseline gap-4 py-5 font-heading text-5xl uppercase tracking-tight text-white-bg transition-colors hover:text-blue-main"
                  >
                    <span className="font-p text-[11px] tracking-[0.2em] text-blue-light">
                      0{index + 1}
                    </span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-6">
              <button
                type="button"
                onClick={openForm}
                aria-haspopup="dialog"
                className="w-full border border-white-bg bg-white-bg px-5 py-4 font-p text-xs uppercase tracking-[0.18em] text-ink transition-colors hover:bg-blue-deep hover:text-white"
              >
                Send a message
              </button>
              <div className="flex gap-5 font-p text-sm">
                <a
                  href="https://instagram.com/nibrasgazza"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  Instagram
                </a>
                <a
                  href="https://linkedin.com/in/adil-nibras-gazza"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {isFormShowed && (
        <Suspense fallback={null}>
          <ConnectForm handleClose={() => setFormShow(false)} />
        </Suspense>
      )}
    </>
  );
}
