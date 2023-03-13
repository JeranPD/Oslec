// Technician Profile
import technicianProfile from "../../assets/image/technician.jpg";
import React, { useRef } from "react";
import { Link } from "react-router-dom";

// Css
import "../../assets/css/About-electrician.css";

const AboutElectrician = () => {

  const navRef = useRef();

  return (
    <div className="homeabout-container">
      <div className="homemain" ref={navRef}>
        <img src={technicianProfile} className="technicianprofile-home" />
        <div className="homeabout-text">
          <h1 className="alignC"><span className="os-color">Ca</span>rlo Calusor</h1>
          <h5 className="alignC">Owner of OSLEC Electronics</h5>
          <h5 className="alignC">10 years of experience as a technician</h5>
          <p className="techStatement">
          It all started when I was five years old. When my uncle brought a Cathode Ray Tube board, I became curious about how the small electronic parts worked. While holding the entire board of a CRT-type television, I felt happy imagining the different shapes, colors, and forms that look like a building or a city, each with its own functions to make it work. I was interested in electronics in this situation. 
          </p>
          <Link className="btn--text btn--scroll-to" to="/aboutUS">
            Read more...
          </Link>
        </div>
      </div>
    </div>
  );
};
export default AboutElectrician;
