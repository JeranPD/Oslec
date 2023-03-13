import moment from "moment";
import Wrapper from "../assets/wrappers/TrackinInfo";
import CustomerInfo from "./CustomerInfo";

const Customer = ({
  trackingNumber,
  lastName,
  firstName,
  product,
  serialNumber,
  brand,
  replacedParts,
  fixingparts,
  description,
  estimateStart,
  estimateEnd,
  status,
  address,
  price,
  createdAt,
  warrantyStartAt,
  warrantyEndAt,
  isTrue,
  paymentStatus,
  pickUp,
  diagnosis,
  replacedPartsPrice,
  serviceFee,
  partsDelivery,
  hundredDays,
  appliancesType,
  warranting,
  endOfWarranting
}) => {
  let date = moment(createdAt);
  date = date.format("MM Do, YYYY");
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{lastName.charAt(0)}</div>
        <div className="info">
          <h5>{`${lastName}, ${firstName}`}</h5>
          <p>{`${product} ${appliancesType}`}</p>
        </div>
      </header>
      <div className="content">
      <div className="content-center">  
      <CustomerInfo icon="Brand:" text={brand} />
          <CustomerInfo icon="Serial No.:" text={serialNumber} />
          <CustomerInfo icon="Initial Diagnosis:" text={diagnosis} />
          <CustomerInfo icon="Replacement Parts:" text={replacedParts} />
          <CustomerInfo icon="Price:" text={replacedPartsPrice} />
          <CustomerInfo icon="Parts Delivery Date:" text={partsDelivery} />
          <CustomerInfo icon="Fixing Parts:" text={fixingparts} />
          <CustomerInfo icon="Address:" text={address} />
          <CustomerInfo icon="Tracking No.:" text={trackingNumber} />
          <CustomerInfo icon="Estimated Finish Date:" text={`${moment(estimateStart).format("MMM Do YY")} ~ ${moment(estimateEnd).format("MMM Do YY")}`} />
          <CustomerInfo icon="Description:" text={description} />
          <CustomerInfo icon="Service Fee:" text={serviceFee} />
          <CustomerInfo icon="Total Price" text={price} />
          <CustomerInfo icon="Date:" text={date} />
          <div className={`status ${status}`}>{status}</div>
          <CustomerInfo icon="Payment Status:" text={paymentStatus} />
          <CustomerInfo icon="Pick up or Delivery:" text={pickUp} />
          <CustomerInfo icon="100 Days Warranty:" text={hundredDays} />
          <CustomerInfo icon="Warranting:" text={warranting} />
          <CustomerInfo icon="End of Warranting:" text={endOfWarranting} />
        </div>
      </div>
    </Wrapper>
  );
};

export default Customer;
