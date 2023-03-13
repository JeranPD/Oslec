import React from "react";
import moment from "moment";
import "../../assets/css/AnalyticPrint.css";

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
  Legend
);

function SupplierPrint({  supplier, endDate, startDate }) {
  
  const data = {
    labels: supplier.map((e) => `${moment(e.createdAt).format("MMM Y")}`),
    datasets: [{
      label: "Monthly Cost",
      data: supplier.map((e) => e.price),
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


  return (
    <>
      <h3>Chart: </h3>
      <Bar data={data} options={options} className="barstyles" />
      <p className="barstyles">The bar chart shows the Monthly cost of the technician 
      with his supplier, it shows  the total monthly cost of parts of the appliances and 
      the exact month of when he ordered it.
       The x-axis is labeled with the dates, and the
        y-axis displays the monthly cost data. Each bar on the chart represents the
        monthly cost data for a specific date. The height of each bar represents the
        monthly cost of the product or service on that date. The taller the bar, the
        higher the cost. The shorter the bar, the lower the cost.
      </p>
      <div className="page-break" />
      <br />
      <br />
      <h3>Table: </h3>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>MONTHLY TOTAL COST</th>
            <th>DATE</th>
          </tr>
        </thead>
        <tbody>
          {supplier &&
            supplier.map((e) => {
              return (
                <>
                  <tr>
                    <td>₱ {e.price}</td>
                    <td>{e.createdAt}</td>
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>
      <p className="barstyles">
        The table displays monthly cost data for multiple supplier, it indecate the total of monthly cost, and dates. The DATE column displays the date when
        the technician ordered the parts. The MONTHLY TOTAL COST column displays the monthly cost data for a
        specific date.
      </p>
      
    </>
  );
}

export default SupplierPrint;
