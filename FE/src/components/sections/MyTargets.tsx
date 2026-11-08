import { useReveal } from "../../hooks/useReveal";

const targetsData = [
  {
    text: "Efficient Work",
    desc: "I make sure each product is designed with care. I research user needs and potential risks early so avoidable mistakes do not carry into later stages.",
  },
  {
    text: "Clear Direction",
    desc: "Clear goals make planning easier and keep execution organized. Each task has a purpose, so the final result stays focused.",
  },
  {
    text: "Keep Growing",
    desc: "I keep up with changes in technology and continue learning so I can offer relevant, practical solutions in each project.",
  },
];

export function MyTargets() {
  const headingRef = useReveal<HTMLDivElement>();
  const listRef = useReveal<HTMLOListElement>(120);

  return (
    <section className="border-b border-white/10 bg-ink py-20 text-white-bg md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-12 lg:gap-8">
        <div
          ref={headingRef}
          className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start"
        >
          <p className="font-p text-[11px] uppercase tracking-[0.2em] text-blue-light">
            02 / How I work
          </p>
          <h2 className="mt-4 font-heading text-[clamp(3rem,7vw,5rem)] leading-[0.85] tracking-tight text-white-bg">
            MY
            <br />
            <span className="text-blue-light">TARGETS</span>
          </h2>
          <p className="mt-5 max-w-sm font-p text-base leading-relaxed text-white/70">
            Three principles I keep in mind when designing and building products.
          </p>
        </div>

        <ol
          ref={listRef}
          className="divide-y divide-white/15 border-y border-white/15 lg:col-span-8"
        >
          {targetsData.map((target, index) => (
            <li
              key={target.text}
              className="grid gap-4 py-8 md:grid-cols-[72px_1fr] md:py-10"
            >
              <span className="font-heading text-4xl text-blue-main">
                0{index + 1}
              </span>
              <div>
                <h3 className="font-heading text-3xl tracking-tight text-white-bg">
                  {target.text}
                </h3>
                <p className="mt-2 max-w-2xl font-p text-base leading-relaxed text-white/70">
                  {target.desc}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
