import React from "react"
import "./style.css";
import square from "../../assets/squareside.png"
import dashboard_img from "../../assets/dashboard_logo.png"
import car_img from "../../assets/car_logo.png"
import { Link } from "react-router-dom";
import { useState } from "react";
import SideBarDashboard from "../SideBarDahboard"
import CarCard from "../CarCard"
const SideBar = ({menu}) => {
  const [menuBar , setMenuBar] = useState("dashboard");


  const showCarMenu = () => {
    setMenuBar("car")
  };

  const showDashboardMenu = () => {
    setMenuBar("dashboard")
  };

    return (
      <div>
        <div className="sidebar">
          <div>
            <img src={square} alt="gadogado"/>
          </div>
          <div>
            <div className="menu-nav">
              {
                menuBar === "dashboard" ? <SideBarDashboard />
                : menuBar === "car" ? <CarCard />  : null
              }
            </div>
            <div onClick={showDashboardMenu}>
              <img src={dashboard_img} alt="home"/>
              <p id="text-dashboard"> Dashboard </p>
            </div>
          </div>
          <div>
            <div onClick={showCarMenu}>
              <img src={car_img}  alt="carr"/>
              <p id="text-cars"> Cars </p>
            </div>
          </div>
        </div>

        
        
      </div>
    )
}

export default SideBar