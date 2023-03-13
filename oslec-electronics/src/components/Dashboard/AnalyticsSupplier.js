import React, { useState, useEffect, useRef, useCallback } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import moment from "moment";
import { useReactToPrint } from "react-to-print";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { BiCalendarAlt, BiLineChartDown } from "react-icons/bi";
import { style } from "../../assets/css/Analytics.js";
import StatsContainer from "../StatsContainer.js";
import Wrapper from "../../assets/wrappers/Stats";
import { useAppContext } from "../../context/appContext.js";
import "../../assets/css/AnalyticPrint.css";
import SupplierPrint from "./SupplierPrint.js";
import AnalyticsAppliances from "./AnalyticsAppliances.js";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  Title,
  LinearScale,
  Tooltip,
  Legend,
  ChartDataLabels
);

// Component Style
function AnalyticsSupplier() {
  const { supplierFinalData, showSupplier } = useAppContext()
  
  const [allSupplier, setAllSupplier] = useState([]);
  const [startDate,setStartDate]= useState(new Date());
  const [endDate,setEndDate]= useState(new Date());
  const [showFilter,setTrue]= useState(false);
  const data = {
    labels: allSupplier.map((e) => `${moment(e.createdAt).format("MMM Y")}`),
    datasets: [{
      label: "Monthly Cost",
      data: allSupplier.map((e) => e.price),
      backgroundColor: "maroon",
      borderColor: 'maroon',
      borderWidth: 1,
      datalabels: {
        align: "center",
        anchor: "end",
      },
      barThickness: 25,
    }]
  }
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 16,
            family: "Roboto Condensed, Sans-Serif",
            weight: "bold",
          },
        },
      },
      title: {
        display: true,
        text:
          moment(startDate).format("LL") +
          " - " +
          moment(endDate).format("LL"),
        font: {
          size: 18,
          family: "Roboto Condensed, Sans-Serif",
          weight: "bold",
        },
      },
    },
  }

  
  // Print Chart
  const [print, setPrint] = useState("none");
  const refPrint = useRef();
  const buttonPrint = () => {
    setPrint("block");
    setTimeout(() => {
      handlePrint();
    }, 100);
  };
  const handlePrint = useReactToPrint({
    content: () => refPrint.current,
    documentTitle: "Monthly Cost",
    onBeforeGetContent: () => {
      setPrint("block");
    },
    onBeforePrint: () => {
      setPrint("block");
    },
    onAfterPrint: () => {
      setPrint("none");
    },
  });

  useEffect(() => {
    // allSupplier()
    showSupplier();
  }, []);


  const handleSelect = (date) =>{
    let filtered = supplierFinalData.filter((data)=>{
      let dataDate = new Date(data["createdAt"]);
      
      return(dataDate>= date.selection.startDate &&
        dataDate<= date.selection.endDate);
    })
  
    setStartDate(date.selection.startDate);
    setEndDate(date.selection.endDate);
    setAllSupplier(filtered);
    
  };
  
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  }
const filterButton = () =>{
  setTrue(true)
}
const align = {textAlign: 'center'}
  return (
    <>
      <div>
        <div style={style.dateContainer}>
        <button className="btn" style={style.chartConf} onClick={buttonPrint}>
            Print
            <BiLineChartDown style={style.icon} />
          </button>
          <button
            className="btn"
            style={style.chartConf}
            onClick={filterButton}
          >
            select date
            <BiCalendarAlt style={style.icon} />
          </button>
          <div>
            {showFilter && (
              <div
                style={{
                  position: "absolute",
                  right: "10%",
                  border: "1px solid black",
                  zIndex: 1,
                  visibility: showFilter ? "visible" : "hidden",
                  backgroundColor: "white",
                  boxShadow: "5px 10px #888888",
                }}
                
              >
                <DateRangePicker
                  ranges={[selectionRange]}
                  onChange={handleSelect}
                  direction="vertical"
                />
                <div style={style.containerButton}>
                  <div>
                    <button
                      style={style.btnCancel}
                      onClick={() => setTrue(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <h3 style={align}><span className="os-color">Os</span>lec Electronics Services</h3>
        <Bar data={data} options={options}/>
      </div>
      <div
        style={{
          width: "55%",
          margin: "0 auto",
          display: print,
          height: "100%",
        }}
      >
        <div ref={refPrint}>
          <SupplierPrint
            data={data}
            supplier={allSupplier}
            endDate={endDate}
            startDate={startDate}
          />
        </div>
      </div>
    </>
  );
}

export default AnalyticsSupplier;
