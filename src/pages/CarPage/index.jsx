import React from "react";
import SideBar from "../../components/SideBar";
import CarCard from "../../components/CarCard";
import NavbarTop from "../../components/NavBar";
import "./style.css";
import CompAllCar from "../../components/CompAllCars";
const CarPage = () => {
  return (
    <div>
      <SideBar menu={"car"}/>

      <NavbarTop />

      <div className="page-car">
        <CompAllCar />

      </div>
    </div>
  );
};

export default CarPage;
