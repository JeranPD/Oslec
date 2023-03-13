import Technician from "../assets/image/technician.jpg";
import "../assets/css/AboutUs.css";
import Footer from "./Footer";
import { CiFacebook } from "react-icons/ci";
import { RiMessengerLine } from "react-icons/ri";
import {  useEffect } from "react";

const AboutUs = () => {
  useEffect(() => {
    document.title = "About Us";
  }, []);
  return (
    <>
      <div className="about-section">
        <div className="aboutus-title">
          <h1>About us</h1>
        </div>
        <div className="aboutus-container">
          <div className="image-section-aboutus">
            <img src={Technician} className="aboutus-technician-profile" />
          </div>
          <div className="aboutus-content">
            <div className="article">
              <h3 className="f1-parag">
              My name is Carlo Calusor 
              25 years old 
              Owner of OSLEC Electronics and OSleds Led Light Signages 
              10 years of experience as a technician

              It all started when I was five years old. When my uncle brought a Cathode Ray Tube board, I became curious about how the small electronic parts worked. While holding the entire board of a CRT-type television, I felt happy imagining the different shapes, colors, and forms that look like a building or a city, each with its own functions to make it work. I was interested in electronics in this situation. I began doing small electronic projects in elementary school. During high school, I accepted student electronic projects. Even though it is exhausting, I am enjoying what I am doing. When I graduated from high school, I worked in my uncle's electronic shop in Lucena City, which is still in business today. It assisted me in gaining experience on how to run a business, to gain interpersonal experience in various situations, and to understand that there is a lesson in every failure. After many years, I decided to start my own electronic business with the help of my family. It may not appear to be easy, but because of my passion and because I am happy doing it, I became determined to help many people with their electronic problems by using my knowledge and experience.
              </h3>
              <button className="aboutus-btn">Contact us</button>
              <div className="aboutus-social">
                <span className="aboutus-social-link">
                <a href="https://www.facebook.com/doitelectronically"><CiFacebook /></a>
                </span>
                <span className="aboutus-social-link">
                  <a href="https://www.facebook.com/messages/t/2403974803219495"><RiMessengerLine /></a>
                </span>
                
              </div>
            </div>
          </div>
        </div>
        <div className="locationSection">
          <h3><span className="os-color">Os</span>lec Electronics Location</h3>
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1368.5727266730762!2d121.59333377741193!3d14.02345423966992!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x25d41f26b086d19e!2sOld%20Petron%20Gas%20Station!5e0!3m2!1sen!2sph!4v1676001994744!5m2!1sen!2sph" width="1000" height="450" style={{border: '0'}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div className="aboutus-footer-remargin">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default AboutUs;
