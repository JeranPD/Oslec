import moment from "moment";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { TiLocation } from "react-icons/ti";
import { AiOutlineNumber } from "react-icons/ai";
import { BsFillCalendar2CheckFill } from "react-icons/bs";
import { MdDescription } from "react-icons/md";
import { TbCalendarStats } from "react-icons/tb";
import { GoDiffAdded } from "react-icons/go";
import Wrapper from "../assets/wrappers/Customer";
import CustomerInfo from "./CustomerInfo";

const Records = ({
  trackingNumber,
  lastName,
  firstName,
  product,
  category,
  brand,
  description,
  estimate,
  status,
  address,
  price,
  createdAt,
}) => {
  
  let date = moment(createdAt);
  date = date.format("MM Do, YYYY");
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{lastName.charAt(0)}</div>
        <div className="info">
          <h5>{`${lastName}, ${firstName}`}</h5>
          <p>{product}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <CustomerInfo icon="Category:" text={category} />
          <CustomerInfo icon="Brand:" text={brand} />
          <CustomerInfo icon={<TiLocation />} text={address} />
          <CustomerInfo icon={<AiOutlineNumber />} text={trackingNumber} />
          <CustomerInfo icon={<BsFillCalendar2CheckFill />} text={estimate} />
          <CustomerInfo icon={<MdDescription />} text={description} />
          <CustomerInfo icon="₱" text={price} />
          <CustomerInfo icon={<GoDiffAdded />} text={date} />
          <div className={`status ${status}`}>{status}</div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Records;
