import React from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
const SideBarDashboard = () => {
  const navigate = useNavigate()
  return (
    <div className="side-dashboard">
    <p> DASHBOARD </p>
      <div onClick={() => navigate("/dashboard")}>
        <a>Dashboard</a>
      </div>

  </div>
  );
};

export default SideBarDashboard;
