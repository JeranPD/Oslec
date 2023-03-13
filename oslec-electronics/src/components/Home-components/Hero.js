import Maintenance from "../../assets/image/Maintenance.png";

// Css
import "../../assets/css/Home.css";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero_text">
        <h1>
          <span>Welcome to </span>
          <span className="highlight">Oslec</span> <br></br>
          <span className="highlight">Electronics</span>
          <span> Services</span>
        </h1>
        <h4>It's a pleasure having you</h4>
        <button className="btn--text btn--scroll-to">Learn more ⬇</button>
      </div>
      <img
        src={Maintenance}
        className="img-fluid header__img"
        alt="Simple repairing icon"
      />
    </div>
  );
};

export default Hero;
