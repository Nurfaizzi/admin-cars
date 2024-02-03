import React from "react";
import SideBar from "../../components/SideBar";
import NavbarTop from "../../components/NavBar";
import "./style.css";
import CompDashboard from "../../components/Dashboard";

const DashboardPage = () => {
  return (
    <div>
      <SideBar menu={"dashboard"} />
      <NavbarTop />
      <div className="page-dashboard">
      <CompDashboard />
      </div>
     
    </div>
  );
};

export default DashboardPage;
