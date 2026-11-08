import { lazy, Suspense } from "react";
import { PageBackLink } from "../components/ui/PageBackLink";
import { useEscapeToHome } from "../hooks/useEscapeToHome";

const ConnectForm = lazy(() => import("../components/widgets/ConnectForm"));

export default function ContactPage() {
  useEscapeToHome();

  return (
    <div className="min-h-screen bg-ink px-5 py-8 text-white-bg md:px-10 md:py-10">
      <PageBackLink />
      <div className="mx-auto max-w-6xl">
        <div className="mt-20 grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start">
          <div>
            <p className="font-p text-[11px] uppercase tracking-[0.2em] text-blue-light">
              Contact
            </p>
            <h1 className="mt-4 font-heading text-[clamp(4rem,10vw,9rem)] leading-[0.8]">
              LET&apos;S TALK<span className="text-blue-main">.</span>
            </h1>
            <p className="mt-6 max-w-xl font-p text-lg leading-relaxed text-white/70">
              For a role, collaboration, or project conversation, send a message
              and I will get back to you.
            </p>
            <ul className="mt-8 divide-y divide-white/15 border-y border-white/15 font-p text-sm">
              <li>
                <a
                  href="mailto:nibrasgazza@gmail.com"
                  className="block py-4 text-white/75 transition-colors hover:text-white"
                >
                  nibrasgazza@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/gazza-bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-4 text-white/75 transition-colors hover:text-white"
                >
                  github.com/gazza-bot
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/adil-nibras-gazza"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-4 text-white/75 transition-colors hover:text-white"
                >
                  linkedin.com/in/adil-nibras-gazza
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/nibrasgazza"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-4 text-white/75 transition-colors hover:text-white"
                >
                  instagram.com/nibrasgazza
                </a>
              </li>
            </ul>
          </div>

          <Suspense fallback={<p className="font-p text-sm text-white/60">Loading form...</p>}>
            <ConnectForm embedded />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
