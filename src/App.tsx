import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

export default function App() {
  return (
    <main style={{ background: "#0C0C0C", overflowX: "clip" }}>
      <Hero />
      <Marquee />
      <About />
      <Services />
      <Projects />
      <Contact />
    </main>
  );
}
