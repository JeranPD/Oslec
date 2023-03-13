import { useAppContext } from "../context/appContext.js";
import { useEffect } from "react";
import Customer from "./CustomerLatestForm";
import Wrapper from "../assets/wrappers/CustomersContainer";
import "../assets/css/AllCustomers.css";
const LatesCustomer = () => {
  const {
    getCustomers,
    customers,
  } = useAppContext();
  
  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <Wrapper>
      <h5>
        Latest Customer
      </h5>
      <div className="customer">
        {customers.map((customer) => {
          return <Customer key={customer._id} {...customer}/>;
        })}
      </div>
      
    </Wrapper>
  );
};

export default LatesCustomer;
