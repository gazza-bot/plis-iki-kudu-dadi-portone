import { useReveal } from "../../hooks/useReveal";

const targetsData = [
  {
    text: "Kerja Efisien",
    desc: "Sebagai developer, saya memastikan produk dirancang dengan sebaik-baiknya. Saya meriset kebutuhan dan risiko agar kesalahan bisa ditekan sejak awal.",
  },
  {
    text: "Target Jelas",
    desc: "Target yang jelas memudahkan perencanaan dan membuat pelaksanaan lebih rapi. Setiap tugas punya arah, sehingga hasil akhirnya maksimal.",
  },
  {
    text: "Terus Berkembang",
    desc: "Saya mengikuti perkembangan teknologi dan berkomitmen untuk terus belajar agar bisa memberi solusi yang relevan dan efisien di setiap proyek.",
  },
];

export function MyTargets() {
  const headingRef = useReveal<HTMLDivElement>();
  const listRef = useReveal<HTMLOListElement>(120);

  return (
    <section className="border-b border-ink/10 bg-white-bg py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-12 lg:gap-8">
        <div
          ref={headingRef}
          className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start"
        >
          <p className="font-p text-[11px] uppercase tracking-[0.2em] text-blue-deep">
            02 / How I work
          </p>
          <h2 className="mt-4 font-heading text-[clamp(3rem,7vw,5rem)] leading-[0.85] tracking-tight text-ink">
            MY
            <br />
            <span className="text-blue-main">TARGETS</span>
          </h2>
          <p className="mt-5 max-w-sm font-p text-base leading-relaxed text-ink/70">
            Tiga prinsip yang saya pegang saat merancang dan membangun produk.
          </p>
        </div>

        <ol
          ref={listRef}
          className="divide-y divide-ink/15 border-y border-ink/15 lg:col-span-8"
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
                <h3 className="font-heading text-3xl tracking-tight text-ink">
                  {target.text}
                </h3>
                <p className="mt-2 max-w-2xl font-p text-base leading-relaxed text-ink/70">
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
