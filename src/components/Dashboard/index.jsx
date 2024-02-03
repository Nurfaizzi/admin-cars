import React from "react";
import "./style.css";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import moment from "moment";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import { Col, Form, Pagination, Row, Table } from "react-bootstrap"
import { usePagination, useSortBy, useTable } from "react-table"
import BasicTable from "../table";
import TableComp from "../table";


const CompDashboard = () => {
  const [dataChart, setDataChart] = useState([]);

  const [date, setDate] = useState({
    from: "",
    until: "",
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async (
    params = { from: "2023-06-01", until: "2023-06-30" }
  ) => {
    try {
      const token = localStorage.getItem("access_token");
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          access_token: `${token}`,
        },
      };
      const res = await axios.get(
        `https://api-car-rental.binaracademy.org/admin/order/reports`,
        {
          params,
          headers: {
            "Content-Type": "multipart/form-data",
            access_token: `${token}`,
          },
        }
      );
      setDataChart(res);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const options = [
    { label: "Januari - 2023" },
    { label: "Februari - 2023" },
    { label: "Maret - 2023" },
    { label: "April - 2023" },
    { label: "Mei - 2023" },
    { label: "Juni - 2023" },
    { label: "Juli - 2023" },
  ];

  const dateChange = (e) => {
    const { value } = e.target;
    let from, until;
    switch (value) {
      case "Januari - 2023":
        from = "2023-01-01";
        until = "2023-01-31";
        break;
      case "Februari - 2023":
        from = "2023-02-01";
        until = "2023-02-28";
        break;
      case "Maret - 2023":
        from = "2023-03-01";
        until = "2023-03-30";
        break;
      case "April - 2023":
        from = " 2023-04-01";
        until = "2023-04-30";
        break;
      case "Mei - 2023":
        from = "2023-05-01";
        until = "2023-05-31";
        break;
      case "Juni - 2023":
        from = "2023-06-01";
        until = "2023-06-30";
        break;
      case "Juli - 2023":
        from = "2023-07-01";
        until = "2023-07-31";
        break;
      default:
        from = "2023-08-01";
        until = "2023-08-31";
        break;
    }
    setDate({
      ...date,
      from,
      until,
    });
  };

  const handleButtonClick = async (params) => {
    await getData((params = { from: date.from, until: date.until }));
  };

  return (
    <div className="mt-5">
      <div className="routes-dashboard">
        <p className="head-pagedashboard">
          {" "}
          <b className="head">Dashboard &gt;</b>{" "}
          <p className="subhead">Dashboard</p>
        </p>
      </div>
      <div className="heading-dashboard">
        <div className="box-head"></div>
        <h1 className="text-heading-dashboard">
          Rented Car Data Visualization
        </h1>
      </div>
      <p className="text-month">Month</p>
      <div className="select">
        <select className="select-month" onChange={dateChange}>
          <option value="" disabled>
            Pilih Bulan
          </option>
          {options.map((options) => (
            <option key={options.label} value={options.label}>
              {options.label}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleButtonClick}
        >
          Go
        </button>
      </div>
      <div className="vertical">
        <Bar
          data={{
            labels: dataChart?.data?.map((data) => data.day),
            datasets: [
              {
                data: dataChart?.data?.map((data) => data.orderCount),
                backgroundColor: "#586B90",
              },
            ],
          }}
          options={{
            indexAxis: "x",
            responsive: true,
            aspectRatio: 3, // Atur aspectRatio sesuai kebutuhan Anda
            scales: {
              y: {
                title: {
                  display: true,
                  text: "Amount of Car Rented",
                  font: {
                    family: "Arial",
                    style: "normal",
                    weight: 400,
                    size: 12,
                  },
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Date",
                  font: {
                    family: "Arial",
                    style: "normal",
                    weight: 400,
                    size: 12,
                  },
                },
                type: "category",
                ticks: {
                  stepSize: 1,
                  callback: function (value, index, values) {
                    if (
                      index <= 10 ||
                      index === values.length - 1 ||
                      index % 2 === 0
                    ) {
                      return value;
                    }
                    return "";
                  },
                },
              },
            },
            plugins: {
              legend: {
                display: false, // Menyembunyikan legenda
              },
            },
          }}
        />
      </div>
      <p className="header-bottom">Dashboard</p>
      <div className="heading-dashboard">
        <div className="box-head"></div>
        <h1 className="text-heading-dashboard">
        List Order
        </h1>
        
      </div>
<TableComp />
    </div>
  );
};

export default CompDashboard;
