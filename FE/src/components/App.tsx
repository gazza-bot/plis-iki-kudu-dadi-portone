import { lazy, Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";
import { Navbar, Hero, Projects, MyTargets, Footer } from ".";

const Intro = lazy(() => import("./sections/Intro").then(m => ({ default: m.Intro })));
const AIAssistantWidget = lazy(() => import("./widgets/AIAssistantWidget").then(m => ({ default: m.AIAssistantWidget })));

function AppLoader() {
  return null;
}

function App() {
  return (
    <>
      <div className="">
        <Suspense fallback={<AppLoader />}>
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
      </div>
      <Analytics />
    </>
  );
}

export default App;
