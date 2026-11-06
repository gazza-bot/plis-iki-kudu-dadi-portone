import { lazy, Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";
import { Navbar, Hero, Projects, MyTargets, Footer } from ".";

const Intro = lazy(() => import("./sections/Intro").then((m) => ({ default: m.Intro })));
const AIAssistantWidget = lazy(() =>
  import("./widgets/AIAssistantWidget").then((m) => ({ default: m.AIAssistantWidget })),
);

function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[110] border border-ink bg-white-bg px-4 py-3 font-p text-sm text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>

      <Suspense fallback={null}>
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
