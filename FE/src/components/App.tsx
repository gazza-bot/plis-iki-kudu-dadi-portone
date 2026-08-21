import { Analytics } from '@vercel/analytics/next';
import { Navbar, Hero, Projects, MyTargets, Footer, AIAssistantWidget, Intro } from '.';

function App() {
  return (
    <div className="">
      <Analytics/>
      <Intro />
      <Navbar />
      <Hero />
      <Projects/>
      <MyTargets/>
      <Footer/>
      <AIAssistantWidget/>
    </div>
  );
}

export default App;
