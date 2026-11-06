import { Logo } from "../ui/Logo";
import { useReveal } from "../../hooks/useReveal";

const navigateMenu = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/nibrasgazza" },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/adil-nibras-gazza",
  },
  { label: "GitHub", href: "https://github.com/gazza-bot" },
];

interface ContactItem {
  id: string;
  value: string;
  href: string;
  icon: React.ReactNode;
}

const contactList: ContactItem[] = [
  {
    id: "email",
    value: "nibrasgazza@gmail.com",
    href: "mailto:nibrasgazza@gmail.com",
    icon: (
      <svg
        className="size-5 fill-current"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
  },
  {
    id: "github",
    value: "github.com/gazza-bot",
    href: "https://github.com/gazza-bot",
    icon: (
      <svg
        className="size-5 fill-current"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    id: "linkedin",
    value: "linkedin.com/in/adil-nibras-gazza",
    href: "https://linkedin.com/in/adil-nibras-gazza",
    icon: (
      <svg
        className="size-5 fill-current"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ),
  },
];

export function Footer() {
  const topRef = useReveal<HTMLDivElement>();

  return (
    <footer id="contact" className="bg-ink text-white-bg">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div
          ref={topRef}
          className="grid gap-12 border-b border-white/15 pb-12 md:grid-cols-12 md:gap-8"
        >
          <div className="md:col-span-7">
            <p className="font-p text-[11px] uppercase tracking-[0.2em] text-blue-light">
              03 / Contact
            </p>
            <h2 className="mt-4 font-heading text-[clamp(3rem,8vw,7rem)] leading-[0.85] tracking-tight">
              LET'S BUILD
              <br />
              <span className="text-blue-main">SOMETHING.</span>
            </h2>
          </div>

          <div className="md:col-span-5 md:pt-2">
            <p className="max-w-sm font-p text-base leading-relaxed text-white/70">
              Have a project, a role, or a question in mind? Send a message and
              I will get back to you.
            </p>

            <ul className="mt-6 flex flex-col border-t border-white/15">
              {contactList.map((item) => (
                <li key={item.id} className="border-b border-white/15">
                  <a
                    href={item.href}
                    target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={
                      item.href.startsWith("mailto:")
                        ? undefined
                        : "noopener noreferrer"
                    }
                    className="flex items-center gap-3 py-3 font-p text-sm text-white/75 transition-colors hover:text-white"
                  >
                    {item.icon}
                    {item.value}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid gap-10 pt-10 md:grid-cols-12 md:gap-8">
          <nav className="md:col-span-4" aria-label="Footer">
            <h3 className="font-p text-[11px] uppercase tracking-[0.18em] text-white/50">
              Navigate
            </h3>
            <ul className="mt-4 flex flex-col gap-2">
              {navigateMenu.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="font-p text-sm text-white/75 transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h3 className="font-p text-[11px] uppercase tracking-[0.18em] text-white/50">
              Elsewhere
            </h3>
            <ul className="mt-4 flex flex-col gap-2">
              {socialLinks.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-p text-sm text-white/75 transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="font-p text-[11px] uppercase tracking-[0.18em] text-white/50">
              Current focus
            </h3>
            <p className="mt-4 max-w-xs font-p text-sm leading-relaxed text-white/75">
              Frontend development and UI/UX design, with a focus on web
              interfaces that are clear and usable.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-white/15 pt-6 md:flex-row md:items-end md:justify-between">
          <div aria-hidden="true" className="overflow-hidden">
            <Logo
              variant="LogoText"
              align="end"
              classLogo="size-10 text-white/20"
              classText="text-[clamp(4rem,16vw,13rem)] leading-none text-white/10"
            />
          </div>
          <p className="font-p text-xs text-white/50 md:text-right">
            © 2026 Adil Nibras Gazza. Built with React, TypeScript, and Tailwind
            CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
