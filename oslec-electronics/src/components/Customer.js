import moment from "moment";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Customer";
import CustomerInfo from "./CustomerInfo";
import {Modal, Button} from 'react-bootstrap'
import { useState } from "react";

const Customer = ({
  _id,
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
  const { setEditCustomer, deleteCustomer } = useAppContext();
  let date = moment(createdAt);
  date = date.format("MM Do, YYYY");
  const [show, setShow] = useState(false)

  const handleClose = () =>{
    setShow(false)
  }

  const openModal = () =>{
    setShow(true)
  }
  
  price = Number(serviceFee) + Number(replacedPartsPrice)
  
  return (
    <Wrapper>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you really want to delete this data?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => deleteCustomer(_id)}>
            Delete
          </Button>                                           
          <Button variant="primary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
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
        <footer>
          <div className="actions">
            <Link
              to="/dashboard/add-customer"
              className="btn edit-btn"
              onClick={() => setEditCustomer(_id)}
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => openModal()}
              disabled={isTrue ? true : false}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Customer;
