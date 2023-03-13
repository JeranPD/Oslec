// image
import amplifier from "../../assets/image/Services/amplifier.png";
import dvd from "../../assets/image/Services/dvd-player.png";
import fan from "../../assets/image/Services/fan.png";
import led from "../../assets/image/Services/led.png";
import speaker from "../../assets/image/Services/loud-speaker.png";
import riceCooker from "../../assets/image/Services/rice-cooker.png";
import television from "../../assets/image/Services/television.png";
import washingMachine from "../../assets/image/Services/washing-machine.png";

import electricAppliance from "../../assets/image/Services/electric-appliance.png";

// Css
import "../../assets/css/Services.css";

const Services = () => {
  return (
    <div className="services-container">
      <h1 className="ourservices-text">Oslec Electronics Services</h1>
      <div className="service-row">
        <div className="service">
          <img src={amplifier} alt="amplifier" className="services-img" />
          <h2 className="service-name">Power Amplifier</h2>
        </div>
        <div className="service">
          <img src={dvd} alt="dvd" className="services-img" />
          <h2 className="service-name">Dvd/Karaoke Player/ Home Theater</h2>
        </div>
        <div className="service">
          <img src={fan} alt="fan" className="services-img" />
          <h2 className="service-name">Electric Fan</h2>
        </div>
        <div className="service">
          <img src={led} alt="led" className="services-img" />
          <h2 className="service-name">Flat Screen LED LCD TV</h2>
        </div>
        <div className="service">
          <img src={speaker} alt="speaker" className="services-img" />
          <h2 className="service-name">Speaker/Subwoofer</h2>
        </div>
        <div className="service">
          <img src={riceCooker} alt="riceCooker" className="services-img" />
          <h2 className="service-name">Rice Cooker</h2>
        </div>
        <div className="service">
          <img src={television} alt="television" className="services-img" />
          <h2 className="service-name">CRT Tube TV</h2>
        </div>
        <div className="service">
          <img
            src={washingMachine}
            alt="washingMachine"
            className="services-img"
          />
          <h2 className="service-name">Washing Machine/Dryer</h2>
        </div>
        <div className="service">
          <img
            src={electricAppliance}
            alt="electricAppliance"
            className="services-img"
          />
          <h2 className="service-name">And any Other Electronic Appliances</h2>
        </div>
      </div>
    </div>
  );
};

export default Services;

