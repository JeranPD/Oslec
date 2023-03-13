import { useAppContext } from "../context/appContext.js";
import { useEffect } from "react";
import Loading from "./Loading";
import Wrapper from "../assets/wrappers/CustomersContainer";
import React, { useRef } from "react";
import "../assets/css/AllCustomers.css";
import moment from "moment";
import { useReactToPrint } from "react-to-print";
import { style } from "../assets/css/Analytics.js";
import {
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBTypography,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";

const SalesInvoiceContainer = () => {
  const {
    customers,
    getCustomers,
    isLoading,
    searchAllLastName,
    searchAllFirstName
  } = useAppContext();

  const refPrint = useRef();
  const handlePrint = useReactToPrint({
    content: () => refPrint.current,
    documentTitle: "Oslec Electronics Customer Receipt",
  });

  
  useEffect(() => {
    getCustomers();
  }, [searchAllLastName, searchAllFirstName ]);

 
  if (isLoading) {
    return <Loading center />;
  }
  let colorGreen;
  let green;

  let statusColor;
  let statusColorGreen;
  const align = {textAlign: 'center'}

  if (customers.length === 0) {
    return (
      <Wrapper>
        <h2>No Customers Display</h2>
      </Wrapper>
    );
  }
  
  // let daysWarranty
  // let eventdate;
  // let todaysdate;
  // let fiveDaysAgo
  // function AddOrSubractDays(startingDate, number, add) {    
  //     if (add) {
  //       let today = new Date(startingDate)
  //       fiveDaysAgo = new Date(new Date().setDate(today.getDate() + number));
  //       eventdate = moment(fiveDaysAgo);
  //       todaysdate = moment();
      
  //       return eventdate.diff(todaysdate, 'days');
  //     } 
  //   }
    let hundredDays = 100;
  return (
    <Wrapper>
      {customers.map((record, index) => {
        if(record.lastName.toLowerCase() === searchAllLastName.toLowerCase() || record.firstName.toLowerCase() === searchAllFirstName.toLowerCase()) {
          if(record.status === 'completed'){
            statusColor = '#d1e7dd'
            statusColorGreen = '#008000'
          } else{
            statusColor = '#ffc107'
            statusColorGreen = '#ffc107'
          }
          if(record.paymentStatus === 'paid'){
            colorGreen = '#d1e7dd'
            green = '#008000'
          } else{
            colorGreen = '#ffc107'
            green = '#ffc107'
          }
          if(record.status === 'completed'){
            let date_1 = new Date(moment(record.createdAt).format("MM/DD/YYYY"));
            let date_2 = new Date();
            
            let finalResult;
            const days = (date_1, date_2) =>{                                                           
              let difference = date_1.getTime() - date_2.getTime();
              let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
              return TotalDays;
            }
            let result = days(date_1, date_2)
            result = Math.abs(result)
            finalResult = result
            hundredDays = hundredDays - Number(finalResult)
            if(hundredDays <= 0 || hundredDays > 100) {
              hundredDays = 'Your warranty is not available';
            }
      
              // if(hundredDays <= 0) {
              //   hundredDays = 'Your warranty is not available';
              // }
              if(hundredDays >= 1 && hundredDays <= 100) {
                hundredDays = `You have ${hundredDays} days left`;
              }
          } else {
            hundredDays = `Your Status is still ${record.status}`;
          }
          return (
            <MDBContainer className="py-5" >                                              
            <MDBCard className="p-4">
              <MDBCardBody ref={refPrint}>
                <h2 style={align}><span className="os-color">Os</span>lec Electronics Services</h2>
                <h3>Customer Invoice</h3>
                <MDBRow>
                  <MDBCol xl="8">
                    <MDBTypography listUnStyled>
                      <li className="text-muted">
                        Customer: <span style={{ color: "#5d9fc5" }}>{`${record.firstName} ${record.lastName}`}</span>
                      </li>
                      <li className="text-muted">{`Address: ${record.address}`}</li>
                    </MDBTypography>
                  </MDBCol>
                  <MDBCol xl="4">
                    <MDBTypography listUnStyled>
                      <li className="text-muted">
                        <MDBIcon fas icon="circle" style={{ color: "#84B0CA" }} />
                        <span className="fw-bold ms-1">Transaction Date: </span>{moment(record.createdAt).format("MM/DD/YYYY")}
                      </li>
                      <li className="text-muted">
                        <MDBIcon fas icon="circle" style={{ color: green }} />
                        <span className="fw-bold ms-1">Payment Status:</span>
                        <span className="badge text-black fw-bold ms-1" style={{ backgroundColor: colorGreen }}>
                          {record.paymentStatus} 
                        </span>
                      </li>
                      <li className="text-muted">
                        <MDBIcon fas icon="circle" style={{ color: statusColorGreen }} />
                        <span className="fw-bold ms-1">Status:</span>
                        <span className="badge text-black fw-bold ms-1" style={{ backgroundColor: statusColor }}>
                          {record.status}
                        </span>
                      </li>
                    </MDBTypography>
                  </MDBCol>
                </MDBRow>
                <MDBRow className="my-2 mx-1 justify-content-center">
                  <MDBTable striped borderless>
                    <MDBTableHead
                      // className="text-white"
                      style={{ backgroundColor: "#ff585f", color: "#050a3" }}
                    >
                      <tr>
                        <th scope="col">Data Name</th>
                        <th scope="col">Data</th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                    <tr>
                        <td>Tracking Number:</td>
                        <td>{record.trackingNumber}</td>
                      </tr>
                      <tr>
                        <td>Type of Appliances:</td>
                        <td>{record.appliancesType}</td>
                      </tr>
                      <tr>
                        <td>Product Description:</td>
                        <td>{record.product}</td>
                      </tr>
                      <tr>
                        <td>Brand:</td>
                        <td>{record.brand}</td>
                      </tr>
                      <tr>
                        <td>Serial Number:</td>
                        <td>{record.serialNumber}</td>
                      </tr>

                      <tr>
                        <td>Initial Diagnosis:</td>
                        <td>{record.diagnosis}</td>
                      </tr>
                      
                      <tr>
                        <td>Replacement Parts:</td>
                        <td>{record.replacedParts}</td>
                      </tr>

                      <tr>
                        <td>Price:</td>
                        <td>{record.replacedPartsPrice}</td>
                      </tr>
                      <tr>
                        <td>Fixing Parts:</td>
                        <td>{record.fixingparts}</td>
                      </tr>
                      <tr>
                        <td>Description:</td>
                        <td>{record.description}</td>
                      </tr>
                      <tr>
                        <td>Estimated Date:</td>
                        <td>{`${moment(record.estimateStart).format("MMM Do YY")} ~ ${moment(record.estimateEnd).format("MMM Do YY")}`}</td>
                      </tr>
                      <tr>
                        <td>Service Fee:</td>
                        <td>{record.serviceFee}</td>
                      </tr>
                      <tr>
                        <td>Pick up:</td>
                        <td>{record.pickUp}</td>
                      </tr>
                      <tr>
                        <td>100 Days of Warranty:</td>
                        <td>{hundredDays}</td>
                      </tr>
                      
                    </MDBTableBody>
                  </MDBTable>
                </MDBRow>
                <MDBRow>
                  <MDBCol xl="8">
                    <p className="ms-3">
                      Thank you for trusting us.
                    </p>
                  </MDBCol>
                  <MDBCol xl="3">
                    <p className="text-black float-start">
                      <span className="text-black me-3">Replacement Parts Price</span>
                      <span style={{ fontSize: "15px" }}>₱ {record.replacedPartsPrice}</span>
                    </p>
                    <p className="text-black float-start">
                      <span className="text-black me-3">Service Fee</span>
                      <span style={{ fontSize: "15px" }}>₱ {record.serviceFee}</span>
                    </p>
                    <p className="text-black float-start">
                      <span className="text-black me-3">Total Price</span>
                      <span style={{ fontSize: "15px" }}>₱ {record.price = Number(record.serviceFee) + Number(record.replacedPartsPrice)}</span>
                    </p>
                  </MDBCol>
                </MDBRow>
                <hr />
                
              </MDBCardBody>
            </MDBCard>
            <MDBCard>
              <MDBCardBody className="my-2 mx-1 justify-content-center">
                <button className="btn" style={style.chartConf} onClick={handlePrint}>
                      Print
                </button>
                </MDBCardBody>
            </MDBCard>
            
          </MDBContainer>
            );
        }
          
        })} 
    
      
    </Wrapper>
  );
};

export default SalesInvoiceContainer;
