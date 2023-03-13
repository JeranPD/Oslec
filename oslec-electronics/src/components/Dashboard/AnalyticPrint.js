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

function AnalyticPrint({ sales, title, status }) {
  console.log(sales)
  const dataAmount = {
    labels: sales && sales.map((e) => e.date),
    datasets: [
      {
        label: "Amount",
        appliancesType: sales && sales.map((e) => e),
        data: sales && sales.map((e) => e.price),
        backgroundColor: "#84D2C5",
        borderWidth: 1,
        datalabels: {
          align: "center",
          anchor: "end",
        },
        barThickness: 25,
      },
    ],
  };

  const amountOption = {
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
          moment(title[0].startDate).format("LL") +
          " - " +
          moment(title[0].endDate).format("LL") +
          " - " +
          status,
        font: {
          size: 18,
          family: "Roboto Condensed, Sans-Serif",
          weight: "bold",
        },
      },
      datalabels: {
        color: "black",
        display: function (context) {
          return context.datasetIndex === 0;
        },
        formatter: function (value) {
          const brandName =
            sales &&
            sales.map((e) => {
              if (e.price === value) {
                return e.appliancesType;
              }
            });
          return `Amount: ${value} \n Brand: ${brandName.filter((e) => e)[0]}`;
        },
      },
    },
  };

  const dataBrand = {
    labels: sales && sales.map((e) => e.date),
    datasets: [
      {
        label: "Items",
        appliancesType: sales && sales.map((e) => e.appliancesType),
        data: sales && sales.map((e) => e.count),
        backgroundColor: "#E4C988",
        borderWidth: 1,
        datalabels: {
          align: "center",
          anchor: "end",
        },
        barThickness: 25,
      },
    ],
  };

  const brandOption = {
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
          moment(title[0].startDate).format("LL") +
          " - " +
          moment(title[0].endDate).format("LL") +
          " - " +
          status,
        font: {
          size: 18,
          family: "Roboto Condensed, Sans-Serif",
          weight: "bold",
        },
      },
      datalabels: {
        color: "black",
        display: function (context) {
          return context.datasetIndex === 0;
        },
        formatter: function (value) {
          const brandName =
            sales &&
            sales.map((e) => {
              if (e.count === value) {
                return e.appliancesType;
              }
            });
          return `Items: ${value} \n Brand: ${brandName.filter((e) => e)[0]}`;
        },
      },
    },
  };

  return (
    <>
      <h3>Chart: </h3>
      <Bar data={dataAmount} options={amountOption} className="barstyles" />
      <p className="barstyles">
        The bar chart shows the pricing data for a specific product or service
        over a period of time. The x-axis is labeled with the dates, and the
        y-axis displays the pricing data. Each bar on the chart represents the
        pricing data for a specific date. The height of each bar represents the
        price of the product or service on that date. The taller the bar, the
        higher the price. The shorter the bar, the lower the price.
      </p>
      <Bar data={dataBrand} options={brandOption} className="barstyles" />
      <p className="barstyles">
        The bar chart displays data for multiple items across different Appliances.
        The x-axis is labeled with the appliances names, and the y-axis displays the
        item names. Each bar on the chart represents the data for a specific
        item and appliances. The height of each bar represents the value or quantity
        of data for a specific item and appliances. The taller the bar, the higher
        the value or quantity. The shorter the bar, the lower the value or
        quantity.
      </p>
      <div className="page-break" />
      <br />
      <br />
      <h3>Table: </h3>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>DATE</th>
            <th>PRICE</th>
            <th>APPLIANCES</th>
            <th>ITEMS</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {sales &&
            sales.map((e) => {
              return (
                <>
                  <tr>
                    <td>{e.date}</td>
                    <td>₱ {e.price}</td>
                    <td>{e.appliancesType}</td>
                    <td>{e.count}</td>
                    <td>{status}</td>
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>
      <p className="barstyles">
        The table displays pricing data for multiple products or services across
        different appliances, items, and dates. The table has 5 columns: DATE,
        PRICE, APPLIANCES, ITEMS, and STATUS. The DATE column displays the date when
        the price was recorded. The PRICE column displays the pricing data for a
        specific product on a specific date.
      </p>
      <p className="barstyles">
        It also is possible to show only the most frequent appliances by counting the
        number of times each appliances appears in the table and displaying only the
        appliances that appears the most. The ITEMS column displays the name of the
        item. And the STATUS column displays the status of the item( whether
        it's complete, pending, ongoing)
      </p>
    </>
  );
}

export default AnalyticPrint;
