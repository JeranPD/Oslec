import { useState, useEffect } from "react";
import Wrapper from "../assets/wrappers/TrackCustomer";
import Customer from "./trackingForm";
import axios from "axios";
import "../assets/css/tracking.css";
import Footer from "./Footer";
import styled from 'styled-components'
import moment from "moment";
const MainContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 0 16px;
`

const StepContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 70px;
  position: relative;
  :before {
    content: '';
    position: absolute;
    background: #f3e7f3;
    height: 4px;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
  }
  :after {
    content: '';
    position: absolute;
    background: var(--color-tertiary);
    height: 4px;
    width: ${({ width }) => width};
    top: 50%;
    transition: 0.4s ease;
    transform: translateY(-50%);
    left: 0;
  }
`

const StepWrapper = styled.div`
  position: relative;
  z-index: 1;
`

const StepStyle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ step }) =>
  step === 'completed' ? 'var(--color-tertiary)' : '#F3E7F3'};
  border: 3px solid ${({ step }) =>
      step === 'completed' ? 'var(--color-tertiary)' : '#F3E7F3'};
  transition: 0.4s ease;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StepCount = styled.span`
  font-size: 19px;
  color: ${({ step }) =>
  step === 'completed' ? 'var(--color-tertiary)' : '#F3E7F3'};
  @media (max-width: 600px) {
    font-size: 16px;
  }
`

const StepsLabelContainer = styled.div`
  position: absolute;
  top: 66px;
  left: 50%;
  transform: translate(-50%, -50%);
`

const StepLabel = styled.span`
  font-size: 19px;
  color: #050a30;
  @media (max-width: 600px) {
    font-size: 16px;
  }
`

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 -15px;
  margin-top: 100px;
`

const ButtonStyle = styled.button`
  border-radius: 4px;
  border: 0;
  background: #050a30;
  color: #ffffff;
  cursor: pointer;
  padding: 8px;
  width: 90px;
  :active {
    transform: scale(0.98);
  }
  :disabled {
    background: #f3e7f3;
    color: #000000;
    cursor: not-allowed;
  }
`

const CheckMark = styled.div`
  font-size: 26px;
  font-weight: 600;
  color: var(--color-tertiary);
  -ms-transform: scaleX(-1) rotate(-46deg); /* IE 9 */
  -webkit-transform: scaleX(-1) rotate(-46deg); /* Chrome, Safari, Opera */
  transform: scaleX(-1) rotate(-46deg);
`



const Tracking = () => {
  const [newCustomer, setNewCustomer] = useState([]);
  const [customers, setCustomer] = useState();
  const [search, setSearch] = useState("");
  let message =
    "This Tracking Number does not Exist, please double check. Thank you!";
  const displayData = async () => {
    return await axios
      .get(`/api/v1/tracking`)
      .then((res) => {
        setCustomer(res.data);
        setNewCustomer(res.data);
      })
      .catch((err) => console.log(err));
  };
 
  useEffect(() => {
    displayData();
    document.title = "Tracking";
  }, []);

  const steps = [
    {
      label: 'Pending',
      step: 1,
    },
    {
      label: 'Ongoing',
      step: 2,
    },
    {
      label: 'Completed',
      step: 3,
    },
    
  ]
  
  
  let [activeStep, setActiveStep] = useState(1)

  const handleSubmit = (e) => {
    e.preventDefault();
    customers.filter(customer =>{
      if(customer.status === 'pending'){
       setActiveStep(1.00000001)
      } else if(customer.status === 'ongoing'){
        setActiveStep(2.00000001)
       } else if(customer.status === 'completed'){
        setActiveStep(3.00000001)
      }
    })
  };
  const  [block, setBlock] = useState('none')
  const hundleSearch = () => {
    const customerFilter = newCustomer.filter((customer) => {
      if (customer.trackingNumber === search) {
        return customer;
      }
      setBlock('block')
    });

    if (search) {
      setCustomer(customerFilter);
    } else if (search === "") {
      setNewCustomer(setCustomer);
    }
  };
  const totalSteps = steps.length

  const width = `${(100 / (totalSteps - 1)) * (activeStep - 1)}%`


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

  return (
    <Wrapper>
      <div className="tracking-container">
      <MainContainer style={{display: block }}>
            <StepContainer width={width}>
              {steps.map(({ step, label }) => (
                <StepWrapper key={step}>
                  <StepStyle step={activeStep >= step ? 'completed' : 'incomplete'}>
                    {activeStep > step ? (
                      <CheckMark>L</CheckMark>
                    ) : (
                      <StepCount>{step}</StepCount>
                    )}
                  </StepStyle>
                  <StepsLabelContainer>
                    <StepLabel key={step}>{label}</StepLabel>
                  </StepsLabelContainer>
                </StepWrapper>
              ))}
            </StepContainer>
          </MainContainer>
        <form onSubmit={handleSubmit} className="tracking-form">
        
          <div className="input-group">
            <input
              type="search"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-control rounded "
            />
            <button
              className="btn btn-info"
              disabled={!search}
              onClick={hundleSearch}
            >
              Track
            </button>
          </div>
        </form>

        <div className="trackCustomer">
          {customers &&
            customers.map((customer) => {
              if (customers.length === 1) {
                // if(customer.status === 'completed'){
                //   AddOrSubractDays(customer.updatedAt, 100, true)
                //   eventdate = moment(fiveDaysAgo);
                //   todaysdate = moment();
                //   daysWarranty = eventdate.diff(todaysdate, 'days');
                //   if(daysWarranty > 100) {
                //     daysWarranty = 'Invalid Warranty';
                //   }
                // } else {
                //   daysWarranty = `Your Status is still ${customer.status}`;
                // }
                // if(daysWarranty === 0){
                //   daysWarranty = `Your warranty is not available`;
                // }
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
                  // if(hundredDays > 100) {
                  //   hundredDays = 'Invalid Warranty';
                  // } 
                  if(customer.status !== "completed"){
                    hundredDays = `Your Status is still ${customer.status}`;      
                  }
                  if(hundredDays <= 0 || hundredDays > 100) {
                    hundredDays = 'Your warranty is not available';
                  }
                  if(hundredDays >= 1 && hundredDays <= 100) {
                    hundredDays = `You have ${hundredDays} days left`;
                  }
                return <Customer key={customer._id} {...customer} hundredDays={hundredDays}/>;
              }
            })}
        </div>
        {customers && customers.length === 0 ? (
          <h4 className="alert alert-danger">{message}</h4>
        ) : null}
      </div>
      <div className="footer-remargin">
        <Footer />
      </div>
    </Wrapper>
  );
};

export default Tracking;
