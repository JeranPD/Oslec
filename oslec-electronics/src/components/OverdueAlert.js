import { useAppContext } from "../context/appContext.js";
import { useEffect } from "react";
import OverdueTable from "./OverdueTable";
import Wrapper from "../assets/wrappers/OverdueContainer";
import "../assets/css/AllCustomers.css";
import moment from "moment";

const OverdueAlert = () => {
  const {
    getCustomers,
    customers,
  } = useAppContext();
  
  useEffect(() => {
    getCustomers();
  }, []);

  let daysWarranty
  let eventdate;
  let todaysdate;
  let fiveDaysAgo
  function AddOrSubractDays(startingDate, number, add) {    
      if (add) {
        let today = new Date(startingDate)
        fiveDaysAgo = new Date(new Date().setDate(today.getDate() + number));
        eventdate = moment(fiveDaysAgo);
        todaysdate = moment();
      
        return eventdate.diff(todaysdate, 'days');
      } 
    }
    
  return (
    <Wrapper>
    <h5 className="alert alert-warning  p-3" style={{textAlign: "center"}}>
        Sir Carlo, 2 Days had passed and it was still pending
    </h5>
    <div className="table-body" style={{overflowX : 'auto', fontSize: '14px'}}>
        <table className="table table-striped table-bordered table-responsive">
            <thead style={{ fontSize: 13 }}>
                <tr>
                    <th>TRACKING NUMBER</th>
                    <th>LAST NAME</th>
                    <th>FIRST NAME</th>
                    <th>PRODUCT</th>
                    <th>PRODUCT DESCRIPTION</th>
                    <th>SERIAL NO.</th>
                    <th>BRAND</th>
                    <th>REPLACEMENT PARTS</th>
                    <th>FIXING PARTS</th>
                    <th>DESCRIPTION</th>
                    <th>ESTIMATE</th>
                    <th>STATUS</th>
                    <th>ADDRESS</th>
                    <th>PRICE</th>
                    <th>DATE</th>
                </tr>
            </thead>
            <tbody style={{ fontSize: 13 }}>
                {customers.map(customer =>{
                  AddOrSubractDays(customer.createdAt, 2, true)
                  eventdate = moment(fiveDaysAgo);
                  todaysdate = moment();
                  daysWarranty = eventdate.diff(todaysdate, 'days');
                  customer.price = Number(customer.serviceFee) + Number(customer.replacedPartsPrice)
                  if(daysWarranty === 0 && customer.status === 'pending'){
                    return (
                      <tr>
                        <td>{customer.trackingNumber}</td>
                        <td>{customer.lastName}</td>
                        <td>{customer.firstName}</td>
                        <td>{customer.appliancesType}</td>
                        <td>{customer.product}</td>
                        <td>{customer.serialNumber}</td>
                        <td>{customer.brand}</td>
                        <td>{customer.replacedParts}</td>
                        <td>{customer.fixingparts}</td>
                        <td>{customer.description}</td>
                        <td>{`${moment(customer.estimateStart).format("MMM Do YY")} ~ ${moment(customer.estimateEnd).format("MMM Do YY")}`}</td>
                        <td>{customer.status}</td>
                        <td>{customer.address}</td>
                        <td>{customer.price}</td>
                        <td>{moment(customer.createdAt).format("MM/DD/YYYY")}</td>
                    </tr>
                    )
                  }
                })}
            </tbody>
        </table>
    </div>

</Wrapper>
  );
};

export default OverdueAlert;
