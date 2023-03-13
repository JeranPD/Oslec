import moment from "moment";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Customer";
import CustomerInfo from "./CustomerInfo";
import {Modal, Button} from 'react-bootstrap'
import { useState } from "react";
const CustomerForm = ({

  trackingNumber,
  lastName,
  firstName,
  product,
  serialNumber,
  brand,
  replacedParts,
  fixingparts,
  description,
  estimate,
  status,
  address,
  price,
  createdAt,
  warrantyStartAt,
  warrantyEndAt,
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
          <CustomerInfo icon="Brand:" text={brand} />
          <CustomerInfo icon="Serial No.:" text={serialNumber} />
          <CustomerInfo icon="Replacement Parts:" text={replacedParts} />
          <CustomerInfo icon="Fixing Parts:" text={fixingparts} />
          <CustomerInfo icon="Address:" text={address} />
          <CustomerInfo icon="Tracking No.:" text={trackingNumber} />
          <CustomerInfo icon="Estimate:" text={estimate} />
          <CustomerInfo icon="Description:" text={description} />
          <CustomerInfo icon="₱" text={price} />
          <CustomerInfo icon="Date:" text={date} />
          <div className={`status ${status}`}>{status}</div>
          <CustomerInfo icon="Warranty Start At:" text={warrantyStartAt} />
          <CustomerInfo icon="Warranty End At:" text={warrantyEndAt} />
        </div>
      </div>
    </Wrapper>
  );
};

export default CustomerForm;
