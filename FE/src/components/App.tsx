import Navbar from './Navbar.tsx'
import Hero from './Hero.tsx'
import Projects from './Projects.tsx';
import MyTargets from './MyTargets.tsx';
import Footer from './Footer.tsx';

function App() {
  return (
    <div className="">
      <Navbar />
      <Hero />
      <Projects/>
      <MyTargets/>
      <Footer/>
    </div>
  );
}

export default App;
