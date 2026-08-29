import { Analytics } from "@vercel/analytics/react";
import {
  Navbar,
  Hero,
  Projects,
  MyTargets,
  Footer,
  AIAssistantWidget,
  Intro,
} from ".";
// import StatusForm from "./widgets/StatusForm";

function App() {
  return (
    <>
      <div className="">
        {/* <StatusForm isSuccess={false} isVisible={true}/> */}
        <Intro />
        <Navbar />
        <Hero />
        <Projects />
        <MyTargets />
        <Footer />
        <AIAssistantWidget />
      </div>
      <Analytics />
    </>
  );
}

export default App;
