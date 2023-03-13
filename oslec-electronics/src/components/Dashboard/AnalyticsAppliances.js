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
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Chart } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  Title,
  LinearScale,
  Tooltip,
  Legend,
  ChartDataLabels,
);

// Component Style
function AnalyticsAppliances() {
  const { appliances, showAppliances } = useAppContext()
  
  const data = {
    labels: appliances.map((e) => `${e.appliancesType} ${moment(e.createdAt).format("MMM Y")}`),
    datasets: [{
      label: "Appliances",
      data: appliances.map((e) => e.count),
      backgroundColor: '#050a30',
      borderColor: 'darkorange',
      borderWidth: 1,
      color: 'white'
    }]
  }
  
  const options = {
    
  }

  useEffect(() => {
    showAppliances();
  }, []);

 

  return (
    <>
      <Bar data={data} options={options}/>
    </>
  );
}

export default AnalyticsAppliances;
