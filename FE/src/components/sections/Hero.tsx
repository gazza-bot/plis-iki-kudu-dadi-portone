import { GithubStats } from "../widgets/GithubStats";
import tsLogo from "../../assets/ts_logo.svg";
import reactIcon from "../../assets/React-icon.svg";

const photoAing = "/PhotoAing.webp";

const stack = ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express.js"];

export function Hero() {
  return (
    <section
      id="about"
      className="relative overflow-hidden border-b border-ink/10 bg-white-bg"
    >
      <div className="mx-auto max-w-7xl px-5 pt-14 pb-16 md:px-8 md:pt-20 md:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <p className="font-p text-[11px] uppercase tracking-[0.2em] text-blue-deep">
              Portfolio / Information Technology
            </p>

            <h1 className="mt-5 font-heading text-[clamp(3.6rem,10vw,8.5rem)] leading-[0.82] tracking-tight text-ink">
              ADIL NIBRAS <span className="text-blue-main">GAZZA</span>
            </h1>

            <p className="mt-5 font-p text-sm uppercase tracking-[0.18em] text-ink/70">
              UI/UX Designer / Frontend Developer
            </p>

            <p className="mt-6 max-w-xl font-p text-lg leading-relaxed text-ink/75 md:text-xl">
              I'm an Information Technology student at Universitas Brawijaya
              with a strong enthusiasm for technology, currently focusing on web
              development and joining competitions on campus. I enjoy building
              things that are both functional and meaningful.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex items-center justify-center border border-ink bg-ink px-5 py-3 font-p text-xs uppercase tracking-[0.18em] text-white-bg transition-colors hover:border-blue-deep hover:bg-blue-deep"
              >
                See selected projects
              </a>
              <a
                href="mailto:nibrasgazza@gmail.com"
                className="inline-flex items-center justify-center border border-ink/25 px-5 py-3 font-p text-xs uppercase tracking-[0.18em] text-ink transition-colors hover:border-ink hover:bg-white"
              >
                Email Adil
              </a>
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-ink/15 pt-5 font-p text-[11px] uppercase tracking-[0.16em] text-ink/70">
              {stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <MyPhoto />
          </div>
        </div>

        <div className="mt-14 md:mt-20">
          <GithubStats username="gazza-bot" />
        </div>
      </div>
    </section>
  );
}

function MyPhoto() {
  return (
    <div className="relative mx-auto w-full max-w-sm lg:ml-auto">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="0 0 382 556"
          fill="currentColor"
          className="h-[105%] w-[115%] text-blue-main/15"
          aria-hidden="true"
        >
          <path d="M25.1982 312.895C106.198 65.8949 103.198 11.8947 157.198 126.895C211.198 241.895 214.698 296.395 319.698 160.895C424.698 25.3946 197.699 -160.605 319.698 258.895C441.698 678.395 367.198 62.3951 221.698 370.395C76.198 678.395 -55.8018 559.895 25.1982 312.895Z" />
        </svg>
      </div>

      <div className="relative z-10 border border-ink bg-paper p-2 shadow-editorial">
        <img
          src={photoAing}
          alt="Adil Nibras Gazza"
          width={768}
          height={1152}
          fetchPriority="high"
          decoding="async"
          className="aspect-[3/4] w-full bg-white-bg object-cover"
        />
      </div>

      <div className="absolute top-8 -left-4 z-20 flex size-14 -rotate-6 items-center justify-center border border-ink bg-white-bg p-3 shadow-editorial-sm">
        <img
          src={tsLogo}
          alt="TypeScript"
          width={48}
          height={48}
          className="size-full"
        />
      </div>

      <div className="absolute -right-4 bottom-10 z-20 flex size-16 rotate-6 items-center justify-center border border-ink bg-white-bg p-3 shadow-editorial-sm">
        <img
          src={reactIcon}
          alt="React"
          width={64}
          height={64}
          className="size-full"
        />
      </div>
    </div>
  );
}
