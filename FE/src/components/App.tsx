import { lazy, Suspense } from "react";
import { lazy, Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";
import { Navbar, Hero, Projects, MyTargets, Footer } from ".";

const Intro = lazy(() => import("./sections/Intro").then(m => ({ default: m.Intro })));
const AIAssistantWidget = lazy(() => import("./widgets/AIAssistantWidget").then(m => ({ default: m.AIAssistantWidget })));

function AppLoader() {
  return null;
}
import { Navbar, Hero, Projects, MyTargets, Footer } from ".";

const Intro = lazy(() => import("./sections/Intro").then((m) => ({ default: m.Intro })));
const AIAssistantWidget = lazy(() =>
  import("./widgets/AIAssistantWidget").then((m) => ({ default: m.AIAssistantWidget })),
);

function IntroFallback() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white-bg">
      <div className="h-4 w-4 animate-pulse rounded-full bg-blue-main" />
    </div>
  );
}

function App() {
  return (
    <>
      <div className="">
        <Suspense fallback={<AppLoader />}>
          <Intro />
        </Suspense>
        <Suspense fallback={<IntroFallback />}>
          <Intro />
        </Suspense>
        <Navbar />
        <Hero />
        <Projects />
        <MyTargets />
        <Footer />
        <Suspense fallback={null}>
          <AIAssistantWidget />
        </Suspense>
        <Suspense fallback={null}>
          <AIAssistantWidget />
        </Suspense>
      </div>
      <Analytics />
    </>
  );
}

export default App;
