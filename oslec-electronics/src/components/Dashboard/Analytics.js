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
import AnalyticPrint from "./AnalyticPrint.js";
import AnalyticsAppliances from "./AnalyticsAppliances.js";
import AnalyticsSupplier from './AnalyticsSupplier.js'
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
function Analytics() {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  // Data Status
  const [status, setStatus] = useState("completed");
  const [salesData, setSalesData] = useState();
  const onChangeStatus = ({ target }) => {
    const { value } = target;
    setStatus(value);
  };

  // Fetching API to get data.
  const getSalesData = async () => {
    try {
      const response = await fetch(
        `/api/v1/customer/sales?dFrom=${moment(state[0].startDate).format(
          "YYYY/MM/DD"
        )}&dTo=${moment(state[0].endDate).format(
          "YYYY/MM/DD"
        )}&status=${status}&id=${JSON.parse(localStorage.getItem('admin'))._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        const jsonResponse = await response.json();
        setSalesData(jsonResponse);
      }
    } catch (err) {
      console.log(err);
    }
  };

  
// console.log(salesData);
  // Chart Configuration
  const data = {
    labels: salesData && salesData.map((e) => e.date),
    datasets: [
      {
        label: "Amount",
        appliancesType: salesData && salesData.map((e) => e),
        data: salesData && salesData.map((e) => e.price),
        backgroundColor: "maroon",
        borderWidth: 1,
        datalabels: {
          align: "center",
          anchor: "end",
        },
        barThickness: 25,
      },
      {
        label: "Customer",
        data: salesData && salesData.map((e) => e.count),
        backgroundColor: "darkorange",
        borderWidth: 1,
        barThickness: 25,
      },
    ],
  };
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
          moment(state[0].startDate).format("LL") +
          " - " +
          moment(state[0].endDate).format("LL") +
          " - " +
          status,
        font: {
          size: 18,
          family: "Roboto Condensed, Sans-Serif",
          weight: "bold",
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const { label, appliancesType } = context.dataset;

            const databrand = appliancesType.map((e) => {
              const stringData = context.formattedValue.replace(",", "");
              if (e.price == stringData) {
                return e.appliancesType;
              }
            });

            let labelName = label || "";

            if (labelName) {
              labelName += ": ";
            }
            if (context.parsed.y !== null) {
              labelName += new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "PHP",
              }).format(context.parsed.y);
            }
            return labelName + " - " + databrand.filter((e) => e)[0];
          },
        },
      },
      datalabels: {
        color: "white",
        display: function (context) {
          return context.datasetIndex === 0;
        },
        formatter: function (value) {
          const brandName =
            salesData &&
            salesData.map((e) => {
              if (e.price == value) {
                return e.appliancesType;
              }
            });
          return `Amount: ${value} \n Brand: ${brandName.filter((e) => e)[0]}`;
        },
      },
    },
  };
  const [showPicker, setShowPicker] = useState(false);

  // Chart Filtering
  const ref = useRef(null);
  const onClickFilter = () => {
    setShowPicker(false);
    getSalesData();
  };

  // Download Chart
  const chartRef = useRef(null);
  const handleSave = useCallback(() => {
    const link = document.createElement("a");
    link.download = "chart.png";
    link.href = chartRef.current.toBase64Image();
    link.click();
  }, []);
  const { showStats } = useAppContext();

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
    documentTitle: "Oslec Electronics Analytics",
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
console.log(salesData)
  useEffect(() => {
    showStats();
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
    document.title = "Analytics";
  }, []);

  // const [showAppliances, setAppliances] = useState('')
  const [showSales, setSales] = useState('block')
  const [showSupplier, setSupplier] = useState('none')
  
  // const buttonAppliances = () =>{
  //   // setAppliances('block')
  //   setSales('none')
  //   setSupplier('none')
  // }

  const buttonSales = () =>{
    setSales('block')
    // setAppliances('none')
    setSupplier('none')
  }
  const buttonSupplier = () =>{
    setSupplier('block')
    setSales('none')
    // setAppliances('none')
  }
  const align = {textAlign: 'center'}
  return (
    <>
      <div style={style.stats}>
        <Wrapper>
          <StatsContainer />
        </Wrapper>
      </div>

      <div style={style.buttonFilter}>
        {/* <button className="btn" style={style.chartConf} onClick={buttonAppliances}>Analytics Appliances</button> */}
        <button className="btn" style={style.chartConf} onClick={buttonSales}>Sales</button>
        <button className="btn" style={style.chartConf} onClick={buttonSupplier}>Supplier</button>
      </div>

      {/* <div style={{display: showAppliances}}>
        <h6 style={align}>This Bar Graph shows the most appliances repaired by the technician per month</h6>
        <AnalyticsAppliances />
      </div> */}
      <div style={{display: showSupplier}}>
        <AnalyticsSupplier />
      </div>

      <div style={{display: showSales}} >
        <div style={style.dateContainer}>
          <button className="btn" style={style.chartConf} onClick={buttonPrint}>
            Print
            <BiLineChartDown style={style.icon} />
          </button>
          <button className="btn" style={style.chartConf} onClick={handleSave}>
            Export Data
            <BiLineChartDown style={style.icon} />
          </button>
          <button
            className="btn"
            style={style.chartConf}
            onClick={() => setShowPicker(!showPicker)}
          >
            select date
            <BiCalendarAlt style={style.icon} />
          </button>
          <div>
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
        </div>
        <h3 style={align}><span className="os-color">Os</span>lec Electronics Services</h3>
        <Bar ref={chartRef} data={data} options={options} />
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
          <AnalyticPrint
            data={data}
            sales={salesData}
            title={state}
            status={status}
          />
        </div>
      </div>
      
    </>
  );
}

export default Analytics;
