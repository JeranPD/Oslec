import { useAppContext } from "../context/appContext.js";
import { useEffect } from "react";
import Loading from "./Loading";
import Wrapper from "../assets/wrappers/CustomersContainer";
import PageRecordsContainer from "./PageRecordsContainer.js";
import React, { useRef } from "react";
import "../assets/css/AllCustomers.css";
import moment from "moment";

const RecordsContainer = () => {
  const {
    records,
    totalRecords,
    numofRecords,
    recordsPage,
    getRecords,
    isLoading,
    sort,
    searchLastName,
    searchFirstName,
  } = useAppContext();
  const componentRef = useRef();

  
  useEffect(() => {
    getRecords();
  }, [recordsPage, searchLastName, searchFirstName, sort]);

 
  if (isLoading) {
    return <Loading center />;
  }

  if (totalRecords === 0) {
    return (
      <Wrapper>
        <h2>No Customers Records Found</h2>
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
    
  return (
    <Wrapper>
      <h5>
        {searchLastName ? `${searchLastName} ${searchFirstName} Records Found` : totalRecords + ' Completed found'} 
      </h5>
      
      <div className="table-body" ref={componentRef}  style={{overflowX : 'auto', fontSize: '14px'}}>
        
            <table className="table table-striped table-bordered table-responsive">
              <thead style={{ fontSize: 13 }}>
                <tr>
                <th>TRACKING NUMBER</th>
                  <th>FULL NAME</th>
                  <th>TYPES OF APPLIANCES</th>
                  <th>APPLIANCES DESCRIPTION</th>
                  <th>SERIAL NO.</th>
                  <th>BRAND</th>
                  <th>INITIAL DIAGNOSIS</th>
                  <th>REPLACEMENT PARTS</th>
                  <th>Price</th>
                  <th>FIXING PARTS</th>
                  <th>DESCRIPTION</th>
                  <th>ESTIMATE</th>
                  <th>STATUS</th>
                  <th>ADDRESS</th>
                  <th>SERVICE FEE</th>
                  <th>TOTAL PRICE</th>
                  <th>PAYMENT STATUS</th>
                  <th>PICK UP/DELIVERY</th>
                  <th>DATE</th>
                  <th>100 Days of Warranty</th>
                  <th>WARRANTING</th>
                  <th>END OF WARRANTING</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: 13 }}>
              {records.map((record, index) => {
                
                let date_1 = new Date(moment(record.createdAt).format("MM/DD/YYYY"));
                let date_2 = new Date();
                let hundredDays = 100;
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
                  //   hundredDays = 'Invalid Warranty';
                  // }
                  if(hundredDays >= 1 && hundredDays <= 100) {
                    hundredDays = `You have ${hundredDays} days left`;
                  }

                  record.price = Number(record.serviceFee) + Number(record.replacedPartsPrice)
                  return (
                      <tr key={index}>
                        <td>{record.trackingNumber}</td>
                        <td>{`${record.firstName} ${record.lastName}`}</td>
                        <td>{record.appliancesType}</td>
                        <td>{record.product}</td>
                        <td>{record.serialNumber}</td>
                        <td>{record.brand}</td>
                        <td>{record.diagnosis}</td>
                        <td>{record.replacedParts}</td>
                        <td>{record.replacedPartsPrice}</td>
                        <td>{record.fixingparts}</td>
                        <td>{record.description}</td>
                        <td>{`${moment(record.estimateStart).format("MMM Do YY")} ~ ${moment(record.estimateEnd).format("MMM Do YY")}`}</td>
                        <td>{record.status}</td>
                        <td>{record.address}</td>
                        <td>{record.serviceFee}</td>
                        <td>{record.price}</td>
                        <td>{record.paymentStatus}</td>
                        <td>{record.pickUp}</td>
                        <td>{moment(record.createdAt).format("MM/DD/YYYY")}</td>
                        <td>{hundredDays}</td>
                        <td>{record.warranting}</td>
                        <td>{record.endOfWarranting}</td>
                      </tr>
                    );
                
                })}
            </tbody>
            </table>
      </div>
    
      <div className="footer-section">
        {numofRecords > 1 && <PageRecordsContainer />}
      </div>
    </Wrapper>
  );
};

export default RecordsContainer;
