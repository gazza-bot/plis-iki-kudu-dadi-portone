import Navbar from './Navbar.tsx'
import Hero from './Hero.tsx'
import Projects from './Projects.tsx';
import MyTargets from './MyTargets.tsx';

function App() {
  return (
    <div className="mb-10">
      <Navbar />
      <Hero />
      <Projects/>
      <MyTargets/>
    </div>
  );
}

export default App;
