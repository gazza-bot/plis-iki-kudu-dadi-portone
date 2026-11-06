import { lazy, Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";
import { Navbar, Hero, Projects, MyTargets, Footer } from ".";

const Intro = lazy(() => import("./sections/Intro").then((m) => ({ default: m.Intro })));
const AIAssistantWidget = lazy(() =>
  import("./widgets/AIAssistantWidget").then((m) => ({ default: m.AIAssistantWidget })),
);

function IntroFallback() {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white-bg"
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">Loading portfolio</span>
      <div className="size-4 animate-pulse rounded-full bg-blue-main" />
    </div>
  );
}

function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[110] border border-ink bg-white-bg px-4 py-3 font-p text-sm text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>

      <Suspense fallback={<IntroFallback />}>
        <Intro />
      </Suspense>

      <Navbar />

      <main id="main">
        <Hero />
        <Projects />
        <MyTargets />
      </main>

      <Footer />

      <Suspense fallback={null}>
        <AIAssistantWidget />
      </Suspense>

      <Analytics />
    </>
  );
}

export default App;
