import axios from "axios";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./style.css";
import moment from "moment";
import { Paginator } from "primereact/paginator";
import { useParams } from "react-router-dom";
import { Pagination } from "react-bootstrap";
const TableComp = () => {
  const [data, setData] = useState([]);
  const [first, setFirst] = useState(0);
  const [row, setRow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [numOfPage, setNumOfPage] = useState([]);

  const initPageNumbers = useCallback((current, totalPage) => {
    const pageNumbers = [];
    const shownPageNumbers = 9;
    let fromNumber = current;

    let minPageNumber = totalPage - (shownPageNumbers - 1);
    if (shownPageNumbers > totalPage) minPageNumber = 1;

    if (current > minPageNumber) {
      fromNumber = Math.min(current, minPageNumber);
    }

    for (let i = fromNumber; i <= totalPage; i++) {
      if (pageNumbers.length < shownPageNumbers) {
        pageNumbers.push(i);
      } else {
        pageNumbers.push({
          ellipsis: true,
          page: totalPage - shownPageNumbers,
        });
        pageNumbers.push(totalPage);
        break;
      }
    }

    if (
      totalPage > shownPageNumbers &&
      !pageNumbers.includes(shownPageNumbers)
    ) {
      pageNumbers.unshift({
        ellipsis: true,
        page: pageNumbers.length,
      });
      pageNumbers.unshift(1);
    }
    setNumOfPage(pageNumbers);
  }, []);

  useEffect(() => {
    initPageNumbers(currentPage + 1, pageCount);
  }, [initPageNumbers, currentPage, pageCount]);

  // console.log(data)
 
  const columns = useMemo(
    () => [
      { field: "UserId", header: "UserId" },
      { field: "useremail", header: "User Email" },

      { field: "car", header: "Car" },
      { field: "start_rent_at", header: "Start Rent" },
      { field: "finish_rent_at", header: "Finish Rent" },
      { field: "total_price", header: "Price" },
      { field: "Category", header: "Category" },
    ],
    []
  );

  function formatRupiah(angka) {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
    return formatter.format(angka);
  }

  let rows = data.map((data, index) => {
    return {
      UserId: index + 1,
      useremail: data.User.email,
      car: "car",
      start_rent_at: moment(data.start_rent_at).format("DD/MM/YYYY"),
      finish_rent_at: moment(data.finish_rent_at).format("DD/MM/YYYY"),
      total_price:formatRupiah(data.total_price) ,
      Category: "mobil",
    };
  });

  // const { getTableProps, headerGroups, rows, prepareRow } = useTable
  const itemsPerPage = limit;
  const getData = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          access_token: `${token}`,
        },
      };
      const res = await axios.get(
        `https://api-car-rental.binaracademy.org/admin/v2/order?page=${currentPage}&pageSize=${limit}`,
        config
      );
      setCurrentPage(res.data.page);
      setLimit(res.data.pageSize);
      setPageCount(res.data.pageCount);
      setData(res.data.orders);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData(itemsPerPage);
  }, [currentPage,itemsPerPage]);


  return (
    <div>
      <DataTable
        value={rows}
        tableStyle={{ minWidth: "50rem", backgroundColor: "#CFD4ED" }}
      >
        {columns.map((col, i) => (
          <Column
            key={col.field}
            field={col.field}
            header={col.header}
            // dateFormat="mm/dd/yy"
            sortable
          />
        ))}
      </DataTable>
      <div className="container-table">
        <div className="footer-table">
          <div className="container-limit">
            <p className="limit">Limit</p>
            <select className="select-page" value={limit} onChange={(e) => {setLimit(parseInt(e.target.value, 10));}} >
              <option value="" disabled>pilih Limit</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
          <div>
            <p className="jump">Jump To Page</p>
            <select className="select-page"   onChange={(e) => setCurrentPage(e.target.value)}>
              <option value="" disabled>
                Pilih Bulan
              </option>
              {Array.from({ length: pageCount }).map(
                        (_, index) => (
                          <option key={index} value={index + 1}>
                            {index + 1}
                          </option>
                        )
                      )}
            </select>
          </div>
          <button type="button" className="btn btn-primary" id="button-jump">
            Go
          </button>
        </div>
        <div className="select-footer">
          {/* */}

          {/*  */}
        </div>
        <div className="container-left-table">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" aria-label="Previous">
                  <span
                    aria-hidden="true"
                    onClick={() =>
                      setCurrentPage(
                        currentPage < pageCount ? currentPage - 1 : 1
                      )
                    }
                  >
                    &laquo;
                  </span>
                </a>
              </li>
              
                <Pagination.Prev
                onClick={() =>
                  setCurrentPage((prevPage) =>
                    prevPage > 1 ? prevPage - 1 : 1
                  )
                }
              />
              {numOfPage.map((val, idx) => {
                if (typeof val === "number") {
                  return (
                    <Pagination.Item
                      key={idx}
                      active={currentPage === val}
                      onClick={() => setCurrentPage(val)}
                    >
                      {val}
                    </Pagination.Item>
                  );
                } else {
                  return (
                    <Pagination.Ellipsis
                      key={idx}
                      onClick={() => setCurrentPage(val.page)}
                    />
                  );
                }
              })}
              <li className="page-item">
                <a className="page-link" aria-label="Next">
                  <span
                    aria-hidden="true"
                    onClick={() =>
                      setCurrentPage(
                        currentPage < pageCount ? currentPage + 1 : pageCount
                      )
                    }
                  >
                    &raquo;
                  </span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default TableComp;
