import React, { useState, useRef, useEffect } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { addDays } from "date-fns";
import { style } from "../../assets/css/Analytics.js";
import "../../assets/css/CustomerInfo.css";
import moment from "moment";
import { useReactToPrint } from "react-to-print";
import { SearchContainerReceipt, ReceiptContainer, SearchSalesInvoice, SalesInvoiceContainer } from "../../components/Index.js";

function CustomerInfo() {
  const [showPicker, setShowPicker] = useState(false);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  // Data Status
  
  const [status, setStatus] = useState("");
  const onChangeStatus = ({ target }) => {
    const { value } = target;
    setStatus(value);
  };

  const ref = useRef(null);
  const onClickFilter = () => {
    setShowPicker(false);
    if(status === ""){
      return getCustomerData(state)
    }
    if(status !== ""){
      setStatus("")
      return getInfoData(state, status);
    }
    
  };

  const [info, setInfo] = useState();
  const getInfoData = async (appState, appStatus) => {
    try {
      const startDate = moment(appState[0].startDate).format("MM/DD/YYYY");
      const endDate = moment(appState[0].endDate).format("MM/DD/YYYY");
      const infoResponse = await fetch(
        `/api/v1/customer/info?dTo=${endDate}&dFrom=${startDate}&status=${appStatus}&id=${JSON.parse(localStorage.getItem('admin'))._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      if (infoResponse.ok) {
        const jsonInfo = await infoResponse.json();
        
        setInfo(jsonInfo);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // const [customer, setCustomer] = useState();
  const getCustomerData = async (appState) => {
    try {
      const startDate = moment(appState[0].startDate).format("MM/DD/YYYY");
      const endDate = moment(appState[0].endDate).format("MM/DD/YYYY");
      const infoResponse = await fetch(
        `/api/v1/customer/info1?dTo=${endDate}&dFrom=${startDate}&id=${JSON.parse(localStorage.getItem('admin'))._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (infoResponse.ok) {
        const jsonInfo = await infoResponse.json();
        setInfo(jsonInfo);
      }
    } catch (err) {
      console.log(err);
    }
  };



  // Print
  const refPrint = useRef();
  const handlePrint = useReactToPrint({
    content: () => refPrint.current,
    documentTitle: "Oslec Electronics Customer Info",
  });

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowPicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setShowPicker]);

  useEffect(() => {
    document.title = "Generating Reports";
  }, []);
  const [showReceipt, setshowReceipt] = useState('')
  const [showPrintAll, setPrintAll] = useState('none')
  const [showInvoice, setInvoice] = useState('none')

  const buttonReceipt = () =>{
    setshowReceipt('block')
    setPrintAll('none')
    setInvoice('none')
  }

  const buttonPrintAll = () =>{
    setPrintAll('block')
    setshowReceipt('none')
    setInvoice('none')
  }

  const buttonInvoice= () =>{
    setInvoice('block')
    setPrintAll('none')
    setshowReceipt('none')
  }
  const align = {textAlign: 'center'}
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
    <>
      <div style={style.buttonFilter}>
        <button className="btn" style={style.chartConf} onClick={buttonReceipt}>Print Receipt</button>
        <button className="btn" style={style.chartConf} onClick={buttonInvoice}>Print Sales Invoice</button>
        <button className="btn" style={style.chartConf} onClick={buttonPrintAll}>Print All</button>
      </div>
      <div style={{display: showReceipt }}>
        <SearchContainerReceipt />
        <ReceiptContainer />
      </div>
      <div style={{display: showInvoice }}>
        <SearchSalesInvoice />
        <SalesInvoiceContainer />
      </div>
      <div className="table-container" style={{display: showPrintAll }}>
        <div className="table-header-action">
          <button className="btn" style={style.chartConf} onClick={handlePrint}>
            Print
          </button>
          <button
            className="btn"
            style={style.chartConf}
            onClick={() => setShowPicker(!showPicker)}
          >
            select date
          </button>
          {showPicker && (
            <div
              style={{
                position: "absolute",
                right: "10%",
                border: "1px solid black",
                zIndex: 1,
                visibility: showPicker ? "visible" : "hidden",
                backgroundColor: "white",
                boxShadow: "5px 10px #888888",
              }}
              ref={ref}
            >
              <DateRangePicker
                onChange={(item) => setState([item.selection])}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                ranges={state}
                direction="vertical"
              />
              <div style={style.containerButton}>
                <div style={style.buttonC}>
                  <div>
                    <input
                      type="radio"
                      name="status"
                      value="completed"
                      id="completed"
                      onChange={onChangeStatus}
                      style={{ margin: 5 }}
                    />
                    <label htmlFor="completed" style={{ fontSize: 12 }}>
                      Completed
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="status"
                      value="ongoing"
                      id="ongoing"
                      onChange={onChangeStatus}
                      style={{ margin: 5 }}
                    />
                    <label htmlFor="ongoing" style={{ fontSize: 12 }}>
                      Ongoing
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="status"
                      value="pending"
                      id="pending"
                      onChange={onChangeStatus}
                      style={{ margin: 5 }}
                    />
                    <label htmlFor="pending" style={{ fontSize: 12 }}>
                      Pending
                    </label>
                  </div>
                </div>
                <div>
                  <button
                    style={style.btnCancel}
                    onClick={() => setShowPicker(false)}
                  >
                    Cancel
                  </button>
                  <button style={style.btnFilter} onClick={onClickFilter}>
                    Apply Filter
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="table-body" ref={refPrint} style={{overflowX : 'auto',fontSize: '14px'}}>
          <h2 style={align}><span className="os-color">Os</span>lec Electronics Services</h2>
            <div style={style.printDate}>
              <h5>Customer Reports</h5>
              {state.map((date, i) =>{
                const dateFrom = moment(date.startDate).format("MM/DD/YYYY")
                const dateTo = moment(date.endDate).format("MM/DD/YYYY")
                return <h5 key={i}>Date: {dateFrom} to {dateTo}</h5>
              })}
          </div>
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
                  <th>ESTIMATE FINISH DATE</th>
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
              {info &&
                info.map((e,index) => {
                  // AddOrSubractDays(e.updatedAt, 100, true)
                  // eventdate = moment(fiveDaysAgo);
                  // todaysdate = moment();
                  // daysWarranty = eventdate.diff(todaysdate, 'days');
                  // if(daysWarranty > 100) {
                  //   daysWarranty = 'Invalid Warranty';
                  // }
                  // if(daysWarranty === 0) {
                  //   daysWarranty = 'Invalid Warranty';
                  // }
                  let date_1 = new Date(moment(e.createdAt).format("MM/DD/YYYY"));
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
                    if(e.status !== "completed"){
                      hundredDays = `Your Status is still ${e.status}`;      
                    }
                    // if(hundredDays <= 0) {
                    //   hundredDays = 'Your warranty is not available';
                    // }
                    if(hundredDays >= 1 && hundredDays <= 100) {
                      hundredDays = `You have ${hundredDays} days left`;
                    }
                  e.price = Number(e.serviceFee) + Number(e.replacedPartsPrice)
                  return (
                    <tr key={index}>
                        <td>{e.trackingNumber}</td>
                        <td>{`${e.firstName} ${e.lastName}`}</td>
                        <td>{e.appliancesType}</td>
                        <td>{e.product}</td>
                        <td>{e.serialNumber}</td>
                        <td>{e.brand}</td>
                        <td>{e.diagnosis}</td>
                        <td>{e.replacedParts}</td>
                        <td>{e.replacedPartsPrice}</td>
                        <td>{e.fixingparts}</td>
                        <td>{e.description}</td>
                        <td>{`${moment(e.estimateStart).format("MMM Do YY")} ~ ${moment(e.estimateEnd).format("MMM Do YY")}`}</td>
                        <td>{e.status}</td>
                        <td>{e.address}</td>
                        <td>{e.serviceFee}</td>
                        <td>{e.price}</td>
                        <td>{e.paymentStatus}</td>
                        <td>{e.pickUp}</td>
                        <td>{moment(e.createdAt).format("MM/DD/YYYY")}</td>
                        <td>{hundredDays}</td>
                        <td>{e.warranting}</td>
                        <td>{e.endOfWarranting}</td>
                      </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default CustomerInfo;
