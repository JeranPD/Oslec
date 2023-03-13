// import moment from "moment";
// import { Link } from "react-router-dom";
// import { useAppContext } from "../context/appContext";
// import Wrapper from "../assets/wrappers/CustomerInfo";
// import CustomerInfo from "./CustomerInfo";
// import {Modal, Button} from 'react-bootstrap'
// import { useState } from "react";

// const OverdueTable = ({
//   _id,
//   trackingNumber,
//   lastName,
//   firstName,
//   product,
//   serialNumber,
//   brand,
//   replacedParts,
//   fixingparts,
//   description,
//   estimateStart,
//   estimateEnd,
//   status,
//   address,
//   price,
//   createdAt,
//   warrantyStartAt,
//   warrantyEndAt,
//   isTrue,
//   paymentStatus,
//   pickUp,
//   diagnosis,
//   replacedPartsPrice,
//   serviceFee,
//   partsDelivery,
//   daysWarranty,
//   appliancesType
// }) => {
//   let date = moment(createdAt);
//   date = date.format("MM Do, YYYY");
  
//   price = Number(serviceFee) + Number(replacedPartsPrice)
  
//   return (
//     <>
//         <h5 className="alert alert-warning  p-3" style={{textAlign: "center"}}>
//             Sir Carlo, 2 Days had passed and it was still pending
//         </h5>
//         <div className="table-body" style={{overflowX : 'auto', fontSize: '14px'}}>
//             <table className="table table-striped table-bordered table-responsive">
//                 <thead style={{ fontSize: 13 }}>
//                     <tr>
//                         <th>TRACKING NUMBER</th>
//                         <th>LAST NAME</th>
//                         <th>FIRST NAME</th>
//                         <th>PRODUCT</th>
//                         <th>PRODUCT DESCRIPTION</th>
//                         <th>SERIAL NO.</th>
//                         <th>BRAND</th>
//                         <th>REPLACEMENT PARTS</th>
//                         <th>FIXING PARTS</th>
//                         <th>DESCRIPTION</th>
//                         <th>ESTIMATE</th>
//                         <th>STATUS</th>
//                         <th>ADDRESS</th>
//                         <th>PRICE</th>
//                         <th>DATE</th>
//                     </tr>
//                 </thead>
//                 <tbody style={{ fontSize: 13 }}>
//                     <tr>
//                         <td>{trackingNumber}</td>
//                         <td>{lastName}</td>
//                         <td>{firstName}</td>
//                         <td>{appliancesType}</td>
//                         <td>{product}</td>
//                         <td>{serialNumber}</td>
//                         <td>{brand}</td>
//                         <td>{replacedParts}</td>
//                         <td>{fixingparts}</td>
//                         <td>{description}</td>
//                         <td>{`${moment(estimateStart).format("MMM Do YY")} ~ ${moment(estimateEnd).format("MMM Do YY")}`}</td>
//                         <td>{status}</td>
//                         <td>{address}</td>
//                         <td>{price}</td>
//                         <td>{moment(createdAt).format("MM/DD/YYYY")}</td>
//                     </tr>
//                 </tbody>
//             </table>
//         </div>
    
//     </>
//   );
// };

// export default OverdueTable;
