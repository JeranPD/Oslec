import React, { useState, useEffect, useRef } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import moment from "moment";

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

const style = {
  container: {
    backgroundColor: "white",
    padding: 20,
    width: "90%",
    margin: "0 auto",
    borderRadius: 5,
    border: "1px solid red",
  },
  dateContainer: {
    padding: "10px 0",
    display: "flex",
    justifyContent: "end",
  },
  buttonC: {
    margin: "0 10px",
    padding: "7px",
  },
  containerButton: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};

function Brand() {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const [status, setStatus] = useState("completed");

  const [salesData, setSalesData] = useState();

  const onChangeStatus = ({ target }) => {
    const { value } = target;
    setStatus(value);
  };

  const getSalesData = async () => {
    try {
      const response = await fetch(
        `/api/v1/customer/sales?dFrom=${moment(state[0].startDate).format(
          "YYYY/MM/DD"
        )}&dTo=${moment(state[0].endDate).format(
          "YYYY/MM/DD"
        )}&status=${status}`,
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

  const data = {
    labels: salesData && salesData.map((e) => e.date),
    datasets: [
      {
        label: "Amount",
        brand: salesData && salesData.map((e) => e),
        data: salesData && salesData.map((e) => e.price),
        backgroundColor: "maroon",
        borderWidth: 1,
      },
      {
        label: "Items",
        data: salesData && salesData.map((e) => e.count),
        backgroundColor: "darkorange",
        borderWidth: 1,
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
            const { label, brand } = context.dataset;

            const databrand = brand.map((e) => {
              const stringData = context.formattedValue.replace(",", "");
              if (e.price == stringData) {
                return e.brand;
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
    },
  };

  const [showPicker, setShowPicker] = useState(false);

  const ref = useRef(null);

  const onClickFilter = () => {
    setShowPicker(false);
    getSalesData();
  };

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

  return (
    <>
      <div style={style.container}>
        <div style={style.dateContainer}>
          <button
            style={{
              margin: "0 10px",
              padding: "7px",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
            onClick={() => setShowPicker(!showPicker)}
          >
            select date
          </button>
          <div>
            {showPicker && (
              <div
                style={{
                  position: "absolute",
                  right: 300,
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
                      <label for="completed" style={{ fontSize: 12 }}>
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
                      <label for="ongoing" style={{ fontSize: 12 }}>
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
                      <label for="pending" style={{ fontSize: 12 }}>
                        Pending
                      </label>
                    </div>
                  </div>
                  <div>
                    <button
                      style={style.buttonC}
                      onClick={() => setShowPicker(false)}
                    >
                      Cancel
                    </button>
                    <button style={style.buttonC} onClick={onClickFilter}>
                      Apply Filter
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <Bar data={data} options={options} />
      </div>
    </>
  );
}

export default Brand;
