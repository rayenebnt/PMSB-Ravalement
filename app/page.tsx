import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Services from "@/components/sections/Services";
import Method from "@/components/sections/Method";
import About from "@/components/sections/About";
import Realisations from "@/components/sections/Realisations";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <Method />
      <About />
      <Realisations />
    </>
  );
}
