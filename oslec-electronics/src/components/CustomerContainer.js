import { useAppContext } from "../context/appContext.js";
import { useEffect } from "react";
import Loading from "./Loading";
import Customer from "./Customer";
import Wrapper from "../assets/wrappers/CustomersContainer";
import PageBtnContainer from "./PageBtnContainer.js";
import React, { useRef } from "react";
import "../assets/css/AllCustomers.css";
import moment from "moment";

const CustomerContainer = () => {
  const {
    getCustomers,
    customers,
    isLoading,
    page,
    totalCustomer,
    search,
    searchStatus,
    sort,
    numofPages,
    searchAllLastName,
    searchAllFirstName
  } = useAppContext();
  const componentRef = useRef();

  
  useEffect(() => {
    getCustomers();
  }, [page, search, searchAllLastName, searchAllFirstName, searchStatus, sort]);

 
  if (isLoading) {
    return <Loading center />;
  }

  if (customers.length === 0) {
    return (
      <Wrapper>
        <h2>No Customers Display</h2>
      </Wrapper>
    );
  }

  let isTrue;
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
    // customers.map((customer) =>{
    //   if(customer.status === 'completed'){
    //     AddOrSubractDays(customer.updatedAt, 100, true)
    //     eventdate = moment(fiveDaysAgo);
    //     todaysdate = moment();
    //     daysWarranty = eventdate.diff(todaysdate, 'days');
    //     if(daysWarranty > 100) {
    //       daysWarranty = 'Invalid Warranty';
    //     }
    //   } else {
    //     daysWarranty = 'Not Available';
    //   }
    // })

  return (
    <Wrapper>
      <h5>
        {totalCustomer} Customer{customers.length > 1 && "s"} found
      </h5>
      <div className="customer" ref={componentRef}>
        {customers.map((customer) => {
          if(customer.status === "completed"){
            isTrue = true
          } else if(customer.status !== "completed"){
            isTrue = false
          }
          let date_1 = new Date(moment(customer.createdAt).format("MM/DD/YYYY"));
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
            if(customer.status !== "completed"){
              hundredDays = `Your Status is still ${customer.status}`;      
            }
            // if(hundredDays <= 0) {
            //   hundredDays = 'Your warranty is not available';
            // }
            if(hundredDays >= 1 && hundredDays <= 100) {
              hundredDays = `You have ${hundredDays} days left`;
            }
          // if(customer.status === 'completed'){
          //   AddOrSubractDays(customer.updatedAt, 100, true)
          //   eventdate = moment(fiveDaysAgo);
          //   todaysdate = moment();
          //   daysWarranty = eventdate.diff(todaysdate, 'days');
          //   if(daysWarranty > 100) {
          //     daysWarranty = 'Invalid Warranty';
          //   }
          //   } else {
          //     daysWarranty = `Your Status is still ${customer.status}`;
          //   }
          //   if(daysWarranty === 0){
          //     daysWarranty = `Your warranty is not available`;
          //   }
            return <Customer key={customer._id} {...customer} isTrue={isTrue}  hundredDays={hundredDays}/>;
        })}
      </div>
      <div className="footer-section">
        
        {numofPages >= 1 && <PageBtnContainer />}
      </div>
    </Wrapper>
  );
};

export default CustomerContainer;
