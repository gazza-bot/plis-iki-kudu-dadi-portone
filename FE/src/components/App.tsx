import { Navbar, Hero, Projects, MyTargets, Footer, AIAssistantWidget } from '.';
import Intro from './sections/Intro';

function App() {
  return (
    <div className="">
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
