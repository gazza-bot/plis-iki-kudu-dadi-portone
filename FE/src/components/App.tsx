import { lazy, Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  AboutPage,
  ChatbotPage,
  ContactPage,
  HomePage,
  ProjectsPage,
} from "../pages";

const Intro = lazy(() => import("./sections/Intro").then((m) => ({ default: m.Intro })));
function App() {
  return (
    <BrowserRouter>
      <a
        href="#main"
        className="sr-only z-[110] border border-ink bg-white-bg px-4 py-3 font-p text-sm text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>

      <Suspense fallback={null}>
        <Intro />
      </Suspense>

      <main id="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
        </Routes>
      </main>

      <Analytics />
    </BrowserRouter>
  );
}

export default App;
