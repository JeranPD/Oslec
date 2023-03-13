// image
import  {image1, image2, image3, image4} from './OffersImages'

// Css
import '../assets/css/Offers.css'

const Offers = () => {
  return (
    <div className="offers-container">
      <h1 className="offers-text">Oslec Electronics Offers</h1>
      <div className="offers-row">
        <div className="offers">
          <img src={image1} alt="amplifier" className="offers-img" />
          <h2 className="offers-name">100% Trusted</h2>
        </div>
        <div className="offers">
          <img src={image2} alt="dvd" className="offers-img" />
          <h2 className="offers-name">100 days Guarantee on Repairs</h2>
        </div>
        <div className="offers">
          <img src={image3} alt="fan" className="offers-img" />
          <h2 className="offers-name">Free Pick up & Delivery</h2>
        </div>
        <div className="offers">
          <img src={image4} alt="led" className="offers-img" />
          <h2 className="offers-name">Free Check & Estimate</h2>
        </div>
      </div>
    </div>
  );
};

export default Offers;

