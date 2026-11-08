import { MyTargets } from "../components/sections/MyTargets";
import { PageBackLink } from "../components/ui/PageBackLink";
import { useEscapeToHome } from "../hooks/useEscapeToHome";

export default function AboutPage() {
  useEscapeToHome();

  return (
    <div className="min-h-screen bg-ink text-white-bg">
      <PageBackLink />
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-32 md:px-8 md:pb-24">
        <p className="font-p text-[11px] uppercase tracking-[0.2em] text-blue-light">
          About Adil
        </p>
        <h1 className="mt-4 max-w-4xl font-heading text-[clamp(4rem,10vw,9rem)] leading-[0.8]">
          HOW I <span className="text-blue-light">WORK</span>
        </h1>
        <div className="mt-10 grid gap-8 lg:grid-cols-[320px_1fr]">
          <img
            src="/PhotoAing.webp"
            alt="Adil Nibras Gazza"
            width={768}
            height={1152}
            fetchPriority="high"
            className="aspect-[3/4] w-full max-w-sm border border-white/15 object-cover shadow-[6px_6px_0_0_rgba(33,133,213,0.65)]"
          />
          <div className="max-w-2xl lg:pt-4">
            <p className="font-p text-lg leading-relaxed text-white/75 md:text-xl">
              I study Information Technology at Universitas Brawijaya, with a
              focus on frontend development and UI/UX design. I turn rough
              ideas into interfaces that are clear, useful, and easy to
              navigate.
            </p>
          </div>
        </div>
      </section>
      <MyTargets />
    </div>
  );
}
