// Home Components
import Carousel from "./Carousel";
import Footer from "./Footer";
import AboutElectrician from "./Home-components/About-electrician";
import Hero from "./Home-components/Hero";
import Services from "./Home-components/Services";
import Offers from "./Offers";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.title = "Home";
  }, []);
  return (
    <>
      <Hero />
      <Services />
      <AboutElectrician />
      <Carousel />
      <Offers />
      <Footer />
    </>
  );
};

export default Home;
